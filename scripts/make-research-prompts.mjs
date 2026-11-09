// Builds the deep-research prompts in docs/research/prompts/run-NN-*.md, one per
// run, highest impact first. Each prompt stands alone: the shared rules
// (_rules.md), the run's pages with their live URLs and what readers found
// missing, and the report format (_formats.md).
//   node scripts/make-research-prompts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const P = (...p) => path.join(root, ...p);
const read = (f) => fs.readFileSync(P(f), 'utf8');
const SITE = 'https://candanumut.github.io/reflection/en/';
const SEG = { Q: 'ask', M: 'live', S: 'reflect' };
const DIR = { Q: 'questions', M: 'morals', S: 'signs' };

// Pages: id → { title, url, verses }
const pages = {};
for (const [k, dir] of Object.entries(DIR))
  for (const f of fs.readdirSync(P('src/content', dir))) {
    const d = parse(read(`src/content/${dir}/${f}`));
    pages[d.id] = {
      title: d.title.en,
      trTitle: d.title.tr,
      url: `${SITE}${SEG[k]}/${d.slugs.en}/`,
      verses: d.verses ?? [],
    };
  }

// What readers found missing. Ask: the baseline reader round (one JSON per page).
// Live M1–M5: round-live-1. Hand-curated lists from the earlier run-01 prompt and
// from the later reader rounds (round-live-reflect-2/3) are added below.
const missing = {};
// Notes about problems already fixed on the site (internal file names shown to
// readers, links to other pages instead of content) are left out.
const stale = /01-batch|internal wording|earlier research|'S\d+'|"S\d+"|See S\d/i;
const add = (id, items) =>
  (missing[id] = [...new Set([...(missing[id] ?? []), ...items.filter((x) => !stale.test(x))])]);
for (const dir of ['round-1-ask-baseline', 'round-live-1']) {
  const d = P('docs/reader-scores', dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) {
    const j = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'));
    const follow = Object.values(j.readers ?? {}).flatMap((r) => r.followUps ?? []);
    add(j.id, [...(j.missing ?? []), ...follow.slice(0, 6).map((q) => `Readers ask: ${q}`)]);
  }
}
// The earlier, richer run-01 lists for Q3, Q32, Q28, Q36 replace the generic ones.
{
  const old = read('docs/research/prompts/_old-run-01-ask-god-and-religion.md');
  for (const m of old.matchAll(/^(Q\d+) \([^)]*\):\n((?:- .*\n)+)/gm))
    missing[m[1]] = m[2]
      .trim()
      .split('\n')
      .map((l) => l.slice(2));
}
add('M8', [
  "Name each of the four schools' positions on zakat details (jewellery, nisab by gold or silver) with works; give the nisab weights.",
  'The practical question: "I have a mortgage, student loan or pension — am I sinning, and is there leeway?" — the positions of named fiqh councils and scholars, including necessity (darura) arguments.',
  'Evidence on whether zakat and waqf actually reduce poverty, with numbers; inequality and zakat-collection data with sources.',
]);
add('M12', [
  'Named studies on religion and environmental behaviour, with numbers; water-stress data with a figure from the source.',
  '6:141 and 2:205 in context, with tafsir; whether reading 55:7–9 ("the balance") as ecology is classical or modern, with named commentators.',
  'A real reply to Lynn White (1967) and to "if the teaching is clear, why the record?" — not a two-line answer.',
]);
add('S5', [
  'Explain the 27.3 vs 29.5 day difference as the "phases" of 36:39; explain the Sun\'s own motion ("the sun runs", 36:38).',
  "Name the scholars who read the sun's prostration (Bukhari 3199, 4802) as obedience, with works; state the skeptic's point (the sun is always rising somewhere) and the classical answers.",
  'State the popular modern claim about these verses before weighing it; define falak.',
]);
add('S20', [
  'Science with species, authors and journals (alarm pheromones, stridulation), not "a classic study".',
  "The Solomon-and-the-ant story in later Jewish tradition (the skeptic's question), and whether the talking ant is meant literally, with named commentators.",
  'Quote al-Qurtubi and al-Razi on 27:18–19, not only name them.',
]);
add('S26', [
  'The last line of 24:40 ("he to whom Allah has not granted light") and the fatalism question, with the Light Verse 24:35 and named commentators.',
  'Numbers: how deep light reaches, and how that depends on water clarity; bioluminescence.',
  'Say which commentator said what (al-Tabari, Ibn Kathir, al-Qurtubi), not lumped together.',
]);

// Gaps every page of a section shares (reader rounds 2 and 3).
const common = {
  ask: [
    'Every verse with its setting (rule 4); every claim with a named holder (rule 5).',
    'The strongest objection stated in full before any answer; each reply followed by its limit.',
  ],
  live: [
    'Each verse in its context: who it addresses and the occasion; label scholarly or modern extensions (rule 4).',
    'No anonymous "scholars", "studies" or "the schools": name each, with works (rule 5).',
    'Research with named studies and numbers that test what the page actually claims (rule 8).',
    'The hardest critique of the teaching, answered at length (rule 9), and a section for the one who is struggling (rule 11).',
  ],
  reflect: [
    'The opening line ("In brief") about this verse, not a stray fact.',
    'Classical tafsir: named commentators quoted on this verse, and where they differ; never lumped together.',
    "Science tied to the verse's own words, with authors, journals and numbers; nothing unrelated (rule 8).",
    'The popular modern claim about the verse stated fairly before it is weighed (honest notes).',
    'A real reflection (120–250 words), not a single line.',
  ],
};

const runs = [
  {
    n: 1,
    kind: 'audit',
    slug: 'audit-what-is-live',
    title: 'Check what is already live',
    ids: ['Q1', 'Q7', 'Q13', 'Q14', 'Q31'],
    scan: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15'],
    why: 'Fixes what readers can already see. The deep Ask answers have unchecked scholar quotations and figures, and the Justice page showed that sentences can stretch a source beyond its context.',
  },
  {
    n: 2,
    kind: 'ask',
    slug: 'ask-god-and-religion',
    title: 'Ask — God and religion',
    ids: ['Q3', 'Q32', 'Q28', 'Q36'],
    why: 'The lowest reader scores on the site (2.8–3.5), on the questions that decide whether a doubter keeps reading.',
  },
  {
    n: 3,
    kind: 'ask',
    slug: 'ask-meaning-and-mind',
    title: 'Ask — meaning, mind and miracles',
    ids: ['Q29', 'Q33', 'Q34', 'Q26'],
    why: 'Scores 3.0–3.8: philosophical questions that need real arguments, not assertions.',
  },
  {
    n: 4,
    kind: 'ask',
    slug: 'ask-hard-history',
    title: 'Ask — hard history and ethics',
    ids: ['Q20', 'Q21', 'Q22', 'Q25'],
    why: "The most attacked topics (Aisha's age, slavery, Banu Qurayza, homosexuality). A weak or evasive answer here costs the most trust.",
  },
  {
    n: 5,
    kind: 'ask',
    slug: 'ask-women-and-family',
    title: 'Ask — women and family',
    ids: ['Q6', 'Q23', 'Q24'],
    why: "Scores 3.2–5.3 on questions that touch many readers' own lives; fiqh of the four schools matters here.",
  },
  {
    n: 6,
    kind: 'ask',
    slug: 'ask-pastoral',
    title: 'Ask — for the one who is hurting',
    ids: ['Q8', 'Q38', 'Q15', 'Q16'],
    why: 'Readers who come in pain (intrusive thoughts, a crisis of doubt, unanswered prayer, disaster). Care and accuracy both matter most here.',
  },
  {
    n: 7,
    kind: 'live',
    slug: 'live-1',
    title: 'Live I',
    ids: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'],
    why: 'Live is read by everyone, not only doubters; its pages score about 6 and need context, named scholars and real research.',
  },
  {
    n: 8,
    kind: 'live',
    slug: 'live-2',
    title: 'Live II',
    ids: ['M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15'],
    why: 'The rest of Live.',
  },
  {
    n: 9,
    kind: 'ask',
    slug: 'ask-truth-claims',
    title: 'Ask — prophethood, the Quran and hadith',
    ids: ['Q27', 'Q4', 'Q11', 'Q12'],
    why: 'The evidence questions (why believe Muhammad (pbuh), preservation, hadith reliability, "scientific miracles").',
  },
  {
    n: 10,
    kind: 'reflect',
    slug: 'reflect-1',
    title: 'Reflect I',
    ids: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
    why: 'Reflect scores about 5.5: the science reads as bullets with vague citations; S5 is the weakest page.',
  },
  {
    n: 11,
    kind: 'ask',
    slug: 'ask-creation-and-freedom',
    title: 'Ask — creation, freedom and the afterlife',
    ids: ['Q2', 'Q5', 'Q17', 'Q30'],
    why: 'Destiny, evolution, "who created God", the afterlife: scores 3.8–5.3.',
  },
  {
    n: 12,
    kind: 'reflect',
    slug: 'reflect-2',
    title: 'Reflect II',
    ids: ['S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'S16'],
    why: 'Includes the most debated signs (fine-tuning, mountains as pegs).',
  },
  {
    n: 13,
    kind: 'ask',
    slug: 'ask-practice',
    title: 'Ask — practice',
    ids: ['Q37', 'Q35', 'Q10', 'Q9'],
    why: 'Why pray, fast and worship; spiritual but not religious: scores 3.2–5.7.',
  },
  {
    n: 14,
    kind: 'reflect',
    slug: 'reflect-3',
    title: 'Reflect III',
    ids: ['S17', 'S18', 'S19', 'S20', 'S21', 'S22', 'S23', 'S24', 'S25'],
    why: 'Includes iron, the expanding heavens and the smoke-like origin, where overclaims are common.',
  },
  {
    n: 15,
    kind: 'ask',
    slug: 'ask-community',
    title: 'Ask — religious people and sects',
    ids: ['Q18', 'Q19'],
    why: 'Hypocrisy and sects: scores 5.3.',
  },
  {
    n: 16,
    kind: 'reflect',
    slug: 'reflect-4',
    title: 'Reflect IV',
    ids: ['S26', 'S27', 'S28', 'S29', 'S30', 'S31', 'S32', 'S33'],
    why: 'The last Reflect pages.',
  },
  {
    n: 17,
    kind: 'verify',
    slug: 'verify-removed-claims',
    title: 'Check the claims taken off the pages',
    items: 'run17',
    why: 'In November 2026, 82 unchecked claims were taken off the pages (docs/CONTENT_GAPS.md), and M10 lost its scholars section. Those that hold up can go back, with a real source.',
  },
  {
    n: 18,
    kind: 'sources',
    slug: 'primary-sources-ask',
    title: 'Primary sources for Ask',
    items: 'run18',
    why: 'Sensitive Ask pages (slavery, Banu Qurayza, who created God, sects) lean on Wikipedia and other popular sites. Scientists, students and skeptics need the primary works.',
  },
  {
    n: 19,
    kind: 'sources',
    slug: 'primary-sources-reflect-live',
    title: 'Primary sources for Reflect and Live',
    items: 'run19',
    why: "Science claims on Reflect and Live pages cite Wikipedia, AntWiki, NASA's children's site and similar; the papers behind them are needed.",
  },
  {
    n: 20,
    kind: 'sources',
    slug: 'scholars-from-their-books',
    title: 'Scholars quoted from their own books',
    items: 'run20',
    intro:
      "Each sentence below quotes or reports a scholar through a Q&A or fatwa website (IslamQA, SeekersGuidance, AboutIslam, Yaqeen and similar) or another secondary page, not from the scholar's own work. For each, find the passage in the scholar's own book (an edition, a translation, or the Arabic on al-Maktaba al-Shamila or Wikisource), read it, and confirm, correct or narrow the sentence. Quote the scholar's own words where you can, with work, volume and page.",
    why: 'The student of Islamic knowledge checks attributions. A scholar quoted through a website is the weakest link on the Ask and Live pages.',
  },
  {
    n: 21,
    kind: 'verify',
    slug: 'not-yet-consulted-ask',
    title: 'What the Ask pages have not yet consulted',
    items: 'run21',
    intro:
      'Each sentence below tells readers that a work "has not yet been consulted" or a claim "has not yet been checked". For each, read that work or find a source for that claim, and write what it says on the point: the sentence or short paragraph to add to the page, and whether the honest limit can then be removed. If you cannot read it, say so: the limit stays.',
    why: 'Ask pages tell readers 84 times that something was not yet read. Each one read is a gap closed.',
  },
  {
    n: 22,
    kind: 'verify',
    slug: 'not-yet-consulted-reflect-live',
    title: 'What the Reflect and Live pages have not yet consulted',
    items: 'run22',
    intro:
      'Each sentence below tells readers that a work "has not yet been consulted" or a claim "has not yet been checked" (or is "not yet sourced"). For each, read that work or find a source for that claim, and write what it says on the point: the sentence or short paragraph to add to the page, and whether the honest limit can then be removed. If you cannot read it, say so: the limit stays.',
    why: 'Reflect and Live pages carry 58 such limits, many on al-Razi and al-Qurtubi, which were not read for most Reflect pages.',
  },
  {
    n: 23,
    kind: 'pageaudit',
    slug: 'audit-older-ask',
    title: 'Line-by-line check of the earlier deep Ask answers',
    ids: ['Q1', 'Q7', 'Q13', 'Q14', 'Q31'],
    why: 'Run 1 could not open these pages, so their scholar quotations, figures and attributions were never checked one by one. The repository now has their text.',
  },
  {
    n: 24,
    kind: 'reflect',
    slug: 'deepen-reflect-a',
    title: 'Deepen the shortest Reflect pages (A)',
    ids: ['S25', 'S23', 'S19', 'S15', 'S22', 'S24', 'S21', 'S18'],
    why: 'The shortest pages on the site (about 600–900 words), below the 1,500-word target; most lack al-Razi and al-Qurtubi.',
  },
  {
    n: 25,
    kind: 'reflect',
    slug: 'deepen-reflect-b',
    title: 'Deepen the shortest Reflect pages (B)',
    ids: ['S12', 'S14', 'S10', 'S13', 'S2', 'S17', 'S11', 'S16'],
    why: 'The next shortest Reflect pages (about 900–1,100 words).',
  },
  {
    n: 26,
    kind: 'live',
    slug: 'deepen-live',
    title: 'Deepen the shortest Live pages',
    ids: ['M7', 'M6', 'M11'],
    why: 'The shortest Live pages (about 900–1,150 words); M6 and M7 were cut short for lack of sources read.',
  },
  {
    n: 27,
    kind: 'translate',
    slug: 'tr-01',
    title: 'Turkish 1 of 13',
    ids: ['Q3', 'Q32', 'Q28', 'Q36', 'Q29'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 28,
    kind: 'translate',
    slug: 'tr-02',
    title: 'Turkish 2 of 13',
    ids: ['Q33', 'Q34', 'Q26', 'Q20'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 29,
    kind: 'translate',
    slug: 'tr-03',
    title: 'Turkish 3 of 13',
    ids: ['Q21', 'Q22', 'Q25', 'Q6'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 30,
    kind: 'translate',
    slug: 'tr-04',
    title: 'Turkish 4 of 13',
    ids: ['Q23', 'Q24', 'Q8', 'Q38', 'Q15'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 31,
    kind: 'translate',
    slug: 'tr-05',
    title: 'Turkish 5 of 13',
    ids: ['Q16', 'Q7', 'Q13', 'Q14', 'Q31', 'M1', 'M2'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 32,
    kind: 'translate',
    slug: 'tr-06',
    title: 'Turkish 6 of 13',
    ids: ['M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 33,
    kind: 'translate',
    slug: 'tr-07',
    title: 'Turkish 7 of 13',
    ids: ['M12', 'M13', 'M14', 'M15', 'Q27', 'Q4', 'Q11'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 34,
    kind: 'translate',
    slug: 'tr-08',
    title: 'Turkish 8 of 13',
    ids: ['Q12', 'Q2', 'Q5', 'Q17', 'Q30'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 35,
    kind: 'translate',
    slug: 'tr-09',
    title: 'Turkish 9 of 13',
    ids: ['Q37', 'Q35', 'Q10', 'Q9', 'Q18'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 36,
    kind: 'translate',
    slug: 'tr-10',
    title: 'Turkish 10 of 13',
    ids: ['Q19', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 37,
    kind: 'translate',
    slug: 'tr-11',
    title: 'Turkish 11 of 13',
    ids: ['S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'S16', 'S17'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 38,
    kind: 'translate',
    slug: 'tr-12',
    title: 'Turkish 12 of 13',
    ids: ['S18', 'S19', 'S20', 'S21', 'S22', 'S23', 'S24', 'S25', 'S26', 'S27', 'S28'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
  {
    n: 39,
    kind: 'translate',
    slug: 'tr-13',
    title: 'Turkish 13 of 13',
    ids: ['S29', 'S30', 'S31', 'S32', 'S33'],
    why: 'The Turkish pages still show the earlier, shorter text.',
  },
];

const rules = read('docs/research/prompts/_rules.md').replace(/^<!--[\s\S]*?-->\s*/, '');
const formats = Object.fromEntries(
  read('docs/research/prompts/_formats.md')
    .replace(/^<!--[\s\S]*?-->\s*/, '')
    .split(/^## /m)
    .slice(1)
    .map((s) => [s.slice(0, s.indexOf('\n')).trim(), s.slice(s.indexOf('\n') + 1).trim()]),
);
const nn = (n) => String(n).padStart(2, '0');
// Audits and checking runs are not pages: they go in audits/, and Claude applies them by hand.
const output = (r) =>
  r.kind === 'translate'
    ? 'docs/research/tr/<page id>.md, one file per page'
    : ['audit', 'verify', 'sources', 'pageaudit'].includes(r.kind)
      ? `docs/research/audits/run-${nn(r.n)}-${r.slug}.md`
      : `docs/research/${20 + r.n}-run${nn(r.n)}-${r.slug}.md`;

const pageBlock = (id) => {
  const p = pages[id];
  const items = [...(missing[id] ?? [])];
  return [
    `### ${id} — ${p.title}`,
    `Current page (read it first): ${p.url}`,
    p.verses.length ? `Key verses on the page now: ${p.verses.join(', ')}` : '',
    items.length
      ? 'What readers found missing or asked — answer these where sources support it:\n' +
        items.map((x) => `- ${x}`).join('\n')
      : '',
  ]
    .filter(Boolean)
    .join('\n');
};

const audit = (r) => `## The task

This run does not write new pages. It checks pages that are already live, so that nothing on the site is wrong, stretched beyond its source, or wrongly attributed. Apply rules 1–8 above as a checker.

**Part A — check these deep answers line by line.** For each page, open it and check every quotation of a scholar, every figure and date, every attribution ("al-Ghazali says…", "the Hanafis hold…"), every hadith number and grade, and every verse's context (rule 4).

${r.ids.map((id) => `- ${id} — ${pages[id].title}: ${pages[id].url}`).join('\n')}

**Part B — check these specific claims**, which were written from memory and never verified:
1. M8: "the International Islamic Fiqh Academy of the OIC ruled in 1985 (Resolution 10) that any fixed increase on a loan is forbidden riba" — check the resolution's number, date and wording.
2. M8: "Al-Azhar's Islamic Research Academy, in 2002, held fixed returns from bank investment to be permissible" — check the body, the date and what it actually said.
3. M12: "If the Hour is about to come and one of you has a palm shoot in his hand, let him plant it" (Musnad Ahmad 12902; al-Adab al-Mufrad 479) "graded sahih by al-Albani" — check the numbers, the wording and the grading.
4. M1: al-Ghazali (in the Ihya'), as quoted by al-Nawawi (Riyad al-Salihin, chapter on permitted lying), that lying to protect an innocent person from an oppressor is required — check the passage and quote it exactly.

**Part C — scan the Live pages for stretched context and anonymous authorities only** (rules 2–5). Do not rewrite them; report each problem sentence.

${r.scan.map((id) => `- ${id} — ${pages[id].title}: ${pages[id].url}`).join('\n')}

## Report format

\`\`\`
## Part A — <page id>
- "<the sentence on the page, quoted>" — **Verdict:** Correct | Needs context | Wrong | Wrongly attributed | Cannot verify — **Evidence:** <what the source actually says, quoted, with the reference> — **Fix:** <replacement text, quoting the Quran in Saheeh International exactly>

## Part B
1. <claim> — **Verdict:** … — **Evidence:** … — **Fix:** …

## Part C — <page id>
- "<sentence>" — **Problem:** stretched context | anonymous authority | wrong voice (rule 2) — **Evidence:** … — **Fix:** …

---
## Gaps
- <what you could not check, and why>
\`\`\`

List only sentences with a problem in Part C; in Part A, list every claim you checked, including the correct ones, so the check is visible.`;

const itemsOf = (r) => JSON.parse(read(`docs/research/prompts/_items-${r.items}.json`));
const itemList = (r) =>
  Object.entries(itemsOf(r))
    .sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true }))
    .map(
      ([id, list]) =>
        `### ${id} — ${pages[id].title}\nPage: ${pages[id].url}\n` +
        list
          .map((x) => (typeof x === 'string' ? `- "${x}"` : `- [${x.section || 'section not recorded'}] ${x.claim}`))
          .join('\n'),
    )
    .join('\n\n');
const checkFormat = (what) => `\`\`\`
## <page id> — <page title>
- **${what}:** <as listed>
  **Section:** <the section it belongs in>
  **Verdict:** Confirmed | Corrected | Not found
  **Source:** <full reference to the source you read: work, author, edition and page, or URL; primary where possible>
  **New text:** <the sentence(s) for the page, written for readers, naming the source in the sentence. Quote the Quran in Saheeh International exactly; cite hadith as {hadith:collection:number}. For "Not found", write: none.>

---
## Gaps
- <what you could not check, and why>
\`\`\``;
const verify = (r) => `## The task

${r.intro ?? "These claims were taken off the site's pages because no one had checked them. For each, find a reliable source and read it. If the claim holds, write the sentence that puts it back, with its source. If the source says something different, write the corrected sentence. If you cannot find it, say so: it stays off the page."} Apply rules 1–8 above as a checker. Read each page first (its URL is given; its text is also in the repository under src/content/), so the new text fits the section it goes into.

${itemList(r)}

## Report format

${checkFormat('Claim')}`;
const sourcesTask = (r) => `## The task

${r.intro ?? "Each sentence below rests on a popular or secondary source: Wikipedia, AntWiki, NASA StarChild (a children's site), Universe Today, News-Medical, KQED and similar. For each, find and read the primary source behind it: the peer-reviewed paper, the official dataset, the scholarly book or edition, or the classical text itself. Then confirm, correct or narrow the sentence."} Keep each claim's strength label honest ([Established], [Moderate], [Mixed], [Debated]); if the primary source is weaker than the sentence suggests, say so. Read each page first (its URL is given).

${itemList(r)}

## Report format

${checkFormat('Sentence')}`;
// Where each page's current English lives: the newest research file with its section.
const researchFiles = fs
  .readdirSync(P('docs/research'))
  .filter((f) => /^(0[7-9]|[1-9]\d)-.*\.md$/.test(f))
  .sort()
  .reverse();
const englishOf = (id) => {
  for (const f of researchFiles)
    if (new RegExp(`^## ${id} — `, 'm').test(read(`docs/research/${f}`))) return `docs/research/${f}`;
  return null;
};
const dirOf = { Q: 'questions', M: 'morals', S: 'signs' };
const pageAudit = (r) => `## The task

These deep answers are already live. Check each one line by line, as a checker applying rules 1–8 above: every quotation of a scholar, every figure and date, every attribution ("al-Ghazali says…", "the Hanafis hold…"), every hadith number and grade, and every verse's context (rule 4). Their full text is in this repository: the English research section in the file named below, and the page data under src/content/. List every claim you checked, including the correct ones, so the check is visible.

${r.ids.map((id) => `- ${id} — ${pages[id].title}: ${pages[id].url} (English: the section "## ${id} — " in ${englishOf(id)})`).join('\n')}

## Report format

${checkFormat('Claim')}`;
const translateRules = read('docs/research/prompts/_translate.md').replace(/^<!--[\s\S]*?-->\s*/, '');
const translate = (r) => `${translateRules.trim()}

## The task

Translate these pages into Turkish, one file per page. The English to translate is the page's section in the research file named next to it, from its "## …" line up to the next "## " line or "---" (leave out "### Sources read"). Save each page as **docs/research/tr/<page id>.md** (for example docs/research/tr/${r.ids[0]}.md).

${r.ids.map((id) => `- **${id}** — ${pages[id].title} · Turkish title on the site: "${pages[id].trTitle}" · English: the section "## ${id} — " in ${englishOf(id)}`).join('\n')}

Each file starts with its "## <id> — <Turkish title>" line and keeps every heading as rule 7 says.`;
const content = (r) => `## The task

Write the new, deeper version of each page below, in the report format at the end. The site already has these pages; readers found them too short or too vague. Read each current page first: keep what is correct and sourced, fix what is not (and list the fix under "Corrections to the current pages"), and answer what readers found missing.

Pages for this run:

${r.ids.map(pageBlock).join('\n\n')}

What every page in this section still needs (from the reader reviews):
${common[r.kind].map((x) => `- ${x}`).join('\n')}

## Report format

${formats[r.kind]}

${formats.end}

Write in English only. The Turkish is done separately.`;

const readme = [];
for (const r of runs) {
  const body = `# Run ${r.n} — ${r.title}

**Save ${r.kind === 'translate' ? 'the translations' : 'the report'} as:** \`${output(r)}\`
**Why this run comes here:** ${r.why}

Copy everything below the line into the deep-research tool, with deep research turned on.

---

${r.kind === 'translate' ? translate(r).trim() : rules.trim()}

${r.kind === 'translate' ? '' : (r.kind === 'audit' ? audit(r) : r.kind === 'verify' ? verify(r) : r.kind === 'sources' ? sourcesTask(r) : r.kind === 'pageaudit' ? pageAudit(r) : content(r)).trim()}
`.replace(/\n{3,}$/, '\n');
  const file = `docs/research/prompts/run-${nn(r.n)}-${r.slug}.md`;
  fs.writeFileSync(P(file), body);
  const ids = r.ids ?? Object.keys(itemsOf(r));
  readme.push(
    `| ${r.n} | [${r.title}](run-${nn(r.n)}-${r.slug}.md) | ${r.items ? `${ids.length} pages` : ids.join(', ')}${r.scan ? ' (+ scan of M1–M15)' : ''} | \`${output(r)}\` |`,
  );
  console.log('wrote', file, `(${body.split(/\s+/).length} words)`);
}
fs.writeFileSync(
  P('docs/research/prompts/runs.md'),
  `<!-- Generated by scripts/make-research-prompts.mjs. -->\n| Run | Prompt | Pages | Save the report as |\n|---|---|---|---|\n${readme.join('\n')}\n`,
);
