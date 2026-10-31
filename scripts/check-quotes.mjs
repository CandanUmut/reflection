// Checks that every quotation followed by a verse reference — "…" (2:155) —
// is word for word in that verse's translation: Saheeh International for the
// research (English), Elmalılı for content-src/tr-v2 (Turkish). Punctuation,
// brackets and case are ignored; "…" splits a quotation into parts that must
// each be found. Exits non-zero on any mismatch.
//   node scripts/check-quotes.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const load = (f) => {
  const m = new Map();
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const [s, a, ...t] = line.split('|');
    if (t.length) m.set(`${s}:${a}`, t.join('|'));
  }
  return m;
};
const norm = (t) =>
  t
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
const verses = (q, ref) => {
  const [s, range] = ref.split(':');
  const [a, b = a] = range.split(/[-–]/).map(Number);
  return Array.from({ length: b - a + 1 }, (_, i) => q.get(`${s}:${a + i}`) ?? '').join(' ');
};

let bad = 0,
  ok = 0;
function check(text, q, where) {
  // "quotation" (s:a) or "quotation" (s:a–b), allowing ; or text after the ref.
  for (const m of text.matchAll(/"([^"]{8,}?)"\s*\((\d{1,3}:\d{1,3}(?:[-–]\d{1,3})?)[);, ]/g)) {
    const hay = norm(verses(q, m[2]));
    const parts = m[1]
      .split(/…|\.\.\./)
      .map(norm)
      .filter((p) => p.length > 3);
    const missing = parts.filter((p) => !hay.includes(p));
    if (missing.length) {
      bad++;
      console.log(`MISMATCH ${where} (${m[2]}): "${m[1].slice(0, 90)}"`);
    } else ok++;
  }
}
const en = load('.cache/quran/en.txt'),
  tr = load('.cache/quran/tr.txt');
for (const f of readdirSync('docs/research').filter((f) => /^(0[7-9]|[1-9]\d)-.*\.md$/.test(f)))
  check(readFileSync(`docs/research/${f}`, 'utf8'), en, f);
if (existsSync('content-src/tr-v2'))
  for (const f of readdirSync('content-src/tr-v2')) check(readFileSync(`content-src/tr-v2/${f}`, 'utf8'), tr, f);
console.log(`${ok} quotations match; ${bad} do not.`);
process.exit(bad ? 1 : 0);
