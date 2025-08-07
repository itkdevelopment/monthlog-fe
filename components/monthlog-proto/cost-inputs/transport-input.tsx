"use client"

import { useState } from "react"

interface TransportInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

interface TransportCost {
  type: string
  cost: string
}

export default function TransportInput({ onSubmit, onExpGain }: TransportInputProps) {
  const [selectedTransportTypes, setSelectedTransportTypes] = useState<string[]>([])
  const [transportCosts, setTransportCosts] = useState<TransportCost[]>([])
  const [expPoints, setExpPoints] = useState(10)

  const transportTypes = ["대중교통", "렌터카", "택시", "도보/자전거", "기타"]

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleTransportTypeToggle = (type: string) => {
    const newSelectedTypes = selectedTransportTypes.includes(type)
      ? selectedTransportTypes.filter((t) => t !== type)
      : [...selectedTransportTypes, type]

    setSelectedTransportTypes(newSelectedTypes)

    // 교통수단 선택/해제에 따른 비용 입력 필드 관리
    if (newSelectedTypes.includes(type) && !transportCosts.find((tc) => tc.type === type)) {
      setTransportCosts([...transportCosts, { type, cost: "" }])
    } else if (!newSelectedTypes.includes(type)) {
      setTransportCosts(transportCosts.filter((tc) => tc.type !== type))
    }

    calculateExpPoints(newSelectedTypes, transportCosts)
  }

  const handleCostChange = (type: string, cost: string) => {
    const formattedCost = formatNumber(cost)
    const newTransportCosts = transportCosts.map((tc) => (tc.type === type ? { ...tc, cost: formattedCost } : tc))
    setTransportCosts(newTransportCosts)
    calculateExpPoints(selectedTransportTypes, newTransportCosts)
  }

  const calculateExpPoints = (types: string[], costs: TransportCost[]) => {
    let points = 10
    points += types.length * 5 // 교통수단 선택당 5점
    points += costs.filter((tc) => tc.cost.trim() !== "").length * 10 // 비용 입력당 10점
    setExpPoints(points)
  }

  const isFormValid = selectedTransportTypes.length > 0

  const handleSubmit = () => {
    if (isFormValid) {
      const data = {
        selectedTransportTypes,
        transportCosts,
      }
      onSubmit(data)
      onExpGain?.(expPoints)
    }
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">주요 교통수단</h3>
        <p className="text-sm text-gray-600 mb-4">주로 이용한 교통수단을 선택해주세요 (복수 선택 가능)</p>
        <div className="flex flex-wrap gap-3">
          {transportTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTransportTypeToggle(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTransportTypes.includes(type)
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {selectedTransportTypes.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">교통수단별 교통비</h3>
          <p className="text-sm text-gray-600 mb-4">선택한 교통수단별 월평균 비용을 입력해주세요</p>
          <div className="space-y-4">
            {selectedTransportTypes.map((type) => {
              const transportCost = transportCosts.find((tc) => tc.type === type)
              return (
                <div key={type} className="flex items-center gap-3">
                  <div className="w-32 text-sm font-medium text-gray-700">{type}</div>
                  <input
                    type="text"
                    value={transportCost?.cost || ""}
                    onChange={(e) => handleCostChange(type, e.target.value)}
                    placeholder="예: 120,000"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">원</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
