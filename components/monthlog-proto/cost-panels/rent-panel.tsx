"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus } from "lucide-react"
import { ExpGainAnimation } from "@/components/monthlog-proto/domain/city-detail/exp-gain-animation"

interface RentPanelProps {
  isOpen: boolean
  onClose: () => void
}

type FilterType = "all" | "search" | "monthly" | "people" | "accommodation" | "room" | "features" | "recommendations"

export default function RentPanel({ isOpen, onClose }: RentPanelProps) {
  const [month, setMonth] = useState("")
  const [peopleCount, setPeopleCount] = useState(1)
  const [canSearch, setCanSearch] = useState("")
  const [accommodationType, setAccommodationType] = useState("")
  const [customAccommodationType, setCustomAccommodationType] = useState("")
  const [roomType, setRoomType] = useState("")
  const [customRoomType, setCustomRoomType] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [customFeature, setCustomFeature] = useState("")
  const [rentPrice, setRentPrice] = useState("")
  const [recommendedPlace, setRecommendedPlace] = useState({
    name: "",
    comment: "",
    link: "",
  })
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([])
  const [currentExp, setCurrentExp] = useState(0)
  const [showExpGain, setShowExpGain] = useState(false)
  const [filter, setFilter] = useState<FilterType>("all")

  const accommodationTypes = ["아파트", "단독주택", "호텔", "게스트하우스", "에어비앤비"]
  const roomTypes = ["원룸", "투룸", "쓰리룸", "스튜디오"]
  const featureTags = ["#수영장", "#주방있음", "#세탁기", "#주차가능", "#바다뷰", "#산뷰", "#도심위치"]

  const rentData = {
    searchDifficulty: [
      { level: "발품 쉬움", percentage: 85, count: 42 },
      { level: "발품하기 괜찮음", percentage: 68, count: 35 },
      { level: "발품 가능", percentage: 45, count: 28 },
      { level: "발품할 수 있지만 어려움", percentage: 25, count: 15 },
      { level: "발품 완전 어려움", percentage: 12, count: 8 },
    ],
    byMonth: [
      { month: "1월", avgPrice: 120 },
      { month: "2월", avgPrice: 125 },
      { month: "3월", avgPrice: 140 },
      { month: "4월", avgPrice: 160 },
      { month: "5월", avgPrice: 150 },
      { month: "6월", avgPrice: 145 },
      { month: "7월", avgPrice: 180 },
      { month: "8월", avgPrice: 190 },
      { month: "9월", avgPrice: 155 },
      { month: "10월", avgPrice: 145 },
      { month: "11월", avgPrice: 130 },
      { month: "12월", avgPrice: 125 },
    ],
    byPeople: [
      { people: "1명", avgPrice: 120, count: 45 },
      { people: "2명", avgPrice: 140, count: 35 },
      { people: "3명", avgPrice: 160, count: 15 },
      { people: "4명+", avgPrice: 180, count: 10 },
    ],
    byAccommodation: [
      { type: "아파트", avgPrice: 150, count: 25 },
      { type: "단독주택", avgPrice: 120, count: 18 },
      { type: "호텔", avgPrice: 200, count: 12 },
      { type: "게스트하우스", avgPrice: 80, count: 30 },
      { type: "에어비앤비", avgPrice: 130, count: 20 },
    ],
    byRoomType: [
      { type: "원룸", avgPrice: 100, count: 35 },
      { type: "투룸", avgPrice: 150, count: 25 },
      { type: "쓰리룸", avgPrice: 200, count: 15 },
      { type: "스튜디오", avgPrice: 120, count: 20 },
    ],
    popularFeatures: [
      { feature: "#주방있음", count: 78 },
      { feature: "#세탁기", count: 65 },
      { feature: "#주차가능", count: 52 },
      { feature: "#바다뷰", count: 38 },
      { feature: "#도심위치", count: 35 },
    ],
    recommendations: [
      {
        name: "제주 오션뷰 아파트",
        comment: "바다가 보이는 깨끗한 숙소",
        link: "https://airbnb.com/rooms/123",
        votes: 24,
      },
      {
        name: "한라산 근처 게스트하우스",
        comment: "등산하기 좋은 위치",
        link: "https://booking.com/hotel/456",
        votes: 18,
      },
      {
        name: "제주시 중심가 원룸",
        comment: "교통이 편리하고 시설 좋음",
        link: "https://zigbang.com/room/789",
        votes: 32,
      },
    ],
  }

  const addExp = (amount: number) => {
    setCurrentExp((prev) => prev + amount)
  }

  const subtractExp = (amount: number) => {
    setCurrentExp((prev) => Math.max(0, prev - amount))
  }

  const handleInputChange = (field: string, value: any) => {
    switch (field) {
      case "month":
        if (month && !value) subtractExp(2)
        else if (!month && value) addExp(2)
        setMonth(value)
        break
      case "peopleCount":
        if (peopleCount > 0 && value <= 0) subtractExp(2)
        else if (peopleCount <= 0 && value > 0) addExp(2)
        setPeopleCount(value)
        break
      case "canSearch":
        if (canSearch && !value) subtractExp(2)
        else if (!canSearch && value) addExp(2)
        setCanSearch(value)
        break
      case "accommodationType":
        if (accommodationType && !value) subtractExp(3)
        else if (!accommodationType && value) addExp(3)
        setAccommodationType(value)
        break
      case "customAccommodationType":
        setCustomAccommodationType(value)
        break
      case "roomType":
        if (roomType && !value) subtractExp(3)
        else if (!roomType && value) addExp(3)
        setRoomType(value)
        break
      case "customRoomType":
        setCustomRoomType(value)
        break
      case "rentPrice":
        if (rentPrice && !value) subtractExp(5)
        else if (!rentPrice && value) addExp(5)
        setRentPrice(value)
        break
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setFeatures((prev) => {
      const newFeatures = prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
      if (prev.includes(feature)) {
        subtractExp(2)
      } else {
        addExp(2)
      }
      return newFeatures
    })
  }

  const handleCustomFeatureAdd = () => {
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures((prev) => [...prev, customFeature.trim()])
      addExp(5)
      setCustomFeature("")
    }
  }

  const handleAddCustomAccommodationType = () => {
    if (customAccommodationType.trim()) {
      if (accommodationType) subtractExp(3)
      setAccommodationType(customAccommodationType.trim())
      addExp(5)
      setCustomAccommodationType("")
    }
  }

  const handleAddCustomRoomType = () => {
    if (customRoomType.trim()) {
      if (roomType) subtractExp(3)
      setRoomType(customRoomType.trim())
      addExp(5)
      setCustomRoomType("")
    }
  }

  const handleRecommendationChange = (field: string, value: string) => {
    const prevValue = recommendedPlace[field as keyof typeof recommendedPlace]
    setRecommendedPlace((prev) => ({ ...prev, [field]: value }))

    if (prevValue && !value.trim()) {
      subtractExp(3)
    } else if (!prevValue && value.trim()) {
      addExp(3)
    }
  }

  const handleRecommendationSelect = (recommendation: string) => {
    setSelectedRecommendations((prev) => {
      if (prev.includes(recommendation)) {
        subtractExp(5)
        return prev.filter((r) => r !== recommendation)
      } else {
        addExp(5)
        return [...prev, recommendation]
      }
    })
  }

  const handleSubmit = () => {
    const finalExp = currentExp + 15
    onClose()
    setTimeout(() => {
      setShowExpGain(true)
    }, 300)
  }

  const filterOptions = [
    { key: "all", label: "전체" },
    { key: "search", label: "발품가능여부" },
    { key: "monthly", label: "월별 평균 월세" },
    { key: "people", label: "인원수별 평균 월세" },
    { key: "accommodation", label: "숙소 타입별 평균 월세" },
    { key: "room", label: "방 개수별 평균 월세" },
    { key: "features", label: "숙소 인기특징" },
    { key: "recommendations", label: "추천 숙소" },
  ]

  const shouldShowSection = (section: FilterType) => {
    return filter === "all" || filter === section
  }

  const isButtonEnabled = () => {
    return !!(
      month ||
      rentPrice ||
      accommodationType ||
      roomType ||
      features.length > 0 ||
      selectedRecommendations.length > 0 ||
      recommendedPlace.name ||
      recommendedPlace.comment ||
      recommendedPlace.link
    )
  }

  if (!isOpen) return null

  return (
    <>
      {showExpGain && <ExpGainAnimation exp={currentExp + 15} onComplete={() => setShowExpGain(false)} />}
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
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-bold text-gray-900">숙소 월세 130만원</h2>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filterOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">105명이 기여한 정보</span>
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
                {shouldShowSection("search") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">발품가능여부</h3>
                    <div className="space-y-4">
                      {rentData.searchDifficulty.map((item) => (
                        <div key={item.level} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.level}</span>
                            <span className="text-gray-500">
                              {item.percentage}% ({item.count}명)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shouldShowSection("monthly") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      월별 평균 월세
                    </h3>
                    <div className="space-y-4">
                      {rentData.byMonth.map((item) => (
                        <div key={item.month} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.month}</span>
                            <span className="text-gray-500">{item.avgPrice}만원</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.avgPrice / 200) * 100}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shouldShowSection("people") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      인원수별 평균 월세
                    </h3>
                    <div className="space-y-4">
                      {rentData.byPeople.map((item) => (
                        <div key={item.people} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.people}</span>
                            <span className="text-gray-500">{item.avgPrice}만원</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.avgPrice / 200) * 100}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shouldShowSection("accommodation") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      숙소 타입별 평균 월세
                    </h3>
                    <div className="space-y-4">
                      {rentData.byAccommodation.map((item) => (
                        <div key={item.type} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.type}</span>
                            <span className="text-gray-500">{item.avgPrice}만원</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.avgPrice / 200) * 100}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shouldShowSection("room") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      방 개수별 평균 월세
                    </h3>
                    <div className="space-y-4">
                      {rentData.byRoomType.map((item) => (
                        <div key={item.type} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.type}</span>
                            <span className="text-gray-500">{item.avgPrice}만원</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.avgPrice / 200) * 100}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shouldShowSection("features") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                      숙소 인기특징
                    </h3>
                    <div className="space-y-4">
                      {rentData.popularFeatures.map((item) => (
                        <div key={item.feature} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.feature}</span>
                            <span className="text-gray-500">{item.count}명</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.count / 100) * 100}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shouldShowSection("recommendations") && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">추천 숙소</h3>
                    <div className="space-y-4">
                      {rentData.recommendations.map((item, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-600 mt-1">{item.comment}</div>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800 underline block truncate mt-1"
                              >
                                {item.link}
                              </a>
                            </div>
                            <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">{item.votes}명</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.votes / 50) * 100}%`, backgroundColor: "#0B24FB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-[70%] bg-white overflow-y-auto">
              <div className="px-16 py-6 space-y-12 pb-24">
                {(shouldShowSection("monthly") || shouldShowSection("people") || shouldShowSection("search")) && (
                  <div className="grid grid-cols-3 gap-6">
                    {shouldShowSection("monthly") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">체류 시기</label>
                        <select
                          value={month}
                          onChange={(e) => handleInputChange("month", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">선택하세요</option>
                          {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map(
                            (m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    )}

                    {shouldShowSection("people") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">머문 인원 수</label>
                        <input
                          type="number"
                          min="1"
                          value={peopleCount}
                          onChange={(e) => handleInputChange("peopleCount", Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    {shouldShowSection("search") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">발품가능여부</label>
                        <select
                          value={canSearch}
                          onChange={(e) => handleInputChange("canSearch", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">선택하세요</option>
                          <option value="가능">가능</option>
                          <option value="불가능">불가능</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {shouldShowSection("accommodation") && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">숙소 타입</h3>
                    <p className="text-sm text-gray-600 mb-4">머물렀던 숙소 타입을 선택하거나 직접 입력해주세요</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {accommodationTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleInputChange("accommodationType", type)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            accommodationType === type
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                      {accommodationType && !accommodationTypes.includes(accommodationType) && (
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white">
                          {accommodationType}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customAccommodationType}
                        onChange={(e) => handleInputChange("customAccommodationType", e.target.value)}
                        placeholder="직접 입력"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddCustomAccommodationType}
                        disabled={!customAccommodationType.trim()}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {shouldShowSection("room") && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">방 개수</h3>
                    <p className="text-sm text-gray-600 mb-4">머물렀던 숙소의 방 개수를 선택하거나 직접 입력해주세요</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {roomTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleInputChange("roomType", type)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            roomType === type ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                      {roomType && !roomTypes.includes(roomType) && (
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white">
                          {roomType}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customRoomType}
                        onChange={(e) => handleInputChange("customRoomType", e.target.value)}
                        placeholder="직접 입력"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddCustomRoomType}
                        disabled={!customRoomType.trim()}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {shouldShowSection("features") && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">숙소 특징</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      숙소의 특징을 선택하거나 직접 입력해주세요 (복수 선택 가능)
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {featureTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleFeatureToggle(tag)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            features.includes(tag)
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                      {features
                        .filter((f) => !featureTags.includes(f))
                        .map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleFeatureToggle(tag)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white"
                          >
                            {tag}
                          </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customFeature}
                        onChange={(e) => setCustomFeature(e.target.value)}
                        placeholder="직접 입력 (예: #와이파이)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleCustomFeatureAdd}
                        disabled={!customFeature.trim()}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {shouldShowSection("recommendations") && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">추천 숙소</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      다른 사람들에게 추천하고 싶은 숙소가 있다면 공유해주세요
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">숙소명</label>
                        <input
                          type="text"
                          value={recommendedPlace.name}
                          onChange={(e) => handleRecommendationChange("name", e.target.value)}
                          placeholder="예: 제주 오션뷰 아파트"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">한줄 코멘트</label>
                        <input
                          type="text"
                          value={recommendedPlace.comment}
                          onChange={(e) => handleRecommendationChange("comment", e.target.value)}
                          placeholder="예: 바다가 보이는 깨끗한 숙소"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">링크</label>
                        <input
                          type="url"
                          value={recommendedPlace.link}
                          onChange={(e) => handleRecommendationChange("link", e.target.value)}
                          placeholder="예: https://airbnb.com/rooms/123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">기존 추천 숙소에 공감</label>
                        <div className="space-y-2">
                          {rentData.recommendations.map((place, index) => (
                            <button
                              key={index}
                              onClick={() => handleRecommendationSelect(`${place.name}-${index}`)}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                                selectedRecommendations.includes(`${place.name}-${index}`)
                                  ? "bg-black text-white"
                                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <div className="text-left flex-1">
                                <span className="font-medium">
                                  [{place.name}] {place.comment}
                                </span>
                              </div>
                              <div className="text-sm opacity-70 ml-4 whitespace-nowrap">{place.votes}명이 공감</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">월세 가격</h3>
                  <p className="text-sm text-gray-600 mb-4">실제 지불한 월세 금액을 입력해주세요</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={rentPrice}
                      onChange={(e) => handleInputChange("rentPrice", e.target.value)}
                      placeholder="예: 150"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-600">만원</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!isButtonEnabled()}
                    className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                  >
                    개척하기 (+{currentExp + 15} EXP)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
