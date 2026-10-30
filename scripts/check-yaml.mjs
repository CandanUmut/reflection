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
        parse(fs.readFileSync(p, 'utf8'));
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
