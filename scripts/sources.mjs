// Fetches original source texts so that every citation can be checked
// against what it cites. Downloads are cached in .cache/sources/.
//
//   node scripts/sources.mjs hadith muslim 2752      text (EN + AR) and gradings
//   node scripts/sources.mjs tafsir 11:107 tabari     one tafsir on one verse
//   node scripts/sources.mjs tafsirs                  the tafsir names available
//
// Hadith numbers follow sunnah.com: for Sahih Muslim that is Muhammad Fuad
// Abd al-Baqi's numbering (e.g. 2752), not the running number of the data
// source, so Muslim is looked up by its Abd al-Baqi number. A number that
// covers several narrations (2752a, 2752b…) prints them all.
// Hadith data: fawazahmed0/hadith-api (public domain). Tafsir: Quran.com API v4.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CACHE = '.cache/sources';
mkdirSync(CACHE, { recursive: true });
const cached = async (name, url) => {
  const file = `${CACHE}/${name}`;
  if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const data = await res.json();
  writeFileSync(file, JSON.stringify(data));
  return data;
};

const COLLECTIONS = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'malik', 'nawawi', 'qudsi'];
// Bukhari and Muslim carry no per-hadith grade in the data: their collections
// are graded sahih as a whole by the scholars of hadith.
const WHOLE_SAHIH = { bukhari: 'Sahih (in Sahih al-Bukhari)', muslim: 'Sahih (in Sahih Muslim)' };

const TAFSIRS = {
  'ibn-kathir-en': [169, 'Ibn Kathir (abridged, English)'],
  'ibn-kathir': [14, 'Tafsir Ibn Kathir (Arabic)'],
  tabari: [15, 'Tafsir al-Tabari (Arabic)'],
  qurtubi: [90, 'Tafsir al-Qurtubi (Arabic)'],
  baghawi: [94, 'Tafsir al-Baghawi (Arabic)'],
  saadi: [91, 'Tafsir al-Sa‘di (Arabic)'],
  muyassar: [16, 'al-Tafsir al-Muyassar (Arabic)'],
  wasit: [93, 'al-Tafsir al-Wasit, Tantawi (Arabic)'],
  maarif: [168, "Ma'arif al-Qur'an (English)"],
};

const strip = (h) =>
  h
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();

const [kind, a, b] = process.argv.slice(2);
if (kind === 'hadith') {
  if (!COLLECTIONS.includes(a)) throw new Error(`collection must be one of: ${COLLECTIONS.join(', ')}`);
  const [en, ar] = await Promise.all(
    ['eng', 'ara'].map((l) =>
      cached(`${l}-${a}.json`, `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${l}-${a}.json`),
    ),
  );
  const num = String(b).replace(/[a-z]$/, '');
  const match = (h) => (a === 'muslim' ? Math.floor(h.arabicnumber) === Number(num) : String(h.hadithnumber) === num);
  const hits = en.hadiths.filter(match);
  if (!hits.length) {
    console.log(`No hadith ${a} ${b} in the data.`);
    process.exit(1);
  }
  for (const h of hits) {
    const arabic = ar.hadiths.find((x) => x.hadithnumber === h.hadithnumber)?.text ?? '';
    const grades = h.grades?.length
      ? h.grades.map((g) => `${g.grade} — ${g.name}`).join('; ')
      : (WHOLE_SAHIH[a] ?? 'no grade in data');
    console.log(
      `## ${a} ${a === 'muslim' ? h.arabicnumber : h.hadithnumber}  (book ${h.reference?.book}, hadith ${h.reference?.hadith})`,
    );
    console.log(`Grade: ${grades}`);
    console.log(`EN: ${h.text.trim()}`);
    console.log(`AR: ${arabic.trim()}\n`);
  }
} else if (kind === 'tafsir') {
  const t = TAFSIRS[b];
  if (!t) throw new Error(`tafsir must be one of: ${Object.keys(TAFSIRS).join(', ')}`);
  const data = await cached(
    `tafsir-${b}-${a.replace(':', '_')}.json`,
    `https://api.quran.com/api/v4/tafsirs/${t[0]}/by_ayah/${a}`,
  );
  console.log(`## ${t[1]} on ${a}`);
  console.log(strip(data.tafsir?.text ?? '(no text)'));
} else if (kind === 'tafsirs') {
  for (const [k, [, name]] of Object.entries(TAFSIRS)) console.log(`${k.padEnd(14)} ${name}`);
} else {
  console.log('Usage: node scripts/sources.mjs hadith <collection> <number> | tafsir <s:a> <name> | tafsirs');
}
