# Content plan — deepening the ilm (Phases 5–11)

Written 2026-10-31 after Umut's review. His words, unchanged:

> "the answers are not satisfactory, mostly they look really vague, very short and simple answers to the hardest question of all, i think we need to run at least 6 more phases to improve the content, for each side, reflect, live and ask, and we can add more scientific explanations to the things, also focusing on turkish people is not helping much […] add a critic which would try to read the questions or behaves like the person who is using this app to learn and understand, ask the questions etc, and then calculate the satisfaction about the each answer and overall groups, and then do a feedback loop, of course we are going to be writing according to real data, we don't invent anything, we can read, scholars, quran, hadiths and fiqh, just improve the ilm in this site, needs to more comprehensive, i like the language it is simple and effective but it is not enough"

## 1. Where we are (measured)

English words per page today (median): **Ask 219**, **Live 404**, **Reflect 346**. The shortest Ask answer is 80 words (Q36); the longest 497 (Q14). Many answers read as research notes ("Responses: (a)… (b)…"), not as answers written for a person. Reader satisfaction, round 0 (a 12-page sample, 6 readers each, 1–10): **Ask 4.3, Live 4.8, Reflect 5.0**; no page reached 7. Lowest criterion: **depth 3.7**; highest: **honesty 6.5**. Lowest pages: Q36 (2.7), S8 (2.8), Q25 (3.7), Q1 (3.8). Full table and every follow-up question: `docs/reader-scores/round-0/SUMMARY.md`.

The readers also found faults that are bugs, not depth: lines written to the site's authors showing on live pages (Q13, Q16, M8), a broken "…gaps." in M8, an evidence label glued into a sentence (Q25), an internal page code shown as text (Q36), and a likely science error on S1 (amylase/starch; a date stone stores mainly mannans). These are fixed in Phase 5.

## 2. What does not change
- **Nothing is invented.** Every claim comes from a source that was actually read, and the source is named on the page.
- **Simple language.** Short sentences, terms explained. Longer does not mean harder to read.
- **Honesty.** The four layers on sign pages stay apart. Every Honest Note stays visible. No "miracle", "proves" or "predicted" for science.
- **Quran translations** stay Saheeh International and Elmalılı, verbatim from Tanzil.
- **Content still comes only from `docs/research/`.** The new work adds new research documents first (`docs/research/06-…` onward); the pages are then built from them, as before.

## 3. Sources we can read and check

| Kind | Source | How it is checked |
|---|---|---|
| Quran | Tanzil (Arabic, Saheeh, Elmalılı) | already built into `src/data/quran.json` |
| Tafsir | Quran.com API: Ibn Kathir (EN abridged; AR), al-Tabari (AR), al-Qurtubi (AR), al-Baghawi (AR), al-Sa'di (AR), Ma'arif al-Qur'an (EN), Tantawi's al-Wasit (AR) | the quoted line is fetched and compared |
| Hadith | The six books, Malik, Ahmad and others (public hadith-api data, same numbering as sunnah.com), with gradings by named scholars (e.g. al-Albani, Zubair Ali Zai, Shu'ayb al-Arna'ut) | text, number and grade are fetched and compared |
| Fiqh | positions of the four Sunni schools (and Ja'fari where relevant) from works we can actually read, with the school, the scholar and the work named | quoted or cited passage is located |
| Scholarship | named classical and modern scholars, from open sources (books and articles we can read, academic papers, encyclopaedias such as the Stanford Encyclopedia of Philosophy) | only what was read is cited |
| Science | peer-reviewed papers (open access first), standard textbooks, agencies (USGS, NASA, WHO) | numbers are checked against the source |

**Limits, honestly:** some classical works are only partly online, some modern books are paywalled, and I read Arabic sources through my own reading, not a published translation, unless one exists. When a source cannot be checked, the claim is not used, and the gap is logged in `docs/CONTENT_GAPS.md`.

## 4. What a deeper page looks like

The simple short answer stays at the top, so a reader who only wants one minute still gets it. Below it, the page goes as deep as the question needs.

**Ask (questions)**
1. The question, at its strongest *(kept)*
2. Short answer — 4–6 plain sentences *(kept, rewritten as prose)*
3. **The full answer**, in readable sections:
   - What the Quran says — the verses, in context (what comes before and after, and when known, why it was revealed)
   - What the Prophet ﷺ taught — hadith with collection, number and grading
   - How scholars have understood it — named classical and modern scholars, their works, their actual arguments
   - The law (fiqh), where it applies — what each school holds, and why they differ
   - History, science and data, where they apply
   - The strongest objection to this answer, and the reply
4. The range of views *(kept, with each view explained, not only named)*
5. **Questions readers ask next** — short answers to the follow-up questions the reader critic collected
6. Honest limits *(kept)*
7. Sources — full references

Length is set by the question: about 1,200–2,500 words for the hardest questions (suffering, Hell, apostasy, slavery, Aisha's age, homosexuality…), less for simpler ones.

**Live (moral vision)** — the Quranic basis; the Prophet's practice (hadith); what the law requires and recommends, and where schools differ; the wisdom behind it (maqasid); what research on people shows, where it applies; hard cases; honest limits.

**Reflect (signs)** — the four layers stay, each deeper: more classical voices in the tafsir layer (al-Tabari, al-Qurtubi, al-Razi, Ibn Kathir, in their own words); the science layer explains the mechanism with numbers, sources and what is still unknown; the reflection stays short.

**Less Türkiye-centred.** Examples and help resources become international (Türkiye stays one example among others). Both languages remain.

## 5. The feedback loop

For every page, in every phase:

1. **Research** — gather sources for the page and write them into a new research document, with every citation checkable.
2. **Source check** — a source checker (new agent) fetches every Quran reference, hadith (text, number, grade) and tafsir quote and confirms it matches. Anything that does not match is removed or fixed.
3. **Write** — English from the research; Turkish written as natural Turkish, not word-for-word.
4. **Read** — the reader critic reads the built page as six visitors (doubter, outsider, student of knowledge, scientist, hurting reader, informed skeptic), asks their follow-up questions and scores satisfaction (1–10).
5. **Improve** — answer the follow-ups that the sources support; fix what the readers found vague.
6. **Repeat** steps 4–5, up to three rounds per page.
7. **Gate** — a page is done when its average satisfaction is **8 or more** and **no reader is below 6**. A page that cannot reach this because the sources do not exist says so honestly instead of padding.
8. At the end of each phase: the content critic and the code critic, as before, then a PR.

**An honest warning about the numbers.** The reader critic is an AI scoring pages that an AI helped write. It can be too kind, and its scores move a little from run to run. To keep it honest, it sees only the page (never the research), it uses fixed score anchors, it is run fresh each round, and its follow-up questions matter more than its numbers. The real test is still Umut reading the pages, and ideally a few real readers and a scholar.

## 6. The phases

| Phase | What | Pages |
|---|---|---|
| **5. Measure and tools** | reader critic, source checker, score summary; full baseline of all 86 pages; research template v2; page layout v2 (new sections on Ask, Live and Reflect pages); international help resources | all, measured |
| **6. Ask I — the hardest** | Q1 suffering, Q7 apostasy, Q13 Hell, Q14 salvation of others, Q20 Aisha's age, Q21 slavery, Q22 wars and Banu Qurayza, Q25 homosexuality, Q6 women, Q24 hijab, Q23 polygyny, Q31 non-Muslim loved ones | 12 |
| **7. Ask II — God, revelation, the Prophet** | Q2, Q3, Q4, Q9, Q11, Q17, Q26, Q27, Q28, Q29, Q30, Q32, Q33 | 13 |
| **8. Ask III — faith in life** | Q5, Q8, Q10, Q12, Q15, Q16, Q18, Q19, Q34, Q35, Q36, Q37, Q38 | 13 |
| **9. Live** | M1–M15 | 15 |
| **10. Reflect I** | S1–S16, deeper science and tafsir; new visualizations where they help | 16 |
| **11. Reflect II and final pass** | S17–S33; a natural-Turkish pass over everything; a final reader round over all 86 pages | 17 + all |

**Size.** Phase 5 is medium. Each of Phases 6–11 is large: per page, real research, checking every source, writing in two languages and up to three reader rounds. One phase is roughly one full working session, often more. The whole plan is about seven sessions. Umut decides the pace; after each phase there is a report with before/after scores and screenshots.

## 7. Decisions for Umut before Phase 6
1. **Length on the page.** Long answers shown in full, or the "full answer" sections folded (open with one tap) under the short answer? (Honest Notes stay always visible either way.)
2. **Schools of law.** Four Sunni schools only, or also Ja'fari (Shia) where relevant?
3. **Hadith grading.** Show the grade on the page next to each hadith (e.g. "Sahih — al-Albani")? Recommended.
4. **Order of phases.** Ask first (as above), or Live / Reflect first?
