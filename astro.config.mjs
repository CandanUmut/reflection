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
  build: { format: 'directory' },
});
