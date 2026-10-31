// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves the site from /reflection/ (the repository name).
export default defineConfig({
  site: 'https://candanumut.github.io',
  base: '/reflection',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  // Inline the per-page stylesheets (about 40 KB, 10 KB gzipped) so nothing blocks first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
});
