"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ChevronUp, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/monthlog-proto/ui/badge"
import CoworkingSpaceInput from "../workation-inputs/coworking-space-input"

interface CoworkingSpacePanelProps {
  isOpen: boolean
  onClose: () => void
}

interface CoworkingSpace {
  name: string
  plan: string
  price: string
  comment: string
  is24Hour: boolean
  link: string
}

interface SelectedRecommendation {
  spaceId: string
  comment: string
}

export default function CoworkingSpacePanel({ isOpen, onClose }: CoworkingSpacePanelProps) {
  const [show24HourFilter, setShow24HourFilter] = useState(false)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [showAllSpaces, setShowAllSpaces] = useState(false)
  const [coworkingSpaces, setCoworkingSpaces] = useState<CoworkingSpace[]>([])
  const [selectedRecommendations, setSelectedRecommendations] = useState<SelectedRecommendation[]>([])
  const [showCommentsView, setShowCommentsView] = useState(false)
  const [selectedSpaceForComments, setSelectedSpaceForComments] = useState<any>(null)
  const [savedScrollPositions, setSavedScrollPositions] = useState({ left: 0, right: 0 })

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const averageScore = 7.5
  const wifiScore = 8.2

  // 점수 분포 데이터
  const scoreDistribution = [
    { score: 10, count: 45, percentage: 18 },
    { score: 9, count: 62, percentage: 25 },
    { score: 8, count: 58, percentage: 23 },
    { score: 7, count: 35, percentage: 14 },
    { score: 6, count: 25, percentage: 10 },
    { score: 5, count: 15, percentage: 6 },
    { score: 4, count: 8, percentage: 3 },
    { score: 3, count: 2, percentage: 1 },
    { score: 2, count: 0, percentage: 0 },
    { score: 1, count: 0, percentage: 0 },
  ]

  // 모든 코워킹 스페이스
  const allSpaces = [
    {
      id: "wework-gangnam",
      name: "WeWork 강남",
      plan: "데이패스",
      price: "3만원",
      comment: "깔끔한 시설과 좋은 네트워킹 환경",
      likes: 156,
      is24Hour: true,
      link: "https://wework.com/gangnam",
      comments: [
        { user: "김민수", comment: "정말 깔끔하고 네트워킹하기 좋아요!", date: "2024-01-15" },
        { user: "이지영", comment: "가격은 비싸지만 시설이 최고입니다", date: "2024-01-14" },
        { user: "박준호", comment: "24시간 이용 가능해서 야근할 때 좋아요", date: "2024-01-13" },
        { user: "최수진", comment: "커피가 맛있고 분위기가 좋습니다", date: "2024-01-12" },
        { user: "정태현", comment: "회의실 예약이 쉽고 시설이 좋아요", date: "2024-01-11" },
      ],
    },
    {
      id: "fastfive-hongdae",
      name: "패스트파이브 홍대",
      plan: "월 멤버십",
      price: "15만원",
      comment: "젊은 분위기와 다양한 이벤트",
      likes: 142,
      is24Hour: false,
      link: "https://fastfive.co.kr/hongdae",
      comments: [
        { user: "김영희", comment: "홍대 분위기가 느껴지는 곳이에요", date: "2024-01-15" },
        { user: "이철수", comment: "이벤트가 많아서 재미있어요", date: "2024-01-14" },
        { user: "박미영", comment: "젊은 사람들이 많아서 활기차요", date: "2024-01-13" },
      ],
    },
    {
      id: "sparkplus-yeoksam",
      name: "스파크플러스 역삼",
      plan: "주간권",
      price: "8만원",
      comment: "조용한 업무환경과 편리한 위치",
      likes: 128,
      is24Hour: true,
      link: "https://sparkplus.co.kr/yeoksam",
      comments: [
        { user: "조현우", comment: "역삼역에서 가까워서 접근성이 좋아요", date: "2024-01-15" },
        { user: "윤서연", comment: "조용해서 집중하기 좋습니다", date: "2024-01-14" },
      ],
    },
  ]

  const filteredSpaces = show24HourFilter ? allSpaces.filter((space) => space.is24Hour) : allSpaces
  const displayedSpaces = showAllSpaces ? filteredSpaces : filteredSpaces.slice(0, 5)

  // 스크롤 위치 저장을 위한 ref
  const saveScrollPositions = () => {
    if (leftPanelRef.current && rightPanelRef.current) {
      setSavedScrollPositions({
        left: leftPanelRef.current.scrollTop,
        right: rightPanelRef.current.scrollTop,
      })
    }
  }

  const restoreScrollPositions = () => {
    setTimeout(() => {
      if (leftPanelRef.current && rightPanelRef.current) {
        leftPanelRef.current.scrollTop = savedScrollPositions.left
        rightPanelRef.current.scrollTop = savedScrollPositions.right
      }
    }, 100)
  }

  const showSpaceComments = (space: any) => {
    saveScrollPositions()
    setSelectedSpaceForComments(space)
    setShowCommentsView(true)
  }

  const backToMainView = () => {
    setShowCommentsView(false)
    setSelectedSpaceForComments(null)
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
              {showCommentsView ? `${selectedSpaceForComments?.name} 코멘트` : "코워킹 스페이스"}
            </h2>
            {!showCommentsView && <span className="text-2xl font-bold text-gray-900">{wifiScore}점</span>}
          </div>
          <div className="flex items-center gap-3">
            {!showCommentsView && <span className="text-sm text-gray-500">250명이 기여한 정보</span>}
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
                    <h3 className="text-lg font-bold text-gray-900">{selectedSpaceForComments?.name}</h3>
                    {selectedSpaceForComments?.is24Hour && (
                      <Badge className="bg-green-100 text-green-700 text-xs">24시</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      {selectedSpaceForComments?.plan} • {selectedSpaceForComments?.price}
                    </div>
                    <div>{selectedSpaceForComments?.comment}</div>
                    <div>
                      <a
                        href={selectedSpaceForComments?.link}
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
                    사용자 코멘트 ({selectedSpaceForComments?.comments?.length || 0}개)
                  </h4>
                  <div className="space-y-4">
                    {selectedSpaceForComments?.comments?.map((comment: any, index: number) => (
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
                  {/* 코워킹스페이스 확보 용이성 */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      코워킹스페이스 확보 용이성
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

                  {/* 코워킹스페이스 목록 */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
                        코워킹스페이스 {filteredSpaces.length}곳
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
                      {displayedSpaces.map((space, index) => (
                        <div key={index} className="space-y-3 pb-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-700 font-medium">{space.name}</span>
                                {space.is24Hour && (
                                  <Badge className="bg-green-100 text-green-700 text-xs pointer-events-none">
                                    24시
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>
                                  {space.plan} • {space.price}
                                </div>
                                <div>{space.comment}</div>
                                <div className="flex items-center gap-2">
                                  <a
                                    href={space.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                  >
                                    링크 <ExternalLink className="w-3 h-3" />
                                  </a>
                                  <button
                                    onClick={() => showSpaceComments(space)}
                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                  >
                                    [코멘트 더보기]
                                  </button>
                                </div>
                              </div>
                            </div>
                            <span className="text-gray-500 text-xs">{space.likes}명</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{
                                width: `${(space.likes / Math.max(...allSpaces.map((s) => s.likes))) * 100}%`,
                                backgroundColor: "#0B24FB",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {filteredSpaces.length > 5 && (
                      <button
                        onClick={() => setShowAllSpaces(!showAllSpaces)}
                        className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-1"
                      >
                        <span>{showAllSpaces ? "접기" : "더보기"}</span>
                        {showAllSpaces ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div ref={rightPanelRef} className="w-[70%] bg-white overflow-y-auto">
                <div className="px-16 py-6 space-y-8 pb-24">
                  <CoworkingSpaceInput
                    onScoreChange={setSelectedScore}
                    onSpacesChange={setCoworkingSpaces}
                    onRecommendationsChange={setSelectedRecommendations}
                    selectedScore={selectedScore}
                    coworkingSpaces={coworkingSpaces}
                    selectedRecommendations={selectedRecommendations}
                  />

                  <div className="pt-6">
                    <button
                      disabled={!selectedScore && coworkingSpaces.length === 0 && selectedRecommendations.length === 0}
                      className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                    >
                      개척하기 (+20 EXP)
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
