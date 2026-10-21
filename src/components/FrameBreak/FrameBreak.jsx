import styles from './FrameBreak.module.css'

const FRAME_CLASS = { desktop: styles.desktop, tablet: styles.tablet, mobile: styles.mobile }

/**
 * A line break the design draws in some of its three frames only (desktop >= 1280 · tablet 768–1279 · mobile < 768).
 * In the other frames the text just reflows.
 */
export function FrameBreak({ frames }) {
  return <br className={frames.map((frame) => FRAME_CLASS[frame]).join(' ')} />
}

/**
 * Text with frame-specific breaks: `breaks` is a list of `{ after, frames }`, where `after` is the text the break
 * follows. The break is drawn in those frames only; elsewhere the text reflows.
 */
export default function FramedText({ text, breaks }) {
  const pieces = []
  let rest = text
  ;(breaks ?? []).forEach(({ after, frames }, index) => {
    const at = rest.indexOf(after)
    if (at === -1) return
    const end = at + after.length
    pieces.push(rest.slice(0, end), ' ', <FrameBreak key={index} frames={frames} />)
    rest = rest.slice(end).trimStart()
  })
  pieces.push(rest)
  return <>{pieces}</>
}
