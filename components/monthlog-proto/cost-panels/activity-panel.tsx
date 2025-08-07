"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ActivityPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Activity {
  name: string
  price: string
  link: string
  companionTags: string[]
  categoryTags: string[]
}

export default function ActivityPanel({ isOpen, onClose }: ActivityPanelProps) {
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

  // 샘플 데이터
  const priceDistribution = [
    { range: "1만원 미만", count: 15 },
    { range: "1-3만원", count: 25 },
    { range: "3-5만원", count: 20 },
    { range: "5-10만원", count: 12 },
    { range: "10만원 이상", count: 8 },
  ]

  const companionDistribution = [
    { name: "혼자서", value: 35, color: "#0B24FB" },
    { name: "친구와", value: 25, color: "#3B82F6" },
    { name: "연인과", value: 20, color: "#60A5FA" },
    { name: "가족과", value: 15, color: "#93C5FD" },
    { name: "아이랑", value: 5, color: "#DBEAFE" },
  ]

  const categoryDistribution = [
    { name: "자연", value: 30, color: "#0B24FB" },
    { name: "문화", value: 25, color: "#3B82F6" },
    { name: "음식", value: 20, color: "#60A5FA" },
    { name: "스포츠", value: 15, color: "#93C5FD" },
    { name: "쇼핑", value: 10, color: "#DBEAFE" },
  ]

  const recommendedActivities = [
    {
      name: "한라산 등반",
      comment: "제주도 대표 명산",
      link: "https://hallasan.go.kr",
      votes: 45,
    },
    {
      name: "카페 투어",
      comment: "감성 카페 탐방",
      link: "https://jejucafe.com",
      votes: 32,
    },
    {
      name: "서핑 체험",
      comment: "파도와 함께하는 스릴",
      link: "https://jejusurf.com",
      votes: 28,
    },
    {
      name: "테마파크",
      comment: "가족과 함께 즐기기",
      link: "https://jejupark.com",
      votes: 25,
    },
  ]

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
          <h2 className="text-2xl font-bold text-gray-900">여가/액티비티</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">135명이 기여한 정보</span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* 정보 영역 */}
          <div className="w-[35%] bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* 월 가격 분포 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">여가/액티비티 월 가격</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Bar dataKey="count" fill="#0B24FB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 동행인별 분포 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">동행인별</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={companionDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {companionDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {companionDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>
                        {item.name} {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 카테고리별 분포 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">카테고리별</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categoryDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>
                        {item.name} {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 추천 액티비티 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  추천 여가/액티비티
                </h3>
                <div className="space-y-4">
                  {recommendedActivities.map((item, index) => (
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
            </div>
          </div>

          {/* 입력 영역 */}
          <div className="w-[65%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
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

              <div className="pt-6">
                <button
                  disabled={
                    activities.length === 0 &&
                    !monthlyBudget &&
                    selectedCompanionTags.length === 0 &&
                    selectedCategoryTags.length === 0
                  }
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{calculateEXP()} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
