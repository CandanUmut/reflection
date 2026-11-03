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
    pages[d.id] = { title: d.title.en, url: `${SITE}${SEG[k]}/${d.slugs.en}/`, verses: d.verses ?? [] };
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
const output = (r) =>
  r.kind === 'audit'
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

**Save the report as:** \`${output(r)}\`
**Why this run comes here:** ${r.why}

Copy everything below the line into the deep-research tool, with deep research turned on.

---

${rules.trim()}

${(r.kind === 'audit' ? audit(r) : content(r)).trim()}
`;
  const file = `docs/research/prompts/run-${nn(r.n)}-${r.slug}.md`;
  fs.writeFileSync(P(file), body);
  readme.push(
    `| ${r.n} | [${r.title}](run-${nn(r.n)}-${r.slug}.md) | ${r.ids.join(', ')}${r.scan ? ' (+ scan of M1–M15)' : ''} | \`${output(r)}\` |`,
  );
  console.log('wrote', file, `(${body.split(/\s+/).length} words)`);
}
fs.writeFileSync(
  P('docs/research/prompts/runs.md'),
  `<!-- Generated by scripts/make-research-prompts.mjs. -->\n| Run | Prompt | Pages | Save the report as |\n|---|---|---|---|\n${readme.join('\n')}\n`,
);
