'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, Layers, CheckCircle2, Eye, Upload, Save } from 'lucide-react'

const stages = [
  {
    id: 'empty',
    label: 'Empty canvas',
    description: 'Start with a blank scenario. Name it, set an opening, and the canvas is ready for your nodes.',
  },
  {
    id: 'clip',
    label: 'Attach a clip',
    description: 'Drag a video from the asset library onto the canvas. A new scene node is created automatically.',
  },
  {
    id: 'connect',
    label: 'Add choices',
    description: 'Write choices at the end of each scene. Drag edges to connect them to destination nodes.',
  },
  {
    id: 'inspect',
    label: 'Inspect a node',
    description: 'Click any node to open the inspector. Edit titles, choices, feedback, and destination logic.',
  },
  {
    id: 'validate',
    label: 'Validate and publish',
    description: 'Run validation to catch errors. Once all issues are resolved, publish to a public URL.',
  },
]

export default function CreatorStudioShowcase() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <section
      id="creator-studio"
      className="relative py-28 overflow-hidden"
      aria-labelledby="studio-headline"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 800px 600px at 100% 50%, oklch(82% 0.18 165 / 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-end">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--neon-mint)' }}
            >
              Creator Studio
            </motion.span>
            <motion.h2
              id="studio-headline"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em]"
            >
              Map the whole scenario,
              <br />
              <span style={{ color: 'var(--fg-2)' }}>not just the next clip.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="space-y-5"
          >
            {[
              { icon: <GitBranch size={14} />, label: 'Visual node graph', desc: 'See the entire branching structure at a glance on an infinite canvas.' },
              { icon: <Layers size={14} />, label: 'Clip asset library', desc: 'Upload, preview, and attach video clips directly from the library panel.' },
              { icon: <CheckCircle2 size={14} />, label: 'Validation before publishing', desc: 'Catch dead ends, missing clips, and broken paths before learners see them.' },
              { icon: <Eye size={14} />, label: 'Live preview mode', desc: 'Step through your scenario exactly as a player would before you share it.' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'oklch(82% 0.18 165 / 0.1)', color: 'oklch(82% 0.18 165)' }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{f.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--fg-3)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stage selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(i)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: activeStage === i ? 'oklch(82% 0.18 165 / 0.12)' : 'rgba(255,255,255,0.03)',
                color: activeStage === i ? 'oklch(82% 0.18 165)' : 'var(--fg-3)',
                border: `1px solid ${activeStage === i ? 'oklch(82% 0.18 165 / 0.4)' : 'rgba(255,255,255,0.07)'}`,
              }}
              aria-pressed={activeStage === i}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Stage description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={stages[activeStage].id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm mb-6"
            style={{ color: 'var(--fg-2)' }}
          >
            {stages[activeStage].description}
          </motion.p>
        </AnimatePresence>

        {/* Editor mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border overflow-hidden"
          style={{
            background: 'rgba(8,9,13,0.95)',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
          aria-label="Creator Studio editor interface mockup"
        >
          {/* Top bar */}
          <EditorTopBar stage={activeStage} />

          {/* Main area */}
          <div className="flex" style={{ minHeight: 420 }}>
            {/* Left sidebar */}
            <EditorLeftSidebar stage={activeStage} />

            {/* Canvas */}
            <EditorCanvas stage={activeStage} />

            {/* Right inspector */}
            <AnimatePresence>
              {activeStage >= 3 && <EditorInspector stage={activeStage} />}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <EditorStatusBar stage={activeStage} />
        </motion.div>
      </div>
    </section>
  )
}

function EditorTopBar({ stage }: { stage: number }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 border-b"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(8,9,13,0.9)',
      }}
    >
      {/* Left: logo + title */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28ca41' }} />
        </div>
        <div>
          <span className="text-xs font-medium" style={{ color: 'var(--fg-1)' }}>Tough Conversations</span>
          <span className="ml-2 text-[10px] font-mono" style={{ color: 'var(--fg-4)' }}>· DRAFT</span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <TopBarBtn icon={<Upload size={11} />} label="Assets" />
        <TopBarBtn icon={<Eye size={11} />} label="Preview" />
        <TopBarBtn
          icon={<CheckCircle2 size={11} />}
          label="Validate"
          accent={stage >= 4}
        />
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          style={{
            background: stage >= 4 ? 'oklch(82% 0.18 165)' : 'rgba(255,255,255,0.06)',
            color: stage >= 4 ? '#052916' : 'var(--fg-2)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s',
          }}
        >
          <Save size={11} />
          Publish
        </div>
      </div>
    </div>
  )
}

function TopBarBtn({ icon, label, accent }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <button
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
      style={{
        background: accent ? 'oklch(82% 0.18 165 / 0.1)' : 'rgba(255,255,255,0.04)',
        color: accent ? 'oklch(82% 0.18 165)' : 'var(--fg-3)',
        border: `1px solid ${accent ? 'oklch(82% 0.18 165 / 0.3)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function EditorLeftSidebar({ stage }: { stage: number }) {
  return (
    <div
      className="w-44 shrink-0 border-r flex flex-col"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(8,9,13,0.6)',
      }}
    >
      {/* Scenario info */}
      <div className="p-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--fg-4)' }}>
          Scenario
        </p>
        <p className="text-[11px] font-medium" style={{ color: 'var(--fg-1)' }}>Tough Conversations</p>
        <p className="text-[10px] mt-0.5 font-mono" style={{ color: 'var(--fg-4)' }}>6 scenes · 2 endings</p>
      </div>

      {/* Nodes list */}
      <div className="p-3 flex-1">
        <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--fg-4)' }}>
          Nodes
        </p>
        <div className="space-y-1">
          {[
            { label: 'Opening', type: 'START', accent: 'mint' },
            { label: 'The Situation', type: 'SCENE', accent: '' },
            { label: 'Speak Up', type: 'SCENE', accent: 'selected' },
            { label: 'Ask for Time', type: 'SCENE', accent: '' },
            { label: 'Good effort', type: 'FEEDBACK', accent: 'violet' },
            { label: 'Resolution', type: 'ENDING', accent: 'amber' },
          ].map((node) => (
            <div
              key={node.label}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] cursor-pointer"
              style={{
                background:
                  node.accent === 'selected'
                    ? 'oklch(82% 0.18 165 / 0.08)'
                    : 'transparent',
                color:
                  node.accent === 'selected'
                    ? 'oklch(82% 0.18 165)'
                    : 'var(--fg-2)',
              }}
            >
              <NodeTypeDot accent={node.accent} />
              <span className="truncate">{node.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clips */}
      {stage >= 1 && (
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--fg-4)' }}>
            Clips
          </p>
          <div className="space-y-1">
            {['intro.mp4', 'speak-up.mp4', 'resolution.mp4'].map((c) => (
              <div key={c} className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--fg-3)' }}>
                <div className="w-6 h-4 rounded shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="truncate font-mono">{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NodeTypeDot({ accent }: { accent: string }) {
  const color =
    accent === 'mint' || accent === 'selected'
      ? 'oklch(82% 0.18 165)'
      : accent === 'violet'
        ? 'oklch(78% 0.18 285)'
        : accent === 'amber'
          ? 'oklch(80% 0.16 60)'
          : 'rgba(255,255,255,0.2)'
  return <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
}

function EditorCanvas({ stage }: { stage: number }) {
  return (
    <div
      className="flex-1 relative overflow-hidden mkt-dot-grid"
      style={{ background: 'rgba(8,9,13,0.4)' }}
      role="img"
      aria-label="Visual scenario graph canvas"
    >
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--fg-4)' }}>
                Empty canvas
              </p>
              <p className="text-[11px]" style={{ color: 'var(--fg-4)' }}>Drop a clip or create a node to start</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage >= 1 && (
        <svg viewBox="0 0 400 380" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
          {/* Edges */}
          {stage >= 2 && (
            <>
              <path d="M200,60 C200,100 120,100 120,130" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
              <path d="M200,60 C200,100 280,100 280,130" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
              <path d="M120,190 C120,230 120,230 120,255" stroke="oklch(78% 0.18 285 / 0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
              <path d="M120,190 C120,230 200,230 200,255" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
              <path d="M120,315 C120,340 200,340 200,340" stroke="oklch(80% 0.16 60 / 0.5)" strokeWidth="1.5" fill="none" />
            </>
          )}

          {/* START */}
          <rect x="160" y="30" width="80" height="30" rx="7" fill="oklch(82% 0.18 165 / 0.12)" stroke="oklch(82% 0.18 165 / 0.6)" strokeWidth="1.5" />
          <text x="200" y="50" textAnchor="middle" fill="oklch(82% 0.18 165)" fontFamily="monospace" fontSize="9" letterSpacing="1.5">START</text>

          {/* Scene A (selected in stages 3+) */}
          <rect
            x="80" y="130" width="80" height="60"
            rx="8"
            fill={stage >= 3 ? 'oklch(82% 0.18 165 / 0.08)' : 'rgba(255,255,255,0.04)'}
            stroke={stage >= 3 ? 'oklch(82% 0.18 165 / 0.6)' : 'rgba(255,255,255,0.12)'}
            strokeWidth={stage >= 3 ? '1.8' : '1'}
          />
          <rect x="84" y="134" width="72" height="24" rx="4" fill="rgba(255,255,255,0.05)" />
          <text x="120" y="146" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6" letterSpacing="0.8">VIDEO</text>
          <text x="120" y="170" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">Speak Up</text>
          <text x="120" y="182" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6">2 CHOICES</text>

          {/* Scene B */}
          <rect x="240" y="130" width="80" height="60" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="244" y="134" width="72" height="24" rx="4" fill="rgba(255,255,255,0.05)" />
          <text x="280" y="146" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6" letterSpacing="0.8">VIDEO</text>
          <text x="280" y="170" textAnchor="middle" fill="var(--fg-1)" fontSize="9" fontWeight="600">Ask for Time</text>
          <text x="280" y="182" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6">1 CHOICE</text>

          {/* Feedback */}
          {stage >= 2 && (
            <>
              <rect x="80" y="255" width="80" height="60" rx="8" fill="oklch(78% 0.18 285 / 0.08)" stroke="oklch(78% 0.18 285 / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="120" y="278" textAnchor="middle" fill="oklch(78% 0.18 285)" fontFamily="monospace" fontSize="6" letterSpacing="1">FEEDBACK</text>
              <text x="120" y="295" textAnchor="middle" fill="var(--fg-1)" fontSize="9">Good effort</text>
              <text x="120" y="307" textAnchor="middle" fill="var(--fg-3)" fontFamily="monospace" fontSize="6">COACHING</text>
            </>
          )}

          {/* Ending */}
          {stage >= 2 && (
            <rect x="160" y="325" width="80" height="30" rx="7" fill="oklch(80% 0.16 60 / 0.1)" stroke="oklch(80% 0.16 60 / 0.5)" strokeWidth="1.2" />
          )}
          {stage >= 2 && (
            <text x="200" y="344" textAnchor="middle" fill="oklch(80% 0.16 60)" fontFamily="monospace" fontSize="7" letterSpacing="1.5">ENDING</text>
          )}

          {/* Validation error indicator */}
          {stage === 4 && (
            <>
              <circle cx="80" cy="130" r="8" fill="oklch(70% 0.18 25 / 0.8)" />
              <text x="80" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">!</text>
            </>
          )}
        </svg>
      )}
    </div>
  )
}

function EditorInspector({ stage }: { stage: number }) {
  return (
    <motion.div
      key="inspector"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-52 shrink-0 border-l flex flex-col overflow-y-auto"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(8,9,13,0.7)',
      }}
    >
      <div className="p-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'var(--fg-4)' }}>
          Node inspector
        </p>
        <p className="text-xs font-semibold mt-1" style={{ color: 'oklch(82% 0.18 165)' }}>Speak Up</p>
      </div>
      <div className="p-3 space-y-4">
        <Field label="Title" value="Speak Up" />
        <Field label="Type" value="SCENE" mono />
        <div>
          <p className="text-[9px] font-mono uppercase tracking-widest mb-1.5" style={{ color: 'var(--fg-4)' }}>Video clip</p>
          <div className="w-full h-12 rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[9px]" style={{ color: 'var(--fg-3)' }}>speak-up.mp4 · 0:42</p>
          </div>
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--fg-4)' }}>Choices</p>
          <div className="space-y-1.5">
            <ChoiceRow label="Be direct" dest="Feedback" />
            <ChoiceRow label="Stay quiet" dest="Ask for Time" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[9px] font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--fg-4)' }}>{label}</p>
      <div
        className="px-2 py-1.5 rounded text-[10px]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'var(--fg-1)',
          fontFamily: mono ? 'monospace' : 'inherit',
        }}
      >
        {value}
      </div>
    </div>
  )
}

function ChoiceRow({ label, dest }: { label: string; dest: string }) {
  return (
    <div className="px-2 py-1.5 rounded text-[10px] space-y-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ color: 'var(--fg-1)' }}>{label}</p>
      <p className="font-mono" style={{ color: 'oklch(78% 0.18 285)' }}>→ {dest}</p>
    </div>
  )
}

function EditorStatusBar({ stage }: { stage: number }) {
  const hasError = stage === 4
  return (
    <div
      className="flex items-center justify-between px-4 py-2 border-t"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(8,9,13,0.8)',
      }}
    >
      <div className="flex items-center gap-4">
        {[
          { label: '6 scenes', color: 'var(--fg-4)' },
          { label: '2 endings', color: 'var(--fg-4)' },
          {
            label: hasError ? '1 error' : '0 errors',
            color: hasError ? 'oklch(70% 0.18 25)' : 'oklch(82% 0.18 165)',
          },
        ].map((s) => (
          <span key={s.label} className="font-mono text-[9px] uppercase tracking-widest" style={{ color: s.color }}>
            {s.label}
          </span>
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'var(--fg-4)' }}>
        Autosaved
      </span>
    </div>
  )
}
