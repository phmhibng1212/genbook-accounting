import Button from '../../components/Button/Button'
import ClipPlayer from '../../components/ClipPlayer/ClipPlayer'
import useBreakpoint from '../../hooks/useBreakpoint'
import { useContent } from '../../i18n/LanguageContext'
import { desktop, tablet, mobile, wash } from './heroBands'
import styles from './Hero.module.css'

const decor = { desktop, tablet, mobile }

/** The stacked translucent panels behind the Hero (Figma "Group 8790"). */
function Bands({ breakpoint }) {
  const { box, base, bands } = decor[breakpoint]
  const gradient = (angle) =>
    `linear-gradient(${angle}deg, var(--proposed-band-from) 11.429%, var(--proposed-band-to) 105.98%)`

  const groupStyle =
    breakpoint === 'mobile'
      ? { width: box.width, height: box.height }
      : { left: box.left, top: box.top, width: box.width, height: box.height }

  return (
    <div className={`${styles.bands} ${styles[`bands-${breakpoint}`]}`} style={groupStyle} aria-hidden="true">
      <span className={styles.band} style={{ inset: 0, background: gradient(base.angle) }} />
      {bands.map((band, index) => (
        <span
          key={index}
          className={styles.band}
          style={{
            left: band.left,
            top: band.top,
            width: band.width,
            height: band.height,
            background: gradient(band.angle),
          }}
        />
      ))}
    </div>
  )
}

/** Figma "Hero" — Desktop 70:3423 · Tablet 78:4767 · Mobile 78:5135. */
export default function Hero() {
  const breakpoint = useBreakpoint()
  const { hero, heroClip, heroClipStack } = useContent()
  const { angle, a, b, c } = wash[breakpoint]

  return (
    <section className={styles.hero} id="top">
      <div
        className={styles.wrap}
        style={{
          '--hero-wash-angle': angle,
          '--hero-wash-a': a,
          '--hero-wash-b': b,
          '--hero-wash-c': c,
        }}
      >
        <Bands breakpoint={breakpoint} />

        <div className={styles.copy}>
          <div className={styles.content}>
            <h1 className={`${styles.heading} ${hero.stackLines ? styles.stacked : ''}`} data-reveal>
              {hero.headingLines.map((line, index) => (
                <span key={line} className={styles.line}>
                  {line}
                  {index < hero.headingLines.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <p className={styles.text} data-reveal data-reveal-delay="100">
              {hero.text}
            </p>
          </div>

          <div
            className={`${styles.actions} ${hero.fitActions ? styles.fitActions : ''}`}
            data-reveal
            data-reveal-delay="200"
          >
            <Button
              className={styles.action}
              variant="primary"
              size="xl"
              fullWidth={breakpoint === 'mobile'}
              href={hero.primary.href}
            >
              {hero.primary.label}
            </Button>
            <Button
              className={styles.action}
              variant="secondary"
              size="xl"
              fullWidth={breakpoint === 'mobile'}
              href={hero.secondary.href}
            >
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className={styles.media} data-reveal="image" data-reveal-delay="150">
          <ClipPlayer
            src={heroClip}
            stack={heroClipStack}
            poster={hero.poster}
            label={hero.imageLabel}
            aspectRatio="1960 / 1415"
          />
        </div>
      </div>
    </section>
  )
}
