// Full-page screenshots of the built site at phone (390px) and desktop (1440px)
// widths, in each requested palette. Usage:
//   node scripts/screenshots.mjs <outDir> <path> [<path>...]   (paths under /reflection/)
// Env: PALETTES=day,night (default), WIDTHS=390,1440, REDUCED=1 to skip motion.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const [outDir, ...paths] = process.argv.slice(2);
const palettes = (process.env.PALETTES ?? 'day,night').split(',');
const widths = (process.env.WIDTHS ?? '390,1440').split(',').map(Number);
fs.mkdirSync(outDir, { recursive: true });

const server = spawn('node_modules/.bin/astro', ['preview', '--port', '4329'], { stdio: 'pipe' });
await new Promise((res) => server.stdout.on('data', (d) => String(d).includes('4329') && res()));
const browser = await chromium.launch();
try {
  for (const p of paths) {
    for (const w of widths) {
      for (const pal of palettes) {
        const ctx = await browser.newContext({
          viewport: { width: w, height: w < 600 ? 844 : 900 },
          deviceScaleFactor: 1, // Chromium cannot tile full-page shots taller than 16384 device pixels
          reducedMotion: 'reduce', // final, settled state of every animation
        });
        await ctx.addInitScript((v) => localStorage.setItem('tefekkur-palette', v), pal);
        const page = await ctx.newPage();
        await page.goto(`http://localhost:4329/reflection/${p}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const name = `${p.replace(/\//g, '_') || 'root'}-${w}-${pal}.png`.replace(/^_/, '');
        await page.screenshot({ path: path.join(outDir, name), fullPage: true });
        console.log(name);
        await ctx.close();
      }
    }
  }
} finally {
  await browser.close();
  server.kill();
  process.exit(0);
}
