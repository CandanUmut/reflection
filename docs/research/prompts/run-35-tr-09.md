# Run 35 — Turkish 9 of 13

**Save the translations as:** `docs/research/tr/<page id>.md, one file per page`
**Why this run comes here:** The Turkish pages still show the earlier, shorter text.

Copy everything below the line into the deep-research tool, with deep research turned on.

---

## Who this is for

You are translating pages of **Tefekkür**, a bilingual (Turkish/English) website that invites reflection on the signs the Quran points to in nature, its moral vision, and honest answers to hard questions of faith. Its readers include doubters, curious outsiders, students of Islamic knowledge, scientists, people who are hurting, and informed skeptics. The Turkish must read as if it were written in Turkish: natural, simple and warm, with short sentences. It must not read as a word-for-word copy of English.

## The rules (please follow every one)

**1. Translate; do not change content.** Add nothing, drop nothing, and do not soften or sharpen any claim, objection, limit or honest note. Keep every number, date, name, work title and every *Limit:* (*Sınır:*).

**Evidence labels.** Leave the first word of **[Established]**, **[Scholarly]** and **[Debated]** in English: the site turns these into badges and shows them in Turkish by itself. Translate whatever follows that word inside the brackets ("[Established, small]" → "[Established, küçük]"). Translate any other label in full: [Moderate] → [Orta], [Mixed] → [Karışık].

**2. The Quran: Elmalılı Hamdi Yazır only, word for word.** Every verse quoted in English (Saheeh International) is replaced by the **Elmalılı Hamdi Yazır** translation of the same words, exactly as on tanzil.net (translation "tr.yazir"). Never translate a verse yourself. The site's file `src/data/quran.json` holds the Elmalılı text (`tr`) of many verses already; for others, use tanzil.net. Keep the reference after each quotation, e.g. "…" (2:256). If the English quotes only part of a verse, quote the matching part of Elmalılı and mark omissions with "…". Claude checks every quotation against the Tanzil text automatically.

**3. Hadith.** Keep every `{hadith:collection:number}` token exactly as written. Translate the hadith wording faithfully from the English given on the page. Do not replace it with a remembered Turkish version.

**4. Honorifics, outside quotations only.**
- "the Prophet (pbuh)" → "Hz. Peygamber (s.a.v.)";
- other prophets: "Moses (pbuh)" → "Hz. Mûsâ (a.s.)";
- a Companion named as a narrator: "(ra)" → "(r.a.)";
- never change a quotation, and do not use the ﷺ glyph.

**5. Names, as on the site's Turkish pages.** Gazzâlî, İbn Kesîr, Kurtubî, Râzî, Taberî, Zemahşerî, İbn Teymiyye, İbn Kayyim, İbn Rüşd, İbn Sînâ, İbn Âşûr, İbn Hazm, İbn Abbâs, Şâtıbî, Celâleyn, Mâtürîdî, Eş'arî, Nevevî. The hadith collections are Buhârî, Müslim, Tirmizî, Ebû Dâvûd, Nesâî and İbn Mâce. Modern and Western names stay as written (Plantinga, Hubble, NASA). Book titles stay in their transliteration, in italics.

**6. Terms.** Use the terms of the site's glossary (`src/data/glossary.yaml`): tefsir, fıkıh, hadis, sahih, hasen, zayıf, makâsıd, fıtrat, kader and so on. Explain a term the first time it appears, as the English does.

**7. Keep the shape exactly.** Claude's converter matches the Turkish to the English part by part:
- Keep every `##`, `###` and `####` heading line, in the same order.
  - **`##` line:** the page id, then " — ", then the page's title as it already appears on the site's Turkish page.
  - **`###` lines:** keep them **in English, unchanged** ("### Short answer", "### Honest notes"…). They are keys, not text.
  - **`####` lines:** keep the English kind word before " — " unchanged ("#### heart — "), and translate the title after it.
- Leave out the "### Sources read" section; the sources stay as they are.
- "### Questions readers ask next": the same number of `**Soru?** Cevap` paragraphs, in the same order.
- "### Honest notes" and "### Points of awe": the same number of bullets, in the same order.
- Keep **bold** opening sentences, *italics*, lists and line breaks as in the English.

**8. Not centred on Türkiye.** Translate what is there. Do not add Turkish examples or remove others.

**9. Ask when unsure.** Anything you could not translate with confidence (a term, a name, an unclear sentence) goes in a "## Notes for Claude" list at the end of the file, after a line `---`. The converter ignores that list.

## The task

Translate these pages into Turkish, one file per page. The English to translate is the page's section in the research file named next to it, from its "## …" line up to the next "## " line or "---" (leave out "### Sources read"). Save each page as **docs/research/tr/<page id>.md** (for example docs/research/tr/Q37.md).

- **Q37** — Can I be "spiritual but not religious"? · Turkish title on the site: ""Dindar değilim ama inançlıyım" olabilir miyim?" · English: the section "## Q37 — " in docs/research/33-run13-ask-practice.md
- **Q35** — Why fast? Why so many rules? · Turkish title on the site: "Neden oruç? Neden bu kadar çok kural?" · English: the section "## Q35 — " in docs/research/33-run13-ask-practice.md
- **Q10** — Why five daily prayers, and why do I feel nothing? · Turkish title on the site: "Neden günde beş vakit namaz, ve neden hiçbir şey hissetmiyorum?" · English: the section "## Q10 — " in docs/research/33-run13-ask-practice.md
- **Q9** — Why does God need our worship? · Turkish title on the site: "Allah'ın ibadetimize neden ihtiyacı var?" · English: the section "## Q9 — " in docs/research/33-run13-ask-practice.md
- **Q18** — "If religious people act like this, why believe?" · Turkish title on the site: ""Dindarlar böyle davranıyorsa, neden inanayım?"" · English: the section "## Q18 — " in docs/research/35-run15-ask-community.md

Each file starts with its "## <id> — <Turkish title>" line and keeps every heading as rule 7 says.
