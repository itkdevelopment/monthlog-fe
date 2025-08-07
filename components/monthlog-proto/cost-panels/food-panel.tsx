"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2 } from "lucide-react"

interface FoodPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface FoodCost {
  type: string
  cost: string
}

interface MenuItem {
  name: string
  price: string
}

export default function FoodPanel({ isOpen, onClose }: FoodPanelProps) {
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([])
  const [totalFoodCost, setTotalFoodCost] = useState("")
  const [menuItems, setMenuItems] = useState<{ [key: string]: MenuItem[] }>({
    요리: [],
    외식: [],
  })
  const [newMenuItems, setNewMenuItems] = useState<{ [key: string]: { name: string; price: string } }>({
    요리: { name: "", price: "" },
    외식: { name: "", price: "" },
  })
  const [expPoints, setExpPoints] = useState(10)

  const preferredFoodStyleData = [
    { style: "요리", count: 60, color: "#0B24FB" },
    { style: "외식", count: 40, color: "#00FF00" },
  ]

  const monthlyFoodData = [
    { range: "30만원 이하", count: 25 },
    { range: "30-50만원", count: 35 },
    { range: "50-80만원", count: 28 },
    { range: "80만원 이상", count: 12 },
  ]

  const diningPerMealData = [
    { range: "1만원 이하", count: 20 },
    { range: "1-2만원", count: 40 },
    { range: "2-3만원", count: 25 },
    { range: "3만원 이상", count: 15 },
  ]

  const cookingMonthlyData = [
    { range: "20만원 이하", count: 30 },
    { range: "20-35만원", count: 40 },
    { range: "35-50만원", count: 20 },
    { range: "50만원 이상", count: 10 },
  ]

  const foodTypes = ["요리", "외식"]

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleFoodTypeToggle = (type: string) => {
    const newSelectedTypes = selectedFoodTypes.includes(type)
      ? selectedFoodTypes.filter((t) => t !== type)
      : [...selectedFoodTypes, type]

    setSelectedFoodTypes(newSelectedTypes)
    calculateExpPoints(newSelectedTypes, totalFoodCost)
  }

  const handleTotalCostChange = (cost: string) => {
    const formattedCost = formatNumber(cost)
    setTotalFoodCost(formattedCost)
    calculateExpPoints(selectedFoodTypes, formattedCost)
  }

  const handleMenuNameChange = (type: string, name: string) => {
    setNewMenuItems((prev) => ({
      ...prev,
      [type]: { ...prev[type], name },
    }))
  }

  const handleMenuPriceChange = (type: string, price: string) => {
    const formattedPrice = formatNumber(price)
    setNewMenuItems((prev) => ({
      ...prev,
      [type]: { ...prev[type], price: formattedPrice },
    }))
  }

  const addMenuItem = (type: string) => {
    const newItem = newMenuItems[type]
    if (newItem.name && newItem.price) {
      setMenuItems((prev) => ({
        ...prev,
        [type]: [...prev[type], { name: newItem.name, price: newItem.price }],
      }))
      setNewMenuItems((prev) => ({
        ...prev,
        [type]: { name: "", price: "" },
      }))
      calculateExpPoints(selectedFoodTypes, totalFoodCost)
    }
  }

  const removeMenuItem = (type: string, index: number) => {
    setMenuItems((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
    calculateExpPoints(selectedFoodTypes, totalFoodCost)
  }

  const calculateExpPoints = (types: string[], totalCost: string) => {
    let points = 10
    points += types.length * 5 // 식사 스타일 선택당 5점
    if (totalCost.trim() !== "") points += 10 // 총액 입력시 10점
    // 메뉴 추가당 추가 점수
    Object.values(menuItems).forEach((items) => {
      points += items.length * 3
    })
    setExpPoints(points)
  }

  const isFormValid = selectedFoodTypes.length > 0 && totalFoodCost.trim() !== ""

  const handleSubmit = () => {
    if (isFormValid) {
      onClose()
    }
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
          <h2 className="text-2xl font-bold text-gray-900">식비 (월평균)</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">100명이 기여한 정보</span>
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
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">선호 식사 스타일</h3>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        {preferredFoodStyleData.map((item, index) => {
                          const total = preferredFoodStyleData.reduce((sum, d) => sum + d.count, 0)
                          const percentage = (item.count / total) * 100
                          const strokeDasharray = `${percentage} ${100 - percentage}`
                          const strokeDashoffset = preferredFoodStyleData
                            .slice(0, index)
                            .reduce((sum, d) => sum + (d.count / total) * 100, 0)

                          return (
                            <path
                              key={item.style}
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={item.color}
                              strokeWidth="3"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={-strokeDashoffset}
                              className="transition-all duration-300"
                            />
                          )
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">100명</div>
                          <div className="text-xs text-gray-500">응답</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {preferredFoodStyleData.map((item) => (
                      <div key={item.style} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-700 font-medium">{item.style}</span>
                        <span className="text-sm text-gray-500">{item.count}명</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">월 식비</h3>
                <div className="space-y-4">
                  {monthlyFoodData.map((item) => {
                    const maxCount = Math.max(...monthlyFoodData.map((d) => d.count))
                    return (
                      <div key={item.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{item.range}</span>
                          <span className="text-gray-500">{item.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(item.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">외식 1회당 식비</h3>
                <div className="space-y-4">
                  {diningPerMealData.map((item) => {
                    const maxCount = Math.max(...diningPerMealData.map((d) => d.count))
                    return (
                      <div key={item.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{item.range}</span>
                          <span className="text-gray-500">{item.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(item.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  요리 위주 월 식비
                </h3>
                <div className="space-y-4">
                  {cookingMonthlyData.map((item) => {
                    const maxCount = Math.max(...cookingMonthlyData.map((d) => d.count))
                    return (
                      <div key={item.range} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{item.range}</span>
                          <span className="text-gray-500">{item.count}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(item.count / maxCount) * 100}%`,
                              backgroundColor: "#0B24FB",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">식사 스타일</h3>
                <p className="text-sm text-gray-600 mb-4">주로 이용한 식사 스타일을 선택해주세요 (복수 선택 가능)</p>
                <div className="flex flex-wrap gap-3">
                  {foodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFoodTypeToggle(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedFoodTypes.includes(type)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {selectedFoodTypes.map((type) => (
                <div key={type}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {type === "요리" ? "요리 재료/가격" : "외식 메뉴/가격"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {type === "요리"
                      ? "자주 구매했던 재료와 가격을 추가해주세요 (선택사항)"
                      : "자주 먹었던 메뉴와 가격을 추가해주세요 (선택사항)"}
                  </p>

                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      value={newMenuItems[type].name}
                      onChange={(e) => handleMenuNameChange(type, e.target.value)}
                      placeholder={type === "요리" ? "재료명" : "메뉴명"}
                      className="w-60 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={newMenuItems[type].price}
                      onChange={(e) => handleMenuPriceChange(type, e.target.value)}
                      placeholder="가격"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="flex items-center text-gray-600">원</span>
                    <button
                      onClick={() => addMenuItem(type)}
                      disabled={!newMenuItems[type].name || !newMenuItems[type].price}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      추가
                    </button>
                  </div>

                  {menuItems[type].length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">추가된 {type === "요리" ? "재료" : "메뉴"}</h4>
                      {menuItems[type].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-600">{item.price}원</span>
                            <button
                              onClick={() => removeMenuItem(type, index)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">월 식비</h3>
                <p className="text-sm text-gray-600 mb-4">실제 지출한 월평균 식비를 입력해주세요</p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={totalFoodCost}
                    onChange={(e) => handleTotalCostChange(e.target.value)}
                    placeholder="예: 600,000"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">원</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{expPoints} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
