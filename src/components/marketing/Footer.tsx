'use client'

import Link from 'next/link'

const footerLinks = {
  Product: [
    { label: 'Creator Studio', href: '#creator-studio' },
    { label: 'Scenario Player', href: '#player' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Use cases', href: '#use-cases' },
  ],
  Resources: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Sign in', href: '/auth' },
    { label: 'Play a demo', href: '/play/balcony-at-the-party' },
  ],
  Legal: [
    { label: 'Terms of service', href: '#terms' },
    { label: 'Privacy policy', href: '#privacy' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="BranchLab home">
              <BranchLabIcon />
              <span className="font-semibold text-base tracking-[-0.01em]">BranchLab</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--fg-3)' }}>
              A visual studio for building interactive branching video simulations. Upload clips,
              connect choices, validate the structure, and publish a shareable player link.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--fg-4)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mkt-dot-blink"
                style={{ background: 'var(--neon-mint)' }}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] tracking-widest uppercase">In active development</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="font-mono text-[10px] tracking-widest uppercase mb-4"
                style={{ color: 'var(--fg-4)' }}
              >
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: 'var(--fg-3)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-3)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'var(--fg-4)' }}>
            &copy; {new Date().getFullYear()} BranchLab. All rights reserved.
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--fg-4)' }}>
            Build the scene. Branch the choice. Play the outcome.
          </p>
        </div>
      </div>
    </footer>
  )
}

function BranchLabIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="10" cy="22" r="6" fill="oklch(82% 0.18 165)" />
      <circle cx="36" cy="10" r="5" fill="oklch(78% 0.18 285)" />
      <circle cx="36" cy="34" r="5" fill="oklch(80% 0.16 60)" />
      <path
        d="M15 20 L31 12 M15 24 L31 32"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
