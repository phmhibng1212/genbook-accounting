import { useSyncExternalStore } from 'react'

/*
 * Breakpoints follow the three Figma frames:
 *   desktop >= 1280   (frame 1440)
 *   tablet  768-1279  (frame 800)
 *   mobile  < 768     (frame 375)
 * The CSS mirrors these values in its media queries.
 */
const TABLET_MAX = '(max-width: 1279px)'
const MOBILE_MAX = '(max-width: 767px)'

function subscribe(callback) {
  const lists = [window.matchMedia(TABLET_MAX), window.matchMedia(MOBILE_MAX)]
  lists.forEach((list) => list.addEventListener('change', callback))
  return () => lists.forEach((list) => list.removeEventListener('change', callback))
}

function getSnapshot() {
  if (window.matchMedia(MOBILE_MAX).matches) return 'mobile'
  if (window.matchMedia(TABLET_MAX).matches) return 'tablet'
  return 'desktop'
}

/** @returns {'desktop' | 'tablet' | 'mobile'} */
export default function useBreakpoint() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'desktop')
}
