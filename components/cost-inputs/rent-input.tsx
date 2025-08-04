"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

interface RentInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

export default function RentInput({ onSubmit, onExpGain }: RentInputProps) {
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

  const accommodationTypes = ["아파트", "단독주택", "호텔", "게스트하우스", "에어비앤비"]
  const roomTypes = ["원룸", "투룸", "쓰리룸", "스튜디오"]
  const featureTags = ["#수영장", "#주방있음", "#세탁기", "#주차가능", "#바다뷰", "#산뷰", "#도심위치"]

  const rentData = {
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
    const data = {
      month,
      peopleCount,
      canSearch,
      accommodationType,
      roomType,
      features,
      rentPrice,
      recommendedPlace,
      selectedRecommendations,
    }
    onSubmit(data)
    onExpGain?.(currentExp + 15)
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

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">체류 시기</label>
          <select
            value={month}
            onChange={(e) => handleInputChange("month", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">선택하세요</option>
            {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

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
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">숙소 타입</h3>
        <p className="text-sm text-gray-600 mb-4">머물렀던 숙소 타입을 선택하거나 직접 입력해주세요</p>
        <div className="flex flex-wrap gap-3 mb-4">
          {accommodationTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleInputChange("accommodationType", type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                accommodationType === type ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
          {accommodationType && !accommodationTypes.includes(accommodationType) && (
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white">{accommodationType}</span>
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
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white">{roomType}</span>
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

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">숙소 특징</h3>
        <p className="text-sm text-gray-600 mb-4">숙소의 특징을 선택하거나 직접 입력해주세요 (복수 선택 가능)</p>
        <div className="flex flex-wrap gap-3 mb-4">
          {featureTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleFeatureToggle(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                features.includes(tag) ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">추천 숙소</h3>
        <p className="text-sm text-gray-600 mb-4">다른 사람들에게 추천하고 싶은 숙소가 있다면 공유해주세요</p>
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
    </div>
  )
}
