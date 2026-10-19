import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './sections/Hero/Hero'
import Value from './sections/Value/Value'
import Reporting from './sections/Reporting/Reporting'
import Pricing from './sections/Pricing/Pricing'
import Faq from './sections/Faq/Faq'
import Cta from './sections/Cta/Cta'
import useScrollReveal from './hooks/useScrollReveal'
import { LanguageProvider } from './i18n/LanguageContext'

function Page() {
  useScrollReveal()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Value />
        <Reporting />
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
      <Page />
    </LanguageProvider>
  )
}
