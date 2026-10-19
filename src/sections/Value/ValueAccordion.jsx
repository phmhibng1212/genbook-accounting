import { useEffect, useId, useRef, useState } from 'react'
import styles from './ValueAccordion.module.css'

/**
 * Desktop "Clear Numbers" list (Figma 70:3456): four rows, one open at a time.
 * Open row = bordered card with description + image; closed rows show only their grey title.
 * Hovering a row opens it (a short intent delay stops a pass-over from flickering the layout);
 * click and keyboard focus open it too.
 */
const HOVER_DELAY = 60
export default function ValueAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const open = (index) => {
    clearTimeout(timer.current)
    setOpenIndex(index)
  }
  const openSoon = (index) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpenIndex(index), HOVER_DELAY)
  }

  return (
    <div className={styles.list} data-reveal-group>
      {items.map((item, index) => {
        const isOpen = index === openIndex
        const headingId = `${baseId}-heading-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.title} className={`${styles.row} ${styles[item.artwork]} ${item.tone === 'ink' ? styles.ink : ''} ${isOpen ? `${styles.open} gradient-outline` : ''}`}
            data-reveal
            onPointerEnter={(event) => event.pointerType === 'mouse' && openSoon(index)}
            onPointerLeave={() => clearTimeout(timer.current)}
          >
            <h3 className={styles.title} id={headingId}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => open(index)}
                onFocus={() => open(index)}
              >
                {item.title}
              </button>
            </h3>

            <div
              id={panelId}
              className={styles.panel}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
            >
              <p className={styles.text}>{item.text}</p>
              <img className={styles.image} src={item.image} alt="" width="1200" height="897" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
