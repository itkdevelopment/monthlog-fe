"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface SafetyLevelPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function SafetyLevelPanel({ isOpen, onClose }: SafetyLevelPanelProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [showAllScores, setShowAllScores] = useState(false)

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const averageScore = 9.2
  const participantCount = 156

  // 점수 분포 데이터
  const scoreDistribution = [
    { score: 10, count: 45, percentage: 29 },
    { score: 9, count: 52, percentage: 33 },
    { score: 8, count: 38, percentage: 24 },
    { score: 7, count: 15, percentage: 10 },
    { score: 6, count: 4, percentage: 3 },
    { score: 5, count: 2, percentage: 1 },
    { score: 4, count: 0, percentage: 0 },
    { score: 3, count: 0, percentage: 0 },
    { score: 2, count: 0, percentage: 0 },
    { score: 1, count: 0, percentage: 0 },
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
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">치안 수준</h2>
            <span className="text-2xl font-bold text-gray-900">{averageScore}점</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{participantCount}명이 기여한 정보</span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          <div ref={leftPanelRef} className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* 치안 수준 만족도 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">치안 수준 만족도</h3>
                <div className="space-y-4">
                  {scoreDistribution.map((item) => (
                    <div key={item.score} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.score}점</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: "#0B24FB",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={rightPanelRef} className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-8 pb-24">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">치안 수준을 평가해주세요</h3>

                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      onClick={() => setSelectedScore(score)}
                      className={`h-12 rounded-lg font-semibold transition-colors ${
                        selectedScore === score
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700"
                      }`}
                    >
                      {score}점
                    </button>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">평가 기준</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1-3점: 매우 위험, 여행 비추천</li>
                    <li>• 4-6점: 주의 필요, 야간 외출 자제</li>
                    <li>• 7-8점: 보통 수준, 일반적인 주의</li>
                    <li>• 9-10점: 매우 안전, 걱정 없음</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={!selectedScore}
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
