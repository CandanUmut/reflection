// Builds src/data/hadith.json: every hadith the content cites with a token
// such as {hadith:muslim:2752}, with its text and its gradings by named
// scholars, taken from the source data (scripts/sources.mjs). Pages show the
// grade from this file, never a grade typed by hand. Run after adding tokens:
//   npm run hadith
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const TOKEN = /\{hadith:([a-z]+):(\d+[a-z]?)\}/g;
const keys = new Set();
for (const dir of ['signs', 'questions', 'morals'])
  for (const f of readdirSync(`src/content/${dir}`))
    for (const m of readFileSync(`src/content/${dir}/${f}`, 'utf8').matchAll(TOKEN)) keys.add(`${m[1]}:${m[2]}`);

const out = {};
for (const key of [...keys].sort()) {
  const [col, num] = key.split(':');
  const text = execFileSync('node', ['scripts/sources.mjs', 'hadith', col, num], { encoding: 'utf8' });
  const first = text.split('\n## ')[0];
  const grade = first.match(/^Grade: (.*)$/m)[1];
  out[key] = {
    collection: col,
    number: num,
    whole: /^Sahih \(in /.test(grade),
    grades: /^Sahih \(in /.test(grade)
      ? []
      : grade.split('; ').map((g) => {
          const [gr, name] = g.split(' — ');
          return { grade: gr.trim(), by: name.trim() };
        }),
    en: first.match(/^EN: (.*)$/m)[1].trim(),
  };
}
writeFileSync('src/data/hadith.json', JSON.stringify(out, null, 1) + '\n');
console.log(`${Object.keys(out).length} hadith written to src/data/hadith.json`);
