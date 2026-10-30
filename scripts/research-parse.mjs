// Reads the numbered research templates in docs/research/ and returns each
// item's sections as Markdown, verbatim. Used by migrate-content.mjs so the
// English on the site is the research text itself, not a retelling.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, 'docs/research', f), 'utf8');

/** Splits a document into items whose heading matches `## S13.` / `### Q1.` / `## Q9 —`. */
function items(doc, prefix) {
  const re = new RegExp(`^#{2,3} (${prefix}\\d+)[.\\s—–-]+(.*)$`, 'gm');
  const heads = [...doc.matchAll(re)];
  return heads.map((m, i) => {
    const start = m.index + m[0].length;
    const end = i + 1 < heads.length ? heads[i + 1].index : doc.length;
    let body = doc.slice(start, end);
    // Stop at the next top-level heading that is not an item (appendix etc.).
    const stop = body.search(/^#{1,2} (?![SQM]\d)/m);
    if (stop >= 0) body = body.slice(0, stop);
    return { id: m[1], heading: m[2].trim(), body: body.replace(/\n---\s*$/m, '').trim() };
  });
}

/** Splits an item body into its numbered sections: "**3. Short answer.** text" or "3. **Short answer.** text". */
function sections(body) {
  const re = /^(?:\*\*(\d+)\.\s*([^*]+?)\.?\*\*|(\d+)\.\s+\*\*([^*]+?)\.?\*\*)[ \t]*(.*)$/gm;
  // An item uses one heading style. If any "**N. Name.**" headings exist, a
  // "1. **Name.**" line inside a section is a list item, not a heading (S22).
  let marks = [...body.matchAll(re)];
  if (marks.some((m) => m[1])) marks = marks.filter((m) => m[1]);
  const out = {};
  marks.forEach((m, i) => {
    const n = Number(m[1] ?? m[3]);
    const name = (m[2] ?? m[4]).trim();
    const start = m.index + m[0].length;
    const end = i + 1 < marks.length ? marks[i + 1].index : body.length;
    const rest = body.slice(start, end);
    // Un-indent sub-bullets written under a numbered list item ("   - x").
    const text = (m[5] + rest)
      .replace(/^ {3}/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    out[n] = { name, text };
  });
  return out;
}

/** Markdown links in a sources section → [{label, url?}]. Plain lines become label-only. */
export function parseSources(text) {
  return text
    .split('\n')
    .map((l) => l.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^\[(.+)\]\((https?:[^)]+)\)\s*$/);
      return m ? { label: m[1], url: m[2] } : { label: l };
    });
}

export function research() {
  const docs = [
    '01-batch-1.md',
    '02-batch-2.md',
    '03-signs-S13-S33.md',
    '04-morals-M8-M15.md',
    '05-batch-4-Q17-Q38.md',
  ];
  const all = {};
  for (const f of docs) {
    const doc = read(f);
    for (const prefix of ['S', 'Q', 'M']) {
      for (const it of items(doc, prefix)) all[it.id] = { ...it, file: f, sections: sections(it.body) };
    }
  }
  return all;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = research();
  for (const [id, it] of Object.entries(r)) {
    console.log(
      id,
      it.file,
      Object.entries(it.sections)
        .map(([n, s]) => `${n}:${s.name}`)
        .join(' | ')
        .slice(0, 160),
    );
  }
}
