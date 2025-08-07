"use client"

import { useEffect, useRef } from "react"

interface AnimatedGaugeProps {
  value: number
  maxValue: number
  label: string
  color?: string
  size?: number
}

export function AnimatedGauge({ value, maxValue, label, color = "#0B24FB", size = 120 }: AnimatedGaugeProps) {
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!circleRef.current) return

    const circle = circleRef.current
    const radius = 55
    const circumference = 2 * Math.PI * radius
    const percentage = (value / maxValue) * 100
    const offset = circumference - (percentage / 100) * circumference

    // Set initial state
    circle.style.strokeDasharray = circumference.toString()
    circle.style.strokeDashoffset = circumference.toString()

    // Animate
    setTimeout(() => {
      circle.style.transition = "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)"
      circle.style.strokeDashoffset = offset.toString()
    }, 300)
  }, [value, maxValue])

  const percentage = Math.round((value / maxValue) * 100)

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle cx={size / 2} cy={size / 2} r="55" stroke="rgba(11, 36, 251, 0.1)" strokeWidth="10" fill="none" />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r="55"
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 2px 8px rgba(11, 36, 251, 0.3))",
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-xs text-gray-500">/ {maxValue}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700 text-center -mt-1">{label}</span>
    </div>
  )
}
