/*
 * The Hero's decorative "Group 8790": a base panel plus nine translucent bands stacked over it.
 * Geometry is read from the three Hero frames (Desktop 70:3425 · Tablet 78:4769 · Mobile 78:5137).
 *
 * The tablet and mobile bands are rotated nodes in Figma, so their `left`/`top` in the generated code
 * are swapped; the numbers here are the rendered offsets, and each gradient angle already includes the
 * rotation (Figma angle ± 90°).
 */

const BAND_WIDTH_COLUMN = 197.423
const BAND_WIDTH_COLUMN_WIDE = 218.326

// Desktop: vertical columns inside an 832 x 665 panel placed at x = 554 of the Hero wrap.
export const desktop = {
  box: { left: 554, top: 0, width: 832, height: 665 },
  base: { angle: 143.929 },
  bands: [
    { left: 90.58, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 136.83, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 183.07, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 229.31, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 275.55, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 321.8, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 368.04, width: BAND_WIDTH_COLUMN, angle: 108.043 },
    { left: 414.03, width: BAND_WIDTH_COLUMN_WIDE, angle: 109.811 },
    { left: 468.12, width: BAND_WIDTH_COLUMN_WIDE, angle: 109.811 },
  ].map((band) => ({ ...band, top: 0, height: 665 })),
}

// Tablet: horizontal bands inside a 682 x 679 panel whose top sits 298px down the wrap.
export const tablet = {
  box: { left: 0, top: 298, width: 682, height: 679 },
  base: { angle: 227.529 },
  bands: [
    { top: 74, height: 161, angle: 194.522 },
    { top: 112, height: 161, angle: 194.522 },
    { top: 149, height: 162, angle: 194.608 },
    { top: 187, height: 161, angle: 194.522 },
    { top: 225, height: 161, angle: 194.522 },
    { top: 263, height: 161, angle: 194.522 },
    { top: 300, height: 161, angle: 194.522 },
    { top: 338, height: 178, angle: 195.981 },
    { top: 461, height: 99, angle: 189.05 },
  ].map((band) => ({ ...band, left: 0, width: 682 })),
}

// Mobile: a 673.5 x 312 panel centred on the wrap, bleeding 69.15px off the bottom; the bands climb above it.
export const mobile = {
  box: { width: 673.5, height: 312 },
  base: { angle: 26.944 },
  bands: [
    { top: -33.97, height: 74.033, angle: 6.877 },
    { top: -51.31, height: 74.033, angle: 6.877 },
    { top: -68.65, height: 74.033, angle: 6.877 },
    { top: -85.99, height: 74.033, angle: 6.877 },
    { top: -103.33, height: 74.033, angle: 6.877 },
    { top: -120.67, height: 74.033, angle: 6.877 },
    { top: -138.02, height: 74.033, angle: 6.877 },
    { top: -155.26, height: 81.872, angle: 7.597 },
    { top: -175.55, height: 81.872, angle: 7.597 },
  ].map((band) => ({ ...band, left: 0, width: 673.5 })),
}

// Wrap background wash: angle + stop positions per frame.
export const wash = {
  desktop: { angle: '99.01deg', a: '32.13%', b: '44.74%', c: '95.86%' },
  tablet: { angle: '175.6deg', a: '30.21%', b: '57.33%', c: '102.27%' },
  mobile: { angle: '175.55deg', a: '22.69%', b: '77.8%', c: '98.85%' },
}
