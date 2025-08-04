"use client"

import type React from "react"
import { useState } from "react"
import { Plus } from "lucide-react"

interface CommunicationInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

export default function CommunicationInput({ onSubmit, onExpGain }: CommunicationInputProps) {
  const [communicationMethod, setCommunicationMethod] = useState("")
  const [carrier, setCarrier] = useState("")
  const [customCarrier, setCustomCarrier] = useState("")
  const [showCarrierInput, setShowCarrierInput] = useState(false)
  const [simCost, setSimCost] = useState("")
  const [planName, setPlanName] = useState("")
  const [showPlanInput, setShowPlanInput] = useState(false)
  const [monthlyCost, setMonthlyCost] = useState("")

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

  const handleSubmit = () => {
    const data = {
      communicationMethod,
      carrier: carrier || customCarrier,
      simCost,
      planName,
      monthlyCost,
    }
    onSubmit(data)
    onExpGain?.(10)
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
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
                communicationMethod === method ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
    </div>
  )
}
