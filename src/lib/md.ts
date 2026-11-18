// Renders the short Markdown strings stored in content files to HTML at build
// time, turns the research's evidence labels ([Established] etc.) into the
// calm tag component, links item references (S9, Q8, M11) to their pages, and
// turns hadith tokens ({hadith:muslim:2752}) into the reference with its grade.
// No Markdown reaches the browser as JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { parse } from 'yaml';
import { t, type Locale } from '../i18n/ui';
import { itemUrl, type Section } from './routes';
import { readGrade } from './hadith-grade.mjs';

const LABELS = { Established: 'established', Scholarly: 'scholarly', Debated: 'debated' } as const;

export function evidenceTag(kind: keyof typeof LABELS, lang: Locale): string {
  const k = LABELS[kind];
  return `<span class="tag tag--${k}" title="${t(lang, `${k}Hint`)}">${t(lang, k)}</span>`;
}

// "[Established]" → tag. "[Established, small]" or "[Debated in its details]" →
// tag followed by the qualifier, so the research's strength notes stay visible.
function tags(html: string, lang: Locale): string {
  // A strength label on its own ([moderate, mixed]) reads as the same quiet note.
  html = html.replace(/\[(<em>[^\][]*)\]/g, '<span class="tag-note">($1)</span>');
  return html.replace(/\[(Established|Scholarly|Debated)([^\][]*)\]/g, (_, k: keyof typeof LABELS, rest: string) => {
    const note = rest.replace(/^[\s,;]+/, '').trim();
    return evidenceTag(k, lang) + (note ? ` <span class="tag-note">(${note})</span>` : '');
  });
}

// Item id → page, read once from the content files at build time.
const SECTION_DIRS: Record<string, Section> = { S: 'signs', Q: 'questions', M: 'morals' };
let index: Map<string, { slugs: Record<Locale, string>; title: Record<Locale, string> }> | undefined;
function items() {
  if (index) return index;
  index = new Map();
  for (const [prefix, dir] of Object.entries({ S: 'signs', Q: 'questions', M: 'morals' })) {
    const base = path.resolve('src/content', dir);
    for (const f of fs.readdirSync(base).filter((n) => n.endsWith('.yaml'))) {
      const d = parse(fs.readFileSync(path.join(base, f), 'utf8'));
      if (d?.id?.startsWith(prefix)) index.set(d.id, { slugs: d.slugs, title: d.title });
    }
  }
  return index;
}

/** Links bare references like "Q8" or "S29" in rendered text (never inside tags or links). */
function xrefs(html: string, lang: Locale): string {
  const parts = html.split(/(<a\b[\s\S]*?<\/a>|<[^>]+>)/);
  return parts
    .map((part) =>
      part.startsWith('<')
        ? part
        : part.replace(/\b([SQM])(\d{1,2})\b/g, (m, p: string) => {
            const it = items().get(m);
            if (!it) return m;
            return `<a href="${itemUrl(SECTION_DIRS[p], it.slugs, lang)}" title="${it.title[lang].replace(/"/g, '&quot;')}">${m}</a>`;
          }),
    )
    .join('');
}

// Hadith: the grade always comes from src/data/hadith.json (built from the
// source data by scripts/hadith-data.mjs) and is read by hadith-grade.mjs,
// never typed in the content. Fabricated, weak and Companions' sayings each
// get their own label; graders who disagree are both shown.
type Grading = { grade: string; by: string };
let hadithData: Record<string, { whole: boolean; grades: Grading[] }> | undefined;
const COLLECTION: Record<string, Record<Locale, string>> = {
  bukhari: { en: 'Bukhārī', tr: 'Buhârî' },
  muslim: { en: 'Muslim', tr: 'Müslim' },
  abudawud: { en: 'Abū Dāwūd', tr: 'Ebû Dâvûd' },
  tirmidhi: { en: 'Tirmidhī', tr: 'Tirmizî' },
  nasai: { en: 'Nasāʾī', tr: 'Nesâî' },
  ibnmajah: { en: 'Ibn Mājah', tr: 'İbn Mâce' },
};
const GRADER: Record<string, Record<Locale, string>> = {
  'Al-Albani': { en: 'al-Albānī', tr: 'Elbânî' },
  'Zubair Ali Zai': { en: 'Zubair ʿAlī Zaʾī', tr: 'Zübeyr Ali Zaî' },
  'Shuaib Al Arnaut': { en: 'Shuʿayb al-Arnaʾūṭ', tr: 'Şuayb el-Arnaût' },
  'Ahmad Muhammad Shakir': { en: 'Aḥmad Shākir', tr: 'Ahmed Şâkir' },
  'Bashar Awad Maarouf': { en: 'Bashshār ʿAwwād Maʿrūf', tr: 'Beşşâr Avvâd Ma‘rûf' },
  'Muhammad Fouad Abd al-Baqi': { en: 'M. Fuʾād ʿAbd al-Bāqī', tr: 'M. Fuâd Abdülbâkî' },
  'Muhammad Muhyi Al-Din Abdul Hamid': { en: 'M. Muḥyī al-Dīn ʿAbd al-Ḥamīd', tr: 'M. Muhyiddin Abdülhamîd' },
  'Abu Ghuddah': { en: 'Abū Ghudda', tr: 'Ebû Gudde' },
};
function hadithRefs(html: string, lang: Locale): string {
  const out = html.replace(/\{hadith:([a-z]+):(\d+[a-z]?)\}/g, (_, col: string, num: string) => {
    hadithData ??= JSON.parse(fs.readFileSync(path.resolve('src/data/hadith.json'), 'utf8')).hadith;
    const h = hadithData![`${col}:${num}`];
    if (!h) throw new Error(`Hadith ${col}:${num} is not in src/data/hadith.json — run npm run hadith`);
    const ref = `${COLLECTION[col][lang]} ${num}`;
    let label: string, kind: string;
    if (h.whole) {
      label = readGrade('Sahih')[lang];
      kind = 'sahih';
    } else {
      // al-Albānī leads where he graded it; any grader who reaches a different
      // kind of grade is shown too, so disagreement is visible.
      const gs = [...h.grades].sort((a, b) => Number(b.by === 'Al-Albani') - Number(a.by === 'Al-Albani'));
      // Sahih and hasan are both accepted; only a grader who puts the report in
      // another group (weak, or a Companion's saying) is shown as disagreeing.
      const read = gs.map((g) => ({ ...readGrade(g.grade), by: GRADER[g.by]?.[lang] ?? g.by }));
      const group = (k: string) => (k === 'sahih' || k === 'hasan' ? 'accepted' : k);
      const shown = [read[0], ...read.slice(1).filter((g) => group(g.kind) !== group(read[0].kind))];
      label = shown.map((g) => `${g[lang]} — ${g.by}`).join('; ');
      kind = new Set(shown.map((g) => group(g.kind))).size > 1 ? 'mixed' : read[0].kind;
    }
    return `<span class="hadith"><span class="hadith__ref">${ref}</span> <span class="grade grade--${kind}">${label}</span></span>`;
  });
  if (out.includes('{hadith'))
    throw new Error(`Malformed hadith token near: ${out.slice(out.indexOf('{hadith'), out.indexOf('{hadith') + 40)}`);
  return out;
}

// Umut's rule: a verse reference stands only right after the verse's own words.
// A reference in brackets that does not directly follow a quotation, such as
// "The Quran forbids compulsion in religion (2:256)", is our summary, so it reads
// "(see 2:256)" / "(bkz. 2:256)": the reader can always tell the verse from our
// words. Quotations followed directly by a reference are checked word for word
// against Tanzil by scripts/check-quotes.mjs. Left alone: bold lead-in titles
// ("**Wider family (4:1).**"), an italic Arabic word labelled with its verse
// ("*bi-qadar* (54:49)"), and brackets that already say see / bkz. / cf.
const REF_OPEN = /\((\d{1,3}):(\d{1,3})/g;
const POINTER: Record<Locale, string> = { en: 'see ', tr: 'bkz. ' };
export function verseRefs(src: string, lang: Locale): string {
  return src.replace(REF_OPEN, (m, sura: string, _v: string, at: number) => {
    if (+sura < 1 || +sura > 114) return m;
    const raw = src.slice(0, at).replace(/[ \t]+$/, '');
    if (raw.endsWith('*') && !raw.endsWith('**')) return m; // *Arabic word* (54:49)
    const before = raw.replace(/\*+$/, '');
    // A straight ' before the bracket closes a quotation (a Turkish apostrophe
    // never ends a word that stands before a bracket).
    if ('"”’»\''.includes(before.slice(-1))) return m; // right after a quotation: the verse itself
    const inside = src.slice(at, src.indexOf(')', at) + 1);
    if (/atıf|citing|referring/i.test(inside)) return m; // "(57:25'e atıfla)" already says what it is
    const line = before.slice(before.lastIndexOf('\n') + 1).replace(/^\s*(?:[-*]|\d+\.)\s+/, '');
    if (line.startsWith('**') && (line.match(/\*\*/g) ?? []).length % 2 === 1) return m; // inside a bold lead-in title
    return '(' + POINTER[lang] + m.slice(1);
  });
}

export function md(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return xrefs(hadithRefs(tags(marked.parse(verseRefs(src.trim(), lang), { async: false }) as string, lang), lang), lang);
}

/** Inline Markdown only (no paragraph), for short strings such as source labels. */
export function mdInline(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return xrefs(hadithRefs(tags(marked.parseInline(verseRefs(src.trim(), lang), { async: false }) as string, lang), lang), lang);
}

/** Inline Markdown for text inside a <summary>: no links or badges, which would nest interactive content. */
export function mdPlainInline(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return tags(marked.parseInline(verseRefs(src.trim(), lang), { async: false }) as string, lang);
}
