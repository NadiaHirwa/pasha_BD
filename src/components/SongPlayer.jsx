import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Music, Volume2 } from 'lucide-react'

const NOTES = [
  { n: 'C4', d: 0.4 }, { n: 'C4', d: 0.2 }, { n: 'D4', d: 0.6 },
  { n: 'C4', d: 0.6 }, { n: 'F4', d: 0.6 }, { n: 'E4', d: 1.0 },
  { n: 'C4', d: 0.4 }, { n: 'C4', d: 0.2 }, { n: 'D4', d: 0.6 },
  { n: 'C4', d: 0.6 }, { n: 'G4', d: 0.6 }, { n: 'F4', d: 1.0 },
  { n: 'C4', d: 0.4 }, { n: 'C4', d: 0.2 }, { n: 'C5', d: 0.6 },
  { n: 'A4', d: 0.6 }, { n: 'F4', d: 0.6 }, { n: 'E4', d: 0.4 },
  { n: 'D4', d: 0.6 }, { n: 'A#4', d: 0.4 }, { n: 'A#4', d: 0.2 },
  { n: 'A4', d: 0.6 }, { n: 'F4', d: 0.6 }, { n: 'G4', d: 0.6 },
  { n: 'F4', d: 1.4 },
]
const FREQ = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, 'A#4': 466.16, C5: 523.25 }
const TOTAL = NOTES.reduce((a, n) => a + n.d, 0)
const LYRICS = ['Happy birthday to you,', 'Happy birthday to you,', 'Happy birthday dear Pasha,', 'Happy birthday to you.']

export default function SongPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [lyricIdx, setLyricIdx] = useState(-1)
  const ctxRef = useRef(null)
  const startRef = useRef(0)
  const intervalRef = useRef(null)

  const stop = useCallback(() => {
    if (ctxRef.current) { try { ctxRef.current.close() } catch (_) {} ctxRef.current = null }
    clearInterval(intervalRef.current)
    setPlaying(false); setProgress(0); setElapsed(0); setLyricIdx(-1)
  }, [])

  const play = useCallback(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ctxRef.current = ctx
    const masterGain = ctx.createGain(); masterGain.gain.value = 0.45; masterGain.connect(ctx.destination)
    let t = ctx.currentTime + 0.05
    NOTES.forEach(({ n, d }) => {
      const osc = ctx.createOscillator(); const g = ctx.createGain()
      const osc2 = ctx.createOscillator(); const g2 = ctx.createGain()
      osc.connect(g); g.connect(masterGain)
      osc2.connect(g2); g2.connect(masterGain)
      osc.frequency.value = FREQ[n] || 440; osc2.frequency.value = (FREQ[n] || 440) * 1.25
      osc.type = 'triangle'; osc2.type = 'sine'
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.55, t + 0.04); g.gain.exponentialRampToValueAtTime(0.001, t + d - 0.04)
      g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(0.15, t + 0.04); g2.gain.exponentialRampToValueAtTime(0.001, t + d - 0.04)
      osc.start(t); osc.stop(t + d); osc2.start(t); osc2.stop(t + d); t += d
    })
    startRef.current = ctx.currentTime
    setPlaying(true); setLyricIdx(0)
    const lyricTimes = [0, TOTAL * 0.26, TOTAL * 0.51, TOTAL * 0.75]
    intervalRef.current = setInterval(() => {
      if (!ctxRef.current) return
      const el = ctxRef.current.currentTime - startRef.current
      setElapsed(el); setProgress(Math.min((el / TOTAL) * 100, 100))
      lyricTimes.forEach((lt, i) => { if (el >= lt) setLyricIdx(i) })
      if (el >= TOTAL) stop()
    }, 80)
  }, [stop])

  useEffect(() => () => stop(), [stop])
  const toggle = () => { if (playing) stop(); else play() }

  return (
    <section style={{ background: 'linear-gradient(180deg,#faf7f2 0%,#f5ede0 100%)', padding: '5rem 1.5rem' }}>
      {/* Full-width centered container */}
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div className="divider" style={{ width: '48px' }} />
            <Music size={16} style={{ color: 'var(--terracotta)' }} />
            <div className="divider" style={{ width: '48px' }} />
          </div>
          <h2 className="font-script" style={{ fontSize: 'clamp(2rem,6vw,3rem)', color: 'var(--wine)' }}>
            Her Birthday Song
          </h2>
          <p className="font-serif italic" style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Press play and let it fill the room
          </p>
        </div>

        {/* Player card -- centered, reasonable max width */}
        <div style={{ maxWidth: '540px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', background: '#fdfaf6', border: '1px solid rgba(201,124,85,0.18)', boxShadow: '0 16px 60px rgba(122,63,46,0.10)' }}>

          <div style={{ padding: '1.75rem 2rem 0' }}>
            {/* Track info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(201,124,85,0.1)', border: '1px solid rgba(201,124,85,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Volume2 size={20} style={{ color: 'var(--terracotta)' }} />
              </div>
              <div>
                <p className="font-serif" style={{ color: 'var(--wine)', fontSize: '1.05rem', fontWeight: 600 }}>Happy Birthday, Pasha</p>
                <p className="font-serif italic" style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '2px' }}>A melody from Frank -- with all his heart</p>
              </div>
            </div>

            {/* Lyrics */}
            <div style={{ minHeight: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(201,124,85,0.05)', border: '1px solid rgba(201,124,85,0.1)' }}>
              {lyricIdx >= 0 ? (
                <p className="font-script" style={{ fontSize: '1.5rem', color: 'var(--terracotta)', textAlign: 'center' }}>
                  {LYRICS[Math.min(lyricIdx, LYRICS.length - 1)]}
                </p>
              ) : (
                <p className="font-serif italic" style={{ fontSize: '0.85rem', color: 'var(--blush)', textAlign: 'center' }}>
                  Lyrics will appear when you play
                </p>
              )}
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ height: '2px', background: 'rgba(201,124,85,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{Math.floor(elapsed)}s</span>
                <span className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{Math.floor(TOTAL)}s</span>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          {playing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', height: '32px', padding: '0 2rem 0' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="music-bar" style={{ animationDelay: `${i * 0.055}s`, animationDuration: `${0.4 + Math.random() * 0.5}s` }} />
              ))}
            </div>
          )}

          {/* Button */}
          <div style={{ padding: playing ? '0.75rem 2rem 1.75rem' : '1rem 2rem 1.75rem' }}>
            <button onClick={toggle} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '0.85rem', borderRadius: '12px', cursor: 'pointer',
              background: playing ? 'rgba(201,124,85,0.08)' : 'linear-gradient(135deg,var(--terracotta) 0%,var(--wine) 100%)',
              color: playing ? 'var(--terracotta)' : '#fff',
              border: playing ? '1px solid rgba(201,124,85,0.3)' : 'none',
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '1rem',
              boxShadow: playing ? 'none' : '0 8px 24px rgba(201,124,85,0.3)',
              transition: 'all 0.2s',
            }}>
              {playing ? <Pause size={18} /> : <Play size={18} />}
              {playing ? 'Pause the song' : 'Play for Pasha'}
            </button>
          </div>
        </div>

        <p className="font-serif italic" style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--blush)' }}>
          "A melody is a memory you can hear."
        </p>
      </div>
    </section>
  )
}
