// The four time-of-day palettes (DESIGN.md §3.1–3.2).
// Day and Night start from the brief's values; accents were darkened (day) or
// lightened (night) only as far as needed to pass WCAG AA as text.
// Fajr is cooler and paler (first light); ʿAṣr is warmer (low sun on paper).
export const palettes = {
  fajr: {
    // Brighter gold for thin decorative lines only (arches, dividers); never for text.
    'lamp-line': '#A08049',
    paper: '#EEEDEA',
    'paper-deep': '#E5E3DE',
    ink: '#1A1B21',
    'ink-soft': '#52545E',
    lamp: '#75592B',
    life: '#46613F',
    water: '#2B5860',
    clay: '#814532',
    hairline: '#D4D2CC',
    'hairline-strong': '#7E7C76',
  },
  day: {
    // Brighter gold for thin decorative lines only (arches, dividers); never for text.
    'lamp-line': '#A9823F',
    paper: '#F3EDE2',
    'paper-deep': '#EAE2D3',
    ink: '#1D1A16',
    'ink-soft': '#5A5248',
    lamp: '#77592A',
    life: '#4A6542',
    water: '#2F5E66',
    clay: '#8A4B36',
    hairline: '#D9CFBF',
    'hairline-strong': '#857A6A',
  },
  asr: {
    // Brighter gold for thin decorative lines only (arches, dividers); never for text.
    'lamp-line': '#A57C3A',
    paper: '#F2E6D2',
    'paper-deep': '#E9DAC2',
    ink: '#211911',
    'ink-soft': '#5C4C3A',
    lamp: '#735524',
    life: '#46603E',
    water: '#2C5960',
    clay: '#854431',
    hairline: '#DCCAAE',
    'hairline-strong': '#86745B',
  },
  night: {
    // Brighter gold for thin decorative lines only (arches, dividers); never for text.
    'lamp-line': '#D2AE66',
    paper: '#0E1322',
    'paper-deep': '#151B2D',
    ink: '#E9E3D6',
    'ink-soft': '#A7A092',
    lamp: '#D2AE66',
    life: '#8DAA7F',
    water: '#7FB3B8',
    clay: '#C98D72',
    hairline: '#2A3046',
    'hairline-strong': '#646D8A',
  },
};
