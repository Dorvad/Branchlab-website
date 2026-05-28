import type { ReactNode } from 'react'
import Link from 'next/link'

interface LegalPageProps {
  eyebrow?: string
  eyebrowAccent?: 'mint' | 'violet' | 'amber'
  title: string
  lastUpdated: string
  intro: string
  children: ReactNode
}

const ACCENT_COLORS = {
  mint:   'oklch(82% 0.18 165)',
  violet: 'oklch(78% 0.18 285)',
  amber:  'oklch(80% 0.16 60)',
}

export default function LegalPage({
  eyebrow = 'Legal',
  eyebrowAccent = 'violet',
  title,
  lastUpdated,
  intro,
  children,
}: LegalPageProps) {
  const accentColor = ACCENT_COLORS[eyebrowAccent]

  return (
    <article>
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs mb-10 transition-colors hover:underline"
        style={{ color: 'var(--fg-4)' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to home
      </Link>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <span
          className="inline-block font-mono text-xs tracking-widest uppercase"
          style={{ color: accentColor }}
        >
          {eyebrow}
        </span>
        <h1 className="text-4xl font-semibold tracking-[-0.025em] leading-[1.1]">{title}</h1>
        <p className="text-xs font-mono tracking-wide" style={{ color: 'var(--fg-4)' }}>
          Last updated: {lastUpdated}
        </p>
        <div
          className="pt-4 pb-0 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>{intro}</p>
      </header>

      {/* Content — stack sections with dividers */}
      <div className="space-y-10 divide-y" style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}>
        {/* Custom divider color via wrapper */}
        <div className="space-y-10 [&>section]:pt-8 first:[&>section]:pt-0">
          {children}
        </div>
      </div>
    </article>
  )
}
