'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { APP_URL } from './marketing-data'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Why BranchLab', href: '#why-branchlab' },
]

export default function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,9,13,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="BranchLab home" className="flex items-center gap-2.5 shrink-0">
          <BranchLabIcon />
          <span className="font-semibold text-base tracking-[-0.01em]" style={{ color: 'var(--fg-0)' }}>
            BranchLab
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors"
              style={{ color: 'var(--fg-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-0)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`${APP_URL}/auth`}
            className="text-sm transition-colors"
            style={{ color: 'var(--fg-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-0)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
          >
            Sign in
          </Link>
          <Link
            href="https://www.branchlab.online"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:brightness-110"
            style={{
              background: 'var(--neon-mint)',
              color: '#052916',
              boxShadow: 'var(--glow-mint)',
            }}
          >
            Start building
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
          style={{ color: 'var(--fg-2)', background: 'var(--tint-2)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t"
            style={{
              background: 'rgba(8,9,13,0.96)',
              backdropFilter: 'blur(24px)',
              borderColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm transition-colors"
                  style={{ color: 'var(--fg-1)' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <Link
                  href={`${APP_URL}/auth`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm text-center transition-colors"
                  style={{ color: 'var(--fg-2)' }}
                >
                  Sign in
                </Link>
                <Link
                  href="https://www.branchlab.online"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: 'var(--neon-mint)',
                    color: '#052916',
                  }}
                >
                  Start building
                  <ArrowRight size={13} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function BranchLabIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none" aria-hidden="true">
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
