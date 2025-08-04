"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface LocalPriceInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

interface PriceItem {
  category: string
  name: string
  price: string
}

export default function LocalPriceInput({ onSubmit, onExpGain }: LocalPriceInputProps) {
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

  // 다른 사람들의 세부 품목 태그
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

  const handleSubmit = () => {
    const data = {
      selectedItems,
      selectedCategories,
    }
    onSubmit(data)
    onExpGain?.(selectedItems.length * 5)
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
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
                className="flex-[4] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <input
                type="text"
                value={currentCategory === category && newItemPrice ? formatPrice(Number.parseInt(newItemPrice)) : ""}
                onChange={(e) => {
                  setCurrentCategory(category)
                  handlePriceChange(e.target.value)
                }}
                placeholder="가격"
                className="flex-[6] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                      <span className="text-sm text-gray-500">{formatPrice(Number.parseInt(item.price))}원</span>
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
    </div>
  )
}
