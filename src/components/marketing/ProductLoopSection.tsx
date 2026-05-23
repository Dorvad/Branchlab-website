'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate,
  useReducedMotion,
} from 'framer-motion'
import { productSteps } from './marketing-data'

type AccentKey = 'mint' | 'violet' | 'amber' | 'danger'
type AccentValues = { color: string; bg: string; border: string }

const accentColors: Record<AccentKey, AccentValues> = {
  mint:   { color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.10)', border: 'oklch(82% 0.18 165 / 0.3)' },
  violet: { color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.10)', border: 'oklch(78% 0.18 285 / 0.3)' },
  amber:  { color: 'oklch(80% 0.16 60)',  bg: 'oklch(80% 0.16 60 / 0.10)',  border: 'oklch(80% 0.16 60 / 0.3)'  },
  danger: { color: 'oklch(70% 0.18 25)',  bg: 'oklch(70% 0.18 25 / 0.10)',  border: 'oklch(70% 0.18 25 / 0.3)'  },
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

// ── 1. Upload ─────────────────────────────────────────────────────────────
// Animates a file card dragging in from the left and snapping into the drop zone
function UploadVisual() {
  const pref = useReducedMotion()
  const cardX   = useMotionValue(-200)
  const cardRot = useMotionValue(-10)
  const dzGlow  = useMotionValue(0)
  const [dropped, setDropped]   = useState(false)
  const [cardVis, setCardVis]   = useState(false)

  useEffect(() => {
    if (pref) { setDropped(true); return }
    let cancelled = false
    const loop = async () => {
      while (!cancelled) {
        setDropped(false)
        setCardVis(true)
        cardX.set(-220)
        cardRot.set(-12)
        dzGlow.set(0)

        await sleep(700)

        // Card slides in
        await Promise.all([
          animate(cardX,   0,  { duration: 0.75, ease: [0.2, 0.8, 0.3, 1] }),
          animate(cardRot, -4, { duration: 0.75 }),
        ])

        // Drop zone lights up
        await animate(dzGlow, 1, { duration: 0.3 })

        // Card snaps to center with spring
        await Promise.all([
          animate(cardX,   0,  { type: 'spring', stiffness: 500, damping: 28 }),
          animate(cardRot, 0,  { type: 'spring', stiffness: 400, damping: 20 }),
        ])

        await sleep(150)
        setDropped(true)
        setCardVis(false)

        await sleep(2400)
        await animate(dzGlow, 0, { duration: 0.5 })
        await sleep(600)
      }
    }
    loop()
    return () => { cancelled = true }
  }, [pref, cardX, cardRot, dzGlow])

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        className="p-4 rounded-xl"
        style={{
          background: 'rgba(8,9,13,0.7)',
          border: '1px solid oklch(82% 0.18 165 / 0.35)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}
        initial={{ rotateX: 12, rotateY: -5, opacity: 0 }}
        whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="font-mono text-[8px] tracking-widest uppercase ml-2" style={{ color: 'var(--fg-4)' }}>Asset Library</span>
          </div>
          <span className="font-mono text-[9px]" style={{ color: 'oklch(82% 0.18 165)' }}>{dropped ? '3' : '2'} clips</span>
        </div>

        {/* Drop zone */}
        <div className="relative mb-3" style={{ overflow: 'hidden', borderRadius: 12 }}>
          <motion.div
            className="flex flex-col items-center justify-center gap-2 rounded-xl py-5 relative"
            style={{
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: 'oklch(82% 0.18 165 / 0.3)',
              background: 'rgba(255,255,255,0.02)',
              minHeight: 82,
            }}
          >
            {/* Glow when file is over zone */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                opacity: dzGlow,
                background: 'radial-gradient(ellipse at center, oklch(82% 0.18 165 / 0.10) 0%, transparent 70%)',
                boxShadow: 'inset 0 0 0 1.5px oklch(82% 0.18 165 / 0.5)',
              }}
            />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2v10M5 6l4-4 4 4" stroke="oklch(82% 0.18 165 / 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 14h14" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>Drop clips here</span>

            {/* Animated file card being dragged */}
            {cardVis && (
              <motion.div
                className="absolute flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  x: cardX,
                  rotate: cardRot,
                  background: 'rgba(10,12,18,0.97)',
                  border: '1px solid oklch(82% 0.18 165 / 0.55)',
                  boxShadow: '0 10px 36px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                  top: '50%',
                  left: '50%',
                  marginTop: -20,
                  marginLeft: -82,
                  width: 164,
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
              >
                <div className="w-8 h-6 rounded shrink-0 flex items-center justify-center"
                  style={{ background: 'oklch(82% 0.18 165 / 0.18)', border: '1px solid oklch(82% 0.18 165 / 0.3)' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9"><polygon points="1,0.5 8.5,4.5 1,8.5" fill="oklch(82% 0.18 165 / 0.9)" /></svg>
                </div>
                <span className="font-mono text-[9px] truncate" style={{ color: 'var(--fg-1)' }}>ending-clip.mp4</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* File list */}
        <div className="space-y-1.5">
          {[
            { name: 'intro-clip.mp4', always: true },
            { name: 'scene-a.mp4',    always: true },
            { name: 'ending-clip.mp4', always: false },
          ].map((f) => (
            f.always || dropped ? (
              <motion.div
                key={f.name}
                initial={f.always ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="w-7 h-5 rounded shrink-0" style={{ background: 'oklch(82% 0.18 165 / 0.14)', border: '1px solid oklch(82% 0.18 165 / 0.2)' }} />
                <span className="text-[10px] font-mono flex-1 truncate" style={{ color: 'var(--fg-1)' }}>{f.name}</span>
                <span className="text-[9px] font-mono shrink-0" style={{ color: 'oklch(82% 0.18 165)' }}>✓</span>
              </motion.div>
            ) : null
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── 2. Map ────────────────────────────────────────────────────────────────
// Animates a cursor dragging out a new branch connection between two nodes
function MapVisual() {
  const pref = useReducedMotion()

  // Cursor SVG position
  const cx = useMotionValue(270)
  const cy = useMotionValue(92)

  // Draft edge endpoint (tracks cursor during drag)
  const ex = useMotionValue(232)
  const ey = useMotionValue(92)

  const draftRef = useRef<SVGPathElement>(null)

  const [showPort,    setShowPort]    = useState(false)
  const [showDraft,   setShowDraft]   = useState(false)
  const [connected,   setConnected]   = useState(false)
  const [dragging,    setDragging]    = useState(false)

  // Update SVG path directly (avoids re-render on every frame)
  const updateDraft = (endX: number, endY: number) => {
    if (!draftRef.current) return
    const cp = 232 + (endX - 232) * 0.45
    draftRef.current.setAttribute('d', `M232,92 C${cp},92 ${cp},${endY} ${endX},${endY}`)
  }
  useMotionValueEvent(ex, 'change', (v) => updateDraft(v, ey.get()))
  useMotionValueEvent(ey, 'change', (v) => updateDraft(ex.get(), v))

  useEffect(() => {
    if (pref) { setConnected(true); return }
    let cancelled = false

    const loop = async () => {
      while (!cancelled) {
        // Reset
        setShowPort(false); setShowDraft(false); setConnected(false); setDragging(false)
        cx.set(270); cy.set(92); ex.set(232); ey.set(92)

        await sleep(1200)

        // Cursor glides in toward Scene B's right port
        await Promise.all([
          animate(cx, 236, { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }),
        ])

        setShowPort(true)
        await sleep(500)

        // Click — grab the port
        setDragging(true)
        await sleep(180)
        setShowDraft(true)

        // Drag edge + cursor to Ending B's left port
        await Promise.all([
          animate(cx, 98,  { duration: 1.1, ease: [0.4, 0, 0.2, 1] }),
          animate(cy, 153, { duration: 1.1, ease: [0.4, 0, 0.2, 1] }),
          animate(ex, 102, { duration: 1.1, ease: [0.4, 0, 0.2, 1] }),
          animate(ey, 151, { duration: 1.1, ease: [0.4, 0, 0.2, 1] }),
        ])

        // Snap!
        await Promise.all([
          animate(ex, 102, { type: 'spring', stiffness: 700, damping: 28 }),
          animate(ey, 151, { type: 'spring', stiffness: 700, damping: 28 }),
        ])

        setDragging(false)
        setConnected(true)
        setShowPort(false)

        await sleep(1800)

        // Cursor retreats
        animate(cx, 270, { duration: 0.55, ease: 'easeIn' })
        await sleep(300)
        setShowDraft(false)
        setConnected(false)
        await sleep(600)
      }
    }

    loop()
    return () => { cancelled = true }
  }, [pref, cx, cy, ex, ey])

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(8,9,13,0.7)',
          border: '1px solid oklch(82% 0.18 165 / 0.35)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}
        initial={{ rotateX: 22, opacity: 0 }}
        whileInView={{ rotateX: -9, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="font-mono text-[8px] tracking-widest uppercase ml-1" style={{ color: 'var(--fg-4)' }}>
            scenario canvas · tough-talk-x7
          </span>
          <span className="ml-auto font-mono text-[8px]" style={{ color: 'oklch(82% 0.18 165)' }}>● live</span>
        </div>

        {/* Canvas */}
        <div className="p-3 mkt-dot-grid">
          <svg viewBox="0 0 240 170" className="w-full" aria-hidden="true">
            <defs>
              <marker id="m-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="rgba(255,255,255,0.2)" />
              </marker>
              <marker id="m-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="oklch(82% 0.18 165 / 0.9)" />
              </marker>
              <filter id="glow-m">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Static edges */}
            <path d="M120,30 C120,52 52,52 52,76"   stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" markerEnd="url(#m-arr)" className="mkt-animate-edge" style={{ animationDelay: '0.1s' }} />
            <path d="M120,30 C120,52 188,52 188,76"  stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" markerEnd="url(#m-arr)" className="mkt-animate-edge" style={{ animationDelay: '0.3s' }} />
            <path d="M52,108 C52,124 43,124 43,140"  stroke="rgba(255,255,255,0.12)" strokeWidth="1.1" fill="none" markerEnd="url(#m-arr)" className="mkt-animate-edge" style={{ animationDelay: '0.5s' }} />

            {/* Draft / connected edge (mutated directly via ref) */}
            <path
              ref={draftRef}
              d="M232,92 C232,92 232,92 232,92"
              stroke={connected ? 'oklch(82% 0.18 165)' : 'oklch(82% 0.18 165 / 0.65)'}
              strokeWidth={connected ? 1.8 : 1.3}
              strokeDasharray={connected ? undefined : '5 3'}
              fill="none"
              markerEnd={connected ? 'url(#m-mint)' : undefined}
              filter={connected ? 'url(#glow-m)' : undefined}
              opacity={showDraft ? 1 : 0}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s' }}
            />

            {/* Particle flowing along connected edge */}
            {connected && (
              <circle r="2.2" fill="oklch(82% 0.18 165)" opacity="0.95">
                <animateMotion dur="1.3s" repeatCount="indefinite"
                  path="M232,92 C178,92 138,130 102,151" />
              </circle>
            )}

            {/* START */}
            <g>
              <rect x="82" y="8" width="76" height="22" rx="5" fill="oklch(82% 0.18 165 / 0.14)" stroke="oklch(82% 0.18 165 / 0.75)" strokeWidth="1.3" />
              <text x="120" y="22" textAnchor="middle" fill="oklch(82% 0.18 165)" fontFamily="monospace" fontSize="8" fontWeight="700" letterSpacing="1.8">START</text>
            </g>

            {/* Scene A */}
            <g>
              <rect x="8" y="76" width="88" height="32" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
              <text x="52" y="89"  textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6" letterSpacing="0.5">VIDEO SCENE</text>
              <text x="52" y="101" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">Scene A</text>
            </g>

            {/* Scene B — highlights when port active or connected */}
            <g>
              <rect x="144" y="76" width="88" height="32" rx="6"
                fill={showPort || connected ? 'oklch(82% 0.18 165 / 0.09)' : 'rgba(255,255,255,0.03)'}
                stroke={showPort || connected ? 'oklch(82% 0.18 165 / 0.6)' : 'rgba(255,255,255,0.13)'}
                strokeWidth="1.3"
                style={{ transition: 'fill 0.25s, stroke 0.25s' }}
              />
              <text x="188" y="89"  textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6" letterSpacing="0.5">VIDEO SCENE</text>
              <text x="188" y="101" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">Scene B</text>

              {/* Connection port */}
              {showPort && (
                <motion.circle cx="232" cy="92" r="4.5" fill="oklch(82% 0.18 165)"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ filter: 'drop-shadow(0 0 5px oklch(82% 0.18 165))' }}
                />
              )}
            </g>

            {/* Ending A */}
            <g>
              <rect x="8" y="140" width="70" height="22" rx="4" fill="oklch(80% 0.16 60 / 0.09)" stroke="oklch(80% 0.16 60 / 0.4)" strokeWidth="1" />
              <text x="43" y="154" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" letterSpacing="1">ENDING A</text>
            </g>

            {/* Ending B — glows when connected */}
            <g>
              <rect x="102" y="140" width="80" height="22" rx="4"
                fill={connected ? 'oklch(80% 0.16 60 / 0.14)' : 'oklch(80% 0.16 60 / 0.09)'}
                stroke={connected ? 'oklch(80% 0.16 60 / 0.7)' : 'oklch(80% 0.16 60 / 0.4)'}
                strokeWidth={connected ? 1.5 : 1}
                style={{ transition: 'fill 0.35s, stroke 0.35s, stroke-width 0.35s' }}
              />
              <text x="142" y="154" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" fontWeight={connected ? '700' : '400'} letterSpacing="1">ENDING B</text>
            </g>

            {/* Cursor dot */}
            <motion.g style={{ x: cx, y: cy }} aria-hidden="true">
              <circle cx="0" cy="0" r={dragging ? 5 : 3.5} fill="white" opacity="0.92"
                style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))', transition: 'r 0.15s' }} />
              {dragging && (
                <circle cx="0" cy="0" r="9" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              )}
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

// ── 3. Connect / Choices ──────────────────────────────────────────────────
// Cursor cycles through choice buttons; each highlights with its destination
function ChoicesVisual() {
  const pref = useReducedMotion()
  const choices = [
    { label: 'Speak up directly', dest: 'Scene B',   color: 'oklch(82% 0.18 165)' },
    { label: 'Ask for more time', dest: 'Feedback',  color: 'oklch(78% 0.18 285)' },
    { label: 'Walk away',         dest: 'Ending A',  color: 'oklch(80% 0.16 60)'  },
  ]
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (pref) { setActive(0); return }
    let cancelled = false
    const loop = async () => {
      while (!cancelled) {
        for (let i = 0; i < choices.length; i++) {
          if (cancelled) break
          setActive(i)
          await sleep(1300)
        }
        setActive(null)
        await sleep(500)
      }
    }
    loop()
    return () => { cancelled = true }
  }, [pref]) // eslint-disable-line react-hooks/exhaustive-deps

  const ac = active !== null ? choices[active] : null

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        className="p-4 rounded-xl"
        style={{
          background: 'rgba(8,9,13,0.7)',
          border: '1px solid oklch(78% 0.18 285 / 0.35)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}
        initial={{ rotateX: 10, rotateY: 4, opacity: 0 }}
        whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scene pill */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'oklch(78% 0.18 285)' }} />
          <span className="text-[10px] font-mono" style={{ color: 'var(--fg-1)' }}>The Situation</span>
          <span className="ml-auto font-mono text-[9px]" style={{ color: 'var(--fg-4)' }}>0:42</span>
        </div>

        <p className="font-mono text-[9px] uppercase tracking-widest mb-2.5 px-1" style={{ color: 'var(--fg-4)' }}>
          After this scene · choose a response
        </p>

        <div className="space-y-1.5">
          {choices.map((c, i) => {
            const isActive = active === i
            return (
              <motion.div
                key={c.label}
                initial={{ x: 14, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{
                  background: isActive ? c.color.replace(')', ' / 0.10)') : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? c.color.replace(')', ' / 0.45)') : 'rgba(255,255,255,0.07)'}`,
                  transition: 'background 0.25s, border-color 0.25s',
                }}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-mono shrink-0"
                  style={{
                    background: isActive ? c.color.replace(')', ' / 0.18)') : 'rgba(255,255,255,0.05)',
                    color: isActive ? c.color : 'var(--fg-3)',
                    border: `1px solid ${isActive ? c.color.replace(')', ' / 0.35)') : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.25s',
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[10px] flex-1" style={{ color: isActive ? 'var(--fg-0)' : 'var(--fg-2)', transition: 'color 0.25s' }}>
                  {c.label}
                </span>
                <motion.span
                  className="font-mono text-[8px] shrink-0"
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 5 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: c.color }}
                >
                  → {c.dest}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        {/* Route preview strip */}
        <motion.div
          className="mt-3 pt-2.5 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          animate={{ opacity: ac ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-mono text-[8px]" style={{ color: 'var(--fg-4)' }}>Routes to</span>
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded-full"
            style={{
              background: ac ? ac.color.replace(')', ' / 0.12)') : 'transparent',
              border: `1px solid ${ac ? ac.color.replace(')', ' / 0.3)') : 'transparent'}`,
              color: ac ? ac.color : 'transparent',
              transition: 'all 0.25s',
            }}
          >
            {ac ? ac.dest : '—'}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── 4. Feedback ───────────────────────────────────────────────────────────
// Coaching text types itself in character by character, then clears and repeats
function FeedbackVisual() {
  const pref = useReducedMotion()
  const FULL = 'Speaking up directly shows confidence and respect. This creates space for honest conversation — even when uncomfortable.'
  const [text, setText] = useState(pref ? FULL : '')

  useEffect(() => {
    if (pref) { setText(FULL); return }
    let cancelled = false

    const loop = async () => {
      while (!cancelled) {
        // Type in
        for (let i = 1; i <= FULL.length; i++) {
          if (cancelled) break
          setText(FULL.slice(0, i))
          await sleep(22)
        }
        await sleep(2800)

        // Clear quickly
        for (let i = FULL.length; i >= 0; i -= 4) {
          if (cancelled) break
          setText(FULL.slice(0, i))
          await sleep(16)
        }
        setText('')
        await sleep(500)
      }
    }

    loop()
    return () => { cancelled = true }
  }, [pref]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(8,9,13,0.7)',
          border: '1px solid oklch(78% 0.18 285 / 0.35)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 60px oklch(78% 0.18 285 / 0.06)',
        }}
        initial={{ rotateX: -10, rotateY: -4, opacity: 0 }}
        whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-4 py-2.5 flex items-center gap-2"
          style={{ background: 'oklch(78% 0.18 285 / 0.12)', borderBottom: '1px solid oklch(78% 0.18 285 / 0.2)' }}>
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'oklch(78% 0.18 285)' }}>
            Coaching Feedback
          </span>
          <span className="ml-auto font-mono text-[9px]" style={{ color: 'var(--fg-4)' }}>After choice A</span>
        </div>

        <div className="p-4">
          <div className="min-h-[56px] text-xs leading-relaxed mb-4" style={{ color: 'var(--fg-1)' }}>
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] h-[12px] ml-[1px] align-middle"
              style={{ background: 'oklch(78% 0.18 285)', borderRadius: 1 }}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {['Builds trust', 'Shows courage', 'Opens dialogue'].map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-mono"
                style={{ background: 'oklch(78% 0.18 285 / 0.1)', border: '1px solid oklch(78% 0.18 285 / 0.25)', color: 'oklch(78% 0.18 285)' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="w-full py-2.5 rounded-xl text-xs font-medium text-center"
            style={{ background: 'oklch(82% 0.18 165)', color: '#052916' }}>
            Continue →
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── 5. Validate ───────────────────────────────────────────────────────────
// Errors resolve one by one as if a validator is running
function ValidateVisual() {
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [resolved, setResolved] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setResolved(1), 700)
    const t2 = setTimeout(() => setResolved(2), 1200)
    const t3 = setTimeout(() => setResolved(3), 1700)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [inView])

  const errors = [
    'Choice without destination — "Walk Away"',
    'Unreachable node — "Intro B"',
  ]

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        ref={ref}
        className="p-4 rounded-xl"
        style={{
          background: 'rgba(8,9,13,0.7)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          border: `1px solid ${resolved >= 3 ? 'oklch(82% 0.18 165 / 0.45)' : 'oklch(70% 0.18 25 / 0.4)'}`,
          transition: 'border-color 0.7s ease',
        }}
        initial={{ rotateX: 10, rotateY: 3, opacity: 0 }}
        whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>Validation</span>
          <motion.span
            className="font-mono text-[9px]"
            animate={{ color: resolved >= 3 ? 'oklch(82% 0.18 165)' : 'oklch(70% 0.18 25)' }}
            transition={{ duration: 0.5 }}
          >
            {resolved >= 3 ? '✓ All clear' : `${2 - Math.min(resolved, 2)} error${resolved < 2 ? 's' : ''}`}
          </motion.span>
        </div>

        <div className="space-y-1.5 mb-2">
          {errors.map((err, i) => {
            const done = resolved > i
            return (
              <motion.div key={err}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                animate={{
                  opacity: done ? 0.4 : 1,
                  background: done ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
                  borderColor: done ? 'rgba(255,255,255,0.06)' : 'oklch(70% 0.18 25 / 0.3)',
                }}
                style={{ border: '1px solid oklch(70% 0.18 25 / 0.3)' }}
                transition={{ duration: 0.5 }}
              >
                <motion.span animate={{ color: done ? 'rgba(255,255,255,0.2)' : 'oklch(70% 0.18 25)' }} transition={{ duration: 0.4 }} className="text-xs shrink-0">✕</motion.span>
                <motion.span
                  className="text-[10px]"
                  animate={{ color: done ? 'rgba(255,255,255,0.2)' : 'var(--fg-2)', textDecorationLine: done ? 'line-through' : 'none' }}
                  style={{ textDecorationColor: 'rgba(255,255,255,0.2)' }}
                  transition={{ duration: 0.4 }}
                >
                  {err}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
          animate={{ opacity: resolved >= 3 ? 1 : 0, y: resolved >= 3 ? 0 : 6, background: 'oklch(82% 0.18 165 / 0.07)', borderColor: 'oklch(82% 0.18 165 / 0.35)' }}
          initial={{ opacity: 0, y: 6 }}
          style={{ border: '1px solid oklch(82% 0.18 165 / 0.15)' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs shrink-0" style={{ color: 'oklch(82% 0.18 165)' }}>✓</span>
          <span className="text-[10px]" style={{ color: 'oklch(82% 0.18 165)' }}>No blocking errors · ready to publish</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── 6. Publish ────────────────────────────────────────────────────────────
// Broadcast rings emanate from the URL card; button glows with mint pulse
function PublishVisual() {
  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        className="p-5 rounded-xl"
        style={{
          background: 'rgba(8,9,13,0.7)',
          border: '1px solid oklch(82% 0.18 165 / 0.4)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 80px oklch(82% 0.18 165 / 0.06)',
        }}
        initial={{ rotateX: -10, rotateY: 4, opacity: 0 }}
        whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Broadcast rings */}
        <div className="relative flex items-center justify-center mb-5" style={{ height: 80 }}>
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ width: 52, height: 52, border: '1px solid oklch(82% 0.18 165)' }}
              animate={{ scale: [1, 3.4], opacity: [0.4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'oklch(82% 0.18 165 / 0.15)', border: '1.5px solid oklch(82% 0.18 165 / 0.65)', boxShadow: '0 0 24px oklch(82% 0.18 165 / 0.25)' }}
            animate={{ boxShadow: ['0 0 20px oklch(82% 0.18 165 / 0.2)', '0 0 40px oklch(82% 0.18 165 / 0.45)', '0 0 20px oklch(82% 0.18 165 / 0.2)'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M10 4l4 4-4 4" stroke="oklch(82% 0.18 165)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* URL bar */}
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3 mkt-url-pulse"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid oklch(82% 0.18 165 / 0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="oklch(82% 0.18 165 / 0.6)" strokeWidth="1" />
            <path d="M1 5 Q5 1 9 5 Q5 9 1 5" stroke="oklch(82% 0.18 165 / 0.6)" strokeWidth="0.8" fill="none" />
          </svg>
          <span className="font-mono text-[9px]" style={{ color: 'var(--fg-3)' }}>branchlab.app/play/</span>
          <span className="font-mono text-[10px] font-medium" style={{ color: 'oklch(82% 0.18 165)' }}>tough-talk-x7</span>
        </motion.div>

        <motion.div
          className="w-full py-2.5 rounded-xl text-xs font-medium text-center"
          style={{ background: 'oklch(82% 0.18 165)', color: '#052916' }}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          Publish scenario →
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Visual registry ───────────────────────────────────────────────────────
const VISUALS: Record<string, React.FC> = {
  upload:   UploadVisual,
  map:      MapVisual,
  choices:  ChoicesVisual,
  feedback: FeedbackVisual,
  validate: ValidateVisual,
  publish:  PublishVisual,
}

// ── Section ───────────────────────────────────────────────────────────────
export default function ProductLoopSection() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden" aria-labelledby="loop-headline">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 600px 400px at 20% 50%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--neon-mint)' }}
          >
            How it works
          </motion.span>
          <motion.h2
            id="loop-headline"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            From clips to choices
            <br />
            <span style={{ color: 'var(--fg-2)' }}>to outcomes.</span>
          </motion.h2>
        </div>

        <div className="space-y-5">
          {productSteps.map((step, i) => {
            const accent = accentColors[step.accent as AccentKey]
            const Visual = VISUALS[step.id]
            return <StepCard key={step.id} step={step} index={i} accent={accent} visual={<Visual />} />
          })}
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step, index, accent, visual,
}: {
  step: (typeof productSteps)[0]
  index: number
  accent: AccentValues
  visual: React.ReactNode
}) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 rounded-2xl border ${index % 2 === 1 ? 'lg:grid-flow-col' : ''}`}
      style={{ background: 'rgba(12,14,20,0.5)', borderColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
    >
      {/* Text */}
      <div className={`space-y-3 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <span
          className="inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border w-fit"
          style={{ color: accent.color, background: accent.bg, borderColor: accent.border }}
        >
          {step.eyebrow}
        </span>
        <h3 className="text-xl font-semibold tracking-[-0.015em]">{step.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>{step.description}</p>
      </div>

      {/* Visual */}
      <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
        {visual}
      </div>
    </motion.div>
  )
}
