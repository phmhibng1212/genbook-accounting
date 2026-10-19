import Button from '../../components/Button/Button'
import PlanCard from '../../components/PlanCard/PlanCard'
import useBreakpoint from '../../hooks/useBreakpoint'
import { useContent } from '../../i18n/LanguageContext'
import styles from './Pricing.module.css'

/** Figma "How AI works" #3 — Desktop 70:3497 · Tablet 78:4842 · Mobile 78:5210. */
export default function Pricing() {
  const breakpoint = useBreakpoint()
  const { pricing } = useContent()
  const { enterprise } = pricing

  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2
            className={`${styles.title} ${pricing.wrapHeading ? styles.wrapTitle : ''}`}
            id="pricing-title"
            data-reveal
          >
            {pricing.heading.map((part) => (
              <span key={part.text} className={part.gradient ? 'gradient-text' : undefined}>
                {part.text}
                {part.breakAfter && <br className={styles.wideBreak} />}
              </span>
            ))}
          </h2>
          <p
            className={styles.text}
            data-reveal
            data-reveal-delay="100"
          >
            {pricing.textLines.map((line) => (
              <span key={line} className={styles.textLine}>
                {line}{' '}
              </span>
            ))}
          </p>
        </div>

        <div
          className={`${styles.enterprise} ${pricing.solidBanner ? styles.solid : ''} gradient-outline`}
          style={{ '--banner-angle': pricing.bannerAngles[breakpoint] }}
          data-reveal
        >
          <div className={styles.enterpriseCopy}>
            <h3 className={styles.enterpriseName}>{enterprise.title}</h3>
            <p className={styles.enterpriseText}>
              {enterprise.lines.map((line) => (
                <span key={line} className={styles.enterpriseLine}>
                  {line}{' '}
                </span>
              ))}
            </p>
          </div>
          <Button
            className={`${styles.enterpriseCta} ${pricing.fitEnterpriseCta ? styles.fitCta : ''}`}
            variant="secondary"
            size="sm"
            fullWidth={breakpoint === 'mobile'}
            href={enterprise.cta.href}
          >
            {enterprise.cta.label}
          </Button>
        </div>

        <div className={styles.plans} data-reveal-group>
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.id} period={pricing.perMonth} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
