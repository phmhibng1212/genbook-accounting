import FooterColumn from '../FooterColumn/FooterColumn'
import Logo from '../Logo/Logo'
import SocialLink from '../SocialLink/SocialLink'
import { links } from '../../data/links'
import { useContent } from '../../i18n/LanguageContext'
import styles from './Footer.module.css'

/** Figma "Footer" — Desktop 70:3698 · Tablet 78:5045 · Mobile 78:5413. */
export default function Footer() {
  const { footer, a11y } = useContent()
  const { contact, products, legal } = footer

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo tone="dark" label={a11y.home} />
            <p className={styles.description}>{footer.description}</p>
          </div>

          <div className={styles.columns}>
            <section className={styles.contact} aria-labelledby="footer-contact">
              <h2 className={styles.contactTitle} id="footer-contact">
                {contact.title}
              </h2>
              <p className={styles.contactText}>
                {contact.textParts.map((part) =>
                  part.link ? (
                    <a
                      key={part.text}
                      className={`${styles.contactLink} ${part.plain ? styles.contactLinkPlain : ''}`}
                      href={links.contact}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {part.text}
                    </a>
                  ) : (
                    <span key={part.text}>{part.text}</span>
                  ),
                )}
              </p>
              <div className={styles.socials}>
                {contact.socials.map((social) => (
                  <SocialLink key={social.icon} {...social} />
                ))}
              </div>
            </section>

            <FooterColumn className={styles.products} title={products.title} links={products.links} />
            <FooterColumn className={styles.legal} title={legal.title} links={legal.links} />
          </div>
        </div>

        <div className={styles.bottom}>
          <small className={styles.copyright}>{footer.copyright}</small>
        </div>
      </div>
    </footer>
  )
}
