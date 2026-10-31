// Runs inline in <head> before first paint, so the page never flashes the
// wrong palette. Chooses Fajr / Day / ʿAṣr / Night from the real position of
// the sun at the visitor's (approximate) location, unless they chose one.
//
// - Dark-mode visitors always get Night in automatic mode (DESIGN.md §3.1).
// - Location is never requested. Istanbul's coordinates are used for Turkish
//   time zones; elsewhere longitude comes from the standard UTC offset and
//   latitude defaults to 40°N. Good enough to tint paper, not to time prayers.
// - ʿAṣr begins when a stick's shadow equals its length plus its noon shadow
//   (the majority definition, see research S14).
export const paletteScript = `(() => {
  const d = document.documentElement;
  d.classList.add('js');
  const rad = Math.PI / 180;
  function place(now) {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    if (/Istanbul/.test(tz)) return [41.0, 29.0];
    const y = now.getFullYear();
    const std = Math.max(new Date(y, 0, 1).getTimezoneOffset(), new Date(y, 6, 1).getTimezoneOffset());
    return [40, -std / 4];
  }
  function sun(now, lat, lon) {
    const n = now.getTime() / 86400000 - 10957.5;
    const g = ((357.529 + 0.98560028 * n) % 360) * rad;
    const q = (280.459 + 0.98564736 * n) % 360;
    const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad;
    const e = (23.439 - 0.00000036 * n) * rad;
    const dec = Math.asin(Math.sin(e) * Math.sin(L));
    const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)) / rad / 15;
    let eqt = q / 15 - ra; eqt = ((eqt + 12) % 24 + 24) % 24 - 12;
    const utc = now.getUTCHours() + now.getUTCMinutes() / 60;
    const hour = (utc + lon / 15 + eqt - 12) * 15 * rad;
    const la = lat * rad;
    const elev = Math.asin(Math.sin(la) * Math.sin(dec) + Math.cos(la) * Math.cos(dec) * Math.cos(hour)) / rad;
    const noonZenith = Math.abs(la - dec);
    const asrElev = Math.atan(1 / (1 + Math.tan(noonZenith))) / rad;
    const afternoon = Math.sin(hour) > 0;
    return { elev, asrElev, afternoon };
  }
  function pick(now) {
    now = now || new Date();
    if (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) return 'night';
    const [lat, lon] = place(now);
    const s = sun(now, lat, lon);
    if (!s.afternoon) {
      if (s.elev < -18) return 'night';
      if (s.elev < 8) return 'fajr';
      return 'day';
    }
    if (s.elev < -6) return 'night';
    if (s.elev <= s.asrElev) return 'asr';
    return 'day';
  }
  let choice = 'auto';
  try { choice = localStorage.getItem('tefekkur-palette') || 'auto'; } catch (e) {}
  if (!/^(auto|fajr|day|asr|night)$/.test(choice)) choice = 'auto';
  d.dataset.paletteChoice = choice;
  d.dataset.palette = choice === 'auto' ? pick() : choice;
  window.tefekkurPalette = { pick: pick };
})();`;
