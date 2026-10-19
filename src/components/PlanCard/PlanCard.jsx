import Button from '../Button/Button'
import checkDark from '../../assets/icons/check-dark.svg'
import styles from './PlanCard.module.css'

/**
 * Pricing plan card (Figma "Background+Border" 70:3511 / "Background+Shadow" 70:3561).
 *
 * `nowrapItems` / `nowrapItemsDesktop` are the feature rows Figma sets on one line (a few run 1–16px past
 * the text column, still inside the card); the rest wrap.
 *
 * tone 'outline'  white card, 1px border, 20px radius — Starter, Scale
 *      'popular'  the same card at a 24px radius with a green badge — Growth
 *
 * `strongInk` sets the popular card's name and price in gray-900 (the Vietnamese frames; the English ones use
 * gray-800); `whiteBadge` sets the badge copy in white (Vietnamese) rather than green-0.
 */
export default function PlanCard({
  tone = 'outline',
  name,
  badge,
  description,
  price,
  period,
  priceGap,
  yearly,
  yearlyStrong = false,
  strongInk = false,
  whiteBadge = false,
  features,
  nowrapItems = [],
  nowrapItemsDesktop = [],
  cta,
}) {
  return (
    <article
      className={`${styles.card} ${styles[tone]} ${strongInk ? styles.strongInk : ''}`}
      style={{ '--price-gap': priceGap }}
      data-reveal
    >
      <div className={styles.intro}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{name}</h3>
          {badge && <span className={`${styles.badge} ${whiteBadge ? styles.whiteBadge : ''}`}>{badge}</span>}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.priceBlock}>
        <p className={styles.price}>
          <span className={styles.amount}>{price}</span>
          <span className={styles.period}>{period}</span>
        </p>
        <p className={`${styles.yearly} ${yearlyStrong ? styles.yearlyStrong : ''}`}>{yearly}</p>
      </div>

      <ul className={styles.list}>
        {features.map((feature, index) => (
          <li
            key={feature}
            className={`${styles.item} ${nowrapItems.includes(index) ? styles.nowrap : ''} ${
              nowrapItemsDesktop.includes(index) ? styles.nowrapDesktop : ''
            }`}
          >
            <span className={styles.check}>
              <img src={checkDark} alt="" width="18" height="18" />
            </span>
            <span className={styles.itemText}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant="secondary" size="sm" fullWidth href={cta.href}>
        {cta.label}
      </Button>
    </article>
  )
}
