# Turkish translations (runs 27–39)

One file per page, named by page id (e.g. `Q3.md`). Each file follows `docs/research/prompts/TRANSLATE-TR.md`: headings in the same order, `###` lines kept in English, `####` kind words kept, Questions/Honest notes/Points of awe in the same number and order, every `{hadith:…}` token kept.

**Quran text.** Every verse is quoted in the Elmalılı Hamdi Yazır translation as published by Tanzil (`tr.yazir`). Where a verse is in the site's `src/data/quran.json`, that text was used. For other verses, the Tanzil `tr.yazir` text as packaged in `fawazahmed0/quran-api` (edition `tur-elmalilihamdiya`) was used; it was checked against all 255 verses in `quran.json` and matches them word for word, differing only in the final punctuation mark (which the package drops). Every quoted fragment was checked automatically against that text.

Translated by Claude, November 2026.
