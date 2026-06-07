'use client'

import { useCallback, useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  targetOpacity: number
  currentOpacity: number
  opacitySpeed: number
}

const SPACING = 28
const OPACITY_MIN = 0.1
const OPACITY_MAX = 0.3
const RADIUS = 1.2
const INTERACTION_RADIUS = 130
const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS
const OPACITY_BOOST = 0.55
const RADIUS_BOOST = 1.6
const MINT = '82% 0.18 165' // matches --neon-mint

/**
 * Canvas dot field that brightens and grows near the cursor — replaces the
 * static `.mkt-dot-grid` in the hero with an ambient, mouse-reactive version
 * in the brand mint. Falls back to a static render when the visitor prefers
 * reduced motion.
 */
export default function InteractiveDotField({ reduced = false }: { reduced?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const sizeRef = useRef({ width: 0, height: 0 })
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const frameRef = useRef<number | null>(null)

  const buildDots = useCallback(() => {
    const { width, height } = sizeRef.current
    if (!width || !height) return
    const cols = Math.ceil(width / SPACING)
    const rows = Math.ceil(height / SPACING)
    const dots: Dot[] = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const opacity = Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN
        dots.push({
          x: i * SPACING + SPACING / 2,
          y: j * SPACING + SPACING / 2,
          targetOpacity: opacity,
          currentOpacity: opacity,
          opacitySpeed: Math.random() * 0.004 + 0.0015,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const width = parent.clientWidth
    const height = parent.clientHeight
    if (sizeRef.current.width === width && sizeRef.current.height === height) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)

    sizeRef.current = { width, height }
    buildDots()
  }, [buildDots])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    resize()

    const drawStatic = () => {
      const { width, height } = sizeRef.current
      ctx.clearRect(0, 0, width, height)
      for (const dot of dotsRef.current) {
        ctx.beginPath()
        ctx.fillStyle = `oklch(${MINT} / ${dot.currentOpacity.toFixed(3)})`
        ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (reduced) {
      drawStatic()
      const onResize = () => { resize(); drawStatic() }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => { mouseRef.current = { x: null, y: null } }

    const animate = () => {
      const { width, height } = sizeRef.current
      const { x: mouseX, y: mouseY } = mouseRef.current
      ctx.clearRect(0, 0, width, height)

      for (const dot of dotsRef.current) {
        dot.currentOpacity += dot.opacitySpeed
        if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= OPACITY_MIN) {
          dot.opacitySpeed = -dot.opacitySpeed
          dot.currentOpacity = Math.max(OPACITY_MIN, Math.min(dot.currentOpacity, OPACITY_MAX))
          dot.targetOpacity = Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN
        }

        let interaction = 0
        if (mouseX !== null && mouseY !== null) {
          const dx = dot.x - mouseX
          const dy = dot.y - mouseY
          const distSq = dx * dx + dy * dy
          if (distSq < INTERACTION_RADIUS_SQ) {
            const factor = Math.max(0, 1 - Math.sqrt(distSq) / INTERACTION_RADIUS)
            interaction = factor * factor
          }
        }

        const opacity = Math.min(1, dot.currentOpacity + interaction * OPACITY_BOOST)
        const radius = RADIUS + interaction * RADIUS_BOOST

        ctx.beginPath()
        ctx.fillStyle = `oklch(${MINT} / ${opacity.toFixed(3)})`
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', resize)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [reduced, resize])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
