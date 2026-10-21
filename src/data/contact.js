/*
 * Sends the "Schedule a demo" form to the Google Apps Script web app in scripts/google-sheets/Code.gs, which appends
 * one row to the Google Sheet (see README → "Contact form → Google Sheet").
 *
 * The endpoint comes from `VITE_CONTACT_ENDPOINT` (the web app's /exec URL). While it is not set the request is
 * only simulated (resolves after a short delay, nothing is sent) so the page still works in development.
 *
 * Contract with the modal: resolve when the request was accepted, throw when it was not.
 * `values` = { fullName, phone, email, industry, company, message }, every value already trimmed.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

export async function submitContact(values) {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return
  }

  const payload = { ...values, language: document.documentElement.lang || 'en', page: window.location.href }
  // text/plain keeps this a "simple" request: Apps Script web apps do not answer CORS preflights
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Contact request failed (${response.status})`)
  const result = await response.json()
  if (!result.ok) throw new Error(result.error || 'Contact request rejected')
}
