import { useEffect, useRef, useState } from 'react'
import { Heart, Star, Navigation, Cross } from 'lucide-react'

const BLESSINGS = [
  { icon: Navigation, title: 'May He guide every step', text: "Not just the big decisions -- but the quiet, ordinary days too. May she always know which way to go." },
  { icon: Heart, title: 'May He protect her heart', text: "From carrying weight that isn't hers. From people who don't see her worth. From anything that dims her light." },
  { icon: Star, title: 'May He bless her hustle', text: "Every late night, every plan, every risk taken in faith -- may none of it go unseen or unrewarded." },
  { icon: Cross, title: 'May He lead her to her dreams', text: "Gently. Surely. Exactly where she's supposed to be -- in the skies, in love, and at peace." },
]

function BlessingCard({ blessing, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const Icon = blessing.icon
  return (
    <div ref={ref} style={{ background: '#fdfaf6', border: '1px solid rgba(201,124,85,0.15)', borderRadius: '16px', padding: '1.75rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(201,124,85,0.08)', border: '1px solid rgba(201,124,85,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
          <Icon size={18} style={{ color: 'var(--terracotta)' }} />
        </div>
        <div>
          <h3 className="font-serif" style={{ color: 'var(--wine)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>{blessing.title}</h3>
          <p className="font-serif italic" style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{blessing.text}</p>
        </div>
      </div>
    </div>
  )
}

export default function Prayer() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: 'linear-gradient(180deg,#faf7f2 0%,#f5ede0 100%)', padding: '5rem 1.5rem 7rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
          <p className="font-serif italic" style={{ fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>-- not just a wish, but a prayer --</p>
          <h2 className="font-script" style={{ fontSize: 'clamp(2.2rem,6vw,3.5rem)', color: 'var(--wine)' }}>For Pasha</h2>
          <div className="divider" style={{ maxWidth: '120px', margin: '1rem auto 0' }} />
        </div>

        {/* Prayer quote */}
        <p className="font-serif italic" style={{ color: 'var(--terracotta)', fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center', maxWidth: '520px', margin: '0 auto 3rem' }}>
          "May God guide every step you take, protect your heart, bless your hustle, and lead you exactly where your dreams are waiting."
        </p>

        {/* Blessing cards -- 2-column grid on desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
          {BLESSINGS.map((b, i) => <BlessingCard key={i} blessing={b} index={i} />)}
        </div>

        {/* Mantra */}
        <div style={{ textAlign: 'center', padding: '2.5rem 0', borderTop: '1px solid rgba(201,124,85,0.15)', borderBottom: '1px solid rgba(201,124,85,0.15)', marginBottom: '2.5rem' }}>
          <p className="font-serif italic" style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>And always remember --</p>
          <p className="font-script gold-shimmer" style={{ fontSize: 'clamp(2.5rem,8vw,4rem)' }}>Never give up, Pasha.</p>
        </div>

        {/* Signature */}
        <div style={{ textAlign: 'center' }}>
          <p className="font-serif italic" style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Written with love, and meant from the heart --</p>
          <p className="font-script" style={{ fontSize: '2.5rem', color: 'var(--wine)' }}>Frank</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Heart size={16} className="heartbeat" style={{ color: 'var(--terracotta)' }} />
          </div>
        </div>

      </div>
    </section>
  )
}
