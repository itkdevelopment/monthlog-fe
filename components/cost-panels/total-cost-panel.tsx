"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface TotalCostPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function TotalCostPanel({ isOpen, onClose }: TotalCostPanelProps) {
  const [totalCost, setTotalCost] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const costRangeData = [
    { range: "100만원 미만", count: 15, percentage: 15 },
    { range: "100-150만원", count: 25, percentage: 25 },
    { range: "150-200만원", count: 30, percentage: 30 },
    { range: "200-250만원", count: 20, percentage: 20 },
    { range: "250만원 이상", count: 10, percentage: 10 },
  ]

  // 여행기간별 비용 평균가 데이터
  const durationCostData = [
    { duration: "짧은여행 (6박 미만)", avgCost: "80만원", percentage: 40 },
    { duration: "일주일살기 (6박~13박)", avgCost: "120만원", percentage: 60 },
    { duration: "2-3주 살기 (14박~21박)", avgCost: "180만원", percentage: 90 },
    { duration: "한달살기 (22박~30박)", avgCost: "220만원", percentage: 100 },
    { duration: "1개월 이상 (31박 이상)", avgCost: "280만원", percentage: 80 },
  ]

  // 숫자만 입력하고 천단위 콤마 자동 적용
  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleTotalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value)
    setTotalCost(formatted)
  }

  // 날짜 차이 계산 함수
  const calculateDuration = () => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end <= start) return null

    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const nights = diffDays - 1

    return { nights, days: diffDays }
  }

  const duration = calculateDuration()

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
          <h2 className="text-2xl font-bold text-gray-900">총 예상 비용</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">100명이 기여한 정보</span>
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
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">금액대별 분포</h3>
                <div className="space-y-4">
                  {costRangeData.map((item) => (
                    <div key={item.range} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.range}</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  여행기간별 비용 평균가
                </h3>
                <div className="space-y-4">
                  {durationCostData.map((item) => (
                    <div key={item.duration} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.duration}</span>
                        <span className="text-gray-500">{item.avgCost}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">여행기간</h3>
                <p className="text-sm text-gray-600 mb-4">여행 시작일과 종료일을 선택해주세요</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {duration && (
                  <div className="text-left">
                    <span className="text-sm text-blue-600">
                      총 {duration.nights}박 {duration.days}일
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">총 예상 비용</h3>
                <p className="text-sm text-gray-600 mb-4">
                  월세, 공과금, 교통비, 통신비, 식비 등을 모두 포함한 총 비용을 입력해주세요
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={totalCost}
                    onChange={handleTotalCostChange}
                    placeholder="예: 2,000,000"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">원</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={!totalCost && (!startDate || !endDate)}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+10 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
