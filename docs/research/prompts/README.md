# Deep-research prompts: how to use them

Sixteen runs, highest impact first. Each prompt file stands alone: the shared rules, the run's pages with their live URLs, what readers found missing, and the exact report format.

## For Umut: one run at a time
1. Open the next run in the table below (`run-NN-….md`).
2. Copy everything below the line `---` into the deep-research tool, with deep research turned on.
3. Save the report **unchanged** at the path the prompt names, at the top under "Save the report as". Upload it to the repository on any branch, or paste it to Claude.
4. Tell Claude: "run NN is in".

Runs do not depend on each other, so you can skip ahead or change the order. If a report comes back thin on some pages, the same prompt can be run again for just those pages: delete the other pages from "Pages for this run".

## The order, and why

Impact = how weak the page is now × how much harm a wrong or evasive answer does × how many readers it reaches.

1. **Check what is already live.** This fixes what readers can see today. The deep Ask answers have scholar quotations and figures that were never checked one by one, and the Justice page showed that a sentence can stretch its source. Four facts written from memory also get checked.
2. **Ask: God and religion**, scores 2.8–3.5, the lowest on the site.
3. **Ask: meaning, mind and miracles**, scores 3.0–3.8.
4. **Ask: hard history and ethics**: the most attacked topics.
5. **Ask: women and family.**
6. **Ask: for the one who is hurting.**
7. **Live I**, then 8. **Live II**: read by everyone, scoring about 6 now.
9. **Ask: prophethood, the Quran and hadith.**
10. **Reflect I** (with S5, the weakest Reflect page).
11. **Ask: creation, freedom, afterlife.**
12. **Reflect II.**
13. **Ask: practice.**
14. **Reflect III.**
15. **Ask: religious people and sects.**
16. **Reflect IV.**

The full table, with pages and file names, is in [runs.md](runs.md).

## What Claude does with each report
1. **Automatic checks:**
   - every Quran quotation word for word (`scripts/check-quotes.mjs`);
   - every hadith resolves with its grade, and none of the cited ones is weak (`npm run hadith`, `scripts/hadith-audit.mjs`);
   - the report follows the format.
2. **Spot checks:** a sample of scholar quotations and study numbers against their sources, more for sensitive pages.
3. **Turn the report into pages** with `scripts/migrate-v2.mjs`. A newer research file replaces an older one for the same page.
4. **The corrections list** at the end of each report is applied to the live pages.
5. **One reader review** for the run, with honest scores. The goal is 7.5.
6. **Turkish** follows, with `TRANSLATE-TR.md` in this folder.
7. **A pull request** per run, with the scores and anything that could not be checked.

## Files
- `_rules.md`: the shared rules. Each one comes from a real mistake on this site.
- `_formats.md`: the three report formats (Ask, Live, Reflect). The heading names must stay exact.
- `runs.md`: the table of runs (generated).
- `status.md`: which runs are done. The research agent sets "Report in", and Claude sets "On the site".
- `run-NN-*.md`: the prompts (generated).
- `TRANSLATE-TR.md`: Turkish translation of a converted page.
- `_old-run-01-ask-god-and-religion.md`: the earlier prompt. Its reader notes are reused in run 2.

To change a rule or a format, edit `_rules.md` or `_formats.md`, then run `node scripts/make-research-prompts.mjs`. Every prompt is rebuilt the same way.
