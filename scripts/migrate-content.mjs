// Builds src/content/{signs,questions,morals}/*.yaml from two inputs:
//   1. English: the research text itself, section by section (research-parse.mjs).
//   2. Turkish and page metadata: content-src/tr/<ID>.yaml, written by hand.
// The English is never retyped, so it cannot drift from the research.
// Run: node scripts/migrate-content.mjs [ID ...]
import fs from 'node:fs';
import path from 'node:path';
import { parse, stringify } from 'yaml';
import { research, parseSources } from './research-parse.mjs';

const root = path.resolve(import.meta.dirname, '..');
const R = research();
const only = process.argv.slice(2);

// Section numbers in each research template.
const SIGN = { tafsir: 2, howItWorks: 3, awe: 4, reflection: 5, honest: 6, viz: 7, sources: 8 };
const MORAL = { teachings: 1, scholarship: 2, evidence: 3, stories: 4, gaps: 5, viz: 6, sources: 7 };
const QUESTION = { steelman: 1, whyAsked: 2, shortAnswer: 3, honest: 8, viz: 9, sources: 10 };
const LAYER_KIND = {
  'religious explanation': 'religious',
  philosophy: 'philosophical',
  'philosophical analysis': 'philosophical',
  science: 'scientific',
  'scientific perspective': 'scientific',
  data: 'scientific',
  history: 'history',
  clinical: 'clinical',
  psychology: 'psychological',
  sociology: 'psychological',
  'psychological and social perspective': 'psychological',
};

/** A section's text without its trailing label, e.g. "[Established]" is kept as a tag in the body. */
const sec = (it, n) => {
  const s = it.sections[n];
  if (!s) throw new Error(`${it.id}: missing section ${n}`);
  const label = s.name.match(/\[(Established|Scholarly|Debated)(?: \/ (Established|Scholarly|Debated))?\]/);
  const tags = label
    ? [label[1], label[2]]
        .filter(Boolean)
        .map((l) => `[${l}]`)
        .join(' ') + '\n\n'
    : '';
  // Words written after the label in the heading ("[Scholarly]. There are two main readings") belong to the text.
  const after = s.name.split(/\]\.\s*/)[1];
  // "How it works — and where it stops": the words after the dash are part of what the section says.
  // "Honest note — important" is not such words: the flag shows it in the note's label.
  const dash = s.name
    .replace(/\s*\[.*$/, '')
    .split(/\s+—\s+/)[1]
    ?.replace(/^(important|gaps)\.?$/i, '');
  return tags + (after ? `${after}.\n\n` : '') + (dash && !after ? `…${dash}.\n\n` : '') + s.text;
};
const notApplicable = (t) => /^not (applicable|central)\.?$/i.test(t.trim());

function build(id, tr) {
  const it = R[id];
  if (!it) throw new Error(`${id} not found in research`);
  // enOverrides: rare, explicit replacements for research lines written to the site's
  // authors rather than its readers (e.g. M9: "weak evidence; do not feature it").
  // Each one is listed in the Turkish file with its reason, so the change is visible.
  const both = (key, en) => {
    if (tr[key] === undefined) throw new Error(`${id}: Turkish "${key}" missing`);
    return { tr: tr[key], en: tr.enOverrides?.[key] ?? en };
  };
  const sources = parseSources(it.sections[{ S: SIGN, M: MORAL, Q: QUESTION }[id[0]].sources].text, {
    splitSemicolons: id[0] === 'Q',
  }).map((s, i) => ({
    ...s,
    ...(tr.sourceLabels?.[i] ? { label: { tr: tr.sourceLabels[i], en: s.label } } : {}),
    // A link the research gives in a batch's closing source list, for a source named without one.
    ...(tr.sourceUrls?.[i] ? { url: tr.sourceUrls[i] } : {}),
  }));
  // Links the research lists once at the end of a batch, attached to the item they belong to.
  for (const extra of tr.extraSources ?? []) sources.push(extra);
  // A plain Turkish title takes its English from the research heading.
  const title =
    typeof tr.title === 'string' ? { tr: tr.title, en: it.heading.replace(/\s*\(HIGH\)\s*$/, '').trim() } : tr.title;
  const base = { id, slugs: tr.slugs, order: Number(id.slice(1)), theme: tr.theme, title };
  // Research visualization ideas, plus any built visualizations described in the Turkish file.
  const viz = (n) => [{ id: 'ideas', tr: tr.visualization ?? '', en: it.sections[n].text }, ...(tr.built ?? [])];

  if (id[0] === 'S') {
    return {
      ...base,
      verses: tr.verses,
      ...(tr.seeAlso ? { seeAlso: tr.seeAlso } : {}),
      ...(tr.pause ? { pause: { ref: tr.pause } } : {}),
      summary: tr.summary,
      ...(tr.verseNotes ? { verseNotes: tr.verseNotes } : {}),
      tafsir: both('tafsir', sec(it, SIGN.tafsir)),
      howItWorks: both('howItWorks', sec(it, SIGN.howItWorks)),
      awe: both('awe', sec(it, SIGN.awe)),
      reflection: both('reflection', sec(it, SIGN.reflection)),
      honestNotes: [
        {
          ...both('honest', sec(it, SIGN.honest)),
          ...(/important/.test(it.sections[SIGN.honest].name) ? { important: true } : {}),
        },
      ],
      visualizations: viz(SIGN.viz),
      sources,
    };
  }
  if (id[0] === 'M') {
    return {
      ...base,
      verses: tr.verses,
      summary: tr.summary,
      ...(tr.helpCard ? { helpCard: tr.helpCard } : {}),
      teachings: both('teachings', sec(it, MORAL.teachings)),
      scholarship: both('scholarship', sec(it, MORAL.scholarship)),
      evidence: both('evidence', sec(it, MORAL.evidence)),
      stories: both('stories', sec(it, MORAL.stories)),
      gaps: both('gaps', sec(it, MORAL.gaps)),
      visualizations: viz(MORAL.viz),
      sources,
    };
  }
  const layers = [4, 5, 6, 7]
    .map((n) => ({ n, s: it.sections[n] }))
    .filter(({ s }) => !notApplicable(s.text))
    // A layer set to null in the Turkish file is left out on purpose (e.g. a note to authors).
    .filter(({ n }) => tr.layers?.[n] !== null)
    .map(({ n, s }) => {
      const kind = LAYER_KIND[s.name.toLowerCase()];
      if (!kind) throw new Error(`${id}: unknown layer "${s.name}"`);
      if (!tr.layers?.[n]) throw new Error(`${id}: Turkish layer ${n} missing`);
      return { kind, tr: tr.layers[n], en: tr.enOverrides?.layers?.[n] ?? sec(it, n) };
    });
  return {
    ...base,
    sensitivity: tr.sensitivity ?? 'normal',
    helpCard: tr.helpCard ?? false,
    verses: tr.verses ?? [],
    summary: tr.summary,
    steelman: both('steelman', sec(it, QUESTION.steelman)),
    whyAsked: both('whyAsked', sec(it, QUESTION.whyAsked)),
    shortAnswer: both('shortAnswer', sec(it, QUESTION.shortAnswer)),
    layers,
    ...(tr.rangeOfViews ? { rangeOfViews: tr.rangeOfViews } : {}),
    honestLimits: both('honest', sec(it, QUESTION.honest)),
    visualizations: viz(QUESTION.viz),
    sources,
  };
}

const dirs = { S: 'signs', Q: 'questions', M: 'morals' };
for (const file of fs.readdirSync(path.join(root, 'content-src/tr')).sort()) {
  const id = file.replace(/\.yaml$/, '');
  if (only.length && !only.includes(id)) continue;
  const tr = parse(fs.readFileSync(path.join(root, 'content-src/tr', file), 'utf8'));
  const data = build(id, tr);
  // enEdits: exact rewordings of single research sentences that were written
  // to the site's makers ("Do not present…", "Avoid…") into statements for
  // readers, meaning kept. Each one carries its reason in the Turkish file,
  // and each must match exactly once, so a changed research text fails loudly.
  for (const { from, to } of tr.enEdits ?? []) {
    let hits = 0;
    const walk = (o) => {
      for (const [k, v] of Object.entries(o)) {
        if (k === 'en' && typeof v === 'string' && v.includes(from)) {
          hits += v.split(from).length - 1;
          o[k] = v.split(from).join(to);
        } else if (v && typeof v === 'object') walk(v);
      }
    };
    walk(data);
    if (hits !== 1) throw new Error(`${id}: enEdit matched ${hits} times: "${from}"`);
  }
  const name = `${id.toLowerCase().replace(/^([sqm])(\d)$/, '$10$2')}-${tr.slugs.en}.yaml`;
  const header = `# Generated by scripts/migrate-content.mjs — English verbatim from docs/research/${R[id].file} (${id}),\n# except the rewordings listed under enOverrides/enEdits in content-src/tr/${file},\n# which also holds the Turkish. Edit those, then re-run the script.\n`;
  fs.writeFileSync(path.join(root, 'src/content', dirs[id[0]], name), header + stringify(data, { lineWidth: 0 }));
  console.log('wrote', dirs[id[0]] + '/' + name);
}
