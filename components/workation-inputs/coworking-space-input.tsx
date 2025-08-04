"use client"

import { useState } from "react"
import { Plus, Trash2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

interface CoworkingSpaceInputProps {
  onScoreChange: (score: number | null) => void
  onSpacesChange: (spaces: CoworkingSpace[]) => void
  onRecommendationsChange: (recommendations: SelectedRecommendation[]) => void
  selectedScore: number | null
  coworkingSpaces: CoworkingSpace[]
  selectedRecommendations: SelectedRecommendation[]
}

export default function CoworkingSpaceInput({
  onScoreChange,
  onSpacesChange,
  onRecommendationsChange,
  selectedScore,
  coworkingSpaces,
  selectedRecommendations,
}: CoworkingSpaceInputProps) {
  const [newSpaceName, setNewSpaceName] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [newSpacePrice, setNewSpacePrice] = useState("")
  const [newSpaceComment, setNewSpaceComment] = useState("")
  const [newSpaceIs24Hour, setNewSpaceIs24Hour] = useState(false)
  const [newSpaceLink, setNewSpaceLink] = useState("")

  // 세부 플랜 옵션
  const planOptions = ["1시간", "1일권", "7일권", "10일권", "15일권", "한달플랜", "3개월 플랜", "6개월 플랜", "1년플랜"]

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
    },
  ]

  const formatPrice = (value: string) => {
    const number = value.replace(/[^\d]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setNewSpacePrice(numericValue)
  }

  const addCoworkingSpace = () => {
    if (newSpaceName && selectedPlan && newSpacePrice && newSpaceComment && newSpaceLink) {
      const newSpace: CoworkingSpace = {
        name: newSpaceName,
        plan: selectedPlan,
        price: newSpacePrice,
        comment: newSpaceComment,
        is24Hour: newSpaceIs24Hour,
        link: newSpaceLink,
      }
      onSpacesChange([...coworkingSpaces, newSpace])

      // 입력 필드 초기화
      setNewSpaceName("")
      setSelectedPlan("")
      setNewSpacePrice("")
      setNewSpaceComment("")
      setNewSpaceIs24Hour(false)
      setNewSpaceLink("")
    }
  }

  const removeCoworkingSpace = (index: number) => {
    onSpacesChange(coworkingSpaces.filter((_, i) => i !== index))
  }

  const handleRecommendationSelect = (spaceId: string) => {
    const existingIndex = selectedRecommendations.findIndex((r) => r.spaceId === spaceId)
    if (existingIndex >= 0) {
      onRecommendationsChange(selectedRecommendations.filter((_, i) => i !== existingIndex))
    } else {
      onRecommendationsChange([...selectedRecommendations, { spaceId, comment: "" }])
    }
  }

  const updateRecommendationComment = (spaceId: string, comment: string) => {
    onRecommendationsChange(selectedRecommendations.map((r) => (r.spaceId === spaceId ? { ...r, comment } : r)))
  }

  return (
    <div className="space-y-12">
      {/* 코워킹스페이스 확보 용이성 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">코워킹스페이스 확보 용이성</h3>
        <p className="text-sm text-gray-600 mb-6">
          코워킹스페이스를 찾고 예약하는 것이 얼마나 쉬운지 1~10점으로 평가해주세요
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
        <p className="text-sm text-gray-600 mb-6">
          다른 사람들이 추천한 코워킹스페이스 중 마음에 드는 곳을 선택해주세요
        </p>
        <div className="space-y-2">
          {allSpaces.map((space, index) => {
            const isSelected = selectedRecommendations.some((r) => r.spaceId === space.id)
            const selectedRec = selectedRecommendations.find((r) => r.spaceId === space.id)
            return (
              <div key={index} className="space-y-2">
                <button
                  onClick={() => handleRecommendationSelect(space.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isSelected ? "bg-black text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        [{space.name}] {space.comment}
                      </span>
                      {space.is24Hour && (
                        <Badge className="bg-green-100 text-green-700 text-xs pointer-events-none">24시</Badge>
                      )}
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      {space.plan} • {space.price}
                    </div>
                  </div>
                  <div className="text-sm opacity-70 ml-4 whitespace-nowrap">{space.likes}명이 공감</div>
                </button>
                {isSelected && (
                  <div className="ml-4">
                    <input
                      type="text"
                      value={selectedRec?.comment || ""}
                      onChange={(e) => updateRecommendationComment(space.id, e.target.value)}
                      placeholder="이 장소에 대한 한줄 코멘트를 입력해주세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 코워킹스페이스 추가 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">코워킹스페이스 추가</h3>
        <p className="text-sm text-gray-600 mb-6">이용한 코워킹스페이스 정보를 입력해주세요</p>

        {/* 새 항목 추가 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <input
              type="text"
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              placeholder="장소명"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            >
              <option value="">플랜 선택</option>
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newSpacePrice ? formatPrice(newSpacePrice) : ""}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="가격"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={newSpaceIs24Hour}
                onChange={(e) => setNewSpaceIs24Hour(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">24시간 오픈</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input
              type="text"
              value={newSpaceComment}
              onChange={(e) => setNewSpaceComment(e.target.value)}
              placeholder="한줄코멘트"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="url"
              value={newSpaceLink}
              onChange={(e) => setNewSpaceLink(e.target.value)}
              placeholder="코워킹스페이스 링크"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <button
            onClick={addCoworkingSpace}
            disabled={!newSpaceName || !selectedPlan || !newSpacePrice || !newSpaceComment || !newSpaceLink}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm transition-colors rounded-md border ${
              newSpaceName && selectedPlan && newSpacePrice && newSpaceComment && newSpaceLink
                ? "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-500"
            }`}
          >
            <Plus className="w-3 h-3" />
            코워킹스페이스 추가
          </button>
        </div>

        {/* 추가된 코워킹스페이스 목록 */}
        {coworkingSpaces.length > 0 && (
          <div className="space-y-2">
            {coworkingSpaces.map((space, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">{space.name}</span>
                  <span className="text-sm text-gray-500">{space.plan}</span>
                  <span className="text-sm text-gray-500">{formatPrice(space.price)}원</span>
                  {space.is24Hour && <Badge className="bg-green-100 text-green-700 text-xs">24시</Badge>}
                  <span className="text-sm text-gray-500">{space.comment}</span>
                  <a
                    href={space.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                  >
                    링크 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button onClick={() => removeCoworkingSpace(index)} className="text-red-500 hover:text-red-700">
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
