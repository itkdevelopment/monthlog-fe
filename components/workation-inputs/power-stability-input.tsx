"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"

interface PowerStabilityInputProps {
  onScoreChange: (score: number | null) => void
  onTagsChange: (selectedTags: string[], newTags: string[]) => void
  selectedScore: number | null
  selectedTags: string[]
  newTags: string[]
}

export default function PowerStabilityInput({
  onScoreChange,
  onTagsChange,
  selectedScore,
  selectedTags,
  newTags,
}: PowerStabilityInputProps) {
  const [newTag, setNewTag] = useState("")

  const existingTags = [
    { text: "정전 거의 없음", votes: 45 },
    { text: "전압 안정적", votes: 38 },
    { text: "콘센트 충분", votes: 32 },
    { text: "220V 안정", votes: 28 },
    { text: "정전 가끔 발생", votes: 15 },
    { text: "전압 불안정", votes: 8 },
  ]

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

  return (
    <div className="space-y-12">
      {/* 전력 안정성 만족도 섹션 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">전력 안정성 만족도</h3>
        <p className="text-sm text-gray-600 mb-6">전력 안정성에 대한 만족도를 1~10점으로 평가해주세요</p>

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

      {/* 태그 섹션 */}
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

        {(selectedScore || selectedTags.length > 0 || newTags.length > 0) && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedScore && (
                <span>
                  선택한 점수: <strong>{selectedScore}점</strong>
                </span>
              )}
              {selectedTags.length > 0 && (
                <span>
                  {selectedScore && ", "}선택한 태그: <strong>{selectedTags.join(", ")}</strong>
                </span>
              )}
              {newTags.length > 0 && (
                <span>
                  {(selectedScore || selectedTags.length > 0) && ", "}새 태그: <strong>{newTags.join(", ")}</strong>
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
