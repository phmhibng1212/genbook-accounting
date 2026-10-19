import useBreakpoint from '../../hooks/useBreakpoint'
import { useContent } from '../../i18n/LanguageContext'
import ValueAccordion from './ValueAccordion'
import ValueCarousel from './ValueCarousel'
import styles from './Value.module.css'

/** Figma "How AI works" #1 — Desktop 70:3449 · Tablet 78:4793 · Mobile 78:5161. */
export default function Value() {
  const breakpoint = useBreakpoint()
  const { value } = useContent()

  return (
    <section className={styles.section} id="value" aria-labelledby="value-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.titleCol}>
            <h2 className={styles.title} id="value-title" data-reveal>
              {value.heading.map((part) => (
                <span key={part.text} className={part.gradient ? 'gradient-text' : undefined}>
                  {part.text}
                </span>
              ))}
              <span className={styles.trail} aria-hidden="true" />
            </h2>
          </div>
          <div className={styles.leadCol}>
            <p className={styles.lead} data-reveal data-reveal-delay="100">
              {value.text}
              <span className={styles.trail} aria-hidden="true" />
            </p>
          </div>
        </div>

        {breakpoint === 'desktop' ? (
          <ValueAccordion items={value.items} />
        ) : (
          <ValueCarousel items={value.items} />
        )}
      </div>
    </section>
  )
}
