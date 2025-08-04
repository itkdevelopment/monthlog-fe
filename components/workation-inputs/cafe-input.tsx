"use client"

import { useState } from "react"
import { Plus, Trash2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

interface CafeInputProps {
  onScoreChange: (score: number | null) => void
  onCafesChange: (cafes: Cafe[]) => void
  onRecommendationsChange: (recommendations: SelectedRecommendation[]) => void
  selectedScore: number | null
  cafes: Cafe[]
  selectedRecommendations: SelectedRecommendation[]
}

export default function CafeInput({
  onScoreChange,
  onCafesChange,
  onRecommendationsChange,
  selectedScore,
  cafes,
  selectedRecommendations,
}: CafeInputProps) {
  const [newCafeName, setNewCafeName] = useState("")
  const [newCafePlan, setNewCafePlan] = useState("")
  const [newCafePrice, setNewCafePrice] = useState("")
  const [newCafeComment, setNewCafeComment] = useState("")
  const [newCafeIs24Hour, setNewCafeIs24Hour] = useState(false)
  const [newCafeLink, setNewCafeLink] = useState("")

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
    },
  ]

  const formatPrice = (value: string) => {
    const number = value.replace(/[^\d]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setNewCafePrice(numericValue)
  }

  const addCafe = () => {
    if (newCafeName && newCafePlan && newCafePrice && newCafeComment && newCafeLink) {
      const newCafe: Cafe = {
        name: newCafeName,
        plan: newCafePlan,
        price: newCafePrice,
        comment: newCafeComment,
        is24Hour: newCafeIs24Hour,
        link: newCafeLink,
      }
      onCafesChange([...cafes, newCafe])

      // 입력 필드 초기화
      setNewCafeName("")
      setNewCafePlan("")
      setNewCafePrice("")
      setNewCafeComment("")
      setNewCafeIs24Hour(false)
      setNewCafeLink("")
    }
  }

  const removeCafe = (index: number) => {
    onCafesChange(cafes.filter((_, i) => i !== index))
  }

  const handleRecommendationSelect = (cafeId: string) => {
    const existingIndex = selectedRecommendations.findIndex((r) => r.cafeId === cafeId)
    if (existingIndex >= 0) {
      onRecommendationsChange(selectedRecommendations.filter((_, i) => i !== existingIndex))
    } else {
      onRecommendationsChange([...selectedRecommendations, { cafeId, comment: "" }])
    }
  }

  const updateRecommendationComment = (cafeId: string, comment: string) => {
    onRecommendationsChange(selectedRecommendations.map((r) => (r.cafeId === cafeId ? { ...r, comment } : r)))
  }

  return (
    <div className="space-y-12">
      {/* 카페 작업 환경 만족도 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">카페 작업 환경 만족도</h3>
        <p className="text-sm text-gray-600 mb-6">
          노트북 작업하기에 카페 환경이 얼마나 좋은지 1~10점으로 평가해주세요
        </p>
        <div className="grid grid-cols-10 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <button
              key={score}
              onClick={() => onScoreChange(score)}
              className={`aspect-square text-lg font-semibold rounded-lg transition-colors ${
                selectedScore === score ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {score}
            </button>
          ))}
        </div>
        {selectedScore && <p className="text-sm text-blue-600 font-medium mt-3">선택한 점수: {selectedScore}점</p>}
      </div>

      {/* 마음에 드는 장소 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">마음에 드는 장소</h3>
        <p className="text-sm text-gray-600 mb-6">다른 사람들이 추천한 노트북 카페 중 마음에 드는 곳을 선택해주세요</p>
        <div className="space-y-2">
          {allCafes.map((cafe, index) => {
            const isSelected = selectedRecommendations.some((r) => r.cafeId === cafe.id)
            const selectedRec = selectedRecommendations.find((r) => r.cafeId === cafe.id)
            return (
              <div key={index} className="space-y-2">
                <button
                  onClick={() => handleRecommendationSelect(cafe.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isSelected ? "bg-black text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        [{cafe.name}] {cafe.comment}
                      </span>
                      {cafe.is24Hour && (
                        <Badge className="bg-green-100 text-green-700 text-xs pointer-events-none">24시</Badge>
                      )}
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      {cafe.plan} • {cafe.price}
                    </div>
                  </div>
                  <div className="text-sm opacity-70 ml-4 whitespace-nowrap">{cafe.likes}명이 공감</div>
                </button>
                {isSelected && (
                  <div className="ml-4">
                    <input
                      type="text"
                      value={selectedRec?.comment || ""}
                      onChange={(e) => updateRecommendationComment(cafe.id, e.target.value)}
                      placeholder="이 카페에 대한 한줄 코멘트를 입력해주세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 카페 추가 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">카페 추가</h3>
        <p className="text-sm text-gray-600 mb-6">이용한 노트북 카페 정보를 입력해주세요</p>

        {/* 새 항목 추가 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <input
              type="text"
              value={newCafeName}
              onChange={(e) => setNewCafeName(e.target.value)}
              placeholder="카페명"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="text"
              value={newCafePlan}
              onChange={(e) => setNewCafePlan(e.target.value)}
              placeholder="주문 메뉴"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="text"
              value={newCafePrice ? formatPrice(newCafePrice) : ""}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="가격"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={newCafeIs24Hour}
                onChange={(e) => setNewCafeIs24Hour(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">24시간 오픈</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input
              type="text"
              value={newCafeComment}
              onChange={(e) => setNewCafeComment(e.target.value)}
              placeholder="한줄코멘트"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="url"
              value={newCafeLink}
              onChange={(e) => setNewCafeLink(e.target.value)}
              placeholder="카페 링크"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <button
            onClick={addCafe}
            disabled={!newCafeName || !newCafePlan || !newCafePrice || !newCafeComment || !newCafeLink}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm transition-colors rounded-md border ${
              newCafeName && newCafePlan && newCafePrice && newCafeComment && newCafeLink
                ? "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-500"
            }`}
          >
            <Plus className="w-3 h-3" />
            카페 추가
          </button>
        </div>

        {/* 추가된 카페 목록 */}
        {cafes.length > 0 && (
          <div className="space-y-2">
            {cafes.map((cafe, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">{cafe.name}</span>
                  <span className="text-sm text-gray-500">{cafe.plan}</span>
                  <span className="text-sm text-gray-500">{formatPrice(cafe.price)}원</span>
                  {cafe.is24Hour && <Badge className="bg-green-100 text-green-700 text-xs">24시</Badge>}
                  <span className="text-sm text-gray-500">{cafe.comment}</span>
                  <a
                    href={cafe.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                  >
                    링크 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button onClick={() => removeCafe(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
