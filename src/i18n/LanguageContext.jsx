import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as english from '../data/content'
import vietnamese from '../data/content.vi'
import merge from './merge'

const STORAGE_KEY = 'genbook-language'
const SUPPORTED = ['en', 'vi']

const catalogue = {
  en: { ...english },
  vi: merge({ ...english }, vietnamese),
}

/**
 * First visit: the browser's language (Vietnamese -> vi, anything else -> en).
 * After the visitor picks a language it is remembered.
 */
function initialLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(saved)) return saved
  } catch {
    // storage unavailable (private mode / blocked): fall through to the browser language
  }
  const preferred = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase()
  return preferred.startsWith('vi') ? 'vi' : 'en'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      content: catalogue[language],
      setLanguage: (next) => {
        if (!SUPPORTED.includes(next)) return false
        setLanguageState(next)
        try {
          window.localStorage.setItem(STORAGE_KEY, next)
          return true
        } catch {
          // remembering is a convenience; ignore failures
          return false
        }
      },
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** `{ language: 'en' | 'vi', setLanguage, content }` — `setLanguage` returns whether the choice was remembered */
export function useLanguage() {
  return useContext(LanguageContext)
}

export function useContent() {
  return useContext(LanguageContext).content
}
