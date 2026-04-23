import { useEffect, useRef, useState } from 'react'
import { Sprout, Rocket, Plane, Globe, Heart } from 'lucide-react'

const EVENTS = [
  { year: '2023', period: 'The beginning', title: 'A Partnership Born From Nothing', desc: 'Two people, one vision, and nothing but belief. FH Technology Ltd started here -- and Pasha was there from the first step.', icon: Sprout, color: '#5a9e8a' },
  { year: 'Now', period: 'Today', title: 'Still Building. Still Going.', desc: 'The businesses, the sacrifices, the sleepless planning -- Pasha never stopped. She kept going when most people would have walked away.', icon: Rocket, color: 'var(--terracotta)' },
  { year: 'Soon', period: 'The next chapter', title: 'RwandAir -- The Uniform, The Pride', desc: 'Frank sees it clearly: Pasha in that uniform, standing tall. Starting with RwandAir -- not as a dream, but as a plan in motion.', icon: Plane, color: 'var(--gold)' },
  { year: 'Further', period: 'Even higher', title: 'Qatar Airways & Beyond', desc: "The sky is not the limit. It's just the beginning. Qatar Airways is a destination, not a fantasy -- and Pasha knows it.", icon: Globe, color: 'var(--wine)' },
  { year: 'Always', period: 'The life she deserves', title: 'Peace, Love & Everything Beautiful', desc: "A peaceful home. A deep love. A life that finally gives back what she's given to the world. This is Pasha's future -- and it's bright.", icon: Heart, color: '#c0727a' },
]

function TlItem({ event, index, isLast }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const Icon = event.icon
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', flexDirection: isLeft ? 'row-reverse' : 'row', marginBottom: '4rem', alignItems: 'flex-start' }}>
      {/* Content side */}
      <div style={{ width: 'calc(50% - 36px)', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : `translateX(${isLeft ? '-30px' : '30px'})`, transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`, textAlign: isLeft ? 'right' : 'left', padding: isLeft ? '0 2rem 0 0' : '0 0 0 2rem' }}>
        <span className="font-serif italic" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>{event.period}</span>
        <h3 className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--wine)', lineHeight: 1.4, margin: '0.25rem 0 0.5rem' }}>{event.title}</h3>
        <p className="font-serif italic" style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.75 }}>{event.desc}</p>
      </div>

      {/* Center node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '72px' }}>
        <div className="font-serif italic" style={{ fontSize: '0.82rem', color: event.color, marginBottom: '8px', textAlign: 'center' }}>{event.year}</div>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fdfaf6', border: `2px solid ${event.color}`, boxShadow: `0 0 0 6px rgba(201,124,85,0.06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0)', transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.12}s` }}>
          <Icon size={18} style={{ color: event.color }} />
        </div>
        {!isLast && <div style={{ width: '1px', minHeight: '60px', flex: 1, marginTop: '8px', background: 'linear-gradient(to bottom,rgba(201,124,85,0.3),rgba(201,124,85,0.05))' }} />}
      </div>

      {/* Spacer opposite side */}
      <div style={{ width: 'calc(50% - 36px)' }} />
    </div>
  )
}

export default function Timeline() {
  return (
    <section style={{ background: '#faf7f2', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="font-serif italic" style={{ fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>-- As Frank sees it --</p>
          <h2 className="font-script" style={{ fontSize: 'clamp(2.2rem,6vw,3.5rem)', color: 'var(--wine)' }}>Pasha's Journey</h2>
          <div className="divider" style={{ maxWidth: '120px', margin: '1rem auto 0' }} />
        </div>
        <div style={{ position: 'relative' }}>
          {EVENTS.map((ev, i) => <TlItem key={i} event={ev} index={i} isLast={i === EVENTS.length - 1} />)}
        </div>
      </div>
    </section>
  )
}
