'use client'

import { motion } from 'framer-motion'
import { futureFeatures } from './marketing-data'

const statusLabels = {
  soon: { label: 'Coming soon', color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.08)', border: 'oklch(82% 0.18 165 / 0.25)' },
  planned: { label: 'Planned', color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.08)', border: 'oklch(78% 0.18 285 / 0.25)' },
  later: { label: 'Later', color: 'var(--fg-3)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)' },
}

export default function FutureSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      aria-labelledby="future-headline"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--neon-violet)' }}
            >
              What&apos;s next
            </motion.span>
            <motion.h2
              id="future-headline"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]"
            >
              Already built for the core loop.
              <br />
              <span style={{ color: 'var(--fg-2)' }}>Expanding from there.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--fg-2)' }}
            >
              The product is centered on the core workflow: create a scenario, upload clips, connect
              choices, validate the structure, publish, and share a playable link. Everything else
              builds on top of that foundation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: 'var(--fg-3)',
              }}
            >
              <span
                className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                style={{ background: 'oklch(82% 0.18 165 / 0.1)', color: 'oklch(82% 0.18 165)' }}
              >
                LIVE NOW
              </span>
              Upload → Map → Connect → Validate → Publish → Play
            </motion.div>
          </div>

          {/* Right: feature roadmap */}
          <div>
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(8,9,13,0.7)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="px-5 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
                  Roadmap
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {futureFeatures.map((feature, i) => {
                  const status = statusLabels[feature.status]
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      className="flex items-center justify-between px-5 py-3.5"
                    >
                      <span className="text-sm" style={{ color: 'var(--fg-1)' }}>
                        {feature.title}
                      </span>
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border shrink-0"
                        style={{
                          color: status.color,
                          background: status.bg,
                          borderColor: status.border,
                        }}
                      >
                        {status.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
