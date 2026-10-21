/*
 * Animated artwork (GIF / animated WebP) for the page, one file per slot and language, dropped into
 * `src/assets/media/` as `<slot>.<lang>.<ext>`:
 *
 *   hero           Hero dashboard
 *   step-1 … 3     the three "Just 3 Simple Steps" cards, left to right
 *   feature-1 … 4  the four "Comprehensive Accounting Solutions" rows, top to bottom
 *
 * Files are picked up by name, so adding or replacing one needs no code change. A slot without a file
 * keeps its reserved frame (so the layout does not jump) and shows nothing; a Vietnamese slot without its
 * own `.vi.` file falls back to the English one.
 */
const files = import.meta.glob('../assets/media/*.{gif,webp,png,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const bySlot = {}
for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/([a-z0-9-]+)\.([a-z]{2})\.[a-z0-9]+$/)
  if (match) bySlot[`${match[1]}.${match[2]}`] = url
}

/** URL of the artwork for a slot, or `undefined` when no file has been added yet. */
export function mediaFor(slot, language) {
  return bySlot[`${slot}.${language}`] ?? bySlot[`${slot}.en`]
}

/*
 * The sparkle that starts every feature bullet (Figma "fi_10966842", 24x24). Add it as `src/assets/icons/bullet-sparkle.svg`;
 * until then the bullets keep their 24px gap without a symbol.
 */
const icons = import.meta.glob('../assets/icons/bullet-sparkle.svg', { eager: true, query: '?url', import: 'default' })
export const bulletIcon = Object.values(icons)[0]
