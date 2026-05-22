'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { featurePills } from './marketing-data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section
      id="product"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Background radials */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 900px 600px at 80% -10%, oklch(78% 0.18 285 / 0.10) 0%, transparent 60%),
            radial-gradient(ellipse 700px 500px at -10% 80%, oklch(82% 0.18 165 / 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 500px 400px at 50% 50%, oklch(82% 0.18 165 / 0.03) 0%, transparent 70%)
          `,
        }}
      />
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 mkt-dot-grid opacity-40" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Left — copy */}
        <div className="space-y-8">
          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
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
              Interactive video simulations
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-headline"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[52px] sm:text-[64px] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            Turn video clips into{' '}
            <em
              className="not-italic font-medium"
              style={{ color: 'var(--neon-mint)', textShadow: '0 0 40px oklch(82% 0.18 165 / 0.4)' }}
            >
              branching
            </em>{' '}
            simulations.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: 'var(--fg-2)' }}
          >
            BranchLab gives trainers, educators, facilitators, and creators a visual way to
            build interactive video scenarios where every choice can lead to a different outcome.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/auth"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'var(--neon-mint)',
                color: '#052916',
                boxShadow: 'var(--glow-mint)',
              }}
            >
              Start building
              <ArrowRight size={15} />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border transition-all hover:bg-white/5 active:scale-95"
              style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--fg-1)' }}
            >
              <Play size={13} fill="currentColor" />
              See how it works
            </a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Key features"
          >
            {featurePills.map((pill) => (
              <span
                key={pill.id}
                role="listitem"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--fg-2)',
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: 'var(--neon-mint)' }}
                  aria-hidden="true"
                />
                {pill.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — animated graph visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
          aria-hidden="true"
        >
          <BranchingHeroVisual />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

function BranchingHeroVisual() {
  return (
    <div
      className="relative rounded-2xl border overflow-hidden"
      style={{
        background: 'rgba(12,14,20,0.8)',
        borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <span
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--fg-4)' }}
        >
          SCENARIO · tough-talk-x7
        </span>
        <StatusPill label="PUBLISHED" accent="mint" />
      </div>

      {/* Graph */}
      <div className="p-4 mkt-dot-grid" style={{ minHeight: 440 }}>
        <svg
          viewBox="0 0 480 420"
          className="w-full"
          style={{ maxHeight: 420 }}
          role="img"
          aria-label="Branching scenario graph showing nodes and connections"
        >
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto"
            >
              <path d="M0,1 L9,5 L0,9 Z" fill="rgba(255,255,255,0.25)" />
            </marker>
            <marker
              id="arrowhead-mint"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto"
            >
              <path d="M0,1 L9,5 L0,9 Z" fill="oklch(82% 0.18 165 / 0.8)" />
            </marker>
            <filter id="glow-mint">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-violet">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === EDGES === */}
          {/* START → SCENE A */}
          <path
            d="M240,68 C240,110 140,110 140,148"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="mkt-animate-edge"
            style={{ animationDelay: '0.2s' }}
          />
          {/* START → SCENE B */}
          <path
            d="M240,68 C240,110 340,110 340,148"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="mkt-animate-edge"
            style={{ animationDelay: '0.4s' }}
          />
          {/* SCENE A → FEEDBACK */}
          <path
            d="M140,212 C140,248 80,248 80,280"
            stroke="oklch(78% 0.18 285 / 0.5)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 4"
            markerEnd="url(#arrowhead)"
            className="mkt-animate-edge"
            style={{ animationDelay: '0.7s' }}
          />
          {/* SCENE A → ENDING A */}
          <path
            d="M140,212 C140,248 200,248 200,280"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="mkt-animate-edge"
            style={{ animationDelay: '0.9s' }}
          />
          {/* SCENE B → SCENE C */}
          <path
            d="M340,212 C340,248 340,248 340,280"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="mkt-animate-edge"
            style={{ animationDelay: '1.0s' }}
          />
          {/* FEEDBACK → END B */}
          <path
            d="M80,344 C80,370 160,370 200,370"
            stroke="oklch(78% 0.18 285 / 0.4)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 4"
            markerEnd="url(#arrowhead)"
            className="mkt-animate-edge"
            style={{ animationDelay: '1.1s' }}
          />
          {/* SCENE C → END B */}
          <path
            d="M340,344 C340,370 280,370 250,370"
            stroke="oklch(82% 0.18 165 / 0.6)"
            strokeWidth="1.8"
            fill="none"
            markerEnd="url(#arrowhead-mint)"
            filter="url(#glow-mint)"
            className="mkt-animate-edge"
            style={{ animationDelay: '1.2s' }}
          />

          {/* Moving particle on mint edge */}
          <circle r="2.5" fill="oklch(82% 0.18 165)" opacity="0.9">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              begin="1.5s"
              path="M340,344 C340,370 280,370 250,370"
            />
          </circle>
          <circle r="1.5" fill="oklch(78% 0.18 285)" opacity="0.7">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              begin="0.8s"
              path="M140,212 C140,248 80,248 80,280"
            />
          </circle>

          {/* === NODES === */}

          {/* START node */}
          <g className="mkt-glow-mint">
            <rect
              x="190" y="30" width="100" height="38"
              rx="8"
              fill="oklch(82% 0.18 165 / 0.15)"
              stroke="oklch(82% 0.18 165 / 0.7)"
              strokeWidth="1.5"
            />
            <text
              x="240" y="54"
              textAnchor="middle"
              fill="oklch(82% 0.18 165)"
              fontFamily="monospace"
              fontSize="11"
              letterSpacing="2"
              fontWeight="600"
            >
              START
            </text>
          </g>

          {/* SCENE A (selected/highlighted) */}
          <g>
            <rect
              x="90" y="148" width="100" height="64"
              rx="10"
              fill="oklch(82% 0.18 165 / 0.08)"
              stroke="oklch(82% 0.18 165 / 0.55)"
              strokeWidth="1.5"
            />
            <rect
              x="96" y="154" width="88" height="28"
              rx="5"
              fill="rgba(255,255,255,0.05)"
            />
            <text x="140" y="168" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="7" letterSpacing="1">
              VIDEO SCENE
            </text>
            <text x="140" y="195" textAnchor="middle" fill="var(--fg-1)" fontSize="11" fontWeight="600">The Approach</text>
            <text x="140" y="207" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="8">2 CHOICES</text>
          </g>

          {/* SCENE B */}
          <g>
            <rect
              x="290" y="148" width="100" height="64"
              rx="10"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <rect
              x="296" y="154" width="88" height="28"
              rx="5"
              fill="rgba(255,255,255,0.04)"
            />
            <text x="340" y="168" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="7" letterSpacing="1">
              VIDEO SCENE
            </text>
            <text x="340" y="195" textAnchor="middle" fill="var(--fg-1)" fontSize="11" fontWeight="600">The Wait</text>
            <text x="340" y="207" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="8">1 CHOICE</text>
          </g>

          {/* FEEDBACK node */}
          <g className="mkt-glow-violet">
            <rect
              x="30" y="280" width="100" height="64"
              rx="10"
              fill="oklch(78% 0.18 285 / 0.10)"
              stroke="oklch(78% 0.18 285 / 0.5)"
              strokeWidth="1.3"
              strokeDasharray="5 3"
            />
            <text x="80" y="305" textAnchor="middle" fill="oklch(78% 0.18 285)" fontFamily="monospace" fontSize="8" letterSpacing="1">
              FEEDBACK
            </text>
            <text x="80" y="323" textAnchor="middle" fill="var(--fg-1)" fontSize="11" fontWeight="600">Good effort</text>
            <text x="80" y="336" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="8">COACHING</text>
          </g>

          {/* SCENE C */}
          <g>
            <rect
              x="290" y="280" width="100" height="64"
              rx="10"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <rect
              x="296" y="286" width="88" height="28"
              rx="5"
              fill="rgba(255,255,255,0.04)"
            />
            <text x="340" y="300" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="7" letterSpacing="1">
              VIDEO SCENE
            </text>
            <text x="340" y="327" textAnchor="middle" fill="var(--fg-1)" fontSize="11" fontWeight="600">The Outcome</text>
            <text x="340" y="339" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="8">1 CHOICE</text>
          </g>

          {/* ENDING A */}
          <g>
            <rect
              x="150" y="280" width="100" height="42"
              rx="8"
              fill="oklch(80% 0.16 60 / 0.10)"
              stroke="oklch(80% 0.16 60 / 0.4)"
              strokeWidth="1.2"
            />
            <text x="200" y="305" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="9" letterSpacing="2">
              ENDING A
            </text>
          </g>

          {/* ENDING B (final destination, glowing) */}
          <g className="mkt-glow-amber">
            <rect
              x="160" y="352" width="120" height="42"
              rx="8"
              fill="oklch(80% 0.16 60 / 0.14)"
              stroke="oklch(80% 0.16 60 / 0.65)"
              strokeWidth="1.5"
            />
            <text x="220" y="377" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="9" letterSpacing="2" fontWeight="600">
              ENDING B
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom status bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(8,9,13,0.5)',
        }}
      >
        <div className="flex items-center gap-3">
          <StatChip label="6 scenes" />
          <StatChip label="2 endings" />
          <StatChip label="0 errors" accent="mint" />
        </div>
        <PublishedURL />
      </div>
    </div>
  )
}

function StatusPill({ label, accent }: { label: string; accent: 'mint' | 'violet' | 'amber' }) {
  const colors = {
    mint: { bg: 'oklch(82% 0.18 165 / 0.12)', color: 'oklch(82% 0.18 165)', border: 'oklch(82% 0.18 165 / 0.3)' },
    violet: { bg: 'oklch(78% 0.18 285 / 0.12)', color: 'oklch(78% 0.18 285)', border: 'oklch(78% 0.18 285 / 0.3)' },
    amber: { bg: 'oklch(80% 0.16 60 / 0.12)', color: 'oklch(80% 0.16 60)', border: 'oklch(80% 0.16 60 / 0.3)' },
  }
  const c = colors[accent]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] tracking-widest uppercase border"
      style={{ background: c.bg, color: c.color, borderColor: c.border }}
    >
      <span className="w-1 h-1 rounded-full mkt-dot-blink" style={{ background: c.color }} />
      {label}
    </span>
  )
}

function StatChip({ label, accent }: { label: string; accent?: 'mint' }) {
  return (
    <span
      className="font-mono text-[9px] tracking-widest uppercase"
      style={{ color: accent === 'mint' ? 'oklch(82% 0.18 165)' : 'var(--fg-4)' }}
    >
      {label}
    </span>
  )
}

function PublishedURL() {
  return (
    <span
      className="font-mono text-[9px] tracking-wide mkt-url-pulse px-2 py-1 rounded-md border"
      style={{
        color: 'oklch(82% 0.18 165)',
        borderColor: 'oklch(82% 0.18 165 / 0.3)',
        background: 'oklch(82% 0.18 165 / 0.06)',
      }}
    >
      branchlab.app/play/tough-talk-x7
    </span>
  )
}
