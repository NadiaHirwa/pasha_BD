import { useState } from 'react'
import { Heart, Sparkles, Wind } from 'lucide-react'

function Candle({ blown }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: '0' }}>
      {/* Flame */}
      {!blown ? (
        <div className="flame-dance" style={{ marginBottom: '-2px' }}>
          <svg width="18" height="30" viewBox="0 0 18 30">
            <defs>
              <radialGradient id="flameGrad" cx="50%" cy="70%">
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="40%" stopColor="#f5a623" />
                <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d="M9 28 C2 20, 0 14, 3 8 C5 4, 7 2, 9 0 C11 2, 13 4, 15 8 C18 14, 16 20, 9 28Z"
              fill="url(#flameGrad)" />
          </svg>
          {/* Glow */}
          <div className="absolute" style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,166,35,0.35) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)', top: '50%', left: '50%'
          }} />
        </div>
      ) : (
        <div style={{ height: '30px' }} />
      )}
      {/* Candle body */}
      <div style={{
        width: '14px', height: '52px', borderRadius: '3px',
        background: 'linear-gradient(180deg, #f5e0c8 0%, #e8c5a8 50%, #d4a882 100%)',
        border: '1px solid rgba(180,120,80,0.2)',
        boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        {/* Wax drips */}
        <div style={{
          position: 'absolute', top: '6px', right: '1px', width: '5px', height: '14px',
          borderRadius: '0 0 3px 3px', background: 'rgba(245,224,200,0.8)'
        }} />
        {/* Wick */}
        <div style={{
          position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)',
          width: '1.5px', height: '8px', background: '#2c1a0e', borderRadius: '1px'
        }} />
      </div>
    </div>
  )
}

export default function Hero({ onCelebrate }) {
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [message, setMessage] = useState('')

  const blowCandles = () => {
    if (candlesBlown) return
    setCandlesBlown(true)
    setMessage('Make a wish, Pasha...')
    setTimeout(() => {
      setMessage('Your wish is heard. May it come true.')
      onCelebrate()
    }, 1800)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'linear-gradient(170deg, #fdf8f2 0%, #f8ede0 60%, #f0e0cc 100%)' }}>

      {/* Background texture circles */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,124,85,0.06) 0%, transparent 70%)', transform: 'translateX(30%)' }} />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(122,63,46,0.05) 0%, transparent 70%)', transform: 'translateX(-30%)' }} />

      {/* Top label */}
      <div className="flex items-center gap-2 mb-8 fade-up" style={{ animationDelay: '0.1s' }}>
        <div style={{ width: '32px', height: '1px', background: 'var(--blush)' }} />
        <p className="font-serif italic text-sm" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>
          A belated celebration
        </p>
        <div style={{ width: '32px', height: '1px', background: 'var(--blush)' }} />
      </div>

      {/* Photo frame */}
      <div className="relative mb-8 float-gentle fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="relative overflow-hidden"
          style={{
            width: '160px', height: '160px', borderRadius: '50%',
            border: '3px solid var(--blush)',
            boxShadow: '0 0 0 6px rgba(232,197,168,0.2), 0 20px 60px rgba(122,63,46,0.15)'
          }}>
          {/* Photo: replace src with actual photo */}
          <img src="/pasha.jpg" alt="Pasha"
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
          <div className="absolute inset-0 items-center justify-content-center flex-col"
            style={{ display: 'none', background: 'var(--warm)', flexDirection: 'column', gap: '4px' }}>
            <Heart size={28} style={{ color: 'var(--terracotta)' }} />
            <span className="text-xs font-serif italic" style={{ color: 'var(--muted)' }}>Add photo</span>
          </div>
        </div>

        {/* Candles around frame */}
        <div className="absolute -top-6 left-1/2" style={{ transform: 'translateX(-50%)' }}>
          <div className="flex gap-3">
            {[0, 1, 2].map(i => <Candle key={i} blown={candlesBlown} />)}
          </div>
        </div>

        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ margin: '-10px', border: '1px dashed rgba(201,124,85,0.2)', borderRadius: '50%' }} />
      </div>

      {/* Name */}
      <div className="text-center fade-up" style={{ animationDelay: '0.3s' }}>
        <p className="font-serif italic mb-1" style={{ color: 'var(--muted)', fontSize: '1rem', letterSpacing: '0.05em' }}>
          Happy Birthday to
        </p>
        <h1 className="font-script gold-shimmer" style={{ fontSize: 'clamp(4.5rem, 14vw, 8rem)', lineHeight: 1 }}>
          Pasha
        </h1>
        <p className="font-serif mt-1" style={{ color: 'var(--terracotta)', fontSize: '1.1rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
          Agahozo Patience
        </p>
      </div>

      {/* Divider with heart */}
      <div className="flex items-center gap-4 my-7 fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="divider" style={{ width: '80px' }} />
        <Heart size={14} className="heartbeat" style={{ color: 'var(--blush)' }} />
        <div className="divider" style={{ width: '80px' }} />
      </div>

      {/* Subtitle quote */}
      <p className="font-serif italic text-center max-w-sm fade-up" style={{ animationDelay: '0.5s', color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        "You are not someone to be celebrated in a rush — you are someone to be felt, remembered, and honored deeply."
      </p>

      {/* Blow candles CTA */}
      <div className="mt-10 text-center fade-up" style={{ animationDelay: '0.6s' }}>
        {!candlesBlown ? (
          <button onClick={blowCandles}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-serif italic transition-all duration-300"
            style={{
              border: '1px solid var(--terracotta)', color: 'var(--terracotta)', background: 'transparent',
              fontSize: '1rem'
            }}>
            <Wind size={16} />
            Blow the candles
          </button>
        ) : (
          <p className="font-serif italic fade-in" style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>
            {message}
          </p>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-up" style={{ animationDelay: '1s' }}>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-serif italic" style={{ color: 'var(--blush)', letterSpacing: '0.1em' }}>scroll down</p>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--blush), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
