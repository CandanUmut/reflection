// Renders the short Markdown strings stored in content files to HTML at build
// time, turns the research's evidence labels ([Established] etc.) into the
// calm tag component, and links item references (S9, Q8, M11) to their pages.
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

export function md(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return xrefs(tags(marked.parse(src.trim(), { async: false }) as string, lang), lang);
}

/** Inline Markdown only (no paragraph), for short strings such as source labels. */
export function mdInline(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return xrefs(tags(marked.parseInline(src.trim(), { async: false }) as string, lang), lang);
}
