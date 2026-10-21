import FeatureRow from '../../components/FeatureRow/FeatureRow'
import { clipFor, mediaFor } from '../../data/media'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Features.module.css'

/** Figma "How AI works" #2 — Desktop 160:5855 · Tablet 160:6261 · Mobile 160:6667. */
export default function Features() {
  const { language, content } = useLanguage()
  const { features } = content

  return (
    <section className={styles.section} id="features" aria-labelledby="features-title">
      <div className={`${styles.container} ${features.textLines.length ? '' : styles.noLead}`}>
        <div className={styles.head}>
          <h2 className={`${styles.title} gradient-block`} id="features-title" data-reveal>
            {features.headingLines.map((line) => (
              <span key={line.text} className={`${styles.titleLine} ${line.gradient ? '' : 'solid'}`}>
                {line.text}{' '}
              </span>
            ))}
          </h2>
          {features.textLines.length > 0 && (
            <p className={styles.text} data-reveal data-reveal-delay="100">
              {features.textLines.map((line) => (
                <span key={line} className={styles.textLine}>
                  {line}{' '}
                </span>
              ))}
            </p>
          )}
        </div>

        <div className={styles.rows}>
          {features.rows.map((row, index) => (
            <FeatureRow
              key={row.id}
              {...row}
              mediaFirstOnMobile={features.mobileMediaFirst && index > 0}
              clip={clipFor(row.slot, language)}
              imageSrc={mediaFor(row.slot, language)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
