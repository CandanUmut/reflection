# For the research agent: how to do a run

You work on the repository **candanumut/reflection**, a bilingual website. Umut will ask you to do one run at a time: "Do run N". Each run is a prompt file in this folder, `run-NN-*.md`. The table of all runs is `runs.md`, and their progress is in `status.md`.

## Doing run N
1. **Read** `docs/research/prompts/README.md`, then the run's file `docs/research/prompts/run-NN-*.md`. Everything below the `---` line in that file is your instructions: follow every rule in it.
2. **Read before you write.** Each page has a live URL, and its text is also in this repository: the English research section named in the prompt, and the page data under `src/content/`. If a URL does not open, read the repository instead.
3. **Do the work** the prompt describes: research, checking, or translation.
4. **When it is complete:**
   1. Create a branch `research/run-NN` from `main`.
   2. Save your output exactly where the prompt says, under "Save the report as" or "Save the translations as". Use exactly the format the prompt gives.
   3. In `docs/research/prompts/status.md`, on run N's row:
      - set **Status** to `Report in`;
      - fill in today's **Date**;
      - put the pull request link in **Pull request**;
      - in **Notes**, write one short line on anything left out or thin.
   4. Commit only those files. Open a pull request titled `Research run NN — <the run's title>`.
5. **Finish** by giving Umut the pull request link and a short list of what you could not source, verify or translate.

## Never
- Edit any other file: not the site's content (`src/`), not the scripts, and not the prompts. Claude checks your output first (every Quran quotation word for word, every hadith number and grade, a sample of scholar quotations) and then applies it.
- Merge anything.
- Cite from memory, or write a claim you did not read in a source. What you could not source goes under "Gaps", or "Notes for Claude" for translations.

## If a run is too big for one session
Do as much as you can do well, not everything thinly. Save what is done, list what is left in the pull request and in **Notes**, and say so. Umut can then ask: "Continue run N", which means the items still left. Use the same branch, or a new one named `research/run-NN-b`.

## Order
Runs 17–26 improve the English. Runs 27–39 translate it into Turkish. Translating after the English is settled is best, but not required: Claude marks for re-translation any paragraph that changes later.
