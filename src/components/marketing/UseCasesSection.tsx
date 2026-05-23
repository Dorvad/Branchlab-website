'use client'

import { motion } from 'framer-motion'
import { useCases } from './marketing-data'

const accentMap = {
  mint:   { color: 'oklch(82% 0.18 165)', border: 'oklch(82% 0.18 165 / 0.18)' },
  violet: { color: 'oklch(78% 0.18 285)', border: 'oklch(78% 0.18 285 / 0.18)' },
  amber:  { color: 'oklch(80% 0.16 60)',  border: 'oklch(80% 0.16 60 / 0.18)'  },
  danger: { color: 'oklch(70% 0.18 25)',  border: 'oklch(70% 0.18 25 / 0.18)'  },
}

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="relative py-32 overflow-hidden"
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
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
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

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Use cases"
        >
          {useCases.slice(0, 6).map((uc, i) => {
            const accent = accentMap[uc.accent]
            return (
              <motion.div
                key={uc.id}
                role="listitem"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="relative p-7 rounded-2xl border flex flex-col gap-4"
                style={{
                  background: 'rgba(12,14,20,0.5)',
                  borderColor: accent.border,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Accent dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: accent.color }}
                />

                <div>
                  <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                    {uc.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
