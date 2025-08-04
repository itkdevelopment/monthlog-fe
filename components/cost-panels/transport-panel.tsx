"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface TransportPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface TransportCost {
  type: string
  cost: string
}

export default function TransportPanel({ isOpen, onClose }: TransportPanelProps) {
  const [selectedTransportTypes, setSelectedTransportTypes] = useState<string[]>([])
  const [transportCosts, setTransportCosts] = useState<TransportCost[]>([])
  const [expPoints, setExpPoints] = useState(10)

  const transportData = [
    { type: "대중교통", count: 45 },
    { type: "렌터카", count: 25 },
    { type: "택시", count: 15 },
    { type: "도보/자전거", count: 20 },
    { type: "기타", count: 8 },
  ]

  const priceRangeData = {
    대중교통: [
      { range: "5만원 이하", count: 20 },
      { range: "5-10만원", count: 15 },
      { range: "10-15만원", count: 8 },
      { range: "15만원 이상", count: 2 },
    ],
    렌터카: [
      { range: "20만원 이하", count: 5 },
      { range: "20-40만원", count: 12 },
      { range: "40-60만원", count: 6 },
      { range: "60만원 이상", count: 2 },
    ],
    택시: [
      { range: "10만원 이하", count: 3 },
      { range: "10-30만원", count: 8 },
      { range: "30-50만원", count: 3 },
      { range: "50만원 이상", count: 1 },
    ],
    "도보/자전거": [
      { range: "무료", count: 15 },
      { range: "5만원 이하", count: 4 },
      { range: "5-10만원", count: 1 },
    ],
    기타: [
      { range: "10만원 이하", count: 3 },
      { range: "10-20만원", count: 3 },
      { range: "20만원 이상", count: 2 },
    ],
  }

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
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        className="fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl flex flex-col h-[95vh] z-50"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">교통비 (월평균)</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">105명이 기여한 정보</span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          <div className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">주요 교통수단</h3>
                <div className="space-y-4">
                  {transportData.map((item) => {
                    const maxCount = Math.max(...transportData.map((d) => d.count))
                    return (
                      <div key={item.type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{item.type}</span>
                          <span className="text-gray-500">{item.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(item.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">대중교통</h3>
                <div className="space-y-4">
                  {priceRangeData.대중교통.map((range) => {
                    const maxCount = Math.max(...priceRangeData.대중교통.map((r) => r.count))
                    return (
                      <div key={range.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{range.range}</span>
                          <span className="text-gray-500">{range.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(range.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">렌터카</h3>
                <div className="space-y-4">
                  {priceRangeData.렌터카.map((range) => {
                    const maxCount = Math.max(...priceRangeData.렌터카.map((r) => r.count))
                    return (
                      <div key={range.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{range.range}</span>
                          <span className="text-gray-500">{range.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(range.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">택시</h3>
                <div className="space-y-4">
                  {priceRangeData.택시.map((range) => {
                    const maxCount = Math.max(...priceRangeData.택시.map((r) => r.count))
                    return (
                      <div key={range.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{range.range}</span>
                          <span className="text-gray-500">{range.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(range.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">도보/자전거</h3>
                <div className="space-y-4">
                  {priceRangeData["도보/자전거"].map((range) => {
                    const maxCount = Math.max(...priceRangeData["도보/자전거"].map((r) => r.count))
                    return (
                      <div key={range.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{range.range}</span>
                          <span className="text-gray-500">{range.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(range.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">기타</h3>
                <div className="space-y-4">
                  {priceRangeData.기타.map((range) => {
                    const maxCount = Math.max(...priceRangeData.기타.map((r) => r.count))
                    return (
                      <div key={range.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{range.range}</span>
                          <span className="text-gray-500">{range.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(range.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
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

              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{expPoints} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
