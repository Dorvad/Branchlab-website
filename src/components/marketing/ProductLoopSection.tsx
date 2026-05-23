'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { productSteps } from './marketing-data'

type AccentKey = 'mint' | 'violet' | 'amber' | 'danger'
type AccentValues = { color: string; bg: string; border: string }

const accentColors: Record<AccentKey, AccentValues> = {
  mint:   { color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.10)', border: 'oklch(82% 0.18 165 / 0.3)' },
  violet: { color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.10)', border: 'oklch(78% 0.18 285 / 0.3)' },
  amber:  { color: 'oklch(80% 0.16 60)',  bg: 'oklch(80% 0.16 60 / 0.10)',  border: 'oklch(80% 0.16 60 / 0.3)'  },
  danger: { color: 'oklch(70% 0.18 25)',  bg: 'oklch(70% 0.18 25 / 0.10)',  border: 'oklch(70% 0.18 25 / 0.3)'  },
}

// ── 1. Upload ─────────────────────────────────────────────────────────────
function UploadVisual() {
  const pref = useReducedMotion()

  // 5.5 s cycle: slide in → land → file appears → card fades → file fades → pause
  const DUR = 5.5
  const T   = [0, 0.06, 0.42, 0.50, 0.55, 0.92, 1.0]
  const base = { duration: DUR, repeat: Infinity, times: T, ease: 'easeInOut' as const }

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
          <span className="font-mono text-[9px]" style={{ color: 'oklch(82% 0.18 165)' }}>3 clips</span>
        </div>

        {/* Drop zone */}
        <div className="relative mb-3" style={{ overflow: 'hidden', borderRadius: 12 }}>
          <div
            className="flex flex-col items-center justify-center gap-2 rounded-xl py-5 relative"
            style={{
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: 'oklch(82% 0.18 165 / 0.3)',
              background: 'rgba(255,255,255,0.02)',
              minHeight: 82,
            }}
          >
            {/* Glow that brightens when card is over zone */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-xl"
              initial={{ opacity: 0 }}
              animate={pref ? { opacity: 0 } : { opacity: [0, 0.2, 0.9, 0.5, 0, 0, 0] }}
              transition={base}
              style={{
                background: 'radial-gradient(ellipse at center, oklch(82% 0.18 165 / 0.10) 0%, transparent 70%)',
                boxShadow: 'inset 0 0 0 1.5px oklch(82% 0.18 165 / 0.5)',
              }}
            />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2v10M5 6l4-4 4 4" stroke="oklch(82% 0.18 165 / 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 14h14" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>Drop clips here</span>

            {/* File card dragging in from the left */}
            <motion.div
              className="absolute flex items-center gap-2 px-3 py-2 rounded-lg"
              initial={{ x: -220, opacity: 0 }}
              animate={pref ? { x: 0, opacity: 1 } : {
                x:       [-220, -220,  0,  0, -220, -220, -220],
                rotate:  [-12,  -12,  -3, -3,  -12,  -12,  -12],
                opacity: [0,    1,     1,  0,  0,    0,    0   ],
              }}
              transition={pref ? { duration: 0.5 } : base}
              style={{
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
          </div>
        </div>

        {/* File list */}
        <div className="space-y-1.5">
          {[
            { name: 'intro-clip.mp4',   loop: false },
            { name: 'scene-a.mp4',      loop: false },
            { name: 'ending-clip.mp4',  loop: true  },
          ].map((f) => (
            <motion.div
              key={f.name}
              animate={f.loop && !pref
                ? { opacity: [0, 0, 0, 1, 1, 1, 0] }
                : { opacity: 1 }}
              transition={f.loop && !pref ? base : { duration: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="w-7 h-5 rounded shrink-0" style={{ background: 'oklch(82% 0.18 165 / 0.14)', border: '1px solid oklch(82% 0.18 165 / 0.2)' }} />
              <span className="text-[10px] font-mono flex-1 truncate" style={{ color: 'var(--fg-1)' }}>{f.name}</span>
              <span className="text-[9px] font-mono shrink-0" style={{ color: 'oklch(82% 0.18 165)' }}>✓</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── 2. Map ────────────────────────────────────────────────────────────────
// Cursor glides to Scene B's port, drags a connection edge to Ending B, snaps.
function MapVisual() {
  const pref = useReducedMotion()

  // 8 s cycle timeline (9 keyframes)
  // 0→idle, 0.125→approach, 0.31→hover port, 0.375→click, 0.44→drag, 0.625→connected, 0.8→retreat, 0.9→pause, 1.0→loop
  const DUR = 8
  const T   = [0, 0.125, 0.31, 0.375, 0.44, 0.625, 0.8, 0.9, 1.0]
  const base = { duration: DUR, repeat: Infinity, times: T, ease: 'easeInOut' as const }

  // Cursor x/y keyframes (SVG coordinate space)
  const CX = [270, 270, 236, 236,  98,  98, 270, 270, 270]
  const CY = [ 92,  92,  92,  92, 153, 153,  92,  92,  92]

  // Draft edge: path is always M232,92 → Ending B's left port (102,151)
  // strokeDasharray=260 covers the full path length; offset from 260→0 draws it in
  const EDGE_DASH    = [260, 260, 260, 260,   0,   0,   0, 260, 260]
  const EDGE_OPACITY = [  0,   0,   0, 0.7, 0.7,   1,   1,   0,   0]

  // Port ring on Scene B's right side
  const PORT_OPACITY = [0, 0, 1, 1, 0, 0, 0, 0, 0]

  // Scene B highlight (cursor approaching / hovering)
  const SCENE_B_OPQ  = [0, 0.7, 0.7, 0.7, 0, 0, 0, 0, 0]

  // Ending B highlight (connected)
  const END_B_OPQ    = [0, 0, 0, 0, 0, 1, 1, 0, 0]

  // Particle along edge (only shows when connected)
  const PARTICLE_OPQ = [0, 0, 0, 0, 0, 1, 1, 0, 0]

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
              <marker id="m-arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="rgba(255,255,255,0.2)" />
              </marker>
              <marker id="m-mint2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="oklch(82% 0.18 165 / 0.9)" />
              </marker>
              <filter id="glow-m2">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Static edges */}
            <path d="M120,30 C120,52 52,52 52,76"  stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" markerEnd="url(#m-arr2)" className="mkt-animate-edge" style={{ animationDelay: '0.1s' }} />
            <path d="M120,30 C120,52 188,52 188,76" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" markerEnd="url(#m-arr2)" className="mkt-animate-edge" style={{ animationDelay: '0.3s' }} />
            <path d="M52,108 C52,124 43,124 43,140" stroke="rgba(255,255,255,0.12)" strokeWidth="1.1" fill="none" markerEnd="url(#m-arr2)" className="mkt-animate-edge" style={{ animationDelay: '0.5s' }} />

            {/* Draft edge — draws itself from Scene B port to Ending B port */}
            <motion.path
              d="M232,92 C178,92 138,130 102,151"
              stroke="oklch(82% 0.18 165)"
              strokeWidth="1.5"
              strokeDasharray={260}
              fill="none"
              markerEnd="url(#m-mint2)"
              initial={{ strokeDashoffset: 260, opacity: 0 }}
              animate={pref ? { strokeDashoffset: 0, opacity: 1 } : {
                strokeDashoffset: EDGE_DASH,
                opacity: EDGE_OPACITY,
              }}
              transition={pref ? { duration: 1 } : base}
            />

            {/* Particle flowing along the connected edge */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={pref ? { opacity: 1 } : { opacity: PARTICLE_OPQ }}
              transition={pref ? { duration: 1 } : base}
            >
              <circle r="2.2" fill="oklch(82% 0.18 165)" opacity="0.95">
                <animateMotion dur="1.3s" repeatCount="indefinite"
                  path="M232,92 C178,92 138,130 102,151" />
              </circle>
            </motion.g>

            {/* START node */}
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

            {/* Scene B — base rect + animated highlight overlay */}
            <g>
              <rect x="144" y="76" width="88" height="32" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
              <motion.rect
                x="144" y="76" width="88" height="32" rx="6"
                fill="oklch(82% 0.18 165 / 0.09)"
                stroke="oklch(82% 0.18 165 / 0.6)"
                strokeWidth="1.3"
                initial={{ opacity: 0 }}
                animate={pref ? { opacity: 1 } : { opacity: SCENE_B_OPQ }}
                transition={pref ? { duration: 0.5 } : base}
              />
              <text x="188" y="89"  textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6" letterSpacing="0.5">VIDEO SCENE</text>
              <text x="188" y="101" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">Scene B</text>

              {/* Connection port ring */}
              <motion.circle
                cx="232" cy="92" r="4.5"
                fill="oklch(82% 0.18 165)"
                initial={{ opacity: 0 }}
                animate={pref ? { opacity: 1 } : { opacity: PORT_OPACITY }}
                transition={pref ? { duration: 0.4 } : base}
                style={{ filter: 'drop-shadow(0 0 5px oklch(82% 0.18 165))' }}
              />
            </g>

            {/* Ending A */}
            <g>
              <rect x="8" y="140" width="70" height="22" rx="4" fill="oklch(80% 0.16 60 / 0.09)" stroke="oklch(80% 0.16 60 / 0.4)" strokeWidth="1" />
              <text x="43" y="154" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" letterSpacing="1">ENDING A</text>
            </g>

            {/* Ending B — base rect + animated highlight overlay */}
            <g>
              <rect x="102" y="140" width="80" height="22" rx="4" fill="oklch(80% 0.16 60 / 0.09)" stroke="oklch(80% 0.16 60 / 0.4)" strokeWidth="1" />
              <motion.rect
                x="102" y="140" width="80" height="22" rx="4"
                fill="oklch(80% 0.16 60 / 0.14)"
                stroke="oklch(80% 0.16 60 / 0.7)"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={pref ? { opacity: 1 } : { opacity: END_B_OPQ }}
                transition={pref ? { duration: 0.5 } : base}
              />
              <text x="142" y="154" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" letterSpacing="1">ENDING B</text>
            </g>

            {/* Cursor dot */}
            <motion.g
              initial={{ x: 270, y: 92 }}
              animate={pref ? { x: 236, y: 92 } : { x: CX, y: CY }}
              transition={pref ? { duration: 1 } : base}
              aria-hidden="true"
            >
              <circle cx="0" cy="0" r="3.5" fill="white" opacity="0.92"
                style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))' }} />
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

// ── 3. Connect / Choices ──────────────────────────────────────────────────
function ChoicesVisual() {
  const pref = useReducedMotion()
  const choices = [
    { label: 'Speak up directly', dest: 'Scene B',  color: 'oklch(82% 0.18 165)' },
    { label: 'Ask for more time', dest: 'Feedback', color: 'oklch(78% 0.18 285)' },
    { label: 'Walk away',         dest: 'Ending A', color: 'oklch(80% 0.16 60)'  },
  ]
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (pref) return
    let i = 0
    const id = setInterval(() => { i = (i + 1) % choices.length; setActive(i) }, 1500)
    return () => clearInterval(id)
  }, [pref]) // eslint-disable-line react-hooks/exhaustive-deps

  const ac = choices[active]

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
                  background: isActive ? `${c.color.slice(0, -1)} / 0.10)` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? `${c.color.slice(0, -1)} / 0.45)` : 'rgba(255,255,255,0.07)'}`,
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-mono shrink-0"
                  style={{
                    background: isActive ? `${c.color.slice(0, -1)} / 0.18)` : 'rgba(255,255,255,0.05)',
                    color: isActive ? c.color : 'var(--fg-3)',
                    border: `1px solid ${isActive ? `${c.color.slice(0, -1)} / 0.35)` : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.3s',
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[10px] flex-1" style={{ color: isActive ? 'var(--fg-0)' : 'var(--fg-2)', transition: 'color 0.3s' }}>
                  {c.label}
                </span>
                <motion.span
                  className="font-mono text-[8px] shrink-0"
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 5 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: c.color }}
                >
                  → {c.dest}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        {/* Route preview */}
        <motion.div
          className="mt-3 pt-2.5 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          animate={{ opacity: 1 }}
        >
          <span className="font-mono text-[8px]" style={{ color: 'var(--fg-4)' }}>Routes to</span>
          <motion.span
            key={ac.dest}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[9px] px-2 py-0.5 rounded-full"
            style={{
              background: `${ac.color.slice(0, -1)} / 0.12)`,
              border: `1px solid ${ac.color.slice(0, -1)} / 0.3)`,
              color: ac.color,
            }}
          >
            {ac.dest}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── 4. Feedback ───────────────────────────────────────────────────────────
function FeedbackVisual() {
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
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'oklch(78% 0.18 285)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'oklch(78% 0.18 285)' }}>
            Coaching Feedback
          </span>
          <span className="ml-auto font-mono text-[9px]" style={{ color: 'var(--fg-4)' }}>After choice A</span>
        </div>

        <div className="p-4">
          <motion.p
            className="text-xs leading-relaxed mb-4"
            style={{ color: 'var(--fg-1)' }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Speaking up directly shows confidence and respect. This creates space for honest
            conversation — even when uncomfortable.
          </motion.p>

          <div className="flex flex-wrap gap-2 mb-4">
            {['Builds trust', 'Shows courage', 'Opens dialogue'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.4 }}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono"
                style={{
                  background: 'oklch(78% 0.18 285 / 0.1)',
                  border: '1px solid oklch(78% 0.18 285 / 0.25)',
                  color: 'oklch(78% 0.18 285)',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="w-full py-2.5 rounded-xl text-xs font-medium text-center"
            style={{ background: 'oklch(82% 0.18 165)', color: '#052916' }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            animate={{ boxShadow: ['0 0 0px oklch(82% 0.18 165 / 0)', '0 0 24px oklch(82% 0.18 165 / 0.5)', '0 0 0px oklch(82% 0.18 165 / 0)'] }}
          >
            Continue →
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// ── 5. Validate ───────────────────────────────────────────────────────────
function ValidateVisual() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const [resolved, setResolved] = useState(0)

  useEffect(() => {
    const cycle = (step: number) => {
      setResolved(step)
      const delay = step === 0 ? 900 : step < 3 ? 650 : 2500
      timerRef.current = setTimeout(() => cycle(step < 3 ? step + 1 : 0), delay)
    }
    timerRef.current = setTimeout(() => cycle(0), 500)
    return () => clearTimeout(timerRef.current)
  }, [])

  const errors = [
    'Choice without destination — "Walk Away"',
    'Unreachable node — "Intro B"',
  ]

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
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
              <motion.div
                key={err}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                animate={{
                  opacity: done ? 0.4 : 1,
                  background: done ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
                  borderColor: done ? 'rgba(255,255,255,0.06)' : 'oklch(70% 0.18 25 / 0.3)',
                }}
                style={{ border: '1px solid oklch(70% 0.18 25 / 0.3)' }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  animate={{ color: done ? 'rgba(255,255,255,0.2)' : 'oklch(70% 0.18 25)' }}
                  transition={{ duration: 0.4 }}
                  className="text-xs shrink-0"
                >✕</motion.span>
                <motion.span
                  className="text-[10px]"
                  animate={{
                    color: done ? 'rgba(255,255,255,0.2)' : 'var(--fg-2)',
                    textDecorationLine: done ? 'line-through' : 'none',
                  }}
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
          animate={{
            opacity: resolved >= 3 ? 1 : 0,
            y: resolved >= 3 ? 0 : 6,
            background: 'oklch(82% 0.18 165 / 0.07)',
            borderColor: 'oklch(82% 0.18 165 / 0.35)',
          }}
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
            <motion.div
              key={i}
              className="absolute rounded-full"
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
  const ref    = useRef<HTMLDivElement>(null)
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
