"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import PowerStabilityInput from "../workation-inputs/power-stability-input"

interface PowerStabilityPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function PowerStabilityPanel({ isOpen, onClose }: PowerStabilityPanelProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTags, setNewTags] = useState<string[]>([])
  const [selectedScore, setSelectedScore] = useState<number | null>(null)

  const existingTags = [
    { text: "정전 거의 없음", votes: 45 },
    { text: "전압 안정적", votes: 38 },
    { text: "콘센트 충분", votes: 32 },
    { text: "220V 안정", votes: 28 },
    { text: "정전 가끔 발생", votes: 15 },
    { text: "전압 불안정", votes: 8 },
  ]

  const scoreDistribution = [
    { score: 10, count: 25, percentage: 25 },
    { score: 9, count: 20, percentage: 20 },
    { score: 8, count: 18, percentage: 18 },
    { score: 7, count: 15, percentage: 15 },
    { score: 6, count: 10, percentage: 10 },
    { score: 5, count: 7, percentage: 7 },
    { score: 4, count: 3, percentage: 3 },
    { score: 3, count: 1, percentage: 1 },
    { score: 2, count: 1, percentage: 1 },
    { score: 1, count: 0, percentage: 0 },
  ]

  const averageScore = 7.8

  const handleTagsChange = (selectedTags: string[], newTags: string[]) => {
    setSelectedTags(selectedTags)
    setNewTags(newTags)
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
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">전력 안정성</h2>
            <span className="text-2xl font-bold text-gray-900">{averageScore}점</span>
          </div>
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
              {/* 전력 안정성 만족도 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  전력 안정성 만족도
                </h3>
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

              {/* 태그별 분포 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">태그별 분포</h3>
                <div className="space-y-4">
                  {existingTags.map((tag, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">#{tag.text}</span>
                        <span className="text-gray-500">{tag.votes}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${(tag.votes / Math.max(...existingTags.map((t) => t.votes))) * 100}%`,
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

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-8 pb-24">
              <PowerStabilityInput
                onScoreChange={setSelectedScore}
                onTagsChange={handleTagsChange}
                selectedScore={selectedScore}
                selectedTags={selectedTags}
                newTags={newTags}
              />

              <div className="pt-6">
                <button
                  disabled={!selectedScore && selectedTags.length === 0 && newTags.length === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{newTags.length > 0 ? 15 : 5} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
