import linkedin from '../../assets/icons/linkedin.svg'
import facebook from '../../assets/icons/facebook.svg'
import styles from './SocialLink.module.css'

const ICONS = {
  linkedin: { src: linkedin, size: 20 },
  facebook: { src: facebook, size: 24 },
}

/** 40px square social button on the footer (Figma 70:3723 / 70:3729). */
export default function SocialLink({ icon, label, href }) {
  const { src, size } = ICONS[icon]

  return (
    <a className={styles.link} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
      <img src={src} alt="" width={size} height={size} />
    </a>
  )
}
