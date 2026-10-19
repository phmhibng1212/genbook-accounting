import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useContent } from '../../i18n/LanguageContext'
import styles from './ValueCarousel.module.css'

const DRAG_THRESHOLD = 40

/**
 * Tablet / mobile "Clear Numbers" (Figma 1:2972 pattern): a strip of titles with the current one in
 * semibold and kept near the middle, one slide below it (image + centred copy) and a pager.
 *
 * Swiping the slide sideways (left = next) changes it; the titles and the dots follow, and either can
 * be pressed. Slides scroll-snap, so touch swiping is native; a mouse can drag them too.
 */
export default function ValueCarousel({ items }) {
  const { a11y } = useContent()
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const stripRef = useRef(null)
  const tabRefs = useRef([])
  const drag = useRef(null)
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)

  // keep the active title centred in the strip, clamped so the strip never leaves a gap at either end
  const placeStrip = useCallback(() => {
    const viewport = viewportRef.current
    const strip = stripRef.current
    const tab = tabRefs.current[active]
    if (!viewport || !strip || !tab) return
    const centred = viewport.clientWidth / 2 - (tab.offsetLeft + tab.offsetWidth / 2)
    const leftmost = Math.min(0, viewport.clientWidth - strip.scrollWidth)
    setOffset(Math.max(leftmost, Math.min(0, centred)))
  }, [active])

  useLayoutEffect(placeStrip, [placeStrip])

  useEffect(() => {
    window.addEventListener('resize', placeStrip)
    return () => window.removeEventListener('resize', placeStrip)
  }, [placeStrip])

  useEffect(() => {
    const track = trackRef.current
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setActive(Math.round(track.scrollLeft / track.clientWidth))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  const goTo = (index) => {
    const track = trackRef.current
    const target = Math.max(0, Math.min(items.length - 1, index))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: target * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
    setActive(target)
  }

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const track = trackRef.current
    drag.current = { x: event.clientX, left: track.scrollLeft, start: active, moved: false }
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    const state = drag.current
    if (!state) return
    const dx = event.clientX - state.x
    if (!state.moved && Math.abs(dx) < 4) return
    if (!state.moved) {
      state.moved = true
      setDragging(true)
    }
    trackRef.current.scrollLeft = state.left - dx
  }

  const endDrag = (event) => {
    const state = drag.current
    if (!state) return
    drag.current = null
    const dx = event.clientX - state.x
    setDragging(false)
    if (!state.moved) return
    // a short flick is enough to move one slide; otherwise settle on the nearest one
    const nearest = Math.round(trackRef.current.scrollLeft / trackRef.current.clientWidth)
    goTo(Math.abs(dx) > DRAG_THRESHOLD ? state.start + (dx < 0 ? 1 : -1) : nearest)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') goTo(active + 1)
    else if (event.key === 'ArrowLeft') goTo(active - 1)
    else return
    event.preventDefault()
  }

  return (
    <div className={styles.carousel} data-reveal>
      <div className={styles.viewport} ref={viewportRef}>
        <div
          className={styles.strip}
          ref={stripRef}
          style={{ transform: `translate3d(${offset}px, 0, 0)` }}
        >
          {items.map((item, index) => (
            <button
              key={item.title}
              ref={(node) => (tabRefs.current[index] = node)}
              type="button"
              className={`${styles.tab} ${index === active ? styles.activeTab : ''}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={trackRef}
        className={`${styles.track} ${dragging ? styles.dragging : ''}`}
        aria-label={a11y.benefits}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {items.map((item, index) => (
          <li
            key={item.title}
            className={styles.slide}
            aria-roledescription="slide"
            aria-label={a11y.slide(index + 1, items.length)}
          >
            <img
              className={styles.image}
              src={item.image}
              alt=""
              width="1200"
              height="897"
              draggable="false"
            />
            <h3 className="sr-only">{item.title}</h3>
            <p className={styles.text}>
              {(item.paragraphs ?? [item.text]).map((paragraph) => (
                <span key={paragraph} className={styles.line}>
                  {paragraph}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>

      <div className={styles.dots} role="group" aria-label={a11y.chooseBenefit}>
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`${styles.dot} ${index === active ? styles.active : ''}`}
            aria-label={item.title}
            aria-current={index === active}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
