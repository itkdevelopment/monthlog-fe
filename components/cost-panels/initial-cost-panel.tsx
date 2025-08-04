"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2 } from "lucide-react"

interface InitialCostPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface EssentialItem {
  name: string
  price: string
}

export default function InitialCostPanel({ isOpen, onClose }: InitialCostPanelProps) {
  const [deposit, setDeposit] = useState("")
  const [brokerageFee, setBrokerageFee] = useState("")
  const [essentialItems, setEssentialItems] = useState<EssentialItem[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")

  const initialCostData = [
    { type: "보증금", avgCost: 50, count: 35 },
    { type: "중개수수료", avgCost: 15, count: 30 },
    { type: "필수 비품", avgCost: 25, count: 40 },
  ]

  const popularEssentialItems = [
    { name: "침구류", price: 130000, count: 28 },
    { name: "주방용품", price: 80000, count: 25 },
    { name: "청소용품", price: 30000, count: 22 },
    { name: "생활용품", price: 40000, count: 20 },
    { name: "전자제품", price: 150000, count: 18 },
    { name: "가구", price: 120000, count: 15 },
  ]

  const maxPrice = Math.max(...popularEssentialItems.map((item) => item.price))

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
          <h2 className="text-2xl font-bold text-gray-900">초기 정착 비용</h2>
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
            <div className="p-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">항목별 평균 비용</h3>
                <div className="space-y-4">
                  {initialCostData.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.type}</span>
                        <span className="text-gray-500">{item.avgCost}만원</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(item.avgCost / 50) * 100}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">필수 비품비</h3>
                <div className="space-y-4">
                  {popularEssentialItems.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {item.name} {formatPrice(item.price)}원
                        </span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(item.price / maxPrice) * 100}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
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
                              <span className="text-sm text-gray-500">
                                {formatPrice(Number.parseInt(item.price))}원
                              </span>
                            </div>
                            <button
                              onClick={() => removeEssentialItem(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={!deposit && !brokerageFee && essentialItems.length === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+10 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
