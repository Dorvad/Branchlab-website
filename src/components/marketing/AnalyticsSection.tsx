'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp, MousePointerClick, AlertTriangle } from 'lucide-react'

const features = [
  { icon: TrendingUp,        label: 'Player funnel',     desc: 'See exactly how many players started, made their first choice, and completed the scenario.' },
  { icon: MousePointerClick, label: 'Choice breakdown',  desc: 'Understand which options players pick most — broken down scene by scene.' },
  { icon: AlertTriangle,     label: 'Drop-off analysis', desc: 'Identify where players abandon so you can tighten weak spots before your next cohort.' },
]

export default function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="relative py-32 overflow-hidden"
      aria-labelledby="analytics-headline"
    >
      {/* Ambient glow — opposite side from CanvasSection */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 20% 50%, oklch(82% 0.18 165 / 0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 400px 300px at 80% 60%, oklch(78% 0.18 285 / 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">

          {/* Left: analytics screenshot — tilt opposite to CanvasSection */}
          <motion.div
            initial={{ opacity: 0, rotateX: -18, rotateY: -10, y: 40 }}
            whileInView={{ opacity: 1, rotateX: -5, rotateY: -4, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
            className="order-2 lg:order-1"
          >
            {/* App window chrome */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
                background: 'rgb(10,11,16)',
              }}
            >
              {/* Fake chrome header matching the app's own header */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(8,9,13,0.8)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase ml-1" style={{ color: 'var(--fg-4)' }}>
                  Analytics · Teenrom
                </span>
                <div className="ml-auto">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] tracking-widest uppercase border"
                    style={{
                      color: 'oklch(82% 0.18 165)',
                      borderColor: 'oklch(82% 0.18 165 / 0.35)',
                      background: 'oklch(82% 0.18 165 / 0.1)',
                    }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'oklch(82% 0.18 165)' }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                    Published
                  </span>
                </div>
              </div>

              {/* Screenshot — crop to top portion (overview + funnel + choice breakdown) */}
              <div className="overflow-hidden" style={{ maxHeight: 520 }}>
                <Image
                  src="/screenshots/analytics.jpg"
                  alt="BranchLab analytics dashboard — player funnel and choice breakdown"
                  width={900}
                  height={1200}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>

              {/* Fade-out gradient at the bottom so the crop looks intentional */}
              <div
                className="h-16 -mt-16 relative pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgb(10,11,16))',
                }}
              />
            </div>
          </motion.div>

          {/* Right: copy */}
          <div className="space-y-8 order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--neon-violet)' }}
            >
              Built-in Analytics
            </motion.span>

            <motion.h2
              id="analytics-headline"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.1]"
            >
              Know exactly where
              <br />
              <span style={{ color: 'var(--fg-2)' }}>every player goes.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--fg-2)' }}
            >
              Completion funnels, choice breakdowns, drop-off points, and session logs —
              built in from day one. No extra setup, no third-party tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="space-y-5"
            >
              {features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-none"
                    style={{
                      background: 'oklch(78% 0.18 285 / 0.1)',
                      border: '1px solid oklch(78% 0.18 285 / 0.25)',
                    }}
                  >
                    <Icon size={15} style={{ color: 'oklch(78% 0.18 285)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">{label}</p>
                    <p className="text-sm" style={{ color: 'var(--fg-3)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
