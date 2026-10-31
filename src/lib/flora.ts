// The flowers of the İznik tile painters, as drawn on the walls of Rüstem Paşa
// and the Selimiye: tulip (lale), carnation (karanfil), the long serrated saz
// leaf, the hatayi rosette, the closed bud. Each shape is path data in local
// units, its base at 0,0 and growing up (−y), to be placed with a transform.
// Lines are built from curves sampled by hand-chosen proportions, so no two
// shapes are copies of a ruler: the leaves bend, the petals lean.

type P = [number, number];
const n = (v: number) => +v.toFixed(1);
const s = (p: P) => `${n(p[0])} ${n(p[1])}`;
const polar = (r: number, a: number): P => [r * Math.cos(a), r * Math.sin(a)];

/** Tulip, about 42 tall: a slender almond with three pointed petals, the side
 *  ones flaring outward at the tip, as the Ottoman garden tulip was bred. */
export const TULIP =
  'M0 0 C-6 -1.6 -8.2 -11 -7.6 -20 C-7.2 -26 -7.4 -31 -9.6 -36.4 ' +
  'C-6.2 -33.6 -3.4 -30.4 -1.8 -26.6 C-1.9 -32.6 -1 -37.6 0.3 -42.4 ' +
  'C1.6 -37.8 2.1 -32.6 1.9 -26.6 C3.4 -30.6 6.2 -33.8 9.8 -36.2 ' +
  'C7.6 -31 7.6 -26 7.9 -20 C8.4 -11 6 -1.6 0 0Z';
/** The inner petal edges of the tulip. */
export const TULIP_LINES = 'M-1.8 -26.6 C-3 -18 -2.4 -9 -0.6 -1.6 M1.9 -26.6 C3 -18 2.6 -9 0.7 -1.6';

/** Carnation, about 28 tall: a narrow calyx under a fan of frilled petals. */
export const CARNATION_CALYX = 'M-2.4 0 C-2.8 -4 -3.8 -8 -4.8 -11.4 L4.8 -11.4 C3.8 -8 2.8 -4 2.4 0Z';
export const CARNATION = (() => {
  const cy = -11;
  const lobes = 5;
  const a0 = (-176 * Math.PI) / 180,
    a1 = (-4 * Math.PI) / 180;
  const start = polar(9.5, a0);
  let d = `M${s([start[0], cy + start[1]])}`;
  for (let i = 0; i < lobes; i++) {
    const t0 = a0 + ((a1 - a0) * i) / lobes;
    const t1 = a0 + ((a1 - a0) * (i + 1)) / lobes;
    const tall = 16.5 - Math.abs(i - (lobes - 1) / 2) * 1.1; // the middle petals stand tallest
    // Each petal: a rounded lobe with two small frills at its edge.
    for (let k = 0; k < 3; k++) {
      const u0 = t0 + ((t1 - t0) * k) / 3,
        u1 = t0 + ((t1 - t0) * (k + 1)) / 3;
      const r = tall - (k === 1 ? 0 : 1.4);
      const [cx1, cy1] = polar(r + 1.6, (u0 + u1) / 2);
      const [ex, ey] = polar(k === 2 ? 9.5 : r - 1.2, u1);
      d += ` Q${s([cx1, cy + cy1])} ${s([ex, cy + ey])}`;
    }
  }
  return d + ` Q0 ${n(cy + 2.6)} ${s([start[0], cy + start[1]])}Z`;
})();
/** Fine lines inside the carnation fan: an inner band and the petal folds. */
export const CARNATION_LINES = (() => {
  const cy = -11;
  const [ax, ay] = polar(6.2, (-168 * Math.PI) / 180),
    [bx, by] = polar(6.2, (-12 * Math.PI) / 180);
  let d = `M${s([ax, cy + ay])} A6.2 6.2 0 0 1 ${s([bx, cy + by])}`;
  for (let i = 1; i < 5; i++) {
    const a = ((-176 + (172 * i) / 5) * Math.PI) / 180;
    const [x0, y0] = polar(6.2, a),
      [x1, y1] = polar(12, a);
    d += ` M${s([x0, cy + y0])} L${s([x1, cy + y1])}`;
  }
  return d;
})();

/** A saz leaf: long, serrated on its outer edge, bending as it grows.
 *  `bend` > 0 curves to the right, < 0 to the left; `curl` turns the tip back. */
export function saz(len = 48, width = 5.5, bend = 0.4, curl = 0.25): { leaf: string; rib: string } {
  const c1: P = [len * bend * 0.9, -len * 0.38];
  const c2: P = [len * (bend + curl), -len * 0.78];
  const tip: P = [len * (bend * 0.55 + curl * 1.1), -len];
  const at = (t: number): P => {
    const u = 1 - t;
    return [
      3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * tip[0],
      3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * tip[1],
    ];
  };
  const steps = 40;
  const outer: P[] = [],
    inner: P[] = [],
    rib: P[] = [];
  const side = bend >= 0 ? -1 : 1; // the serrated edge is the outside of the bend
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = at(t);
    const q = at(Math.min(1, t + 0.01));
    const r = at(Math.max(0, t - 0.01));
    const dx = q[0] - r[0],
      dy = q[1] - r[1];
    const l = Math.hypot(dx, dy) || 1;
    const nx = -dy / l,
      ny = dx / l;
    const w = width * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.62)), 0.85);
    // Fine teeth that hook toward the tip: a slow swelling, then a quick notch.
    const ph = (t * 11) % 1;
    const tooth = t > 0.16 && t < 0.9 ? (ph < 0.82 ? Math.pow(ph / 0.82, 1.6) : (1 - ph) / 0.18) * 0.16 : 0;
    outer.push([p[0] + side * nx * w * (1 + tooth), p[1] + side * ny * w * (1 + tooth)]);
    inner.push([p[0] - side * nx * w * 0.72, p[1] - side * ny * w * 0.72]);
    if (t > 0.04 && t < 0.86) rib.push(p);
  }
  const leaf = 'M0 0 L' + outer.map(s).join(' L') + ' L' + inner.reverse().map(s).join(' L') + 'Z';
  return { leaf, rib: 'M' + rib.map(s).join(' L') };
}

/** One petal between radii r0 and r1 at angle a; `w` is its half-width in
 *  radians, `round` makes the tip blunt (hatayi) instead of pointed. */
function petal(a: number, r0: number, r1: number, w: number, round = true): string {
  const p = (r: number, b: number) => s(polar(r, b));
  const k = round ? 1.06 : 0.97;
  return (
    `M${p(r0, a)} C${p(r1 * 0.88, a - w)} ${p(r1 * k, a - w * (round ? 0.5 : 0.18))} ${p(r1, a)}` +
    ` C${p(r1 * k, a + w * (round ? 0.5 : 0.18))} ${p(r1 * 0.88, a + w)} ${p(r0, a)}Z`
  );
}

/** Hatayi rosette seen from above, radius `r`: blunt petals with an inner
 *  contour, pointed ones showing between them, a seed heart. Draw `inner`
 *  first, then `outer`, then `veins` as a fine line. */
export function rosette(r = 12, count = 8): { outer: string; inner: string; veins: string; heart: number } {
  const step = (2 * Math.PI) / count;
  let outer = '',
    inner = '',
    veins = '';
  for (let i = 0; i < count; i++) {
    const a = i * step - Math.PI / 2;
    outer += petal(a, r * 0.24, r * 0.92, step * 0.44, true);
    inner += petal(a + step / 2, r * 0.2, r, step * 0.3, false);
    veins += petal(a, r * 0.42, r * 0.74, step * 0.2, true);
  }
  return { outer, inner, veins, heart: r * 0.25 };
}

/** A closed bud with its two sepals, about 15 tall. */
export const BUD = 'M0 0 C-4.6 -3.2 -4.8 -10 -0.2 -15.2 C4.6 -10.2 4.6 -3.2 0 0Z';
export const BUD_SEPALS =
  'M0 0 C-2.6 -1.2 -5.6 -3.2 -6.4 -7 C-4 -5.4 -2.2 -4.6 0 -4.4 C2.2 -4.6 4 -5.4 6.4 -7 C5.6 -3.2 2.6 -1.2 0 0Z';
