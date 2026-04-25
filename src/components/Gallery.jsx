import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
// import begun2023 from '../assets';

// Import images from src/assets if you want to use them in the PHOTOS array
import begun2023 from '../assets/begun_2023.jpeg';
import buildFH2023 from '../assets/build_FH 2023.jpeg';
import alwaysMovingForward from '../assets/always_moving_forward.jpeg';
import courageNeverWavers from '../assets/Courage_that_never_wavers.jpeg';
import faithStrength from '../assets/Faith_strength.jpeg';
import lifeGettingBrighter from '../assets/life_getting_brighter_2026.jpeg';

// PHOTO CONFIGURATION
// Replace the src values with actual image paths (e.g. '/photos/pasha1.jpg')
// Put image files in the /public/photos/ folder
const PHOTOS = [
  { src: begun2023, caption: 'Where it all began — 2023', date: '2023' },
  { src: buildFH2023, caption: 'Building FH Technology together', date: '2023' },
  { src: alwaysMovingForward, caption: 'Always moving forward', date: '2024' },
  { src: courageNeverWavers, caption: 'The courage that never wavers', date: '2024' },
  { src: faithStrength, caption: 'Faith, strength, and a beautiful soul', date: '2024' },
  { src: lifeGettingBrighter, caption: 'A life that keeps getting brighter', date: '2025' },
]

function PhotoCard({ photo, index, onClick }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} onClick={() => onClick(index)}
      className="cursor-pointer group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}>
      <div className="relative overflow-hidden rounded-2xl"
        style={{
          aspectRatio: index % 3 === 1 ? '4/5' : '3/4',
          background: 'var(--warm)',
          border: '1px solid rgba(201,124,85,0.12)',
          boxShadow: '0 4px 20px rgba(122,63,46,0.07)',
        }}>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-end p-4"
          style={{ background: 'linear-gradient(to top, rgba(122,63,46,0.7) 0%, transparent 60%)' }}>
          <p className="font-serif italic text-sm text-white">{photo.caption}</p>
        </div>

        {/* Image */}
        {!error ? (
          <img src={photo.src} alt={photo.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)} />
        ) : null}

        {/* Placeholder */}
        {(!loaded || error) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, var(--warm) 0%, var(--blush) 100%)' }}>
            <Camera size={24} style={{ color: 'var(--terracotta)', opacity: 0.5 }} />
            <p className="font-serif italic text-xs text-center px-4" style={{ color: 'var(--muted)' }}>
              {photo.caption}
            </p>
            <p className="text-xs" style={{ color: 'var(--blush)' }}>Replace with photo</p>
          </div>
        )}

        {/* Date tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-0.5 rounded-full font-serif italic text-xs"
            style={{ background: 'rgba(253,250,246,0.85)', color: 'var(--muted)', backdropFilter: 'blur(4px)' }}>
            {photo.date}
          </span>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index]
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
      setError(false);
    }, 0);
  }, [index])

  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(28,20,16,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>

      <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl"
          style={{ background: 'var(--warm)', minHeight: '300px', maxHeight: '70vh' }}>
          {!error ? (
            <img src={photo.src} alt={photo.caption}
              className="w-full object-cover" style={{ maxHeight: '70vh', display: loaded ? 'block' : 'none' }}
              onLoad={() => setLoaded(true)} onError={() => setError(true)} />
          ) : null}
          {(!loaded || error) && (
            <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
              <div className="text-center">
                <Camera size={32} style={{ color: 'var(--blush)', opacity: 0.5, margin: '0 auto 8px' }} />
                <p className="font-serif italic text-sm" style={{ color: 'var(--blush)' }}>{photo.caption}</p>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between mt-3 px-1">
          <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{photo.caption}</p>
          <span className="font-serif italic text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {index + 1} / {photos.length}
          </span>
        </div>

        {/* Controls */}
        <button onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
          <ChevronLeft size={18} />
        </button>
        <button onClick={onNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
          <ChevronRight size={18} />
        </button>
        <button onClick={onClose} className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const open = i => setLightboxIdx(i)
  const close = () => setLightboxIdx(null)
  const prev = () => setLightboxIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
  const next = () => setLightboxIdx(i => (i + 1) % PHOTOS.length)

  return (
    <section style={{ background: 'linear-gradient(180deg, #f5ede0 0%, #faf7f2 100%)', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>
            — moments that matter —
          </p>
          <h2 className="font-script" style={{ fontSize: 'clamp(2.2rem,6vw,3.5rem)', color: 'var(--wine)' }}>
            Pasha, Through the Years
          </h2>
          <p className="font-serif italic mt-3 text-sm" style={{ color: 'var(--muted)' }}>
            Replace with her actual photos — just add them to /public/photos/
          </p>
          <div className="divider mt-4 mx-auto" style={{ maxWidth: '120px' }} />
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} onClick={open} />
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox photos={PHOTOS} index={lightboxIdx} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  )
}
