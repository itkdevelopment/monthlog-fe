"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

interface FoodInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

interface MenuItem {
  name: string
  price: string
}

export default function FoodInput({ onSubmit, onExpGain }: FoodInputProps) {
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
      const data = {
        selectedFoodTypes,
        totalFoodCost,
        menuItems,
      }
      onSubmit(data)
      onExpGain?.(expPoints)
    }
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">식사 스타일</h3>
        <p className="text-sm text-gray-600 mb-4">주로 이용한 식사 스타일을 선택해주세요 (복수 선택 가능)</p>
        <div className="flex flex-wrap gap-3">
          {foodTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleFoodTypeToggle(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFoodTypes.includes(type) ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
    </div>
  )
}
