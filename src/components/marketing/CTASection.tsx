'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function CTASection() {
  return (
    <section
      id="start"
      className="relative py-32 overflow-hidden"
      aria-labelledby="cta-headline"
    >
      {/* Background radials */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 700px 500px at 50% 50%, oklch(82% 0.18 165 / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 400px 300px at 20% 30%, oklch(78% 0.18 285 / 0.06) 0%, transparent 55%),
            radial-gradient(ellipse 400px 300px at 80% 70%, oklch(80% 0.16 60 / 0.06) 0%, transparent 55%)
          `,
        }}
      />
      <div className="pointer-events-none absolute inset-0 mkt-dot-grid opacity-20" aria-hidden="true" />

      {/* Horizontal separator line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
        style={{
          width: '80%',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full mkt-dot-blink"
              style={{ background: 'var(--neon-mint)' }}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--fg-3)' }}>
              Ready when you are
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="cta-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-[48px] sm:text-[64px] font-semibold leading-[0.95] tracking-[-0.03em] mb-6"
        >
          Build the scene.{' '}
          <span style={{ color: 'var(--neon-mint)', textShadow: '0 0 40px oklch(82% 0.18 165 / 0.4)' }}>
            Branch the choice.
          </span>
          <br />
          Play the outcome.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'var(--fg-2)' }}
        >
          Create interactive video scenarios learners can actually experience.
          Upload clips, connect choices, and publish a shareable link in minutes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            href="https://www.branchlab.online"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium transition-all hover:brightness-110 active:scale-95"
            style={{
              background: 'var(--neon-mint)',
              color: '#052916',
              boxShadow: '0 0 40px oklch(82% 0.18 165 / 0.4)',
            }}
          >
            Start building
            <ArrowRight size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium border transition-all hover:bg-white/5 active:scale-95"
            style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'var(--fg-1)' }}
          >
            <Play size={14} fill="currentColor" />
            See the product flow
          </a>
        </motion.div>

        {/* Glowing URL card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl mkt-url-pulse mx-auto"
          style={{
            background: 'rgba(8,9,13,0.9)',
            border: '1px solid oklch(82% 0.18 165 / 0.3)',
          }}
          aria-label="Example published scenario URL"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: 'oklch(82% 0.18 165 / 0.12)',
                border: '1px solid oklch(82% 0.18 165 / 0.3)',
              }}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 44 44" fill="none">
                <circle cx="10" cy="22" r="6" fill="oklch(82% 0.18 165)" />
                <circle cx="36" cy="10" r="5" fill="oklch(78% 0.18 285)" />
                <circle cx="36" cy="34" r="5" fill="oklch(80% 0.16 60)" />
                <path d="M15 20 L31 12 M15 24 L31 32" stroke="white" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-mono text-[11px]" style={{ color: 'var(--fg-3)' }}>branchlab.app/play/</p>
              <p className="font-mono text-sm font-medium" style={{ color: 'oklch(82% 0.18 165)' }}>
                tough-talk-x7
              </p>
            </div>
          </div>
          <div
            className="h-px sm:h-8 w-full sm:w-px"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            aria-hidden="true"
          />
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
              style={{
                color: 'oklch(82% 0.18 165)',
                borderColor: 'oklch(82% 0.18 165 / 0.35)',
                background: 'oklch(82% 0.18 165 / 0.08)',
              }}
            >
              PUBLISHED
            </span>
            <span className="text-xs" style={{ color: 'var(--fg-3)' }}>
              6 scenes · 2 endings · public
            </span>
          </div>
        </motion.div>

        {/* Caveat annotation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-base"
          style={{
            fontFamily: 'var(--font-caveat)',
            color: 'var(--fg-4)',
            transform: 'rotate(-1.5deg)',
          }}
          aria-hidden="true"
        >
          your scenario · shareable in one click
        </motion.p>
      </div>
    </section>
  )
}
