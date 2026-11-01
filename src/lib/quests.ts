// Gentle quests: small goals with no time pressure and no streaks. Each one is
// worked out from which pages are done, so nothing extra is stored.
import type { Done } from './progress';
import type { Section } from './routes';

/** Each section grows its own flower: tulips for Reflect, carnations for Live, rosettes for Ask. */
export const flowerOf: Record<Section, 'tulip' | 'carnation' | 'rosette'> = {
  signs: 'tulip',
  morals: 'carnation',
  questions: 'rosette',
};

export interface QuestItem {
  id: string;
  section: Section;
  theme?: string;
}

interface Quest {
  id: string;
  title: { tr: string; en: string };
  text: { tr: string; en: string };
  /** How far along (count) out of how many (goal). */
  measure: (done: Done, items: QuestItem[]) => { count: number; goal: number };
}

const inSection = (items: QuestItem[], s: Section) => items.filter((i) => i.section === s);
const ofTheme = (items: QuestItem[], theme: string) => items.filter((i) => i.section === 'signs' && i.theme === theme);
const countDone = (done: Done, list: QuestItem[]) => list.filter((i) => done[i.id]).length;
const upTo = (goal: number, list: QuestItem[], done: Done) => ({
  count: Math.min(goal, countDone(done, list)),
  goal: Math.min(goal, list.length),
});
const all = (list: QuestItem[], done: Done) => ({ count: countDone(done, list), goal: list.length });

export const quests: Quest[] = [
  {
    id: 'first-seed',
    title: { tr: 'İlk tohum', en: 'The first seed' },
    text: { tr: 'Herhangi bir sayfayı okuyup üzerine düşünün.', en: 'Read any page and reflect on it.' },
    measure: (done, items) => upTo(1, items, done),
  },
  {
    id: 'three-doors',
    title: { tr: 'Üç kapıdan da geçin', en: 'Through all three doors' },
    text: {
      tr: 'Tefekkür, Yaşa ve Sor bölümlerinin her birinden bir sayfa.',
      en: 'One page from each of Reflect, Live and Ask.',
    },
    measure: (done, items) => ({
      count: (['signs', 'morals', 'questions'] as Section[]).filter((s) => countDone(done, inSection(items, s)) > 0)
        .length,
      goal: 3,
    }),
  },
  {
    id: 'water',
    title: { tr: 'Su ve hayat', en: 'Water and life' },
    text: { tr: 'Su ile ilgili üç âyet sayfasını okuyun.', en: 'Read the three signs about water.' },
    measure: (done, items) => all(ofTheme(items, 'water'), done),
  },
  {
    id: 'sky',
    title: { tr: 'Gökyüzüne bakın', en: 'Look up' },
    text: { tr: 'Gökyüzü ve evrenle ilgili üç âyet sayfası.', en: 'Three signs about the sky and the cosmos.' },
    measure: (done, items) => upTo(3, ofTheme(items, 'cosmos'), done),
  },
  {
    id: 'creatures',
    title: { tr: 'Canlılar arasında', en: 'Among the creatures' },
    text: { tr: 'Hayvanlarla ilgili üç âyet sayfası.', en: 'Three signs about animals.' },
    measure: (done, items) => upTo(3, ofTheme(items, 'animals'), done),
  },
  {
    id: 'hard-question',
    title: { tr: 'Zor bir soruyla kalın', en: 'Sit with a hard question' },
    text: {
      tr: 'Sor bölümünden bir soruyu sonuna kadar okuyun. Acele yok.',
      en: 'Read one question in Ask all the way through. No hurry.',
    },
    measure: (done, items) => upTo(1, inSection(items, 'questions'), done),
  },
  {
    id: 'three-questions',
    title: { tr: 'Üç zor soru', en: 'Three hard questions' },
    text: { tr: 'Sor bölümünden üç soru.', en: 'Three questions from Ask.' },
    measure: (done, items) => upTo(3, inSection(items, 'questions'), done),
  },
  {
    id: 'five-ways',
    title: { tr: 'Yaşamanın beş yolu', en: 'Five ways to live' },
    text: { tr: 'Yaşa bölümünden beş tema.', en: 'Five themes from Live.' },
    measure: (done, items) => upTo(5, inSection(items, 'morals'), done),
  },
  {
    id: 'another-day',
    title: { tr: 'Başka bir gün yine gelin', en: 'Come back another day' },
    text: {
      tr: 'İki farklı günde birer sayfa. Arada ne kadar zaman geçtiği önemli değil.',
      en: 'Finish pages on two different days. However long in between.',
    },
    measure: (done) => ({ count: Math.min(2, new Set(Object.values(done)).size), goal: 2 }),
  },
  {
    id: 'bed-signs',
    title: { tr: 'Tefekkür tarhı', en: 'The Reflect bed' },
    text: { tr: 'Tefekkür bölümünün bütün sayfaları.', en: 'Every page in Reflect.' },
    measure: (done, items) => all(inSection(items, 'signs'), done),
  },
  {
    id: 'bed-morals',
    title: { tr: 'Yaşa tarhı', en: 'The Live bed' },
    text: { tr: 'Yaşa bölümünün bütün sayfaları.', en: 'Every page in Live.' },
    measure: (done, items) => all(inSection(items, 'morals'), done),
  },
  {
    id: 'bed-questions',
    title: { tr: 'Sor tarhı', en: 'The Ask bed' },
    text: { tr: 'Sor bölümünün bütün soruları.', en: 'Every question in Ask.' },
    measure: (done, items) => all(inSection(items, 'questions'), done),
  },
];
