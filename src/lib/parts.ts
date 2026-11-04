// The heading of each kind of part in a deep answer (Ask, Live, Reflect).
import type { UiKey } from '../i18n/ui';

export const PART_LABEL: Record<string, UiKey> = {
  quran: 'secQuran',
  sunnah: 'secSunnah',
  scholars: 'secScholars',
  fiqh: 'secFiqh',
  history: 'secHistory',
  science: 'secScience',
  reasoning: 'secReasoning',
  objection: 'secObjection',
  heart: 'secHeart',
  views: 'secViews',
  meaning: 'secMeaning',
  practice: 'secPractice',
  research: 'secResearch',
  tafsir: 'secTafsir',
};

type Part = { kind: string; title?: { tr?: string; en: string } };
/** The heading a part shows: its own title in this language, else its kind's label. */
export const partHeading = (part: Part, lang: 'tr' | 'en', t: (l: 'tr' | 'en', k: UiKey) => string) =>
  (lang === 'en' ? part.title?.en : part.title?.tr) ?? t(lang, PART_LABEL[part.kind]);
