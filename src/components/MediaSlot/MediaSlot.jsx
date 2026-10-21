import styles from './MediaSlot.module.css'

/**
 * A frame for animated artwork (GIF / animated WebP).
 *
 * The frame keeps the design's aspect ratio whether or not the file is there yet, so the layout never
 * jumps. The image is lazy-loaded and decoded off the main thread; the browser animates it by itself,
 * and stops animating it while it is off screen.
 */
export default function MediaSlot({ src, label, aspectRatio, width, height, priority = false, className = '' }) {
  return (
    <div
      className={`${styles.frame} ${className}`}
      style={{ aspectRatio }}
      role={src ? 'img' : undefined}
      aria-label={src ? label : undefined}
      aria-hidden={src ? undefined : 'true'}
    >
      {src && (
        <img
          className={styles.image}
          src={src}
          alt=""
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          draggable="false"
        />
      )}
    </div>
  )
}
