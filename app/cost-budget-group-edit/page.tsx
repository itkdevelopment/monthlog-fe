"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Star,
  Home,
  DollarSign,
  Zap,
  Car,
  Smartphone,
  UtensilsCrossed,
  MapPin,
  ShoppingCart,
  Calculator,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PriceSatisfactionInput from "@/components/cost-inputs/price-satisfaction-input"
import RentInput from "@/components/cost-inputs/rent-input"
import InitialCostInput from "@/components/cost-inputs/initial-cost-input"
import UtilitiesInput from "@/components/cost-inputs/utilities-input"
import TransportInput from "@/components/cost-inputs/transport-input"
import CommunicationInput from "@/components/cost-inputs/communication-input"
import FoodInput from "@/components/cost-inputs/food-input"
import ActivityInput from "@/components/cost-inputs/activity-input"
import LocalPriceInput from "@/components/cost-inputs/local-price-input"
import TotalCostInput from "@/components/cost-inputs/total-cost-input"

export default function CostBudgetGroupEditPage() {
  const router = useRouter()
  const [expPoints, setExpPoints] = useState(0)
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 각 패널의 완료 상태 추적
  const [completedPanels, setCompletedPanels] = useState({
    satisfaction: false,
    rent: false,
    initialCost: false,
    utilities: false,
    transport: false,
    communication: false,
    food: false,
    activity: false,
    localPrice: false,
    totalCost: false,
  })

  // 패널 완료 핸들러 - 독립 컴포넌트에서 onSubmit 호출 시
  const handlePanelComplete = (panelName: string, isComplete: boolean, points = 0) => {
    console.log(`Panel ${panelName} completed:`, isComplete, `Points: ${points}`)

    setCompletedPanels((prev) => ({
      ...prev,
      [panelName]: isComplete,
    }))

    // 패널 완료 시 버튼 활성화
    if (isComplete) {
      setIsButtonActive(true)
      if (points > 0) {
        setExpPoints((prev) => prev + points)
      }
    }
  }

  // 경험치 증가/차감 핸들러 - 독립 컴포넌트에서 onExpGain 호출 시
  const handleExpGain = (amount: number) => {
    console.log(`EXP gained: ${amount}`)
    setExpPoints((prev) => prev + amount)
    // 경험치 변화 시 버튼 활성화
    setIsButtonActive(true)
  }

  // 입력 상호작용 핸들러 - 독립 컴포넌트에서 onInteraction 호출 시 (현재 사용되지 않음)
  const handleInputInteraction = () => {
    console.log("Input interaction detected")
    setIsButtonActive(true)
  }

  // 전역 클릭 이벤트 감지 - 본문 영역의 모든 클릭을 감지
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // 본문 영역(main) 내부의 클릭인지 확인
      const mainElement = document.querySelector("main")
      if (mainElement && mainElement.contains(target)) {
        // 버튼, 입력 필드, 선택 가능한 요소들의 클릭 감지
        if (
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea")
        ) {
          console.log("Interactive element clicked in main area")
          setIsButtonActive(true)
        }
      }
    }

    // 전역 입력 이벤트 감지
    const handleGlobalInput = (event: Event) => {
      const target = event.target as HTMLElement
      const mainElement = document.querySelector("main")

      if (mainElement && mainElement.contains(target)) {
        console.log("Input detected in main area")
        setIsButtonActive(true)
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener("click", handleGlobalClick)
    document.addEventListener("input", handleGlobalInput)
    document.addEventListener("change", handleGlobalInput)

    // 클린업
    return () => {
      document.removeEventListener("click", handleGlobalClick)
      document.removeEventListener("input", handleGlobalInput)
      document.removeEventListener("change", handleGlobalInput)
    }
  }, [])

  const handleSubmit = () => {
    console.log("Form submitted with completed panels:", completedPanels)
    console.log("Total EXP gained:", expPoints)
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 - 도시 상세페이지와 동일한 디자인 */}
      <header
        className={`${
          scrolled ? "bg-white/80 border-b border-gray-100" : "bg-transparent border-b border-transparent"
        } backdrop-blur-sm sticky top-0 z-40`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              상세페이지로
            </Button>
            <h1 className="text-lg font-bold text-gray-900">한달살기 비용 한번에 개척하기</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <div className="space-y-8">
          {/* 1. 물가 만족도 */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  물가 만족도
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <PriceSatisfactionInput
                onSubmit={(data) => handlePanelComplete("satisfaction", true, 10)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>

          {/* 2. 숙소 월세 */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Home className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  숙소 월세
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <RentInput onSubmit={(data) => handlePanelComplete("rent", true, 20)} onExpGain={handleExpGain} />
            </CardContent>
          </Card>

          {/* 3. 초기 정착 비용 */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  초기 정착 비용
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <InitialCostInput
                onSubmit={(data) => handlePanelComplete("initialCost", true, 10)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>

          {/* 4. 공과금 (월평균) */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  공과금 (월평균)
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <UtilitiesInput
                onSubmit={(data) => handlePanelComplete("utilities", true, 12)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>

          {/* 5. 교통비 (월평균) */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  교통비 (월평균)
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <TransportInput
                onSubmit={(data) => handlePanelComplete("transport", true, 10)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>

          {/* 6. 통신비 (월평균) */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  통신비 (월평균)
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CommunicationInput
                onSubmit={(data) => handlePanelComplete("communication", true, 15)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>

          {/* 7. 식비 (월평균) */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  식비 (월평균)
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <FoodInput onSubmit={(data) => handlePanelComplete("food", true, 10)} onExpGain={handleExpGain} />
            </CardContent>
          </Card>

          {/* 8. 여가/액티비티 */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  여가/액티비티
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ActivityInput onSubmit={(data) => handlePanelComplete("activity", true, 15)} onExpGain={handleExpGain} />
            </CardContent>
          </Card>

          {/* 9. 현지물가 수준 */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  현지물가 수준
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <LocalPriceInput
                onSubmit={(data) => handlePanelComplete("localPrice", true, 10)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>

          {/* 10. 총 예상 비용 */}
          <Card className="border-0 shadow-lg pb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Calculator className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  총 예상 비용
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <TotalCostInput
                onSubmit={(data) => handlePanelComplete("totalCost", true, 10)}
                onExpGain={handleExpGain}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSubmit}
            disabled={!isButtonActive}
            style={{
              backgroundColor: isButtonActive ? "#0B24FB" : "#d1d5db",
              color: isButtonActive ? "white" : "#6b7280",
              borderRadius: "9999px",
            }}
            className={`w-full py-4 text-lg font-semibold transition-colors ${
              isButtonActive ? "hover:opacity-90" : "cursor-not-allowed"
            }`}
          >
            한번에 개척하기 (+{expPoints} EXP)
          </Button>
        </div>
      </div>
    </div>
  )
}
