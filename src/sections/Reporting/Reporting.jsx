import FeatureRow from '../../components/FeatureRow/FeatureRow'
import { useContent } from '../../i18n/LanguageContext'
import styles from './Reporting.module.css'

/** Figma "How AI works" #2 — Desktop 70:3461 · Tablet 78:4806 · Mobile 78:5174. */
export default function Reporting() {
  const { reporting } = useContent()
  return (
    <section className={styles.section} id="features" aria-labelledby="features-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title} id="features-title" data-reveal>
            {reporting.headingLines.map((line) => (
              <span key={line[0].text} className={styles.titleLine}>
                {line.map((part) => (
                  <span key={part.text} className={part.gradient ? 'gradient-text' : undefined}>
                    {part.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className={styles.text} data-reveal data-reveal-delay="100">
            {reporting.textLines.map((line) => (
              <span key={line} className={styles.textLine}>
                {line}{' '}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.rows}>
          {reporting.rows.map((row) => (
            <FeatureRow key={row.id} {...row} />
          ))}
        </div>
      </div>
    </section>
  )
}
