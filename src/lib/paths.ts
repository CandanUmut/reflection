import type { Locale } from '../i18n/ui';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Builds an internal URL that respects the GitHub Pages base path. */
export const url = (path: string) => `${base}/${path.replace(/^\//, '')}`;
export const localeUrl = (lang: Locale, path = '') => url(`${lang}/${path}`.replace(/\/?$/, '/'));
