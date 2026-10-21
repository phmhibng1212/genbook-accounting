import { Fragment, useId, useState } from 'react'
import { FrameBreak } from '../../components/FrameBreak/FrameBreak'
import FaqItem from '../../components/FaqItem/FaqItem'
import { useContent } from '../../i18n/LanguageContext'
import styles from './Faq.module.css'

/** Figma "How AI works" #4 — Desktop 70:3664 · Tablet 78:5009 · Mobile 78:5377. */
export default function Faq() {
  const { faq } = useContent()
  const [openIndex, setOpenIndex] = useState(null)
  const baseId = useId()

  return (
    <section className={styles.section} id="faqs" aria-labelledby="faqs-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={`${styles.title} ${faq.tightHeading ? styles.tight : ''} gradient-block`} id="faqs-title" data-reveal>
            {faq.heading.map((part) => (
              <Fragment key={part.text}>
                <span className={part.gradient ? undefined : 'solid'}>{part.text}</span>
                {part.breakAfter && <FrameBreak frames={part.breakAfter} />}
              </Fragment>
            ))}
          </h2>
          <p className={styles.text} data-reveal data-reveal-delay="100">
            {faq.text}
          </p>
        </div>

        <div className={styles.list} data-reveal-group>
          {faq.items.map((item, index) => (
            <FaqItem
              key={item.question}
              id={`${baseId}-${index}`}
              question={item.question}
              answer={item.answer}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
