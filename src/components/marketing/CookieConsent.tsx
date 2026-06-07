'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import {
  CONSENT_CATEGORIES,
  CONSENT_CHANGE_EVENT,
  DEFAULT_CONSENT,
  OPEN_CONSENT_PREFERENCES_EVENT,
  getStoredConsent,
  saveConsent,
  type ConsentCategory,
  type ConsentState,
} from '@/lib/consent'

const MINT = 'oklch(82% 0.18 165)'

export default function CookieConsent() {
  const [ready, setReady] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT)

  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Decide whether to show the banner on first load.
  useEffect(() => {
    const stored = getStoredConsent()
    setShowBanner(stored === null)
    setDraft(stored ?? DEFAULT_CONSENT)
    setReady(true)
  }, [])

  // Allow other parts of the site (e.g. the footer "Cookie preferences" link) to reopen the modal.
  useEffect(() => {
    const handler = () => {
      setDraft(getStoredConsent() ?? DEFAULT_CONSENT)
      setShowModal(true)
    }
    window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handler)
    return () => window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handler)
  }, [])

  // Keep in sync if consent changes in another tab.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail
      if (detail) setShowBanner(false)
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, handler)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler)
  }, [])

  // Focus management + Escape-to-close + focus trap for the preferences modal.
  useEffect(() => {
    if (!showModal) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const id = window.setTimeout(() => {
      const node = modalRef.current
      const focusable = node?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      ;(focusable ?? node)?.focus()
    }, 0)

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false)
        return
      }
      if (e.key !== 'Tab') return
      const node = modalRef.current
      if (!node) return
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('keydown', handler)
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [showModal])

  function acceptAll() {
    const next: ConsentState = { essential: true, analytics: true, marketing: true, functional: true }
    saveConsent(next)
    setDraft(next)
    setShowBanner(false)
    setShowModal(false)
  }

  function rejectNonEssential() {
    saveConsent(DEFAULT_CONSENT)
    setDraft(DEFAULT_CONSENT)
    setShowBanner(false)
    setShowModal(false)
  }

  function savePreferences() {
    saveConsent(draft)
    setShowBanner(false)
    setShowModal(false)
  }

  function openPreferences() {
    setDraft(getStoredConsent() ?? DEFAULT_CONSENT)
    setShowModal(true)
  }

  if (!ready) return null

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            key="cookie-banner"
            role="region"
            aria-label="Cookie consent"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[60] sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md"
          >
            <div
              className="m-3 sm:m-0 rounded-2xl overflow-hidden"
              style={{
                background: 'rgb(12,13,20)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              }}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'oklch(82% 0.18 165 / 0.13)', border: '1px solid oklch(82% 0.18 165 / 0.3)' }}
                    aria-hidden="true"
                  >
                    <Cookie size={16} style={{ color: MINT }} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Cookies &amp; privacy</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                      We use essential cookies to run this site, and only set optional cookies (analytics,
                      marketing, functional) with your permission. Read our{' '}
                      <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
                        privacy policy
                      </Link>{' '}
                      to learn more.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 rounded-lg text-xs font-medium transition-all hover:brightness-110 active:scale-95"
                    style={{ background: MINT, color: '#052916' }}
                  >
                    Accept all
                  </button>
                  <button
                    onClick={rejectNonEssential}
                    className="px-4 py-2 rounded-lg text-xs font-medium border transition-all hover:bg-white/5 active:scale-95"
                    style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'var(--fg-2)' }}
                  >
                    Reject non-essential
                  </button>
                  <button
                    onClick={openPreferences}
                    className="px-4 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/5 active:scale-95"
                    style={{ color: 'var(--fg-3)' }}
                  >
                    Manage preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              key="cookie-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70]"
              style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
              onClick={() => setShowModal(false)}
            />
            <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
              <motion.div
                key="cookie-modal-card"
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cookie-modal-title"
                tabIndex={-1}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 28, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto w-full sm:max-w-lg rounded-t-[28px] sm:rounded-[28px] overflow-hidden flex flex-col"
                style={{
                  background: 'rgb(10,11,16)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 40px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05)',
                  maxHeight: '92vh',
                }}
                onClick={e => e.stopPropagation()}
              >
                <div
                  className="flex items-center justify-between px-6 py-5 border-b shrink-0"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <h2 id="cookie-modal-title" className="text-lg font-semibold tracking-[-0.01em]">
                    Cookie preferences
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                    aria-label="Close"
                  >
                    <X size={14} style={{ color: 'var(--fg-2)' }} />
                  </button>
                </div>

                <div className="px-6 py-5 overflow-y-auto space-y-4">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                    Choose which categories of cookies you allow. Essential cookies are always on because the
                    site cannot function without them. You can change these choices at any time from the
                    footer link.
                  </p>

                  <div className="space-y-3">
                    {CONSENT_CATEGORIES.map(cat => (
                      <CategoryToggle
                        key={cat.id}
                        category={cat.id}
                        label={cat.label}
                        description={cat.description}
                        locked={cat.locked}
                        checked={cat.locked ? true : draft[cat.id]}
                        onChange={v => setDraft(prev => ({ ...prev, [cat.id]: v }))}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="px-6 py-5 border-t shrink-0 flex flex-wrap items-center gap-2"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <button
                    onClick={savePreferences}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110 active:scale-95"
                    style={{ background: MINT, color: '#052916', boxShadow: 'var(--glow-mint)' }}
                  >
                    Save preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5 active:scale-95"
                    style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'var(--fg-2)' }}
                  >
                    Accept all
                  </button>
                  <button
                    onClick={rejectNonEssential}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5 active:scale-95"
                    style={{ color: 'var(--fg-3)' }}
                  >
                    Reject non-essential
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function CategoryToggle({
  label,
  description,
  locked,
  checked,
  onChange,
}: {
  category: ConsentCategory
  label: string
  description: string
  locked: boolean
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 p-3.5 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="space-y-0.5 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-4)' }}>{description}</p>
        {locked && (
          <p className="font-mono text-[10px] tracking-widest uppercase pt-0.5" style={{ color: 'var(--fg-4)' }}>
            Always active
          </p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={locked}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-10 h-6 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed"
        style={{
          background: checked ? MINT : 'rgba(255,255,255,0.12)',
          opacity: locked ? 0.6 : 1,
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
          style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  )
}
