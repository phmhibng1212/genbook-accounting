import Button from '../../components/Button/Button'
import { useContactModal } from '../../components/ContactModal/ContactModalContext'
import ClipPlayer from '../../components/ClipPlayer/ClipPlayer'
import MediaSlot from '../../components/MediaSlot/MediaSlot'
import { clipFor, mediaFor } from '../../data/media'
import useBreakpoint from '../../hooks/useBreakpoint'
import { useLanguage } from '../../i18n/LanguageContext'
import { desktop, tablet, mobile, wash } from './heroBands'
import styles from './Hero.module.css'

const decor = { desktop, tablet, mobile }

/** The stacked translucent panels behind the Hero (Figma "Group 8790"). */
function Bands({ breakpoint }) {
  const { box, base, bands } = decor[breakpoint]
  const gradient = (angle) =>
    `linear-gradient(${angle}deg, var(--proposed-band-from) 11.429%, var(--proposed-band-to) 105.98%)`

  // desktop hangs from the top of the wrap; tablet sits on its bottom edge; mobile is centred (see the CSS)
  const groupStyle = { width: box.width, height: box.height }
  if (box.left !== undefined) groupStyle.left = box.left
  if (box.top !== undefined) groupStyle.top = box.top
  if (box.bottom !== undefined) groupStyle.bottom = box.bottom

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

/** Figma "Hero" — Desktop 160:5805 · Tablet 160:6211 · Mobile 160:6617. */
export default function Hero() {
  const breakpoint = useBreakpoint()
  const { language, content } = useLanguage()
  const { openContact } = useContactModal()
  const { hero } = content
  const clip = clipFor('hero', language)
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
            <h1 className={styles.heading} data-reveal>
              {hero.heading}
            </h1>
            <p className={styles.text} data-reveal data-reveal-delay="100">
              {hero.text}
            </p>
          </div>

          <div className={styles.actions} data-reveal data-reveal-delay="200">
            <Button
              className={styles.primary}
              variant="primary"
              size="xl"
              fullWidth={breakpoint === 'mobile'}
              href={hero.primary.href}
            >
              {hero.primary.label}
            </Button>
            <Button
              className={styles.secondary}
              variant="secondary"
              size="xl"
              fullWidth={breakpoint === 'mobile'}
              onClick={openContact}
              aria-haspopup="dialog"
            >
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className={styles.media} data-reveal="image" data-reveal-delay="150">
          {clip ? (
            <ClipPlayer src={clip.src} stack={clip.stack} poster={clip.poster} label={hero.imageLabel} aspectRatio="1960 / 1415" />
          ) : (
            <MediaSlot src={mediaFor('hero', language)} label={hero.imageLabel} aspectRatio="1960 / 1415" priority />
          )}
        </div>
      </div>
    </section>
  )
}
