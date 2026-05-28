'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'

type TextSize = 'normal' | 'large' | 'xlarge'

interface A11yState {
  textSize: TextSize
  highContrast: boolean
  reduceMotion: boolean
  linkHighlight: boolean
}

const DEFAULT: A11yState = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false,
  linkHighlight: false,
}

const TEXT_SIZE_CLASS: Record<TextSize, string> = {
  normal: '',
  large: 'a11y-text-large',
  xlarge: 'a11y-text-xlarge',
}

function applyToHtml(state: A11yState) {
  const html = document.documentElement
  // text size
  html.classList.remove('a11y-text-large', 'a11y-text-xlarge')
  if (state.textSize !== 'normal') html.classList.add(TEXT_SIZE_CLASS[state.textSize])
  // high contrast
  html.classList.toggle('a11y-high-contrast', state.highContrast)
  // reduce motion
  html.classList.toggle('a11y-reduce-motion', state.reduceMotion)
  // link highlight
  html.classList.toggle('a11y-link-highlight', state.linkHighlight)
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<A11yState>(DEFAULT)

  // Load persisted prefs
  useEffect(() => {
    try {
      const stored = localStorage.getItem('branchlab-a11y')
      if (stored) {
        const parsed = JSON.parse(stored) as A11yState
        setState(parsed)
        applyToHtml(parsed)
      }
    } catch {}
  }, [])

  function update(patch: Partial<A11yState>) {
    setState(prev => {
      const next = { ...prev, ...patch }
      applyToHtml(next)
      localStorage.setItem('branchlab-a11y', JSON.stringify(next))
      return next
    })
  }

  function reset() {
    setState(DEFAULT)
    applyToHtml(DEFAULT)
    localStorage.removeItem('branchlab-a11y')
  }

  const hasChanges = JSON.stringify(state) !== JSON.stringify(DEFAULT)

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-5 left-5 z-40" aria-label="Accessibility options">
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="a11y-panel"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{
            background: open ? 'oklch(82% 0.18 165 / 0.18)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${open ? 'oklch(82% 0.18 165 / 0.5)' : 'rgba(255,255,255,0.12)'}`,
            boxShadow: open ? '0 0 20px oklch(82% 0.18 165 / 0.2)' : '0 4px 16px rgba(0,0,0,0.4)',
          }}
          title="Accessibility settings"
        >
          <A11yIcon active={open} />
          {hasChanges && (
            <span
              className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{
                background: 'oklch(82% 0.18 165)',
                borderColor: 'var(--bg-0)',
              }}
              aria-label="Accessibility settings active"
            />
          )}
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="a11y-panel"
            role="dialog"
            aria-label="Accessibility settings"
            initial={{ opacity: 0, x: -12, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -8, y: 6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-5 z-40 w-72 rounded-2xl overflow-hidden"
            style={{
              background: 'rgb(12,13,20)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>
                Accessibility
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/8 transition-colors"
                aria-label="Close accessibility panel"
              >
                <X size={12} style={{ color: 'var(--fg-3)' }} />
              </button>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-5">

              {/* Text size */}
              <fieldset>
                <legend className="text-xs font-medium mb-2.5">Text size</legend>
                <div className="flex gap-1.5">
                  {(['normal', 'large', 'xlarge'] as TextSize[]).map(size => (
                    <button
                      key={size}
                      onClick={() => update({ textSize: size })}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all"
                      style={{
                        borderColor: state.textSize === size ? 'oklch(82% 0.18 165 / 0.6)' : 'rgba(255,255,255,0.1)',
                        background: state.textSize === size ? 'oklch(82% 0.18 165 / 0.12)' : 'rgba(255,255,255,0.03)',
                        color: state.textSize === size ? 'oklch(82% 0.18 165)' : 'var(--fg-2)',
                      }}
                      aria-pressed={state.textSize === size}
                    >
                      {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Toggles */}
              <div className="space-y-3">
                <Toggle
                  label="High contrast"
                  description="Increase colour contrast"
                  checked={state.highContrast}
                  onChange={v => update({ highContrast: v })}
                />
                <Toggle
                  label="Reduce motion"
                  description="Disable animations"
                  checked={state.reduceMotion}
                  onChange={v => update({ reduceMotion: v })}
                />
                <Toggle
                  label="Highlight links"
                  description="Underline all links"
                  checked={state.linkHighlight}
                  onChange={v => update({ linkHighlight: v })}
                />
              </div>

              {/* Reset */}
              {hasChanges && (
                <button
                  onClick={reset}
                  className="w-full py-2 rounded-lg text-xs border transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--fg-3)' }}
                >
                  Reset to defaults
                </button>
              )}

              {/* Link to full statement */}
              <div className="pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <Link
                  href="/accessibility"
                  className="text-xs transition-colors hover:underline"
                  style={{ color: 'var(--fg-4)' }}
                  onClick={() => setOpen(false)}
                >
                  View accessibility statement →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[11px]" style={{ color: 'var(--fg-4)' }}>{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-9 h-5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        style={{
          background: checked ? 'oklch(82% 0.18 165)' : 'rgba(255,255,255,0.12)',
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform"
          style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </button>
    </label>
  )
}

function A11yIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ color: active ? 'oklch(82% 0.18 165)' : 'var(--fg-2)' }}
    >
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <path
        d="M6 8h12M12 8v6M9 22l3-6 3 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
