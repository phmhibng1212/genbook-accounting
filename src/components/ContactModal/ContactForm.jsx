import { useEffect, useId, useRef, useState } from 'react'
import Button from '../Button/Button'
import { submitContact } from '../../data/contact'
import { emptyValues, requiredFields, validate } from './validation'
import styles from './ContactModal.module.css'

/** One text field. The design shows placeholders only, so the label is kept for screen readers. */
function Field({ id, name, label, requiredLabel, error, errorText, multiline = false, ...inputProps }) {
  const Control = multiline ? 'textarea' : 'input'
  const required = requiredFields.includes(name)

  return (
    <div className={styles.field}>
      <label className="sr-only" htmlFor={id}>
        {label}
        {required ? ` (${requiredLabel})` : ''}
      </label>
      <Control
        className={`${multiline ? styles.textarea : styles.input} ${error ? styles.invalid : ''}`}
        id={id}
        name={name}
        placeholder={label}
        aria-required={required || undefined}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p className={styles.error} id={`${id}-error`}>
          {errorText}
        </p>
      )}
    </div>
  )
}

/**
 * Title + fields + submit button, then a thank-you view once the request went through.
 * Interface and validation only: sending goes through `submitContact` (data/contact.js).
 */
export default function ContactForm({ copy, titleId, onClose }) {
  const formId = useId()
  const [values, setValues] = useState(emptyValues)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | failed | sent
  const doneRef = useRef(null)

  const errors = validate(values)
  const showError = (name) => Boolean(touched[name] && errors[name])
  const fieldId = (name) => `${formId}-${name}`

  // the thank-you view takes focus, so a screen reader announces it
  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus()
  }, [status])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (status === 'failed') setStatus('idle')
  }

  const handleBlur = (event) => {
    const { name } = event.target
    // a required field that is left empty is reported when the person moves on; a filled one is checked as typed
    setTouched((current) => ({ ...current, [name]: true }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const invalid = requiredFields.filter((name) => errors[name])
    if (invalid.length) {
      setTouched((current) => ({ ...current, ...Object.fromEntries(requiredFields.map((name) => [name, true])) }))
      document.getElementById(fieldId(invalid[0]))?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitContact(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()])))
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.done} role="status">
        <h2 className={`${styles.title} gradient-block`} id={titleId} ref={doneRef} tabIndex={-1}>
          {copy.success.title}
        </h2>
        <p className={styles.doneText}>{copy.success.text}</p>
        <Button className={styles.submit} variant="primary" size="lg" onClick={onClose}>
          {copy.success.close}
        </Button>
      </div>
    )
  }

  const submitting = status === 'submitting'
  const fieldProps = (name, extra = {}) => ({
    id: fieldId(name),
    name,
    label: copy.fields[name],
    requiredLabel: copy.a11y.required,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: showError(name),
    errorText: copy.errors[name],
    ...extra,
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={`${styles.title} gradient-block`} id={titleId}>
        <span className="solid">{copy.titleLines[0]}</span> <br className={styles.titleBreak} />
        {copy.titleLines[1]}
      </h2>

      <div className={styles.fields}>
        <Field {...fieldProps('fullName', { autoComplete: 'name', maxLength: 100 })} />
        <Field {...fieldProps('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', maxLength: 30 })} />
        <Field
          {...fieldProps('email', {
            type: 'email',
            inputMode: 'email',
            autoComplete: 'email',
            autoCapitalize: 'none',
            spellCheck: false,
            maxLength: 120,
          })}
        />
        <Field {...fieldProps('industry', { autoComplete: 'off', maxLength: 100 })} />
        <Field {...fieldProps('company', { autoComplete: 'organization', maxLength: 120 })} />
        <Field {...fieldProps('message', { multiline: true, rows: 3, maxLength: 2000 })} />
      </div>

      {status === 'failed' && (
        <p className={styles.failure} role="alert">
          {copy.failure}
        </p>
      )}

      <Button className={styles.submit} variant="primary" size="lg" type="submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? copy.submitting : copy.submit}
      </Button>
    </form>
  )
}
