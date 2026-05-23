'use client'

import { motion } from 'framer-motion'
import { GitBranch, Layers, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: GitBranch, label: 'Visual node canvas', desc: 'Drag, connect, and rearrange scenes with a click.' },
  { icon: Layers,    label: 'Multi-branch structure', desc: 'Layer unlimited decision paths without losing track.' },
  { icon: CheckCircle2, label: 'Built-in validation', desc: 'Catch dead ends and broken links before you publish.' },
]

// Node descriptors for the scenario graph
const NODES = [
  { id: 'start',    x: 170, y: 12,  grad: 'vt-blue',  title: 'Opening',       choices: ['Speak up', 'Hold back'],          highlighted: false, isStart: true },
  { id: 'speakup',  x: 50,  y: 130, grad: 'vt-mint',  title: 'Speak Up',      choices: ['Direct ask', 'Gentle push'],      highlighted: true,  isStart: false },
  { id: 'holdback', x: 290, y: 130, grad: 'vt-warm',  title: 'Hold Back',     choices: ['Wait for prompt', 'Exit quietly'],highlighted: false, isStart: false },
  { id: 'direct',   x: 0,   y: 260, grad: 'vt-mint',  title: 'Direct Ask',    choices: ['Outcome A'],                      highlighted: false, isStart: false },
  { id: 'gentle',   x: 110, y: 260, grad: 'vt-blue',  title: 'Gentle Push',   choices: ['Outcome B'],                      highlighted: false, isStart: false },
  { id: 'wait',     x: 250, y: 260, grad: 'vt-blue',  title: 'Wait…',         choices: ['Coaching'],                       highlighted: false, isStart: false },
  { id: 'exit',     x: 360, y: 260, grad: 'vt-warm',  title: 'Exit Quietly',  choices: ['Outcome C'],                      highlighted: false, isStart: false },
  { id: 'coaching', x: 220, y: 370, grad: 'vt-violet', title: 'Coaching',     choices: [],                                 highlighted: false, isStart: false },
  { id: 'outA',     x: 30,  y: 380, grad: 'vt-amber', title: 'Outcome A',     choices: [],                                 highlighted: false, isStart: false },
  { id: 'outB',     x: 140, y: 380, grad: 'vt-amber', title: 'Outcome B',     choices: [],                                 highlighted: false, isStart: false },
  { id: 'outC',     x: 360, y: 380, grad: 'vt-amber', title: 'Outcome C',     choices: [],                                 highlighted: false, isStart: false },
]

// Edges: [fromNodeCenterX, fromNodeCenterY, toNodeCenterX, toNodeCenterY]
const NODE_W = 110
const NODE_H = 70

function nodeCenter(id: string): [number, number] {
  const n = NODES.find(n => n.id === id)!
  return [n.x + NODE_W / 2, n.y + NODE_H / 2]
}

const EDGES: Array<[string, string, boolean]> = [
  ['start', 'speakup', false],
  ['start', 'holdback', false],
  ['speakup', 'direct', true],
  ['speakup', 'gentle', false],
  ['holdback', 'wait', false],
  ['holdback', 'exit', false],
  ['direct', 'outA', false],
  ['gentle', 'outB', false],
  ['wait', 'coaching', false],
  ['exit', 'outC', false],
]

function SceneNode({
  x, y, grad, title, highlighted, isStart,
}: {
  x: number; y: number; grad: string; title: string
  highlighted: boolean; isStart: boolean
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Glow on highlighted */}
      {highlighted && (
        <rect
          x={-4} y={-4} width={NODE_W + 8} height={NODE_H + 8} rx={12}
          fill="oklch(82% 0.18 165 / 0.18)"
          filter="url(#glow-mint)"
        />
      )}
      {/* Card body */}
      <rect
        width={NODE_W} height={NODE_H} rx={8}
        fill="rgba(16,18,26,0.95)"
        stroke={highlighted ? 'oklch(82% 0.18 165 / 0.7)' : 'rgba(255,255,255,0.1)'}
        strokeWidth={highlighted ? 1.5 : 0.8}
      />
      {/* Video thumbnail strip */}
      <rect x={0} y={0} width={NODE_W} height={32} rx="8 8 0 0" fill={`url(#${grad})`} opacity={0.9} />
      <rect x={0} y={24} width={NODE_W} height={8} fill="rgba(16,18,26,0.95)" />
      {/* Play icon */}
      <circle cx={NODE_W / 2} cy={16} r={8} fill="rgba(0,0,0,0.4)" />
      <polygon
        points={`${NODE_W / 2 - 3},12 ${NODE_W / 2 - 3},20 ${NODE_W / 2 + 5},16`}
        fill="rgba(255,255,255,0.85)"
      />
      {/* Title */}
      <text x={8} y={46} fontFamily="sans-serif" fontSize={8.5} fontWeight="600" fill="rgba(255,255,255,0.9)">
        {title}
      </text>
      {/* Start badge */}
      {isStart && (
        <>
          <rect x={8} y={52} width={26} height={10} rx={3} fill="oklch(78% 0.18 285 / 0.25)" stroke="oklch(78% 0.18 285 / 0.4)" strokeWidth={0.6} />
          <text x={21} y={60} textAnchor="middle" fontFamily="monospace" fontSize={5.5} fill="oklch(78% 0.18 285)">START</text>
        </>
      )}
    </g>
  )
}

function ScenarioGraph() {
  return (
    <svg
      viewBox="0 0 480 465"
      className="w-full h-full"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Gradient fills */}
        <linearGradient id="vt-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(60% 0.18 240)" />
          <stop offset="100%" stopColor="oklch(55% 0.2 270)" />
        </linearGradient>
        <linearGradient id="vt-mint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(58% 0.2 165)" />
          <stop offset="100%" stopColor="oklch(52% 0.22 200)" />
        </linearGradient>
        <linearGradient id="vt-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(60% 0.18 30)" />
          <stop offset="100%" stopColor="oklch(55% 0.2 15)" />
        </linearGradient>
        <linearGradient id="vt-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(60% 0.2 285)" />
          <stop offset="100%" stopColor="oklch(55% 0.22 300)" />
        </linearGradient>
        <linearGradient id="vt-amber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(72% 0.16 60)" />
          <stop offset="100%" stopColor="oklch(66% 0.18 40)" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow-mint" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Edge gradient */}
        <linearGradient id="edge-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>
        {/* Particle */}
        <radialGradient id="particle-mint">
          <stop offset="0%" stopColor="oklch(82% 0.18 165)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(82% 0.18 165)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="particle-violet">
          <stop offset="0%" stopColor="oklch(78% 0.18 285)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(78% 0.18 285)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges */}
      {EDGES.map(([from, to, highlighted], i) => {
        const [x1, y1] = nodeCenter(from)
        const [x2, y2] = nodeCenter(to)
        const midY = (y1 + y2) / 2
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
            fill="none"
            stroke={highlighted ? 'oklch(82% 0.18 165 / 0.6)' : 'url(#edge-grad)'}
            strokeWidth={highlighted ? 1.8 : 1}
            strokeDasharray={highlighted ? undefined : '3 3'}
          />
        )
      })}

      {/* Animated particle on highlighted edge */}
      {(() => {
        const [x1, y1] = nodeCenter('start')
        const [x2, y2] = nodeCenter('speakup')
        const midY = (y1 + y2) / 2
        return (
          <circle r={3} fill="url(#particle-mint)">
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              path={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
            />
          </circle>
        )
      })()}
      {(() => {
        const [x1, y1] = nodeCenter('speakup')
        const [x2, y2] = nodeCenter('direct')
        const midY = (y1 + y2) / 2
        return (
          <circle r={2.5} fill="url(#particle-mint)" opacity={0.7}>
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              begin="1.2s"
              path={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
            />
          </circle>
        )
      })()}

      {/* Nodes */}
      {NODES.map(n => (
        <SceneNode key={n.id} {...n} />
      ))}

      {/* Cursor dot to imply interactivity */}
      <motion.g
        animate={{ x: [0, 26, 26, 0, 0], y: [0, 0, 20, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: 0, originY: 0 }}
      >
        <circle
          cx={nodeCenter('speakup')[0] + 52}
          cy={nodeCenter('speakup')[1] - 18}
          r={5}
          fill="white"
          opacity={0.9}
        />
        <circle
          cx={nodeCenter('speakup')[0] + 52}
          cy={nodeCenter('speakup')[1] - 18}
          r={10}
          fill="white"
          opacity={0.12}
        />
      </motion.g>
    </svg>
  )
}

function EditorMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        background: 'rgb(11,12,18)',
        borderColor: 'rgba(255,255,255,0.1)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* App chrome */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ background: 'rgba(8,9,14,0.9)', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-xs" style={{ color: 'var(--fg-3)' }}>
          Tough Conversations · DRAFT
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div
            className="px-3 py-1 rounded-md text-xs font-semibold"
            style={{
              background: 'oklch(82% 0.18 165 / 0.15)',
              color: 'oklch(82% 0.18 165)',
              border: '1px solid oklch(82% 0.18 165 / 0.3)',
            }}
          >
            Publish →
          </div>
        </div>
      </div>

      {/* Body: sidebar + canvas */}
      <div className="flex" style={{ height: 420 }}>
        {/* Sidebar */}
        <div
          className="flex-none w-40 border-r overflow-y-auto p-2 space-y-0.5"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(8,9,14,0.5)' }}
        >
          <div className="px-2 py-1.5 font-mono text-xs mb-2" style={{ color: 'var(--fg-3)' }}>
            SCENES (11)
          </div>
          {NODES.map((n, i) => (
            <div
              key={n.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs"
              style={{
                background: n.highlighted ? 'oklch(82% 0.18 165 / 0.1)' : i === 0 ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: n.highlighted ? 'oklch(82% 0.18 165)' : 'var(--fg-2)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-none"
                style={{
                  background: n.grad === 'vt-mint' ? 'oklch(82% 0.18 165)' :
                    n.grad === 'vt-violet' ? 'oklch(78% 0.18 285)' :
                    n.grad === 'vt-amber' ? 'oklch(80% 0.16 60)' :
                    n.grad === 'vt-warm' ? 'oklch(70% 0.18 25)' :
                    'oklch(70% 0.18 240)',
                }}
              />
              <span className="truncate">{n.title}</span>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden" style={{ background: 'rgba(8,9,14,0.3)' }}>
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 p-4">
            <ScenarioGraph />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-4 px-4 py-2 border-t font-mono text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'var(--fg-3)', background: 'rgba(8,9,14,0.7)' }}
      >
        <span style={{ color: 'oklch(82% 0.18 165)' }}>● 11 scenes</span>
        <span>14 edges</span>
        <span>3 endpoints</span>
        <span className="ml-auto" style={{ color: 'oklch(80% 0.16 60)' }}>2 warnings</span>
      </div>
    </div>
  )
}

export default function CanvasSection() {
  return (
    <section
      id="studio"
      className="relative py-32 overflow-hidden"
      aria-labelledby="studio-headline"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 70% 50%, oklch(78% 0.18 285 / 0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 400px 300px at 20% 60%, oklch(82% 0.18 165 / 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-center">

          {/* Left: copy */}
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
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
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.1]"
            >
              Map the whole scenario,
              <br />
              <span style={{ color: 'var(--fg-2)' }}>not just the next clip.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--fg-2)' }}
            >
              A visual canvas that makes the branching structure of your scenario obvious at a glance —
              drag, connect, validate, and publish without ever leaving the browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="space-y-5"
            >
              {features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-none"
                    style={{
                      background: 'oklch(82% 0.18 165 / 0.1)',
                      border: '1px solid oklch(82% 0.18 165 / 0.25)',
                    }}
                  >
                    <Icon size={15} style={{ color: 'oklch(82% 0.18 165)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">{label}</p>
                    <p className="text-sm" style={{ color: 'var(--fg-3)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D editor mockup */}
          <motion.div
            initial={{ opacity: 0, rotateX: -18, rotateY: 10, y: 40 }}
            whileInView={{ opacity: 1, rotateX: -6, rotateY: 4, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
          >
            <EditorMockup />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
