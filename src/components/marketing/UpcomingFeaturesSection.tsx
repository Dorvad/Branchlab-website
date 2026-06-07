'use client'

import { motion } from 'framer-motion'
import { BarChart3, UsersRound, PenLine } from 'lucide-react'
import DisplayCards from '@/components/ui/display-cards'

const MINT = { color: 'oklch(82% 0.18 165)', bg: 'oklch(82% 0.18 165 / 0.12)', border: 'oklch(82% 0.18 165 / 0.4)' }
const VIOLET = { color: 'oklch(78% 0.18 285)', bg: 'oklch(78% 0.18 285 / 0.12)', border: 'oklch(78% 0.18 285 / 0.4)' }
const AMBER = { color: 'oklch(80% 0.16 60)', bg: 'oklch(80% 0.16 60 / 0.12)', border: 'oklch(80% 0.16 60 / 0.4)' }

const upcomingCards = [
  {
    icon: <BarChart3 className="size-4" />,
    title: 'Advanced analytics',
    description: 'Cohort comparisons and exportable reports for every scenario.',
    status: 'In development',
    accent: MINT,
  },
  {
    icon: <UsersRound className="size-4" />,
    title: 'Facilitator model',
    description: 'Host group sessions live, pause for discussion, debrief together.',
    status: 'Planned',
    accent: VIOLET,
  },
  {
    icon: <PenLine className="size-4" />,
    title: 'Collaborative editing',
    description: 'Build scenarios as a team — shared projects, comments, live co-editing.',
    status: 'Planned',
    accent: AMBER,
  },
]

export default function UpcomingFeaturesSection() {
  return (
    <section className="relative py-28 overflow-hidden" aria-labelledby="upcoming-headline">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 650px 480px at 85% 40%, oklch(78% 0.18 285 / 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center gap-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block font-mono text-xs tracking-widest uppercase"
          style={{ color: 'var(--neon-amber)' }}
        >
          On the roadmap
        </motion.span>

        <motion.h2
          id="upcoming-headline"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.1]"
        >
          Built for the core loop.{' '}
          <span style={{ color: 'var(--fg-2)' }}>Growing from there.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-lg leading-relaxed max-w-xl"
          style={{ color: 'var(--fg-2)' }}
        >
          Three capabilities we&apos;re building next, based directly on what trainers,
          educators, and facilitators have asked for.
        </motion.p>

        {/* Fanned card stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center pt-10 pb-4"
        >
          <DisplayCards cards={upcomingCards} />
        </motion.div>
      </div>
    </section>
  )
}
