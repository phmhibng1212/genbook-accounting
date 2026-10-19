import Button from '../../components/Button/Button'
import ctaMark from '../../assets/icons/cta-mark.svg'
import useBreakpoint from '../../hooks/useBreakpoint'
import { useContent } from '../../i18n/LanguageContext'
import { links } from '../../data/links'
import styles from './Cta.module.css'

/** Figma "How AI works" #5 — Desktop 70:3676 · Tablet 78:5026 · Mobile 78:5394 (Vietnamese 91:9745 · 91:10108 · 91:10471). */
export default function Cta() {
  const breakpoint = useBreakpoint()
  const { cta } = useContent()
  // the Vietnamese desktop frame ends the address with a full stop in bold and breaks the line after it;
  // its tablet / mobile frames run the sentences on
  const stacked = cta.lineBreak === 'always' || (cta.lineBreak === 'desktop' && breakpoint === 'desktop')

  return (
    <section
      className={styles.section}
      id="contact"
      aria-labelledby="contact-title"
      style={{ '--panel-angle': cta.angles[breakpoint] }}
    >
      <div className={`${styles.panel} ${cta.panelWide ? styles.panelWide : ''}`}>
        <div className={styles.content}>
          <img className={styles.mark} src={ctaMark} alt="" width="48" height="43" data-reveal />
          <h2
            className={`${styles.title} ${cta.headingLarge ? styles.titleLarge : ''} ${cta.headingLines ? styles.titleLines : ''}`}
            id="contact-title"
            data-reveal
            data-reveal-delay="100"
          >
            {cta.headingLines
              ? cta.headingLines.map((line, index) => (
                  <span key={line} className={styles.titleLine}>
                    {line}
                    {index < cta.headingLines.length - 1 ? ' ' : ''}
                  </span>
                ))
              : cta.heading}
          </h2>
          <p className={styles.text} data-reveal data-reveal-delay="200">
            {cta.before}
            <a className={styles.email} href={links.contact} target="_blank" rel="noopener noreferrer">
              {cta.email}
              {stacked ? cta.dot : ''}
            </a>
            {stacked ? <br /> : `${cta.dot} `}
            {cta.after}
          </p>
          <div className={styles.actions} data-reveal data-reveal-delay="300">
            <Button className={styles.action} variant="secondary" size="lg" href={cta.secondary.href}>
              {cta.secondary.label}
            </Button>
            <Button className={styles.action} variant="primary" size="lg" href={cta.primary.href}>
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
