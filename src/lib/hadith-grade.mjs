// Reads a grade string from the hadith data ("Hasan Sahih", "Isnaad Daif",
// "Mawdu", "Mauquf Sahih", "Sahih Bukhari (1023) Sahih Muslim (894)"…) into a
// kind and a label in both languages. Every word must be known: an unknown
// word throws, so no grade is ever shown as sound by default (Umut's rule: no
// claim may rest on a weak hadith). Used by src/lib/md.ts and the scripts.

const WORDS = new Set(
  (
    'Sahih Hasan Daif Very Isnaad Sanad Lighairihi Agreed Upon Bukhari Muslim And Hadith Mutawatir Matn ' +
    'After Mukhtasar Through Last Witness Mauquf Muquf Maqtu Munkar Shadh Mawdu Batil Mursal Malool'
  ).split(' '),
);

/** @typedef {'sahih' | 'hasan' | 'daif' | 'athar'} GradeKind */
/** @typedef {{ kind: GradeKind, en: string, tr: string }} Grade */

/** @param {string} raw @returns {Grade} */
export function readGrade(raw) {
  // "Sahih Muslim (556)", "Bukhari And Muslim", "Agreed Upon" are references
  // ("also in al-Bukhari / Muslim"), not grade words: read them apart.
  const SAHIHAYN = /Sahih (Bukhari|Muslim)(\s*\([^)]*\))?|Bukhari And Muslim|Agreed Upon/g;
  const inSahihayn = SAHIHAYN.test(raw);
  const words =
    raw
      .replace(SAHIHAYN, ' ')
      .replace(/\([^)]*\)/g, ' ')
      .match(/[A-Za-z]+/g) ?? [];
  if (!words.length && inSahihayn)
    return { kind: 'sahih', en: 'Ṣaḥīḥ (in al-Bukhārī or Muslim)', tr: 'Sahih (Buhârî ya da Müslim’de)' };
  if (!words.length) throw new Error(`Hadith grade "${raw}" has no grade words (ungraded)`);
  const unknown = words.filter((w) => !WORDS.has(w));
  if (unknown.length)
    throw new Error(
      `Unknown word(s) ${unknown.join(', ')} in hadith grade "${raw}" — add them to src/lib/hadith-grade.mjs`,
    );
  const has = (w) => words.includes(w);
  const chainOnly = (has('Isnaad') || has('Sanad')) && !has('Matn');

  // Fabricated and weak grades first: any of these words decides the kind.
  if (has('Mawdu') || has('Batil')) return { kind: 'daif', en: 'Mawḍūʿ (fabricated)', tr: 'Mevzû (uydurma)' };
  if (has('Very') && has('Daif')) return { kind: 'daif', en: 'Very weak', tr: 'Çok zayıf' };
  if (has('Munkar')) return { kind: 'daif', en: 'Munkar (rejected)', tr: 'Münker' };
  if (has('Shadh')) return { kind: 'daif', en: 'Shādhdh (anomalous)', tr: 'Şâz' };
  if (has('Malool')) return { kind: 'daif', en: 'Muʿallal (hidden defect)', tr: 'Muallel' };
  if (has('Mursal')) return { kind: 'daif', en: 'Mursal (a link missing)', tr: 'Mürsel' };
  if (has('Daif'))
    return chainOnly
      ? { kind: 'daif', en: 'Weak chain', tr: 'Senedi zayıf' }
      : { kind: 'daif', en: 'Ḍaʿīf (weak)', tr: 'Zayıf' };
  // Sound chains that end with a Companion or a Successor, not the Prophet.
  if (has('Mauquf') || has('Muquf') || has('Maqtu'))
    return { kind: 'athar', en: 'A Companion’s or Successor’s saying', tr: 'Sahâbî ya da tâbiî sözü' };
  // A good or sound chain for a report that is also in al-Bukhari or Muslim.
  if (inSahihayn)
    return { kind: 'sahih', en: 'Ṣaḥīḥ (also in al-Bukhārī or Muslim)', tr: 'Sahih (Buhârî ya da Müslim’de de var)' };
  if (has('Sahih')) {
    if (has('Lighairihi')) return { kind: 'sahih', en: 'Ṣaḥīḥ through other chains', tr: 'Li-gayrihî sahih' };
    if (has('Hasan')) return { kind: 'sahih', en: 'Ḥasan ṣaḥīḥ', tr: 'Hasen sahih' };
    if (chainOnly) return { kind: 'sahih', en: 'Sound chain', tr: 'Senedi sahih' };
    return { kind: 'sahih', en: 'Ṣaḥīḥ (sound)', tr: 'Sahih' };
  }
  if (has('Hasan')) {
    if (has('Lighairihi')) return { kind: 'hasan', en: 'Ḥasan through other chains', tr: 'Li-gayrihî hasen' };
    if (chainOnly) return { kind: 'hasan', en: 'Good chain', tr: 'Senedi hasen' };
    return { kind: 'hasan', en: 'Ḥasan (good)', tr: 'Hasen' };
  }
  throw new Error(`Hadith grade "${raw}" has no grade (only ${words.join(' ')})`);
}
