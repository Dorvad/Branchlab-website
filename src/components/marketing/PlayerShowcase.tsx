'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Smartphone, Monitor, Volume2, VolumeX, RotateCcw } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────
interface BranchChoice { id: string; label: string; targetNodeId: string }
interface BranchNode {
  type: 'start' | 'scene' | 'ending'
  title: string
  video: string
  thumbnail: string
  choices: BranchChoice[]
}
interface ScenarioData { startNodeId: string; nodes: Record<string, BranchNode> }
interface Accent { color: string; bg: string; border: string; glow: string }

// ── Static scenario data (bundled from .blab exports) ─────────────────────
const BASE = 'https://intzkjqmxrlfcbqjlaoj.supabase.co/storage/v1/object/public/Assets/6eea7bca-e4c2-413a-82fa-e406c9abdc82'

const SCENARIO_DATA: Record<string, ScenarioData> = {
  wildwest: {
    startNodeId: 'node-1780045350132-16',
    nodes: {
      'node-1780045350132-16': {
        type: 'start', title: 'Start',
        video: `${BASE}/74d87d86-b956-410f-93e3-5aa915e5cbee.mp4`,
        thumbnail: `${BASE}/74d87d86-b956-410f-93e3-5aa915e5cbee-thumb.jpg`,
        choices: [
          { id: 'c1', label: 'Draw', targetNodeId: 'node-1780045370406' },
          { id: 'c2', label: 'Back away', targetNodeId: 'node-1780045368020' },
          { id: 'c3', label: 'Talk it out', targetNodeId: 'node-1780045373266' },
          { id: 'c4', label: 'Run', targetNodeId: 'node-1780045405485' },
        ],
      },
      'node-1780045368020': {
        type: 'ending', title: "The coward's path",
        video: `${BASE}/1ff2bddf-4fbe-4c88-8711-ba6c73cd0af3.mp4`,
        thumbnail: `${BASE}/1ff2bddf-4fbe-4c88-8711-ba6c73cd0af3-thumb.jpg`,
        choices: [],
      },
      'node-1780045370406': {
        type: 'ending', title: 'High noon',
        video: `${BASE}/aa78646c-d24e-4bc6-813d-ba41d879ddda.mp4`,
        thumbnail: `${BASE}/aa78646c-d24e-4bc6-813d-ba41d879ddda-thumb.jpg`,
        choices: [],
      },
      'node-1780045373266': {
        type: 'ending', title: 'Words win',
        video: `${BASE}/ddef5983-0797-4e22-947a-87adbae4f701.mp4`,
        thumbnail: `${BASE}/ddef5983-0797-4e22-947a-87adbae4f701-thumb.jpg`,
        choices: [],
      },
      'node-1780045405485': {
        type: 'ending', title: 'Dust in the wind',
        video: `${BASE}/1ff3f73e-8363-41c0-ac05-a6f2ae66eaad.mp4`,
        thumbnail: `${BASE}/1ff3f73e-8363-41c0-ac05-a6f2ae66eaad-thumb.jpg`,
        choices: [],
      },
    },
  },
  promask: {
    startNodeId: 'node-1780044793357-2',
    nodes: {
      'node-1780044793357-2': {
        type: 'start', title: 'Opening Scene',
        video: `${BASE}/82ca46e6-d457-4981-8e61-c307334c4202.mp4`,
        thumbnail: `${BASE}/82ca46e6-d457-4981-8e61-c307334c4202-thumb.jpg`,
        choices: [
          { id: 'c1', label: 'Try to be funny', targetNodeId: 'node-1780044793357-4' },
          { id: 'c2', label: 'Ask honestly', targetNodeId: 'node-1780044793357-5' },
        ],
      },
      'node-1780044793357-4': {
        type: 'scene', title: 'She walks away…',
        video: `${BASE}/d85993ce-cafb-4fa8-bee3-e80662d8192a.mp4`,
        thumbnail: `${BASE}/d85993ce-cafb-4fa8-bee3-e80662d8192a-thumb.jpg`,
        choices: [
          { id: 'c1', label: '"Maya, wait!"', targetNodeId: 'node-1780044876250' },
        ],
      },
      'node-1780044793357-5': {
        type: 'ending', title: 'You did it!',
        video: `${BASE}/b999c34c-0123-41ca-855c-d843fd603f76.mp4`,
        thumbnail: `${BASE}/b999c34c-0123-41ca-855c-d843fd603f76-thumb.jpg`,
        choices: [],
      },
      'node-1780044876250': {
        type: 'scene', title: 'Last chance',
        video: `${BASE}/e65701bd-0787-4dbd-82c7-6a6f74c4e54b.mp4`,
        thumbnail: `${BASE}/e65701bd-0787-4dbd-82c7-6a6f74c4e54b-thumb.jpg`,
        choices: [
          { id: 'c1', label: 'Ask honestly', targetNodeId: 'node-1780044793357-5' },
          { id: 'c2', label: 'Try to be funny, again', targetNodeId: 'node-1780044946407' },
        ],
      },
      'node-1780044946407': {
        type: 'ending', title: 'You messed up',
        video: `${BASE}/d954fced-3f65-481d-8c8a-b933ea19bbb2.mp4`,
        thumbnail: `${BASE}/d954fced-3f65-481d-8c8a-b933ea19bbb2-thumb.jpg`,
        choices: [],
      },
    },
  },
}

// ── Scenario definitions ──────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'wildwest',
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
    id: 'promask',
    displayUrl: 'branchlab.online/play/promask',
    label: 'Ask Your Crush',
    genre: 'Romance',
    accent: {
      color:  'oklch(72% 0.19 200)',
      bg:     'oklch(72% 0.19 200 / 0.12)',
      border: 'oklch(72% 0.19 200 / 0.55)',
      glow:   'oklch(72% 0.19 200 / 0.25)',
    },
  },
] as const

type ScenarioId = (typeof SCENARIOS)[number]['id']
type View = 'mobile' | 'desktop'

// ── Inline branch player ──────────────────────────────────────────────────
function InlinePlayer({ scenarioId, accent }: { scenarioId: string; accent: Accent }) {
  const data = SCENARIO_DATA[scenarioId]
  const [currentNodeId, setCurrentNodeId] = useState(data.startNodeId)
  const [showChoices, setShowChoices] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const node = data.nodes[currentNodeId]
  const isEnding = node.type === 'ending'

  const goToNode = (targetNodeId: string) => {
    setCurrentNodeId(targetNodeId)
    setShowChoices(false)
  }

  const restart = () => {
    setCurrentNodeId(data.startNodeId)
    setShowChoices(false)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Video — key remounts element on node change, triggering autoPlay */}
      <video
        ref={videoRef}
        key={currentNodeId}
        src={node.video}
        poster={node.thumbnail}
        autoPlay
        playsInline
        muted
        onEnded={() => setShowChoices(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.55)' }}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted
          ? <VolumeX size={12} style={{ color: 'rgba(255,255,255,0.7)' }} />
          : <Volume2 size={12} style={{ color: 'white' }} />}
      </button>

      {/* Choices / ending overlay */}
      <AnimatePresence>
        {showChoices && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute inset-x-0 bottom-0 p-3"
            style={{
              paddingTop: '2.5rem',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.82) 35%)',
            }}
          >
            {isEnding ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-semibold text-center" style={{ color: accent.color }}>
                  {node.title}
                </p>
                <button
                  onClick={restart}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                  style={{
                    background: accent.bg,
                    border: `1px solid ${accent.border}`,
                    boxShadow: `0 0 14px ${accent.glow}`,
                  }}
                >
                  <RotateCcw size={10} />
                  Play again
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: node.choices.length > 2 ? '1fr 1fr' : '1fr',
                  gap: '0.375rem',
                }}
              >
                {node.choices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => goToNode(choice.targetNodeId)}
                    className="px-2.5 py-2 rounded-lg text-xs font-medium text-center leading-tight text-white"
                    style={{
                      background: accent.bg,
                      border: `1px solid ${accent.border}`,
                      boxShadow: `0 0 12px ${accent.glow}`,
                    }}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
              : 'radial-gradient(ellipse 700px 500px at 10% 50%, oklch(72% 0.19 200 / 0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">

        {/* Left: scenario picker + device toggle + mockup */}
        <div className="flex flex-col items-center gap-5 order-2 lg:order-1">

          {/* Scenario picker */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-1 p-1 rounded-xl border w-full"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
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

          {/* Device toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex items-center gap-1 p-1 rounded-xl border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
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

          {/* Frame — key remounts on scenario switch */}
          <AnimatePresence mode="wait">
            {view === 'mobile' ? (
              <PhoneFrame
                key={`mobile-${scenarioId}`}
                pref={!!pref}
                scenarioId={scenarioId}
                accent={scenario.accent}
              />
            ) : (
              <DesktopFrame
                key={`desktop-${scenarioId}`}
                pref={!!pref}
                scenarioId={scenarioId}
                accent={scenario.accent}
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

// ── Shared "Try it" placeholder ───────────────────────────────────────────
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

// ── Responsive scale hook ─────────────────────────────────────────────────
function useFrameScale(targetWidth: number) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const parent = wrapperRef.current?.parentElement
      if (!parent) return
      setScale(Math.min(1, parent.clientWidth / targetWidth))
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapperRef.current?.parentElement) ro.observe(wrapperRef.current.parentElement)
    return () => ro.disconnect()
  }, [targetWidth])
  return { wrapperRef, scale }
}

// ── Phone mockup (landscape) ──────────────────────────────────────────────
function PhoneFrame({
  pref, scenarioId, accent,
}: {
  pref: boolean; scenarioId: string; accent: Accent
}) {
  const [activated, setActivated] = useState(false)
  const { wrapperRef, scale } = useFrameScale(520)

  return (
    <div
      ref={wrapperRef}
      className="w-full flex justify-center"
      style={{ height: Math.round((280 + 32) * scale) }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -14 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '900px', transformOrigin: 'top center' }}
      >
        <motion.div
          animate={pref ? {} : { rotateX: [1, 3.5, 1], rotateY: [-4, -8, -4], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative" style={{ scale, transformOrigin: 'top center' }}>
            <div
              className="relative overflow-hidden"
              style={{
                width: 520, height: 280, borderRadius: 32,
                background: '#08090d',
                border: '2px solid rgba(255,255,255,0.13)',
                boxShadow: '0 32px 90px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              {/* Decorative phone details */}
              <div className="absolute top-3 right-3.5 z-20 rounded-full" style={{ width: 7, height: 7, background: 'rgba(255,255,255,0.13)', boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }} aria-hidden="true" />
              <div className="absolute top-0 right-24 w-10 h-[2px] rounded-b-sm" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />
              <div className="absolute top-0 right-36 w-8  h-[2px] rounded-b-sm" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-12 rounded-l-sm" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />

              {!activated
                ? <ActivatePlaceholder onActivate={() => setActivated(true)} />
                : <InlinePlayer scenarioId={scenarioId} accent={accent} />}
            </div>
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
              style={{ width: 340, height: 40, background: 'oklch(78% 0.18 285 / 0.25)' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Desktop mockup ────────────────────────────────────────────────────────
function DesktopFrame({
  pref, scenarioId, accent, displayUrl,
}: {
  pref: boolean; scenarioId: string; accent: Accent; displayUrl: string
}) {
  const [activated, setActivated] = useState(false)

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
              {!activated
                ? <ActivatePlaceholder onActivate={() => setActivated(true)} />
                : <InlinePlayer scenarioId={scenarioId} accent={accent} />}
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
