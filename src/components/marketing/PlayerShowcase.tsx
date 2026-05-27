'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Smartphone, Monitor } from 'lucide-react'

// ── Scenario definitions ──────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'wildwest',
    url: 'https://www.branchlab.online/play/wildwest',
    displayUrl: 'branchlab.online/play/wildwest',
    label: 'Wild West',
    genre: 'Western',
    accent: {
      color:  'oklch(78% 0.17 52)',
      bg:     'oklch(78% 0.17 52 / 0.12)',
      border: 'oklch(78% 0.17 52 / 0.55)',
      glow:   'oklch(78% 0.17 52 / 0.25)',
    },
  },
  {
    id: 'teenrom',
    url: 'https://www.branchlab.online/play/teenrom',
    displayUrl: 'branchlab.online/play/teenrom',
    label: 'High School',
    genre: 'Drama',
    accent: {
      color:  'oklch(75% 0.22 348)',
      bg:     'oklch(75% 0.22 348 / 0.12)',
      border: 'oklch(75% 0.22 348 / 0.55)',
      glow:   'oklch(75% 0.22 348 / 0.25)',
    },
  },
] as const

type ScenarioId = (typeof SCENARIOS)[number]['id']
type View = 'mobile' | 'desktop'

// ── Section ───────────────────────────────────────────────────────────────
export default function PlayerShowcase() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('wildwest')
  const [view, setView] = useState<View>('mobile')
  const pref = useReducedMotion()

  const scenario = SCENARIOS.find(s => s.id === scenarioId)!

  return (
    <section
      id="player"
      className="relative py-28 overflow-hidden"
      aria-labelledby="player-headline"
    >
      {/* Ambient background — shifts hue with active scenario */}
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-700"
        aria-hidden="true"
        style={{
          background:
            scenarioId === 'wildwest'
              ? 'radial-gradient(ellipse 700px 500px at 10% 50%, oklch(78% 0.17 52 / 0.05) 0%, transparent 55%)'
              : 'radial-gradient(ellipse 700px 500px at 10% 50%, oklch(75% 0.22 348 / 0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">

        {/* Left: scenario picker + device toggle + mockup */}
        <div className="flex flex-col items-center gap-5 order-2 lg:order-1">

          {/* ── Scenario picker ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-1 p-1 rounded-xl border w-full"
            style={{
              background: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
            role="group"
            aria-label="Choose scenario"
          >
            {SCENARIOS.map(s => {
              const active = s.id === scenarioId
              return (
                <button
                  key={s.id}
                  onClick={() => setScenarioId(s.id)}
                  aria-pressed={active}
                  className="relative flex-1 flex items-center gap-2.5 px-4 py-3 rounded-lg text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  style={{ color: active ? 'var(--fg-0)' : 'var(--fg-3)' }}
                >
                  {active && (
                    <motion.div
                      layoutId="scenario-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: s.accent.bg,
                        border: `1px solid ${s.accent.border}`,
                        boxShadow: `0 0 18px ${s.accent.glow}`,
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  {/* Accent dot — pulses when active */}
                  <motion.span
                    className="relative w-2 h-2 rounded-full flex-none"
                    style={{ background: active ? s.accent.color : 'rgba(255,255,255,0.18)' }}
                    animate={active ? { scale: [1, 1.35, 1], opacity: [1, 0.55, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="relative min-w-0">
                    <p className="text-xs font-semibold leading-tight truncate">{s.label}</p>
                    <p
                      className="font-mono text-[9px] tracking-widest uppercase leading-tight mt-0.5"
                      style={{ color: active ? s.accent.color : 'var(--fg-4)' }}
                    >
                      {s.genre}
                    </p>
                  </div>
                </button>
              )
            })}
          </motion.div>

          {/* ── Device toggle ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex items-center gap-1 p-1 rounded-xl border"
            style={{
              background: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
            role="group"
            aria-label="Switch device view"
          >
            {([
              { id: 'mobile',  label: 'Mobile',  Icon: Smartphone },
              { id: 'desktop', label: 'Desktop', Icon: Monitor    },
            ] as { id: View; label: string; Icon: React.FC<{ size: number }> }[]).map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                aria-pressed={view === id}
                className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                style={{ color: view === id ? 'oklch(82% 0.18 165)' : 'var(--fg-3)' }}
              >
                {view === id && (
                  <motion.div
                    layoutId="device-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'oklch(82% 0.18 165 / 0.1)',
                      border: '1px solid oklch(82% 0.18 165 / 0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <Icon size={12} />
                <span className="relative">{label}</span>
              </button>
            ))}
          </motion.div>

          {/* ── Frame — key includes scenario so it remounts on switch ── */}
          <AnimatePresence mode="wait">
            {view === 'mobile' ? (
              <PhoneFrame
                key={`mobile-${scenarioId}`}
                pref={!!pref}
                url={scenario.url}
              />
            ) : (
              <DesktopFrame
                key={`desktop-${scenarioId}`}
                pref={!!pref}
                url={scenario.url}
                displayUrl={scenario.displayUrl}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right: copy */}
        <div className="space-y-8 order-1 lg:order-2">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--neon-violet)' }}
          >
            Scenario Player
          </motion.span>

          <motion.h2
            id="player-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
          >
            One link.
            <br />
            <span style={{ color: 'var(--fg-2)' }}>Any device.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base leading-relaxed"
            style={{ color: 'var(--fg-2)' }}
          >
            Players open a link, watch the scene, choose a response, receive feedback when
            relevant, and continue to the next moment. No installation. No login. No friction —
            on mobile or desktop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="space-y-4"
          >
            {[
              { icon: '🔗', label: 'Public shareable URL', desc: 'One link works everywhere — no sign-up required for players.' },
              { icon: '📱', label: 'Mobile-first, desktop-ready', desc: 'Tap the toggle to see the same scenario adapt across devices.' },
              { icon: '🎬', label: 'Choices after scenes', desc: 'Decision buttons appear at the right moment after each video clip.' },
              { icon: '💬', label: 'Optional coaching feedback', desc: 'Creators attach context or coaching after any choice.' },
              { icon: '↩️', label: 'Replay and explore', desc: 'Players can restart and explore every path through the scenario.' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5" aria-hidden="true">{f.icon}</span>
                <div>
                  <p className="text-sm font-medium">{f.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--fg-3)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Shared placeholder / loading UI ──────────────────────────────────────
function ActivatePlaceholder({ onActivate }: { onActivate: () => void }) {
  return (
    <button
      onClick={onActivate}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 w-full border-0"
      style={{ background: '#08090d', cursor: 'pointer' }}
      aria-label="Launch interactive demo"
    >
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'oklch(82% 0.18 165 / 0.12)',
          border: '1.5px solid oklch(82% 0.18 165 / 0.4)',
          boxShadow: '0 0 28px oklch(82% 0.18 165 / 0.18)',
        }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px oklch(82% 0.18 165 / 0.35)' }}
        transition={{ duration: 0.2 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <polygon points="7,4 17,10 7,16" fill="oklch(82% 0.18 165)" />
        </svg>
      </motion.div>
      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-3)' }}>
        Try it
      </span>
    </button>
  )
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3" style={{ background: '#08090d' }}>
      <motion.div
        className="w-8 h-8 rounded-full border-2"
        style={{ borderColor: 'oklch(82% 0.18 165 / 0.3)', borderTopColor: 'oklch(82% 0.18 165)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-4)' }}>Loading</span>
    </div>
  )
}

// ── Phone mockup (landscape) ──────────────────────────────────────────────
function PhoneFrame({ pref, url }: { pref: boolean; url: string }) {
  const [activated, setActivated] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -14 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '900px' }}
    >
      <motion.div
        animate={pref ? {} : { rotateX: [1, 3.5, 1], rotateY: [-4, -8, -4], y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative">
          <div
            className="relative overflow-hidden"
            style={{
              width: 520, height: 280, borderRadius: 32,
              background: '#08090d',
              border: '2px solid rgba(255,255,255,0.13)',
              boxShadow: '0 32px 90px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20" style={{ width: 90, height: 24, borderRadius: 20, background: '#08090d' }} aria-hidden="true" />
            <div className="absolute top-0 right-24 w-10 h-[2px] rounded-b-sm" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />
            <div className="absolute top-0 right-36 w-8 h-[2px] rounded-b-sm" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-12 rounded-l-sm" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />

            {!activated && <ActivatePlaceholder onActivate={() => setActivated(true)} />}
            {activated && !loaded && <LoadingSpinner />}
            {activated && (
              <iframe
                src={url}
                onLoad={() => setLoaded(true)}
                className="absolute inset-0 w-full h-full border-0"
                allow="fullscreen"
                title="BranchLab scenario player — mobile landscape view"
                style={{ borderRadius: 'inherit' }}
              />
            )}
          </div>
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
            style={{ width: 340, height: 40, background: 'oklch(78% 0.18 285 / 0.25)' }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Desktop mockup ────────────────────────────────────────────────────────
function DesktopFrame({ pref, url, displayUrl }: { pref: boolean; url: string; displayUrl: string }) {
  const [activated, setActivated] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -14 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[540px]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={pref ? {} : { y: [0, -7, 0], rotateX: [0.5, 1.5, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative">
          <div
            className="w-full overflow-hidden"
            style={{
              borderRadius: 12, background: '#08090d',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}
            >
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} aria-hidden="true" />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} aria-hidden="true" />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} aria-hidden="true" />
              </div>
              <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div
                className="flex flex-1 items-center gap-1.5 px-3 py-1 rounded-md min-w-0"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                  <rect x="1.5" y="4" width="6" height="4.5" rx="1" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" />
                  <path d="M3 4V3a1.5 1.5 0 013 0v1" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" />
                </svg>
                <span className="font-mono text-[9px] truncate" style={{ color: 'var(--fg-4)' }}>
                  {displayUrl}
                </span>
              </div>
            </div>

            {/* Content area */}
            <div className="relative" style={{ height: 360 }}>
              {!activated && <ActivatePlaceholder onActivate={() => setActivated(true)} />}
              {activated && !loaded && <LoadingSpinner />}
              {activated && (
                <iframe
                  src={url}
                  onLoad={() => setLoaded(true)}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="fullscreen"
                  title="BranchLab scenario player — desktop view"
                />
              )}
            </div>
          </div>
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
            style={{ width: '70%', height: 36, background: 'oklch(78% 0.18 285 / 0.22)' }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
