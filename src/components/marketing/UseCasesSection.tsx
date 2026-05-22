'use client'

import { motion } from 'framer-motion'
import { useCases } from './marketing-data'

const accentMap = {
  mint:   { color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.08)', border: 'oklch(82% 0.18 165 / 0.2)' },
  violet: { color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.08)', border: 'oklch(78% 0.18 285 / 0.2)' },
  amber:  { color: 'oklch(80% 0.16 60)',  bg: 'oklch(80% 0.16 60 / 0.08)',  border: 'oklch(80% 0.16 60 / 0.2)'  },
  danger: { color: 'oklch(70% 0.18 25)',  bg: 'oklch(70% 0.18 25 / 0.08)',  border: 'oklch(70% 0.18 25 / 0.2)'  },
}

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="relative py-28 overflow-hidden"
      aria-labelledby="usecases-headline"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 80% 50%, oklch(78% 0.18 285 / 0.04) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--neon-mint)' }}
          >
            Use cases
          </motion.span>
          <motion.h2
            id="usecases-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            Decision-based learning
            <br />
            <span style={{ color: 'var(--fg-2)' }}>across every context.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base"
            style={{ color: 'var(--fg-2)' }}
          >
            BranchLab works wherever judgment, communication, or decision-making needs to be practiced.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Use cases"
        >
          {useCases.map((uc, i) => {
            const accent = accentMap[uc.accent]
            return (
              <motion.article
                key={uc.id}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="group p-5 rounded-2xl border flex flex-col gap-3 transition-all hover:scale-[1.01]"
                style={{
                  background: 'rgba(12,14,20,0.6)',
                  borderColor: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent.border
                  e.currentTarget.style.background = accent.bg
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(12,14,20,0.6)'
                }}
              >
                {/* Mini branching preview */}
                <MiniBranchPreview choices={uc.choices} accent={accent.color} />

                {/* Content */}
                <div>
                  <h3 className="text-sm font-semibold mb-1">{uc.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                    {uc.description}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MiniBranchPreview({ choices, accent }: { choices: string[]; accent: string }) {
  return (
    <div
      className="rounded-xl p-3 w-full"
      style={{ background: 'rgba(8,9,13,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 64" className="w-full">
        {/* Root */}
        <rect x="40" y="2" width="40" height="16" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
        <text x="60" y="13" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5">SCENE</text>

        {/* Branch lines */}
        {choices.slice(0, 3).map((_, i) => {
          const total = Math.min(choices.length, 3)
          const startX = 60
          const endX = total === 1 ? 60 : total === 2 ? [30, 90][i] : [20, 60, 100][i]
          const endY = 46
          return (
            <line
              key={i}
              x1={startX} y1="18" x2={endX} y2={endY}
              stroke={accent}
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />
          )
        })}

        {/* Choices */}
        {choices.slice(0, 3).map((choice, i) => {
          const total = Math.min(choices.length, 3)
          const cx = total === 1 ? 60 : total === 2 ? [30, 90][i] : [20, 60, 100][i]
          const short = choice.length > 10 ? choice.slice(0, 10) + '…' : choice
          return (
            <g key={i}>
              <rect x={cx - 16} y="46" width="32" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke={accent} strokeOpacity="0.3" strokeWidth="0.7" />
              <text x={cx} y="56" textAnchor="middle" fill="var(--fg-2)" fontFamily="sans-serif" fontSize="4.5">{short}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
