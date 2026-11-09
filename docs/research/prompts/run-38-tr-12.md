# Run 38 — Turkish 12 of 13

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

Translate these pages into Turkish, one file per page. The English to translate is the page's section in the research file named next to it, from its "## …" line up to the next "## " line or "---" (leave out "### Sources read"). Save each page as **docs/research/tr/<page id>.md** (for example docs/research/tr/S18.md).

- **S18** — Fire from the green tree · Turkish title on the site: "Yeşil ağaçtan ateş" · English: the section "## S18 — " in docs/research/34-run14-reflect-3.md
- **S19** — Iron "sent down" · Turkish title on the site: ""İndirilen" demir" · English: the section "## S19 — " in docs/research/34-run14-reflect-3.md
- **S20** — The ant · Turkish title on the site: "Karınca" · English: the section "## S20 — " in docs/research/34-run14-reflect-3.md
- **S21** — Night and day; the sun as a lamp, the moon as a light · Turkish title on the site: "Gece ve gündüz; kandil olarak güneş, nur olarak ay" · English: the section "## S21 — " in docs/research/34-run14-reflect-3.md
- **S22** — Fingertips and resurrection · Turkish title on the site: "Parmak uçları ve diriliş" · English: the section "## S22 — " in docs/research/34-run14-reflect-3.md
- **S23** — Expansion of the heavens · Turkish title on the site: "Göklerin genişletilmesi" · English: the section "## S23 — " in docs/research/34-run14-reflect-3.md
- **S24** — A smoke-like origin; heavens and earth joined then split · Turkish title on the site: "Duman gibi bir başlangıç; bitişikken ayrılan gökler ve yer" · English: the section "## S24 — " in docs/research/34-run14-reflect-3.md
- **S25** — The protected roof · Turkish title on the site: "Korunmuş tavan" · English: the section "## S25 — " in docs/research/34-run14-reflect-3.md
- **S26** — Darkness in the deep sea · Turkish title on the site: "Derin denizde karanlık" · English: the section "## S26 — " in docs/research/36-run16-reflect-4.md
- **S27** — Gardens and fruits watered by one water · Turkish title on the site: "Tek bir suyla sulanan bahçeler ve meyveler" · English: the section "## S27 — " in docs/research/36-run16-reflect-4.md
- **S28** — Livestock and their benefits · Turkish title on the site: "Hayvanlar ve faydaları" · English: the section "## S28 — " in docs/research/36-run16-reflect-4.md

Each file starts with its "## <id> — <Turkish title>" line and keeps every heading as rule 7 says.
