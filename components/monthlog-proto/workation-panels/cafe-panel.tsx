"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ChevronUp, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/monthlog-proto/ui/badge"
import CafeInput from "../workation-inputs/cafe-input"

interface CafePanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Cafe {
  name: string
  plan: string
  price: string
  comment: string
  is24Hour: boolean
  link: string
}

interface SelectedRecommendation {
  cafeId: string
  comment: string
}

export default function CafePanel({ isOpen, onClose }: CafePanelProps) {
  const [show24HourFilter, setShow24HourFilter] = useState(false)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [showAllCafes, setShowAllCafes] = useState(false)
  const [cafes, setCafes] = useState<Cafe[]>([])
  const [selectedRecommendations, setSelectedRecommendations] = useState<SelectedRecommendation[]>([])
  const [showCommentsView, setShowCommentsView] = useState(false)
  const [selectedCafeForComments, setSelectedCafeForComments] = useState<any>(null)
  const [savedScrollPositions, setSavedScrollPositions] = useState({ left: 0, right: 0 })

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const averageScore = 7.8
  const wifiScore = 8.5

  // 점수 분포 데이터
  const scoreDistribution = [
    { score: 10, count: 52, percentage: 21 },
    { score: 9, count: 68, percentage: 27 },
    { score: 8, count: 61, percentage: 24 },
    { score: 7, count: 38, percentage: 15 },
    { score: 6, count: 22, percentage: 9 },
    { score: 5, count: 8, percentage: 3 },
    { score: 4, count: 3, percentage: 1 },
    { score: 3, count: 0, percentage: 0 },
    { score: 2, count: 0, percentage: 0 },
    { score: 1, count: 0, percentage: 0 },
  ]

  // 모든 카페
  const allCafes = [
    {
      id: "starbucks-gangnam",
      name: "스타벅스 강남역점",
      plan: "음료 주문",
      price: "4500원",
      comment: "넓은 공간과 안정적인 와이파이",
      likes: 189,
      is24Hour: false,
      link: "https://starbucks.co.kr/gangnam",
      comments: [
        { user: "김민수", comment: "콘센트가 많아서 노트북 작업하기 좋아요!", date: "2024-01-15" },
        { user: "이지영", comment: "사람이 많지만 분위기는 좋습니다", date: "2024-01-14" },
        { user: "박준호", comment: "와이파이 속도가 빠르고 안정적이에요", date: "2024-01-13" },
        { user: "최수진", comment: "2층이 조용해서 집중하기 좋아요", date: "2024-01-12" },
        { user: "정태현", comment: "아메리카노 맛도 좋고 장시간 있기 편해요", date: "2024-01-11" },
      ],
    },
    {
      id: "twosome-hongdae",
      name: "투썸플레이스 홍대점",
      plan: "음료 주문",
      price: "4000원",
      comment: "조용한 분위기와 편안한 좌석",
      likes: 156,
      is24Hour: true,
      link: "https://twosome.co.kr/hongdae",
      comments: [
        { user: "김영희", comment: "24시간 운영이라 야간 작업할 때 좋아요", date: "2024-01-15" },
        { user: "이철수", comment: "케이크도 맛있고 분위기가 아늑해요", date: "2024-01-14" },
        { user: "박미영", comment: "좌석이 편안해서 오래 앉아있기 좋아요", date: "2024-01-13" },
      ],
    },
    {
      id: "ediya-sinchon",
      name: "이디야커피 신촌점",
      plan: "음료 주문",
      price: "2500원",
      comment: "저렴한 가격과 넓은 공간",
      likes: 143,
      is24Hour: true,
      link: "https://ediya.com/sinchon",
      comments: [
        { user: "조현우", comment: "가격이 저렴해서 부담없이 이용할 수 있어요", date: "2024-01-15" },
        { user: "윤서연", comment: "공간이 넓어서 여유롭게 작업할 수 있어요", date: "2024-01-14" },
      ],
    },
  ]

  const filteredCafes = show24HourFilter ? allCafes.filter((cafe) => cafe.is24Hour) : allCafes
  const displayedCafes = showAllCafes ? filteredCafes : filteredCafes.slice(0, 5)

  const saveScrollPositions = () => {
    const leftPanel = leftPanelRef.current
    const rightPanel = rightPanelRef.current

    if (leftPanel && rightPanel) {
      setSavedScrollPositions({
        left: leftPanel.scrollTop,
        right: rightPanel.scrollTop,
      })
    }
  }

  const restoreScrollPositions = () => {
    setTimeout(() => {
      const leftPanel = leftPanelRef.current
      const rightPanel = rightPanelRef.current

      if (leftPanel && rightPanel) {
        leftPanel.scrollTop = savedScrollPositions.left
        rightPanel.scrollTop = savedScrollPositions.right
      }
    }, 100)
  }

  const showCafeComments = (cafe: any) => {
    saveScrollPositions()
    setSelectedCafeForComments(cafe)
    setShowCommentsView(true)
  }

  const backToMainView = () => {
    setShowCommentsView(false)
    setSelectedCafeForComments(null)
    restoreScrollPositions()
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
            {showCommentsView && (
              <button
                onClick={backToMainView}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {showCommentsView ? `${selectedCafeForComments?.name} 코멘트` : "노트북 하기 좋은 카페"}
            </h2>
            {!showCommentsView && <span className="text-2xl font-bold text-gray-900">{wifiScore}점</span>}
          </div>
          <div className="flex items-center gap-3">
            {!showCommentsView && <span className="text-sm text-gray-500">320명이 기여한 정보</span>}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {showCommentsView ? (
            // 코멘트 보기 화면
            <div className="w-full bg-white overflow-y-auto">
              <div className="px-16 py-6 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{selectedCafeForComments?.name}</h3>
                    {selectedCafeForComments?.is24Hour && (
                      <Badge className="bg-green-100 text-green-700 text-xs">24시</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      {selectedCafeForComments?.plan} • {selectedCafeForComments?.price}
                    </div>
                    <div>{selectedCafeForComments?.comment}</div>
                    <div>
                      <a
                        href={selectedCafeForComments?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        링크 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    사용자 코멘트 ({selectedCafeForComments?.comments?.length || 0}개)
                  </h4>
                  <div className="space-y-4">
                    {selectedCafeForComments?.comments?.map((comment: any, index: number) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{comment.user}</span>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // 메인 화면
            <>
              <div ref={leftPanelRef} className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* 카페 작업 환경 만족도 */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      카페 작업 환경 만족도
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

                  {/* 카페 목록 */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
                        노트북 카페 {filteredCafes.length}곳
                      </h3>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={show24HourFilter}
                          onChange={(e) => setShow24HourFilter(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">24시간</span>
                      </label>
                    </div>
                    <div className="space-y-4">
                      {displayedCafes.map((cafe, index) => (
                        <div key={index} className="space-y-3 pb-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-700 font-medium">{cafe.name}</span>
                                {cafe.is24Hour && (
                                  <Badge className="bg-green-100 text-green-700 text-xs pointer-events-none">
                                    24시
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>
                                  {cafe.plan} • {cafe.price}
                                </div>
                                <div>{cafe.comment}</div>
                                <div className="flex items-center gap-2">
                                  <a
                                    href={cafe.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                  >
                                    링크 <ExternalLink className="w-3 h-3" />
                                  </a>
                                  <button
                                    onClick={() => showCafeComments(cafe)}
                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                  >
                                    [코멘트 더보기]
                                  </button>
                                </div>
                              </div>
                            </div>
                            <span className="text-gray-500 text-xs">{cafe.likes}명</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{
                                width: `${(cafe.likes / Math.max(...allCafes.map((c) => c.likes))) * 100}%`,
                                backgroundColor: "#0B24FB",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {filteredCafes.length > 5 && (
                      <button
                        onClick={() => setShowAllCafes(!showAllCafes)}
                        className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-1"
                      >
                        <span>{showAllCafes ? "접기" : "더보기"}</span>
                        {showAllCafes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div ref={rightPanelRef} className="w-[70%] bg-white overflow-y-auto">
                <div className="px-16 py-6 space-y-8 pb-24">
                  <CafeInput
                    onScoreChange={setSelectedScore}
                    onCafesChange={setCafes}
                    onRecommendationsChange={setSelectedRecommendations}
                    selectedScore={selectedScore}
                    cafes={cafes}
                    selectedRecommendations={selectedRecommendations}
                  />

                  <div className="pt-6">
                    <button
                      disabled={!selectedScore && cafes.length === 0 && selectedRecommendations.length === 0}
                      className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                    >
                      개척하기 (+15 EXP)
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
