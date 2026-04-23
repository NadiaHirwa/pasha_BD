import { useState, useEffect, useRef } from 'react'
import { Lock, Unlock, Heart, Feather } from 'lucide-react'

const PARAS = [
  { type: 'salutation', text: 'Pasha... Agahozo Patience,' },
  { type: 'body', text: 'I may be late. I know. But I want you to understand something -- some words are too important to rush. Some words need to sit with you quietly, not just pass through. And everything I want to say to you today? It deserves to be felt, not just read.' },
  { type: 'body', text: 'Since 2023, we started building from nothing. No safety net. No guarantees. Just belief -- and you. And from the very beginning, you were never just a business partner to me. You became something much more than that. You became strength on the days when I felt the weight of everything. You became light when the path ahead looked uncertain. You became the kind of person I could call a sister without hesitating.' },
  { type: 'body', text: "I've watched you, Pasha. I've watched you carry dreams that are bigger than most people's entire lives. I've heard you speak life into yourself -- saying 'Never give up, Pasha' -- not as a motivational quote, but as a promise you made to yourself. And you kept it. Every single time." },
  { type: 'body', text: "You stood for yourself when the world didn't. You supported your family when you were still figuring your own path out. You built things, you sacrificed things, and somehow -- through all of it -- you never let go of your faith in God. That's not something everyone can do. That takes a rare kind of soul." },
  { type: 'break' },
  { type: 'body', text: "Pasha, your journey is just beginning. And I mean that not as a comfort -- I mean it as a fact. I see where you're going. I see you in that uniform, standing tall with RwandAir. And then one day, I see you taking that even further -- Qatar Airways. Not because someone handed it to you, but because you earned every step." },
  { type: 'body', text: "And beyond the skies? I see something even more beautiful. I see you at peace. I see you loved the way you deserve to be loved. A home that feels like rest. A marriage full of joy. A life that finally gives back everything you've poured out for others. That picture is real, Pasha -- it's coming." },
  { type: 'body', text: "I'm genuinely happy to see you loved now. Because someone like you -- someone who has given so much, who has fought so hard, who has believed when it was difficult -- you deserve real happiness. Not the temporary kind. The deep, settled, thank-God-for-this kind." },
  { type: 'body', text: "Keep choosing joy. Keep choosing yourself. Thank you for being part of FH Technology Ltd -- for believing in something when we were still figuring out what it was going to become. Thank you for standing beside me when it mattered most." },
  { type: 'prayer', text: "Happy belated birthday, Pasha. This is not just a wish. This is a prayer:\n\nMay God guide every step you take.\nMay He protect your heart from what it doesn't need to carry.\nMay He bless everything your hands touch.\nAnd may He lead you -- gently and certainly -- exactly to where your dreams are waiting." },
  { type: 'mantra', text: 'Never give up, Pasha.' },
  { type: 'signature', text: '-- Frank' },
]

function Envelope({ onOpen }) {
  const [hover, setHover] = useState(false)
  const [opening, setOpening] = useState(false)
  const handleOpen = () => { setOpening(true); setTimeout(onOpen, 700) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1rem' }}>
      <div style={{ marginBottom: '1.5rem', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,124,85,0.08)', border: '1px solid rgba(201,124,85,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Feather size={24} style={{ color: 'var(--terracotta)' }} />
      </div>
      <h2 className="font-script" style={{ fontSize: 'clamp(2.2rem,6vw,3.5rem)', color: 'var(--wine)', textAlign: 'center', marginBottom: '0.5rem' }}>
        A letter, from Frank
      </h2>
      <p className="font-serif italic" style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, textAlign: 'center', maxWidth: '300px', marginBottom: '2.5rem' }}>
        He wrote this for you. It took courage. Take your time reading it.
      </p>

      <button onClick={handleOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.3s', transform: hover ? 'translateY(-6px)' : 'translateY(0)' }}>
        <div style={{ width: '280px', height: '190px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', background: 'linear-gradient(160deg,#fdf5eb,#f5e4cc)', border: '1.5px solid rgba(201,124,85,0.25)', boxShadow: '0 12px 40px rgba(122,63,46,0.12)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '95px', overflow: 'hidden', borderRadius: '12px 12px 0 0', transformOrigin: 'top center', transform: opening ? 'rotateX(-160deg)' : 'rotateX(0deg)', transition: 'transform 0.6s ease', zIndex: 2 }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#f8ead6,#edcfaa)', clipPath: 'polygon(0 0,100% 0,50% 100%)' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '12px', opacity: 0.12 }}>
            <div style={{ position: 'absolute', top: '80px', left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(201,124,85,0.4) 8px,rgba(201,124,85,0.4) 9px)' }} />
          </div>
          <div style={{ position: 'absolute', width: '52px', height: '52px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%,var(--terracotta),var(--wine))', border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 8px rgba(122,63,46,0.3)', top: '50%', left: '50%', transform: 'translate(-50%,-20%)', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} fill="#fff" style={{ color: '#fff' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}>
            {hover || opening ? <Unlock size={12} style={{ color: 'var(--muted)' }} /> : <Lock size={12} style={{ color: 'var(--muted)' }} />}
            <span className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              {opening ? 'Opening...' : 'Click to open'}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}

// ── THE FIX: We track (paraIndex, charCount) as plain numbers.
// We render ALL paragraphs 0..paraIndex. For the active one, we show text.slice(0, charCount).
// This means each paragraph renders exactly ONCE -- no duplicates ever.
function LetterContent() {
  const [paraIndex, setParaIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (done) return

    // If we've passed all paragraphs, we're done
    if (paraIndex >= PARAS.length) { setDone(true); return }

    const para = PARAS[paraIndex]

    // Breaks: no text, just advance
    if (para.type === 'break') {
      timerRef.current = setTimeout(() => {
        setParaIndex(i => i + 1)
        setCharCount(0)
      }, 200)
      return () => clearTimeout(timerRef.current)
    }

    const fullLen = para.text.length

    if (charCount < fullLen) {
      // Speed tuning per paragraph type
      const speed = para.type === 'mantra' ? 55 : para.type === 'signature' ? 45 : 12
      timerRef.current = setTimeout(() => {
        setCharCount(c => Math.min(c + 2, fullLen))
      }, speed)
    } else {
      // Finished this paragraph -- pause then move on
      const pause = para.type === 'salutation' ? 500 : para.type === 'prayer' ? 700 : 380
      timerRef.current = setTimeout(() => {
        if (paraIndex + 1 >= PARAS.length) {
          setDone(true)
        } else {
          setParaIndex(i => i + 1)
          setCharCount(0)
        }
      }, pause)
    }

    return () => clearTimeout(timerRef.current)
  }, [paraIndex, charCount, done])

  // Scroll bottom into view as text grows
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [charCount, paraIndex])

  const skipAll = () => {
    clearTimeout(timerRef.current)
    setDone(true)
    setParaIndex(PARAS.length)
  }

  const renderPara = (para, idx) => {
    // Only render paragraphs up to and including current
    if (idx > paraIndex && !done) return null

    // For the active paragraph, show only charCount chars; completed ones show full text
    const isActive = idx === paraIndex && !done
    const text = isActive ? para.text.slice(0, charCount) : para.text
    const showCursor = isActive && charCount < para.text.length

    const cursor = showCursor ? <span className="cursor-blink" style={{ color: 'var(--terracotta)' }}>|</span> : null

    if (para.type === 'break') return <div key={idx} style={{ height: '20px' }} />

    if (para.type === 'salutation') return (
      <p key={idx} style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.25rem', color: 'var(--wine)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        {text}{cursor}
      </p>
    )

    if (para.type === 'prayer') {
      const lines = text.split('\n')
      return (
        <div key={idx} style={{ margin: '2rem 0', paddingLeft: '1.25rem', borderLeft: '2px solid var(--blush)' }}>
          {lines.map((line, li) => (
            <p key={li} style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, color: 'var(--wine)', fontSize: '1.05rem', lineHeight: 2 }}>
              {line || '\u00A0'}
              {showCursor && li === lines.length - 1 ? cursor : null}
            </p>
          ))}
        </div>
      )
    }

    if (para.type === 'mantra') return (
      <p key={idx} style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 400, fontSize: '1.45rem', color: 'var(--terracotta)', textAlign: 'center', margin: '2rem 0' }}>
        "{text}"{cursor}
      </p>
    )

    if (para.type === 'signature') return (
      <div key={idx} style={{ textAlign: 'right', marginTop: '2.5rem' }}>
        <p className="font-script" style={{ fontSize: '2.4rem', color: 'var(--wine)' }}>
          {text}
        </p>
      </div>
    )

    // body
    return (
      <p key={idx} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: '1.95rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>
        {text}{cursor}
      </p>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) 1.5rem' }}>
      <div style={{ background: '#fdfaf6', border: '1px solid rgba(201,124,85,0.15)', borderRadius: '6px', boxShadow: '0 20px 80px rgba(122,63,46,0.10)' }}>
        <div style={{ height: '4px', background: 'linear-gradient(90deg,transparent,rgba(201,124,85,0.18),transparent)', borderRadius: '6px 6px 0 0' }} />

        <div className="letter-paper" style={{ padding: 'clamp(1.75rem,5vw,3.5rem)' }}>
          {/* Letterhead */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '8px' }}>
            <p className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>A personal letter</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Heart size={10} className="heartbeat" style={{ color: 'var(--blush)' }} />
              <p className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>From Frank, with love</p>
            </div>
          </div>
          <div className="divider" style={{ marginBottom: '2rem' }} />

          {/* The letter itself */}
          <div style={{ minHeight: '280px' }}>
            {PARAS.map((para, i) => renderPara(para, i))}
            <div ref={bottomRef} />
          </div>

          {/* Controls */}
          {!done && paraIndex > 0 && (
            <button onClick={skipAll} style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: 'var(--blush)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>
              Read all at once
            </button>
          )}

          {done && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '50px', background: 'rgba(201,124,85,0.08)', border: '1px solid rgba(201,124,85,0.2)' }}>
                <Heart size={13} className="heartbeat" style={{ color: 'var(--terracotta)' }} />
                <span className="font-serif italic" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>The letter is yours now, Pasha.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Letter() {
  const [opened, setOpened] = useState(false)
  return (
    <section id="letter" style={{ background: 'linear-gradient(180deg,#fdf5eb 0%,#faf7f2 100%)', paddingBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%' }}>
        {!opened ? <Envelope onOpen={() => setOpened(true)} /> : <LetterContent />}
      </div>
    </section>
  )
}
