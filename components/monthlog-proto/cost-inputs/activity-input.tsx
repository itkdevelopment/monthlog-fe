"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface ActivityInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

interface Activity {
  name: string
  price: string
  link: string
  companionTags: string[]
  categoryTags: string[]
}

export default function ActivityInput({ onSubmit, onExpGain }: ActivityInputProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [monthlyBudget, setMonthlyBudget] = useState("")
  const [newActivityName, setNewActivityName] = useState("")
  const [newActivityPrice, setNewActivityPrice] = useState("")
  const [newActivityLink, setNewActivityLink] = useState("")
  const [selectedCompanionTags, setSelectedCompanionTags] = useState<string[]>([])
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<string[]>([])
  const [customCompanionTag, setCustomCompanionTag] = useState("")
  const [customCategoryTag, setCustomCategoryTag] = useState("")
  const [currentExp, setCurrentExp] = useState(0)

  const companionOptions = ["혼자서", "아이랑", "연인과", "친구와", "가족과"]
  const categoryOptions = ["박물관/미술관", "서핑/하이킹", "쿠킹클래스", "카페투어", "공연관람", "무료체험"]

  const addExp = (amount: number) => {
    setCurrentExp((prev) => prev + amount)
  }

  const subtractExp = (amount: number) => {
    setCurrentExp((prev) => Math.max(0, prev - amount))
  }

  const formatPrice = (value: string) => {
    const number = value.replace(/[^\d]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setNewActivityPrice(numericValue)
  }

  const handleMonthlyBudgetChange = (value: string) => {
    const prevValue = monthlyBudget
    const numericValue = value.replace(/[^0-9]/g, "")
    setMonthlyBudget(numericValue)

    if (prevValue && !numericValue) {
      subtractExp(10)
    } else if (!prevValue && numericValue) {
      addExp(10)
    }
  }

  const toggleCompanionTag = (tag: string) => {
    setSelectedCompanionTags((prev) => {
      if (prev.includes(tag)) {
        subtractExp(2)
        return prev.filter((t) => t !== tag)
      } else {
        addExp(2)
        return [...prev, tag]
      }
    })
  }

  const toggleCategoryTag = (tag: string) => {
    setSelectedCategoryTags((prev) => {
      if (prev.includes(tag)) {
        subtractExp(2)
        return prev.filter((t) => t !== tag)
      } else {
        addExp(2)
        return [...prev, tag]
      }
    })
  }

  const addCustomCompanionTag = () => {
    if (customCompanionTag && !selectedCompanionTags.includes(customCompanionTag)) {
      setSelectedCompanionTags((prev) => [...prev, customCompanionTag])
      addExp(5)
      setCustomCompanionTag("")
    }
  }

  const addCustomCategoryTag = () => {
    if (customCategoryTag && !selectedCategoryTags.includes(customCategoryTag)) {
      setSelectedCategoryTags((prev) => [...prev, customCategoryTag])
      addExp(5)
      setCustomCategoryTag("")
    }
  }

  const addActivity = () => {
    if (newActivityName && newActivityPrice) {
      const newActivity: Activity = {
        name: newActivityName,
        price: newActivityPrice,
        link: newActivityLink,
        companionTags: [...selectedCompanionTags],
        categoryTags: [...selectedCategoryTags],
      }
      setActivities([...activities, newActivity])
      addExp(5)

      // 입력 필드 초기화
      setNewActivityName("")
      setNewActivityPrice("")
      setNewActivityLink("")
      setSelectedCompanionTags([])
      setSelectedCategoryTags([])
    }
  }

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index))
    subtractExp(5)
  }

  const calculateEXP = () => {
    let exp = currentExp
    if (activities.length > 0) exp += activities.length * 5
    if (monthlyBudget) exp += 10
    if (selectedCompanionTags.length > 0) exp += selectedCompanionTags.length * 2
    if (selectedCategoryTags.length > 0) exp += selectedCategoryTags.length * 2
    return exp + 15
  }

  const handleSubmit = () => {
    const data = {
      activities,
      monthlyBudget,
    }
    onSubmit(data)
    onExpGain?.(calculateEXP())
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
      {/* 액티비티 추가 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">여가/액티비티 추가</h3>
        <p className="text-sm text-gray-600 mb-6">체험한 여가/액티비티 정보를 입력해주세요</p>

        {/* 새 항목 추가 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <input
              type="text"
              value={newActivityName}
              onChange={(e) => setNewActivityName(e.target.value)}
              placeholder="활동명"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="text"
              value={newActivityPrice ? formatPrice(newActivityPrice) : ""}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="가격"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="url"
              value={newActivityLink}
              onChange={(e) => setNewActivityLink(e.target.value)}
              placeholder="링크 (선택)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* 동행인 태그 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">동행인</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {companionOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleCompanionTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCompanionTags.includes(tag)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedCompanionTags
                .filter((tag) => !companionOptions.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleCompanionTag(tag)}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-black text-white"
                  >
                    {tag}
                  </button>
                ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCompanionTag}
                onChange={(e) => setCustomCompanionTag(e.target.value)}
                placeholder="직접 입력"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={addCustomCompanionTag}
                disabled={!customCompanionTag.trim()}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 카테고리 태그 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {categoryOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleCategoryTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategoryTags.includes(tag)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedCategoryTags
                .filter((tag) => !categoryOptions.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleCategoryTag(tag)}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-black text-white"
                  >
                    {tag}
                  </button>
                ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCategoryTag}
                onChange={(e) => setCustomCategoryTag(e.target.value)}
                placeholder="직접 입력"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={addCustomCategoryTag}
                disabled={!customCategoryTag.trim()}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={addActivity}
            disabled={!newActivityName || !newActivityPrice}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm transition-colors rounded-md border ${
              newActivityName && newActivityPrice
                ? "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-500"
            }`}
          >
            <Plus className="w-3 h-3" />
            액티비티 추가
          </button>
        </div>

        {/* 추가된 액티비티 목록 */}
        {activities.length > 0 && (
          <div className="space-y-2">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">{activity.name}</span>
                  <span className="text-sm text-gray-500">{formatPrice(activity.price)}원</span>
                  <div className="flex flex-wrap gap-1">
                    {activity.companionTags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                    {activity.categoryTags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => removeActivity(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 월 비용 입력 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">여가/액티비티 월 비용</h3>
        <p className="text-sm text-gray-600 mb-4">한 달 동안 여가/액티비티에 사용할 예상 비용을 입력해주세요</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={monthlyBudget ? formatPrice(monthlyBudget) : ""}
            onChange={(e) => handleMonthlyBudgetChange(e.target.value)}
            placeholder="300,000"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-600">원</span>
        </div>
      </div>
    </div>
  )
}
