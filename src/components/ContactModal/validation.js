/*
 * Field rules for the contact form. Only name, phone and email are required; industry, company and message are
 * optional. Each validator takes the trimmed value and returns true when it is acceptable.
 */
const PHONE_CHARACTERS = /^[+()\d\s.-]+$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const rules = {
  fullName: (value) => value.length >= 2,
  phone: (value) => {
    if (!PHONE_CHARACTERS.test(value)) return false
    const digits = value.replace(/\D/g, '').length
    return digits >= 8 && digits <= 15
  },
  email: (value) => EMAIL.test(value),
}

export const requiredFields = Object.keys(rules)

export const emptyValues = {
  fullName: '',
  phone: '',
  email: '',
  industry: '',
  company: '',
  message: '',
}

/** The names of the fields that fail their rule (empty object when the form is valid). */
export function validate(values) {
  const errors = {}
  for (const name of requiredFields) {
    if (!rules[name](values[name].trim())) errors[name] = true
  }
  return errors
}
