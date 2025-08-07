"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/monthlog-proto/ui/button"
import { X, Plus, Filter, Calendar, Users, Heart, ChevronDown } from "lucide-react"

interface CityProfilePanelProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    travelPeriod: { startDate: string; endDate: string }
    companionInfo: { type: string; count: number }
    travelStyles: string[]
    cityTags: string[]
    comment: string
  }) => void
  cityName?: string
}

// 기본 여행 스타일 태그
const DEFAULT_TRAVEL_STYLES = ["#나혼자힐링", "#디지털노마드&워케이션", "#아이와함께", "#가성비여행", "#특별한 경험"]

// 여행 스타일별 추천 도시 태그 매핑
const TRAVEL_STYLE_TAG_MAPPING = {
  "#나혼자힐링": ["조용한동네", "자연경관", "산책하기좋은", "안전한치안", "사색하기좋은곳", "휴식", "공원많음"],
  "#디지털노마드&워케이션": [
    "빠른인터넷",
    "24시간카페",
    "코워킹스페이스",
    "저렴한물가",
    "노마드커뮤니티",
    "콘센트많은곳",
    "업무집중",
    "분위기좋은카페",
    "교통편리",
    "다양한액티비티",
    "휴양지",
  ],
  "#아이와함께": [
    "키즈존",
    "안전한놀이터",
    "소아과인접",
    "유모차접근성좋음",
    "취사가능숙소많음",
    "가족여행",
    "안전한치안",
  ],
  "#가성비여행": ["가성비숙소", "저렴한로컬맛집", "대중교통중심", "무료관광지", "마트물가저렴", "뚜벅이여행"],
  "#특별한 경험": ["고급숙소", "파인다이닝", "프라이빗투어", "호캉스", "쇼핑몰근접", "특별한경험"],
}

// 동행 정보 기본 태그
const COMPANION_TYPES = [
  { label: "혼자", value: "alone" },
  { label: "친구", value: "friend" },
  { label: "연인", value: "lover" },
  { label: "동료", value: "colleague" },
  { label: "가족", value: "family" },
  { label: "가족(아이랑)", value: "family_with_kids" },
  { label: "가족(부모님이랑)", value: "family_with_parents" },
]

// 기존 도시 태그 (예시 데이터)
const EXISTING_CITY_TAGS = [
  "조용한 힐링",
  "자연 친화적",
  "카페 문화",
  "해변 도시",
  "산악 지대",
  "문화 예술",
  "맛집 천국",
  "교통 편리",
]

// 코멘트 기반 추천 도시 태그
const COMMENT_BASED_TAGS = ["힐링 스팟", "자연 경관", "여유로운 분위기", "재방문 추천", "휴식 최적", "경치 좋은"]

// 태그별 데이터 분포 (예시) - 더 많은 데이터 추가
const TAG_DISTRIBUTION = [
  { tag: "조용한 힐링", count: 45, percentage: 35 },
  { tag: "자연 친화적", count: 38, percentage: 30 },
  { tag: "해변 도시", count: 32, percentage: 25 },
  { tag: "카페 문화", count: 25, percentage: 20 },
  { tag: "맛집 천국", count: 20, percentage: 15 },
  { tag: "교통 편리", count: 18, percentage: 14 },
  { tag: "산악 지대", count: 15, percentage: 12 },
  { tag: "문화 예술", count: 12, percentage: 10 },
  { tag: "안전한치안", count: 10, percentage: 8 },
  { tag: "빠른인터넷", count: 8, percentage: 6 },
]

// 여행기간 분포 데이터
const TRAVEL_PERIOD_DISTRIBUTION = [
  { period: "짧은여행 (6박 미만)", count: 25, percentage: 28 },
  { period: "일주일살기 (6박~13박)", count: 30, percentage: 34 },
  { period: "2-3주 살기 (14박~21박)", count: 20, percentage: 23 },
  { period: "한달살기 (22박~30박)", count: 10, percentage: 11 },
  { period: "1개월 이상 (31박 이상)", count: 3, percentage: 4 },
]

// 동행정보 분포 데이터
const COMPANION_DISTRIBUTION = [
  { type: "혼자", count: 35, percentage: 32 },
  { type: "친구", count: 25, percentage: 23 },
  { type: "연인", count: 20, percentage: 18 },
  { type: "가족", count: 12, percentage: 11 },
  { type: "동료", count: 8, percentage: 7 },
  { type: "가족(아이랑)", count: 6, percentage: 5 },
  { type: "가족(부모님이랑)", count: 4, percentage: 4 },
]

// 여행 스타일 분포 데이터 - 더 많은 데이터 추가
const TRAVEL_STYLE_DISTRIBUTION = [
  { style: "#나혼자힐링", count: 42, percentage: 38 },
  { style: "#디지털노마드&워케이션", count: 50, percentage: 45 },
  { style: "#가성비여행", count: 15, percentage: 14 },
  { style: "#아이와함께", count: 8, percentage: 7 },
  { style: "#특별한 경험", count: 5, percentage: 4 },
  { style: "#커플여행", count: 12, percentage: 11 },
  { style: "#친구여행", count: 18, percentage: 16 },
  { style: "#가족여행", count: 14, percentage: 13 },
  { style: "#비즈니스", count: 6, percentage: 5 },
]

const COMMENT_DISTRIBUTION = [
  {
    comment: "제주도는 정말 힐링하기 좋은 곳이에요. 바다를 보며 산책하는 것만으로도 마음이 편안해집니다.",
    count: 28,
    percentage: 40,
  },
  {
    comment: "자연이 아름다운 도시라는 말이 딱 맞아요. 한라산과 바다가 어우러진 풍경이 정말 인상적이었습니다.",
    count: 21,
    percentage: 30,
  },
  {
    comment: "여유로운 분위기가 너무 좋았어요. 서울의 바쁜 일상에서 벗어나 진정한 휴식을 취할 수 있었습니다.",
    count: 14,
    percentage: 20,
  },
  { comment: "재방문 의사 100%입니다. 한 달로는 부족할 정도로 매력적인 곳이에요.", count: 10, percentage: 15 },
  { comment: "카페 문화가 정말 발달되어 있어요. 곳곳에 예쁜 카페들이 많아서 좋았습니다.", count: 8, percentage: 12 },
  { comment: "교통이 편리해서 이동하기 좋았어요. 렌터카 없이도 충분히 여행할 수 있었습니다.", count: 6, percentage: 9 },
]

export default function CityProfilePanel({ isOpen, onClose, onSubmit, cityName = "제주도" }: CityProfilePanelProps) {
  // 기존 상태
  const [selectedTravelStyles, setSelectedTravelStyles] = useState<string[]>([])
  const [selectedCityTags, setSelectedCityTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [comment, setComment] = useState("")
  const [selectedComment, setSelectedComment] = useState("")

  // 새로운 상태
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [companionType, setCompanionType] = useState("")
  const [companionCount, setCompanionCount] = useState(1)

  // 필터 상태
  const [showOnlyTags, setShowOnlyTags] = useState(false)
  const [showOnlyComments, setShowOnlyComments] = useState(false)
  const [showOnlyTravelPeriod, setShowOnlyTravelPeriod] = useState(false)
  const [showOnlyCompanion, setShowOnlyCompanion] = useState(false)
  const [showOnlyTravelStyle, setShowOnlyTravelStyle] = useState(false)

  // 더보기 상태
  const [showMoreTravelStyles, setShowMoreTravelStyles] = useState(false)
  const [showMoreTags, setShowMoreTags] = useState(false)
  const [showMoreComments, setShowMoreComments] = useState(false)

  const handleTravelStyleToggle = useCallback((style: string) => {
    setSelectedTravelStyles((prev) => {
      const newStyles = prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]

      // 여행 스타일 선택 시 관련 도시 태그 자동 추가
      if (!prev.includes(style) && TRAVEL_STYLE_TAG_MAPPING[style as keyof typeof TRAVEL_STYLE_TAG_MAPPING]) {
        const relatedTags = TRAVEL_STYLE_TAG_MAPPING[style as keyof typeof TRAVEL_STYLE_TAG_MAPPING]
        setSelectedCityTags((prevTags) => {
          const newTags = [...prevTags]
          relatedTags.forEach((tag) => {
            if (!newTags.includes(tag)) {
              newTags.push(tag)
            }
          })
          return newTags
        })
      }

      return newStyles
    })
  }, [])

  const handleCityTagToggle = useCallback((tag: string) => {
    setSelectedCityTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const handleAddCustomTag = useCallback(() => {
    if (customTag.trim() && !selectedCityTags.includes(customTag.trim())) {
      setSelectedCityTags((prev) => [...prev, customTag.trim()])
      setCustomTag("")
    }
  }, [customTag, selectedCityTags])

  const handleCommentSelect = useCallback(
    (commentText: string) => {
      if (selectedComment === commentText) {
        setSelectedComment("")
        setComment("")
      } else {
        setSelectedComment(commentText)
        setComment(commentText)
      }
    },
    [selectedComment],
  )

  const handleSubmit = useCallback(() => {
    onSubmit({
      travelPeriod: { startDate, endDate },
      companionInfo: { type: companionType, count: companionCount },
      travelStyles: selectedTravelStyles,
      cityTags: selectedCityTags,
      comment: comment.trim(),
    })
    // 상태 초기화
    setStartDate("")
    setEndDate("")
    setCompanionType("")
    setCompanionCount(1)
    setSelectedTravelStyles([])
    setSelectedCityTags([])
    setCustomTag("")
    setComment("")
    setSelectedComment("")
    onClose()
  }, [
    startDate,
    endDate,
    companionType,
    companionCount,
    selectedTravelStyles,
    selectedCityTags,
    comment,
    onSubmit,
    onClose,
  ])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // 필터 토글 함수들
  const handleToggleTags = useCallback(() => {
    setShowOnlyTags((prev) => !prev)
    if (showOnlyComments) setShowOnlyComments(false)
    if (showOnlyTravelPeriod) setShowOnlyTravelPeriod(false)
    if (showOnlyCompanion) setShowOnlyCompanion(false)
    if (showOnlyTravelStyle) setShowOnlyTravelStyle(false)
  }, [showOnlyComments, showOnlyTravelPeriod, showOnlyCompanion, showOnlyTravelStyle])

  const handleToggleComments = useCallback(() => {
    setShowOnlyComments((prev) => !prev)
    if (showOnlyTags) setShowOnlyTags(false)
    if (showOnlyTravelPeriod) setShowOnlyTravelPeriod(false)
    if (showOnlyCompanion) setShowOnlyCompanion(false)
    if (showOnlyTravelStyle) setShowOnlyTravelStyle(false)
  }, [showOnlyTags, showOnlyTravelPeriod, showOnlyCompanion, showOnlyTravelStyle])

  const handleToggleTravelPeriod = useCallback(() => {
    setShowOnlyTravelPeriod((prev) => !prev)
    if (showOnlyTags) setShowOnlyTags(false)
    if (showOnlyComments) setShowOnlyComments(false)
    if (showOnlyCompanion) setShowOnlyCompanion(false)
    if (showOnlyTravelStyle) setShowOnlyTravelStyle(false)
  }, [showOnlyTags, showOnlyComments, showOnlyCompanion, showOnlyTravelStyle])

  const handleToggleCompanion = useCallback(() => {
    setShowOnlyCompanion((prev) => !prev)
    if (showOnlyTags) setShowOnlyTags(false)
    if (showOnlyComments) setShowOnlyComments(false)
    if (showOnlyTravelPeriod) setShowOnlyTravelPeriod(false)
    if (showOnlyTravelStyle) setShowOnlyTravelStyle(false)
  }, [showOnlyTags, showOnlyComments, showOnlyTravelPeriod, showOnlyTravelStyle])

  const handleToggleTravelStyle = useCallback(() => {
    setShowOnlyTravelStyle((prev) => !prev)
    if (showOnlyTags) setShowOnlyTags(false)
    if (showOnlyComments) setShowOnlyComments(false)
    if (showOnlyTravelPeriod) setShowOnlyTravelPeriod(false)
    if (showOnlyCompanion) setShowOnlyCompanion(false)
  }, [showOnlyTags, showOnlyComments, showOnlyTravelPeriod, showOnlyCompanion])

  // 경험치 계산
  const calculateExp = () => {
    let exp = 0
    if (startDate && endDate) exp += 10 // 여행기간 입력 시 10점
    if (companionType) exp += 10 // 동행정보 입력 시 10점
    exp += selectedTravelStyles.length * 10 // 여행 스타일 선택당 10점
    exp += selectedCityTags.length * 10 // 도시 태그 선택당 10점
    if (comment.trim()) exp += 10 // 코멘트 입력 시 10점

    // 모든 항목 완료 시 보너스 50점
    if (
      startDate &&
      endDate &&
      companionType &&
      selectedTravelStyles.length > 0 &&
      selectedCityTags.length > 0 &&
      comment.trim()
    ) {
      exp += 50
    }

    return exp
  }

  // 총 기여자 수 계산
  const totalContributors =
    TAG_DISTRIBUTION.reduce((sum, item) => sum + item.count, 0) +
    COMMENT_DISTRIBUTION.reduce((sum, item) => sum + item.count, 0)

  // 버튼 활성화 조건
  const isSubmitEnabled =
    (startDate && endDate) ||
    companionType ||
    selectedTravelStyles.length > 0 ||
    selectedCityTags.length > 0 ||
    comment.trim()

  // 코멘트 기반 태그 제안 표시 여부
  const shouldShowSuggestedTags = comment.trim().length > 10

  // 현재 선택된 여행 스타일에 따른 추천 태그들
  const getRecommendedTags = () => {
    const recommendedTags: string[] = []
    selectedTravelStyles.forEach((style) => {
      const tags = TRAVEL_STYLE_TAG_MAPPING[style as keyof typeof TRAVEL_STYLE_TAG_MAPPING]
      if (tags) {
        recommendedTags.push(...tags)
      }
    })
    return [...new Set(recommendedTags)] // 중복 제거
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
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
            onClick={handleClose}
          />

          {/* 패널 */}
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
                <h2 className="text-2xl font-bold text-gray-900">{cityName}는 어땠나요?</h2>

                {/* 필터 버튼들 */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleToggleTravelPeriod}
                    variant={showOnlyTravelPeriod ? "default" : "outline"}
                    size="sm"
                    className={showOnlyTravelPeriod ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    여행기간만
                  </Button>
                  <Button
                    onClick={handleToggleCompanion}
                    variant={showOnlyCompanion ? "default" : "outline"}
                    size="sm"
                    className={showOnlyCompanion ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    동행정보만
                  </Button>
                  <Button
                    onClick={handleToggleTravelStyle}
                    variant={showOnlyTravelStyle ? "default" : "outline"}
                    size="sm"
                    className={showOnlyTravelStyle ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    여행스타일만
                  </Button>
                  <Button
                    onClick={handleToggleTags}
                    variant={showOnlyTags ? "default" : "outline"}
                    size="sm"
                    className={showOnlyTags ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    도시 태그만
                  </Button>
                  <Button
                    onClick={handleToggleComments}
                    variant={showOnlyComments ? "default" : "outline"}
                    size="sm"
                    className={showOnlyComments ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    한줄 코멘트만
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{Math.floor(totalContributors / 2)}명이 기여한 정보</span>
                <button
                  onClick={handleClose}
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
                  {/* 여행기간 분포 */}
                  {(!showOnlyTags && !showOnlyComments && !showOnlyCompanion && !showOnlyTravelStyle) ||
                  showOnlyTravelPeriod ? (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                        여행기간 분포
                      </h3>
                      <div className="space-y-4">
                        {TRAVEL_PERIOD_DISTRIBUTION.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700 font-medium">{item.period}</span>
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
                  ) : null}

                  {/* 동행정보 분포 */}
                  {(!showOnlyTags && !showOnlyComments && !showOnlyTravelPeriod && !showOnlyTravelStyle) ||
                  showOnlyCompanion ? (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                        동행정보 분포
                      </h3>
                      <div className="space-y-4">
                        {COMPANION_DISTRIBUTION.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700 font-medium">{item.type}</span>
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
                  ) : null}

                  {/* 여행 스타일 분포 */}
                  {(!showOnlyTags && !showOnlyComments && !showOnlyTravelPeriod && !showOnlyCompanion) ||
                  showOnlyTravelStyle ? (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <h3 className="text-lg font-bold text-gray-900">여행 스타일 분포</h3>
                        {!showOnlyTravelStyle && TRAVEL_STYLE_DISTRIBUTION.length > 6 && (
                          <button
                            onClick={() => setShowMoreTravelStyles(!showMoreTravelStyles)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            {showMoreTravelStyles ? "접기" : "더보기"}
                            <ChevronDown
                              className={`h-4 w-4 ml-1 transition-transform ${showMoreTravelStyles ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {(showOnlyTravelStyle
                          ? TRAVEL_STYLE_DISTRIBUTION
                          : showMoreTravelStyles
                            ? TRAVEL_STYLE_DISTRIBUTION
                            : TRAVEL_STYLE_DISTRIBUTION.slice(0, 6)
                        ).map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700 font-medium">{item.style}</span>
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
                  ) : null}

                  {/* 도시 태그 분포 */}
                  {(!showOnlyComments && !showOnlyTravelPeriod && !showOnlyCompanion && !showOnlyTravelStyle) ||
                  showOnlyTags ? (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <h3 className="text-lg font-bold text-gray-900">도시 태그 분포</h3>
                        {!showOnlyTags && TAG_DISTRIBUTION.length > 5 && (
                          <button
                            onClick={() => setShowMoreTags(!showMoreTags)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            {showMoreTags ? "접기" : "더보기"}
                            <ChevronDown
                              className={`h-4 w-4 ml-1 transition-transform ${showMoreTags ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {(showOnlyTags
                          ? TAG_DISTRIBUTION
                          : showMoreTags
                            ? TAG_DISTRIBUTION
                            : TAG_DISTRIBUTION.slice(0, 5)
                        ).map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700 font-medium">{item.tag}</span>
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
                  ) : null}

                  {/* 한줄 코멘트 분포 */}
                  {(!showOnlyTags && !showOnlyTravelPeriod && !showOnlyCompanion && !showOnlyTravelStyle) ||
                  showOnlyComments ? (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <h3 className="text-lg font-bold text-gray-900">한줄 코멘트 분포</h3>
                        {!showOnlyComments && COMMENT_DISTRIBUTION.length > 2 && (
                          <button
                            onClick={() => setShowMoreComments(!showMoreComments)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            {showMoreComments ? "접기" : "더보기"}
                            <ChevronDown
                              className={`h-4 w-4 ml-1 transition-transform ${showMoreComments ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      <div className="space-y-5">
                        {(showOnlyComments
                          ? COMMENT_DISTRIBUTION
                          : showMoreComments
                            ? COMMENT_DISTRIBUTION
                            : COMMENT_DISTRIBUTION.slice(0, 2)
                        ).map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 font-medium">{item.count}명</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.comment}</p>
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
                  ) : null}
                </div>
              </div>

              {/* 오른쪽 영역 - 사용자 입력 (70%) */}
              <div className="w-[70%] bg-white overflow-y-auto">
                <div className="px-16 py-6 space-y-12 pb-24">
                  {/* 1. 여행기간 */}
                  {(!showOnlyTags && !showOnlyComments && !showOnlyCompanion && !showOnlyTravelStyle) ||
                  showOnlyTravelPeriod ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">여행기간</h3>
                      <p className="text-sm text-gray-600 mb-4">시작일과 종료일을 선택해주세요</p>
                      <div className="grid grid-cols-2 gap-4">
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
                            min={startDate}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      {startDate && endDate && (
                        <div className="mt-3 text-sm text-blue-600">
                          총{" "}
                          {Math.ceil(
                            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                          )}
                          박{" "}
                          {Math.ceil(
                            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                          ) + 1}
                          일
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* 2. 동행정보 */}
                  {(!showOnlyTags && !showOnlyComments && !showOnlyTravelPeriod && !showOnlyTravelStyle) ||
                  showOnlyCompanion ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">동행정보</h3>
                      <p className="text-sm text-gray-600 mb-4">함께한 동행자를 선택해주세요</p>

                      {/* 동행 타입 선택 */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {COMPANION_TYPES.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setCompanionType(type.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              companionType === type.value
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>

                      {/* 인원수 입력 */}
                      {companionType && companionType !== "alone" && (
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700">총 인원수:</label>
                          <input
                            type="number"
                            min="2"
                            max="10"
                            value={companionCount}
                            onChange={(e) => setCompanionCount(Number.parseInt(e.target.value) || 2)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <span className="text-sm text-gray-600">명</span>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* 3. 여행 스타일 */}
                  {(!showOnlyTags && !showOnlyComments && !showOnlyTravelPeriod && !showOnlyCompanion) ||
                  showOnlyTravelStyle ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">여행 스타일</h3>
                      <div className="flex flex-wrap gap-3">
                        {DEFAULT_TRAVEL_STYLES.map((style) => (
                          <button
                            key={style}
                            onClick={() => handleTravelStyleToggle(style)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedTravelStyles.includes(style)
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* 4. 도시 대표 태그 */}
                  {(!showOnlyComments && !showOnlyTravelPeriod && !showOnlyCompanion && !showOnlyTravelStyle) ||
                  showOnlyTags ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">도시 대표 태그</h3>

                      {/* 여행 스타일 기반 추천 태그 */}
                      {selectedTravelStyles.length > 0 && (
                        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800 font-medium mb-3">
                            ✨ 선택한 여행 스타일에 맞는 추천 태그:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {getRecommendedTags().map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleCityTagToggle(tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  selectedCityTags.includes(tag)
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-green-700 border border-green-300 hover:bg-green-100"
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 기존 태그들 */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {EXISTING_CITY_TAGS.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleCityTagToggle(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedCityTags.includes(tag)
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      {/* 선택된 태그들 표시 */}
                      {selectedCityTags.length > 0 && (
                        <div className="mb-6 flex items-center gap-3 flex-wrap">
                          <p className="text-sm text-gray-600">선택된 태그:</p>
                          {selectedCityTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-300 text-sm rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 커스텀 태그 입력 */}
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          placeholder="새로운 태그 입력"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyPress={(e) => e.key === "Enter" && handleAddCustomTag()}
                        />
                        <button
                          onClick={handleAddCustomTag}
                          disabled={!customTag.trim()}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* 5. 한줄 코멘트 */}
                  {(!showOnlyTags && !showOnlyTravelPeriod && !showOnlyCompanion && !showOnlyTravelStyle) ||
                  showOnlyComments ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">한줄 코멘트</h3>

                      {/* 기존 코멘트 선택 */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-3">인기 코멘트에서 선택하거나 직접 입력하세요:</p>
                        <div className="space-y-2">
                          {COMMENT_DISTRIBUTION.slice(0, 2).map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleCommentSelect(item.comment)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                selectedComment === item.comment
                                  ? "bg-black text-white"
                                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <span className="text-sm">{item.comment}</span>
                              <span className="text-xs opacity-70 ml-2">({item.count}명)</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 직접 입력 */}
                      <div>
                        <p className="text-sm text-gray-600 mb-3">또는 직접 입력:</p>
                        <textarea
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value)
                            setSelectedComment("")
                          }}
                          placeholder="이 도시에 대한 당신만의 한줄 코멘트를 남겨주세요"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                        />
                        <p className="text-xs text-gray-500 mt-2">{comment.length}/200자</p>
                      </div>

                      {/* 코멘트 기반 태그 제안 */}
                      {shouldShowSuggestedTags && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800 font-medium mb-3">
                            💡 코멘트를 바탕으로 추천하는 도시 태그:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {COMMENT_BASED_TAGS.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleCityTagToggle(tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  selectedCityTags.includes(tag)
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* 개척하기 버튼 */}
                  <div className="pt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={!isSubmitEnabled}
                      className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                    >
                      개척하기 (+{calculateExp()} EXP)
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
