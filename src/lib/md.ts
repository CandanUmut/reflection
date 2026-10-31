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
// source data by scripts/hadith-data.mjs), never from the content text.
type Hadith = { collection: string; number: string; whole: boolean; grades: { grade: string; by: string }[] };
let hadithData: Record<string, Hadith> | undefined;
const COLLECTION: Record<string, Record<Locale, string>> = {
  bukhari: { en: 'Bukhārī', tr: 'Buhârî' },
  muslim: { en: 'Muslim', tr: 'Müslim' },
  abudawud: { en: 'Abū Dāwūd', tr: 'Ebû Dâvûd' },
  tirmidhi: { en: 'Tirmidhī', tr: 'Tirmizî' },
  nasai: { en: 'Nasāʾī', tr: 'Nesâî' },
  ibnmajah: { en: 'Ibn Mājah', tr: 'İbn Mâce' },
  malik: { en: 'Muwaṭṭaʾ Mālik', tr: 'Muvatta' },
  nawawi: { en: 'al-Nawawī, Forty', tr: 'Nevevî, Kırk Hadis' },
  qudsi: { en: 'Forty Hadith Qudsi', tr: 'Kırk Kudsî Hadis' },
};
const GRADE_TR: Record<string, string> = {
  Sahih: 'Sahih',
  Hasan: 'Hasen',
  'Hasan Sahih': 'Hasen sahih',
  Daif: 'Zayıf',
  'Very Daif': 'Çok zayıf',
  'Isnaad Sahih': 'Senedi sahih',
  'Isnaad Hasan': 'Senedi hasen',
  'Isnaad Daif': 'Senedi zayıf',
  Maudu: 'Uydurma',
};
const GRADER: Record<string, Record<Locale, string>> = {
  'Al-Albani': { en: 'al-Albānī', tr: 'Elbânî' },
  'Zubair Ali Zai': { en: 'Zubair ʿAlī Zaʾī', tr: 'Zübeyr Ali Zaî' },
  'Shuaib Al Arnaut': { en: 'Shuʿayb al-Arnaʾūṭ', tr: 'Şuayb el-Arnaût' },
  'Ahmad Muhammad Shakir': { en: 'Aḥmad Shākir', tr: 'Ahmed Şâkir' },
  'Bashar Awad Maarouf': { en: 'Bashshār ʿAwwād Maʿrūf', tr: 'Beşşâr Avvâd Ma‘rûf' },
  'Muhammad Fouad Abd al-Baqi': { en: 'M. Fuʾād ʿAbd al-Bāqī', tr: 'M. Fuâd Abdülbâkî' },
  'Muhammad Muhyi Al-Din Abdul Hamid': { en: 'M. Muḥyī al-Dīn ʿAbd al-Ḥamīd', tr: 'M. Muhyiddin Abdülhamîd' },
};
const kindOf = (g: string) => (/da'?if|maudu/i.test(g) ? 'daif' : /sahih/i.test(g) ? 'sahih' : 'hasan');
function hadithRefs(html: string, lang: Locale): string {
  return html.replace(/\{hadith:([a-z]+):(\d+[a-z]?)\}/g, (_, col: string, num: string) => {
    hadithData ??= JSON.parse(fs.readFileSync(path.resolve('src/data/hadith.json'), 'utf8'));
    const h = hadithData![`${col}:${num}`];
    if (!h) throw new Error(`Hadith ${col}:${num} is not in src/data/hadith.json — run npm run hadith`);
    const ref = `${COLLECTION[col][lang]} ${num}`;
    let label: string, kind: string;
    if (h.whole) {
      label = `${t(lang, 'gradeSahih')} (${lang === 'tr' ? 'Sahîh-i ' : 'Ṣaḥīḥ '}${COLLECTION[col][lang]})`;
      kind = 'sahih';
    } else {
      // The leading grader is al-Albānī where he graded it; any grader who
      // reaches a different kind of grade is shown too, so disagreement is visible.
      const gs = [...h.grades].sort((a, b) => Number(b.by === 'Al-Albani') - Number(a.by === 'Al-Albani'));
      const lead = gs[0];
      const shown = [lead, ...gs.slice(1).filter((g) => kindOf(g.grade) !== kindOf(lead.grade))];
      const fmt = (g: { grade: string; by: string }) =>
        `${lang === 'tr' ? (GRADE_TR[g.grade] ?? g.grade) : g.grade.replace('Daif', 'Ḍaʿīf')} — ${GRADER[g.by]?.[lang] ?? g.by}`;
      label = shown.map(fmt).join('; ');
      const kinds = new Set(shown.map((g) => kindOf(g.grade)));
      kind = kinds.size > 1 ? 'mixed' : [...kinds][0];
    }
    return `<span class="hadith"><span class="hadith__ref">${ref}</span> <span class="grade grade--${kind}">${label}</span></span>`;
  });
}

export function md(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return xrefs(hadithRefs(tags(marked.parse(src.trim(), { async: false }) as string, lang), lang), lang);
}

/** Inline Markdown only (no paragraph), for short strings such as source labels. */
export function mdInline(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return xrefs(hadithRefs(tags(marked.parseInline(src.trim(), { async: false }) as string, lang), lang), lang);
}
