// Finds hadith by words in their English text, in the cached collections, with
// number (sunnah.com numbering) and grades — so a citation is looked up, never
// remembered.  node scripts/find-hadith.mjs "do not become angry" [collection]
import { readFileSync, existsSync } from 'node:fs';
import { getHadith, COLLECTIONS } from './sources.mjs';

const [query, only] = process.argv.slice(2);
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
const phrase = norm(query).trim();
for (const col of only ? [only] : COLLECTIONS) {
  if (!existsSync(`.cache/sources/eng-${col}.json`)) await getHadith(col, '1');
  const data = JSON.parse(readFileSync(`.cache/sources/eng-${col}.json`, 'utf8'));
  let shown = 0;
  for (const h of data.hadiths) {
    if (!norm(h.text).includes(phrase) || shown++ >= 3) continue;
    const num = col === 'muslim' ? String(Math.floor(h.arabicnumber)) : String(h.hadithnumber);
    const grade =
      (h.grades ?? []).map((g) => `${g.grade} (${g.name})`).join('; ') ||
      (col === 'bukhari' || col === 'muslim' ? 'Sahih (collection)' : 'no grade');
    console.log(`${col}:${num} | ${grade}\n  ${h.text.trim().replace(/\s+/g, ' ').slice(0, 230)}\n`);
  }
}
