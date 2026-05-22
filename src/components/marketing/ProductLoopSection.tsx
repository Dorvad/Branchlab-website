'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { productSteps } from './marketing-data'

type AccentKey = 'mint' | 'violet' | 'amber' | 'danger'
type AccentValues = { color: string; bg: string; border: string }

const accentColors: Record<AccentKey, AccentValues> = {
  mint:   { color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.10)', border: 'oklch(82% 0.18 165 / 0.3)' },
  violet: { color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.10)', border: 'oklch(78% 0.18 285 / 0.3)' },
  amber:  { color: 'oklch(80% 0.16 60)',  bg: 'oklch(80% 0.16 60 / 0.10)',  border: 'oklch(80% 0.16 60 / 0.3)'  },
  danger: { color: 'oklch(70% 0.18 25)',  bg: 'oklch(70% 0.18 25 / 0.10)',  border: 'oklch(70% 0.18 25 / 0.3)'  },
}

// ── 1. Upload ──────────────────────────────────────────────────────────────
function UploadVisual() {
  const files = [
    { name: 'intro-clip.mp4', size: '4.2 MB', done: true,  hue: '165' },
    { name: 'scene-a.mp4',    size: '7.1 MB', done: true,  hue: '285' },
    { name: 'ending.mp4',     size: '2.8 MB', done: false, hue: '60'  },
  ]
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
        {/* Header bar */}
        <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="font-mono text-[8px] tracking-widest uppercase ml-2" style={{ color: 'var(--fg-4)' }}>Asset Library</span>
          </div>
          <span className="font-mono text-[9px]" style={{ color: 'oklch(82% 0.18 165)' }}>3 clips</span>
        </div>

        {/* File rows */}
        <div className="space-y-2">
          {files.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ x: -16, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.13, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Thumbnail */}
              <div
                className="w-10 h-7 rounded shrink-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, oklch(${
                    i === 0 ? '82% 0.18 165' : i === 1 ? '78% 0.18 285' : '80% 0.16 60'
                  } / 0.22) 0%, rgba(255,255,255,0.02) 100%)`,
                  border: `1px solid oklch(${
                    i === 0 ? '82% 0.18 165' : i === 1 ? '78% 0.18 285' : '80% 0.16 60'
                  } / 0.2)`,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9">
                  <polygon points="1,0.5 8.5,4.5 1,8.5" fill="rgba(255,255,255,0.55)" />
                </svg>
              </div>

              {/* Name + status */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono truncate" style={{ color: 'var(--fg-1)' }}>{f.name}</p>
                {f.done ? (
                  <p className="text-[9px] font-mono mt-0.5" style={{ color: 'var(--fg-4)' }}>{f.size}</p>
                ) : (
                  <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'oklch(82% 0.18 165)' }}
                      initial={{ width: '0%' }}
                      whileInView={{ width: '72%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1.4, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </div>

              {/* Badge */}
              {f.done ? (
                <span className="text-[9px] font-mono shrink-0" style={{ color: 'oklch(82% 0.18 165)' }}>✓</span>
              ) : (
                <motion.span
                  className="text-[9px] font-mono shrink-0"
                  style={{ color: 'var(--fg-4)' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                >
                  72%
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── 2. Map ─────────────────────────────────────────────────────────────────
function MapVisual() {
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
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        >
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
              <marker id="map-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="rgba(255,255,255,0.2)" />
              </marker>
              <marker id="map-arr-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="oklch(82% 0.18 165 / 0.85)" />
              </marker>
              <marker id="map-arr-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 Z" fill="oklch(80% 0.16 60 / 0.7)" />
              </marker>
              <filter id="map-glow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Edges */}
            <path d="M120,26 C120,52 68,52 68,76" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" markerEnd="url(#map-arr)" className="mkt-animate-edge" style={{ animationDelay: '0.15s' }} />
            <path d="M120,26 C120,52 172,52 172,76" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" markerEnd="url(#map-arr)" className="mkt-animate-edge" style={{ animationDelay: '0.3s' }} />
            <path d="M68,108 C68,130 52,130 52,140" stroke="oklch(80% 0.16 60 / 0.45)" strokeWidth="1.2" fill="none" markerEnd="url(#map-arr-amber)" className="mkt-animate-edge" style={{ animationDelay: '0.5s' }} />
            <path d="M68,108 C68,135 118,135 118,140" stroke="rgba(255,255,255,0.12)" strokeWidth="1.1" fill="none" markerEnd="url(#map-arr)" className="mkt-animate-edge" style={{ animationDelay: '0.65s' }} />
            <path d="M172,108 C172,135 138,135 138,140" stroke="oklch(82% 0.18 165 / 0.7)" strokeWidth="1.5" fill="none" markerEnd="url(#map-arr-mint)" filter="url(#map-glow)" className="mkt-animate-edge" style={{ animationDelay: '0.8s' }} />

            {/* Flowing particle on mint edge */}
            <circle r="2.2" fill="oklch(82% 0.18 165)" opacity="0.95">
              <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.2s"
                path="M172,108 C172,135 138,135 138,140" />
            </circle>
            {/* Second particle on left edge */}
            <circle r="1.5" fill="oklch(80% 0.16 60)" opacity="0.7">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s"
                path="M68,108 C68,130 52,130 52,140" />
            </circle>

            {/* START node */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              <rect x="90" y="8" width="60" height="22" rx="5"
                fill="oklch(82% 0.18 165 / 0.14)" stroke="oklch(82% 0.18 165 / 0.75)" strokeWidth="1.3" />
              <text x="120" y="22" textAnchor="middle" fill="oklch(82% 0.18 165)" fontFamily="monospace"
                fontSize="8" fontWeight="700" letterSpacing="1.8">START</text>
            </motion.g>

            {/* Scene A */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <rect x="24" y="76" width="88" height="32" rx="6"
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
              <text x="68" y="89" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6" letterSpacing="0.5">VIDEO SCENE</text>
              <text x="68" y="101" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">The Approach</text>
            </motion.g>

            {/* Scene B — selected/highlighted */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <rect x="128" y="76" width="88" height="32" rx="6"
                fill="oklch(82% 0.18 165 / 0.09)" stroke="oklch(82% 0.18 165 / 0.55)" strokeWidth="1.3" />
              <text x="172" y="89" textAnchor="middle" fill="oklch(82% 0.18 165 / 0.7)" fontFamily="monospace" fontSize="6" letterSpacing="0.5">VIDEO SCENE</text>
              <text x="172" y="101" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">The Outcome</text>
            </motion.g>

            {/* Ending A */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <rect x="16" y="140" width="74" height="22" rx="4"
                fill="oklch(80% 0.16 60 / 0.09)" stroke="oklch(80% 0.16 60 / 0.4)" strokeWidth="1" />
              <text x="53" y="154" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" letterSpacing="1">ENDING A</text>
            </motion.g>

            {/* Ending B — bright */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <rect x="100" y="140" width="80" height="22" rx="4"
                fill="oklch(80% 0.16 60 / 0.14)" stroke="oklch(80% 0.16 60 / 0.65)" strokeWidth="1.4" />
              <text x="140" y="154" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" fontWeight="700" letterSpacing="1">ENDING B</text>
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

// ── 3. Connect / Choices ───────────────────────────────────────────────────
function ChoicesVisual() {
  const choices = [
    { label: 'Speak up directly', dest: 'Scene B', accent: 'oklch(82% 0.18 165)', selected: true },
    { label: 'Ask for more time',  dest: 'Feedback', accent: 'oklch(78% 0.18 285)', selected: false },
    { label: 'Walk away',          dest: 'Ending A', accent: 'oklch(80% 0.16 60)',  selected: false },
  ]
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
        {/* Scene label */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'oklch(78% 0.18 285)' }} />
          <span className="text-[10px] font-mono" style={{ color: 'var(--fg-1)' }}>The Situation</span>
          <span className="ml-auto font-mono text-[9px]" style={{ color: 'var(--fg-4)' }}>0:42</span>
        </div>

        {/* Question */}
        <p className="text-[9px] font-mono uppercase tracking-widest mb-2.5 px-1" style={{ color: 'var(--fg-4)' }}>
          After this scene · choose a response
        </p>

        {/* Choices */}
        <div className="space-y-1.5">
          {choices.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ x: 14, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
              style={{
                background: c.selected ? `${c.accent.replace(')', ' / 0.10)')}` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${c.selected ? c.accent.replace(')', ' / 0.4)') : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              <span
                className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-mono shrink-0"
                style={{
                  background: c.selected ? c.accent.replace(')', ' / 0.2)') : 'rgba(255,255,255,0.05)',
                  color: c.selected ? c.accent : 'var(--fg-3)',
                  border: `1px solid ${c.selected ? c.accent.replace(')', ' / 0.3)') : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[10px] flex-1" style={{ color: c.selected ? 'var(--fg-0)' : 'var(--fg-2)' }}>
                {c.label}
              </span>
              <span className="font-mono text-[8px] shrink-0" style={{ color: c.accent.replace(')', ' / 0.7)') }}>
                → {c.dest}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── 4. Feedback ────────────────────────────────────────────────────────────
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
        {/* Violet header strip */}
        <div
          className="px-4 py-2.5 flex items-center gap-2"
          style={{ background: 'oklch(78% 0.18 285 / 0.12)', borderBottom: '1px solid oklch(78% 0.18 285 / 0.2)' }}
        >
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'oklch(78% 0.18 285)' }}>
            Coaching Feedback
          </span>
          <span className="ml-auto font-mono text-[9px]" style={{ color: 'var(--fg-4)' }}>After choice A</span>
        </div>

        {/* Feedback body */}
        <div className="p-4">
          <motion.p
            className="text-xs leading-relaxed mb-4"
            style={{ color: 'var(--fg-1)' }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Speaking up directly shows confidence and respect.
            This creates space for honest conversation — even when the outcome is uncertain.
          </motion.p>

          {/* Insight pills */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            {['Builds trust', 'Shows courage', 'Opens dialogue'].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono"
                style={{
                  background: 'oklch(78% 0.18 285 / 0.1)',
                  border: '1px solid oklch(78% 0.18 285 / 0.25)',
                  color: 'oklch(78% 0.18 285)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Continue button */}
          <motion.div
            className="w-full py-2.5 rounded-xl text-xs font-medium text-center"
            style={{ background: 'oklch(82% 0.18 165)', color: '#052916' }}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            Continue →
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// ── 5. Validate ────────────────────────────────────────────────────────────
function ValidateVisual() {
  const ref = useRef<HTMLDivElement>(null)
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
    { label: 'Choice without destination — "Walk Away"' },
    { label: 'Unreachable node — "Intro B"' },
  ]

  const borderColor = resolved >= 3
    ? 'oklch(82% 0.18 165 / 0.45)'
    : resolved > 0
    ? 'oklch(70% 0.18 25 / 0.3)'
    : 'oklch(70% 0.18 25 / 0.4)'

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        ref={ref}
        className="p-4 rounded-xl"
        style={{
          background: 'rgba(8,9,13,0.7)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          border: `1px solid ${borderColor}`,
          transition: 'border-color 0.8s ease',
        }}
        initial={{ rotateX: 10, rotateY: 3, opacity: 0 }}
        whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
            Validation
          </span>
          <motion.span
            className="font-mono text-[9px]"
            animate={{ color: resolved >= 3 ? 'oklch(82% 0.18 165)' : 'oklch(70% 0.18 25)' }}
            transition={{ duration: 0.5 }}
          >
            {resolved >= 3 ? '✓ All clear' : `${2 - Math.min(resolved, 2)} error${resolved < 2 ? 's' : ''}`}
          </motion.span>
        </div>

        {/* Error rows */}
        <div className="space-y-1.5 mb-2">
          {errors.map((err, i) => {
            const isResolved = resolved > i
            return (
              <motion.div
                key={err.label}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                animate={{
                  background: isResolved ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
                  borderColor: isResolved ? 'rgba(255,255,255,0.06)' : 'oklch(70% 0.18 25 / 0.3)',
                  opacity: isResolved ? 0.45 : 1,
                }}
                style={{ border: '1px solid oklch(70% 0.18 25 / 0.3)' }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  animate={{ color: isResolved ? 'rgba(255,255,255,0.2)' : 'oklch(70% 0.18 25)' }}
                  transition={{ duration: 0.4 }}
                  className="text-xs shrink-0"
                >
                  ✕
                </motion.span>
                <motion.span
                  className="text-[10px]"
                  animate={{
                    color: isResolved ? 'rgba(255,255,255,0.2)' : 'var(--fg-2)',
                    textDecorationLine: isResolved ? 'line-through' : 'none',
                  }}
                  style={{ textDecorationColor: 'rgba(255,255,255,0.2)' }}
                  transition={{ duration: 0.4 }}
                >
                  {err.label}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        {/* All-clear row */}
        <motion.div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
          animate={{
            opacity: resolved >= 3 ? 1 : 0,
            y: resolved >= 3 ? 0 : 6,
            borderColor: 'oklch(82% 0.18 165 / 0.35)',
            background: 'oklch(82% 0.18 165 / 0.07)',
          }}
          initial={{ opacity: 0, y: 6 }}
          style={{ border: '1px solid oklch(82% 0.18 165 / 0.15)' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs shrink-0" style={{ color: 'oklch(82% 0.18 165)' }}>✓</span>
          <span className="text-[10px]" style={{ color: 'oklch(82% 0.18 165)' }}>
            No blocking errors · ready to publish
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── 6. Publish ─────────────────────────────────────────────────────────────
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
        {/* Broadcast rings + URL */}
        <div className="relative flex items-center justify-center mb-5" style={{ height: 80 }}>
          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 56,
                height: 56,
                border: '1px solid oklch(82% 0.18 165)',
              }}
              animate={{ scale: [1, 3.2], opacity: [0.35, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Center dot */}
          <motion.div
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'oklch(82% 0.18 165 / 0.15)',
              border: '1.5px solid oklch(82% 0.18 165 / 0.6)',
              boxShadow: '0 0 24px oklch(82% 0.18 165 / 0.25)',
            }}
            animate={{ boxShadow: ['0 0 24px oklch(82% 0.18 165 / 0.2)', '0 0 40px oklch(82% 0.18 165 / 0.4)', '0 0 24px oklch(82% 0.18 165 / 0.2)'] }}
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
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid oklch(82% 0.18 165 / 0.35)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4" stroke="oklch(82% 0.18 165 / 0.6)" strokeWidth="1" />
            <path d="M1 5 Q5 1 9 5 Q5 9 1 5" stroke="oklch(82% 0.18 165 / 0.6)" strokeWidth="0.8" fill="none" />
          </svg>
          <span className="font-mono text-[9px]" style={{ color: 'var(--fg-3)' }}>branchlab.app/play/</span>
          <span className="font-mono text-[10px] font-medium" style={{ color: 'oklch(82% 0.18 165)' }}>tough-talk-x7</span>
        </motion.div>

        {/* Publish button */}
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

// ── Lookup table ───────────────────────────────────────────────────────────
const VISUALS: Record<string, React.FC> = {
  upload:   UploadVisual,
  map:      MapVisual,
  choices:  ChoicesVisual,
  feedback: FeedbackVisual,
  validate: ValidateVisual,
  publish:  PublishVisual,
}

// ── Section ────────────────────────────────────────────────────────────────
export default function ProductLoopSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 overflow-hidden"
      aria-labelledby="loop-headline"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 20% 50%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--neon-mint)' }}
          >
            How it works
          </motion.span>
          <motion.h2
            id="loop-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            From clips to choices
            <br />
            <span style={{ color: 'var(--fg-2)' }}>to outcomes.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {productSteps.map((step, i) => {
            const accent = accentColors[step.accent as AccentKey]
            const VisualComponent = VISUALS[step.id]
            return (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                accent={accent}
                visual={<VisualComponent />}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  index,
  accent,
  visual,
}: {
  step: (typeof productSteps)[0]
  index: number
  accent: AccentValues
  visual: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 rounded-2xl border ${
        index % 2 === 1 ? 'lg:grid-flow-col' : ''
      }`}
      style={{
        background: 'rgba(12,14,20,0.5)',
        borderColor: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Text */}
      <div className={`space-y-3 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
            style={{ color: accent.color, background: accent.bg, borderColor: accent.border }}
          >
            {step.eyebrow}
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-[-0.015em]">{step.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
          {step.description}
        </p>
      </div>

      {/* Visual */}
      <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
        {visual}
      </div>
    </motion.div>
  )
}
