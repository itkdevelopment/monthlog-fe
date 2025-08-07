"use client"

import type React from "react"
import { useState } from "react"

interface TotalCostInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

export default function TotalCostInput({ onSubmit, onExpGain }: TotalCostInputProps) {
  const [totalCost, setTotalCost] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

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

  const handleSubmit = () => {
    const data = {
      totalCost,
      startDate,
      endDate,
      duration,
    }
    onSubmit(data)
    onExpGain?.(10)
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
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
    </div>
  )
}
