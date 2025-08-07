"use client"

import { useEffect, useRef, useState } from "react"

interface BubbleData {
  id: string
  text: string
  count: number
  color?: string
}

interface BubbleChartProps {
  data: BubbleData[]
  onBubbleClick?: (bubble: BubbleData) => void
}

interface Bubble extends BubbleData {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function BubbleChart({ data, onBubbleClick }: BubbleChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = 200

    // Initialize bubbles
    const initialBubbles: Bubble[] = data.map((item, index) => {
      const radius = Math.max(20, Math.min(50, item.count * 8 + 20))
      return {
        ...item,
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius,
      }
    })

    setBubbles(initialBubbles)

    // Physics simulation
    const animate = () => {
      setBubbles((prevBubbles) => {
        return prevBubbles.map((bubble) => {
          let { x, y, vx, vy } = bubble
          const { radius } = bubble

          // Update position
          x += vx
          y += vy

          // Boundary collision
          if (x - radius <= 0 || x + radius >= width) {
            vx *= -0.8
            x = Math.max(radius, Math.min(width - radius, x))
          }
          if (y - radius <= 0 || y + radius >= height) {
            vy *= -0.8
            y = Math.max(radius, Math.min(height - radius, y))
          }

          // Bubble collision
          prevBubbles.forEach((other) => {
            if (other.id !== bubble.id) {
              const dx = other.x - x
              const dy = other.y - y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const minDistance = radius + other.radius

              if (distance < minDistance) {
                const angle = Math.atan2(dy, dx)
                const targetX = x + Math.cos(angle) * minDistance
                const targetY = y + Math.sin(angle) * minDistance
                const ax = (targetX - other.x) * 0.05
                const ay = (targetY - other.y) * 0.05
                vx -= ax
                vy -= ay
              }
            }
          })

          // Damping
          vx *= 0.99
          vy *= 0.99

          return { ...bubble, x, y, vx, vy }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [data])

  return (
    <div ref={containerRef} className="bubble-container relative w-full h-50 overflow-hidden rounded-2xl">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble absolute cursor-pointer"
          style={{
            left: bubble.x - bubble.radius,
            top: bubble.y - bubble.radius,
            width: bubble.radius * 2,
            height: bubble.radius * 2,
            fontSize: Math.max(10, bubble.radius / 4),
          }}
          onClick={() => onBubbleClick?.(bubble)}
        >
          #{bubble.text}
        </div>
      ))}
    </div>
  )
}
