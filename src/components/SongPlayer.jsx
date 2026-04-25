import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Music, Volume2 } from 'lucide-react'

// Audio file lives in /public/audio/ — no Vite import needed for public folder files
const SONG_SRC = '/audio/pasha_bithday_song.mpeg'

const LYRICS = [
  'Happy birthday to you,',
  'Happy birthday to you,',
  'Happy birthday dear Pasha,',
  'Happy birthday to you.',
]

export default function SongPlayer() {
  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lyricIdx, setLyricIdx] = useState(-1)

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const startTracking = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const audio = audioRef.current
      if (!audio) return
      const el = audio.currentTime
      const dur = audio.duration || 1
      setElapsed(el)
      setProgress((el / dur) * 100)

      const part = dur / 4
      if (el < part)          setLyricIdx(0)
      else if (el < part * 2) setLyricIdx(1)
      else if (el < part * 3) setLyricIdx(2)
      else                    setLyricIdx(3)

      if (audio.ended) {
        clearInterval(intervalRef.current)
        setPlaying(false)
        setProgress(0)
        setElapsed(0)
        setLyricIdx(-1)
      }
    }, 80)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      clearInterval(intervalRef.current)
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
      setLyricIdx(0)
      startTracking()
    }
  }, [playing, startTracking])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const fmtTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <section style={{ background: 'linear-gradient(180deg,#faf7f2 0%,#f5ede0 100%)', padding: '5rem 1.5rem' }}>

      <audio
        ref={audioRef}
        src={SONG_SRC}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

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

        <div style={{
          maxWidth: '540px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden',
          background: '#fdfaf6', border: '1px solid rgba(201,124,85,0.18)',
          boxShadow: '0 16px 60px rgba(122,63,46,0.10)',
        }}>

          <div style={{ padding: '1.75rem 2rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(201,124,85,0.1)', border: '1px solid rgba(201,124,85,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Volume2 size={20} style={{ color: 'var(--terracotta)' }} />
              </div>
              <div>
                <p className="font-serif" style={{ color: 'var(--wine)', fontSize: '1.05rem', fontWeight: 600 }}>Happy Birthday, Pasha</p>
                <p className="font-serif italic" style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '2px' }}>A melody from Frank — with all his heart</p>
              </div>
            </div>

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

            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ height: '2px', background: 'rgba(201,124,85,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{fmtTime(elapsed)}</span>
                <span className="font-serif italic" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{fmtTime(duration)}</span>
              </div>
            </div>
          </div>

          {playing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', height: '32px', padding: '0 2rem' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="music-bar" style={{ animationDelay: `${i * 0.055}s`, animationDuration: `${0.4 + (i % 5) * 0.1}s` }} />
              ))}
            </div>
          )}

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