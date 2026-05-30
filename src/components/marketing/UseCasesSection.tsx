'use client'

import { motion } from 'framer-motion'
import {
  Users,
  MessageCircle,
  TrendingUp,
  BookOpen,
  Shield,
  Film,
  Lightbulb,
  Layers,
} from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const useCaseTimelineData = [
  {
    id: 1,
    title: 'Leadership',
    date: 'Leadership & Mgmt',
    content:
      'Managers practice difficult decisions, team escalations, and judgment calls in realistic video-based situations.',
    category: 'L&D',
    icon: Users,
    relatedIds: [5, 4],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 2,
    title: 'Customer Service',
    date: 'Customer Success',
    content:
      'Service teams build empathy and communication skills through branching customer interaction simulations.',
    category: 'Customer Success',
    icon: MessageCircle,
    relatedIds: [3, 7],
    status: 'in-progress' as const,
    energy: 88,
  },
  {
    id: 3,
    title: 'Sales Training',
    date: 'Revenue Teams',
    content:
      'Sales reps explore how different responses to objections lead to different outcomes in realistic scenarios.',
    category: 'Revenue',
    icon: TrendingUp,
    relatedIds: [2, 1],
    status: 'in-progress' as const,
    energy: 82,
  },
  {
    id: 4,
    title: 'Onboarding',
    date: 'HR & People Ops',
    content:
      'New employees navigate realistic workplace situations from day one — with immediate feedback on their choices.',
    category: 'HR',
    icon: BookOpen,
    relatedIds: [8, 1],
    status: 'completed' as const,
    energy: 75,
  },
  {
    id: 5,
    title: 'Compliance',
    date: 'Ethics & Risk',
    content:
      'Walk employees through realistic dilemmas where the right choice matters and the reasoning is clearly explained.',
    category: 'Compliance',
    icon: Shield,
    relatedIds: [1, 4],
    status: 'completed' as const,
    energy: 90,
  },
  {
    id: 6,
    title: 'Storytelling',
    date: 'Content & Media',
    content:
      'Creators build branching short films, social scenarios, and choose-your-own-adventure video stories.',
    category: 'Creative',
    icon: Film,
    relatedIds: [7],
    status: 'pending' as const,
    energy: 68,
  },
  {
    id: 7,
    title: 'Workshops',
    date: 'L&D Facilitation',
    content:
      'Facilitators use scenarios to reveal different perspectives and spark structured group conversations.',
    category: 'L&D',
    icon: Lightbulb,
    relatedIds: [2, 6],
    status: 'pending' as const,
    energy: 78,
  },
  {
    id: 8,
    title: 'Product Training',
    date: 'Product Enablement',
    content:
      'Train teams on features, procedures, and role-specific knowledge through interactive video paths.',
    category: 'Enablement',
    icon: Layers,
    relatedIds: [4, 3],
    status: 'completed' as const,
    energy: 85,
  },
]

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="relative py-24 overflow-hidden"
      aria-labelledby="usecases-headline"
    >
      {/* Background radial */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 50% 50%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-4 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--neon-mint)' }}
          >
            Use cases
          </motion.span>
          <motion.h2
            id="usecases-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            Decision-based learning
            <br />
            <span style={{ color: 'var(--fg-2)' }}>across every context.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base"
            style={{ color: 'var(--fg-2)' }}
          >
            BranchLab works wherever judgment, communication, or decision-making
            needs to be practiced. Click any node to explore.
          </motion.p>
        </div>

        {/* Orbital timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RadialOrbitalTimeline timelineData={useCaseTimelineData} />
        </motion.div>
      </div>
    </section>
  )
}
