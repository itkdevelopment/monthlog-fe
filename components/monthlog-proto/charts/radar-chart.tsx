"use client"

import { useEffect, useRef } from "react"

interface RadarChartProps {
  data: {
    label: string
    value: number
    maxValue: number
  }[]
  size?: number
}

export function RadarChart({ data, size = 300 }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 40

    // Clear previous content
    svg.innerHTML = ""

    // Create background circles
    for (let i = 1; i <= 5; i++) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", centerX.toString())
      circle.setAttribute("cy", centerY.toString())
      circle.setAttribute("r", ((radius * i) / 5).toString())
      circle.setAttribute("fill", "none")
      circle.setAttribute("stroke", "rgba(11, 36, 251, 0.1)")
      circle.setAttribute("stroke-width", "1")
      svg.appendChild(circle)
    }

    // Create axis lines and labels
    const angleStep = (2 * Math.PI) / data.length
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      // Axis line
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute("x1", centerX.toString())
      line.setAttribute("y1", centerY.toString())
      line.setAttribute("x2", x.toString())
      line.setAttribute("y2", y.toString())
      line.setAttribute("stroke", "rgba(11, 36, 251, 0.1)")
      line.setAttribute("stroke-width", "1")
      svg.appendChild(line)

      // Label
      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
      text.setAttribute("x", labelX.toString())
      text.setAttribute("y", labelY.toString())
      text.setAttribute("text-anchor", "middle")
      text.setAttribute("dominant-baseline", "middle")
      text.setAttribute("font-size", "12")
      text.setAttribute("font-weight", "500")
      text.setAttribute("fill", "#333333")
      text.textContent = item.label
      svg.appendChild(text)
    })

    // Create data polygon
    const points = data
      .map((item, index) => {
        const angle = index * angleStep - Math.PI / 2
        const value = (item.value / item.maxValue) * radius
        const x = centerX + value * Math.cos(angle)
        const y = centerY + value * Math.sin(angle)
        return `${x},${y}`
      })
      .join(" ")

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    polygon.setAttribute("points", points)
    polygon.setAttribute("fill", "rgba(11, 36, 251, 0.2)")
    polygon.setAttribute("stroke", "#0B24FB")
    polygon.setAttribute("stroke-width", "2")
    polygon.style.opacity = "0"
    svg.appendChild(polygon)

    // Animate polygon
    setTimeout(() => {
      polygon.style.transition = "opacity 1s ease-out"
      polygon.style.opacity = "1"
    }, 500)

    // Create data points
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2
      const value = (item.value / item.maxValue) * radius
      const x = centerX + value * Math.cos(angle)
      const y = centerY + value * Math.sin(angle)

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", x.toString())
      circle.setAttribute("cy", y.toString())
      circle.setAttribute("r", "4")
      circle.setAttribute("fill", "#0B24FB")
      circle.setAttribute("stroke", "white")
      circle.setAttribute("stroke-width", "2")
      circle.style.opacity = "0"
      svg.appendChild(circle)

      // Animate points
      setTimeout(
        () => {
          circle.style.transition = "opacity 0.5s ease-out"
          circle.style.opacity = "1"
        },
        800 + index * 100,
      )
    })
  }, [data, size])

  return (
    <div className="flex justify-center">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="radar-chart"
        style={{ filter: "drop-shadow(0 4px 16px rgba(11, 36, 251, 0.1))" }}
      />
    </div>
  )
}
