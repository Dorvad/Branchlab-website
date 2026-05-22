'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="how-it-works"
      className="relative py-28 overflow-hidden"
      aria-labelledby="problem-headline"
    >
      {/* Subtle radial */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 800px 400px at 50% 100%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%)',
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
            The problem
          </motion.span>
          <motion.h2
            id="problem-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            Linear video stops where
            <br />
            <span style={{ color: 'var(--fg-2)' }}>learning should begin.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base leading-relaxed"
            style={{ color: 'var(--fg-2)' }}
          >
            A video can show a difficult conversation, a customer escalation, or a leadership
            dilemma. But real learning begins when the viewer has to decide what to do next.
            BranchLab adds the missing logic layer.
          </motion.p>
        </div>

        {/* Split visual */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left: linear video */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: 'rgba(12,14,20,0.7)',
              borderColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
                Traditional video
              </span>
              <span
                className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                style={{
                  color: 'oklch(70% 0.18 25)',
                  borderColor: 'oklch(70% 0.18 25 / 0.3)',
                  background: 'oklch(70% 0.18 25 / 0.08)',
                }}
              >
                Linear only
              </span>
            </div>
            <div className="p-6 space-y-4">
              {/* Linear timeline */}
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--fg-4)' }}>
                Playback timeline
              </p>
              <div className="relative flex items-center gap-0">
                {[
                  { label: 'Intro', done: true },
                  { label: 'Scene', done: true },
                  { label: 'Scene', done: true },
                  { label: 'END', done: false, dead: true },
                ].map((step, i) => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div
                      className="w-16 h-10 rounded-md flex items-center justify-center text-[10px] font-mono shrink-0"
                      style={{
                        background: step.dead
                          ? 'oklch(70% 0.18 25 / 0.10)'
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${step.dead ? 'oklch(70% 0.18 25 / 0.4)' : 'rgba(255,255,255,0.1)'}`,
                        color: step.dead ? 'oklch(70% 0.18 25)' : 'var(--fg-2)',
                      }}
                    >
                      {step.label}
                    </div>
                    {i < 3 && (
                      <div
                        className="flex-1 h-px mx-1"
                        style={{ background: i < 2 ? 'rgba(255,255,255,0.15)' : 'oklch(70% 0.18 25 / 0.4)' }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'var(--fg-3)' }}>
                The viewer watches. The video ends. There&apos;s nothing left to do.
              </p>

              <div
                className="mt-4 p-4 rounded-xl border"
                style={{
                  background: 'oklch(70% 0.18 25 / 0.06)',
                  borderColor: 'oklch(70% 0.18 25 / 0.2)',
                }}
              >
                <p className="text-sm font-medium" style={{ color: 'oklch(70% 0.18 25)' }}>
                  No decision moment
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--fg-3)' }}>
                  The learner observes but never chooses. Passive watching rarely builds judgment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: branching */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: 'rgba(12,14,20,0.7)',
              borderColor: 'oklch(82% 0.18 165 / 0.2)',
            }}
          >
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
                BranchLab scenario
              </span>
              <span
                className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                style={{
                  color: 'oklch(82% 0.18 165)',
                  borderColor: 'oklch(82% 0.18 165 / 0.3)',
                  background: 'oklch(82% 0.18 165 / 0.08)',
                }}
              >
                Decision-based
              </span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--fg-4)' }}>
                Branching scenario map
              </p>

              {/* Mini branching graph */}
              <div className="flex flex-col items-center gap-3">
                {/* Start */}
                <div
                  className="px-4 py-2 rounded-lg font-mono text-[10px] tracking-widest uppercase"
                  style={{
                    background: 'oklch(82% 0.18 165 / 0.12)',
                    border: '1px solid oklch(82% 0.18 165 / 0.5)',
                    color: 'oklch(82% 0.18 165)',
                  }}
                >
                  SCENE · The Situation
                </div>
                {/* Branch indicator */}
                <div className="relative w-full flex justify-center">
                  <svg viewBox="0 0 240 40" className="w-full max-w-xs h-10" aria-hidden="true">
                    <line x1="120" y1="0" x2="60" y2="40" stroke="oklch(82% 0.18 165 / 0.4)" strokeWidth="1.5" />
                    <line x1="120" y1="0" x2="180" y2="40" stroke="oklch(82% 0.18 165 / 0.4)" strokeWidth="1.5" />
                    <text x="82" y="22" textAnchor="middle" fill="oklch(82% 0.18 165)" fontFamily="monospace" fontSize="7">A</text>
                    <text x="158" y="22" textAnchor="middle" fill="oklch(82% 0.18 165)" fontFamily="monospace" fontSize="7">B</text>
                  </svg>
                </div>
                {/* Choices */}
                <div className="w-full grid grid-cols-2 gap-2">
                  {[
                    { label: 'Speak up directly', dest: 'FEEDBACK', accent: 'violet' },
                    { label: 'Ask for more time', dest: 'SCENE', accent: 'mint' },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="p-2 rounded-lg text-xs"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        color: 'var(--fg-1)',
                      }}
                    >
                      <div className="font-medium">{c.label}</div>
                      <div
                        className="mt-0.5 font-mono text-[9px] tracking-wide"
                        style={{
                          color:
                            c.accent === 'violet'
                              ? 'oklch(78% 0.18 285)'
                              : 'oklch(82% 0.18 165)',
                        }}
                      >
                        → {c.dest}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="mt-4 p-4 rounded-xl border"
                style={{
                  background: 'oklch(82% 0.18 165 / 0.05)',
                  borderColor: 'oklch(82% 0.18 165 / 0.2)',
                }}
              >
                <p className="text-sm font-medium" style={{ color: 'oklch(82% 0.18 165)' }}>
                  Every scene leads to a decision
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--fg-3)' }}>
                  The learner chooses, sees consequences, and navigates to a meaningful outcome.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key point */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12 text-sm max-w-xl mx-auto"
          style={{ color: 'var(--fg-3)' }}
        >
          BranchLab adds the missing logic layer: scenes, choices, feedback, endings, and a visual map
          that keeps the whole experience understandable — before and after you share it.
        </motion.p>
      </div>
    </section>
  )
}
