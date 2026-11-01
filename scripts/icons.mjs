// The app's logo and icons: a tile medallion — a hatayi rosette ringed by eight
// tulip buds on an ivory disc, framed in cobalt. Drawn from the same flower
// shapes as the site (src/lib/flora.ts) and the day palette's colours.
//   node --experimental-strip-types scripts/icons.mjs
// Writes public/logo.svg, public/favicon.svg (the rosette alone: the buds turn
// to noise at 16 px) and the PNG icons in public/icons/ (rendered in Chromium).
import { writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { BUD, BUD_SEPALS, rosette } from '../src/lib/flora.ts';

const C = { ivory: '#F7F3EA', cobalt: '#1D4A99', red: '#B0392B', gold: '#C9A55C', turq: '#3AA09A' };

/** The medallion centred on 0,0, radius about 214. */
function medallion({ buds = true } = {}) {
  const ros = rosette(buds ? 112 : 150, 8);
  let ring = '';
  if (buds)
    for (let i = 0; i < 8; i++)
      ring +=
        `<g transform="rotate(${i * 45 + 22.5}) translate(0 -136) scale(3.2)">` +
        `<path d="${BUD}" fill="${C.red}" stroke="${C.cobalt}" stroke-width="0.8"/>` +
        `<path d="${BUD_SEPALS}" fill="${C.turq}" stroke="${C.cobalt}" stroke-width="0.6"/></g>`;
  const w = buds ? 2.4 : 4;
  return (
    `<circle r="214" fill="${C.ivory}"/>` +
    `<circle r="200" fill="none" stroke="${C.gold}" stroke-width="${buds ? 5 : 12}"/>` +
    ring +
    `<path d="${ros.inner}" fill="${C.red}" stroke="${C.cobalt}" stroke-width="${w}"/>` +
    `<path d="${ros.outer}" fill="${C.turq}" stroke="${C.cobalt}" stroke-width="${w}"/>` +
    (buds ? `<path d="${ros.veins}" fill="none" stroke="${C.ivory}" stroke-width="2"/>` : '') +
    `<circle r="${ros.heart}" fill="${C.gold}" stroke="${C.cobalt}" stroke-width="${w}"/>`
  );
}

/** A square icon: cobalt ground (rounded unless full-bleed), the medallion scaled into it. */
const icon = ({ rx = 112, scale = 1, buds = true } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">` +
  `<rect width="512" height="512" rx="${rx}" fill="${C.cobalt}"/>` +
  `<g transform="translate(256 256) scale(${scale})">${medallion({ buds })}</g></svg>`;

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/logo.svg', icon() + '\n');
writeFileSync('public/favicon.svg', icon({ rx: 96, scale: 1.1, buds: false }) + '\n');

// PNGs: "any" icons keep rounded corners; maskable and Apple icons are full-bleed
// squares (the system cuts its own shape), with the medallion inside the safe zone.
const pngs = [
  ['icons/icon-192.png', 192, icon()],
  ['icons/icon-512.png', 512, icon()],
  ['icons/maskable-512.png', 512, icon({ rx: 0, scale: 0.84 })],
  ['icons/apple-touch-icon.png', 180, icon({ rx: 0, scale: 0.94 })],
];
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = require('playwright-core');
}
const browser = await playwright.chromium.launch();
for (const [file, size, svg] of pngs) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
  );
  await page.screenshot({ path: `public/${file}`, omitBackground: true });
  await page.close();
}
await browser.close();
console.log('wrote public/logo.svg, public/favicon.svg and', pngs.map((p) => p[0]).join(', '));
