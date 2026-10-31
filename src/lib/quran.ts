import data from '../data/quran.json';
import type { Locale } from '../i18n/ui';

export interface Verse {
  ref: string;
  ar: string;
  translit: string;
  translation: string;
}

const verses = data.verses as Record<string, { ar: string; translit: string; en: string; tr: string }>;

/** Expands "56:63-64" into ["56:63", "56:64"]. */
export function expandRef(ref: string): string[] {
  const m = ref.match(/^(\d+):(\d+)(?:-(\d+))?$/);
  if (!m) throw new Error(`Bad verse ref ${ref}`);
  const [s, a, b] = [m[1], Number(m[2]), Number(m[3] ?? m[2])];
  return Array.from({ length: b - a + 1 }, (_, i) => `${s}:${a + i}`);
}

export function getVerse(ref: string, lang: Locale): Verse {
  const v = verses[ref];
  if (!v) throw new Error(`Verse ${ref} missing from quran.json — run node scripts/quran-data.mjs`);
  return { ref, ar: v.ar, translit: v.translit, translation: v[lang] };
}

/** Display form of a reference, with an en dash in ranges: 56:63–64. */
export const refLabel = (ref: string) => ref.replace('-', '–');
