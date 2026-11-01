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
// "#### kind — Title" parts of the full answer.
const parts = (src) =>
  src
    .split(/^#### /m)
    .slice(1)
    .map((p) => {
      const nl = p.indexOf('\n');
      const [kind] = p.slice(0, nl).split(' — ');
      return { kind: kind.trim(), en: p.slice(nl + 1).trim() };
    });
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
      const label = l.slice(2).trim();
      const url = label.match(/https?:\/\/[^\s)]+/)?.[0]?.replace(/[.,;]$/, '');
      return url ? { label, url } : { label };
    });

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
      blocks[heading] ? { [key]: { ...(item[key]?.tr && item[key].tr !== item[key].en ? { tr: item[key].tr } : {}), en: blocks[heading] } } : {};
    const out = {
      ...item,
      ...layer('summary', 'In brief'),
      ...layer('tafsir', 'Classical tafsir'),
      ...layer('howItWorks', 'How it works'),
      ...layer('reflection', 'The reflection'),
      followUps: followUps(need(blocks, 'Questions readers ask next', id)).map((f) => ({ q: { en: f.q }, a: { en: f.a } })),
      legacySources: item.legacySources ?? item.sources,
      sources: [...src, ...(item.legacySources ?? item.sources).filter((x) => !seen.has(typeof x.label === 'string' ? x.label : x.label.en))],
    };
    const header = `# ${id}: layers deepened by scripts/migrate-v2.mjs from docs/research/${found.file} (English); the rest as before.\n`;
    const prev = fs.readFileSync(path.join(dir, name), 'utf8').split('\n').filter((l) => l.startsWith('#') && !l.includes('migrate-v2')).join('\n');
    fs.writeFileSync(path.join(dir, name), (prev ? prev + '\n' : '') + header + stringify(out, { lineWidth: 0 }));
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
      fullAnswer: parts(need(blocks, 'Go deeper', id)).map((x) => ({ kind: x.kind, en: x.en })),
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
    fs.writeFileSync(path.join(dir, name), header + stringify(out, { lineWidth: 0 }));
    console.log('wrote', `morals/${name}`, '(v2, English only)');
    continue;
  }
  const en = parts(need(blocks, 'The full answer', id));
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
      fullAnswer: en.map((p) => ({ kind: p.kind, en: p.en })),
      followUps: fu.map((f) => ({ q: { en: f.q }, a: { en: f.a } })),
      honestLimits: keep('honestLimits', 'Honest limits'),
      sources: [...src, ...item.sources.filter((s) => !seen.has(typeof s.label === 'string' ? s.label : s.label.en))],
    };
  }
  const header = `# Generated by scripts/migrate-v2.mjs — English verbatim from docs/research/${found.file} (${id}),\n# ${tr ? `Turkish from content-src/tr-v2/${file}` : 'Turkish: the previous page, until content-src/tr-v2/' + file + ' exists'}. Edit those, then re-run migrate-content.mjs and migrate-v2.mjs.\n`;
  fs.writeFileSync(path.join(dir, name), header + stringify(out, { lineWidth: 0 }));
  console.log('wrote', `${dirs[id[0]]}/${name}`, tr ? '(v2)' : '(v2, English only)');
}
