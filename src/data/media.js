/*
 * Animated artwork for the page, one file per slot and language, dropped into `src/assets/media/` as
 * `<slot>.<lang>.<ext>` (GIF / animated WebP, or a transparent WebM clip plus the files scripts/encode-clips.mjs makes from it):
 *
 *   hero           Hero dashboard
 *   step-1 … 3     the three "Just 3 Simple Steps" cards, left to right
 *   feature-1 … 4  the four "Comprehensive Accounting Solutions" rows, top to bottom
 *
 * Files are picked up by name, so adding or replacing one needs no code change. A slot without a file
 * keeps its reserved frame (so the layout does not jump) and shows nothing; a Vietnamese slot without its
 * own `.vi.` file falls back to the English one.
 */
const files = import.meta.glob('../assets/media/*.{gif,webp,png,avif,svg,webm,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// slot.lang -> { image, video, stack, poster }
const bySlot = {}
for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/([a-z0-9-]+)\.([a-z]{2})(?:\.(stack|poster))?\.([a-z0-9]+)$/)
  if (!match) continue
  const [, slot, language, variant, extension] = match
  const entry = (bySlot[`${slot}.${language}`] ??= {})
  if (variant === 'stack') entry.stack = url
  else if (variant === 'poster') entry.poster = url
  else if (extension === 'webm') entry.video = url
  else entry.image = url
}

const pick = (slot, language, kind) => bySlot[`${slot}.${language}`]?.[kind] ?? bySlot[`${slot}.en`]?.[kind]

/** URL of the animated picture (GIF / WebP) for a slot, or `undefined` when no file has been added yet. */
export function mediaFor(slot, language) {
  return pick(slot, language, 'image')
}

/**
 * The transparent video clip for a slot, or `undefined`: `{ src, stack, poster }` = the WebM, its Safari / iOS
 * version and the still picture (see scripts/encode-clips.mjs and components/ClipPlayer).
 */
export function clipFor(slot, language) {
  const src = pick(slot, language, 'video')
  return src ? { src, stack: pick(slot, language, 'stack'), poster: pick(slot, language, 'poster') } : undefined
}

/*
 * The sparkle that starts every feature bullet (Figma "fi_10966842", 24x24). Add it as `src/assets/icons/bullet-sparkle.svg`;
 * until then the bullets keep their 24px gap without a symbol.
 */
const icons = import.meta.glob('../assets/icons/bullet-sparkle.svg', { eager: true, query: '?url', import: 'default' })
export const bulletIcon = Object.values(icons)[0]
