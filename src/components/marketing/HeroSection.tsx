'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
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
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', '75% start'],
  })

  const heroRotateX = useTransform(scrollYProgress, [0, 1], [7, 0])
  const heroRotateY = useTransform(scrollYProgress, [0, 1], [-4, 0])

  return (
    <section
      ref={sectionRef}
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
            <motion.span
              className="not-italic font-medium"
              style={{
                background: 'linear-gradient(90deg, oklch(60% 0.18 165), oklch(82% 0.18 165), #e8fff6, oklch(82% 0.18 165), oklch(60% 0.18 165))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ backgroundPosition: '0% 0' }}
              animate={{ backgroundPosition: '200% 0' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              branching
            </motion.span>{' '}
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
              href="https://branchlab.online"
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
              href="#player"
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

        {/* Right — animated graph visual — visible on all screens */}
        <HeroVisualScaler prefersReducedMotion={!!prefersReducedMotion} rotateX={heroRotateX} rotateY={heroRotateY} />
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

// ── Responsive scaler for the hero visual ────────────────────────────────

function HeroVisualScaler({
  prefersReducedMotion,
  rotateX,
  rotateY,
}: {
  prefersReducedMotion: boolean
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const el = wrapperRef.current
      if (!el) return
      // Visual canvas is 480px wide; scale down to fit narrower containers
      setScale(Math.min(1, el.clientWidth / 480))
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    // Wrapper measures available width and collapses height to match scaled visual.
    // No overflow-hidden here — hero section's own overflow-hidden handles any bleed.
    <div
      ref={wrapperRef}
      className="w-full"
      style={{ height: Math.round(460 * scale), perspective: '1000px' }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={prefersReducedMotion
          ? { width: 480, transform: `scale(${scale})`, transformOrigin: 'top left' }
          : {
              width: 480,
              scale,
              transformOrigin: 'top left',
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d' as const,
            }
        }
      >
        <BranchingHeroVisual />
      </motion.div>
    </div>
  )
}

// ── Floating 3D branching visual ─────────────────────────────────────────
//
// Node positions (within 480×380 canvas):
//   START pill  : left=165, top=22,  w=150, h=44  → bottom-center (240, 66)
//   SCENE A card: left=14,  top=130, w=136, h=70  → center-x 82, bottom 200
//   SCENE B card: left=330, top=130, w=136, h=70  → center-x 398, bottom 200
//   END A badge : left=0,   top=272, w=110, h=36  → center-x 55
//   END B badge : left=160, top=268, w=160, h=42  → center-x 240  (highlighted)
//   END C badge : left=360, top=272, w=110, h=36  → center-x 415

function BranchingHeroVisual() {
  return (
    <div
      className="relative rounded-2xl border"
      style={{
        background: 'rgb(10,11,17)',
        borderColor: 'rgba(255,255,255,0.09)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* App bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="font-mono text-[10px] tracking-widest uppercase ml-1.5" style={{ color: 'var(--fg-4)' }}>
            Creator Studio
          </span>
        </div>
        <StatusPill label="PUBLISHED" accent="mint" />
      </div>

      {/* Canvas */}
      <div
        className="relative"
        style={{
          height: 380,
          background: 'rgba(8,9,14,0.5)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG connection edges — flat 2D overlay */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 480 380"
          style={{ width: '100%', height: '100%' }}
          aria-hidden="true"
        >
          <defs>
            <marker id="h-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,1 L9,5 L0,9 Z" fill="rgba(255,255,255,0.22)" />
            </marker>
            <marker id="h-arrow-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,1 L9,5 L0,9 Z" fill="oklch(82% 0.18 165 / 0.85)" />
            </marker>
            <filter id="h-glow-mint" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="h-pg-mint">
              <stop offset="0%" stopColor="oklch(82% 0.18 165)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(82% 0.18 165)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="h-pg-blue">
              <stop offset="0%" stopColor="oklch(70% 0.18 240)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(70% 0.18 240)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* START → SCENE A */}
          <path d="M 240 66 C 240 100 82 100 82 130" stroke="rgba(255,255,255,0.15)" strokeWidth="1.4" fill="none" markerEnd="url(#h-arrow)" />
          {/* START → SCENE B */}
          <path d="M 240 66 C 240 100 398 100 398 130" stroke="rgba(255,255,255,0.15)" strokeWidth="1.4" fill="none" markerEnd="url(#h-arrow)" />
          {/* SCENE A → END A */}
          <path d="M 82 200 C 82 240 55 240 55 272" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
          {/* SCENE A → END B — highlighted */}
          <path d="M 82 200 C 82 258 240 258 240 268" stroke="oklch(82% 0.18 165 / 0.7)" strokeWidth="1.8" fill="none" filter="url(#h-glow-mint)" markerEnd="url(#h-arrow-mint)" />
          {/* SCENE B → END C */}
          <path d="M 398 200 C 398 240 415 240 415 272" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" fill="none" strokeDasharray="4 3" />

          {/* Particles */}
          <circle r="3" fill="url(#h-pg-mint)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 240 66 C 240 100 82 100 82 130" />
          </circle>
          <circle r="2.5" fill="url(#h-pg-mint)" opacity="0.85">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.1s" path="M 82 200 C 82 258 240 258 240 268" />
          </circle>
        </svg>

        {/* === 3D FLOATING NODE CARDS === */}

        {/* START pill — highest z, pulsing ring */}
        <motion.div
          style={{ position: 'absolute', left: 165, top: 22, translateZ: 24 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            style={{
              width: 150, height: 44, borderRadius: 22,
              background: 'oklch(82% 0.18 165 / 0.12)',
              border: '1.5px solid oklch(82% 0.18 165 / 0.65)',
              boxShadow: '0 0 32px oklch(82% 0.18 165 / 0.25), 0 4px 20px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                position: 'absolute', inset: -8, borderRadius: 30,
                border: '1px solid oklch(82% 0.18 165 / 0.28)',
              }}
              animate={{ opacity: [0.5, 0.05, 0.5], scale: [1, 1.07, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, color: 'oklch(82% 0.18 165)', fontWeight: 600 }}>
              OPENING SCENE
            </span>
          </div>
        </motion.div>

        {/* SCENE A — left branch */}
        <motion.div
          style={{ position: 'absolute', left: 14, top: 130, translateZ: 4 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <HeroSceneCard
            title="The Approach"
            grad="linear-gradient(135deg, oklch(56% 0.22 165 / 0.9), oklch(50% 0.2 200 / 0.9))"
            choices={2}
          />
        </motion.div>

        {/* SCENE B — right branch */}
        <motion.div
          style={{ position: 'absolute', left: 330, top: 130, translateZ: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        >
          <HeroSceneCard
            title="The Deflection"
            grad="linear-gradient(135deg, oklch(52% 0.2 260 / 0.9), oklch(48% 0.18 285 / 0.9))"
            choices={1}
          />
        </motion.div>

        {/* END A — dim, left */}
        <motion.div
          style={{ position: 'absolute', left: 0, top: 272, translateZ: -12 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <HeroEndingBadge label="TENSION" />
        </motion.div>

        {/* END B — highlighted, pops forward */}
        <motion.div
          style={{ position: 'absolute', left: 160, top: 268, translateZ: 18 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        >
          <HeroEndingBadge label="BREAKTHROUGH" highlighted />
        </motion.div>

        {/* END C — dim, right */}
        <motion.div
          style={{ position: 'absolute', left: 360, top: 272, translateZ: -12 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        >
          <HeroEndingBadge label="AVOIDANCE" />
        </motion.div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(8,9,13,0.6)' }}
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

function HeroSceneCard({ title, grad, choices }: { title: string; grad: string; choices: number }) {
  return (
    <div
      style={{
        width: 136, height: 70, borderRadius: 10,
        background: 'rgba(16,18,26,0.96)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 10px 32px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Video thumbnail */}
      <div style={{ height: 36, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 20, height: 20, borderRadius: 10,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true">
            <polygon points="1,0 7,4 1,8" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
      </div>
      {/* Footer */}
      <div style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>{title}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 7, color: 'var(--fg-4)', letterSpacing: 1 }}>
          {choices} {choices === 1 ? 'CHOICE' : 'CHOICES'}
        </span>
      </div>
    </div>
  )
}

function HeroEndingBadge({ label, highlighted }: { label: string; highlighted?: boolean }) {
  return (
    <div style={{ position: 'relative' }}>
      {highlighted && (
        <motion.div
          style={{
            position: 'absolute', inset: -6, borderRadius: 13,
            background: 'oklch(80% 0.16 60 / 0.08)',
            border: '1px solid oklch(80% 0.16 60 / 0.2)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div style={{
        width: highlighted ? 160 : 110,
        height: highlighted ? 42 : 36,
        borderRadius: 9,
        background: highlighted ? 'oklch(80% 0.16 60 / 0.14)' : 'rgba(255,255,255,0.03)',
        border: `1.2px solid ${highlighted ? 'oklch(80% 0.16 60 / 0.6)' : 'rgba(255,255,255,0.09)'}`,
        boxShadow: highlighted ? '0 0 28px oklch(80% 0.16 60 / 0.28), 0 6px 20px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontSize: highlighted ? 10 : 8,
          letterSpacing: highlighted ? 2 : 1.5,
          fontWeight: highlighted ? 600 : 400,
          color: highlighted ? 'oklch(80% 0.16 60)' : 'var(--fg-4)',
        }}>
          {label}
        </span>
      </div>
    </div>
  )
}

function StatusPill({ label, accent }: { label: string; accent: 'mint' | 'violet' | 'amber' }) {
  const colors = {
    mint:   { bg: 'oklch(82% 0.18 165 / 0.12)', color: 'oklch(82% 0.18 165)', border: 'oklch(82% 0.18 165 / 0.3)' },
    violet: { bg: 'oklch(78% 0.18 285 / 0.12)', color: 'oklch(78% 0.18 285)', border: 'oklch(78% 0.18 285 / 0.3)' },
    amber:  { bg: 'oklch(80% 0.16 60 / 0.12)',  color: 'oklch(80% 0.16 60)',  border: 'oklch(80% 0.16 60 / 0.3)'  },
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
