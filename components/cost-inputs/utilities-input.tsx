"use client"

import { useState } from "react"

interface UtilitiesInputProps {
  onSubmit: (data: any) => void
  onExpGain?: (amount: number) => void
}

export default function UtilitiesInput({ onSubmit, onExpGain }: UtilitiesInputProps) {
  const [electricity, setElectricity] = useState("")
  const [gas, setGas] = useState("")
  const [water, setWater] = useState("")
  const [other, setOther] = useState("")

  // 천단위 콤마 추가 함수
  const formatNumber = (value: string) => {
    const number = value.replace(/[^0-9]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // 숫자만 입력 허용하는 핸들러
  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setter(numericValue)
  }

  // EXP 계산
  const calculateExp = () => {
    let exp = 10 // 기본 EXP
    const inputs = [electricity, gas, water, other].filter((input) => input.trim() !== "")
    exp += inputs.length * 5 // 각 입력당 5 EXP 추가
    return exp
  }

  const handleSubmit = () => {
    const data = {
      electricity,
      gas,
      water,
      other,
    }
    onSubmit(data)
    onExpGain?.(calculateExp())
  }

  return (
    <div className="px-16 py-6 space-y-12 pb-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">공과금 입력</h3>
        <p className="text-sm text-gray-600 mb-6">실제 지불한 공과금을 항목별로 입력해주세요</p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">전기요금</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formatNumber(electricity)}
                onChange={(e) => handleNumberInput(e.target.value, setElectricity)}
                placeholder="예: 80,000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">가스요금</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formatNumber(gas)}
                onChange={(e) => handleNumberInput(e.target.value, setGas)}
                placeholder="예: 50,000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">수도요금</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formatNumber(water)}
                onChange={(e) => handleNumberInput(e.target.value, setWater)}
                placeholder="예: 30,000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기타</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formatNumber(other)}
                onChange={(e) => handleNumberInput(e.target.value, setOther)}
                placeholder="예: 20,000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
