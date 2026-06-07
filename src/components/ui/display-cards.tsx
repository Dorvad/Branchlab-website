'use client'

import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Accent { color: string; bg: string; border: string }

const DEFAULT_ACCENT: Accent = {
  color: 'oklch(82% 0.18 165)',
  bg: 'oklch(82% 0.18 165 / 0.12)',
  border: 'oklch(82% 0.18 165 / 0.4)',
}

interface DisplayCardProps {
  className?: string
  icon?: ReactNode
  title?: string
  description?: string
  status?: string
  accent?: Accent
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4" />,
  title = 'Featured',
  description = 'Discover amazing content',
  status = 'Planned',
  accent = DEFAULT_ACCENT,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[var(--bg-0)] after:to-transparent after:content-[''] [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.09)' }}
    >
      <div>
        <span
          className="relative inline-block rounded-full p-1.5"
          style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
        >
          <span style={{ color: accent.color }}>{icon}</span>
        </span>
        <p className="text-lg font-medium" style={{ color: accent.color }}>{title}</p>
      </div>
      <p className="text-sm leading-snug line-clamp-2" style={{ color: 'var(--fg-1)' }}>{description}</p>
      <p
        className="font-mono text-[10px] tracking-widest uppercase"
        style={{ color: 'var(--fg-4)' }}
      >
        {status}
      </p>
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

const DIM_OVERLAY =
  "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl " +
  "before:border before:border-[rgba(255,255,255,0.08)] before:bg-[rgba(8,9,13,0.55)] " +
  "before:content-[''] before:transition-opacity before:duration-700 " +
  'grayscale-[100%] hover:grayscale-0 hover:before:opacity-0'

const STACK_POSITIONS = [
  `[grid-area:stack] hover:-translate-y-10 ${DIM_OVERLAY}`,
  `[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 ${DIM_OVERLAY}`,
  '[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10',
]

/**
 * Fanned stack of cards that separate and de-saturate on hover — each card
 * keeps its accent color, with a translucent overlay (`before:`) dimming the
 * un-hovered ones so the stack reads as a single object until you engage it.
 */
export default function DisplayCards({ cards }: DisplayCardsProps) {
  const displayCards = cards?.length ? cards : []

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          className={cn(
            STACK_POSITIONS[index] ?? STACK_POSITIONS[STACK_POSITIONS.length - 1],
            cardProps.className
          )}
        />
      ))}
    </div>
  )
}
