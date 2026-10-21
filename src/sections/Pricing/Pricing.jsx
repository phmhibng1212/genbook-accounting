import { Fragment } from 'react'
import Button from '../../components/Button/Button'
import FramedText, { FrameBreak } from '../../components/FrameBreak/FrameBreak'
import PlanCard from '../../components/PlanCard/PlanCard'
import useBreakpoint from '../../hooks/useBreakpoint'
import { useContent } from '../../i18n/LanguageContext'
import styles from './Pricing.module.css'

/** Figma "How AI works" #3 — Desktop 70:3497 · Tablet 78:4842 · Mobile 78:5210. */
export default function Pricing() {
  const breakpoint = useBreakpoint()
  const { pricing } = useContent()
  const { enterprise } = pricing
  // the Vietnamese tablet / mobile frames colour "theo" as part of the gradient, so they carry their own split
  const heading = breakpoint !== 'desktop' && pricing.headingCompact ? pricing.headingCompact : pricing.heading

  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={`${styles.title} gradient-block`} id="pricing-title" data-reveal>
            {heading.map((part) => (
              <Fragment key={part.text}>
                <span className={part.gradient ? undefined : 'solid'}>{part.text}</span>
                {part.breakAfter && <FrameBreak frames={part.breakAfter} />}
              </Fragment>
            ))}
          </h2>
          <p className={styles.text} data-reveal data-reveal-delay="100">
            <FramedText text={pricing.text} breaks={pricing.textBreaks} />
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
