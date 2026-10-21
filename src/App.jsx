import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './sections/Hero/Hero'
import Steps from './sections/Steps/Steps'
import Features from './sections/Features/Features'
import Pricing from './sections/Pricing/Pricing'
import Faq from './sections/Faq/Faq'
import Cta from './sections/Cta/Cta'
import useScrollReveal from './hooks/useScrollReveal'
import { ContactModalProvider } from './components/ContactModal/ContactModalContext'
import { LanguageProvider } from './i18n/LanguageContext'

function Page() {
  useScrollReveal()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Steps />
        <Features />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ContactModalProvider>
        <Page />
      </ContactModalProvider>
    </LanguageProvider>
  )
}
