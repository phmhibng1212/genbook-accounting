import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import ContactModal from './ContactModal'

const ContactModalContext = createContext({ openContact: () => {} })

/** Owns the "Schedule a demo" pop-up; any button can open it with `useContactModal().openContact`. */
export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const returnFocusRef = useRef(null)

  const openContact = useCallback((event) => {
    // focus goes back to whatever opened the modal
    returnFocusRef.current = event?.currentTarget ?? document.activeElement
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ openContact }), [openContact])

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={open} onClose={close} returnFocusRef={returnFocusRef} />
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  return useContext(ContactModalContext)
}
