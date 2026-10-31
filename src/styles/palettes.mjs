// The four time-of-day palettes (DESIGN.md §3.1), redrawn from Mimar Sinan's
// interiors: ivory limestone walls, İznik tile cobalt and turquoise, the
// coral-red of İznik bole and of Süleymaniye's ablaq arches, sage green, and
// gilding used only as a thin line. Night is the deep indigo of tile grounds.
// Every text colour passes WCAG AA on paper and paper-deep (scripts/contrast.mjs).
export const palettes = {
  fajr: {
    // First light: cooler stone, blue still in the air.
    paper: '#F1F1EE',
    'paper-deep': '#E6E7E4',
    ink: '#121833',
    'ink-soft': '#454C66',
    cobalt: '#1C4592',
    lamp: '#6E5520',
    'lamp-line': '#AF8A3E',
    life: '#2C6248',
    water: '#155F66',
    clay: '#A3372A',
    turquoise: '#3E9C97',
    hairline: '#D6D8D6',
    'hairline-strong': '#7C8191',
  },
  day: {
    // Full day: warm ivory limestone.
    paper: '#F7F3EA',
    'paper-deep': '#EEE7D8',
    ink: '#141A33',
    'ink-soft': '#484D63',
    cobalt: '#1D4A99',
    lamp: '#735621',
    'lamp-line': '#B8913A',
    life: '#2E6648',
    water: '#176267',
    clay: '#A8392B',
    turquoise: '#3AA09A',
    hairline: '#DED6C6',
    'hairline-strong': '#857E70',
  },
  asr: {
    // Late afternoon: low sun warms the stone.
    paper: '#F6ECDB',
    'paper-deep': '#EDE0CA',
    ink: '#1A1A2E',
    'ink-soft': '#4E4A5A',
    cobalt: '#1E4790',
    lamp: '#6F501B',
    'lamp-line': '#B88A35',
    life: '#30613F',
    water: '#185D60',
    clay: '#A13426',
    turquoise: '#3A9690',
    hairline: '#E0D0B5',
    'hairline-strong': '#887862',
  },
  night: {
    // Night: the deep indigo ground of İznik tiles.
    paper: '#0B1230',
    'paper-deep': '#121B40',
    ink: '#EEE8DA',
    'ink-soft': '#AEB4C8',
    cobalt: '#97B4F2',
    lamp: '#E2C070',
    'lamp-line': '#C9A55C',
    life: '#93C8A4',
    water: '#73CCC5',
    clay: '#F1907A',
    turquoise: '#5FC0B8',
    hairline: '#28325C',
    'hairline-strong': '#6670A0',
  },
};
