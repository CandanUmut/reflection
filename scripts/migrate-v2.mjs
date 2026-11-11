// Deep answers (Phase 6 onward): builds question pages from the v2 research
// documents (docs/research/07-… and later, written to TEMPLATE-ask-v2.md) and
// their Turkish in content-src/tr-v2/<ID>.yaml. English is verbatim from the
// research, as with migrate-content.mjs; this runs after it and overlays the
// new answer onto the item it generated (title, slugs, visualizations stay).
//   node scripts/migrate-content.mjs && node scripts/migrate-v2.mjs
import fs from 'node:fs';
import path from 'node:path';
import { parse, stringify } from 'yaml';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const research = fs
  .readdirSync(path.join(root, 'docs/research'))
  .filter((f) => /^(0[7-9]|[1-9]\d)-.*\.md$/.test(f))
  .sort()
  // Newest first: a later research run (e.g. 27-run07-live-1.md) replaces an earlier
  // section for the same page (10-live-deep-1.md).
  .reverse()
  .map((f) => ({ file: f, text: fs.readFileSync(path.join(root, 'docs/research', f), 'utf8') }));

// One "## Q<n> — title" section → its "### Heading" blocks.
function section(id) {
  for (const { file, text } of research) {
    const m = text.match(new RegExp(`^## ${id} — .*$([\\s\\S]*?)(?=^## [QMS]\\d+ — |^---\\s*$|(?![\\s\\S]))`, 'm'));
    if (m) {
      const blocks = {};
      for (const b of m[1].split(/^### /m).slice(1)) {
        const nl = b.indexOf('\n');
        blocks[b.slice(0, nl).trim()] = b.slice(nl + 1).trim();
      }
      return { file, blocks };
    }
  }
  return null;
}
const need = (blocks, name, id) => {
  if (!blocks[name]) throw new Error(`${id}: research has no "### ${name}"`);
  return blocks[name];
};
const KINDS = new Set([
  'quran',
  'sunnah',
  'scholars',
  'fiqh',
  'history',
  'science',
  'reasoning',
  'objection',
  'heart',
  'views',
  'meaning',
  'practice',
  'research',
  'tafsir',
]);
// "#### kind — Title" parts of the full answer.
const parts = (src) =>
  src
    .split(/^#### /m)
    .slice(1)
    .map((p) => {
      const nl = p.indexOf('\n');
      const [kind, title] = p.slice(0, nl).split(' — ');
      // A label outside the known kinds ("#### In practice — …") becomes a practice
      // part under the report's own title, so no section is lost.
      return KINDS.has(kind.trim())
        ? { kind: kind.trim(), en: p.slice(nl + 1).trim() }
        : { kind: 'practice', title: (title ?? kind).trim(), en: p.slice(nl + 1).trim() };
    })
    // A section left with no text (e.g. after unchecked claims were removed) is dropped.
    .filter((p) => p.en);
// "**Question?** Answer…" paragraphs.
const followUps = (src) =>
  src
    .split(/\n\s*\n/)
    .map((p) => p.trim().match(/^\*\*(.+?)\*\*\s*([\s\S]+)$/))
    .filter(Boolean)
    .map((m) => ({ q: m[1].trim(), a: m[2].trim() }));
const sources = (src) =>
  src
    .split('\n')
    .filter((l) => l.startsWith('- '))
    .map((l) => {
      const label = cleanLabel(l.slice(2).trim());
      const url = label.match(/https?:\/\/[^\s)]+/)?.[0]?.replace(/[.,;]$/, '');
      return url ? { label, url } : { label };
    });
// Internal file paths never reach readers: "via the site's verified Tanzil data
// (`src/data/quran.json`)" reads "via the Tanzil text".
const cleanLabel = (label) =>
  label
    .replace(/the site's verified Tanzil data \(`src\/data\/quran\.json`\)/g, 'the Tanzil text')
    .replace(/,?\s*via `src\/data\/[^`]+`/g, '')
    .replace(/\s*\(`(?:src|scripts|docs)\/[^`]+`\)/g, '')
    // Working notes do not reach readers either: "see Gaps", "for this run".
    .replace(/[;,]?\s*see (?:Gaps|Corrections)\b/g, '')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/ (?:for|in) this run\b/g, '')
    .replace(/\bwas not read\b/g, 'not yet consulted')
    .replace(/\bwere not read\b/g, 'not yet consulted')
    .replace(/,?\s*as cited on the current page \(not re-read\)/g, '')
    .replace(
      /the current page's (longer )?(Ibn Kathir quotation[^;.(]*?)\s*(\(not re-read[^)]*\))?(?=[;.]|$)/g,
      'the $1$2',
    )
    .replace(/the current page/g, 'an earlier version of this page');

// Turkish (runs 27–39): docs/research/tr/<ID>.md mirrors the English section, with
// the same headings (### in English, #### kind words kept) and Turkish text. It is
// merged only where its shape matches the English exactly; otherwise the Turkish page
// keeps its previous text, and the mismatch is reported (it was translated from an
// older English version).
const trResearch = path.join(root, 'docs/research/tr');
const trBlocks = (id) => {
  const f = path.join(trResearch, `${id}.md`);
  if (!fs.existsSync(f)) return null;
  const m = fs
    .readFileSync(f, 'utf8')
    .match(new RegExp(`^## ${id} — .*$([\\s\\S]*?)(?=^## [QMS]\\d+ — |^---\\s*$|(?![\\s\\S]))`, 'm'));
  if (!m) return null;
  const blocks = {};
  for (const b of m[1].split(/^### /m).slice(1)) {
    const nl = b.indexOf('\n');
    blocks[b.slice(0, nl).trim()] = b.slice(nl + 1).trim();
  }
  return blocks;
};
const bullets = (src) =>
  src
    .split(/^- /m)
    .map((x) => x.trim())
    .filter(Boolean);
const trSkipped = [];
function withTurkish(id, enBlocks, out) {
  const T = trBlocks(id);
  if (!T) return out;
  const fail = (why) => (trSkipped.push(`${id}: ${why}`), out);
  // Same set of sections (Sources read is not translated).
  const keys = (b) =>
    Object.keys(b)
      .filter((k) => k !== 'Sources read')
      .sort()
      .join('|');
  if (keys(T) !== keys(enBlocks)) return fail('sections differ');
  const fuT = followUps(T['Questions readers ask next'] ?? '');
  const fuE = followUps(enBlocks['Questions readers ask next'] ?? '');
  if (fuT.length !== fuE.length) return fail(`follow-ups ${fuT.length} vs ${fuE.length}`);
  const partsKey = enBlocks['The full answer'] ? 'The full answer' : enBlocks['Go deeper'] ? 'Go deeper' : null;
  let pT = [];
  if (partsKey) {
    pT = parts(T[partsKey]);
    const pE = parts(enBlocks[partsKey]);
    if (pT.length !== pE.length || pT.some((p, i) => p.kind !== pE[i].kind)) return fail('parts differ');
  }
  for (const k of ['Honest notes', 'Points of awe'])
    if (T[k] && bullets(T[k]).length !== bullets(enBlocks[k]).length) return fail(`${k} differ`);
  const r = structuredClone(out);
  const setTr = (key, heading) => {
    if (T[heading] && r[key]) r[key] = { ...r[key], tr: T[heading] };
  };
  if (r.followUps)
    r.followUps = r.followUps.map((f, i) => ({ q: { ...f.q, tr: fuT[i].q }, a: { ...f.a, tr: fuT[i].a } }));
  if (partsKey && r.fullAnswer) {
    // The parts, then any extra "### …" section (Q8, Q15), as on the English side.
    const ask = new Set([
      'Sources read',
      'The question, at its strongest',
      'Why people ask it',
      'Short answer',
      'The full answer',
      'Questions readers ask next',
      'Honest limits',
    ]);
    const titled = T[partsKey]
      .split(/^#### /m)
      .slice(1)
      .map((x) => ({
        title: x.slice(0, x.indexOf('\n')).split(' — ').slice(1).join(' — ').trim(),
        text: x.slice(x.indexOf('\n') + 1).trim(),
      }))
      .filter((x) => x.text);
    const extra =
      id[0] === 'Q'
        ? Object.keys(T)
            .filter((h) => !ask.has(h))
            .map((h) => ({ title: h, text: T[h] }))
        : [];
    const all = [...titled, ...extra];
    if (all.length !== r.fullAnswer.length) return fail(`parts ${all.length} vs ${r.fullAnswer.length}`);
    r.fullAnswer = r.fullAnswer.map((p, i) => ({
      ...p,
      tr: all[i].text,
      ...(all[i].title ? { title: { ...(p.title ?? { en: all[i].title }), tr: all[i].title } } : {}),
    }));
  }
  if (id[0] === 'S') {
    setTr('summary', 'In brief');
    setTr('verseNotes', 'Verse note');
    setTr('tafsir', 'Classical tafsir');
    setTr('howItWorks', 'How it works');
    setTr('awe', 'Points of awe');
    setTr('reflection', 'The reflection');
    if (T['Honest notes']) {
      const nT = bullets(T['Honest notes']);
      r.honestNotes = r.honestNotes.map((n, i) => ({ ...n, tr: nT[i] }));
    }
  } else if (id[0] === 'M') {
    setTr('summary', 'In brief');
    setTr('gaps', 'Honest limits');
  } else {
    setTr('steelman', 'The question, at its strongest');
    setTr('whyAsked', 'Why people ask it');
    setTr('shortAnswer', 'Short answer');
    setTr('honestLimits', 'Honest limits');
  }
  r.translatedFrom = 'docs/research/tr/' + id + '.md';
  return r;
}

const dirs = { Q: 'questions', M: 'morals', S: 'signs' };
// Every question with a v2 research section; Turkish from content-src/tr-v2
// when it exists. Without it the page is English-only v2: the Turkish page
// keeps its previous text (layers, range of views) until the Turkish is added.
const trDir = path.join(root, 'content-src/tr-v2');
const ids = new Set(fs.existsSync(trDir) ? fs.readdirSync(trDir).map((f) => f.replace(/\.yaml$/, '')) : []);
for (const { text } of research) for (const m of text.matchAll(/^## ([QMS]\d+) — /gm)) ids.add(m[1]);
for (const id of [...ids].sort((a, b) => a.localeCompare(b) || a.slice(1) - b.slice(1))) {
  const file = `${id}.yaml`;
  const tr = fs.existsSync(path.join(trDir, file)) ? parse(fs.readFileSync(path.join(trDir, file), 'utf8')) : null;
  const found = section(id);
  if (!found) throw new Error(`${id}: no "## ${id} — " section in docs/research/07-… files`);
  const { blocks } = found;
  const dir = path.join(root, 'src/content', dirs[id[0]]);
  const name = fs.readdirSync(dir).find((f) => f.startsWith(id.toLowerCase().replace(/^([sqm])(\d)$/, '$10$2') + '-'));
  const item = parse(fs.readFileSync(path.join(dir, name), 'utf8'));

  if (id[0] === 'S') {
    // Reflect: the four layers stay separate. A deepened layer replaces only its
    // English text; Turkish keeps the previous page until it is added.
    const dir = path.join(root, 'src/content/signs');
    const name = fs.readdirSync(dir).find((f) => f.startsWith(id.toLowerCase().replace(/^s(\d)$/, 's0$1') + '-'));
    const item = parse(fs.readFileSync(path.join(dir, name), 'utf8'));
    const src = sources(need(blocks, 'Sources read', id));
    const seen = new Set(src.map((x) => x.label));
    // Turkish keeps the previous text; a layer that had none stays English-only (tr omitted).
    const layer = (key, heading) =>
      blocks[heading]
        ? {
            [key]: {
              ...(item[key]?.tr && item[key].tr !== item[key].en ? { tr: item[key].tr } : {}),
              en: blocks[heading],
            },
          }
        : {};
    const out = {
      ...item,
      ...layer('summary', 'In brief'),
      ...layer('verseNotes', 'Verse note'),
      ...layer('tafsir', 'Classical tafsir'),
      ...layer('howItWorks', 'How it works'),
      ...layer('awe', 'Points of awe'),
      ...layer('reflection', 'The reflection'),
      // Honest notes: one per top-level bullet. The Turkish page keeps the earlier
      // notes (legacyHonestNotes) until the new ones are translated: they must stay visible.
      ...(blocks['Honest notes']
        ? {
            honestNotes: blocks['Honest notes']
              .split(/^- /m)
              .map((x) => x.trim())
              .filter(Boolean)
              .map((en) => ({ en })),
            legacyHonestNotes: item.legacyHonestNotes ?? item.honestNotes.filter((n) => n.tr),
          }
        : {}),
      followUps: followUps(need(blocks, 'Questions readers ask next', id)).map((f) => ({
        q: { en: f.q },
        a: { en: f.a },
      })),
      legacySources: item.legacySources ?? item.sources,
      sources: [
        ...src,
        ...(item.legacySources ?? item.sources).filter(
          (x) => !seen.has(typeof x.label === 'string' ? x.label : x.label.en),
        ),
      ],
    };
    const header = `# ${id}: layers deepened by scripts/migrate-v2.mjs from docs/research/${found.file} (English); the rest as before.\n`;
    const prev = fs
      .readFileSync(path.join(dir, name), 'utf8')
      .split('\n')
      .filter((l) => l.startsWith('#') && !l.includes('migrate-v2'))
      .join('\n');
    fs.writeFileSync(
      path.join(dir, name),
      (prev ? prev + '\n' : '') + header + stringify(withTurkish(id, blocks, out), { lineWidth: 0 }),
    );
    console.log('wrote', `signs/${name}`, '(deepened, English only)');
    continue;
  }
  if (id[0] === 'M') {
    // Live: "In brief" → summary, "Go deeper" → the deep parts, "Honest limits"
    // → the honest-gap note. English first; Turkish keeps the previous page.
    const dir = path.join(root, 'src/content/morals');
    const name = fs.readdirSync(dir).find((f) => f.startsWith(id.toLowerCase().replace(/^m(\d)$/, 'm0$1') + '-'));
    const item = parse(fs.readFileSync(path.join(dir, name), 'utf8'));
    const src = sources(need(blocks, 'Sources read', id));
    const seen = new Set(src.map((x) => x.label));
    const out = {
      ...item,
      ...(blocks['In brief'] ? { summary: { tr: item.summary.tr, en: blocks['In brief'] } } : {}),
      fullAnswer: parts(need(blocks, 'Go deeper', id)).map((x) => ({
        kind: x.kind,
        ...(x.title ? { title: { en: x.title } } : {}),
        en: x.en,
      })),
      followUps: followUps(need(blocks, 'Questions readers ask next', id)).map((f) => ({
        q: { en: f.q },
        a: { en: f.a },
      })),
      gaps: { tr: item.gaps.tr, en: need(blocks, 'Honest limits', id) },
      // The page's own earlier sources are kept once in legacySources, so re-runs never pile up.
      legacySources: item.legacySources ?? item.sources,
      sources: [
        ...src,
        ...(item.legacySources ?? item.sources).filter(
          (x) => !seen.has(typeof x.label === 'string' ? x.label : x.label.en),
        ),
      ],
    };
    const header = `# Generated by scripts/migrate-v2.mjs — English verbatim from docs/research/${found.file} (${id}),\n# Turkish: the previous page, until its Turkish is added. Edit the research, then re-run migrate-content.mjs and migrate-v2.mjs.\n`;
    fs.writeFileSync(path.join(dir, name), header + stringify(withTurkish(id, blocks, out), { lineWidth: 0 }));
    console.log('wrote', `morals/${name}`, '(v2, English only)');
    continue;
  }
  // Any extra "### …" section a report adds (e.g. "Practical steps for the moment it
  // happens") becomes one more part of the full answer, titled as in the report.
  const known = new Set([
    'Sources read',
    'The question, at its strongest',
    'Why people ask it',
    'Short answer',
    'The full answer',
    'Questions readers ask next',
    'Honest limits',
  ]);
  const extra = Object.keys(blocks)
    .filter((h) => !known.has(h))
    .map((h) => ({ kind: 'practice', title: h, en: blocks[h] }));
  const en = [...parts(need(blocks, 'The full answer', id)), ...extra];
  const fu = followUps(need(blocks, 'Questions readers ask next', id));
  const src = sources(need(blocks, 'Sources read', id));
  let out;
  if (tr) {
    if (en.length !== tr.fullAnswer.length || en.some((p, i) => p.kind !== tr.fullAnswer[i].kind))
      throw new Error(`${id}: full-answer parts differ between research (${en.map((p) => p.kind)}) and Turkish`);
    if (fu.length !== (tr.followUps ?? []).length)
      throw new Error(`${id}: ${fu.length} follow-ups in research, ${tr.followUps?.length ?? 0} in Turkish`);
    out = {
      ...item,
      verses: tr.verses ?? item.verses,
      ...(tr.helpCard !== undefined ? { helpCard: tr.helpCard } : {}),
      steelman: { tr: tr.steelman, en: need(blocks, 'The question, at its strongest', id) },
      whyAsked: { tr: tr.whyAsked, en: need(blocks, 'Why people ask it', id) },
      shortAnswer: { tr: tr.shortAnswer, en: need(blocks, 'Short answer', id) },
      layers: [],
      fullAnswer: en.map((p, i) => ({
        kind: p.kind,
        ...(tr.fullAnswer[i].title ? { title: { tr: tr.fullAnswer[i].title.tr, en: tr.fullAnswer[i].title.en } } : {}),
        tr: tr.fullAnswer[i].text,
        en: p.en,
      })),
      followUps: fu.map((f, i) => ({ q: { tr: tr.followUps[i].q, en: f.q }, a: { tr: tr.followUps[i].a, en: f.a } })),
      honestLimits: { tr: tr.honestLimits, en: need(blocks, 'Honest limits', id) },
      sources: src.map((s, i) => (tr.sourceLabels?.[i] ? { ...s, label: { tr: tr.sourceLabels[i], en: s.label } } : s)),
    };
    delete out.rangeOfViews; // the v2 range of views is a part of the full answer
  } else {
    const keep = (k, heading) => ({ tr: item[k].tr, en: need(blocks, heading, id) });
    const seen = new Set(src.map((s) => (typeof s.label === 'string' ? s.label : s.label.en)));
    out = {
      ...item,
      steelman: keep('steelman', 'The question, at its strongest'),
      whyAsked: keep('whyAsked', 'Why people ask it'),
      shortAnswer: keep('shortAnswer', 'Short answer'),
      fullAnswer: en.map((p) => ({ kind: p.kind, ...(p.title ? { title: { en: p.title } } : {}), en: p.en })),
      followUps: fu.map((f) => ({ q: { en: f.q }, a: { en: f.a } })),
      honestLimits: keep('honestLimits', 'Honest limits'),
      // The page's own earlier sources are kept once in legacySources, so re-runs never pile up.
      legacySources: item.legacySources ?? item.sources,
      sources: [
        ...src,
        ...(item.legacySources ?? item.sources).filter(
          (s) => !seen.has(cleanLabel(typeof s.label === 'string' ? s.label : s.label.en)),
        ),
      ],
    };
  }
  const header = `# Generated by scripts/migrate-v2.mjs — English verbatim from docs/research/${found.file} (${id}),\n# ${tr ? `Turkish from content-src/tr-v2/${file}` : 'Turkish: the previous page, until content-src/tr-v2/' + file + ' exists'}. Edit those, then re-run migrate-content.mjs and migrate-v2.mjs.\n`;
  fs.writeFileSync(path.join(dir, name), header + stringify(withTurkish(id, blocks, out), { lineWidth: 0 }));
  console.log('wrote', `${dirs[id[0]]}/${name}`, tr ? '(v2)' : '(v2, English only)');
}
if (trSkipped.length)
  console.log(
    `Turkish kept as before for ${trSkipped.length} pages (shape differs from the English):\n  ` +
      trSkipped.join('\n  '),
  );
