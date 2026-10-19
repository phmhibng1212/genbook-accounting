import { useEffect, useId, useRef, useState } from 'react'
import Button from '../Button/Button'
import LanguageToggle from '../LanguageToggle/LanguageToggle'
import Logo from '../Logo/Logo'
import useScrolled from '../../hooks/useScrolled'
import { links } from '../../data/links'
import menuIcon from '../../assets/icons/menu.svg'
import closeIcon from '../../assets/icons/menu-close.svg'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Header.module.css'

/**
 * "Page Header" (Desktop 70:3393 · Tablet 78:4736 · Mobile 78:5104).
 * Desktop: logo · nav · language + CTA. Tablet / mobile: logo + menu button, which opens the
 * 267px panel (Figma "Variant2", 78:4083).
 */
export default function Header() {
  const scrolled = useScrolled(10)
  const { language, setLanguage, content } = useLanguage()
  const { navLinks, languages, header, a11y } = content
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false)
    }
    // leaving the tablet/mobile layout while the panel is open closes it
    const desktop = window.matchMedia('(min-width: 1280px)')
    const onBreakpoint = () => desktop.matches && setOpen(false)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  const close = () => setOpen(false)

  // the tablet / mobile menu: choosing the other language closes the menu and reloads the page in that language
  // (when the choice could not be remembered, a reload would bring the old language back, so it only switches)
  const switchFromMenu = (next) => {
    const code = next.toLowerCase()
    close()
    if (code === language) return
    if (setLanguage(code)) window.location.reload()
  }

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${language === 'vi' ? styles.compact : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.brand}>
          <Logo label={a11y.home} />
        </div>

        <nav className={styles.nav} aria-label={a11y.primaryNav}>
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" href={link.href}>
              {link.label}
            </Button>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopOnly}>
            <LanguageToggle
              languages={languages}
              value={language.toUpperCase()}
              onChange={(next) => setLanguage(next.toLowerCase())}
              label={a11y.language}
            />
          </div>
          <Button className={styles.desktopOnly} variant="primary" size="md" href={links.signIn}>
            {header.cta}
          </Button>

          <div className={styles.menu} ref={menuRef}>
            <button
              ref={toggleRef}
              type="button"
              className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? a11y.closeMenu : a11y.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              <img src={open ? closeIcon : menuIcon} alt="" width={open ? 40 : 20} height={open ? 40 : 20} />
            </button>

            <div id={menuId} className={styles.panel} hidden={!open}>
              <nav className={styles.panelNav} aria-label={a11y.menuNav}>
                {navLinks.map((link) => (
                  <Button key={link.href} variant="ghost" size="sm" fullWidth href={link.href} onClick={close}>
                    {link.label}
                  </Button>
                ))}
                <LanguageToggle
                  languages={languages}
                  value={language.toUpperCase()}
                  onChange={switchFromMenu}
                  label={a11y.language}
                  fullWidth
                />
              </nav>
              <Button variant="primary" size="xl" fullWidth href={links.signIn} onClick={close}>
                {header.menuCta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
