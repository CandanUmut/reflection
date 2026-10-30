// Builds src/data/quran.json: Arabic text, Turkish (Elmalılı Hamdi Yazır) and
// English (Saheeh International) translations, and word-by-word transliteration,
// for every verse the site references — nothing more.
//
// Sources and terms:
//  - Arabic (Uthmani) and both translations: Tanzil Project, https://tanzil.net
//    Verbatim use with attribution and a link to tanzil.net. The text is never edited.
//  - Transliteration: Quran.com word-by-word data (API v4), joined with spaces.
//
// Run: node scripts/quran-data.mjs   (downloads into .cache/ on first run)
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.resolve(import.meta.dirname, '..');
const cache = path.join(root, '.cache/quran');
fs.mkdirSync(cache, { recursive: true });

const SOURCES = {
  ar: 'https://tanzil.net/pub/download/index.php?marks=true&sajdah=true&rub=false&quranType=uthmani&outType=txt-2&agree=true',
  en: 'https://tanzil.net/trans/?transID=en.sahih&type=txt-2',
  tr: 'https://tanzil.net/trans/?transID=tr.yazir&type=txt-2',
};

async function load(key) {
  const file = path.join(cache, `${key}.txt`);
  if (!fs.existsSync(file)) {
    const res = await fetch(SOURCES[key]);
    if (!res.ok) throw new Error(`${key}: HTTP ${res.status}`);
    fs.writeFileSync(file, await res.text());
  }
  const map = new Map();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^(\d+)\|(\d+)\|(.*)$/);
    if (m) map.set(`${m[1]}:${m[2]}`, m[3].trim());
  }
  if (map.size !== 6236) throw new Error(`${key}: expected 6236 verses, got ${map.size}`);
  return map;
}

// Every "s:a" or "s:a-b" under a `verses` or `ref` key anywhere in the content.
function collectRefs() {
  const refs = new Set();
  const visit = (node, key) => {
    if (typeof node === 'string' && (key === 'verses' || key === 'ref' || key === 'refs')) {
      const m = node.match(/^(\d+):(\d+)(?:-(\d+))?$/);
      if (!m) throw new Error(`Bad verse ref "${node}"`);
      const [s, a, b = a] = [m[1], +m[2], +(m[3] ?? m[2])];
      for (let i = a; i <= b; i++) refs.add(`${s}:${i}`);
    } else if (Array.isArray(node)) node.forEach((n) => visit(n, key));
    else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) visit(v, k);
  };
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.ya?ml$/.test(e.name)) visit(parse(fs.readFileSync(p, 'utf8')));
    }
  };
  walk(path.join(root, 'src/content'));
  walk(path.join(root, 'src/data'));
  return [...refs].sort((x, y) => {
    const [a, b] = x.split(':').map(Number),
      [c, d] = y.split(':').map(Number);
    return a - c || b - d;
  });
}

async function transliteration(ref, existing) {
  if (existing?.translit) return existing.translit;
  const url = `https://api.quran.com/api/v4/verses/by_key/${ref}?words=true&word_fields=transliteration`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`translit ${ref}: HTTP ${res.status}`);
  const { verse } = await res.json();
  return verse.words
    .filter((w) => w.char_type_name === 'word')
    .map((w) => w.transliteration.text)
    .join(' ');
}

const out = path.join(root, 'src/data/quran.json');
const previous = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')).verses : {};
const [ar, en, tr] = await Promise.all(['ar', 'en', 'tr'].map(load));
const verses = {};
for (const ref of collectRefs()) {
  if (!ar.has(ref)) throw new Error(`Unknown verse ${ref}`);
  verses[ref] = {
    ar: ar.get(ref),
    translit: await transliteration(ref, previous[ref]),
    en: en.get(ref),
    tr: tr.get(ref),
  };
}
fs.writeFileSync(
  out,
  JSON.stringify(
    {
      notice: [
        'Arabic: Tanzil Quran Text (Uthmani, v1.1), Copyright (C) 2007-2026 Tanzil Project, CC BY 3.0, verbatim. https://tanzil.net',
        'English: Saheeh International, via Tanzil Project (en.sahih), verbatim.',
        'Turkish: Elmalılı Hamdi Yazır, via Tanzil Project (tr.yazir), verbatim.',
        'Transliteration: Quran.com word-by-word data (api.quran.com v4).',
      ],
      verses,
    },
    null,
    1,
  ) + '\n',
);
console.log(`Wrote ${Object.keys(verses).length} verses to src/data/quran.json`);
