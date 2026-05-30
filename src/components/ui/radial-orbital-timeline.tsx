"use client"
import { useState, useEffect, useRef } from "react"
import { ArrowRight, Link, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

// Brand colors
const MINT = "oklch(82% 0.18 165)"
const MINT_DIM = "oklch(60% 0.18 165)"
const VIOLET = "oklch(78% 0.18 285)"
const AMBER = "oklch(80% 0.16 60)"

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false
      })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const relatedItems = getRelatedItems(id)
        const newPulse: Record<number, boolean> = {}
        relatedItems.forEach((relId) => { newPulse[relId] = true })
        setPulseEffect(newPulse)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
      }, 50)
    }
    return () => { if (timer) clearInterval(timer) }
  }, [autoRotate])

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const targetAngle = (nodeIndex / timelineData.length) * 360
    setRotationAngle(270 - targetAngle)
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 200
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, angle, zIndex, opacity }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId)
    return item ? item.relatedIds : []
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const getStatusStyle = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return { label: "LIVE USE CASE", color: MINT, bg: "oklch(82% 0.18 165 / 0.12)", border: "oklch(82% 0.18 165 / 0.35)" }
      case "in-progress":
        return { label: "HIGH DEMAND", color: VIOLET, bg: "oklch(78% 0.18 285 / 0.12)", border: "oklch(78% 0.18 285 / 0.35)" }
      case "pending":
        return { label: "EMERGING", color: AMBER, bg: "oklch(80% 0.16 60 / 0.12)", border: "oklch(80% 0.16 60 / 0.35)" }
    }
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: 600 }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center orb — mint brand gradient */}
          <div
            className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10 animate-pulse"
            style={{
              background: `radial-gradient(circle at 40% 35%, ${MINT}, ${MINT_DIM})`,
              boxShadow: `0 0 40px oklch(82% 0.18 165 / 0.4)`,
            }}
          >
            <div
              className="absolute w-20 h-20 rounded-full border animate-ping opacity-60"
              style={{ borderColor: "oklch(82% 0.18 165 / 0.3)" }}
            />
            <div
              className="absolute w-28 h-28 rounded-full border animate-ping opacity-30"
              style={{ borderColor: "oklch(82% 0.18 165 / 0.15)", animationDelay: "0.5s" }}
            />
            {/* BranchLab branch icon */}
            <svg width="20" height="20" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <circle cx="10" cy="22" r="5" fill="rgba(5,41,22,0.9)" />
              <circle cx="36" cy="10" r="4" fill="rgba(5,41,22,0.8)" />
              <circle cx="36" cy="34" r="4" fill="rgba(5,41,22,0.8)" />
              <path d="M14 20 L31 12 M14 24 L31 32" stroke="rgba(5,41,22,0.7)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Orbit ring */}
          <div
            className="absolute w-96 h-96 rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon
            const statusStyle = getStatusStyle(item.status)

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id) }}
              >
                {/* Glow halo */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: `radial-gradient(circle, oklch(82% 0.18 165 / 0.15) 0%, transparent 70%)`,
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isExpanded ? "scale-150" : ""
                  }`}
                  style={
                    isExpanded
                      ? {
                          background: MINT,
                          color: "#052916",
                          borderColor: MINT,
                          boxShadow: `0 0 24px oklch(82% 0.18 165 / 0.5)`,
                        }
                      : isRelated
                      ? {
                          background: "oklch(82% 0.18 165 / 0.2)",
                          color: MINT,
                          borderColor: MINT,
                        }
                      : {
                          background: "rgba(8,9,13,0.85)",
                          color: "rgba(255,255,255,0.7)",
                          borderColor: "rgba(255,255,255,0.2)",
                        }
                  }
                >
                  <Icon size={16} />
                </div>

                {/* Node label */}
                <div
                  className={`absolute top-14 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "scale-125" : ""
                  }`}
                  style={{
                    color: isExpanded ? MINT : "rgba(255,255,255,0.65)",
                    left: "50%",
                    transform: isExpanded ? "translateX(-50%) scale(1.25)" : "translateX(-50%)",
                  }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-64 overflow-visible"
                    style={{
                      background: "rgba(8,9,13,0.96)",
                      backdropFilter: "blur(16px)",
                      borderColor: "oklch(82% 0.18 165 / 0.25)",
                      boxShadow: "0 0 40px oklch(82% 0.18 165 / 0.1), 0 24px 48px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* Connector line */}
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3"
                      style={{ background: "oklch(82% 0.18 165 / 0.5)" }}
                    />
                    <CardHeader className="pb-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className="px-2 text-[9px] tracking-widest font-mono border"
                          style={{
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            borderColor: statusStyle.border,
                          }}
                        >
                          {statusStyle.label}
                        </Badge>
                        <span
                          className="text-[10px] font-mono tracking-wide"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs p-4 pt-0" style={{ color: "rgba(255,255,255,0.72)" }}>
                      <p>{item.content}</p>

                      {/* Adoption signal bar */}
                      <div className="mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                        <div className="flex justify-between items-center text-[10px] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                          <span className="flex items-center gap-1">
                            <Zap size={9} />
                            Adoption signal
                          </span>
                          <span className="font-mono" style={{ color: MINT }}>{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.energy}%`,
                              background: `linear-gradient(90deg, ${MINT_DIM}, ${MINT})`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Related uses */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                          <div className="flex items-center gap-1 mb-2">
                            <Link size={9} style={{ color: "rgba(255,255,255,0.5)" }} />
                            <span
                              className="text-[9px] uppercase tracking-widest font-medium font-mono"
                              style={{ color: "rgba(255,255,255,0.5)" }}
                            >
                              Related uses
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId)
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-[10px] rounded-md gap-1"
                                  style={{
                                    borderColor: "oklch(82% 0.18 165 / 0.25)",
                                    color: "rgba(255,255,255,0.7)",
                                  }}
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId) }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} style={{ color: MINT }} />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
