'use client'

import { motion } from 'framer-motion'
import { GitBranch, Layers, CheckCircle2, Eye } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'

export default function CreatorStudioShowcase() {
  return (
    <section
      id="creator-studio"
      className="relative py-28 overflow-hidden"
      aria-labelledby="studio-headline"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 800px 600px at 100% 50%, oklch(82% 0.18 165 / 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-end">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
            >
              Map the whole scenario,
              <br />
              <span style={{ color: 'var(--fg-2)' }}>not just the next clip.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="space-y-5"
          >
            {[
              { icon: <GitBranch size={14} />, label: 'Visual node graph', desc: 'See the entire branching structure at a glance on an infinite canvas.' },
              { icon: <Layers size={14} />, label: 'Clip asset library', desc: 'Upload, preview, and attach video clips directly from the library panel.' },
              { icon: <CheckCircle2 size={14} />, label: 'Validation before publishing', desc: 'Catch dead ends, missing clips, and broken paths before learners see them.' },
              { icon: <Eye size={14} />, label: 'Live preview mode', desc: 'Step through your scenario exactly as a player would before you share it.' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'oklch(82% 0.18 165 / 0.1)', color: 'oklch(82% 0.18 165)' }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{f.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--fg-3)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Editor screenshot in spotlight card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlowCard glowColor="mint" customSize className="w-full">
            <img
              src="/creator-studio.jpg"
              alt="BranchLab Creator Studio — visual node graph editor showing a branching scenario with connected video scenes and an asset library panel"
              className="w-full h-auto block"
              draggable={false}
            />
          </GlowCard>
        </motion.div>
      </div>
    </section>
  )
}
