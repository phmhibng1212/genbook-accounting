import { useEffect, useRef, useState } from 'react'
import { createStackedRenderer, needsStackedAlpha } from './stackedAlpha'
import styles from './ClipPlayer.module.css'

const PRELOAD_MARGIN = '600px 0px'
const PLAY_AT = 0.4

/**
 * Plays an exported animation clip in place of a static product image.
 *
 *  - no controls, no loop
 *  - starts from the first frame once PLAY_AT of the frame is on screen
 *  - holds the last frame when it ends
 *  - once the frame has fully left the viewport it is rewound, so scrolling back (up or down)
 *    plays it again from the start
 *  - plays whatever the prefers-reduced-motion setting: the clip replaces a static image and
 *    playing it on scroll is the asked-for behaviour (page-wide reveal motion is toned down instead)
 *
 * `src` is the transparent WebM. Safari and every browser on iOS cannot decode a WebM's alpha channel (the clip
 * would play on a black background), so there the `stack` file is used instead: an H.264 video holding the colour
 * and the alpha matte side by side, which a small WebGL canvas merges back into a transparent picture (see
 * ./stackedAlpha.js). The video element is then only a decoder, kept out of sight, so no native player UI
 * appears. If WebGL is not available the static `poster` is shown.
 *
 * `poster` is the static Figma image shown until the clip has its first frame. The file itself is
 * only requested when the frame is within PRELOAD_MARGIN of the viewport.
 */
export default function ClipPlayer({ src, stack, poster, label, aspectRatio, fit = 'contain', className = '' }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stacked] = useState(() => Boolean(stack) && needsStackedAlpha())
  const [firstFrame, setFirstFrame] = useState(false)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    const video = videoRef.current
    let played = false
    let onReady = null
    let renderer = null

    // keep the clip silent and inline: iOS needs the attributes, not just the React props
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    if (stacked) {
      renderer = createStackedRenderer(canvasRef.current, video)
      if (!renderer) {
        setBroken(true)
        return undefined
      }
      renderer.onFirstFrame(() => setFirstFrame(true))
    }

    const cancelPending = () => {
      if (onReady) video.ownerDocument.removeEventListener('touchend', onReady)
      onReady = null
    }

    // Start from frame 0. play() is called straight away, not after "canplay": iOS ignores `preload` and
    // fetches no data until play() is called, so waiting for data would wait forever. play() on a muted inline
    // video is allowed without a tap. Low Power Mode refuses it; then the first tap anywhere retries once.
    const start = () => {
      cancelPending()
      if (video.readyState > 0) video.currentTime = 0
      video.play().catch(() => {
        if (!played) return
        onReady = () => {
          cancelPending()
          if (played) video.play().catch(() => {})
        }
        video.ownerDocument.addEventListener('touchend', onReady, { once: true, passive: true })
      })
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        loadObserver.disconnect()
        video.preload = 'auto'
        video.load()
      },
      { rootMargin: PRELOAD_MARGIN },
    )

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // fully out of view: rewind so the next visit starts again from the top
          played = false
          cancelPending()
          video.pause()
          if (video.readyState > 0) video.currentTime = 0
          return
        }
        if (played || entry.intersectionRatio < PLAY_AT) return
        played = true
        start()
      },
      { threshold: [0, PLAY_AT] },
    )

    loadObserver.observe(frame)
    playObserver.observe(frame)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
      cancelPending()
      video.pause()
      renderer?.dispose()
    }
  }, [src, stack, stacked])

  const source = stacked ? stack : src

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      role="img"
      aria-label={label}
    >
      {stacked && poster && (
        <img
          className={`${styles.poster} ${firstFrame && !broken ? styles.posterGone : ''}`}
          style={{ objectFit: fit }}
          src={poster}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      )}
      {stacked && !broken && <canvas ref={canvasRef} className={styles.canvas} style={{ objectFit: fit }} aria-hidden="true" />}
      <video
        ref={videoRef}
        className={stacked ? styles.decoder : styles.video}
        style={stacked ? undefined : { objectFit: fit }}
        src={broken ? undefined : source}
        poster={stacked ? undefined : poster}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        x-webkit-airplay="deny"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}
