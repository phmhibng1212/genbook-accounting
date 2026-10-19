import chevron from '../../assets/icons/faq-chevron.svg'
import chevronOpen from '../../assets/icons/faq-chevron-open.svg'
import styles from './FaqItem.module.css'

/**
 * FAQ row "Ques" (Figma 50:5117 closed · 91:10592 open): question + chevron disc; when open the
 * answer sits under the question, the disc turns green and flips.
 *
 * The question is the only button, but its click area is stretched over the whole card so the whole
 * row is pressable.
 */
export default function FaqItem({ id, question, answer, open, onToggle }) {
  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`} data-reveal>
      <h3 className={styles.heading}>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          id={`${id}-question`}
          onClick={onToggle}
        >
          {question}
        </button>
      </h3>

      <span className={styles.chevron} aria-hidden="true">
        <img src={open ? chevronOpen : chevron} alt="" width="16" height="16" />
      </span>

      <div
        className={styles.answer}
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        hidden={!open}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}
