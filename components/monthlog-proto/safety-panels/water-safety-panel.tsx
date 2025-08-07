"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ChevronUp, Search } from "lucide-react"

interface WaterSafetyPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaterSafetyPanel({ isOpen, onClose }: WaterSafetyPanelProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAllTags, setShowAllTags] = useState(false)
  const [newTag, setNewTag] = useState("")

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const averageScore = 8.2
  const participantCount = 220

  // 수돗물 안정성 점수 분포 데이터
  const scoreDistribution = [
    { score: 10, count: 45, percentage: 20 },
    { score: 9, count: 52, percentage: 24 },
    { score: 8, count: 48, percentage: 22 },
    { score: 7, count: 35, percentage: 16 },
    { score: 6, count: 22, percentage: 10 },
    { score: 5, count: 12, percentage: 5 },
    { score: 4, count: 4, percentage: 2 },
    { score: 3, count: 2, percentage: 1 },
    { score: 2, count: 0, percentage: 0 },
    { score: 1, count: 0, percentage: 0 },
  ]

  // 수돗물 관련 태그들
  const waterTags = [
    { text: "음용 가능", votes: 145 },
    { text: "끓여서 마시기", votes: 85 },
    { text: "정수기 이용", votes: 72 },
    { text: "생수 구매 권장", votes: 45 },
    { text: "맛이 좋음", votes: 38 },
    { text: "염소 냄새", votes: 28 },
    { text: "석회질 많음", votes: 22 },
    { text: "수압 좋음", votes: 18 },
  ]

  const displayedTags = showAllTags ? waterTags : waterTags.slice(0, 6)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]))
  }

  const addNewTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
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
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">수돗물 안정성</h2>
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
              {/* 수돗물 안정성 분포도 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  수돗물 안정성 분포도
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
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  관련 태그 {displayedTags.length}개
                </h3>
                <div className="space-y-4">
                  {displayedTags.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">#{item.text}</span>
                        <span className="text-gray-500">{item.votes}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${(item.votes / Math.max(...waterTags.map((t) => t.votes))) * 100}%`,
                            backgroundColor: "#0B24FB",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {waterTags.length > 6 && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-1"
                  >
                    <span>{showAllTags ? "접기" : "더보기"}</span>
                    {showAllTags ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div ref={rightPanelRef} className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-8 pb-24">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">수돗물 안정성을 평가해주세요</h3>

                {/* 수돗물 안정성 점수 평가 */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">수돗물 안정성 점수</h4>
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
                      <li>• 1-3점: 음용 불가, 생수 필수</li>
                      <li>• 4-6점: 끓여서 마시기 권장</li>
                      <li>• 7-8점: 정수기 이용 권장</li>
                      <li>• 9-10점: 바로 음용 가능</li>
                    </ul>
                  </div>
                </div>

                {/* 관련 태그 선택 */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">관련 태그 선택</h4>

                  {/* 태그 검색 */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="태그 검색..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* 기존 태그 선택 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">공감하는 태그 선택</h5>
                    <div className="flex flex-wrap gap-2">
                      {waterTags.slice(0, 6).map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => toggleTag(tag.text)}
                          className={`px-3 py-2 border rounded-lg transition-colors ${
                            selectedTags.includes(tag.text)
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                          }`}
                        >
                          #{tag.text} ({tag.votes})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 새 태그 추가 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">새로운 태그 추가</h5>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="새로운 태그를 입력하세요"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === "Enter" && addNewTag()}
                      />
                      <button
                        onClick={addNewTag}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        추가
                      </button>
                    </div>
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-gray-700">선택된 태그</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={!selectedScore && selectedTags.length === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{selectedScore ? 10 : 0 + selectedTags.length * 5} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
