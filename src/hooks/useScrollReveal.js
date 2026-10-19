import { useEffect } from 'react'

/**
 * Shared scroll-reveal. Every element marked `data-reveal` fades/slides in once, when it reaches
 * ~85% of the viewport height. Variants (styled in styles/base.css):
 *
 *   data-reveal            fade + translateY
 *   data-reveal="image"    fade + scale 1.05 -> 1
 *
 * Elements whose parent carries `data-reveal-group` are staggered by `--stagger-step`, in DOM order.
 * An element can also set its own `data-reveal-delay` (ms).
 *
 * Elements that mount later are picked up too (the Value section swaps its accordion for a carousel when the
 * window crosses a breakpoint, for one): a MutationObserver registers them as they appear, so nothing is left
 * hidden after a resize.
 *
 * With prefers-reduced-motion the reveal is a plain fade (styles/base.css): no travel, no scaling.
 *
 * Mount once, at the app root.
 */
const TRIGGER_LINE = '0px 0px -15% 0px'
const SELECTOR = '[data-reveal]'

export default function useScrollReveal() {
  useEffect(() => {
    // an attribute, not a class: React rewrites `className` on re-render and would wipe a class
    const reveal = (node) => node.setAttribute('data-revealed', '')
    const collect = (root) => {
      const found = root.matches?.(SELECTOR) ? [root] : []
      return found.concat(Array.from(root.querySelectorAll?.(SELECTOR) ?? []))
    }

    if (typeof IntersectionObserver === 'undefined') {
      collect(document.body).forEach(reveal)
      const lateReveal = new MutationObserver((records) =>
        records.forEach((record) => record.addedNodes.forEach((added) => added.nodeType === 1 && collect(added).forEach(reveal))),
      )
      lateReveal.observe(document.body, { childList: true, subtree: true })
      return () => lateReveal.disconnect()
    }

    const step = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stagger-step')) || 100
    const seenInGroup = new WeakMap()
    const known = new WeakSet()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Above the line already (restored scroll position) counts as reached.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: TRIGGER_LINE, threshold: 0 },
    )

    const register = (node) => {
      if (known.has(node)) return
      known.add(node)

      const own = Number(node.dataset.revealDelay)
      let delay = Number.isFinite(own) ? own : 0
      const group = node.closest('[data-reveal-group]')
      if (group) {
        const index = seenInGroup.get(group) ?? 0
        seenInGroup.set(group, index + 1)
        delay += index * step
      }
      if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`)

      // already revealed (the same node survived a re-render): leave it
      if (!node.hasAttribute('data-revealed')) observer.observe(node)
    }

    collect(document.body).forEach(register)

    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((added) => {
          if (added.nodeType === 1) collect(added).forEach(register)
        }),
      )
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])
}
