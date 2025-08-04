"use client"

import type React from "react"

import { useState, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface Journey {
  id: string
  city: string
  country: string
  duration: string
  period: string
  rating: number
  summary: string
  image: string
  contributions: number
  exp: number
  lat: number
  lng: number
  startDate: string
  endDate: string
  memo: string
  photos: string[]
  revisitScore: number
  isContributed: boolean
}

interface JourneyMapProps {
  journeys: Journey[]
}

export function JourneyMap({ journeys }: JourneyMapProps) {
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 })
  const [mapZoom, setMapZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  // 지도 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // 드래그 범위 제한
    const maxOffset = 200
    const limitedX = Math.max(-maxOffset, Math.min(maxOffset, newX))
    const limitedY = Math.max(-maxOffset, Math.min(maxOffset, newY))

    setMapOffset({ x: limitedX, y: limitedY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 확대/축소 핸들러
  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  // 화면 전체를 활용한 도시 위치 재배치 - 브라우저 화면 전체 width 활용
  const cityPositions = useMemo(() => {
    return journeys.map((journey) => {
      // 제주도 관련 키워드 매칭
      if (journey.city.includes("제주") || journey.city.includes("Jeju")) {
        return {
          id: journey.id,
          city: journey.city,
          x: 80,
          y: 50,
          exp: journey.exp,
        }
      }
      // 치앙마이 관련 키워드 매칭
      else if (journey.city.includes("치앙마이") || journey.city.includes("Chiang Mai")) {
        return {
          id: journey.id,
          city: journey.city,
          x: 50,
          y: 50,
          exp: journey.exp,
        }
      }
      // 발리 관련 키워드 매칭
      else if (journey.city.includes("발리") || journey.city.includes("Bali")) {
        return {
          id: journey.id,
          city: journey.city,
          x: 10,
          y: 50,
          exp: journey.exp,
        }
      }
      // 기타 도시들 - 각각 다른 고정 위치
      else {
        // 도시 ID나 인덱스 기반으로 다른 위치 할당
        const index = journeys.indexOf(journey)
        const positions = [
          { x: 25, y: 60 },
          { x: 75, y: 40 },
          { x: 20, y: 80 },
          { x: 80, y: 70 },
          { x: 35, y: 30 },
        ]
        const pos = positions[index % positions.length]

        return {
          id: journey.id,
          city: journey.city,
          x: pos.x,
          y: pos.y,
          exp: journey.exp,
        }
      }
    })
  }, [journeys])

  // 아름다운 포물선 경로 생성
  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2 - 20 // 포물선의 높이 조정

    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-64 relative overflow-hidden select-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        background: "linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 50%, #dbeafe 100%)",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 확대/축소 컨트롤 */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleZoomIn}
          className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white shadow-sm"
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleZoomOut}
          className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white shadow-sm"
        >
          <Minus className="h-3 w-3" />
        </Button>
      </div>

      <div
        className="w-full h-full transition-transform duration-100"
        style={{
          transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${mapZoom})`,
        }}
      >
        <svg
          viewBox="0 0 600 100"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ pointerEvents: "none" }}
        >
          {/* 아시아 대륙 윤곽 */}
          <path
            d="M150 35 Q210 30 270 35 Q330 40 390 35 Q420 45 390 55 Q330 60 270 55 Q210 50 150 55 Q120 45 150 35"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.3"
            opacity="0.5"
          />

          {/* 도시 연결선 */}
          {cityPositions.map((cityPos, index) => {
            if (index === 0) return null
            const prevCityPos = cityPositions[index - 1]
            // 실제 SVG 좌표로 변환 (x를 6배로 확장)
            const actualStart = { x: prevCityPos.x * 6, y: prevCityPos.y }
            const actualEnd = { x: cityPos.x * 6, y: cityPos.y }

            return (
              <g key={`path-${cityPos.id}`}>
                {/* 포물선 경로 */}
                <path
                  d={createCurvedPath(actualStart, actualEnd)}
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1.2"
                  opacity="0.8"
                />
              </g>
            )
          })}

          {/* 도시 마커 */}
          {cityPositions.map((cityPos) => {
            // 실제 SVG 좌표로 변환 (x를 6배로 확장)
            const actualX = cityPos.x * 6
            const actualY = cityPos.y

            return (
              <g key={cityPos.id}>
                {/* EXP 원 */}
                <g transform={`translate(${actualX}, ${actualY})`}>
                  <circle r="10" fill="#000000" />
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="6"
                    fill="#ffffff"
                    fontWeight="bold"
                  >
                    {cityPos.exp}
                  </text>
                </g>

                {/* 도시명 */}
                <text x={actualX} y={actualY + 18} textAnchor="middle" fontSize="5" fill="#000000" fontWeight="700">
                  {cityPos.city}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
