import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MasterClass from './components/MasterClass'
import HiringSupport from './components/HiringSupport'
import Accelerator from './components/Accelerator'
import Blog from './components/Blog'
import Footer from './components/Footer'
import FASTReveal from './components/AnimatedLogo'

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
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div className="container" style={{ paddingTop: '80px', marginBottom: '20px', textAlign: 'center', minHeight: '220px' }}>
        <FASTReveal />
      </div>
      <main>
        <HeroSection />
        <MasterClass />
        <Accelerator />
        <HiringSupport />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}
