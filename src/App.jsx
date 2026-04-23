import { useState, useEffect } from 'react'
import Gate from './components/Gate'
import Hero from './components/Hero'
import SongPlayer from './components/SongPlayer'
import Letter from './components/Letter'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Prayer from './components/Prayer'
import Confetti from './components/Confetti'

function Footer() {
  return (
    <footer className="py-8 text-center"
      style={{ background: 'var(--warm)', borderTop: '1px solid rgba(201,124,85,0.12)' }}>
      <p className="font-serif italic text-sm" style={{ color: 'var(--muted)' }}>
        Made with care, by Frank — for Pasha, always.
      </p>
      <p className="font-serif italic text-xs mt-1" style={{ color: 'var(--blush)' }}>
        FH Technology Ltd · 2025
      </p>
    </footer>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const handleEnter = () => {
    setEntered(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 8000)
  }

  const handleCelebrate = () => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 6000)
  }

  // Scroll reveal observer
  useEffect(() => {
    if (!entered) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [entered])

  if (!entered) return <Gate onEnter={handleEnter} />

  return (
    <div>
      <Confetti active={confetti} />
      <Hero onCelebrate={handleCelebrate} />
      <SongPlayer />
      <Letter />
      <Timeline />
      <Gallery />
      <Prayer />
      <Footer />
    </div>
  )
}
