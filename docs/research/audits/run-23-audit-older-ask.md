# Run 23 — Line-by-line check of the earlier deep Ask answers (Q1, Q7, Q13, Q14, Q31)

Checked by Claude directly, 9 November 2026, against the English research (`docs/research/07-ask-deep-A.md`, `docs/research/07-ask-deep-I.md`) and the live page data (`src/content/questions/`). Every claim marked **Corrected** or **Not found** below is still on the live page. Quran quotations were checked word for word against Saheeh International from Tanzil (the `quran-json` package, v3.1.2, which reproduces tanzil.net/trans/en.sahih). Hadith were checked on sunnah.com or, where sunnah.com would not load, hadithunlocked.com and en.tohed.com.

**Summary for Umut.**
- **Wrong Quran wording on live pages (2):** 11:107 on Q13 and 2:62 on Q14. Both are small wording slips, but the site promises exact Saheeh text.
- **Quotations not found in the source named (most serious):** on Q13, four sentences credited to Jon Hoover. I read four of Hoover's own papers and none of them has these words; they say something close, and the correct wording is given below. On Q31, a Maliki exception credited to Malik's *Mudawwana*, and the name "al-Khallal". On Q7, a quotation credited to al-Shirbini, and an attribution to Kamali and Ramadan that the cited paper does not make.
- **A hadith presented without part of its content (Q7):** the men of ʿUkl/ʿUrayna "killed the shepherd" — the hadith also says they "turned renegades (reverted from Islam)". The page uses this case to argue that no one was executed for apostasy alone, so leaving that out tilts the argument.
- **Confirmed:** the Pew figures, the four schools' core rulings (Hanbali and Shafiʿi texts read in Arabic), Alalwani's quotations, Ali Gomaa's 2007 words and the Gulf News retraction, the key hadith, al-Ghazali's three groups, the fatra hadith gradings, and Q1's twenty Quran quotations and its Ormsby and Stanford Encyclopedia quotations.

---

## Q7 — Is leaving Islam punishable by death?

- **Claim:** 2:217 quoted: "reverts from his religion [to disbelief] and dies while he is a disbeliever – for those, their deeds have become worthless in this world and the Hereafter"; 2:256 "There shall be no compulsion in [acceptance of] the religion".
  **Section:** quran — What the Quran says
  **Verdict:** Confirmed
  **Source:** Saheeh International, Tanzil (quran-json 3.1.2).
  **New text:** Keep the current sentences.

- **Claim:** Alalwani: "None of the verses… makes any mention of an earthly punishment for the sin or crime of apostasy"; the Quran "refers to individuals repeatedly returning to unbelief after having believed, but does not mention that they should be killed" (ch. 2).
  **Section:** quran — What the Quran says
  **Verdict:** Corrected
  **Source:** Taha Jabir Alalwani, *Apostasy in Islam: A Historical and Scriptural Analysis*, abridged edition (IIIT, *Books-in-Brief*), https://iiit.org/wp-content/uploads/2018/07/books-in-brief_apostasy_in_islam_a_historical_and_scriptural_analysis.pdf. The first quotation is in chapter 2, verbatim. The second is in the abridged foreword, and the sentence ends "should be killed or punished".
  **New text:** Alalwani surveyed every Quranic use of *ridda* and concludes that "None of the verses… makes any mention of an earthly punishment for the sin or crime of apostasy" (ch. 2). In the foreword to the abridged edition he adds that the Quran "refers to individuals repeatedly returning to unbelief after having believed, but does not mention that they should be killed or punished."

- **Claim:** "Alalwani records that al-Shafiʿi read 2:217, 8:39, 9:5 and 39:65 together in support of the death penalty."
  **Section:** quran — Limit
  **Verdict:** Confirmed (wording adjusted)
  **Source:** Alalwani, abridged edition, ch. 5: al-Shafiʿi "approached the issue of apostasy in light of the four following Qur'anic verses": 8:39, 9:5, 2:217 and 39:65.
  **New text:** Alalwani records that al-Shafiʿi "approached the issue of apostasy in light of" four verses, 8:39, 9:5, 2:217 and 39:65, in support of the death penalty.

- **Claim:** Ibn ʿAbbas: "Had I been in his place I would not have burnt them… I would have killed them, for the Prophet said, 'If somebody (a Muslim) discards his religion, kill him'" ({hadith:bukhari:3017}); parallel {hadith:bukhari:6922}, "where the people are called *zanādiqa*".
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** sunnah.com, Sahih al-Bukhari 3017 (narrated by ʿIkrima: "Ali burnt some people and this news reached Ibn `Abbas"); hadithunlocked.com, Bukhari 6922: "Some zindiqs were brought to Ali ᴿᴬ, so he burned them", graded "Sound (Bukhārī)".
  **New text:** Keep the current sentences.

- **Claim:** The "three cases" hadith ({hadith:bukhari:6878}; {hadith:muslim:1676}): "In Qisas for murder, a married person who commits illegal sexual intercourse and the one who reverts from Islam (apostate) and leaves the Muslims." "In Arabic the third case is *al-tārik li-l-jamāʿa*, 'abandoning the community'."
  **Section:** sunnah
  **Verdict:** Corrected (the Arabic)
  **Source:** sunnah.com, Bukhari 6878: English as quoted; Arabic «وَالْمَارِقُ مِنَ الدِّينِ التَّارِكُ الْجَمَاعَةَ». hadithunlocked.com, Muslim 1676 (Ibn Masʿud, graded "Sound (Muslim)"): «وَالتَّارِكُ لِدِينِهِ الْمُفَارِقُ لِلْجَمَاعَةِ», "the deserter of his Din (Islam), abandoning the community".
  **New text:** In Arabic the third case joins two phrases. Al-Bukhari's wording is *al-māriq min al-dīn al-tārik al-jamāʿa*, "the one who goes out of the religion, leaving the community"; Muslim's is *al-tārik li-dīnihi al-mufāriq li-l-jamāʿa*, "the deserter of his religion, abandoning the community".

- **Claim:** "The men of ʿUrayna, for example, killed a herdsman and stole camels."
  **Section:** sunnah — Did the Prophet (pbuh) ever execute anyone only for leaving Islam?
  **Verdict:** Corrected
  **Source:** sunnah.com, Sahih al-Bukhari 6802 (Anas; the tribe of ʿUkl): they "killed the shepherd of the camels and took the camels away", and they "turned renegades (reverted from Islam)".
  **New text:** The men of ʿUkl (in some reports ʿUrayna) both left Islam and killed a herdsman and drove off the camels (Bukhari 6802, from Anas). Alalwani reads such cases as punishment for the crimes; the hadith itself names both the apostasy and the killing, so the case cannot settle the question either way.

- **Claim:** Alalwani: "never in his entire life did the Prophet put an apostate to death"; killings were "due to the individuals' participation in war crimes or murder, not due to their apostasy" (ch. 3); Hudaybiyya let anyone leave "freely without reprisal".
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** Alalwani, abridged edition, ch. 3 (all three phrases verbatim).
  **New text:** Keep the current sentences.

- **Claim:** "Many people who left after the Night Journey were not harmed."
  **Section:** sunnah
  **Verdict:** Not found
  **Source:** Not in the abridged Alalwani text as read for this run, and no other source was read.
  **New text:** none.

- **Claim:** Alalwani links the hadith to a "serious security situation" (33:60–62): "if the hadith… is sound, he will have had this serious security situation in mind" (ch. 4); jurists "confused apostasy in the political sense with apostasy in the sense of a change in personal beliefs" (ch. 5).
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Alalwani, abridged edition, ch. 4 and ch. 5. The ch. 5 sentence continues "…and convictions", and its subject is "Most recognized schools of jurisprudence".
  **New text:** Keep the current sentences.

- **Claim:** Alalwani names "Companions ʿUmar ibn al-Khattab…, Ibrahim al-Nakhaʿi…, and Sufyan al-Thawri", whose views "did not receive publicity" (ch. 1).
  **Section:** scholars — Who questioned execution early?
  **Verdict:** Confirmed (wording adjusted)
  **Source:** Alalwani, abridged edition, ch. 1: the three names with their death dates, and the views "did not receive publicity or wide circulation". Note that only ʿUmar was a Companion; al-Nakhaʿi (d. c. 715) and al-Thawri (d. 778) were later scholars.
  **New text:** Alalwani names ʿUmar ibn al-Khattab, a Companion, and two later scholars, Ibrahim al-Nakhaʿi and Sufyan al-Thawri, whose views, he says, "did not receive publicity or wide circulation" (ch. 1).

- **Claim:** *Muwatta* no. 1420: ʿUmar asked, "Didn't you imprison him for three days… and call on him to tawba?" and said, "I am not pleased."
  **Section:** scholars
  **Verdict:** Confirmed (grade added)
  **Source:** quranx.com, Muwatta Malik, USC-MSA 36/16 = Arabic numbering 36/1420: "Didn't you imprison him for three days and feed him a loaf of bread every day"; "I am not pleased since it has come to me!". Abu Amina Elias (Daily Hadith Online, 21 Jan 2014) gives it as al-Muwaṭṭaʾ 1397 in another numbering, "Hasan (fair) according to Al-Albani".
  **New text:** …and said, "I am not pleased since it has come to me!" (*Muwatta* 1420; graded *ḥasan* by al-Albani). Al-Qaradawi reports ʿUmar's view as asking the apostate to repent for as long as he lives, imprisoned and fed (IslamOnline, "al-Ridda wa-ʿuqubat al-murtadd").

- **Claim:** "Ibn Qudama in fact lists al-Nakhaʿi among those who held that the apostate is killed."
  **Section:** scholars — Limit
  **Verdict:** Corrected (more precise)
  **Source:** Ibn Qudama, *al-Mughni*, ed. al-Turki, 12/264 (https://shamela.ws/book/6910/6401): on whether men and women are treated alike, «وبه قال الحسنُ، والزُّهْرِيُّ، والنَّخَعِيُّ» ("and so said al-Hasan, al-Zuhri, al-Nakhaʿi"); he also reports from ʿAli, al-Hasan and Qatada «أنَّها تُسْتَرَقُّ ولا تُقْتَلُ» ("she is enslaved, not killed").
  **New text:** Ibn Qudama in fact lists al-Nakhaʿi among those who made no distinction between male and female apostates in the death penalty (*al-Mughni* 12/264).

- **Claim:** Alalwani quotations on today's view: apostasy without "anything else deemed a criminal act… remains strictly between God and the individual".
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Alalwani, abridged edition, ch. 2: "As long as one's apostasy has not been accompanied by anything else deemed a criminal act, it remains strictly between God and the individual, and is not the province of earthly rulers or anyone else."
  **New text:** Keep the current sentence.

- **Claim:** Ali Gomaa (2007): "can a person who is Muslim choose a religion other than Islam? The answer is yes… If the case in question is one of merely rejecting faith, then there is no worldly punishment"; courts where "undermining the foundations of the society" is involved; Gulf News (Ramadan Al Sherbini, 25 July 2007): "What I actually said is that Islam prohibits a Muslim from changing his religion and that apostasy is a crime, which must be punished."
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** *Daily News Egypt*, "Grand Mufti: Muslims may convert to other religions" (24 July 2007), https://www.dailynewsegypt.com/?p=115814, reporting "a posting on a Washington Post-Newsweek forum"; *Gulf News*, Ramadan Al Sherbini, "Top cleric denies 'freedom to choose religion' comment" (25 July 2007).
  **New text:** Keep the current sentences; the forum was the Washington Post–Newsweek online forum.

- **Claim:** "Mohammad Hashim Kamali and Tariq Ramadan: reported, with Alalwani, as holding that 'the Qur'an does not prescribe a temporal punishment for apostasy' (secondary source)."
  **Section:** scholars
  **Verdict:** Not found
  **Source:** The cited secondary source, Santhira Morgan and Jasni bin Sulong, "Punishment for Apostasy: A Review and Choosing the Right Perspective (Tarjih)", *IJARBSS* 10(6) (2020), https://hrmars.com/papers_submitted/7370/punishment-for-apostasy-a-review-and-choosing-the-right-perspective-tarjih.pdf, does not mention Kamali or Ramadan, and does not contain the quoted words.
  **New text:** none. (Remove the line until Kamali's and Ramadan's own works are read.)

- **Claim:** Hanbali: Ibn Qudama quotes al-Khiraqi: "Whoever apostatises from Islam, man or woman, being adult and sane, is invited back for three days… otherwise he is killed." "He adds a second narration from Ahmad that the invitation is only recommended."
  **Section:** fiqh
  **Verdict:** Confirmed (first sentence); Not found (second)
  **Source:** *al-Mughni* 12/264: «وَمَنِ ارْتَدَّ عَنِ الْإِسْلَامِ مِنَ الرِّجَالِ والنِّسَاءِ، وكَانَ بالِغًا عَاقِلًا، دُعِيَ إلَيْهِ ثَلَاثَةَ أيَّامٍ». The second narration was not on pp. 264–265 as read.
  **New text:** Keep al-Khiraqi's sentence. Drop "He adds a second narration…" until its page is found.

- **Claim:** Shafiʿi: al-Nawawi (*Minhaj* p. 293): asking to repent is obligatory (one view: recommended) and immediate (one view: three days); "if they persist, they are killed."
  **Section:** fiqh
  **Verdict:** Confirmed
  **Source:** al-Nawawi, *Minhāj al-Ṭālibīn*, p. 293 (https://shamela.ws/book/12096/325): «وتجب استتابة المرتد والمرتدة وفي قول تستحب وهي في الحال وفي قول ثلاثة أيام فإن أصرا قتلا».
  **New text:** Keep the current sentence.

- **Claim:** Hanafi: on women, al-Zaylaʿi: "A female apostate is not to be killed; instead, she is to be detained until she embraces Islam." Also al-Kasani (*Badaʾiʿ* 7/134), al-Sarakhsi.
  **Section:** fiqh
  **Verdict:** Confirmed in substance (from Ibn Qudama); al-Kasani, al-Zaylaʿi and al-Sarakhsi not read
  **Source:** *al-Mughni* 12/265: «وقال أبو حنيفةَ: تُجْبَرُ على الإِسلامِ بالحَبْسِ والضَّربِ، ولا تُقتَلُ» ("Abu Hanifa said: she is compelled to Islam by imprisonment and beating, and is not killed").
  **New text:** On women, Ibn Qudama reports Abu Hanifa's view that a female apostate "is compelled to Islam by imprisonment and beating, and is not killed" (*al-Mughni* 12/265).

- **Claim:** Maliki: Khalil's *Mukhtasar*: "He is asked to repent for three days, without hunger, thirst or punishment…"; women treated like men.
  **Section:** fiqh
  **Verdict:** Not found (not read for this run)
  **Source:** Khalil's text and al-Mawwaq 8/373 could not be opened (dorar.net failed); the research already marked it as a secondary quotation.
  **New text:** Keep, marked as a secondary quotation.

- **Claim:** Pew (2022): in 2019, 79 of 198 countries (40%) had blasphemy laws and 22 (11%) had apostasy laws; blasphemy can carry death in seven named countries; Brunei 2019; Algeria inheritance; Pakistan "at least 17… sentenced to death… never actually executed anyone".
  **Section:** history
  **Verdict:** Confirmed
  **Source:** Pew Research Center, "Four-in-ten countries and territories worldwide had blasphemy laws in 2019", 25 January 2022.
  **New text:** Keep the current sentences.

- **Claim:** Humanists International (2021): apostasy punishable by death in at least ten countries (listed).
  **Section:** history
  **Verdict:** Confirmed
  **Source:** National Secular Society, "Death sentence for apostasy in nearly a dozen countries, report says" (November 2021), reporting the *Freedom of Thought Report 2021*: Afghanistan, Iran, Malaysia, Maldives, Mauritania, Nigeria, Qatar, Saudi Arabia, UAE, Yemen.
  **New text:** Keep the current sentence.

- **Claim:** USCIRF: "at least 9 countries have apostasy laws"; 26 with blasphemy laws.
  **Section:** history
  **Verdict:** Confirmed
  **Source:** USCIRF press release, 9 December 2019: "at least nine countries maintain apostasy laws"; "26 countries have laws against blasphemy".
  **New text:** Keep (the release is dated 9 December 2019).

- **Claim:** Pew 2013: more than 38,000 interviews, 39 countries, 2008–2012; excluded Saudi Arabia, India, China and Syria; shares of sharia supporters favouring death for leaving Islam (Egypt 86% … Kazakhstan 4%); support for sharia "generally varies little by age, gender or education".
  **Section:** history — Attitudes
  **Verdict:** Confirmed
  **Source:** Pew Research Center, *The World's Muslims: Religion, Politics and Society* (30 April 2013), full report PDF: preface ("more than 38,000 face-to-face interviews"; China, India, Saudi Arabia, Syria not surveyed), p. 21, and the chart on p. 56: Egypt 86, Jordan 82, Afghanistan 79, Pakistan 76, Palestinian territories 66, Malaysia 62, Bangladesh 44, Thailand 27, Tajikistan 22, Indonesia 18, Albania 8, Kazakhstan 4.
  **New text:** Keep the current sentences.

- **Claim:** "*Istitāba* existed to answer doubts: al-Shirbini notes that the apostate 'may have been struck by a doubt'."
  **Section:** objection — "Will God punish me for doubting?"
  **Verdict:** Not found (a related text found)
  **Source:** Al-Shirbini's *Mughni al-Muhtaj* was not read. A Shafiʿi abridgement, Mustafa Sumait, *Mukhtasar Tuhfat al-Muhtaj* 4/142 (https://shamela.ws/book/20/1706), says: «ولو قال عند القتل عرضت لي شبهة فأزيلوها لأتوب» — if the apostate says a doubt has occurred to him, it must be answered before anything else.
  **New text:** In the Shafiʿi texts, if the apostate says "a doubt has occurred to me, so remove it", the doubt must be answered first (Sumait, *Mukhtasar Tuhfat al-Muhtaj* 4/142).

- **Claim:** "The Sahih Muslim hadith that calls disturbing thoughts 'clear faith' was not verified."
  **Section:** objection — Limit
  **Verdict:** Corrected (now verified)
  **Source:** sunnah.com, Sahih Muslim 132a (Abu Huraira): "Verily we perceive in our minds that which every one of us considers it too grave to express"; "That is the faith manifest."
  **New text:** When Companions told the Prophet (pbuh) that they found thoughts in their minds too grave to speak of, he said: "That is the faith manifest" ({hadith:muslim:132}).

- **Not checked for this run:** the cases of Ibn Khatal and Ibn Abi Sarh (already flagged on the page); Abdullah and Hassan Saeed.

## Q13 — Is eternal Hell just for finite sins?

- **Claim:** "*khālidīna fīhā abadan*" at 4:169, 33:65 and 72:23.
  **Section:** quran
  **Verdict:** Confirmed
  **Source:** Saheeh International, Tanzil: 4:169 "they will abide therein forever"; 33:65 "Abiding therein forever"; 72:23 "they will abide therein forever".
  **New text:** Keep.

- **Claim:** 11:107 quoted as "…Indeed, your Lord is an effective accomplisher of what He intends."
  **Section:** quran
  **Verdict:** Corrected
  **Source:** Saheeh International, Tanzil, 11:107: "[They will be] abiding therein as long as the heavens and the earth endure, except what your Lord should will. Indeed, your Lord is an effecter of what He intends."
  **New text:** Verse 11:107: "[They will be] abiding therein as long as the heavens and the earth endure, except what your Lord should will. Indeed, your Lord is an effecter of what He intends."

- **Claim:** 11:108 "a bestowal uninterrupted"; 78:23's *aḥqāb* ("ages").
  **Section:** quran
  **Verdict:** Confirmed (with a note)
  **Source:** Saheeh International, Tanzil: 11:108 contains "a bestowal uninterrupted"; 78:23 reads "In which they will remain for ages [unending]".
  **New text:** …They also cited 78:23's *aḥqāb*, "ages" (Saheeh International adds "[unending]", following the majority reading).

- **Claim:** Hoover summarises Ibn Taymiyya's conclusion: "the reward of Paradise is everlasting while the chastisement of unbelievers in Hell-Fire will end".
  **Section:** scholars
  **Verdict:** Not found (Corrected wording available)
  **Source:** Not in the four Hoover works read: "Islamic Universalism", *The Muslim World* 99 (2009), author's accepted manuscript (Nottingham repository); "Withholding Judgment on Islamic Universalism: Ibn al-Wazīr…", in *Locating Hell in Islamic Traditions* (Brill, 2016), AM; "A Muslim Conflict over Universal Salvation", in *Alternative Salvations* (Bloomsbury, 2015), AM; "Reconciling Ibn Taymiyya's Legitimisation of Violence with His Vision of Universal Salvation", in *Violence in Islamic Thought from the Mongols to European Imperialism* (Edinburgh UP), AM. The last of these says: "the Garden of Paradise will endure forever, while the Fire will not." The research said the quotation came from Hoover's *Ibn Taymiyya* (Oneworld, 2019) "as quoted on a third-party site"; that book was not read.
  **New text:** In Jon Hoover's words, Ibn Taymiyya concluded that "the Garden of Paradise will endure forever, while the Fire will not" (Hoover, "Reconciling Ibn Taymiyya's Legitimisation of Violence with His Vision of Universal Salvation").

- **Claim:** Ibn Taymiyya's reasoning "leads to the conclusion that God will use Hell-fire to bring all creatures into complete accord with the purposes for which they were naturally constituted"; "for both men 'Hell is therapeutic and reformative.'"
  **Section:** scholars
  **Verdict:** Not found (Corrected wording available)
  **Source:** Same four Hoover works; none has these words. Closest: "Hell-Fire is God's tool of chastisement to cleanse and rehabilitate unbelievers to that end"; "Ibn Taymiyya's vision of Hell-Fire is thoroughly therapeutic and rehabilitative" (Hoover, "Reconciling…"); and, for Ibn al-Qayyim, "The Fire is a great remedy that purifies and reforms even unbelievers and associators" (Hoover, "Islamic Universalism", 2009).
  **New text:** Hoover: "Ibn Taymiyya's vision of Hell-Fire is thoroughly therapeutic and rehabilitative"; Hell-Fire is "God's tool of chastisement to cleanse and rehabilitate unbelievers". Ibn al-Qayyim, in the same vein, calls the Fire "a great remedy that purifies and reforms even unbelievers and associators" (Hoover, 2009).

- **Claim:** The treatise "appears to be his last work, written in answer to Ibn al-Qayyim".
  **Section:** scholars
  **Verdict:** Corrected
  **Source:** Hoover (2009): "Ibn Taymiyya wrote his last work Fanāʾ al-nār in response to an inquiry from Ibn al-Qayyim about the duration of punishment and the Fire." Hoover (2015): it "is the very last work that Ibn Taymiyya wrote before his death".
  **New text:** According to Jon Hoover, *Fanāʾ al-nār* was Ibn Taymiyya's last work, written "in response to an inquiry from Ibn al-Qayyim about the duration of punishment and the Fire".

- **Claim:** "The treatise cites Companion reports from ʿUmar and Ibn Masʿud, among others. It takes *fanāʾ* to mean that the punishment ceases, not necessarily that the Fire ceases to exist."
  **Section:** scholars
  **Verdict:** Corrected
  **Source:** Hoover (2015) names ʿUmar b. al-Khaṭṭāb and Ibn ʿAbbās, not Ibn Masʿud, and glosses *fanāʾ* as "passing away". None of the Hoover works read defines *fanāʾ* as the punishment ceasing.
  **New text:** The treatise cites Companion reports, among them from ʿUmar and Ibn ʿAbbas (Hoover, 2015).

- **Claim:** Al-Albani's claim that the treatise was written "before mastering the religious sciences"; ʿAli al-Harbi's 1990 book (Hoover, in *Debating Ibn Taymiyya and Ibn Qayyim*, de Gruyter 2013, 377–399).
  **Section:** scholars
  **Verdict:** Not found (al-Albani); Confirmed (al-Harbi)
  **Source:** The de Gruyter chapter was not read, and al-Albani's words are not in the four Hoover works read. Hoover (2015): "ʿAlī al-Ḥarbī, a scholar working in Saudi Arabia, argued in 1990 that Ibn Taymiyya upheld the Fire's eternity"; Hoover (2016) also cites al-Ḥarbī's 1985 dissertation and his 1990 *Kashf al-astār*.
  **New text:** ʿAli al-Harbi argued in 1990 (*Kashf al-astār*) that Ibn Taymiyya upheld the Fire's eternity (Hoover, 2015). Remove the al-Albani quotation until the de Gruyter chapter is read.

- **Claim:** Ibn al-Qayyim presents an "agnostic option on the duration of chastisement… as his own view" in *Ḥādī al-Arwāḥ* and *Shifāʾ al-ʿAlīl*; in *Mukhtaṣar al-Ṣawāʿiq* he argues "for an Islamic universalism without reserve"; al-Harbi cites four passages affirming eternity.
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Hoover (2009): "the agnostic option on the duration of chastisement that he presented as his own view in Ḥādī and Shifāʾ"; "arguing theologically for an Islamic universalism without reserve"; "Al-Harbi, Kashf al-astar, 49–52, also identifies four texts in Ibn al-Qayyim's writings that, in his estimation, unequivocally affirm the eternity of the Fire" (n. 5).
  **New text:** Keep.

- **Claim:** Ibn al-Qayyim may have "had more doubts… than his master".
  **Section:** scholars
  **Verdict:** Not found
  **Source:** Not in Hoover (2009). Hoover writes there that Ibn al-Qayyim "hesitates in Ḥādī and Shifāʾ" to adopt the arguments "unequivocally as his own".
  **New text:** Hoover notes that Ibn al-Qayyim "hesitates" in *Ḥādī al-Arwāḥ* and *Shifāʾ al-ʿAlīl* to adopt the arguments for the Fire's end "unequivocally as his own" (2009).

- **Claim:** Al-Subki "issued a sharp refutation of Ibn Taymiyya, declared assent to the annihilation of the Fire unbelief and reasserted" its eternity.
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Hoover, "Withholding Judgment…" (Brill, 2016), AM.
  **New text:** Keep.

- **Claim:** Yaqeen: "waswasah is not a 'Muslim disease,' but rather a religious presentation of OCD within Muslims."
  **Section:** objection — "Fear of Hell harms people"
  **Verdict:** Confirmed
  **Source:** Najwa Awad, "Clinicians, Imams, and the Whisperings of Satan", Yaqeen Institute, 19 July 2017 (updated 22 July 2024), abstract.
  **New text:** Keep.

- **Claim:** UK study participant: "'Oh no, I'm going to Hell'… I was just constantly thinking to myself about Hell fire."
  **Section:** objection
  **Verdict:** Corrected (exact wording and study details)
  **Source:** Hamlaoui, Chowdhury, Gulamhusein, Dawood, Khurshid & Yaqub (Inspirited Minds), qualitative exploration of OCD in Muslims, *JBIMA* (ISSN 2634 8071), https://www.jbima.com/wp-content/uploads/2025/05/6-Research_-Qualitative-exploration-OCD_-Hannane.pdf; five participants. Participant 1: "Then I thought to myself - 'Oh no, I'm going to Hell'. Like, I was just constantly thinking to myself about Hell fire."
  **New text:** One of five participants in a small UK interview study said: "Then I thought to myself - 'Oh no, I'm going to Hell'. Like, I was just constantly thinking to myself about Hell fire" (Hamlaoui et al., *JBIMA*).

- **Claim:** "A clinician quoted by the IOCDF says: 'Islam allows for you to go with what you know and leave the doubt.'"
  **Section:** objection
  **Verdict:** Not found
  **Source:** The IOCDF page "Islam and OCD" (https://iocdf.org/faith-ocd/living-with-ocd-religious-traditions/islam-and-ocd/) does not contain it; the July 2025 IOCDF blog cited in the research was not found. The page does say: "The main issue in all OCD themes is doubt."
  **New text:** The International OCD Foundation's guide for Muslims notes that "The main issue in all OCD themes is doubt", and that treatment aims at living with uncertainty while remaining devout.

- **Claim:** Ibn al-Qayyim: whether proof was established against a particular individual "is a matter to be decided by Allah".
  **Section:** heart
  **Verdict:** Confirmed
  **Source:** IslamQA 227756, quoting *Ṭarīq al-Hijratayn* 2/900.
  **New text:** Keep.

- **Not checked:** al-Tabari, al-Qurtubi, Ibn Kathir and al-Razi on 11:107 (already flagged); al-Subki's treatise itself; the Bazzano review on *abadan* (the review does discuss *khālidīna fīhā abadan*, p. 119, but its argument was not read closely).

## Q14 — Are good people of other faiths saved? What about those who never heard?

- **Claim:** 2:62 quoted with "…and did righteous work…".
  **Section:** quran
  **Verdict:** Corrected
  **Source:** Saheeh International, Tanzil, 2:62: "…who believed in Allah and the Last Day and did righteousness - will have their reward with their Lord…".
  **New text:** Verse 2:62 (cf. 5:69): "Indeed, those who believed and those who were Jews or Christians or Sabeans [before Prophet Muhammad] - those [among them] who believed in Allah and the Last Day and did righteousness - will have their reward with their Lord, and no fear will there be concerning them, nor will they grieve."

- **Claim:** 3:85 and 17:15 quotations.
  **Section:** quran
  **Verdict:** Confirmed
  **Source:** Saheeh International, Tanzil.
  **New text:** Keep.

- **Claim:** Ibn Kathir: "ʿAli bin Abi Talhah narrated from Ibn ʿAbbas… that Allah revealed the following Ayah afterwards, [3:85]"; the report "indicates that Allah does not accept any deed or work from anyone, unless it conforms to the Law of Muhammad that is, after Allah sent Muhammad"; 2:62 praises "earlier nations who were righteous and obedient".
  **Section:** quran
  **Verdict:** Confirmed
  **Source:** Ibn Kathir (abridged English) on 2:62, https://surahquran.com/tafsir-english-aya-62-sora-2.html.
  **New text:** Keep.

- **Claim:** Ibn Kathir describes Islam as "the religion that He sent His Books and Messengers with, which is the worship of Allah Alone", and adds that "after Allah sent Muhammad, whoever meets Allah following a path other than Muhammad's, it will not be accepted of him."
  **Section:** quran
  **Verdict:** Confirmed (first); Not found (second)
  **Source:** Ibn Kathir on 3:83–85, https://surahquran.com/tafsir-english-aya-85-sora-3.html: "…which is the worship of Allah Alone without partners". The second sentence is not in his sections on 3:85 or 2:62 as read.
  **New text:** Ibn Kathir describes Islam as "the religion that He sent His Books and Messengers with, which is the worship of Allah Alone without partners", and, on 2:62, says that after Muhammad (pbuh) was sent, God accepts no deed "unless it conforms to the Law of Muhammad".

- **Claim:** {hadith:muslim:153}: "By Him in Whose hand is the life of Muhammad, he who amongst the community of Jews or Christians hears about me, but does not affirm his belief in that with which I have been sent and dies in this state (of disbelief), he shall be but one of the denizens of Hell-Fire."
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** sunnah.com, Sahih Muslim 153 (Abu Huraira).
  **New text:** Keep.

- **Claim:** Al-Qari: "if anyone knows about my message"; al-Nawawi: "whoever was not reached by the call of Islam will be excused" (*Sharh Sahih Muslim* 2/188); al-Albani: "If the message of Islam reached the people in a forged manner… altered… changed… then, I am the first one to say that the message has not reached such people, because what is meant by the message having reached them, is the pure clear message".
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** Islamweb fatwa 243244 (13 April 2014) for al-Qari and al-Albani; IslamQA 227756 for al-Nawawi.
  **New text:** Keep.

- **Claim:** Musnad Ahmad 16301: four people; "a deaf man… a mad man, a senile man, and a man who died in the period before Islam"; "if they enter the fire, it will become cool and peaceful".
  **Section:** sunnah
  **Verdict:** Corrected (translation wording)
  **Source:** en.tohed.com, Musnad Ahmad 16301: "on the Day of Resurrection there will be four types of people"; the four as a deaf person, a "foolish person", an "old man" and one who died in the interval; "if they enter Hell, it will become cool and safe for them".
  **New text:** …They are commanded to enter the fire: "if they enter Hell, it will become cool and safe for them" (Musnad Ahmad 16301, tohed.com translation).

- **Claim:** Gradings of the testing hadith: Darussalam/al-Arnaʾut hasan, chain broken; al-Albani sahih (*al-Sahiha* 3/418–419); Ibn al-Qayyim reports al-Bayhaqi and ʿAbd al-Haqq graded it sahih (*Ahkam Ahl al-Dhimma* 2/1149); Ibn Kathir: the reports "strengthen" one another (*Tafsir* 5/58); Ibn Hajar "proven to be sound via saheeh isnaads" (*Fath al-Bari* 3/246).
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** en.tohed.com (Darussalam: *ḥasan*, chain *munqaṭiʿ*: Qatada is a *mudallis* narrating with "ʿan" from al-Ahnaf); Abu Amina Elias (16 Jan 2013): "*Hasan* (fair) according to Al-Arna'ut"; IslamQA 227756 for the rest (Ibn Kathir: "some of them are da‘eef (weak) but are strengthened by the saheeh and hasan reports").
  **New text:** Keep; the full title is *Silsilat al-Aḥādīth al-Ṣaḥīḥa*.

- **Claim:** Al-Ghazali, *Fayṣal al-Tafriqa*: "I hold that most Christians of the present time… are included in the divine mercy…" (three groups).
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Faraz Rabbani, SeekersGuidance, "Is Imam al-Ghazali's view on the excused ignorant valid?", quoting the passage from Nuh Keller, *Sea Without Shore*.
  **New text:** Keep, naming the translation: "(trans. in Keller, *Sea Without Shore*, quoted by Faraz Rabbani)".

- **Claim:** Al-Jurjani: "There is no accountability upon the one whom the call of a prophet definitively did not reach." Rabbani traces the view through al-Sanusi and al-Bajuri and calls it "solidly mainstream Sunni theology"; "amnesty for those who are not reached by the message does not constitute validation of other religions."
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Rabbani, SeekersGuidance (same page): al-Jurjani from *Sharḥ al-Mawāqif*; al-Sanusi and al-Bajuri named, not quoted.
  **New text:** Keep.

- **Claim:** Ibn al-Qayyim (*Tariq al-Hijratayn* 2/900): "He will not punish anyone except those against whom proof is established through the Messengers… this is a matter to be decided by Allah…"; Ibn Taymiyya (*al-Jawab al-Sahih* 2/298) and Ibn al-Qayyim (*Ahkam* 2/1137) favour testing.
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** IslamQA 227756 (citations as given; Ibn Taymiyya and *Ahkam* 2/1137 are cited there, not quoted).
  **New text:** Keep.

- **Claim:** Bazzano: "not a monolithic consensus but… a cacophony of opinions… which overwhelmingly envisions a heaven filled with Muslims and non-Muslims"; Khalil's four chapter titles.
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Elliott Bazzano, review of Khalil, *AJISS* 30:1 (2013), 117–121, pp. 117–119 (the first ellipsis omits "instead").
  **New text:** Keep.

- **Claim:** Pew (2013): in 34 of 38 countries at least half say Islam is "the one true religion that can lead to eternal life in heaven"; 96% Egypt and Jordan, 95% Iraq; 29% Kazakhstan (49% many religions); 37% Albania; frequent prayer; a 41-point gap in Russia; US Muslims "much more open".
  **Section:** views
  **Verdict:** Confirmed, except the US phrase (Not found); the country of the 41-point gap was not confirmed in the text read
  **Source:** Pew, *The World's Muslims*, ch. 6 "Interfaith Relations" (30 April 2013): "In 34 of the 38 countries…"; the figures as given; "Muslims who pray several times a day are 41 percentage points more likely than those who pray less often" (the passage read did not name the country). "Much more open" is not in the chapter text read (the U.S. appendix was not read).
  **New text:** Keep the figures; drop "US Muslims are 'much more open'" or source it from Pew's U.S. appendix.

## Q31 — Are my non-Muslim loved ones lost?

- **Claim:** {hadith:muslim:976}: "The Messenger of Allah visited the grave of his mother and he wept… I sought permission from my Lord to beg forgiveness for her but it was not granted to me, and I sought permission to visit her grave and it was granted to me…"
  **Section:** heart
  **Verdict:** Confirmed
  **Source:** sunnah.com, Sahih Muslim 976b (Abu Huraira).
  **New text:** Keep (cite as 976b where the site supports letters).

- **Claim:** 9:113, 31:15 and 60:8 quotations.
  **Section:** quran
  **Verdict:** Confirmed
  **Source:** Saheeh International, Tanzil.
  **New text:** Keep.

- **Claim:** Abu Talib: "I will keep on asking Allah's forgiveness for you unless I am forbidden (by Allah) to do so" ({hadith:bukhari:1360}); 28:56 revealed about him ({hadith:bukhari:4772}).
  **Section:** quran
  **Verdict:** Confirmed
  **Source:** sunnah.com, Bukhari 1360 and 4772 ("Allah revealed especially about Abu Talib").
  **New text:** Keep.

- **Claim:** Asmaʾ: "My mother came to me… and she was a pagan… shall I keep good relations with her?' The Prophet said, 'Yes, keep good relation with her'" ({hadith:bukhari:2620}).
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** sunnah.com, Bukhari 2620.
  **New text:** Keep.

- **Claim:** The Prophet (pbuh) prayed: "O Allah, guide the tribe of Daws and bring them to me" ({hadith:bukhari:4392}; {hadith:muslim:2524}).
  **Section:** sunnah
  **Verdict:** Corrected
  **Source:** sunnah.com, Bukhari 4392: "O Allah! Give guidance to the Daus (tribe) and bring them (to Islam)!"; Arabic «اللَّهُمَّ اهْدِ دَوْسًا وَأْتِ بِهِمْ» (no word for "to me").
  **New text:** When the tribe of Daws refused Islam, the Prophet (pbuh) prayed: "O Allah! Give guidance to the Daus (tribe) and bring them (to Islam)!" ({hadith:bukhari:4392}).

- **Claim:** {hadith:muslim:203}: "in the Fire"… "Verily my father and your father are in the Fire".
  **Section:** sunnah
  **Verdict:** Confirmed
  **Source:** sunnah.com, Sahih Muslim 203.
  **New text:** Keep.

- **Claim:** "Mulla ʿAli al-Qari and Ibrahim al-Halabi read them literally."
  **Section:** sunnah
  **Verdict:** Not found
  **Source:** Not in the source listed for this section (al-Suyuti, trans. Haddad, livingislam.org); no other source was read.
  **New text:** none (until a source is read).

- **Claim:** Al-Suyuti: "The Prophet's parents died before he was sent as Prophet and there is no punishment for them, since 'We never punish until We send a messenger' (17:15). Our Ashʿari Imams… agree… that one who dies while daʿwa has not reached him, dies saved."
  **Section:** sunnah
  **Verdict:** Corrected (exact wording)
  **Source:** al-Suyuti, *Masālik al-Ḥunafāʾ*, trans. G. F. Haddad, https://www.livingislam.org/suyuti_e.html. The translation reads "(We never punish until We send a messenger (whom they reject))", and "Our Ash'ari Imams among those in kalam, usul, and fiqh agree on the statement that one who dies while da'wa has not reached him, dies saved."
  **New text:** Al-Suyuti argued: "The Prophet's parents died before he was sent as Prophet and there is no punishment for them, since (We never punish until We send a messenger (whom they reject)) (17:15). Our Ash'ari Imams among those in kalam, usul, and fiqh agree on the statement that one who dies while da'wa has not reached him, dies saved" (trans. Haddad). (The bracket "(whom they reject)" is the translator's.)

- **Claim:** Islamweb: "it is not permissible to supplicate for him or seek forgiveness for him."
  **Section:** fiqh
  **Verdict:** Not found
  **Source:** Not on Islamweb fatwa 367663. That fatwa reports al-Nawawi's statement that praying for a disbeliever's forgiveness is prohibited.
  **New text:** Asking forgiveness for someone who died a non-Muslim is forbidden (9:113; {hadith:muslim:976}); al-Nawawi states the prohibition (as reported in Islamweb fatwa 367663).

- **Claim:** Shafiʿi: al-Nawawi: "There is no problem for a Muslim to follow the funeral of a non-Muslim relative" (*Minhaj* p. 62); visiting the grave allowed according to the majority (*al-Majmuʿ* 5/144).
  **Section:** fiqh
  **Verdict:** Corrected (wording)
  **Source:** Federal Territory Mufti (Malaysia), *Irsyad al-Fatwa* 321: "It is permissible for a Muslim to follow the funeral procession of a non-Muslim relative" (*Minhāj*, p. 62); visiting is "permissible… according to the chosen opinion of the majority of scholars" (*al-Majmūʿ* 5/144).
  **New text:** **Shafiʿi:** al-Nawawi: "It is permissible for a Muslim to follow the funeral procession of a non-Muslim relative" (*Minhāj*, p. 62); visiting the grave is permitted according to the chosen opinion of the majority (*al-Majmūʿ* 5/144), both as given by the Federal Territory Mufti of Malaysia.

- **Claim:** Maliki: Malik (*Mudawwana* 1/261): a Muslim should not wash his disbelieving father or follow the bier, "unless he fears that he may be neglected, in which case he may bury him."
  **Section:** fiqh
  **Verdict:** Corrected
  **Source:** *Irsyad al-Fatwa* 321 quotes Malik: a Muslim should not wash his father who died a disbeliever, "nor should he follow the funeral procession, nor should he go to his funeral…". The "unless he fears…" clause is not in the source cited.
  **New text:** **Maliki:** Malik held that a Muslim should not wash his father who died a disbeliever, "nor should he follow the funeral procession, nor should he go to his funeral" (*al-Mudawwana* 1/261, as quoted by the Federal Territory Mufti). (Any exception for burial needs its own source.)

- **Claim:** Hanbali: Ahmad: "if… he attended it, then there is no harm"; ʿUmar to Abu Waʾil: "Ride in her funeral procession and be in front of her" (al-Khallal, via Islamweb 367663).
  **Section:** fiqh
  **Verdict:** Corrected (source chain)
  **Source:** Islamweb fatwa 367663: "If this non-Muslim is a father, mother, brother, or a close relative, and he attended it, then there is no harm in that"; ʿUmar's instruction verbatim. The fatwa gives Ahmad's answers as recorded in Ibn al-Qayyim's *Aḥkām Ahl al-Dhimma* (reports from Hanbal and Salih ibn Ahmad); it does not mention al-Khallal.
  **New text:** **Hanbali:** asked about a non-Muslim parent or close relative, Ahmad said: "If this non-Muslim is a father, mother, brother, or a close relative, and he attended it, then there is no harm in that." He cited ʿUmar's instruction to Abu Waʾil about his Christian mother: "Ride in her funeral procession and be in front of her" (Ibn al-Qayyim, *Aḥkām Ahl al-Dhimma*, via Islamweb 367663).

- **Claim:** "TheMufti (IslamQA.org), citing *Ahsanul Fataawa* 4/243, states that 'it is not permissible for a Muslim to attend the funeral of a non-Muslim'. By contrast, *al-Bahr al-Raʾiq* 2/205, cited by Faraz Rabbani, allows that 'one may follow their funeral from afar.'"
  **Section:** fiqh — A minority position
  **Verdict:** Confirmed (Rabbani); Not found (TheMufti / *Ahsanul Fataawa*), with a replacement
  **Source:** Faraz Rabbani, "Attending the funeral of a non-Muslim relative" (islamqa.org, Qibla Hanafi 35889): "Yes, it is permitted to attend the funeral of a non-Muslim parent, relative, neighbor, or associate"; *al-Baḥr al-Rāʾiq* 2/205: "And one may follow their [i.e. a kafir's] funeral from afar…". The TheMufti answer was not found; a Deobandi answer that was read: Mufti Zakaria Makada (approved by Mufti Ebrahim Salejee), Muftionline via islamqa.org 91156: "It is not permissible", citing *al-Durr al-Mukhtār* 2/230.
  **New text:** Some modern Hanafi (Deobandi) muftis forbid attending: "It is not permissible" (Mufti Zakaria Makada, Muftionline, citing *al-Durr al-Mukhtār* 2/230). Faraz Rabbani, also Hanafi, answers: "Yes, it is permitted to attend the funeral of a non-Muslim parent, relative, neighbor, or associate", citing *al-Baḥr al-Rāʾiq* 2/205: "one may follow their funeral from afar".

- **Claim:** Becker et al. (*Palliative Medicine* 21(3), 2007): 32 studies, 94% with some positive effect (22 positive, 6 limited positive, 2 no effect, 1 worse); "available data do not allow for a definite answer…".
  **Section:** science
  **Verdict:** Confirmed, except the 22/6/2/1 breakdown (Not found in the abstract read)
  **Source:** Becker et al., "Do religious or spiritual beliefs influence bereavement? A systematic review", *Palliative Medicine* (2007), doi:10.1177/0269216307077327: 32 studies from 15 databases; 94% show some positive effects; "Available data do not allow for a definite answer on whether religious/spiritual beliefs effectively influence bereavement".
  **New text:** Keep, without the 22/6/2/1 breakdown unless it is checked in the paper.

- **Claim:** Cheung, Lee & Yip (2017): 850 Hong Kong nurses; faith "weakly associated with lower self-reported depression in bereavement".
  **Section:** science
  **Verdict:** Confirmed
  **Source:** *BMC Research Notes* 10:242 (4 July 2017).
  **New text:** Keep.

- **Not checked:** Wortmann & Park (2008) (the abstract could not be opened); *al-Fatawa al-Hindiyya* 5/348.

## Q1 — Why is there suffering if God is all-good and all-powerful?

- **Claim:** All twenty Quran quotations on the page (2:155–157, 2:286, 6:38, 12:86, 14:42, 17:33, 18:29, 18:65, 18:79, 18:80–82, 21:35, 21:83, 42:30, 67:2, 76:30, 94:5).
  **Section:** heart, quran, objection
  **Verdict:** Confirmed
  **Source:** Saheeh International, Tanzil.
  **New text:** Keep.

- **Claim:** Hadith: {hadith:tirmidhi:2398} "The Prophets, then those nearest to them, then those nearest to them"; {hadith:muslim:2662} the boy "was a non-believer by his very nature…"; {hadith:muslim:2807} "By Allah, no, my Lord, never did I face any hardship or experience any distress"; {hadith:muslim:771} "evil is not to You", with "one cannot get nearest to You through evil" as one translation.
  **Section:** heart, quran, sunnah
  **Verdict:** Confirmed
  **Source:** hadithunlocked.com: Tirmidhi 2398 (Saʿd ibn Abi Waqqas; al-Tirmidhi *ḥasan ṣaḥīḥ*, al-Albani "Good-Sound"); Muslim 2662a (Ubayy ibn Kaʿb, via Ibn ʿAbbas); Muslim 2807 (Anas); Muslim 771 (ʿAli; «وَالشَّرُّ لَيْسَ إِلَيْكَ», rendered "one cannot get nearness to Thee through evil").
  **New text:** Keep ("nearness", not "nearest", in the translation quoted).

- **Claim:** {hadith:tirmidhi:1924}: "The merciful are shown mercy by the Most Merciful. Be merciful on the earth, and you will be shown mercy from the One above the heavens."
  **Section:** heart
  **Verdict:** Corrected (translation wording)
  **Source:** hadithunlocked.com, Tirmidhi 1924 (ʿAbdullah ibn ʿAmr; al-Tirmidhi *ḥasan ṣaḥīḥ*, al-Albani *ṣaḥīḥ*): "The merciful are shown mercy by al-Rahman (the Most Merciful)." "Be merciful to those on earth, and the One in the sky will be merciful to you."
  **New text:** "The merciful are shown mercy by al-Rahman (the Most Merciful). Be merciful to those on earth, and the One in the sky will be merciful to you" {hadith:tirmidhi:1924}.

- **Claim:** Al-Ghazali (*Iḥyāʾ*, via Ormsby): "sustenance, life-span, pleasure and pain"; "sheer justice, with no injustice in it"; "there is not in possibility anything whatever more excellent, more perfect, and more complete than it"; "For were it not for night…"; the gangrenous hand; "a vast and deep sea" in which "whole groups of the inept drown"; al-Zabidi: "may not despair over an evil which befalls him".
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Eric L. Ormsby, *Theodicy in Islamic Thought* (Princeton, 1984), ch. 1, pp. 38–40 (Matheson Trust PDF). Ormsby's text capitalises "Whole groups of the inept drown in it."
  **New text:** Keep.

- **Claim:** Ormsby: the Ashʿaris' "sovereign unaccountability"; al-Maturidi defined wisdom as putting each thing in its proper place; Ibn Taymiyya: the Ashʿaris affirm "will without wisdom, and volition without mercy, love, and approval".
  **Section:** scholars
  **Verdict:** Confirmed
  **Source:** Ormsby, p. 47 (al-Maturidi: wisdom as "appositeness" (*iṣāba*), "or the proper placement of things").
  **New text:** Keep.

- **Claim:** Plantinga (1985): "most attempts to explain why God permits evil… strike me as tepid, shallow and ultimately frivolous"; Tooley: free will "does not entail that one should never intervene"; Rowe's fawn; Mackie (1955); four kinds of theodicy.
  **Section:** reasoning, objection
  **Verdict:** Confirmed (with a note)
  **Source:** Michael Tooley, "The Problem of Evil", *Stanford Encyclopedia of Philosophy* (substantive revision 3 March 2015). Section 7 has five headings: soul-making, free will, the freedom to do great evil, the need for natural laws, and religious theodicies; the page lists the first four.
  **New text:** Keep.

- **Claim:** Ano and Vasconcelles (2005): "across 49 studies, the pattern generally held".
  **Section:** heart
  **Verdict:** Confirmed (numbers added)
  **Source:** Ano & Vasconcelles, *Journal of Clinical Psychology* 61(4) (2005): "49 relevant studies with a total of 105 effect sizes", 13,512 participants; positive religious coping with positive adjustment r = .33; negative coping with negative adjustment r = .22; negative coping with positive adjustment r = .02 (not significant).
  **New text:** …across 49 studies with 13,512 people, positive religious coping went with better adjustment (r = .33, a moderate link) and negative religious coping with more distress (r = .22, a modest link) (Ano and Vasconcelles, 2005).

- **Not re-checked:** Ibn al-Qayyim, *Shifāʾ al-ʿAlīl*, ch. 21 (Wikisource did not load); al-Qurtubi on 42:30; Ibn Kathir on 21:35 and 18:80; Bukhari 1303, 5641, 5645, 5999 and Muslim 2582, 2752, 2999 (the research states they were checked with the project's scripts; not re-opened here); Pargament, Koenig & Perez (2000).

---
## Gaps
- **Hoover's *Ibn Taymiyya* (Oneworld, 2019)** and his chapter in *Debating Ibn Taymiyya and Ibn Qayyim* (de Gruyter, 2013) were not read; three Q13 quotations and the al-Albani remark may come from them. Until read, use the wording from his papers given above.
- **Hanafi and Maliki texts for Q7** (al-Kasani, al-Zaylaʿi, al-Sarakhsi, Khalil, al-Mawwaq) could not be opened; only Ibn Qudama's report of Abu Hanifa was read.
- **Q7:** al-Shirbini's *Mughni al-Muhtaj*; Kamali's and Ramadan's own works; the claim about people leaving after the Night Journey; Ibn Khatal and Ibn Abi Sarh.
- **Q13:** the July 2025 IOCDF blog; al-Subki's treatise; the classical tafsir on 11:107.
- **Q14:** Pew's U.S. appendix ("much more open").
- **Q31:** Wortmann & Park (2008); *al-Fatawa al-Hindiyya* 5/348; TheMufti / *Ahsanul Fataawa* 4/243; the Becker breakdown (22/6/2/1); a source for al-Qari's and al-Halabi's literal reading of Muslim 203 and 976.
- **Q1:** *Shifāʾ al-ʿAlīl*, ch. 21; al-Qurtubi on 42:30.
- **Method note:** sunnah.com failed for several numbers (Bukhari 6922, Muslim 1676, Muwatta 1420); hadithunlocked.com, en.tohed.com and quranx.com were used instead, and their numbering is given.
