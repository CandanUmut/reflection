// Draws the social cards (public/og-tr.png, public/og-en.png) from the built
// site itself: its day palette, fonts and painted flowers (FloraDefs).
// Usage: npm run build && node scripts/og-image.mjs
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const server = spawn('node_modules/.bin/astro', ['preview', '--port', '4334'], { stdio: 'pipe' });
await new Promise((r) => server.stdout.on('data', (d) => String(d).includes('4334') && r()));
const browser = await chromium.launch();
for (const lang of ['tr', 'en']) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => localStorage.setItem('tefekkur-palette', 'day'));
  const page = await ctx.newPage();
  await page.goto(`http://localhost:4334/reflection/${lang}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const name = 'Tefekkür';
    const sub = document.querySelector('.site-subtitle')?.textContent?.trim() ?? '';
    const defs = document.querySelector('.flora-defs');
    const ring = Array.from({ length: 8 }, (_, i) => i * 45)
      .map(
        (a, i) =>
          `<g transform="translate(80 80) rotate(${a + 22.5}) translate(0 -18)"><use href="#fl-leaf-s" style="${i % 2 ? '--leaf-tone:var(--turquoise)' : ''}"/></g>` +
          `<g transform="translate(80 80) rotate(${a}) translate(0 -18) scale(0.74)"><use href="#fl-tulip"/></g>`,
      )
      .join('');
    const border = (y) =>
      `<svg style="position:absolute;left:0;top:${y}px" width="1200" height="44"><line x1="0" y1="0.6" x2="1200" y2="0.6" stroke="var(--lamp-line)" stroke-width="1.2"/><g transform="translate(0 2) scale(0.833)"><rect width="1600" height="48" fill="url(#fl-border)"/></g><line x1="0" y1="43.4" x2="1200" y2="43.4" stroke="var(--lamp-line)" stroke-width="1.2"/></svg>`;
    document.body.innerHTML = '';
    document.body.append(defs);
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div style="position:relative;width:1200px;height:630px;background:var(--paper);overflow:hidden">
        ${border(36)}${border(550)}
        <svg viewBox="0 0 160 160" width="250" height="250" style="position:absolute;left:110px;top:190px">
          <circle cx="80" cy="80" r="66" fill="color-mix(in srgb, var(--turquoise) 11%, var(--paper))" stroke="var(--lamp-line)"/>
          ${ring}<g transform="translate(80 80) scale(1.8)"><use href="#fl-rosette"/></g>
        </svg>
        <div style="position:absolute;left:420px;top:205px;right:80px">
          <div style="font-family:var(--font-display);font-size:112px;line-height:1;color:var(--ink);font-weight:500">${name}</div>
          <div style="font-family:var(--font-display);font-style:italic;font-size:46px;line-height:1.2;color:var(--ink-soft);margin-top:22px">${sub}</div>
        </div>
      </div>`,
    );
    document.body.style.margin = '0';
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `public/og-${lang}.png` });
  await ctx.close();
}
await browser.close();
server.kill();
