"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ChevronUp, Search } from "lucide-react"

interface CrimeTypesPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CrimeTypesPanel({ isOpen, onClose }: CrimeTypesPanelProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAllTags, setShowAllTags] = useState(false)
  const [newTag, setNewTag] = useState("")

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const participantCount = 450

  // 범죄 유형 태그들
  const crimeTags = [
    { text: "소매치기 거의 없음", votes: 180 },
    { text: "야간 안전", votes: 165 },
    { text: "관광지 안전", votes: 142 },
    { text: "CCTV 많음", votes: 98 },
    { text: "경찰 친절", votes: 85 },
    { text: "분실물 찾기 쉬움", votes: 72 },
    { text: "교통사고 주의", votes: 45 },
    { text: "사기 주의", votes: 28 },
  ]

  const displayedTags = showAllTags ? crimeTags : crimeTags.slice(0, 6)

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
            <h2 className="text-2xl font-bold text-gray-900">여행객 대상 범죄 유형</h2>
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
              {/* 범죄 유형 현황 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  범죄 유형 현황 {displayedTags.length}개
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
                            width: `${(item.votes / Math.max(...crimeTags.map((t) => t.votes))) * 100}%`,
                            backgroundColor: "#0B24FB",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {crimeTags.length > 6 && (
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
                <h3 className="text-xl font-bold text-gray-900">범죄 유형 태그를 선택해주세요</h3>

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
                  <h4 className="font-medium text-gray-900">공감하는 태그 선택</h4>
                  <div className="flex flex-wrap gap-2">
                    {crimeTags.slice(0, 6).map((tag, index) => (
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
                  <h4 className="font-medium text-gray-900">새로운 태그 추가</h4>
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
                    <h4 className="font-medium text-gray-900">선택된 태그</h4>
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

              <div className="pt-6">
                <button
                  disabled={selectedTags.length === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{selectedTags.length * 5} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
