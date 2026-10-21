import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContent } from '../../i18n/LanguageContext'
import ContactForm from './ContactForm'
import styles from './ContactModal.module.css'

// longer than the CSS transition (--modal-duration, 260ms) so the exit finishes before the modal unmounts
const EXIT_MS = 320

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps the page behind the modal from scrolling. `position: fixed` on the body is the only approach that also
 * holds on iOS Safari; the scroll position is restored on release. The scrollbar gutter stays reserved so the
 * page does not shift sideways when the scrollbar goes.
 */
function lockScroll() {
  const { body, documentElement: html } = document
  const scrollY = window.scrollY
  const previous = {
    htmlGutter: html.style.scrollbarGutter,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
  }

  html.style.scrollbarGutter = 'stable'
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'

  return () => {
    html.style.scrollbarGutter = previous.htmlGutter
    body.style.position = previous.position
    body.style.top = previous.top
    body.style.left = previous.left
    body.style.right = previous.right
    body.style.width = previous.width
    window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
  }
}

/**
 * "Schedule a demo" pop-up (Figma "Modal pop-up" 193:51226).
 * Desktop and tablet: a card centred over a dimmed page. Mobile: a sheet that rises from the bottom edge.
 *
 * Mounted while open and while it animates out. Escape, the close button and a tap on the dimmed area close it;
 * focus is kept inside and goes back to the button that opened it; the page behind is inert.
 */
export default function ContactModal({ open, onClose, returnFocusRef }) {
  const copy = useContent().contactModal
  const titleId = useId()
  const panelRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)

  // mount first, then flip `shown` two frames later so the browser has painted the start state to transition from
  useEffect(() => {
    if (open) {
      setMounted(true)
      let inner = 0
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true))
      })
      return () => {
        cancelAnimationFrame(outer)
        cancelAnimationFrame(inner)
      }
    }
    setShown(false)
    const timer = setTimeout(() => setMounted(false), EXIT_MS)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!mounted) return undefined

    const root = document.getElementById('root')
    const unlock = lockScroll()
    root?.setAttribute('inert', '')
    root?.setAttribute('aria-hidden', 'true')

    // a pointer with a keyboard behind it goes straight to the first field; on a touch screen that would raise the
    // keyboard over the sheet, so the dialog itself takes focus
    const panel = panelRef.current
    const firstField = panel?.querySelector('input, textarea')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ;(finePointer && firstField ? firstField : panel)?.focus({ preventScroll: true })

    return () => {
      root?.removeAttribute('inert')
      root?.removeAttribute('aria-hidden')
      unlock()
      returnFocusRef?.current?.focus?.({ preventScroll: true })
    }
  }, [mounted, returnFocusRef])

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // keep Tab inside the dialog
      const items = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []).filter((node) => node.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  if (!mounted) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${shown && open ? styles.shown : ''}`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={onKeyDown}
    >
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} ref={panelRef}>
        <div className={styles.scroll}>
          <ContactForm copy={copy} titleId={titleId} onClose={onClose} />
        </div>
        <button type="button" className={styles.close} onClick={onClose} aria-label={copy.a11y.close}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  )
}
