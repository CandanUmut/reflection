// Checks WCAG 2.2 contrast for every token pair in every time-of-day palette.
// Text tokens need 4.5:1 on paper and on paper-deep; non-text (hairline-strong, lamp as rule) needs 3:1.
import { palettes } from '../src/styles/palettes.mjs';

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const text = ['ink', 'ink-soft', 'lamp', 'life', 'water', 'clay'];
const nonText = ['hairline-strong'];
let failed = 0;
for (const [name, p] of Object.entries(palettes)) {
  const rows = [];
  for (const bg of ['paper', 'paper-deep']) {
    for (const t of text) {
      const r = ratio(p[t], p[bg]);
      if (r < 4.5) failed++;
      rows.push(`${t} on ${bg}: ${r.toFixed(2)}${r < 4.5 ? '  FAIL' : ''}`);
    }
    for (const t of nonText) {
      const r = ratio(p[t], p[bg]);
      if (r < 3) failed++;
      rows.push(`${t} on ${bg}: ${r.toFixed(2)} (non-text, needs 3)${r < 3 ? '  FAIL' : ''}`);
    }
  }
  console.log(`\n${name}\n  ` + rows.join('\n  '));
}
console.log(failed ? `\n${failed} pair(s) fail` : '\nAll pairs pass WCAG AA');
process.exit(failed ? 1 : 0);
