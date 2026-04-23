import { useState, useEffect } from 'react'
import { Heart, Sparkles } from 'lucide-react'

export default function Gate({ onEnter }) {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const p = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 6}s`,
      size: `${10 + Math.random() * 10}px`,
    }))
    setPetals(p)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fdf8f2 0%, #f5e8d8 50%, #ede0cf 100%)' }}>

      {/* Floating petals */}
      {petals.map(p => (
        <div key={p.id} className="petal absolute top-0 pointer-events-none"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}>
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <ellipse cx="10" cy="10" rx="5" ry="9" fill="#d4956a" opacity="0.25" transform="rotate(30 10 10)" />
          </svg>
        </div>
      ))}

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,124,85,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 text-center px-6 max-w-lg fade-in">

        {/* Icon crown */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,124,85,0.1)', border: '1px solid rgba(201,124,85,0.3)' }}>
              <Heart size={32} style={{ color: 'var(--terracotta)' }} className="heartbeat" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles size={16} style={{ color: 'var(--gold)' }} />
            </div>
          </div>
        </div>

        {/* Late note */}
        <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
          A message, arriving late — but from the heart
        </p>

        {/* Name */}
        <h1 className="font-script mb-2" style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', color: 'var(--wine)', lineHeight: 1 }}>
          Pasha
        </h1>

        <p className="font-serif mb-1" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: 'var(--terracotta)', fontStyle: 'italic' }}>
          Agahozo Patience
        </p>

        <div className="divider my-6 mx-auto" style={{ maxWidth: '160px' }} />

        <p className="font-serif mb-10" style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          There's something waiting for you here —<br />
          open it when you're ready to feel it.
        </p>

        <button onClick={onEnter}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
          style={{
            background: 'var(--terracotta)', color: '#fff',
            fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.95rem',
            letterSpacing: '0.05em', boxShadow: '0 8px 32px rgba(201,124,85,0.35)'
          }}>
          <Heart size={16} className="heartbeat" />
          Open your gift
          <span className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(255,255,255,0.12)' }} />
        </button>

        <p className="mt-5 text-xs font-serif italic" style={{ color: 'var(--blush)' }}>
          — Frank
        </p>
      </div>
    </div>
  )
}
