'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RotatingTextProps {
  texts: string[]
  className?: string
  style?: CSSProperties
  rotationInterval?: number
  staggerDuration?: number
  transition?: Transition
}

/**
 * Cycles through a list of words, animating each character in/out with a
 * staggered slide. Adapted from a community "rotating text" pattern and
 * trimmed down to what this site needs (no imperative ref API, no
 * word/line splitting — this hero only ever rotates single words).
 */
export default function RotatingText({
  texts,
  className,
  style,
  rotationInterval = 2400,
  staggerDuration = 0.025,
  transition = { type: 'spring', damping: 26, stiffness: 280 },
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (texts.length <= 1) return
    const id = setInterval(() => setIndex(i => (i + 1) % texts.length), rotationInterval)
    return () => clearInterval(id)
  }, [texts.length, rotationInterval])

  const characters = useMemo(() => Array.from(texts[index] ?? ''), [texts, index])

  return (
    <span className={cn('relative inline-flex align-bottom', className)} style={style}>
      <span className="sr-only">{texts[index]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={index} aria-hidden="true" className="inline-flex">
          {characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block leading-none"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ ...transition, delay: i * staggerDuration }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
