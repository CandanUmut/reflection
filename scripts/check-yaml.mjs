// Parses every content YAML file and reports syntax errors with file names,
// so a stray "key: value" colon inside prose is caught before the build.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

let bad = 0;
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ya?ml$/.test(e.name)) {
      try {
        // A comma inside an unquoted flow map value ({ tr: a, b }) silently turns
        // the rest of the sentence into an empty key. Flag any key with a null
        // value that contains a space: real keys never do.
        const walkNull = (node, trail) => {
          if (node && typeof node === 'object')
            for (const [k, v] of Object.entries(node)) {
              if (v === null && /\s/.test(k)) throw new Error(`prose cut into a key at ${trail}.${k.slice(0, 40)}`);
              walkNull(v, `${trail}.${k}`);
            }
        };
        walkNull(parse(fs.readFileSync(p, 'utf8')), '');
      } catch (err) {
        bad++;
        console.log(`${p}: ${err.message.split('\n')[0]}`);
      }
    }
  }
};
for (const d of ['src/content', 'content-src', 'src/data']) if (fs.existsSync(d)) walk(d);
if (bad) process.exit(1);
console.log('All YAML files parse');
