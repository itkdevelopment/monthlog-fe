"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, Plus } from "lucide-react"

interface EmergencyContactsPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Contact {
  name: string
  number: string
  description: string
}

export default function EmergencyContactsPanel({ isOpen, onClose }: EmergencyContactsPanelProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTags, setNewTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const participantCount = 8

  // 기존 긴급 연락처를 태그 형태로 변환
  const existingContacts = [
    { text: "응급실 (119)", votes: 320 },
    { text: "경찰 (112)", votes: 315 },
    { text: "소방서 (119)", votes: 280 },
    { text: "해양경찰 (122)", votes: 145 },
    { text: "관광경찰 (1330)", votes: 98 },
    { text: "제주시청 (064-728-2114)", votes: 65 },
    { text: "서귀포시청 (064-760-2114)", votes: 52 },
    { text: "제주공항 (064-797-2114)", votes: 48 },
  ]

  const toggleTag = (tagText: string) => {
    const updatedSelectedTags = selectedTags.includes(tagText)
      ? selectedTags.filter((t) => t !== tagText)
      : [...selectedTags, tagText]
    setSelectedTags(updatedSelectedTags)
  }

  const addNewTag = () => {
    if (newTag.trim() && !newTags.includes(newTag.trim())) {
      const updatedNewTags = [...newTags, newTag.trim()]
      setNewTags(updatedNewTags)
      setNewTag("")
    }
  }

  const removeNewTag = (tagToRemove: string) => {
    const updatedNewTags = newTags.filter((tag) => tag !== tagToRemove)
    setNewTags(updatedNewTags)
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
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">긴급 연락처</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{participantCount}개 등록됨</span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          <div ref={leftPanelRef} className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* 긴급 연락처 목록 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  등록된 긴급 연락처 {existingContacts.length}개
                </h3>
                <div className="space-y-4">
                  {existingContacts.map((contact, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-3 h-3 text-blue-600" />
                            <span className="text-gray-700 font-medium text-sm">{contact.text}</span>
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">{contact.votes}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(contact.votes / Math.max(...existingContacts.map((c) => c.votes))) * 100}%`,
                            backgroundColor: "#0B24FB",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={rightPanelRef} className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
              {/* 번호 유효성 만족도 섹션 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">번호 유효성 만족도</h3>
                <p className="text-sm text-gray-600 mb-6">
                  현재 등록된 긴급 연락처들의 번호 유효성에 대한 만족도를 1~10점으로 평가해주세요
                </p>

                <div className="space-y-3">
                  <div className="grid grid-cols-10 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <button
                        key={score}
                        onClick={() => setSelectedScore(score)}
                        className={`aspect-square rounded-lg font-semibold text-lg transition-colors ${
                          selectedScore === score
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  {selectedScore && <p className="text-sm text-blue-600 font-medium">선택한 점수: {selectedScore}점</p>}
                </div>
              </div>

              {/* 유효한 연락처 태그 섹션 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">유효한 긴급 연락처</h3>
                <p className="text-sm text-gray-600 mb-6">
                  현재 기준으로 번호가 유효한 긴급 연락처를 선택하거나 새로운 연락처를 추가해주세요
                </p>

                {/* 기존 연락처 선택 */}
                <div className="space-y-3 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {existingContacts.map((contact, index) => (
                      <button
                        key={index}
                        onClick={() => toggleTag(contact.text)}
                        className={`px-3 py-2 border rounded-lg transition-colors ${
                          selectedTags.includes(contact.text)
                            ? "bg-black text-white border-black"
                            : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                        }`}
                      >
                        #{contact.text} ({contact.votes})
                      </button>
                    ))}
                  </div>
                </div>

                {/* 새 연락처 추가 */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="새로운 긴급 연락처 입력 (예: 병원명 (064-123-4567))"
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

                  {/* 추가된 새 연락처들 표시 */}
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
                          {selectedScore && ", "}선택한 연락처: <strong>{selectedTags.join(", ")}</strong>
                        </span>
                      )}
                      {newTags.length > 0 && (
                        <span>
                          {(selectedScore || selectedTags.length > 0) && ", "}새 연락처:{" "}
                          <strong>{newTags.join(", ")}</strong>
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
