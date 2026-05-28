'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GitBranch, Layers, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: GitBranch,    label: 'Visual node canvas',    desc: 'Drag, connect, and rearrange scenes with a click.' },
  { icon: Layers,       label: 'Multi-branch structure', desc: 'Layer unlimited decision paths without losing track.' },
  { icon: CheckCircle2, label: 'Built-in validation',   desc: 'Catch dead ends and broken links before you publish.' },
]

export default function CanvasSection() {
  return (
    <section
      id="studio"
      className="relative py-32 overflow-hidden"
      aria-labelledby="studio-headline"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 70% 50%, oklch(78% 0.18 285 / 0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 400px 300px at 20% 60%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-center">

          {/* Left: copy */}
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--neon-mint)' }}
            >
              Creator Studio
            </motion.span>

            <motion.h2
              id="studio-headline"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.1]"
            >
              Map the whole scenario,
              <br />
              <span style={{ color: 'var(--fg-2)' }}>not just the next clip.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--fg-2)' }}
            >
              A visual canvas that makes the branching structure of your scenario obvious at a glance —
              drag, connect, validate, and publish without ever leaving the browser.
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
                      background: 'oklch(82% 0.18 165 / 0.1)',
                      border: '1px solid oklch(82% 0.18 165 / 0.25)',
                    }}
                  >
                    <Icon size={15} style={{ color: 'oklch(82% 0.18 165)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">{label}</p>
                    <p className="text-sm" style={{ color: 'var(--fg-3)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: real editor screenshot, 3D perspective tilt */}
          <motion.div
            initial={{ opacity: 0, rotateX: -18, rotateY: 10, y: 40 }}
            whileInView={{ opacity: 1, rotateX: -6, rotateY: 4, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
          >
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              <Image
                src="/screenshots/editor.jpg"
                alt="BranchLab Creator Studio — visual branching scenario editor"
                width={2954}
                height={1771}
                className="w-full h-auto block"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
