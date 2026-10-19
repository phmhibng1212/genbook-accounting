import styles from './Button.module.css'

/**
 * Figma "Button" family (nodes 1:47 nav / 70:3418 / 70:3447 / 54:1430 …).
 *
 * variant  'ghost'     nav link, radius-sm, gray-700
 *          'primary'   filled green-600, pill
 *          'secondary' 1.5px gray-800 outline, pill
 * size     'sm' 40 · 'md' 44 · 'lg' 48 · 'xl' 54  (height in px)
 * fullWidth stretches to the container (mobile frames)
 *
 * Renders an <a> when `href` is given, otherwise a <button>. An absolute http(s) address opens in a new tab.
 */
export default function Button({
  variant = 'primary',
  size = 'sm',
  fullWidth = false,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        <span className={styles.label}>{children}</span>
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  )
}
