"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ArrowLeft } from "lucide-react"
import MembershipInput from "../workation-inputs/membership-input"

interface MembershipPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface PricePlan {
  tag: string
  price: string
}

export default function MembershipPanel({ isOpen, onClose }: MembershipPanelProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTags, setNewTags] = useState<string[]>([])
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [pricePlans, setPricePlans] = useState<PricePlan[]>([])
  const [expandedPriceInfo, setExpandedPriceInfo] = useState<string | null>(null)
  const [showCoworkingSpaces, setShowCoworkingSpaces] = useState(false)
  const [selectedPlanForSpaces, setSelectedPlanForSpaces] = useState("")
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("전체")
  const [savedScrollPositions, setSavedScrollPositions] = useState({ left: 0, right: 0 })

  // 스크롤 위치 저장을 위한 ref
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const existingTags = [
    { text: "주단위 이용권 구매 용이", votes: 48 },
    { text: "일일권 저렴", votes: 42 },
    { text: "월 멤버십 할인", votes: 38 },
    { text: "시간당 요금제", votes: 32 },
    { text: "학생 할인 있음", votes: 28 },
    { text: "멤버십 비쌈", votes: 15 },
  ]

  // 이용권 가격대 정보 (평균가격, 선택자 수, 가격 분포)
  const priceInfo = [
    {
      plan: "1시간",
      averagePrice: 8500,
      userCount: 45,
      priceDistribution: [
        { range: "5,000원 이하", count: 8, percentage: 18 },
        { range: "5,000-8,000원", count: 12, percentage: 27 },
        { range: "8,000-10,000원", count: 15, percentage: 33 },
        { range: "10,000-15,000원", count: 8, percentage: 18 },
        { range: "15,000원 이상", count: 2, percentage: 4 },
      ],
      coworkingSpaces: [
        { name: "WeWork 강남", plan: "1시간", price: "8,000원", features: ["24시간", "회의실", "무료 커피"] },
        { name: "패스트파이브 홍대", plan: "1시간", price: "7,500원", features: ["젊은 분위기", "이벤트"] },
        { name: "스파크플러스 역삼", plan: "1시간", price: "9,000원", features: ["조용한 환경", "지하철 근처"] },
      ],
    },
    {
      plan: "1일권",
      averagePrice: 25000,
      userCount: 62,
      priceDistribution: [
        { range: "15,000원 이하", count: 5, percentage: 8 },
        { range: "15,000-20,000원", count: 12, percentage: 19 },
        { range: "20,000-30,000원", count: 28, percentage: 45 },
        { range: "30,000-40,000원", count: 15, percentage: 24 },
        { range: "40,000원 이상", count: 2, percentage: 3 },
      ],
      coworkingSpaces: [
        {
          name: "WeWork 강남",
          plan: "1일권",
          price: "30,000원",
          features: ["24시간", "회의실", "무료 커피", "네트워킹"],
        },
        { name: "패스트파이브 홍대", plan: "1일권", price: "22,000원", features: ["젊은 분위기", "이벤트", "루프탑"] },
        {
          name: "스파크플러스 역삼",
          plan: "1일권",
          price: "25,000원",
          features: ["조용한 환경", "지하철 근처", "프린터"],
        },
        { name: "마이워크스페이스 선릉", plan: "1일권", price: "20,000원", features: ["개인 사물함", "샤워실"] },
      ],
    },
    {
      plan: "한달플랜",
      averagePrice: 350000,
      userCount: 85,
      priceDistribution: [
        { range: "200,000원 이하", count: 5, percentage: 6 },
        { range: "200,000-300,000원", count: 18, percentage: 21 },
        { range: "300,000-400,000원", count: 42, percentage: 49 },
        { range: "400,000-500,000원", count: 16, percentage: 19 },
        { range: "500,000원 이상", count: 4, percentage: 5 },
      ],
      coworkingSpaces: [
        {
          name: "WeWork 강남",
          plan: "한달플랜",
          price: "450,000원",
          features: ["24시간", "회의실", "무료 커피", "네트워킹", "전용 데스크"],
        },
        {
          name: "패스트파이브 홍대",
          plan: "한달플랜",
          price: "320,000원",
          features: ["젊은 분위기", "이벤트", "루프탑", "라운지"],
        },
        {
          name: "스파크플러스 역삼",
          plan: "한달플랜",
          price: "380,000원",
          features: ["조용한 환경", "지하철 근처", "프린터", "개인 사물함"],
        },
        {
          name: "마이워크스페이스 선릉",
          plan: "한달플랜",
          price: "290,000원",
          features: ["개인 사물함", "샤워실", "휴게실"],
        },
        { name: "더허브 신촌", plan: "한달플랜", price: "340,000원", features: ["대학가", "스터디룸", "카페 할인"] },
      ],
    },
    {
      plan: "7일권",
      averagePrice: 120000,
      userCount: 38,
      priceDistribution: [
        { range: "80,000원 이하", count: 3, percentage: 8 },
        { range: "80,000-100,000원", count: 8, percentage: 21 },
        { range: "100,000-140,000원", count: 18, percentage: 47 },
        { range: "140,000-180,000원", count: 7, percentage: 18 },
        { range: "180,000원 이상", count: 2, percentage: 5 },
      ],
      coworkingSpaces: [
        { name: "WeWork 강남", plan: "7일권", price: "150,000원", features: ["24시간", "회의실", "무료 커피"] },
        { name: "패스트파이브 홍대", plan: "7일권", price: "110,000원", features: ["젊은 분위기", "이벤트"] },
        { name: "스파크플러스 역삼", plan: "7일권", price: "125,000원", features: ["조용한 환경", "지하철 근처"] },
      ],
    },
    {
      plan: "10일권",
      averagePrice: 180000,
      userCount: 29,
      priceDistribution: [
        { range: "120,000원 이하", count: 2, percentage: 7 },
        { range: "120,000-150,000원", count: 6, percentage: 21 },
        { range: "150,000-200,000원", count: 14, percentage: 48 },
        { range: "200,000-250,000원", count: 6, percentage: 21 },
        { range: "250,000원 이상", count: 1, percentage: 3 },
      ],
      coworkingSpaces: [
        { name: "WeWork 강남", plan: "10일권", price: "220,000원", features: ["24시간", "회의실", "무료 커피"] },
        { name: "패스트파이브 홍대", plan: "10일권", price: "160,000원", features: ["젊은 분위기", "이벤트"] },
      ],
    },
    {
      plan: "15일권",
      averagePrice: 250000,
      userCount: 22,
      priceDistribution: [
        { range: "180,000원 이하", count: 2, percentage: 9 },
        { range: "180,000-220,000원", count: 5, percentage: 23 },
        { range: "220,000-280,000원", count: 10, percentage: 45 },
        { range: "280,000-320,000원", count: 4, percentage: 18 },
        { range: "320,000원 이상", count: 1, percentage: 5 },
      ],
      coworkingSpaces: [
        { name: "WeWork 강남", plan: "15일권", price: "300,000원", features: ["24시간", "회의실", "무료 커피"] },
        { name: "스파크플러스 역삼", plan: "15일권", price: "240,000원", features: ["조용한 환경", "지하철 근처"] },
      ],
    },
    {
      plan: "3개월 플랜",
      averagePrice: 950000,
      userCount: 18,
      priceDistribution: [
        { range: "700,000원 이하", count: 2, percentage: 11 },
        { range: "700,000-850,000원", count: 4, percentage: 22 },
        { range: "850,000-1,000,000원", count: 8, percentage: 44 },
        { range: "1,000,000-1,200,000원", count: 3, percentage: 17 },
        { range: "1,200,000원 이상", count: 1, percentage: 6 },
      ],
      coworkingSpaces: [
        {
          name: "WeWork 강남",
          plan: "3개월 플랜",
          price: "1,200,000원",
          features: ["24시간", "회의실", "무료 커피", "네트워킹", "전용 데스크"],
        },
        {
          name: "패스트파이브 홍대",
          plan: "3개월 플랜",
          price: "850,000원",
          features: ["젊은 분위기", "이벤트", "루프탑"],
        },
      ],
    },
    {
      plan: "6개월 플랜",
      averagePrice: 1800000,
      userCount: 12,
      priceDistribution: [
        { range: "1,300,000원 이하", count: 1, percentage: 8 },
        { range: "1,300,000-1,600,000원", count: 3, percentage: 25 },
        { range: "1,600,000-2,000,000원", count: 5, percentage: 42 },
        { range: "2,000,000-2,400,000원", count: 2, percentage: 17 },
        { range: "2,400,000원 이상", count: 1, percentage: 8 },
      ],
      coworkingSpaces: [
        {
          name: "WeWork 강남",
          plan: "6개월 플랜",
          price: "2,200,000원",
          features: ["24시간", "회의실", "무료 커피", "네트워킹", "전용 데스크"],
        },
      ],
    },
    {
      plan: "1년플랜",
      averagePrice: 3200000,
      userCount: 8,
      priceDistribution: [
        { range: "2,500,000원 이하", count: 1, percentage: 13 },
        { range: "2,500,000-3,000,000원", count: 2, percentage: 25 },
        { range: "3,000,000-3,500,000원", count: 3, percentage: 38 },
        { range: "3,500,000-4,000,000원", count: 1, percentage: 13 },
        { range: "4,000,000원 이상", count: 1, percentage: 13 },
      ],
      coworkingSpaces: [
        {
          name: "WeWork 강남",
          plan: "1년플랜",
          price: "4,000,000원",
          features: ["24시간", "회의실", "무료 커피", "네트워킹", "전용 데스크", "VIP 라운지"],
        },
      ],
    },
  ]

  const scoreDistribution = [
    { score: 10, count: 22, percentage: 22 },
    { score: 9, count: 18, percentage: 18 },
    { score: 8, count: 20, percentage: 20 },
    { score: 7, count: 16, percentage: 16 },
    { score: 6, count: 12, percentage: 12 },
    { score: 5, count: 8, percentage: 8 },
    { score: 4, count: 2, percentage: 2 },
    { score: 3, count: 1, percentage: 1 },
    { score: 2, count: 1, percentage: 1 },
    { score: 1, count: 0, percentage: 0 },
  ]

  const averageScore = 7.6

  // 스크롤 위치 저장 함수
  const saveScrollPositions = () => {
    if (leftPanelRef.current && rightPanelRef.current) {
      setSavedScrollPositions({
        left: leftPanelRef.current.scrollTop,
        right: rightPanelRef.current.scrollTop,
      })
    }
  }

  // 스크롤 위치 복원 함수
  const restoreScrollPositions = () => {
    setTimeout(() => {
      if (leftPanelRef.current && rightPanelRef.current) {
        leftPanelRef.current.scrollTop = savedScrollPositions.left
        rightPanelRef.current.scrollTop = savedScrollPositions.right
      }
    }, 100)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR")
  }

  const showRelatedCoworkingSpaces = (plan: string) => {
    saveScrollPositions()
    setSelectedPlanForSpaces(plan)
    setShowCoworkingSpaces(true)
  }

  const backToMainView = () => {
    setShowCoworkingSpaces(false)
    setSelectedPlanForSpaces("")
    restoreScrollPositions()
  }

  // 선택된 필터에 따른 가격 분포 데이터 가져오기
  const getFilteredPriceDistribution = () => {
    if (selectedPriceFilter === "전체") {
      // 전체 선택 시 모든 이용권의 평균가격을 그래프로 표시
      return priceInfo.map((info) => ({
        range: info.plan,
        count: info.userCount,
        percentage: (info.userCount / Math.max(...priceInfo.map((p) => p.userCount))) * 100,
      }))
    } else {
      // 특정 이용권 선택 시 해당 이용권의 가격 분포 표시
      const selectedPlan = priceInfo.find((info) => info.plan === selectedPriceFilter)
      return selectedPlan ? selectedPlan.priceDistribution : []
    }
  }

  const priceFilterOptions = ["전체", ...priceInfo.map((info) => info.plan)]

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
            {showCoworkingSpaces && (
              <button
                onClick={backToMainView}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {showCoworkingSpaces ? `${selectedPlanForSpaces} 연관 코워킹스페이스` : "단기 멤버십 정보 용이"}
            </h2>
            {!showCoworkingSpaces && <span className="text-2xl font-bold text-gray-900">{averageScore}점</span>}
          </div>
          <div className="flex items-center gap-3">
            {!showCoworkingSpaces && <span className="text-sm text-gray-500">100명이 기여한 정보</span>}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {showCoworkingSpaces ? (
            // 연관 코워킹스페이스 보기 화면
            <div className="w-full bg-white overflow-y-auto">
              <div className="px-16 py-6 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedPlanForSpaces} 이용권</h3>
                  <p className="text-sm text-gray-600">
                    {selectedPlanForSpaces} 이용권을 제공하는 코워킹스페이스 목록입니다
                  </p>
                </div>

                <div className="space-y-4">
                  {priceInfo
                    .find((info) => info.plan === selectedPlanForSpaces)
                    ?.coworkingSpaces?.map((space, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{space.name}</h4>
                            <div className="text-lg text-blue-600 font-semibold mb-2">
                              {space.plan} • {space.price}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {space.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            // 메인 화면
            <>
              <div ref={leftPanelRef} className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* 단기 이용권 구매 편의성 */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      단기 이용권 구매 편의성
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

                  {/* 이용권 가격대 */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                      <h3 className="text-lg font-bold text-gray-900">이용권 가격대</h3>
                      <div className="relative">
                        <select
                          value={selectedPriceFilter}
                          onChange={(e) => setSelectedPriceFilter(e.target.value)}
                          className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                        >
                          {priceFilterOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* 모든 이용권 정보 표시 */}
                    <div className="space-y-6">
                      {priceInfo.map((info, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-bold text-gray-900">
                              {info.plan} (평균 {formatPrice(info.averagePrice)}원)
                            </h4>
                            <span className="text-sm text-gray-500">{info.userCount}명</span>
                          </div>
                          <button
                            onClick={() => showRelatedCoworkingSpaces(info.plan)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3 block"
                          >
                            [코워킹스페이스 보기]
                          </button>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(info.userCount / Math.max(...priceInfo.map((p) => p.userCount))) * 100}%`,
                                backgroundColor: "#0B24FB",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-4">
                      {getFilteredPriceDistribution().map((dist, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{dist.range}</span>
                            <span className="text-gray-500">{dist.count}명</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{
                                width: `${dist.percentage}%`,
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

              <div ref={rightPanelRef} className="w-[70%] bg-white overflow-y-auto">
                <div className="px-16 py-6 space-y-8 pb-24">
                  <MembershipInput
                    onScoreChange={setSelectedScore}
                    onTagsChange={handleTagsChange}
                    onPricePlansChange={setPricePlans}
                    selectedScore={selectedScore}
                    selectedTags={selectedTags}
                    newTags={newTags}
                    pricePlans={pricePlans}
                  />

                  <div className="pt-6">
                    <button
                      disabled={
                        !selectedScore && selectedTags.length === 0 && newTags.length === 0 && pricePlans.length === 0
                      }
                      className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                    >
                      개척하기 (+{newTags.length > 0 || pricePlans.length > 0 ? 15 : 5} EXP)
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
