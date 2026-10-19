import markUrl from '../../assets/icons/logo-mark.svg'
import styles from './Logo.module.css'

/**
 * "Link - Genbook" (70:3396): logo mark + "Genbook" wordmark + "Accounting" product label.
 * tone 'light' = on white (header), 'dark' = on the footer's dark background.
 */
export default function Logo({ tone = 'light', href = '#top', label = 'Genbook Accounting, home', className = '' }) {
  return (
    <a className={`${styles.logo} ${styles[tone]} ${className}`} href={href} aria-label={label}>
      <span className={styles.brand}>
        <img className={styles.mark} src={markUrl} alt="" width="30" height="27" />
        <span className={styles.name}>Genbook</span>
      </span>
      <span className={styles.product}>Accounting</span>
    </a>
  )
}
