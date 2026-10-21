/*
 * The Hero's decorative "Group 8790": a base panel plus nine translucent bands stacked over it.
 * Geometry is read from the three Hero frames (Desktop 160:5806 · Tablet 160:6212 · Mobile 160:6618).
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

// Tablet: horizontal bands inside a 665 x 507 panel that sits on the bottom edge of the wrap, 3px in from the left.
// Figma rotates these nodes by 90deg, so each gradient angle below is the drawn angle + 90.
export const tablet = {
  box: { left: 3, bottom: 0, width: 665, height: 507 },
  base: { angle: 219.914 },
  bands: [
    { top: 55.2, height: 120.304, angle: 191.227 },
    { top: 83.38, height: 120.304, angle: 191.227 },
    { top: 111.56, height: 120.304, angle: 191.227 },
    { top: 139.74, height: 120.304, angle: 191.227 },
    { top: 167.92, height: 120.304, angle: 191.227 },
    { top: 196.1, height: 120.304, angle: 191.227 },
    { top: 224.27, height: 120.304, angle: 191.227 },
    { top: 252.3, height: 133.043, angle: 192.381 },
    { top: 285.26, height: 133.043, angle: 192.381 },
  ].map((band) => ({ ...band, left: 0, width: 665 })),
}

// Mobile: a 535.414 x 344 panel centred on the wrap, bleeding 8.15px off the bottom; the bands stack down inside it.
// These nodes are rotated by -90deg in Figma, so each gradient angle is the drawn angle - 90.
export const mobile = {
  box: { width: 535.414, height: 344 },
  base: { angle: 35.183 },
  bands: [
    { top: 45.45, height: 81.627, angle: 9.497 },
    { top: 64.57, height: 81.627, angle: 9.497 },
    { top: 83.69, height: 81.627, angle: 9.497 },
    { top: 102.81, height: 81.627, angle: 9.497 },
    { top: 121.93, height: 81.627, angle: 9.497 },
    { top: 141.05, height: 81.627, angle: 9.497 },
    { top: 160.17, height: 81.627, angle: 9.497 },
    { top: 179.19, height: 90.269, angle: 10.481 },
    { top: 201.55, height: 90.269, angle: 10.481 },
  ].map((band) => ({ ...band, left: 0, width: 535.414 })),
}

// Wrap background wash: angle + stop positions per frame.
export const wash = {
  desktop: { angle: '98.87deg', a: '32.13%', b: '44.74%', c: '95.86%' },
  tablet: { angle: '183.06deg', a: '33.41%', b: '50.37%', c: '98.79%' },
  mobile: { angle: '182.95deg', a: '55.21%', b: '63.45%', c: '96.83%' },
}
