import ClipPlayer from '../ClipPlayer/ClipPlayer'
import styles from './FeatureRow.module.css'

/**
 * One "Balance Sheet / Profit and Loss / Cash Flows / Notes" row (Figma 70:3469 …).
 *
 * Desktop: copy beside the visual (`reverse` puts the visual first). Tablet / mobile: copy above the
 * visual in every row. `gap` is the Figma gap between the two, in px (80 / 89 / 40) and applies in
 * both directions. `fixedText` keeps the copy column at its 554px width instead of letting it flex.
 *
 * `lines` are the line breaks authored in the Desktop frame; they are only honoured there, below it
 * the text reflows. `titleLines` does the same for a heading Figma breaks by hand (desktop + mobile).
 */
export default function FeatureRow({
  title,
  titleLines,
  lines,
  poster,
  clip,
  clipStack,
  imageLabel,
  reverse = false,
  fixedText = false,
  gap = '80',
}) {
  return (
    <div
      className={`${styles.row} ${reverse ? styles.reverse : ''}`}
      style={{ '--row-gap': `var(--space-${gap})` }}
    >
      <div className={`${styles.copy} ${fixedText ? styles.fixed : ''}`} data-reveal>
        <h3 className={styles.title}>
          {titleLines
            ? titleLines.map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line.split('|').map((part, index) => (
                    <span key={part}>
                      {index > 0 && <br className={styles.mobileBreak} />}
                      {part}
                      {index === 0 && line.includes('|') ? ' ' : ''}
                    </span>
                  ))}{' '}
                </span>
              ))
            : title}
        </h3>
        <p className={styles.text}>
          {lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}{' '}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.media} data-reveal="image">
        <ClipPlayer src={clip} stack={clipStack} poster={poster} label={imageLabel} aspectRatio="1088 / 798" />
      </div>
    </div>
  )
}
