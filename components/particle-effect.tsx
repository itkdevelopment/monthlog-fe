"use client"

import { useEffect, useState } from "react"

interface ParticleEffectProps {
  trigger: boolean
  onComplete?: () => void
}

export function ParticleEffect({ trigger, onComplete }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (!trigger) return

    // Create particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    }))

    setParticles(newParticles)

    // Clean up after animation
    const timer = setTimeout(() => {
      setParticles([])
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [trigger, onComplete])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute"
          style={{
            left: `50%`,
            top: `50%`,
            marginLeft: particle.x,
            marginTop: particle.y,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}
