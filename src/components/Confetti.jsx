import { useEffect, useRef } from 'react'

export default function Confetti({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#c97c55', '#b8956a', '#e8c5a8', '#7a3f2e', '#d4b48a', '#f5e0c8', '#a06040']
    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2.5 + 1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.01,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    }))

    let frame = 0
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach(p => {
        p.y += p.speed
        p.wobble += p.wobbleSpeed
        p.x += Math.sin(p.wobble) * 1.5
        p.rotation += p.rotSpeed
        if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.75
        if (p.shape === 'circle') {
          ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r)
        }
        ctx.restore()
      })
      if (frame < 500) animRef.current = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  if (!active) return null
  return (
    <canvas ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000, width: '100%', height: '100%' }} />
  )
}
