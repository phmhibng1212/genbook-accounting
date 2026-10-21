import { Fragment } from 'react'
import FramedText, { FrameBreak } from '../../components/FrameBreak/FrameBreak'
import MediaSlot from '../../components/MediaSlot/MediaSlot'
import { mediaFor } from '../../data/media'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Steps.module.css'

/** Figma "How AI works" #1 — Desktop 160:5832 · Tablet 160:6238 · Mobile 160:6644. Three cards, each with its animation. */
export default function Steps() {
  const { language, content } = useLanguage()
  const { steps } = content

  return (
    <section className={styles.section} id="value" aria-labelledby="value-title">
      <div className={styles.container}>
        <h2 className={`${styles.title} gradient-block`} id="value-title" data-reveal>
          {steps.heading.map((part) => (
            <Fragment key={part.text}>
              <span className={part.gradient ? undefined : 'solid'}>{part.text}</span>
              {part.breakAfter && <FrameBreak frames={part.breakAfter} />}
            </Fragment>
          ))}
        </h2>

        <div className={styles.cards} data-reveal-group>
          {steps.items.map((item) => (
            <article key={item.id} className={`${styles.card} ${styles[item.tone]}`} data-reveal>
              <MediaSlot
                src={mediaFor(item.slot, language)}
                label={item.imageLabel}
                aspectRatio="672 / 496"
                width={672}
                height={496}
              />
              <div className={styles.copy}>
                <h3 className={styles.cardTitle}>
                  <FramedText text={item.title} breaks={item.titleBreaks} />
                </h3>
                <p className={styles.cardText}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
