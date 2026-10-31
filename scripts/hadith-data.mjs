// Builds src/data/hadith.json: every hadith the content cites with a token
// such as {hadith:muslim:2752}, with its gradings by named scholars, taken
// from the source data (scripts/sources.mjs). Pages show the grade from this
// file, never a grade typed by hand. Every grade must be readable by
// src/lib/hadith-grade.mjs, and a hadith with no grade is refused: the build
// stops rather than show it as sound. Run after adding tokens:
//   npm run hadith
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { getHadith, WHOLE_SAHIH, HADITH_DATA } from './sources.mjs';
import { readGrade } from '../src/lib/hadith-grade.mjs';

const TOKEN = /\{hadith:([a-z]+):(\d+[a-z]?)\}/g;
const keys = new Set();
for (const dir of ['signs', 'questions', 'morals'])
  for (const f of readdirSync(`src/content/${dir}`))
    for (const m of readFileSync(`src/content/${dir}/${f}`, 'utf8').matchAll(TOKEN)) keys.add(`${m[1]}:${m[2]}`);

const hadith = {};
for (const key of [...keys].sort()) {
  const [collection, number] = key.split(':');
  const hits = await getHadith(collection, number);
  if (!hits.length) throw new Error(`${key}: no such hadith in the data`);
  const whole = WHOLE_SAHIH.has(collection);
  if (!whole && hits.length > 1) throw new Error(`${key}: points to ${hits.length} narrations`);
  const grades = whole ? [] : hits[0].grades;
  if (!whole && !grades.length) throw new Error(`${key}: no grade in the data — it cannot be shown with a grade`);
  for (const g of grades) readGrade(g.grade); // throws on any grade it cannot read
  hadith[key] = { whole, grades };
}
writeFileSync('src/data/hadith.json', JSON.stringify({ source: HADITH_DATA, hadith }, null, 1) + '\n');
console.log(`${keys.size} hadith written to src/data/hadith.json`);
