import styles from './FooterColumn.module.css'

/** A footer link column: heading + list of links (Figma "Nav" 70:3733 / 70:3745). */
export default function FooterColumn({ title, links, className = '' }) {
  return (
    <nav className={`${styles.column} ${className}`} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            <a className={styles.link} href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
