"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Building2, ExternalLink } from "lucide-react"

interface EmbassyContactsPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Embassy {
  country: string
  name: string
  phone: string
  address: string
  website: string
}

export default function EmbassyContactsPanel({ isOpen, onClose }: EmbassyContactsPanelProps) {
  const [newEmbassy, setNewEmbassy] = useState<Embassy>({
    country: "",
    name: "",
    phone: "",
    address: "",
    website: "",
  })

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const participantCount = 5

  // 기존 대사관 연락처
  const embassyContacts = [
    {
      country: "한국",
      name: "주제주 한국영사관",
      phone: "064-722-8062",
      address: "제주시 연동 1435-1",
      website: "https://overseas.mofa.go.kr/kr-jeju-ko/index.do",
      votes: 180,
    },
    {
      country: "일본",
      name: "주제주 일본영사관",
      phone: "064-710-9500",
      address: "제주시 1100로 3198",
      website: "https://www.jeju.kr.emb-japan.go.jp/",
      votes: 95,
    },
    {
      country: "중국",
      name: "주제주 중국영사관",
      phone: "064-722-7985",
      address: "제주시 노형동 925-4",
      website: "http://jeju.china-consulate.org/",
      votes: 78,
    },
    {
      country: "미국",
      name: "주한미국대사관 부산영사관",
      phone: "051-663-0100",
      address: "부산광역시 해운대구 우동",
      website: "https://kr.usembassy.gov/embassy-consulates/busan/",
      votes: 45,
    },
    {
      country: "독일",
      name: "주한독일대사관",
      phone: "02-748-4114",
      address: "서울특별시 용산구 한남대로 308",
      website: "https://seoul.diplo.de/",
      votes: 32,
    },
  ]

  const addEmbassy = () => {
    if (newEmbassy.country && newEmbassy.name && newEmbassy.phone) {
      // 대사관 추가 로직
      setNewEmbassy({ country: "", name: "", phone: "", address: "", website: "" })
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
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">대사관 연락처</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{participantCount}개국 대사관</span>
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
              {/* 대사관 목록 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  등록된 대사관 {embassyContacts.length}개국
                </h3>
                <div className="space-y-4">
                  {embassyContacts.map((embassy, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="w-3 h-3 text-purple-600" />
                            <span className="text-gray-700 font-medium text-sm">{embassy.country}</span>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="font-medium">{embassy.name}</div>
                            <div className="font-bold text-purple-600">{embassy.phone}</div>
                            <div className="flex items-center gap-1">
                              <a
                                href={embassy.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                              >
                                웹사이트 <ExternalLink className="w-2 h-2" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">{embassy.votes}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(embassy.votes / Math.max(...embassyContacts.map((e) => e.votes))) * 100}%`,
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
            <div className="px-16 py-6 space-y-8 pb-24">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">새 대사관 연락처 추가하기</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">국가</label>
                    <input
                      type="text"
                      value={newEmbassy.country}
                      onChange={(e) => setNewEmbassy((prev) => ({ ...prev, country: e.target.value }))}
                      placeholder="예: 한국, 일본, 중국"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대사관명</label>
                    <input
                      type="text"
                      value={newEmbassy.name}
                      onChange={(e) => setNewEmbassy((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="예: 주제주 한국영사관"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                    <input
                      type="text"
                      value={newEmbassy.phone}
                      onChange={(e) => setNewEmbassy((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="예: 064-722-8062"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                    <input
                      type="text"
                      value={newEmbassy.address}
                      onChange={(e) => setNewEmbassy((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="예: 제주시 연동 1435-1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">웹사이트 (선택)</label>
                    <input
                      type="url"
                      value={newEmbassy.website}
                      onChange={(e) => setNewEmbassy((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">대사관 이용 안내</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 여권 분실 시 재발급 신청</li>
                    <li>• 응급상황 시 영사 보호</li>
                    <li>• 각종 증명서 발급</li>
                    <li>• 법적 문제 발생 시 지원</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={addEmbassy}
                  disabled={!newEmbassy.country || !newEmbassy.name || !newEmbassy.phone}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  대사관 추가하기 (+15 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
