// Lists every hadith cited in the site's content with its grade from the
// source data, and flags any that is weak (da'if) or missing, so no claim
// rests on a weak hadith (Umut, 2026-10-31).
//   node scripts/hadith-audit.mjs            all content
// Run scripts/sources.mjs once per collection first, or let this fetch.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const NAMES = {
  bukhari: /bukh[aā]r[iī]/i,
  muslim: /muslim/i,
  abudawud: /ab[uū] d[aā]w[uū]d/i,
  tirmidhi: /tirmidh[iī]/i,
  nasai: /nas[aā][ʾ']?[iī]/i,
  ibnmajah: /ibn m[aā]jah/i,
  malik: /muwa[tṭ][tṭ]a|m[aā]lik/i,
};
const files = ['signs', 'questions', 'morals'].flatMap((g) =>
  readdirSync(`src/content/${g}`).map((f) => `src/content/${g}/${f}`),
);
const rows = new Map();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const id = text.match(/^id: (\w+)/m)?.[1];
  for (const [col, re] of Object.entries(NAMES)) {
    const all = new RegExp(`(${re.source})[^0-9\\n]{0,24}?(\\d{1,5}[a-z]?)`, 'gi');
    for (const m of text.matchAll(all)) {
      // "Muslim 2752", "Bukhārī no. 3017": skip years and verse refs like 4:40.
      if (/\d:\s*$/.test(m[0].slice(0, -m[2].length))) continue;
      const key = `${col} ${m[2]}`;
      if (!rows.has(key)) rows.set(key, new Set());
      rows.get(key).add(id);
    }
  }
}
const WEAK = /da['ʿ]?[iī]f|weak|munkar|mawdu|fabricated|shadh/i;
let weak = 0;
for (const [key, ids] of [...rows].sort()) {
  const [col, num] = key.split(' ');
  let out;
  try {
    out = execFileSync('node', ['scripts/sources.mjs', 'hadith', col, num], { encoding: 'utf8' });
  } catch {
    out = 'Grade: NOT FOUND IN DATA';
  }
  const grade = out.match(/^Grade: (.*)$/m)?.[1] ?? '?';
  const flag = WEAK.test(grade) ? 'WEAK' : /NOT FOUND/.test(grade) ? 'CHECK' : '';
  if (flag) weak++;
  console.log(`${flag.padEnd(5)} ${key.padEnd(16)} ${[...ids].join(',').padEnd(14)} ${grade}`);
}
console.log(`\n${rows.size} hadith citations; ${weak} weak or not found.`);
