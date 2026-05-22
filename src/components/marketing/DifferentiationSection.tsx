'use client'

import { motion } from 'framer-motion'
import { differentiators } from './marketing-data'
import TiltCard from './TiltCard'

export default function DifferentiationSection() {
  return (
    <section
      id="why-branchlab"
      className="relative py-28 overflow-hidden"
      aria-labelledby="diff-headline"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 600px 600px at 50% 50%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 400px 300px at 80% 20%, oklch(78% 0.18 285 / 0.04) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--neon-mint)' }}
          >
            Why BranchLab
          </motion.span>
          <motion.h2
            id="diff-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            Focused enough to stay simple.
            <br />
            <span style={{ color: 'var(--fg-2)' }}>Powerful enough to create real simulations.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base leading-relaxed"
            style={{ color: 'var(--fg-2)' }}
          >
            BranchLab sits in a unique position: more interactive than a video platform, more visual
            than a form builder, lighter than an enterprise simulator, and more specialized than a
            generic LMS tool.
          </motion.p>
        </div>

        {/* Positioning constellation */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ width: 520, height: 420 }}
            aria-label="BranchLab positioning diagram showing its unique place among related tools"
          >
            {/* Center glow */}
            <div
              className="absolute rounded-full blur-3xl"
              style={{
                width: 180,
                height: 180,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'oklch(82% 0.18 165 / 0.12)',
              }}
              aria-hidden="true"
            />

            {/* Orbital lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 520 420"
              aria-hidden="true"
            >
              <ellipse
                cx="260" cy="210"
                rx="200" ry="160"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                strokeDasharray="8 6"
              />
              {/* Lines from center to each node */}
              {[
                { x: 260, y: 50 },   // top
                { x: 460, y: 130 },  // top-right
                { x: 460, y: 290 },  // bottom-right
                { x: 260, y: 370 },  // bottom
                { x: 60, y: 210 },   // left
              ].map((pos, i) => (
                <line
                  key={i}
                  x1="260" y1="210"
                  x2={pos.x} y2={pos.y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {/* BranchLab center */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            >
              <div
                className="px-5 py-3 rounded-2xl text-center"
                style={{
                  background: 'rgba(12,14,20,0.95)',
                  border: '1.5px solid oklch(82% 0.18 165 / 0.6)',
                  boxShadow: '0 0 40px oklch(82% 0.18 165 / 0.2)',
                  minWidth: 120,
                }}
              >
                <BranchLabIconSmall />
                <p className="text-sm font-semibold mt-1" style={{ color: 'oklch(82% 0.18 165)' }}>
                  BranchLab
                </p>
                <p className="text-[9px] font-mono mt-0.5" style={{ color: 'var(--fg-3)' }}>
                  Video simulations
                </p>
              </div>
            </div>

            {/* Surrounding nodes */}
            {[
              { label: 'Game engine', description: 'Requires coding', x: 210, y: -8 },
              { label: 'Video platform', description: 'Linear only', x: 420, y: 72 },
              { label: 'Enterprise sim', description: 'Expensive & slow', x: 420, y: 232 },
              { label: 'Generic LMS', description: 'Heavy & complex', x: 210, y: 312 },
              { label: 'Form / survey', description: 'Text-only', x: -2, y: 152 },
            ].map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                className="absolute"
                style={{ left: node.x, top: node.y }}
              >
                <div
                  className="px-3 py-2 rounded-xl text-center"
                  style={{
                    background: 'rgba(12,14,20,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    minWidth: 96,
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: 'var(--fg-2)' }}>{node.label}</p>
                  <p className="text-[9px] font-mono mt-0.5" style={{ color: 'var(--fg-4)' }}>{node.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: 'Simpler than a game engine',
              desc: 'No code. No 3D assets. No production pipeline. Upload clips, wire choices, publish.',
              vs: 'Game engine',
              accent: 'mint' as const,
            },
            {
              label: 'More interactive than a video platform',
              desc: 'Video platforms host and play. BranchLab lets learners choose what happens next.',
              vs: 'Video platform',
              accent: 'violet' as const,
            },
            {
              label: 'More visual than a form builder',
              desc: 'Survey tools branch text. BranchLab maps a full visual scenario with media attached to every node.',
              vs: 'Form / survey builder',
              accent: 'amber' as const,
            },
            {
              label: 'More specialized than an LMS',
              desc: 'Generic LMS tools try to do everything. BranchLab is purpose-built for video-based decision simulations.',
              vs: 'Generic LMS tool',
              accent: 'mint' as const,
            },
            {
              label: 'Faster than enterprise tools',
              desc: 'Enterprise simulators require specialist teams and months. BranchLab is designed for creators, not vendors.',
              vs: 'Enterprise sim tools',
              accent: 'amber' as const,
            },
            {
              label: 'Built for the creator workflow',
              desc: 'Upload → Map → Connect → Validate → Publish. The full loop from clip to shareable URL.',
              vs: 'The competition',
              accent: 'violet' as const,
            },
          ].map((card, i) => {
            const colors = {
              mint: 'oklch(82% 0.18 165)',
              violet: 'oklch(78% 0.18 285)',
              amber: 'oklch(80% 0.16 60)',
            }
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <TiltCard
                  maxTilt={5}
                  className="relative p-5 rounded-2xl border h-full cursor-default"
                  style={{
                    background: 'rgba(12,14,20,0.5)',
                    borderColor: `${colors[card.accent]}22`,
                  }}
                >
                  <span
                    className="inline-block font-mono text-[9px] tracking-widest uppercase mb-3 px-2 py-0.5 rounded-full border"
                    style={{
                      color: colors[card.accent],
                      borderColor: `${colors[card.accent]}33`,
                      background: `${colors[card.accent]}10`,
                    }}
                  >
                    vs {card.vs}
                  </span>
                  <h3 className="text-sm font-semibold mb-2">{card.label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                    {card.desc}
                  </p>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BranchLabIconSmall() {
  return (
    <svg width="20" height="20" viewBox="0 0 44 44" fill="none" className="mx-auto" aria-hidden="true">
      <circle cx="10" cy="22" r="6" fill="oklch(82% 0.18 165)" />
      <circle cx="36" cy="10" r="5" fill="oklch(78% 0.18 285)" />
      <circle cx="36" cy="34" r="5" fill="oklch(80% 0.16 60)" />
      <path d="M15 20 L31 12 M15 24 L31 32" stroke="white" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
