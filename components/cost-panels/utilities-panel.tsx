"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface UtilitiesPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function UtilitiesPanel({ isOpen, onClose }: UtilitiesPanelProps) {
  const [electricity, setElectricity] = useState("")
  const [gas, setGas] = useState("")
  const [water, setWater] = useState("")
  const [other, setOther] = useState("")

  // 천단위 콤마 추가 함수
  const formatNumber = (value: string) => {
    const number = value.replace(/[^0-9]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // 숫자만 입력 허용하는 핸들러
  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setter(numericValue)
  }

  // EXP 계산
  const calculateExp = () => {
    let exp = 10 // 기본 EXP
    const inputs = [electricity, gas, water, other].filter((input) => input.trim() !== "")
    exp += inputs.length * 5 // 각 입력당 5 EXP 추가
    return exp
  }

  const handleSubmit = () => {
    // 패널 닫기
    onClose()
  }

  const utilitiesData = [
    {
      type: "전기요금",
      ranges: [
        { range: "5만원 이하", count: 12, percentage: 27 },
        { range: "5-10만원", count: 18, percentage: 40 },
        { range: "10-15만원", count: 10, percentage: 22 },
        { range: "15만원 이상", count: 5, percentage: 11 },
      ],
    },
    {
      type: "가스요금",
      ranges: [
        { range: "3만원 이하", count: 15, percentage: 36 },
        { range: "3-6만원", count: 16, percentage: 38 },
        { range: "6-9만원", count: 8, percentage: 19 },
        { range: "9만원 이상", count: 3, percentage: 7 },
      ],
    },
    {
      type: "수도요금",
      ranges: [
        { range: "2만원 이하", count: 20, percentage: 50 },
        { range: "2-4만원", count: 12, percentage: 30 },
        { range: "4-6만원", count: 6, percentage: 15 },
        { range: "6만원 이상", count: 2, percentage: 5 },
      ],
    },
    {
      type: "기타",
      ranges: [
        { range: "1만원 이하", count: 10, percentage: 40 },
        { range: "1-3만원", count: 8, percentage: 32 },
        { range: "3-5만원", count: 5, percentage: 20 },
        { range: "5만원 이상", count: 2, percentage: 8 },
      ],
    },
  ]

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
          <h2 className="text-2xl font-bold text-gray-900">공과금</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">152명이 기여한 정보</span>
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
              {utilitiesData.map((utility) => (
                <div key={utility.type} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">{utility.type}</h3>
                  <div className="space-y-4">
                    {utility.ranges.map((range, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{range.range}</span>
                          <span className="text-gray-500">{range.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${range.percentage}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">공과금 입력</h3>
                <p className="text-sm text-gray-600 mb-6">실제 지불한 공과금을 항목별로 입력해주세요</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">전기요금</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formatNumber(electricity)}
                        onChange={(e) => handleNumberInput(e.target.value, setElectricity)}
                        placeholder="예: 80,000"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-600">원</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">가스요금</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formatNumber(gas)}
                        onChange={(e) => handleNumberInput(e.target.value, setGas)}
                        placeholder="예: 50,000"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-600">원</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">수도요금</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formatNumber(water)}
                        onChange={(e) => handleNumberInput(e.target.value, setWater)}
                        placeholder="예: 30,000"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-600">원</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">기타</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formatNumber(other)}
                        onChange={(e) => handleNumberInput(e.target.value, setOther)}
                        placeholder="예: 20,000"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-600">원</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!electricity && !gas && !water && !other}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{calculateExp()} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
