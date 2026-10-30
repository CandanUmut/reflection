// Renders the short Markdown strings stored in content files to HTML at build
// time, and turns the research's evidence labels ([Established] etc.) into the
// calm tag component. No Markdown reaches the browser as JavaScript.
import { marked } from 'marked';
import { t, type Locale } from '../i18n/ui';

const LABELS = { Established: 'established', Scholarly: 'scholarly', Debated: 'debated' } as const;

export function evidenceTag(kind: keyof typeof LABELS, lang: Locale): string {
  const k = LABELS[kind];
  return `<span class="tag tag--${k}" title="${t(lang, `${k}Hint`)}">${t(lang, k)}</span>`;
}

function tags(html: string, lang: Locale): string {
  return html.replace(/\[(Established|Scholarly|Debated)\]/g, (_, k: keyof typeof LABELS) => evidenceTag(k, lang));
}

export function md(src: string | undefined, lang: Locale): string {
  if (!src) return '';
  return tags(marked.parse(src.trim(), { async: false }) as string, lang);
}
