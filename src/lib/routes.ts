// Site sections and item URLs, per language. Turkish is the default language.
import type { Locale } from '../i18n/ui';
import { localeUrl } from './paths';

export type Section = 'signs' | 'morals' | 'questions';

/** The URL segment of each section: the three doors of the Threshold. */
export const sectionSegment: Record<Section, Record<Locale, string>> = {
  signs: { tr: 'tefekkur', en: 'reflect' },
  // "yaşa" without its ş would read "yasa" (law) in a URL, so the path says "yaşam" (life).
  morals: { tr: 'yasam', en: 'live' },
  questions: { tr: 'sor', en: 'ask' },
};

export const sectionPath = (section: Section, lang: Locale) => `${sectionSegment[section][lang]}/`;
export const itemPath = (section: Section, slug: Record<Locale, string>, lang: Locale) =>
  `${sectionSegment[section][lang]}/${slug[lang]}/`;
export const sectionUrl = (section: Section, lang: Locale) => localeUrl(lang, sectionPath(section, lang));
export const itemUrl = (section: Section, slug: Record<Locale, string>, lang: Locale) =>
  localeUrl(lang, itemPath(section, slug, lang));
