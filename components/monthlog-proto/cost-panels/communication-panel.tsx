"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus } from "lucide-react"

interface CommunicationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommunicationPanel({ isOpen, onClose }: CommunicationPanelProps) {
  const [communicationMethod, setCommunicationMethod] = useState("")
  const [carrier, setCarrier] = useState("")
  const [customCarrier, setCustomCarrier] = useState("")
  const [showCarrierInput, setShowCarrierInput] = useState(false)
  const [simCost, setSimCost] = useState("")
  const [planName, setPlanName] = useState("")
  const [showPlanInput, setShowPlanInput] = useState(false)
  const [monthlyCost, setMonthlyCost] = useState("")

  // 월 통신비 구간별 데이터
  const monthlyCostData = [
    { range: "1만원 미만", count: 8, percentage: 8.9 },
    { range: "1-3만원", count: 25, percentage: 27.8 },
    { range: "3-5만원", count: 30, percentage: 33.3 },
    { range: "5-7만원", count: 15, percentage: 16.7 },
    { range: "7-10만원", count: 8, percentage: 8.9 },
    { range: "10만원 이상", count: 4, percentage: 4.4 },
  ]

  // 통신방법별 선호도 데이터
  const methodPreferenceData = [
    { method: "현지유심구매", count: 45, percentage: 50 },
    { method: "로밍", count: 18, percentage: 20 },
    { method: "이심", count: 14, percentage: 15.5 },
    { method: "공항유심구매", count: 9, percentage: 10 },
    { method: "한국에서유심구매", count: 3, percentage: 3.3 },
    { method: "국내통신사", count: 1, percentage: 1.1 },
  ]

  // 인기 통신사 데이터
  const popularCarrierData = [
    { carrier: "제주텔레콤", count: 35, percentage: 38.9 },
    { carrier: "SKT", count: 25, percentage: 27.8 },
    { carrier: "KT", count: 15, percentage: 16.7 },
    { carrier: "LG U+", count: 10, percentage: 11.1 },
    { carrier: "Airalo", count: 5, percentage: 5.6 },
  ]

  // 인기 통신플랜 데이터
  const popularPlanData = [
    { plan: "7일 9GB", cost: "10,000원", count: 15, percentage: 35 },
    { plan: "30일 무제한", cost: "50,000원", count: 12, percentage: 28 },
    { plan: "15일 5GB", cost: "25,000원", count: 8, percentage: 18.6 },
    { plan: "7일 3GB", cost: "8,000원", count: 5, percentage: 11.6 },
    { plan: "30일 20GB", cost: "35,000원", count: 3, percentage: 7 },
  ]

  const communicationMethods = ["현지유심구매", "공항유심구매", "한국에서유심구매", "로밍", "이심", "국내통신사"]

  const getCarriersByMethod = (method: string) => {
    switch (method) {
      case "현지유심구매":
        return ["제주텔레콤", "KT", "SKT", "LG U+"]
      case "공항유심구매":
        return ["KT", "SKT", "LG U+"]
      case "한국에서유심구매":
        return ["KT", "SKT", "LG U+", "알뜰폰"]
      case "로밍":
        return ["SKT", "KT", "LG U+"]
      case "이심":
        return ["Airalo", "Ubigi", "Holafly"]
      case "국내통신사":
        return ["SKT", "KT", "LG U+", "알뜰폰"]
      default:
        return []
    }
  }

  const getPlansByMethod = (method: string) => {
    switch (method) {
      case "현지유심구매":
        return ["7일 9GB", "15일 5GB", "30일 무제한"]
      case "공항유심구매":
        return ["7일 3GB", "15일 10GB", "30일 20GB"]
      case "한국에서유심구매":
        return ["7일 5GB", "15일 15GB", "30일 무제한"]
      case "로밍":
        return ["7일 무제한", "15일 무제한", "30일 무제한"]
      case "이심":
        return ["7일 9GB", "15일 5GB", "30일 20GB"]
      default:
        return []
    }
  }

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleSimCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value)
    setSimCost(formatted)
  }

  const handleMonthlyCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value)
    setMonthlyCost(formatted)
  }

  const shouldShowSimCost = communicationMethod && communicationMethod !== "국내통신사"

  const getSimCostTitle = () => {
    switch (communicationMethod) {
      case "현지유심구매":
      case "공항유심구매":
      case "한국에서유심구매":
        return "유심 구매비용"
      case "로밍":
        return "로밍 구매비용"
      case "이심":
        return "이심 구매비용"
      default:
        return "유심/eSIM 구매 비용"
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
          <h2 className="text-2xl font-bold text-gray-900">통신비 (월평균)</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">90명이 기여한 정보</span>
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
              {/* 월 통신비 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">월 통신비</h3>
                <div className="space-y-4">
                  {monthlyCostData.map((item) => (
                    <div key={item.range} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.range}</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 선호하는 통신방법 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  선호하는 통신방법
                </h3>
                <div className="space-y-4">
                  {methodPreferenceData.map((item) => (
                    <div key={item.method} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.method}</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 인기 통신사 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">인기 통신사</h3>
                <div className="space-y-4">
                  {popularCarrierData.map((item) => (
                    <div key={item.carrier} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.carrier}</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 인기 통신플랜 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">인기 통신플랜</h3>
                <div className="space-y-4">
                  {popularPlanData.map((item) => (
                    <div key={item.plan} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {item.plan}, {item.cost}
                        </span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">통신방법</h3>
                <p className="text-sm text-gray-600 mb-4">이용한 통신방법을 선택해주세요</p>
                <div className="flex flex-wrap gap-3">
                  {communicationMethods.map((method) => (
                    <button
                      key={method}
                      onClick={() => {
                        setCommunicationMethod(method)
                        setCarrier("")
                        setCustomCarrier("")
                        setShowCarrierInput(false)
                        setPlanName("")
                        setShowPlanInput(false)
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        communicationMethod === method
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {communicationMethod && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">통신사</h3>
                  <p className="text-sm text-gray-600 mb-4">이용한 통신사를 선택하거나 입력해주세요</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {getCarriersByMethod(communicationMethod).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCarrier(c)
                          setCustomCarrier("")
                          setShowCarrierInput(false)
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          carrier === c ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setShowCarrierInput(true)
                        setCarrier("")
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                        showCarrierInput ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      추가
                    </button>
                  </div>
                  {showCarrierInput && (
                    <input
                      type="text"
                      value={customCarrier}
                      onChange={(e) => setCustomCarrier(e.target.value)}
                      placeholder="통신사명을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              )}

              {shouldShowSimCost && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{getSimCostTitle()}</h3>
                  <p className="text-sm text-gray-600 mb-4">플랜명과 구매 비용을 선택하거나 입력해주세요</p>

                  {/* 플랜명 선택/입력 */}
                  <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 mb-2">플랜명</label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {getPlansByMethod(communicationMethod).map((plan) => (
                        <button
                          key={plan}
                          onClick={() => {
                            setPlanName(plan)
                            setShowPlanInput(false)
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            planName === plan ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {plan}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setShowPlanInput(true)
                          setPlanName("")
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                          showPlanInput ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        추가
                      </button>
                    </div>
                    {showPlanInput && (
                      <input
                        type="text"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        placeholder="예: 7일 9GB"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>

                  {/* 구매 비용 입력 */}
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">구매 비용</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={simCost}
                        onChange={handleSimCostChange}
                        placeholder="예: 10,000"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-600">원</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">월평균 통신비</h3>
                <p className="text-sm text-gray-600 mb-4">실제 지출한 월평균 통신비를 입력해주세요</p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={monthlyCost}
                    onChange={handleMonthlyCostChange}
                    placeholder="예: 50,000"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">원</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={
                    !communicationMethod ||
                    (!carrier && !customCarrier) ||
                    !monthlyCost ||
                    (shouldShowSimCost && (!planName || !simCost))
                  }
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
