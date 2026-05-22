'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RotateCcw, Smartphone } from 'lucide-react'

type PlayerStage = 'video' | 'choices' | 'feedback' | 'ending'

const choiceOptions = [
  { id: 'a', label: 'Speak up directly', result: 'feedback' as PlayerStage },
  { id: 'b', label: 'Ask for more time', result: 'ending' as PlayerStage },
  { id: 'c', label: 'Change the subject', result: 'ending' as PlayerStage },
]

export default function PlayerShowcase() {
  const [stage, setStage] = useState<PlayerStage>('video')
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [autoplay, setAutoplay] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!autoplay) return
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setStage('choices'), 2200))
    return () => timers.forEach(clearTimeout)
  }, [autoplay])

  function handleChoice(id: string, result: PlayerStage) {
    setSelectedChoice(id)
    setAutoplay(false)
    setTimeout(() => setStage(result), 500)
  }

  function handleRestart() {
    setStage('video')
    setSelectedChoice(null)
    setAutoplay(true)
  }

  return (
    <section
      id="player"
      className="relative py-28 overflow-hidden"
      aria-labelledby="player-headline"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 10% 50%, oklch(78% 0.18 285 / 0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: phone mockup */}
        <div
          className="flex justify-center order-2 lg:order-1"
          style={{ perspective: '900px' }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : {
              rotateY: [-8, -13, -8],
              rotateX: [2, 5, 2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
          <div className="relative">
            {/* Phone frame */}
            <div
              className="relative rounded-[40px] overflow-hidden shadow-2xl"
              style={{
                width: 280,
                height: 560,
                background: '#050607',
                border: '2px solid rgba(255,255,255,0.12)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                style={{
                  width: 80,
                  height: 22,
                  background: '#050607',
                  borderRadius: '0 0 16px 16px',
                }}
              />

              {/* Screen */}
              <div className="absolute inset-0 flex flex-col">
                <AnimatePresence mode="wait">
                  {stage === 'video' && (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 relative"
                    >
                      {/* Video placeholder with animated gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(160deg, #0d1118 0%, #111827 40%, #0a0c12 100%)',
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: 'radial-gradient(ellipse 200px 200px at 50% 35%, oklch(78% 0.18 285 / 0.4) 0%, transparent 70%)',
                        }}
                      />
                      {/* Scene label */}
                      <div className="absolute top-8 left-4 right-4">
                        <span
                          className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                          style={{
                            color: 'oklch(82% 0.18 165)',
                            borderColor: 'oklch(82% 0.18 165 / 0.3)',
                            background: 'oklch(82% 0.18 165 / 0.08)',
                          }}
                        >
                          PLAYING · 0:18 / 0:42
                        </span>
                      </div>
                      {/* Play indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center opacity-40"
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                          <div
                            className="w-0 h-0"
                            style={{
                              borderTop: '10px solid transparent',
                              borderBottom: '10px solid transparent',
                              borderLeft: '16px solid rgba(255,255,255,0.8)',
                              marginLeft: 3,
                            }}
                          />
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <motion.div
                          className="h-full"
                          style={{ background: 'oklch(82% 0.18 165)' }}
                          initial={{ width: '0%' }}
                          animate={{ width: '42%' }}
                          transition={{ duration: 2.2, ease: 'linear' }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {stage === 'choices' && (
                    <motion.div
                      key="choices"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col"
                    >
                      {/* Still frame backdrop */}
                      <div
                        className="flex-1"
                        style={{
                          background: 'linear-gradient(160deg, #0d1118 0%, #111827 40%, #0a0c12 100%)',
                          filter: 'blur(2px)',
                        }}
                      />
                      {/* Choice overlay */}
                      <div
                        className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-10"
                        style={{
                          background: 'linear-gradient(to top, rgba(5,6,7,0.98) 60%, transparent)',
                        }}
                      >
                        <p className="text-xs font-medium mb-3 text-center" style={{ color: 'var(--fg-2)' }}>
                          What do you do next?
                        </p>
                        <div className="space-y-2">
                          {choiceOptions.map((c, i) => (
                            <motion.button
                              key={c.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                              onClick={() => handleChoice(c.id, c.result)}
                              className="w-full px-3 py-2.5 rounded-xl text-left text-xs transition-all active:scale-95"
                              style={{
                                background:
                                  selectedChoice === c.id
                                    ? 'oklch(82% 0.18 165 / 0.2)'
                                    : 'rgba(255,255,255,0.07)',
                                border: `1px solid ${
                                  selectedChoice === c.id
                                    ? 'oklch(82% 0.18 165 / 0.6)'
                                    : 'rgba(255,255,255,0.12)'
                                }`,
                                color: selectedChoice === c.id ? 'oklch(82% 0.18 165)' : 'var(--fg-1)',
                              }}
                            >
                              <span
                                className="font-mono text-[9px] mr-2"
                                style={{ color: selectedChoice === c.id ? 'oklch(82% 0.18 165)' : 'var(--fg-4)' }}
                              >
                                {String.fromCharCode(64 + (i + 1))}
                              </span>
                              {c.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {stage === 'feedback' && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col"
                    >
                      <div
                        className="flex-1"
                        style={{ background: 'linear-gradient(160deg, #0d1118 0%, #111827 100%)', filter: 'blur(2px)' }}
                      />
                      <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-0 bottom-0 px-4 pb-6"
                        style={{
                          background: 'linear-gradient(to top, rgba(5,6,7,1) 70%, transparent)',
                          paddingTop: 60,
                        }}
                      >
                        <div
                          className="p-4 rounded-2xl mb-3"
                          style={{
                            background: 'oklch(78% 0.18 285 / 0.12)',
                            border: '1px solid oklch(78% 0.18 285 / 0.35)',
                          }}
                        >
                          <p
                            className="text-[9px] font-mono uppercase tracking-widest mb-2"
                            style={{ color: 'oklch(78% 0.18 285)' }}
                          >
                            Feedback
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-1)' }}>
                            Speaking up directly shows confidence and creates space for honest conversation —
                            even when it&apos;s uncomfortable.
                          </p>
                        </div>
                        <button
                          onClick={() => setStage('ending')}
                          className="w-full py-2.5 rounded-xl text-xs font-medium text-center"
                          style={{
                            background: 'oklch(82% 0.18 165)',
                            color: '#052916',
                          }}
                        >
                          Continue →
                        </button>
                      </motion.div>
                    </motion.div>
                  )}

                  {stage === 'ending' && (
                    <motion.div
                      key="ending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center px-5"
                      style={{ background: '#050607' }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                        style={{
                          background: 'oklch(80% 0.16 60 / 0.15)',
                          border: '1px solid oklch(80% 0.16 60 / 0.5)',
                          boxShadow: '0 0 30px oklch(80% 0.16 60 / 0.3)',
                        }}
                      >
                        <span className="text-xl">★</span>
                      </motion.div>
                      <p
                        className="font-mono text-[9px] tracking-widest uppercase mb-2"
                        style={{ color: 'oklch(80% 0.16 60)' }}
                      >
                        Scenario complete
                      </p>
                      <p className="text-sm font-semibold mb-1 text-center" style={{ color: 'var(--fg-0)' }}>
                        Resolution reached
                      </p>
                      <p className="text-[11px] text-center mb-6" style={{ color: 'var(--fg-3)' }}>
                        You chose to address the situation directly. The team moved forward.
                      </p>
                      <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs border"
                        style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--fg-2)' }}
                      >
                        <RotateCcw size={11} />
                        Try another path
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Glow under phone */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
              style={{
                width: 200,
                height: 40,
                background: 'oklch(78% 0.18 285 / 0.25)',
              }}
              aria-hidden="true"
            />
          </div>
          </motion.div>
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
            A cinematic experience
            <br />
            <span style={{ color: 'var(--fg-2)' }}>for the learner.</span>
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
            relevant, and continue to the next moment. No installation. No editor. No friction.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="space-y-4"
          >
            {[
              { icon: '🔗', label: 'Public URL', desc: 'Share a direct link — no sign-up required for players.' },
              { icon: '📱', label: 'Mobile-first player', desc: 'Designed for phones first. Works equally well on desktop.' },
              { icon: '🎬', label: 'Choices after scenes', desc: 'Decision buttons appear at the perfect moment after each video.' },
              { icon: '💬', label: 'Optional coaching feedback', desc: 'Creators can add context or explanation after any choice.' },
              { icon: '↩️', label: 'Replay and explore', desc: 'Players can restart and explore a different path through the scenario.' },
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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Smartphone size={14} style={{ color: 'var(--fg-3)' }} aria-hidden="true" />
            <p className="text-xs" style={{ color: 'var(--fg-3)' }}>
              The player is mobile-first. The editor is desktop-first.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
