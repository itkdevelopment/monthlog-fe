"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface RecommendedMonthsPanelProps {
  isOpen: boolean
  onClose: () => void
  cityName: string
  cardData: {
    title: string
    contributorCount: number
    monthlyData: Array<{
      month: string
      recommendations: number
      temperature: number
    }>
    topRecommendations: Array<{
      month: string
      reason: string
      votes: number
    }>
    avoidRecommendations: Array<{
      month: string
      reason: string
      votes: number
    }>
  }
}

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

export default function RecommendedMonthsPanel({ isOpen, onClose, cityName, cardData }: RecommendedMonthsPanelProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedRecommendMonths, setSelectedRecommendMonths] = useState<string[]>([])
  const [selectedAvoidMonths, setSelectedAvoidMonths] = useState<string[]>([])
  const [recommendReason, setRecommendReason] = useState("")
  const [avoidReason, setAvoidReason] = useState("")
  const [selectedExistingRecommend, setSelectedExistingRecommend] = useState<string[]>([])
  const [selectedExistingAvoid, setSelectedExistingAvoid] = useState<string[]>([])
  const [showOnlyRecommend, setShowOnlyRecommend] = useState(false)
  const [showOnlyAvoid, setShowOnlyAvoid] = useState(false)
  const [showAllRecommendOpinions, setShowAllRecommendOpinions] = useState(false)
  const [showAllAvoidOpinions, setShowAllAvoidOpinions] = useState(false)

  // 월별 데이터 (추천과 피해야하는 데이터 통합)
  const monthlyData = [
    { month: "1월", recommend: 0, avoid: 8 },
    { month: "2월", recommend: 8, avoid: 0 },
    { month: "3월", recommend: 15, avoid: 3 },
    { month: "4월", recommend: 22, avoid: 2 },
    { month: "5월", recommend: 18, avoid: 4 },
    { month: "6월", recommend: 12, avoid: 8 },
    { month: "7월", recommend: 0, avoid: 18 },
    { month: "8월", recommend: 4, avoid: 20 },
    { month: "9월", recommend: 16, avoid: 0 },
    { month: "10월", recommend: 20, avoid: 3 },
    { month: "11월", recommend: 14, avoid: 0 },
    { month: "12월", recommend: 0, avoid: 0 },
  ]

  // 1월 예시 데이터 (피해야하는 이유만)
  const januaryReasons = {
    recommend: [],
    avoid: [
      { reason: "너무 추워서 야외활동이 힘들어요", votes: 5 },
      { reason: "바람이 너무 강해요", votes: 3 },
    ],
  }

  // 2월 예시 데이터 (추천만)
  const februaryReasons = {
    recommend: [
      { reason: "겨울 축제가 많아서 즐길거리가 풍부해요", votes: 4 },
      { reason: "관광객이 적어서 조용하고 여유로워요", votes: 4 },
    ],
    avoid: [],
  }

  // 3월 예시 데이터
  const marchReasons = {
    recommend: [
      { reason: "봄이 시작되어 날씨가 따뜻해져요", votes: 8 },
      { reason: "꽃이 피기 시작해서 아름다워요", votes: 4 },
      { reason: "야외활동하기 좋은 날씨예요", votes: 3 },
    ],
    avoid: [
      { reason: "꽃가루 때문에 알레르기가 심해져요", votes: 2 },
      { reason: "일교차가 커서 옷차림이 애매해요", votes: 1 },
    ],
  }

  // 4월 예시 데이터
  const aprilReasons = {
    recommend: [
      { reason: "벚꽃이 만개해서 도시 전체가 아름다워요", votes: 15 },
      { reason: "날씨가 완벽하고 야외활동하기 최고예요", votes: 4 },
      { reason: "관광지가 붐비지 않아서 여유롭게 즐길 수 있어요", votes: 2 },
      { reason: "카페 테라스에서 커피 마시기 딱 좋은 날씨", votes: 1 },
    ],
    avoid: [
      { reason: "꽃가루 알레르기가 심해져요", votes: 1 },
      { reason: "일교차가 커서 옷차림이 애매해요", votes: 1 },
    ],
  }

  // 5월 예시 데이터
  const mayReasons = {
    recommend: [
      { reason: "완벽한 봄 날씨로 모든 활동이 즐거워요", votes: 10 },
      { reason: "신록이 아름다워 자연을 만끽할 수 있어요", votes: 5 },
      { reason: "축제와 이벤트가 많아요", votes: 3 },
    ],
    avoid: [
      { reason: "관광객이 많아져서 붐벼요", votes: 2 },
      { reason: "숙박비가 오르기 시작해요", votes: 2 },
    ],
  }

  // 6월 예시 데이터
  const juneReasons = {
    recommend: [
      { reason: "초여름 날씨가 상쾌해요", votes: 7 },
      { reason: "해가 길어서 활동시간이 많아요", votes: 3 },
      { reason: "바다 활동을 시작하기 좋아요", votes: 2 },
    ],
    avoid: [
      { reason: "장마철이 시작되어 비가 자주 와요", votes: 4 },
      { reason: "습도가 높아져서 불쾌해요", votes: 2 },
      { reason: "관광 성수기라 비싸요", votes: 2 },
    ],
  }

  // 7월 예시 데이터 (피해야하는 이유만)
  const julyReasons = {
    recommend: [],
    avoid: [
      { reason: "너무 더워서 야외활동이 힘들어요", votes: 8 },
      { reason: "장마철이라 비가 너무 많이 와요", votes: 6 },
      { reason: "습도가 너무 높아서 불쾌해요", votes: 4 },
    ],
  }

  // 8월 예시 데이터
  const augustReasons = {
    recommend: [
      { reason: "바다 활동하기 최고의 시기예요", votes: 2 },
      { reason: "여름 축제가 많아요", votes: 2 },
    ],
    avoid: [
      { reason: "폭염으로 너무 더워요", votes: 10 },
      { reason: "관광객이 너무 많아서 붐벼요", votes: 5 },
      { reason: "모든 것이 비싸요", votes: 3 },
      { reason: "태풍이 올 수 있어요", votes: 2 },
    ],
  }

  // 9월 예시 데이터 (추천만)
  const septemberReasons = {
    recommend: [
      { reason: "선선한 가을 날씨가 완벽해요", votes: 8 },
      { reason: "관광객이 줄어들어 여유로워요", votes: 4 },
      { reason: "가을 풍경이 아름다워요", votes: 2 },
      { reason: "야외활동하기 딱 좋아요", votes: 2 },
    ],
    avoid: [],
  }

  // 10월 예시 데이터
  const octoberReasons = {
    recommend: [
      { reason: "단풍이 절정이라 정말 아름다워요", votes: 12 },
      { reason: "선선한 날씨로 걷기 좋아요", votes: 5 },
      { reason: "관광객이 적어서 조용해요", votes: 2 },
      { reason: "가을 축제가 많아요", votes: 1 },
    ],
    avoid: [
      { reason: "일교차가 커서 옷차림이 어려워요", votes: 2 },
      { reason: "비가 가끔 와서 계획이 틀어져요", votes: 1 },
    ],
  }

  // 11월 예시 데이터 (추천만)
  const novemberReasons = {
    recommend: [
      { reason: "늦가을 정취가 아름다워요", votes: 6 },
      { reason: "선선한 날씨로 걷기 좋아요", votes: 4 },
      { reason: "관광객이 적어서 조용해요", votes: 2 },
      { reason: "항공료와 숙박비가 저렴해요", votes: 2 },
    ],
    avoid: [],
  }

  // 확장된 추천 의견 데이터 (더 보기용)
  const extendedRecommendOpinions = [
    { month: "4월", reason: "벚꽃이 만개해서 도시 전체가 아름다워요", votes: 15 },
    { month: "3월", reason: "봄이 시작되어 날씨가 따뜻해져요", votes: 12 },
    { month: "5월", reason: "완벽한 봄 날씨로 모든 활동이 즐거워요", votes: 10 },
    { month: "4월", reason: "날씨가 완벽하고 야외활동하기 최고예요", votes: 8 },
    { month: "6월", reason: "초여름 날씨가 상쾌해요", votes: 7 },
    { month: "11월", reason: "늦가을 정취가 아름다워요", votes: 6 },
    { month: "9월", reason: "선선한 가을 날씨가 완벽해요", votes: 5 },
    { month: "10월", reason: "선선한 날씨로 걷기 좋아요", votes: 4 },
    { month: "2월", reason: "겨울 축제가 많아서 즐길거리가 풍부해요", votes: 4 },
  ]

  // 확장된 피해야하는 의견 데이터 (더 보기용)
  const extendedAvoidOpinions = [
    { month: "8월", reason: "폭염으로 너무 더워요", votes: 12 },
    { month: "7월", reason: "너무 더워서 야외활동이 힘들어요", votes: 10 },
    { month: "1월", reason: "너무 추워서 야외활동이 힘들어요", votes: 8 },
    { month: "7월", reason: "장마철이라 비가 너무 많이 와요", votes: 7 },
    { month: "8월", reason: "관광객이 너무 많아서 붐벼요", votes: 6 },
    { month: "6월", reason: "장마철이 시작되어 비가 자주 와요", votes: 5 },
    { month: "7월", reason: "습도가 너무 높아서 불쾌해요", votes: 4 },
    { month: "8월", reason: "모든 것이 비싸요", votes: 3 },
    { month: "1월", reason: "바람이 너무 강해요", votes: 3 },
  ]

  // 최대값 찾기
  const maxTotal = Math.max(...monthlyData.map((d) => d.recommend + d.avoid))

  // 기본적으로 가장 많은 작성수의 월 선택
  useEffect(() => {
    if (isOpen && !selectedMonth) {
      const maxMonth = monthlyData.reduce((prev, current) =>
        prev.recommend + prev.avoid > current.recommend + current.avoid ? prev : current,
      )
      setSelectedMonth(maxMonth.month)
    }
  }, [isOpen, selectedMonth])

  // 선택된 월의 이유들 가져오기
  const getSelectedMonthReasons = () => {
    if (!selectedMonth) return { recommend: [], avoid: [] }

    const reasonsMap: { [key: string]: { recommend: any[]; avoid: any[] } } = {
      "1월": januaryReasons,
      "2월": februaryReasons,
      "3월": marchReasons,
      "4월": aprilReasons,
      "5월": mayReasons,
      "6월": juneReasons,
      "7월": julyReasons,
      "8월": augustReasons,
      "9월": septemberReasons,
      "10월": octoberReasons,
      "11월": novemberReasons,
      "12월": { recommend: [], avoid: [] },
    }

    return reasonsMap[selectedMonth] || { recommend: [], avoid: [] }
  }

  const selectedMonthReasons = getSelectedMonthReasons()

  const handleRecommendMonthToggle = (month: string) => {
    setSelectedRecommendMonths((prev) => (prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]))
  }

  const handleAvoidMonthToggle = (month: string) => {
    setSelectedAvoidMonths((prev) => (prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]))
  }

  const handleExistingRecommendToggle = (key: string) => {
    setSelectedExistingRecommend((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const handleExistingAvoidToggle = (key: string) => {
    setSelectedExistingAvoid((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const handleMonthClick = (month: string) => {
    setSelectedMonth(month)
  }

  const handleToggleRecommend = () => {
    setShowOnlyRecommend((prev) => !prev)
    if (showOnlyAvoid) setShowOnlyAvoid(false)
  }

  const handleToggleAvoid = () => {
    setShowOnlyAvoid((prev) => !prev)
    if (showOnlyRecommend) setShowOnlyRecommend(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 - 네비게이션 포함 전체 화면 덮기 */}
          <div
            className="fixed bg-black/50"
            style={{
              top: "auto",
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 50,
              position: "fixed",
            }}
            onClick={onClose}
          />

          {/* 패널 - 화면의 95% 높이 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut",
            }}
            className="fixed left-0 right-0 bg-white rounded-t-2xl flex flex-col"
            style={{
              bottom: 0,
              height: "95vh",
              zIndex: 51,
              position: "fixed",
            }}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">추천 ↔ 피해야하는 시기</h2>

                {/* 필터 버튼들 */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleToggleRecommend}
                    variant={showOnlyRecommend ? "default" : "outline"}
                    size="sm"
                    className={showOnlyRecommend ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    추천하는 시기만
                  </Button>
                  <Button
                    onClick={handleToggleAvoid}
                    variant={showOnlyAvoid ? "default" : "outline"}
                    size="sm"
                    className={showOnlyAvoid ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    피해야하는 시기만
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">{cardData.contributorCount}명이 기여한 정보</p>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex-1 flex min-h-0">
              {/* 왼쪽 영역 - 정보 분석 (30%) */}
              <div className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* 월별 추천/피해야하는 시기 분포 */}
                  {!showOnlyAvoid && !showOnlyRecommend && (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                        월별 추천/피해야하는 시기 분포
                      </h3>
                      <div className="space-y-4">
                        {monthlyData.map((item, index) => {
                          const total = item.recommend + item.avoid
                          const isSelected = selectedMonth === item.month

                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-700 font-medium">{item.month}</span>
                                <span className="text-gray-500">{total}명</span>
                              </div>
                              <div
                                className="w-full bg-gray-200 rounded-full h-3 cursor-pointer"
                                onClick={() => handleMonthClick(item.month)}
                              >
                                <div
                                  className={`h-3 rounded-full transition-all duration-300 flex ${isSelected ? "ring-2 ring-black" : ""}`}
                                >
                                  {total > 0 ? (
                                    <>
                                      {/* 추천 부분 - 파란색은 추천 의견이 있을 때만 */}
                                      {item.recommend > 0 && (
                                        <div
                                          className="bg-[#0B24FB] h-3 first:rounded-l-full last:rounded-r-full"
                                          style={{
                                            width: `${(item.recommend / maxTotal) * 100}%`,
                                            borderTopLeftRadius: "9999px",
                                            borderBottomLeftRadius: "9999px",
                                            borderTopRightRadius: item.avoid === 0 ? "9999px" : "0",
                                            borderBottomRightRadius: item.avoid === 0 ? "9999px" : "0",
                                          }}
                                        />
                                      )}
                                      {/* 피해야하는 부분 - 빨간색은 피해야하는 의견이 있을 때만 */}
                                      {item.avoid > 0 && (
                                        <div
                                          className="bg-[#ff0e0e] h-3"
                                          style={{
                                            width: `${(item.avoid / maxTotal) * 100}%`,
                                            borderTopLeftRadius: item.recommend === 0 ? "9999px" : "0",
                                            borderBottomLeftRadius: item.recommend === 0 ? "9999px" : "0",
                                            borderTopRightRadius: "9999px",
                                            borderBottomRightRadius: "9999px",
                                          }}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    /* 의견이 없는 경우 회색 배경만 */
                                    <div className="bg-gray-200 h-3 rounded-full w-full" />
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* 추천하는 시기만 필터 */}
                  {showOnlyRecommend && (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                        월별 추천하는 시기 분포
                      </h3>
                      <div className="space-y-4">
                        {monthlyData
                          .filter((item) => item.recommend > 0)
                          .map((item, index) => {
                            const isSelected = selectedMonth === item.month

                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-700 font-medium">{item.month}</span>
                                  <span className="text-gray-500">{item.recommend}명</span>
                                </div>
                                <div
                                  className="w-full bg-gray-200 rounded-full h-3 cursor-pointer"
                                  onClick={() => handleMonthClick(item.month)}
                                >
                                  <div
                                    className={`h-3 rounded-full transition-all duration-300 bg-[#0B24FB] ${isSelected ? "ring-2 ring-black" : ""}`}
                                    style={{ width: `${(item.recommend / maxTotal) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )}

                  {/* 피해야하는 시기만 필터 */}
                  {showOnlyAvoid && (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                        월별 피해야하는 시기 분포
                      </h3>
                      <div className="space-y-4">
                        {monthlyData
                          .filter((item) => item.avoid > 0)
                          .map((item, index) => {
                            const isSelected = selectedMonth === item.month

                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-700 font-medium">{item.month}</span>
                                  <span className="text-gray-500">{item.avoid}명</span>
                                </div>
                                <div
                                  className="w-full bg-gray-200 rounded-full h-3 cursor-pointer"
                                  onClick={() => handleMonthClick(item.month)}
                                >
                                  <div
                                    className={`h-3 rounded-full transition-all duration-300 bg-[#ff0e0e] ${isSelected ? "ring-2 ring-black" : ""}`}
                                    style={{ width: `${(item.avoid / maxTotal) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )}

                  {/* 선택된 월의 이유들 */}
                  {selectedMonth && (
                    <div className="space-y-5">
                      <h3 className="text-lg font-bold text-gray-900">{selectedMonth} 관련 의견</h3>

                      {!showOnlyAvoid && selectedMonthReasons.recommend.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-blue-600 mb-2">🥰 추천하는 이유</h5>
                          <div className="space-y-2">
                            {selectedMonthReasons.recommend.map((item, index) => (
                              <div key={index} className="bg-blue-50 rounded-lg p-3">
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.reason}</p>
                                <span className="text-xs text-gray-500">{item.votes}명</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!showOnlyRecommend && selectedMonthReasons.avoid.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-red-600 mb-2">😰 피해야하는 이유</h5>
                          <div className="space-y-2">
                            {selectedMonthReasons.avoid.map((item, index) => (
                              <div key={index} className="bg-red-50 rounded-lg p-3">
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.reason}</p>
                                <span className="text-xs text-gray-500">{item.votes}명</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {((showOnlyRecommend && selectedMonthReasons.recommend.length === 0) ||
                        (showOnlyAvoid && selectedMonthReasons.avoid.length === 0) ||
                        (!showOnlyRecommend &&
                          !showOnlyAvoid &&
                          selectedMonthReasons.recommend.length === 0 &&
                          selectedMonthReasons.avoid.length === 0)) && (
                        <p className="text-sm text-gray-500">해당 월에 대한 의견이 없습니다.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 오른쪽 영역 - 사용자 입력 (70%) */}
              <div className="w-[70%] bg-white overflow-y-auto">
                <div className="px-16 py-6 space-y-12 pb-24">
                  {/* 추천하는 월 */}
                  {!showOnlyAvoid && (
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">🥰 추천하는 시기</h4>

                      <div>
                        <p className="text-sm text-gray-600 mb-4">추천하는 월을 선택해주세요 (다중 선택 가능)</p>
                        <div className="grid grid-cols-4 gap-2">
                          {months.map((month) => (
                            <button
                              key={month}
                              onClick={() => handleRecommendMonthToggle(month)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedRecommendMonths.includes(month)
                                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-3">추천하는 이유를 작성해주세요</p>
                        <Textarea
                          value={recommendReason}
                          onChange={(e) => setRecommendReason(e.target.value)}
                          placeholder="예: 벚꽃 시즌이라 완벽한 날씨 속에서 도시 전체가 아름다워요"
                          className="min-h-[100px] resize-none"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-3">다른 사람의 추천 이유에 동의하시나요?</p>
                        <div className="space-y-2">
                          {(showAllRecommendOpinions
                            ? extendedRecommendOpinions
                            : extendedRecommendOpinions.slice(0, 3)
                          ).map((item, index) => (
                            <button
                              key={`recommend-${index}`}
                              onClick={() => handleExistingRecommendToggle(`recommend-${index}`)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedExistingRecommend.includes(`recommend-${index}`)
                                  ? "bg-blue-50 border-blue-200"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700">
                                    [{item.month}] {item.reason}
                                  </p>
                                  <span className="text-xs text-gray-500">{item.votes}명이 동의</span>
                                </div>
                                {selectedExistingRecommend.includes(`recommend-${index}`) && (
                                  <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                                )}
                              </div>
                            </button>
                          ))}

                          {extendedRecommendOpinions.length > 3 && (
                            <button
                              onClick={() => setShowAllRecommendOpinions(!showAllRecommendOpinions)}
                              className="w-full p-3 text-center text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-1"
                            >
                              {showAllRecommendOpinions ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  접기
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />더 보기 ({extendedRecommendOpinions.length - 3}개
                                  더)
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 피해야하는 월 */}
                  {!showOnlyRecommend && (
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">😰 피해야하는 시기</h4>

                      <div>
                        <p className="text-sm text-gray-600 mb-4">피해야하는 월을 선택해주세요 (다중 선택 가능)</p>
                        <div className="grid grid-cols-4 gap-2">
                          {months.map((month) => (
                            <button
                              key={month}
                              onClick={() => handleAvoidMonthToggle(month)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedAvoidMonths.includes(month)
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-3">피해야하는 이유를 작성해주세요</p>
                        <Textarea
                          value={avoidReason}
                          onChange={(e) => setAvoidReason(e.target.value)}
                          placeholder="예: 비가 자주 와서 야외 활동이 제한되고 날씨가 변덕스러워요"
                          className="min-h-[100px] resize-none"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-3">다른 사람의 피해야하는 이유에 동의하시나요?</p>
                        <div className="space-y-2">
                          {(showAllAvoidOpinions ? extendedAvoidOpinions : extendedAvoidOpinions.slice(0, 3)).map(
                            (item, index) => (
                              <button
                                key={`avoid-${index}`}
                                onClick={() => handleExistingAvoidToggle(`avoid-${index}`)}
                                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                  selectedExistingAvoid.includes(`avoid-${index}`)
                                    ? "bg-red-50 border-red-200"
                                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-700">
                                      [{item.month}] {item.reason}
                                    </p>
                                    <span className="text-xs text-gray-500">{item.votes}명이 동의</span>
                                  </div>
                                  {selectedExistingAvoid.includes(`avoid-${index}`) && (
                                    <Check className="h-4 w-4 text-red-600 mt-0.5" />
                                  )}
                                </div>
                              </button>
                            ),
                          )}

                          {extendedAvoidOpinions.length > 3 && (
                            <button
                              onClick={() => setShowAllAvoidOpinions(!showAllAvoidOpinions)}
                              className="w-full p-3 text-center text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-1"
                            >
                              {showAllAvoidOpinions ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  접기
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />더 보기 ({extendedAvoidOpinions.length - 3}개 더)
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 저장 버튼 */}
                  <div className="pt-6">
                    <button className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors">
                      경험 공유하기 (+50 EXP)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
