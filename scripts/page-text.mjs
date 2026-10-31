// Prints a built page as plain text, the way a reader meets it: headings,
// paragraphs, lists, notes, without navigation, scripts or ornaments.
// Used by the reader critic, which judges only what is on the page.
//   node scripts/page-text.mjs en/ask/eternal-hell/      one page
//   node scripts/page-text.mjs --list ask|live|reflect     the English pages of a group
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const arg = process.argv[2];
if (arg === '--list') {
  const dir = `dist/en/${process.argv[3]}`;
  for (const d of readdirSync(dir, { withFileTypes: true }))
    if (d.isDirectory() && existsSync(`${dir}/${d.name}/index.html`)) console.log(`en/${process.argv[3]}/${d.name}/`);
  process.exit(0);
}
const html = readFileSync(`dist/${arg.replace(/^\/|\/$/g, '')}/index.html`, 'utf8');
let main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
main = main
  .replace(/<(script|style|svg|template)[\s\S]*?<\/\1>/g, '')
  // Evidence labels are badges on the page: show them as [Label], not as a word.
  .replace(/<span class="tag tag--[^"]*"[^>]*>([^<]*)<\/span>/g, ' [$1] ')
  .replace(/<[^>]+aria-hidden="true"[^>]*>[\s\S]*?<\/(span|div)>/g, '')
  .replace(/<h([1-4])[^>]*>/g, (_, n) => '\n\n' + '#'.repeat(+n) + ' ')
  .replace(/<\/h[1-4]>/g, '\n')
  .replace(/<li[^>]*>/g, '\n- ')
  .replace(/<(p|div|section|aside|blockquote|figure|details|summary|tr)[^>]*>/g, '\n')
  .replace(/<br\s*\/?>/g, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&#x27;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/[ \t]+/g, ' ')
  .replace(/\n\s*\n\s*\n+/g, '\n\n');
console.log(main.trim());
