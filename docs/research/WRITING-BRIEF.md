# Writing brief — deep answers (Phase 6 onward)

For anyone (person or agent) drafting a deep answer. Read this, then `docs/research/TEMPLATE-ask-v2.md`, then the model answer **Q1** in `docs/research/07-ask-deep-I.md` and its Turkish in `content-src/tr-v2/Q1.yaml`. Q1 reached 7.7/10 with six kinds of reader; match its shape, tone and care.

## The rules that cannot bend
1. **Nothing invented.** Every claim comes from a source you actually opened and read in this task. If you cannot read it, do not use it; list it as a gap at the end of your draft. Never cite from memory — not a page number, not a date, not a grade, not a quotation. (On Q1 a remembered PubMed ID pointed to a paper on knee pain.)
2. **Quran:** quote only verbatim — English from `.cache/quran/en.txt` (Saheeh International), Turkish from `.cache/quran/tr.txt` (Elmalılı); lines are `sura|aya|text`. Mark omissions with "…". Read the verses before and after for context.
3. **Hadith:** cite as `{hadith:collection:number}` (bukhari, muslim, abudawud, tirmidhi, nasai, ibnmajah; sunnah.com numbering; Muslim by Abd al-Baqi). Look each one up first: `node scripts/sources.mjs hadith <collection> <number>`. Quote only words that are in its text. **No claim may rest on a weak hadith**; a weak one appears only when the text says it is weak. Malik, Ahmad and other collections cannot be tokens: cite them in prose only if you read a grading for them, and say who graded them.
4. **Tafsir:** `node scripts/sources.mjs tafsir <s:a> <name>` (`node scripts/sources.mjs tafsirs` lists them: Ibn Kathir EN/AR, al-Tabari, al-Qurtubi, al-Baghawi, al-Sa'di, al-Muyassar, al-Wasit, Ma'arif). Quote what the commentator says about that verse; translate Arabic faithfully.
5. **Fiqh:** the four Sunni schools only (Hanafi, Maliki, Shafi'i, Hanbali), each with a named scholar or work you read (or a reliable academic account of it that you read).
6. **Scholars, books, science:** only from what you read (open articles, the Stanford Encyclopedia of Philosophy, PubMed abstracts via `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=<id>&rettype=abstract&retmode=text`, open PDFs, Wikisource for Arabic classics). Search first, then read. If a site blocks automated reading, do not try to get around it; use another source or mark the gap.
7. **Honorifics, outside quotations:** English "the Prophet (pbuh)", other prophets "Moses (pbuh)"; Turkish "Hz. Peygamber (s.a.v.)", other prophets "Mûsâ (a.s.)"; a Companion named as narrator "(ra)" / "(r.a.)". Never alter a quotation. Do not use the ﷺ glyph.
8. **Honesty:** state the doubt at full strength; give each reply's limit; say when the evidence is mixed; no "miracle", "proves" or "predicted" for science. Honest limits go under "### Honest limits", never inside the full answer.
9. **Plain words.** Short sentences. Explain every term the first time (hadith, tafsir, fiqh, Companion, the schools). Introduce every scholar in a few words. No notes to the writer ("Avoid…", "Present…"): write to the reader.
10. **Not centred on Türkiye**, both languages complete.

## What readers asked
The reader critic's follow-up questions for each page are in `docs/reader-scores/round-1-ask-baseline/Q<n>.json` (fields `readers.*.followUps` and `missing`). Answer the ones the sources support, in the full answer or under "### Questions readers ask next". The current page is at `src/content/questions/q<nn>-*.yaml`, and the original research is in `docs/research/01-batch-1.md`, `02-batch-2.md` or `05-batch-4-Q17-Q38.md`: keep what is good and sourced there, and check it again.

## What a strong answer had on Q1
- The objection at its strongest, in the reader's own terms, before any answer.
- A short answer of 5–7 sentences that a hurried reader can take away.
- In the full answer, for a personal topic, the "heart" part first.
- Each section opens with a bold plain sentence that says its point.
- Hard material faced, not skipped (Q1: the boy in 18:80–81; 42:30's plain reading).
- Each reply followed by its *Limit*.
- Hadith quoted with their grades; scholars quoted in their own words where possible.
- Length set by the question: about 2,500–4,000 words for the hardest ones.

## Output — write only these two files
1. `docs/research/drafts/Q<n>.md` — the English section, exactly in the template's format, starting `## Q<n> — <title>` (the title as on the current page) and ending after `### Honest limits`. Then, after a line `---`, a `## Gaps` list of anything you could not source.
2. `content-src/tr-v2/Q<n>.yaml` — the Turkish, with the same parts in the same order (see Q1.yaml for the keys: `verses`, `helpCard`, `steelman`, `whyAsked`, `shortAnswer`, `fullAnswer` [kind, optional title {tr,en}, text], `followUps` [q, a], `honestLimits`, `sourceLabels` for descriptive source lines). Turkish must read as natural Turkish, not a word-for-word copy. `verses` lists the key verses shown at the end of the page (ranges like "2:155-157").

Do not edit any other file, do not run the build, and do not commit. Finish with a short report: sources read, gaps, and anything you were unsure of.
