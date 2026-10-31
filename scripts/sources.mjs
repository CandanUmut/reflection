// Fetches original source texts so that every citation can be checked
// against what it cites. Downloads are cached in .cache/sources/.
//
//   node scripts/sources.mjs hadith muslim 2752      text (EN + AR) and gradings
//   node scripts/sources.mjs hadith muslim 2752b     one narration (a = .01, b = .02 …)
//   node scripts/sources.mjs tafsir 11:107 tabari     one tafsir on one verse
//   node scripts/sources.mjs tafsirs                  the tafsir names available
//
// Hadith numbers follow sunnah.com: for Sahih Muslim that is Muhammad Fuad
// Abd al-Baqi's numbering (2752, with narrations 2752a, 2752b…), not the
// running number of the data source. Malik's Muwatta is numbered differently
// in the data and in citations, and al-Nawawi's Forty and the Forty Qudsi are
// compilations without their own gradings: those are refused as citations.
// Hadith data: fawazahmed0/hadith-api (public domain). Tafsir: Quran.com API v4.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const HADITH_DATA = 'fawazahmed0/hadith-api@1 (cdn.jsdelivr.net)';
const CACHE = '.cache/sources';

async function cached(name, url) {
  mkdirSync(CACHE, { recursive: true });
  const file = `${CACHE}/${name}`;
  if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const data = await res.json();
  // Write whole or not at all, so an interrupted download never leaves broken JSON.
  writeFileSync(`${file}.part`, JSON.stringify(data));
  renameSync(`${file}.part`, file);
  return data;
}

export const COLLECTIONS = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah'];
const REFUSED = {
  malik: "the data numbers Malik's Muwatta from 1 to 1858, unlike its citations; cite it by book and hadith in prose",
  nawawi: "al-Nawawi's Forty is a compilation; cite the original collection",
  qudsi: 'the Forty Qudsi is a compilation; cite the original collection',
};
// Bukhari and Muslim carry no per-hadith grade in the data: their collections
// are graded sahih as a whole by the scholars of hadith.
export const WHOLE_SAHIH = new Set(['bukhari', 'muslim']);

/**
 * The narration(s) a citation points to. `number` is as on sunnah.com: "2752"
 * (Muslim: every narration under it) or "2752b" (Muslim only: the second).
 * @returns {Promise<{ number: string, book?: number, hadith?: number, grades: { grade: string, by: string }[], en: string, ar: string }[]>}
 */
export async function getHadith(collection, number) {
  if (REFUSED[collection]) throw new Error(`${collection}: not accepted as a citation — ${REFUSED[collection]}`);
  if (!COLLECTIONS.includes(collection)) throw new Error(`collection must be one of: ${COLLECTIONS.join(', ')}`);
  const m = String(number).match(/^(\d+)([a-z]?)$/);
  if (!m) throw new Error(`${collection} ${number}: not a hadith number`);
  const [, num, letter] = m;
  if (letter && collection !== 'muslim')
    throw new Error(`${collection} ${number}: letter suffixes are used only for Muslim`);
  const [en, ar] = await Promise.all(
    ['eng', 'ara'].map((l) =>
      cached(
        `${l}-${collection}.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${l}-${collection}.json`,
      ),
    ),
  );
  const hits = en.hadiths.filter((h) =>
    collection === 'muslim'
      ? Math.floor(h.arabicnumber) === Number(num) &&
        (!letter || Math.round((h.arabicnumber - Number(num)) * 100) === letter.charCodeAt(0) - 96)
      : h.hadithnumber === Number(num),
  );
  return hits.map((h) => ({
    number: collection === 'muslim' ? String(h.arabicnumber) : String(h.hadithnumber),
    book: h.reference?.book,
    hadith: h.reference?.hadith,
    grades: (h.grades ?? []).map((g) => ({ grade: g.grade.trim(), by: g.name.trim() })),
    en: h.text.trim(),
    ar: (ar.hadiths.find((x) => x.hadithnumber === h.hadithnumber)?.text ?? '').trim(),
  }));
}

export const TAFSIRS = {
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

/** One tafsir's text on one verse. */
export async function getTafsir(ref, name) {
  const t = TAFSIRS[name];
  if (!t) throw new Error(`tafsir must be one of: ${Object.keys(TAFSIRS).join(', ')}`);
  const data = await cached(
    `tafsir-${name}-${ref.replace(':', '_')}.json`,
    `https://api.quran.com/api/v4/tafsirs/${t[0]}/by_ayah/${ref}`,
  );
  return { name: t[1], text: strip(data.tafsir?.text ?? '') };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const [kind, a, b] = process.argv.slice(2);
  if (kind === 'hadith') {
    const hits = await getHadith(a, b);
    if (!hits.length) {
      console.log(`No hadith ${a} ${b} in the data.`);
      process.exit(1);
    }
    for (const h of hits) {
      const grade = h.grades.length
        ? h.grades.map((g) => `${g.grade} — ${g.by}`).join('; ')
        : WHOLE_SAHIH.has(a)
          ? `Sahih (in Sahih ${a === 'bukhari' ? 'al-Bukhari' : 'Muslim'})`
          : 'no grade in data';
      console.log(`## ${a} ${h.number}  (book ${h.book}, hadith ${h.hadith})`);
      console.log(`Grade: ${grade}`);
      console.log(`EN: ${h.en}`);
      console.log(`AR: ${h.ar}\n`);
    }
  } else if (kind === 'tafsir') {
    const t = await getTafsir(a, b);
    console.log(`## ${t.name} on ${a}`);
    console.log(t.text || '(no text)');
  } else if (kind === 'tafsirs') {
    for (const [k, [, name]] of Object.entries(TAFSIRS)) console.log(`${k.padEnd(14)} ${name}`);
  } else {
    console.log('Usage: node scripts/sources.mjs hadith <collection> <number> | tafsir <s:a> <name> | tafsirs');
    process.exit(1);
  }
}
