"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Edit, Info, DollarSign, Star, Home, Car, Wifi, Utensils, MapPin, ShoppingCart, Calculator } from "lucide-react"
import { AnimatedGauge } from "@/components/monthlog-proto/charts/animated-gauge"
import { useRouter } from "next/navigation"
import { BudgetCalculator } from "@/components/monthlog-proto/budget-calculator"

// 독립 컴포넌트 import
import PriceSatisfactionPanel from "@/components/monthlog-proto/cost-panels/price-satisfaction-panel"
import RentPanel from "@/components/monthlog-proto/cost-panels/rent-panel"
import UtilitiesPanel from "@/components/monthlog-proto/cost-panels/utilities-panel"
import InitialCostPanel from "@/components/monthlog-proto/cost-panels/initial-cost-panel"
import TransportPanel from "@/components/monthlog-proto/cost-panels/transport-panel"
import CommunicationPanel from "@/components/monthlog-proto/cost-panels/communication-panel"
import FoodPanel from "@/components/monthlog-proto/cost-panels/food-panel"
import ActivityPanel from "@/components/monthlog-proto/cost-panels/activity-panel"
import LocalPricePanel from "@/components/monthlog-proto/cost-panels/local-price-panel"
import TotalCostPanel from "@/components/monthlog-proto/cost-panels/total-cost-panel"

// AnimatedNumber 컴포넌트
const AnimatedNumber = ({ value, duration = 1000 }: { value: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [value, displayValue])

  return (
    <span className={`transition-all duration-300 ${isAnimating ? "scale-110 text-blue-600" : ""}`}>
      {displayValue}
    </span>
  )
}

interface CostBudgetCardProps {
  cardData: {
    title: string
    contributorCount: number
    satisfaction: {
      value: number
      maxValue: number
    }
    totalEstimate: string
    rentMedian: string
    essentialCost: string
    detailItems: Array<{
      icon: any
      label: string
      value: string
      modalKey?: string
      hasEdit?: boolean
    }>
    isOverseas: boolean
    flightCost?: string
    modalData: any
  }
  onExpGain: (amount: number) => void
  onGroupEdit: () => void
  onOpenModal: (key: string) => void
}

export function CostBudgetCard({ cardData, onExpGain, onGroupEdit, onOpenModal }: CostBudgetCardProps) {
  // 패널 상태
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const router = useRouter()

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

  const getCurrentData = () => {
    if (budgetCalculator.isSimulationMode) {
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
    return {
      rentMedian: cardData.rentMedian,
      transportation: "12만원",
      totalEstimate: cardData.totalEstimate,
      utilities: "16만원",
      foodCost: "60만원",
    }
  }

  // 패널 열기 함수
  const openDetailPanel = (panelType: string) => {
    setOpenPanel(panelType)
  }

  // 패널 닫기 함수
  const closePanel = () => {
    setOpenPanel(null)
  }

  // 그룹 편집 페이지로 이동
  const handleGroupEdit = () => {
    router.push("/monthlog-proto/cost-budget-group-edit")
  }

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl">{cardData.title}</span>
                <p className="text-sm text-gray-500 font-normal mt-1">{cardData.contributorCount}명이 기여한 정보</p>
              </div>
            </div>
            <button
              onClick={handleGroupEdit}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {/* 상단: 2단 분할 레이아웃 */}
          <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
            {/* 좌측 영역 - 대표 지표 */}
            <div className="col-span-2 flex justify-center">
              <AnimatedGauge
                value={cardData.satisfaction.value}
                maxValue={cardData.satisfaction.maxValue}
                label="물가 만족도"
                color="#141414"
                size={160}
              />
            </div>

            {/* 우측 영역 - 3개 보조 지표 */}
            <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
              {/* (1) 총 예상 비용 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedNumber value={getCurrentData().totalEstimate} />
                </div>
                <div className="text-sm text-gray-600">총 예상 비용</div>
              </div>

              {/* (2) 월세 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedNumber value={getCurrentData().rentMedian} />
                </div>
                <div className="text-sm text-gray-600">월세 (원룸 기준)</div>
              </div>

              {/* (3) 필수 생활비 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedNumber value={cardData.essentialCost} />
                </div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <div className="relative flex items-center">
                    <span>필수 생활비 (월)</span>
                    <div className="ml-1 group">
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        월세 제외, 식비+교통비+통신비+공과금의 최소 비용 (합산의 25%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-200" />

          {/* 하단: 상세 정보 리스트 */}
          <div className="space-y-1">
            {/* 물가 만족도 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">물가 만족도</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("satisfaction")}
                  title="물가 만족도"
                >
                  {cardData.satisfaction.value}/{cardData.satisfaction.maxValue}점
                </span>
                <button
                  onClick={() => openDetailPanel("satisfaction")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 숙소 월세 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">숙소 월세</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("rent")}
                  title="숙소 월세"
                >
                  <AnimatedNumber value={getCurrentData().rentMedian + ", 발품가능, 추천숙소 3곳"} />
                </span>
                <button
                  onClick={() => openDetailPanel("rent")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 초기 정착 비용 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">초기 정착 비용</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("initialCost")}
                  title="초기 정착 비용"
                >
                  90만원, 보증금 20만원
                </span>
                <button
                  onClick={() => openDetailPanel("initialCost")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 공과금 (월평균) */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">공과금 (월평균)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("utilities")}
                  title="공과금 (월평균)"
                >
                  <AnimatedNumber value={getCurrentData().utilities + ", 전기요금 15,000원"} />
                </span>
                <button
                  onClick={() => openDetailPanel("utilities")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 교통비 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">교통비 (월평균)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("transport")}
                  title="교통비 (월평균)"
                >
                  <AnimatedNumber value={getCurrentData().transportation + ", 택시 선호"} />
                </span>
                <button
                  onClick={() => openDetailPanel("transport")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 통신비 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">통신비 (월평균)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("communication")}
                  title="통신비 (월평균)"
                >
                  5만원, 현지유심구매 선호
                </span>
                <button
                  onClick={() => openDetailPanel("communication")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 식비 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Utensils className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">식비 (월평균)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("food")}
                  title="식비 (월평균)"
                >
                  60만원, 외식 1회당 32,000원
                </span>
                <button
                  onClick={() => openDetailPanel("food")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 여가/액티비티 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">여가/액티비티</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("activity")}
                  title="여가/액티비티"
                >
                  25만원, 카페투어 인기, 추천 9곳
                </span>
                <button
                  onClick={() => openDetailPanel("activity")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 현지물가 수준 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">현지물가 수준</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("localPrice")}
                  title="현지물가 수준"
                >
                  스타벅스 아메리카노 4,500원
                </span>
                <button
                  onClick={() => openDetailPanel("localPrice")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 총 예상 비용 (월) - 마지막 항목으로 추가 */}
            <div className="flex items-center justify-between py-2 group relative">
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">총 예상 비용 (월)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer"
                  onClick={() => openDetailPanel("totalCost")}
                  title="총 예상 비용 (월)"
                >
                  150~200만원
                </span>
                <button
                  onClick={() => openDetailPanel("totalCost")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* 예산 계산기 - 독립 컴포넌트로 분리 */}
          <BudgetCalculator />
        </CardContent>
      </Card>

      {/* 각 세부항목 패널들 */}
      <PriceSatisfactionPanel isOpen={openPanel === "satisfaction"} onClose={closePanel} />
      <RentPanel isOpen={openPanel === "rent"} onClose={closePanel} />
      <UtilitiesPanel isOpen={openPanel === "utilities"} onClose={closePanel} />
      <InitialCostPanel isOpen={openPanel === "initialCost"} onClose={closePanel} />
      <TransportPanel isOpen={openPanel === "transport"} onClose={closePanel} />
      <CommunicationPanel isOpen={openPanel === "communication"} onClose={closePanel} />
      <FoodPanel isOpen={openPanel === "food"} onClose={closePanel} />
      <ActivityPanel isOpen={openPanel === "activity"} onClose={closePanel} />
      <LocalPricePanel isOpen={openPanel === "localPrice"} onClose={closePanel} />
      <TotalCostPanel isOpen={openPanel === "totalCost"} onClose={closePanel} />
    </>
  )
}
