"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BudgetCalculatorProps {
  onBudgetChange?: (data: any) => void
}

export function BudgetCalculator({ onBudgetChange }: BudgetCalculatorProps) {
  // 예산 계산기 상태
  const [budgetCalculator, setBudgetCalculator] = useState({
    people: 1,
    days: 30,
    month: "4월",
    isSimulationMode: false,
    showAdvanced: false,
    accommodation: "게스트하우스",
    dining: "균형",
    transport: "대중교통",
    activity: "적당히",
  })

  const calculateBudget = () => {
    const { people, days } = budgetCalculator
    const monthlyMultiplier = days / 30
    const peopleMultiplier = people

    return {
      rentMedian: Math.round(130 * monthlyMultiplier * (people > 1 ? 1.5 : 1)) + "만원",
      transportation: Math.round(12 * monthlyMultiplier * peopleMultiplier) + "만원",
      totalEstimate: Math.round(200 * monthlyMultiplier * peopleMultiplier) + "만원",
      utilities: Math.round((8 + 5 + 3) * monthlyMultiplier) + "만원",
      foodCost: Math.round(60 * monthlyMultiplier * peopleMultiplier) + "만원",
    }
  }

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="font-semibold text-gray-900 mb-4">나만의 예산 계산기</h3>

      {/* 기본 조건 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">인원수</label>
          <input
            type="number"
            min="1"
            max="10"
            value={budgetCalculator.people}
            onChange={(e) => setBudgetCalculator((prev) => ({ ...prev, people: Number.parseInt(e.target.value) || 1 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B24FB] focus:border-[#0B24FB]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">체류 일수</label>
          <input
            type="number"
            min="1"
            max="365"
            value={budgetCalculator.days}
            onChange={(e) => setBudgetCalculator((prev) => ({ ...prev, days: Number.parseInt(e.target.value) || 30 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B24FB] focus:border-[#0B24FB]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">체류 시기</label>
          <select
            value={budgetCalculator.month}
            onChange={(e) => setBudgetCalculator((prev) => ({ ...prev, month: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B24FB] focus:border-[#0B24FB]"
          >
            {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 상세 조건 설정 토글 */}
      <button
        onClick={() => setBudgetCalculator((prev) => ({ ...prev, showAdvanced: !prev.showAdvanced }))}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 flex items-center space-x-1"
      >
        <Plus className={`h-4 w-4 transition-transform ${budgetCalculator.showAdvanced ? "rotate-45" : ""}`} />
        <span>상세 조건 설정하기</span>
      </button>

      {/* 상세 조건 영역 */}
      <AnimatePresence>
        {budgetCalculator.showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              {/* 숙소 스타일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">숙소 스타일</label>
                <div className="flex flex-wrap gap-2">
                  {["게스트하우스", "에어비앤비", "호텔", "원룸"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setBudgetCalculator((prev) => ({ ...prev, accommodation: option }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        budgetCalculator.accommodation === option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 식사 스타일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">식사 스타일</label>
                <div className="flex flex-wrap gap-2">
                  {["외식 위주", "요리 위주", "균형"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setBudgetCalculator((prev) => ({ ...prev, dining: option }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        budgetCalculator.dining === option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 교통 스타일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교통 스타일</label>
                <div className="flex flex-wrap gap-2">
                  {["대중교통", "렌터카", "택시 위주", "도보/자전거"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setBudgetCalculator((prev) => ({ ...prev, transport: option }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        budgetCalculator.transport === option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 활동 스타일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">활동 스타일</label>
                <div className="flex flex-wrap gap-2">
                  {["적당히", "액티브", "럭셔리", "절약형"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setBudgetCalculator((prev) => ({ ...prev, activity: option }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        budgetCalculator.activity === option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setBudgetCalculator((prev) => ({ ...prev, isSimulationMode: !prev.isSimulationMode }))}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          budgetCalculator.isSimulationMode
            ? "bg-gray-600 hover:bg-gray-700 text-white"
            : "bg-[#0B24FB] hover:bg-blue-700 text-white"
        }`}
      >
        {budgetCalculator.isSimulationMode ? "원래대로 돌아가기" : "내 예산 확인하기"}
      </button>
    </div>
  )
}
