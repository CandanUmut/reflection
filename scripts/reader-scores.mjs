// Sums up a reader-critic round: satisfaction per page, per reader and per
// group (Ask, Live, Reflect), and the follow-up questions readers asked.
//   node scripts/reader-scores.mjs docs/reader-scores/round-0
// Writes SUMMARY.md into that folder and prints it.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const dir = process.argv[2];
const pages = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')));
const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
const f1 = (x) => (Number.isNaN(x) ? '–' : x.toFixed(1));
const READERS = ['doubter', 'outsider', 'student', 'scientist', 'hurting', 'skeptic'];
const CRITERIA = ['answers', 'depth', 'evidence', 'fairness', 'clarity', 'honesty'];
const order = (id) => ({ Q: 0, M: 1, S: 2 })[id[0]] * 1000 + parseInt(id.slice(1), 10);
pages.sort((a, b) => order(a.id) - order(b.id));

const out = [`# Reader satisfaction — ${dir.split('/').pop()}`, ''];
out.push('Scores are 1–10, from the reader critic (an AI reading the built pages as six kinds of visitor).', '');
out.push('## By group', '', '| Group | Pages | Satisfaction | Lowest page |', '|---|---|---|---|');
for (const g of ['ask', 'live', 'reflect']) {
  const ps = pages.filter((p) => p.group === g);
  if (!ps.length) continue;
  const sats = ps.map((p) => mean(READERS.map((r) => p.readers[r]?.satisfaction).filter(Number.isFinite)));
  const low = ps[sats.indexOf(Math.min(...sats))];
  out.push(`| ${g} | ${ps.length} | ${f1(mean(sats))} | ${low.id} (${f1(Math.min(...sats))}) |`);
}
out.push('', '## By reader', '', '| Reader | Satisfaction |', '|---|---|');
for (const r of READERS)
  out.push(`| ${r} | ${f1(mean(pages.map((p) => p.readers[r]?.satisfaction).filter(Number.isFinite)))} |`);
out.push('', '## By criterion', '', '| Criterion | Score |', '|---|---|');
for (const c of CRITERIA)
  out.push(
    `| ${c} | ${f1(mean(pages.flatMap((p) => READERS.map((r) => p.readers[r]?.scores?.[c])).filter(Number.isFinite)))} |`,
  );
out.push(
  '',
  '## By page',
  '',
  `| Page | Words | Satisfaction | ${READERS.join(' | ')} |`,
  `|---|---|---|${READERS.map(() => '---').join('|')}|`,
);
for (const p of pages) {
  const s = READERS.map((r) => p.readers[r]?.satisfaction);
  out.push(
    `| ${p.id} | ${p.words ?? '–'} | **${f1(mean(s.filter(Number.isFinite)))}** | ${s.map((x) => x ?? '–').join(' | ')} |`,
  );
}
out.push('', '## What readers asked next', '');
for (const p of pages) {
  out.push(`### ${p.id} — ${p.path}`, '');
  for (const r of READERS) for (const q of p.readers[r]?.followUps ?? []) out.push(`- (${r}) ${q}`);
  if (p.missing?.length) out.push('', '**Missing:** ' + p.missing.join('; '));
  out.push('');
}
writeFileSync(`${dir}/SUMMARY.md`, out.join('\n'));
console.log(out.join('\n'));
