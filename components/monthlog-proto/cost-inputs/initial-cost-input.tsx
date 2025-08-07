"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface InitialCostInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

interface EssentialItem {
  name: string
  price: string
}

export default function InitialCostInput({ onSubmit, onExpGain }: InitialCostInputProps) {
  const [deposit, setDeposit] = useState("")
  const [brokerageFee, setBrokerageFee] = useState("")
  const [essentialItems, setEssentialItems] = useState<EssentialItem[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR")
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setNewItemPrice(numericValue)
  }

  const addEssentialItem = () => {
    if (newItemName && newItemPrice) {
      setEssentialItems([...essentialItems, { name: newItemName, price: newItemPrice }])
      setNewItemName("")
      setNewItemPrice("")
    }
  }

  const removeEssentialItem = (index: number) => {
    setEssentialItems(essentialItems.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    const data = {
      deposit,
      brokerageFee,
      essentialItems,
    }
    onSubmit(data)
    onExpGain?.(10)
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">초기 정착 비용</h3>
        <p className="text-sm text-gray-600 mb-6">
          보증금, 중개수수료, 첫 달 필수 비품 구매 등 초기 정착에 필요한 1회성 비용을 입력해주세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">보증금</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="예: 50"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">만원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">중개수수료</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={brokerageFee}
                onChange={(e) => setBrokerageFee(e.target.value)}
                placeholder="예: 15"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">만원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">필수 비품 구매비</label>

            {/* 새 항목 추가 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="비품명"
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <input
                  type="text"
                  value={newItemPrice ? formatPrice(Number.parseInt(newItemPrice)) : ""}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="가격"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <span className="text-gray-600 text-sm">원</span>
                <button
                  onClick={addEssentialItem}
                  disabled={!newItemName || !newItemPrice}
                  className="w-8 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 추가된 항목들 */}
            {essentialItems.length > 0 && (
              <div className="space-y-2">
                {essentialItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm text-gray-500">{formatPrice(Number.parseInt(item.price))}원</span>
                    </div>
                    <button onClick={() => removeEssentialItem(index)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
