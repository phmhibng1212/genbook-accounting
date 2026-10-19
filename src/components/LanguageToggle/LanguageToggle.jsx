import styles from './LanguageToggle.module.css'

/**
 * "Group - Language" (70:3413): EN | VI pill switch.
 * Reports the chosen code through `onChange`; the language itself lives in i18n/LanguageContext.
 */
export default function LanguageToggle({ languages, value, onChange, label = 'Language', fullWidth = false }) {
  return (
    <div
      className={`${styles.group} ${fullWidth ? styles.fullWidth : ''}`}
      role="group"
      aria-label={label}
    >
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          className={`${styles.option} ${value === language ? styles.active : ''}`}
          aria-pressed={value === language}
          onClick={() => onChange(language)}
        >
          {language}
        </button>
      ))}
    </div>
  )
}
