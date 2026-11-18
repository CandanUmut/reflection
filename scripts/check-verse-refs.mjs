// Umut's rule: a verse reference stands only after the verse's own words.
// This checks the built pages (dist/en and dist/tr, after npm run build):
// every quotation that a verse reference follows in the same sentence, such
// as "…" (2:155) or 'X' der (17:59), must be word for word in that verse's
// translation: Saheeh International (en) or Elmalılı (tr), from Tanzil
// (.cache/quran). References after our own words are shown as "see" / "bkz."
// by src/lib/md.ts, so no other text can be read as a verse.
// Punctuation, brackets and case are ignored; "…" splits a quotation into
// parts that must each be found. Exits non-zero on any mismatch.
//   node scripts/check-verse-refs.mjs
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const load = (f) => {
  const m = new Map();
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const [s, a, ...t] = line.split('|');
    if (t.length) m.set(`${s}:${a}`, t.join('|'));
  }
  return m;
};
const Q = { en: load('.cache/quran/en.txt'), tr: load('.cache/quran/tr.txt') };
const norm = (t) =>
  t
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
const verses = (q, s, a, b) =>
  Array.from({ length: b - a + 1 }, (_, i) => q.get(`${s}:${a + i}`) ?? '').join(' ');


// What the reader sees: the built pages (run after npm run build).
const decode = (h) =>
  h
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<\/(p|li|h\d|blockquote|div|dt|dd|figcaption|summary)>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');
function* pages(dir) {
  for (const n of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, n.name);
    if (n.isDirectory()) yield* pages(p);
    else if (n.name === 'index.html') yield p;
  }
}
let ok = 0;
const bad = new Set();
for (const lang of ['en', 'tr']) {
  for (const file of pages(path.join('dist', lang))) {
    const html = readFileSync(file, 'utf8');
    const body = html.slice(html.indexOf('<main'), html.lastIndexOf('</main>'));
    const page = path.relative('dist', path.dirname(file));
    for (const line of decode(body).split('\n')) {
      let from = 0; // quotations after the previous verse reference only
      for (const m of line.matchAll(/\((\d{1,3}):(\d{1,3})(?:[-–](\d{1,3}))?/g)) {
        const s = +m[1];
        if (s < 1 || s > 114) continue;
        const a = +m[2];
        const b = m[3] ? +m[3] : a;
        const seg = line.slice(from, m.index);
        from = m.index + m[0].length;
        // The quotation the reference belongs to: one that ends right before
        // it ("…" (2:155), "…," (23:8), **"…"** (109:6)), or one joined to it by
        // a verb of saying ("…" der (17:59), '…' diye seslendi (21:83)).
        const q = seg.match(
          /(?:"([^"]+)"|(?<![\p{L}])'([^']+)'(?![\p{L}])|“([^”]+)”)[*,.\s]*(?:(?:der|dedi|diyor|diye|söyler|buyurdu|says|said|asks|sorar)[^"'“”().]{0,40})?$/u,
        );
        if (!q) continue;
        const text = q[1] ?? q[2] ?? q[3];
        const hay = norm(verses(Q[lang], s, a, b));
        const parts = text
          .split(/…|\.\.\./)
          .map(norm)
          .filter((p) => p.length > 3);
        if (!parts.length) continue;
        if (parts.every((p) => hay.includes(p))) ok++;
        else bad.add(`${page} (${m[0].slice(1)}): "${text.slice(0, 110)}"`);
      }
    }
  }
}
for (const b of bad) console.log('MISMATCH', b);
console.log(`${ok} quotations before a verse reference match; ${bad.size} do not.`);
process.exit(bad.size ? 1 : 0);
