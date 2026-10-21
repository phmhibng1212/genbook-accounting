import FramedText from '../FrameBreak/FrameBreak'
import MediaSlot from '../MediaSlot/MediaSlot'
import { bulletIcon } from '../../data/media'
import styles from './FeatureRow.module.css'

/**
 * One feature row: a heading with its bullet points beside an animated visual (Figma 160:5864 …).
 *
 * Desktop: copy beside the visual, `reverse` puts the visual first. Tablet: copy above the visual in every row.
 * Mobile: copy above the visual, unless `mediaFirstOnMobile` puts the visual first.
 * `gap` is the Figma gap between the two on desktop, in px (80 / 89).
 */
export default function FeatureRow({ title, titleBreaks, bullets, imageSrc, imageLabel, reverse = false, gap = '80', mediaFirstOnMobile = false }) {
  return (
    <div
      className={`${styles.row} ${reverse ? styles.reverse : ''} ${mediaFirstOnMobile ? styles.mediaFirst : ''}`}
      style={{ '--row-gap': `var(--space-${gap})` }}
    >
      <div className={styles.copy} data-reveal>
        <h3 className={styles.title}>
          <FramedText text={title} breaks={titleBreaks} />
        </h3>
        <ul className={styles.bullets} role="list">
          {bullets.map((bullet) => (
            <li key={bullet} className={styles.bullet}>
              <span className={styles.icon} aria-hidden="true">
                {bulletIcon && <img src={bulletIcon} alt="" width="24" height="24" />}
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.media} data-reveal="image">
        <MediaSlot src={imageSrc} label={imageLabel} aspectRatio="1292 / 948" width={1292} height={948} />
      </div>
    </div>
  )
}
