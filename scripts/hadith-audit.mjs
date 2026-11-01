// Audits the hadith the site cites (Umut, 2026-10-31: show the grade of
// every hadith; no claim rests on a weak one).
//   node scripts/hadith-audit.mjs
// 1. Tokens ({hadith:collection:number}): exact. Each is looked up, its
//    grades read; weak and fabricated grades are listed so their pages can be
//    checked. Errors (no such hadith, no grade, unreadable grade, fetch
//    failure) make the script exit non-zero.
// 2. Prose citations ("Muslim 2752", "Tirmizî 2517"): a best-effort list of
//    citations not yet written as tokens, with their grades.
import { readFileSync, readdirSync } from 'node:fs';
import { getHadith, WHOLE_SAHIH } from './sources.mjs';
import { readGrade } from '../src/lib/hadith-grade.mjs';

const files = ['signs', 'questions', 'morals'].flatMap((g) =>
  readdirSync(`src/content/${g}`).map((f) => `src/content/${g}/${f}`),
);
const texts = files.map((f) => {
  const text = readFileSync(f, 'utf8');
  return { id: text.match(/^id: (\w+)/m)?.[1] ?? f, text };
});

async function grade(col, num) {
  const hits = await getHadith(col, num);
  if (!hits.length) throw new Error('no such hadith in the data');
  if (WHOLE_SAHIH.has(col)) return { kind: 'sahih', label: 'Sahih (in the collection)' };
  const gs = hits[0].grades;
  if (!gs.length) throw new Error('no grade in the data');
  const read = gs.map((g) => ({ ...readGrade(g.grade), by: g.by }));
  const kinds = new Set(read.map((g) => g.kind));
  return {
    kind: kinds.has('daif') ? (kinds.size > 1 ? 'mixed' : 'daif') : [...kinds][0],
    label: read.map((g) => `${g.en} — ${g.by}`).join('; '),
  };
}

let errors = 0;
const report = async (title, cites) => {
  console.log(`\n## ${title}\n`);
  for (const [key, ids] of [...cites].sort()) {
    const [col, num] = key.split(':');
    try {
      const g = await grade(col, num);
      const flag = g.kind === 'daif' ? 'WEAK ' : g.kind === 'mixed' ? 'MIXED' : g.kind === 'athar' ? 'ATHAR' : '     ';
      console.log(`${flag} ${key.padEnd(16)} ${[...ids].join(',').padEnd(12)} ${g.label}`);
    } catch (e) {
      errors++;
      console.log(`ERROR ${key.padEnd(16)} ${[...ids].join(',').padEnd(12)} ${e.message}`);
    }
  }
};

const tokens = new Map();
for (const { id, text } of texts)
  for (const m of text.matchAll(/\{hadith:([a-z]+):(\d+[a-z]?)\}/g)) {
    const k = `${m[1]}:${m[2]}`;
    if (!tokens.has(k)) tokens.set(k, new Set());
    tokens.get(k).add(id);
  }
await report('Tokens (exact)', tokens);

// Collection names in English and Turkish, followed closely by a number.
const NAMES = {
  bukhari: 'Bukh[aā]r[iī]|Buh[aâ]r[iî]',
  muslim: 'Muslim|Müslim',
  abudawud: 'Ab[uū] D[aā]w[uū]d|Eb[uû] D[aâ]v[uû]d',
  tirmidhi: 'Tirmidh[iī]|Tirmiz[iî]',
  nasai: "Nas[aā][ʾ']?[iī]|Nes[aâ][iî]",
  ibnmajah: 'Ibn M[aā]jah|[İI]bn M[aâ]ce',
};
const prose = new Map();
for (const { id, text } of texts) {
  const plain = text.replace(/https?:\/\/\S+/g, ' ').replace(/\{hadith:[^}]*\}/g, ' ');
  for (const [col, re] of Object.entries(NAMES))
    // Unicode-aware word edges: \b does not see ā or î as letters.
    for (const m of plain.matchAll(
      new RegExp(`(?<!\\p{L})(?:${re})(?!\\p{L})[ ,.]{1,3}(?:no\\.\\s*)?(\\d{1,5}[a-z]?)(?![\\p{L}\\d:])`, 'gu'),
    )) {
      const k = `${col}:${m[1]}`;
      if (!prose.has(k)) prose.set(k, new Set());
      prose.get(k).add(id);
    }
}
await report('Prose citations, not yet tokens (best effort)', prose);
console.log(`\n${tokens.size} tokens, ${prose.size} prose citations; ${errors} errors.`);
process.exit(errors ? 1 : 0);
