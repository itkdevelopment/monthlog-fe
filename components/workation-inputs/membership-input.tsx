"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"

interface PricePlan {
  tag: string
  price: string
}

interface MembershipInputProps {
  onScoreChange: (score: number | null) => void
  onTagsChange: (selectedTags: string[], newTags: string[]) => void
  onPricePlansChange: (pricePlans: PricePlan[]) => void
  selectedScore: number | null
  selectedTags: string[]
  newTags: string[]
  pricePlans: PricePlan[]
}

export default function MembershipInput({
  onScoreChange,
  onTagsChange,
  onPricePlansChange,
  selectedScore,
  selectedTags,
  newTags,
  pricePlans,
}: MembershipInputProps) {
  const [newTag, setNewTag] = useState("")
  const [selectedPriceTags, setSelectedPriceTags] = useState<string[]>([])
  const [priceValue, setPriceValue] = useState("")
  const [currentPriceTag, setCurrentPriceTag] = useState("")

  const existingTags = [
    { text: "주단위 이용권 구매 용이", votes: 48 },
    { text: "일일권 저렴", votes: 42 },
    { text: "월 멤버십 할인", votes: 38 },
    { text: "시간당 요금제", votes: 32 },
    { text: "학생 할인 있음", votes: 28 },
    { text: "멤버십 비쌈", votes: 15 },
  ]

  const priceTags = ["1시간", "1일권", "7일권", "10일권", "15일권", "한달플랜", "3개월 플랜", "6개월 플랜", "1년플랜"]

  const toggleTag = (tagText: string) => {
    const updatedSelectedTags = selectedTags.includes(tagText)
      ? selectedTags.filter((t) => t !== tagText)
      : [...selectedTags, tagText]
    onTagsChange(updatedSelectedTags, newTags)
  }

  const addNewTag = () => {
    if (newTag.trim() && !newTags.includes(newTag.trim())) {
      const updatedNewTags = [...newTags, newTag.trim()]
      onTagsChange(selectedTags, updatedNewTags)
      setNewTag("")
    }
  }

  const removeNewTag = (tagToRemove: string) => {
    const updatedNewTags = newTags.filter((tag) => tag !== tagToRemove)
    onTagsChange(selectedTags, updatedNewTags)
  }

  const togglePriceTag = (tag: string) => {
    if (selectedPriceTags.includes(tag)) {
      setSelectedPriceTags(selectedPriceTags.filter((t) => t !== tag))
    } else {
      setSelectedPriceTags([...selectedPriceTags, tag])
    }
    setCurrentPriceTag(tag)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR")
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setPriceValue(numericValue)
  }

  const addPricePlan = () => {
    if (currentPriceTag && priceValue) {
      const newPlan = { tag: currentPriceTag, price: priceValue }
      onPricePlansChange([...pricePlans, newPlan])
      setPriceValue("")
    }
  }

  const removePricePlan = (index: number) => {
    onPricePlansChange(pricePlans.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-12">
      {/* 단기 이용권 구매 편의성 섹션 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">단기 이용권 구매 편의성</h3>
        <p className="text-sm text-gray-600 mb-6">단기 이용권 구매의 편의성에 대해 1~10점으로 평가해주세요</p>

        {/* 단기 이용권 구매 편의성 점수 */}
        <div className="space-y-3">
          <div className="grid grid-cols-10 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => onScoreChange(score)}
                className={`aspect-square rounded-lg font-semibold text-lg transition-colors ${
                  selectedScore === score ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          {selectedScore && <p className="text-sm text-blue-600 font-medium">선택한 점수: {selectedScore}점</p>}
        </div>
      </div>

      {/* 이용권 가격대 섹션 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">이용권 가격대</h3>
        <p className="text-sm text-gray-600 mb-4">이용권 종류를 클릭하거나 직접 추가해주세요 (다중 선택 가능)</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {priceTags.map((tag) => (
            <button
              key={tag}
              onClick={() => togglePriceTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedPriceTags.includes(tag) ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 선택된 태그별 가격 입력 */}
        {selectedPriceTags.map((tag) => (
          <div key={tag} className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-3">{tag} - 가격 정보</h4>

            {/* 가격 입력 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tag}
                  readOnly
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                />
                <input
                  type="text"
                  value={currentPriceTag === tag && priceValue ? formatPrice(Number.parseInt(priceValue)) : ""}
                  onChange={(e) => {
                    setCurrentPriceTag(tag)
                    handlePriceChange(e.target.value)
                  }}
                  placeholder="가격"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <span className="text-gray-600 text-sm">원</span>
                <button
                  onClick={() => {
                    setCurrentPriceTag(tag)
                    addPricePlan()
                  }}
                  disabled={currentPriceTag !== tag || !priceValue}
                  className="w-8 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 추가된 가격 정보들 */}
            {pricePlans.filter((plan) => plan.tag === tag).length > 0 && (
              <div className="space-y-2 mb-8">
                <h4 className="font-medium text-gray-900">추가된 {tag} 가격</h4>
                {pricePlans
                  .filter((plan) => plan.tag === tag)
                  .map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">{plan.tag}</span>
                        <span className="text-sm text-gray-500">{formatPrice(Number.parseInt(plan.price))}원</span>
                      </div>
                      <button
                        onClick={() => removePricePlan(pricePlans.indexOf(plan))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 관련 태그 섹션 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">관련 태그</h3>
        <p className="text-sm text-gray-600 mb-6">해당하는 태그를 선택하거나 새로운 태그를 추가해주세요</p>

        {/* 기존 태그 선택 */}
        <div className="space-y-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {existingTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => toggleTag(tag.text)}
                className={`px-3 py-2 border rounded-lg transition-colors ${
                  selectedTags.includes(tag.text)
                    ? "bg-black text-white border-black"
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
          <div className="flex gap-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="새로운 태그 입력"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addNewTag()
                }
              }}
            />
            <button
              onClick={addNewTag}
              disabled={!newTag.trim()}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* 추가된 새 태그들 표시 */}
          {newTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {newTags.map((tag, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2"
                >
                  #{tag}
                  <button onClick={() => removeNewTag(tag)} className="text-green-500 hover:text-green-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {(selectedScore || selectedTags.length > 0 || newTags.length > 0 || pricePlans.length > 0) && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedScore && (
                <span>
                  선택한 점수: <strong>{selectedScore}점</strong>
                </span>
              )}
              {pricePlans.length > 0 && (
                <span>
                  {selectedScore && ", "}가격 정보: <strong>{pricePlans.length}개 추가됨</strong>
                </span>
              )}
              {selectedTags.length > 0 && (
                <span>
                  {(selectedScore || pricePlans.length > 0) && ", "}선택한 태그:{" "}
                  <strong>{selectedTags.join(", ")}</strong>
                </span>
              )}
              {newTags.length > 0 && (
                <span>
                  {(selectedScore || selectedTags.length > 0 || pricePlans.length > 0) && ", "}새 태그:{" "}
                  <strong>{newTags.join(", ")}</strong>
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
