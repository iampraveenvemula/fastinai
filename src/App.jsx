import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TrustedBy from './components/TrustedBy'
import DualTrack from './components/DualTrack'
import HowItWorks from './components/HowItWorks'
import CurriculumBento from './components/CurriculumBento'
import ConsultingSection from './components/ConsultingSection'
import Testimonials from './components/Testimonials'
import FounderSection from './components/FounderSection'
import YouTubeSection from './components/YouTubeSection'
import BottomCTA from './components/BottomCTA'
import Footer from './components/Footer'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBy />
        <DualTrack />
        <HowItWorks />
        <CurriculumBento />
        <ConsultingSection />
        <Testimonials />
        <FounderSection />
        <YouTubeSection />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  )
}
