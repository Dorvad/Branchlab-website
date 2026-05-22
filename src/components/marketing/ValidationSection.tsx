'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { validationItems } from './marketing-data'

export default function ValidationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [resolvedCount, setResolvedCount] = useState(0)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (!inView) return
    const total = validationItems.length
    validationItems.forEach((_, i) => {
      setTimeout(() => {
        setResolvedCount(i + 1)
        if (i + 1 === total) {
          setTimeout(() => setPublished(true), 600)
        }
      }, 600 + i * 700)
    })
  }, [inView])

  const errors = validationItems.filter((v) => v.type === 'error')
  const warnings = validationItems.filter((v) => v.type === 'warning')
  const resolvedErrors = errors.filter((_, i) => i < resolvedCount)
  const resolvedWarnings = warnings.filter((_, i) => i < resolvedCount - errors.length)

  return (
    <section
      id="why-branchlab"
      className="relative py-28 overflow-hidden"
      aria-labelledby="validation-headline"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 80%, oklch(80% 0.16 60 / 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: 'oklch(80% 0.16 60)' }}
            >
              Validation-first publishing
            </motion.span>
            <motion.h2
              id="validation-headline"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
            >
              Publish with
              <br />
              <span style={{ color: 'var(--fg-2)' }}>confidence.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base leading-relaxed"
            style={{ color: 'var(--fg-2)' }}
          >
            Branching scenarios break easily. A missing start node, a dead-end choice, an unreachable
            scene — any of these can ruin the learner experience. BranchLab checks the map before
            learners ever see it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="space-y-4"
          >
            {[
              { label: 'Blocking errors', desc: 'Missing start node, choices without destinations, unreachable nodes — these must be fixed before publishing.' },
              { label: 'Quality warnings', desc: 'Missing video clips, nodes without titles — non-blocking issues that improve the scenario quality.' },
              { label: 'Locked published version', desc: 'Publishing creates a stable snapshot. Keep editing drafts while the public URL stays consistent.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ background: 'oklch(80% 0.16 60)' }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--fg-3)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: validation panel mockup */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: 'rgba(8,9,13,0.9)',
              borderColor: 'rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            aria-label="Validation panel mockup showing errors being resolved"
          >
            {/* Panel header */}
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
                Validation
              </span>
              <div className="flex items-center gap-2">
                {resolvedCount < validationItems.length && (
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{
                      color: 'oklch(70% 0.18 25)',
                      borderColor: 'oklch(70% 0.18 25 / 0.3)',
                      background: 'oklch(70% 0.18 25 / 0.08)',
                    }}
                  >
                    {errors.length - Math.min(resolvedCount, errors.length)} errors
                  </span>
                )}
                {resolvedCount >= validationItems.length && (
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{
                      color: 'oklch(82% 0.18 165)',
                      borderColor: 'oklch(82% 0.18 165 / 0.3)',
                      background: 'oklch(82% 0.18 165 / 0.08)',
                    }}
                  >
                    ✓ No blocking errors
                  </span>
                )}
              </div>
            </div>

            {/* Issue list */}
            <div className="p-5 space-y-2">
              {/* Errors */}
              {errors.map((item, i) => {
                const resolved = i < Math.min(resolvedCount, errors.length)
                return (
                  <ValidationRow
                    key={item.id}
                    label={item.label}
                    type="error"
                    resolved={resolved}
                    delay={i * 0.05}
                  />
                )
              })}

              {/* Separator */}
              <div className="pt-1 pb-1">
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>

              {/* Warnings */}
              {warnings.map((item, i) => {
                const resolved = i < Math.max(0, resolvedCount - errors.length)
                return (
                  <ValidationRow
                    key={item.id}
                    label={item.label}
                    type="warning"
                    resolved={resolved}
                    delay={(errors.length + i) * 0.05}
                  />
                )
              })}
            </div>

            {/* Publish button */}
            <div className="px-5 pb-5">
              <AnimatePresence mode="wait">
                {!published ? (
                  <motion.div
                    key="disabled"
                    className="w-full py-3 rounded-xl text-sm font-medium text-center"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--fg-4)',
                      cursor: 'not-allowed',
                    }}
                    aria-disabled="true"
                  >
                    {resolvedCount < validationItems.length
                      ? `Fix ${errors.length - Math.min(resolvedCount, errors.length)} error${errors.length - Math.min(resolvedCount, errors.length) !== 1 ? 's' : ''} to publish`
                      : 'Ready to publish…'}
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-full py-3 rounded-xl text-sm font-medium text-center mkt-url-pulse"
                    style={{
                      background: 'oklch(82% 0.18 165)',
                      color: '#052916',
                      cursor: 'pointer',
                    }}
                  >
                    Publish scenario ✓
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Published URL */}
              <AnimatePresence>
                {published && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-3 px-4 py-2.5 rounded-xl flex items-center justify-between"
                    style={{
                      background: 'oklch(82% 0.18 165 / 0.06)',
                      border: '1px solid oklch(82% 0.18 165 / 0.3)',
                    }}
                  >
                    <span className="font-mono text-[10px]" style={{ color: 'oklch(82% 0.18 165)' }}>
                      branchlab.app/play/tough-talk-x7
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'oklch(82% 0.18 165 / 0.6)' }}>
                      LIVE
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValidationRow({
  label,
  type,
  resolved,
  delay,
}: {
  label: string
  type: 'error' | 'warning'
  resolved: boolean
  delay: number
}) {
  const isError = type === 'error'
  const activeColor = isError ? 'oklch(70% 0.18 25)' : 'oklch(80% 0.16 60)'
  const activeBg = isError ? 'oklch(70% 0.18 25 / 0.08)' : 'oklch(80% 0.16 60 / 0.06)'
  const activeBorder = isError ? 'oklch(70% 0.18 25 / 0.25)' : 'oklch(80% 0.16 60 / 0.2)'

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all duration-500"
      style={{
        background: resolved ? 'oklch(82% 0.18 165 / 0.06)' : activeBg,
        border: `1px solid ${resolved ? 'oklch(82% 0.18 165 / 0.2)' : activeBorder}`,
      }}
      role="listitem"
      aria-label={`${resolved ? 'Resolved: ' : ''}${label}`}
    >
      <span
        className="text-sm shrink-0 transition-all duration-500"
        aria-hidden="true"
      >
        {resolved ? '✓' : isError ? '✕' : '⚠'}
      </span>
      <span
        className="flex-1 transition-all duration-500"
        style={{
          color: resolved ? 'oklch(82% 0.18 165)' : activeColor,
          textDecoration: resolved ? 'line-through' : 'none',
          opacity: resolved ? 0.7 : 1,
        }}
      >
        {label}
      </span>
      <span
        className="font-mono text-[8px] tracking-widest uppercase shrink-0"
        style={{ color: resolved ? 'oklch(82% 0.18 165 / 0.5)' : activeColor }}
      >
        {resolved ? 'RESOLVED' : type.toUpperCase()}
      </span>
    </motion.div>
  )
}
