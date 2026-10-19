/*
 * Destinations shared by several buttons.
 *
 * `signIn`   every "Start free trial" / "Dùng thử miễn phí" button (header, menu, Hero, plans, CTA).
 * `facebook` / `linkedin`  the footer's two social icons, in a new tab.
 * `contact`  every "Contact us" / "Talk to us" / "Liên hệ" button and the support address in the copy:
 *            opens a new Gmail compose window addressed to the support inbox.
 */
export const SUPPORT_EMAIL = 'support@genbook.io'

export const links = {
  signIn: 'https://mac.genbook.io/vi/sign-in',
  facebook: 'https://www.facebook.com/profile.php?id=61588025945618',
  linkedin: 'https://www.linkedin.com/company/genbooks/home/',
  contact: `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}`,
}
