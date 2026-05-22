'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { productSteps } from './marketing-data'

const accentColors = {
  mint:   { color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.10)', border: 'oklch(82% 0.18 165 / 0.3)' },
  violet: { color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.10)', border: 'oklch(78% 0.18 285 / 0.3)' },
  amber:  { color: 'oklch(80% 0.16 60)',  bg: 'oklch(80% 0.16 60 / 0.10)',  border: 'oklch(80% 0.16 60 / 0.3)'  },
  danger: { color: 'oklch(70% 0.18 25)',  bg: 'oklch(70% 0.18 25 / 0.10)',  border: 'oklch(70% 0.18 25 / 0.3)'  },
}

const stepVisuals: Record<string, React.ReactNode> = {
  upload: (
    <div className="space-y-1.5">
      {['intro-clip.mp4', 'scene-a.mp4', 'ending.mp4'].map((f, i) => (
        <div
          key={f}
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="w-8 h-6 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="text-[10px] font-mono" style={{ color: 'var(--fg-2)' }}>{f}</span>
          <span
            className="ml-auto text-[9px] font-mono"
            style={{ color: i < 2 ? 'oklch(82% 0.18 165)' : 'var(--fg-4)' }}
          >
            {i < 2 ? '✓ ready' : 'uploading…'}
          </span>
        </div>
      ))}
    </div>
  ),
  map: (
    <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
      <rect x="80" y="4" width="40" height="22" rx="5" fill="oklch(82% 0.18 165 / 0.15)" stroke="oklch(82% 0.18 165 / 0.5)" strokeWidth="1" />
      <text x="100" y="18" textAnchor="middle" fill="oklch(82% 0.18 165)" fontFamily="monospace" fontSize="7" letterSpacing="1">START</text>
      <line x1="100" y1="26" x2="55" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="100" y1="26" x2="145" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="25" y="50" width="60" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="55" y="70" textAnchor="middle" fill="var(--fg-1)" fontSize="8">Scene A</text>
      <rect x="115" y="50" width="60" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="145" y="70" textAnchor="middle" fill="var(--fg-1)" fontSize="8">Scene B</text>
    </svg>
  ),
  choices: (
    <div className="space-y-1.5">
      <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--fg-4)' }}>
        After scene: The Situation
      </p>
      {['Speak up directly → Scene B', 'Ask for more time → Feedback', 'Walk away → Ending A'].map((c, i) => (
        <div
          key={c}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px]"
          style={{
            background: i === 1 ? 'oklch(78% 0.18 285 / 0.07)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${i === 1 ? 'oklch(78% 0.18 285 / 0.3)' : 'rgba(255,255,255,0.07)'}`,
            color: 'var(--fg-2)',
          }}
        >
          <span
            className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] font-mono shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--fg-3)' }}
          >
            {String.fromCharCode(65 + i)}
          </span>
          {c}
        </div>
      ))}
    </div>
  ),
  feedback: (
    <div
      className="p-3 rounded-xl"
      style={{
        background: 'oklch(78% 0.18 285 / 0.08)',
        border: '1px solid oklch(78% 0.18 285 / 0.3)',
      }}
    >
      <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'oklch(78% 0.18 285)' }}>
        Feedback · After choice A
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-1)' }}>
        Speaking up directly shows confidence and respect. This builds trust with the team even when the outcome is uncertain.
      </p>
    </div>
  ),
  validate: (
    <div className="space-y-1.5">
      {[
        { label: 'Missing video clip', type: 'error', resolved: true },
        { label: 'Choice without destination', type: 'error', resolved: true },
        { label: 'No blocking errors', type: 'ok', resolved: true },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px]"
          style={{
            background:
              item.type === 'ok'
                ? 'oklch(82% 0.18 165 / 0.08)'
                : 'rgba(255,255,255,0.03)',
            border: `1px solid ${
              item.type === 'ok'
                ? 'oklch(82% 0.18 165 / 0.3)'
                : 'rgba(255,255,255,0.07)'
            }`,
          }}
        >
          <span
            style={{
              color:
                item.type === 'ok'
                  ? 'oklch(82% 0.18 165)'
                  : 'oklch(70% 0.18 25)',
            }}
          >
            {item.type === 'ok' ? '✓' : '✕'}
          </span>
          <span style={{ color: item.type === 'ok' ? 'oklch(82% 0.18 165)' : 'var(--fg-3)', textDecoration: item.resolved && item.type !== 'ok' ? 'line-through' : 'none' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  ),
  publish: (
    <div className="space-y-3">
      <div
        className="px-3 py-2 rounded-lg flex items-center gap-2"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span className="text-[9px] font-mono" style={{ color: 'var(--fg-3)' }}>branchlab.app/play/</span>
        <span className="text-[10px] font-mono font-medium" style={{ color: 'var(--fg-1)' }}>tough-talk-x7</span>
      </div>
      <div
        className="px-4 py-2.5 rounded-xl text-center text-xs font-medium mkt-url-pulse"
        style={{
          background: 'oklch(82% 0.18 165)',
          color: '#052916',
        }}
      >
        Publish scenario
      </div>
    </div>
  ),
}

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
            const accent = accentColors[step.accent]
            return <StepCard key={step.id} step={step} index={i} accent={accent} visual={stepVisuals[step.id]} />
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
  accent: { color: string; bg: string; border: string }
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
      <div
        className={`p-4 rounded-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}
        style={{
          background: 'rgba(8,9,13,0.5)',
          border: `1px solid ${accent.border}`,
        }}
      >
        {visual}
      </div>
    </motion.div>
  )
}
