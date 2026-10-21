/*
 * Sends the "Schedule a demo" form.
 *
 * NOT CONNECTED YET: the page has the form's interface and validation only, so this resolves after a short delay
 * without sending anything. Replace the body with the real request (an API endpoint, a form service, …) and keep
 * the contract: resolve when the request was accepted, reject (throw) when it was not — the modal shows its
 * success or failure message from that.
 *
 * `values` = { fullName, phone, email, industry, company, message }, every value already trimmed.
 */
export async function submitContact(values) {
  void values
  await new Promise((resolve) => setTimeout(resolve, 700))
}
