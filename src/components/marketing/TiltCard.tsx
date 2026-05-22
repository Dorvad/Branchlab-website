'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  maxTilt?: number
  glare?: boolean
}

export default function TiltCard({
  children,
  className,
  style,
  maxTilt = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 220, damping: 28 })
  const y = useSpring(rawY, { stiffness: 220, damping: 28 })

  const rotateX = useTransform(y, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`])
  const rotateY = useTransform(x, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`])

  // Glare follows cursor position
  const glareX = useTransform(x, [-0.5, 0.5], ['15%', '85%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['15%', '85%'])
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 })
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.10) 0%, transparent 55%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
    glareOpacity.set(1)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    glareOpacity.set(0)
  }

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
      {glare && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: glareOpacity,
            background: glareBackground,
            mixBlendMode: 'screen',
            zIndex: 10,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}
