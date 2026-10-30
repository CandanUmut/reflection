// Runs axe (WCAG 2.2 A/AA rules) on built pages in all four palettes.
// Usage: node scripts/a11y.mjs <path> [<path>...]   (paths under /reflection/)
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { AxeBuilder } from '@axe-core/playwright';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const paths = process.argv.slice(2);
const server = spawn('node_modules/.bin/astro', ['preview', '--port', '4333'], { stdio: 'pipe' });
await new Promise((res) => server.stdout.on('data', (d) => String(d).includes('4333') && res()));
const browser = await chromium.launch();
let total = 0;
try {
  for (const p of paths) {
    for (const palette of ['fajr', 'day', 'asr', 'night']) {
      for (const width of [390, 1440]) {
        const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
        await ctx.addInitScript((v) => localStorage.setItem('tefekkur-palette', v), palette);
        const page = await ctx.newPage();
        await page.goto(`http://localhost:4333/reflection/${p}`, { waitUntil: 'networkidle' });
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        total += violations.length;
        for (const v of violations) {
          console.log(`✗ ${p} [${palette} ${width}] ${v.id}: ${v.help}`);
          for (const n of v.nodes.slice(0, 4))
            console.log(`    ${n.target.join(' ')} — ${n.failureSummary?.split('\n')[1] ?? ''}`);
        }
        await ctx.close();
      }
    }
  }
} finally {
  await browser.close();
  server.kill();
}
console.log(total ? `${total} violation group(s)` : 'axe: no violations in any palette');
process.exit(total ? 1 : 0);
