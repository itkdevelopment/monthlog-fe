"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2 } from "lucide-react"

interface LocalPricePanelProps {
  isOpen: boolean
  onClose: () => void
}

interface PriceItem {
  category: string
  name: string
  price: string
}

export default function LocalPricePanel({ isOpen, onClose }: LocalPricePanelProps) {
  const [selectedItems, setSelectedItems] = useState<PriceItem[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [currentCategory, setCurrentCategory] = useState("")
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)

  const defaultCategories = ["커피", "맥주", "생수", "라면", "김밥", "치킨", "피자", "버스요금", "택시기본요금"]
  const allCategories = [...defaultCategories, ...customCategories]

  const priceData = [
    { item: "커피", avgPrice: 4500, count: 50 },
    { item: "맥주", avgPrice: 3000, count: 45 },
    { item: "생수", avgPrice: 1000, count: 40 },
    { item: "라면", avgPrice: 1500, count: 35 },
    { item: "김밥", avgPrice: 3000, count: 30 },
  ]

  // 세부 품목별 평균가 데이터
  const detailPriceData = [
    { category: "커피", name: "스타벅스 아메리카노", price: 4500, count: 25 },
    { category: "커피", name: "이디야 아메리카노", price: 2500, count: 20 },
    { category: "커피", name: "투썸플레이스 아메리카노", price: 3800, count: 15 },
    { category: "맥주", name: "하이트 500ml", price: 2500, count: 30 },
    { category: "맥주", name: "카스 500ml", price: 2800, count: 25 },
    { category: "생수", name: "삼다수 2L", price: 1200, count: 35 },
    { category: "생수", name: "에비앙 500ml", price: 1800, count: 20 },
  ]

  // 자주 찾는 품목별 인원수 데이터
  const categoryCountData = [
    { item: "커피", count: 120 },
    { item: "맥주", count: 95 },
    { item: "생수", count: 85 },
    { item: "라면", count: 75 },
    { item: "김밥", count: 65 },
    { item: "치킨", count: 55 },
    { item: "피자", count: 45 },
    { item: "버스요금", count: 40 },
    { item: "택시기본요금", count: 35 },
  ]

  const maxCount = Math.max(...categoryCountData.map((item) => item.count))

  // 다른 사람들이 입력한 세부 품목 태그
  const detailItemTags = {
    커피: [
      "스타벅스 아메리카노",
      "이디야 아메리카노",
      "투썸플레이스 아메리카노",
      "카페베네 아메리카노",
      "동네카페 아메리카노",
    ],
    맥주: ["하이트 500ml", "카스 500ml", "클라우드 500ml", "편의점 맥주", "치킨집 맥주"],
    생수: ["삼다수 2L", "에비앙 500ml", "백산수 2L", "편의점 생수", "자판기 생수"],
    라면: ["신라면", "진라면", "너구리", "편의점 라면", "분식점 라면"],
    김밥: ["참치김밥", "야채김밥", "불고기김밥", "김밥천국", "동네 김밥집"],
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR")
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setNewItemPrice(numericValue)
  }

  const addCustomCategory = () => {
    if (newCategoryName && !allCategories.includes(newCategoryName)) {
      setCustomCategories([...customCategories, newCategoryName])
      setNewCategoryName("")
      setShowAddCategory(false)
    }
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
    setCurrentCategory(category)
  }

  const selectDetailTag = (tag: string) => {
    setNewItemName(tag)
  }

  const addPriceItem = () => {
    if (currentCategory && newItemName && newItemPrice) {
      setSelectedItems([
        ...selectedItems,
        {
          category: currentCategory,
          name: newItemName,
          price: newItemPrice,
        },
      ])
      setNewItemName("")
      setNewItemPrice("")
    }
  }

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index))
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
          <h2 className="text-2xl font-bold text-gray-900">현지 물가 수준</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">200명이 기여한 정보</span>
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
              {/* 품목별 평균가 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">품목별 평균 가격</h3>
                <div className="space-y-4">
                  {priceData.map((item) => (
                    <div key={item.item} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.item}</span>
                        <span className="text-gray-500">{formatPrice(item.avgPrice)}원</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(item.avgPrice / 5000) * 100}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 세부 품목별 평균가 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  세부 품목별 평균가
                </h3>
                <div className="space-y-4">
                  {detailPriceData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          [{item.category}] {item.name}
                        </span>
                        <span className="text-gray-500">{formatPrice(item.price)}원</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(item.price / 5000) * 100}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 자주 찾는 품목별 인원수 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">자주 찾는 품목</h3>
                <div className="space-y-4">
                  {categoryCountData.map((item) => (
                    <div key={item.item} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.item}</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(item.count / maxCount) * 100}%`, backgroundColor: "#0B24FB" }}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">자주 찾는 품목</h3>
                <p className="text-sm text-gray-600 mb-4">아래 품목을 클릭하거나 직접 추가해주세요 (다중 선택 가능)</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  {allCategories.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleCategory(item)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedCategories.includes(item)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                  {!showAddCategory ? (
                    <button
                      onClick={() => setShowAddCategory(true)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 text-sm transition-colors"
                    >
                      + 품목 추가
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="새 품목명"
                        className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={addCustomCategory}
                        className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                      >
                        추가
                      </button>
                      <button
                        onClick={() => {
                          setShowAddCategory(false)
                          setNewCategoryName("")
                        }}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-400"
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {selectedCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category} - 현지 품목 구매비</h3>
                  <p className="text-sm text-gray-600 mb-6">{category} 관련 실제 구매한 품목과 가격을 입력해주세요</p>

                  {/* 다른 사람들의 세부 품목 태그 */}
                  {detailItemTags[category] && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">다른 사람들이 입력한 세부 품목</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailItemTags[category].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setCurrentCategory(category)
                              selectDetailTag(tag)
                            }}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 새 항목 추가 - initial-cost-panel과 동일한 디자인 */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={category}
                        readOnly
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                      />
                      <input
                        type="text"
                        value={currentCategory === category ? newItemName : ""}
                        onChange={(e) => {
                          setCurrentCategory(category)
                          setNewItemName(e.target.value)
                        }}
                        placeholder="세부 품목명"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        value={
                          currentCategory === category && newItemPrice ? formatPrice(Number.parseInt(newItemPrice)) : ""
                        }
                        onChange={(e) => {
                          setCurrentCategory(category)
                          handlePriceChange(e.target.value)
                        }}
                        placeholder="가격"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <span className="text-gray-600 text-sm">원</span>
                      <button
                        onClick={() => {
                          setCurrentCategory(category)
                          addPriceItem()
                        }}
                        disabled={currentCategory !== category || !newItemName || !newItemPrice}
                        className="w-8 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 추가된 항목들 */}
                  {selectedItems.filter((item) => item.category === category).length > 0 && (
                    <div className="space-y-2 mb-8">
                      <h4 className="font-medium text-gray-900">추가된 {category} 품목</h4>
                      {selectedItems
                        .filter((item) => item.category === category)
                        .map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700">{item.name}</span>
                              <span className="text-sm text-gray-500">
                                {formatPrice(Number.parseInt(item.price))}원
                              </span>
                            </div>
                            <button
                              onClick={() => removeItem(selectedItems.indexOf(item))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6">
                <button
                  disabled={selectedItems.length === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+{selectedItems.length * 5} EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
