'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const STEPS = [
  {
    id: 'build',
    number: '01',
    label: 'Build',
    headline: 'Map your scenario on a visual canvas',
    description:
      'Drag video clips onto a node canvas, connect them, and define the choices players see after each scene. The full branching structure stays visible at a glance.',
    accentColor: 'oklch(82% 0.18 165)',
    visual: 'editor' as const,
  },
  {
    id: 'publish',
    number: '02',
    label: 'Publish',
    headline: 'One click to go live',
    description:
      'Validate your scenario to catch dead ends and broken links, then publish instantly. Your simulation gets a shareable URL that works on any device — no app, no install.',
    accentColor: 'oklch(78% 0.18 285)',
    visual: 'publish' as const,
  },
  {
    id: 'analyze',
    number: '03',
    label: 'Analyze',
    headline: 'See every choice your players make',
    description:
      'Completion funnels, choice breakdowns, and drop-off analysis — all built in. Spot exactly where players hesitate or abandon, then tighten those spots before your next cohort.',
    accentColor: 'oklch(80% 0.16 60)',
    visual: 'analytics' as const,
  },
]

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 52 : -52 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -52 : 52 }),
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function ProductFlowModal({ open, onClose }: Props) {
  const [{ step, dir }, setState] = useState({ step: 0, dir: 1 })

  function goTo(i: number) {
    setState(s => ({ step: i, dir: i > s.step ? 1 : -1 }))
  }

  useEffect(() => {
    if (open) setState({ step: 0, dir: 1 })
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') {
        setState(s => s.step < STEPS.length - 1 ? { step: s.step + 1, dir: 1 } : s)
      }
      if (e.key === 'ArrowLeft') {
        setState(s => s.step > 0 ? { step: s.step - 1, dir: -1 } : s)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full sm:max-w-2xl rounded-t-[28px] sm:rounded-[28px] overflow-hidden flex flex-col"
              style={{
                background: 'rgb(10,11,16)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05)',
                maxHeight: '92vh',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Visual panel */}
              <div
                className="relative shrink-0 overflow-hidden"
                style={{ height: 220, background: 'rgb(8,9,13)' }}
              >
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current.id}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {current.visual === 'editor' && <VisualEditor />}
                    {current.visual === 'publish' && <VisualPublish accentColor={current.accentColor} />}
                    {current.visual === 'analytics' && <VisualAnalytics />}
                  </motion.div>
                </AnimatePresence>

                {/* Step badge */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <StepBadge number={current.number} accentColor={current.accentColor} />
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label="Close"
                >
                  <X size={14} style={{ color: 'var(--fg-2)' }} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => goTo(i)}
                      className="py-1.5"
                      aria-label={`Step ${i + 1}: ${s.label}`}
                    >
                      <motion.div
                        animate={{
                          width: i === step ? 26 : 6,
                          opacity: i <= step ? 1 : 0.28,
                        }}
                        style={{
                          height: 4,
                          borderRadius: 2,
                          background: i === step ? s.accentColor : 'rgba(255,255,255,0.4)',
                        }}
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    </button>
                  ))}
                  <span
                    className="ml-auto font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: 'var(--fg-4)' }}
                  >
                    {step + 1} / {STEPS.length}
                  </span>
                </div>

                {/* Step copy */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id + '-copy'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2"
                  >
                    <p
                      className="font-mono text-xs tracking-widest uppercase"
                      style={{ color: current.accentColor }}
                    >
                      {current.label}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] leading-[1.2]">
                      {current.headline}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => goTo(step - 1)}
                    disabled={step === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5 active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
                    style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--fg-2)' }}
                  >
                    <ChevronLeft size={15} />
                    Back
                  </button>

                  {isLast ? (
                    <Link
                      href="https://branchlab.online"
                      onClick={onClose}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110 active:scale-95"
                      style={{
                        background: 'var(--neon-mint)',
                        color: '#052916',
                        boxShadow: 'var(--glow-mint)',
                      }}
                    >
                      Start building
                      <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => goTo(step + 1)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/[0.06] active:scale-95"
                      style={{
                        border: '1px solid rgba(255,255,255,0.14)',
                        color: 'var(--fg-1)',
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      Next
                      <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Step badge ────────────────────────────────────────────────────────────────

function StepBadge({ number, accentColor }: { number: string; accentColor: string }) {
  const base = accentColor.slice(0, -1)
  return (
    <span
      className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded-md border"
      style={{
        color: accentColor,
        borderColor: `${base} / 0.38)`,
        background: `${base} / 0.13)`,
      }}
    >
      STEP {number}
    </span>
  )
}

// ── Visual panels ─────────────────────────────────────────────────────────────

function VisualEditor() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/screenshots/editor.jpg"
        alt="BranchLab Creator Studio — visual branching scenario editor"
        fill
        className="object-cover object-top"
        sizes="(max-width: 672px) 100vw, 672px"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 52%, rgb(8,9,13))' }}
      />
    </div>
  )
}

function VisualAnalytics() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/screenshots/analytics.jpg"
        alt="BranchLab analytics dashboard — player funnel and choice breakdown"
        fill
        className="object-cover object-top"
        sizes="(max-width: 672px) 100vw, 672px"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 52%, rgb(8,9,13))' }}
      />
    </div>
  )
}

function VisualPublish({ accentColor }: { accentColor: string }) {
  const b = accentColor.slice(0, -1)
  const glow  = `${b} / 0.07)`
  const brd   = `${b} / 0.2)`
  const brdBr = `${b} / 0.35)`
  const bg    = `${b} / 0.12)`
  const chk   = `${b} / 0.5)`

  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-4">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 340px 220px at 50% 50%, ${glow} 0%, transparent 70%)`,
        }}
      />

      {/* Browser-style card */}
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${brd}` }}
      >
        {/* URL bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ borderColor: brd, background: 'rgba(0,0,0,0.35)' }}
        >
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/45" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/45" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/45" />
          </div>
          <div
            className="flex-1 mx-2 px-3 py-1 rounded-md font-mono text-[10px] truncate"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: accentColor,
              border: `1px solid ${brdBr}`,
            }}
          >
            branchlab.online/play/tough-talk-x7
          </div>
        </div>

        {/* Content row */}
        <div className="px-4 py-3.5 flex items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <p className="text-xs font-semibold truncate">Tough Talk</p>
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] tracking-widest uppercase border"
              style={{ color: accentColor, borderColor: chk, background: bg }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: accentColor }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Published
            </span>
          </div>

          {/* Device checkmarks */}
          <div className="flex gap-3 shrink-0">
            {(['Desktop', 'Tablet', 'Mobile'] as const).map(d => (
              <div key={d} className="flex flex-col items-center gap-1">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: bg, border: `1px solid ${chk}` }}
                >
                  <svg width="9" height="7" viewBox="0 0 9 7" aria-hidden="true">
                    <path
                      d="M1 3.5L3.5 6L8 1"
                      stroke={accentColor}
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-mono text-[8px] tracking-wide" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
