"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, TrendingUp, Wifi, Zap, Building, Coffee, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import SatisfactionInput from "@/components/workation-inputs/satisfaction-input"
import InternetSpeedInput from "@/components/workation-inputs/internet-speed-input"
import PowerStabilityInput from "@/components/workation-inputs/power-stability-input"
import WifiAccessInput from "@/components/workation-inputs/wifi-access-input"
import CoworkingSpaceInput from "@/components/workation-inputs/coworking-space-input"
import CafeInput from "@/components/workation-inputs/cafe-input"
import MembershipInput from "@/components/workation-inputs/membership-input"

export default function WorkationGroupEditPage() {
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
    internetSpeed: false,
    powerStability: false,
    wifiAccess: false,
    coworkingSpace: false,
    cafe: false,
    membership: false,
  })

  // 워케이션 환경 만족도 상태
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(null)

  // 인터넷 속도 상태
  const [internetSpeed, setInternetSpeed] = useState("")
  const [internetSatisfactionScore, setInternetSatisfactionScore] = useState<number | null>(null)

  // 전력 안정성 상태
  const [powerStabilityScore, setPowerStabilityScore] = useState<number | null>(null)
  const [powerStabilityTags, setPowerStabilityTags] = useState<string[]>([])
  const [powerStabilityNewTags, setPowerStabilityNewTags] = useState<string[]>([])

  // Wi-Fi 접근성 상태
  const [wifiAccessScore, setWifiAccessScore] = useState<number | null>(null)
  const [wifiAccessTags, setWifiAccessTags] = useState<string[]>([])
  const [wifiAccessNewTags, setWifiAccessNewTags] = useState<string[]>([])

  // 코워킹 스페이스 상태
  const [coworkingSpaceScore, setCoworkingSpaceScore] = useState<number | null>(null)
  const [coworkingSpaces, setCoworkingSpaces] = useState<any[]>([])
  const [coworkingRecommendations, setCoworkingRecommendations] = useState<any[]>([])

  // 카페 상태
  const [cafeScore, setCafeScore] = useState<number | null>(null)
  const [cafes, setCafes] = useState<any[]>([])
  const [cafeRecommendations, setCafeRecommendations] = useState<any[]>([])

  // 멤버십 상태
  const [membershipScore, setMembershipScore] = useState<number | null>(null)
  const [membershipTags, setMembershipTags] = useState<string[]>([])
  const [membershipNewTags, setMembershipNewTags] = useState<string[]>([])
  const [membershipPricePlans, setMembershipPricePlans] = useState<any[]>([])

  // 패널 완료 핸들러
  const handlePanelComplete = (panelName: string, isComplete: boolean, points = 0) => {
    console.log(`Panel ${panelName} completed:`, isComplete, `Points: ${points}`)

    setCompletedPanels((prev) => ({
      ...prev,
      [panelName]: isComplete,
    }))

    if (isComplete) {
      setIsButtonActive(true)
      if (points > 0) {
        setExpPoints((prev) => prev + points)
      }
    }
  }

  // 경험치 증가/차감 핸들러
  const handleExpGain = (amount: number) => {
    console.log(`EXP gained: ${amount}`)
    setExpPoints((prev) => prev + amount)
    setIsButtonActive(true)
  }

  // 전역 클릭 이벤트 감지
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const mainElement = document.querySelector("main")
      if (mainElement && mainElement.contains(target)) {
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

    const handleGlobalInput = (event: Event) => {
      const target = event.target as HTMLElement
      const mainElement = document.querySelector("main")

      if (mainElement && mainElement.contains(target)) {
        console.log("Input detected in main area")
        setIsButtonActive(true)
      }
    }

    document.addEventListener("click", handleGlobalClick)
    document.addEventListener("input", handleGlobalInput)
    document.addEventListener("change", handleGlobalInput)

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
      {/* 헤더 */}
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
            <h1 className="text-lg font-bold text-gray-900">디지털/업무 환경 한번에 개척하기</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <div className="space-y-8">
          {/* 1. 워케이션 환경 만족도 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  워케이션 환경 만족도
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <SatisfactionInput onScoreChange={setSatisfactionScore} selectedScore={satisfactionScore} />
            </CardContent>
          </Card>

          {/* 2. 인터넷 평균 속도 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Wifi className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  인터넷 평균 속도
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <InternetSpeedInput
                onSpeedChange={setInternetSpeed}
                inputSpeed={internetSpeed}
                onSatisfactionChange={setInternetSatisfactionScore}
                satisfactionScore={internetSatisfactionScore}
              />
            </CardContent>
          </Card>

          {/* 3. 전력 안정성 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  전력 안정성
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <PowerStabilityInput
                onScoreChange={setPowerStabilityScore}
                onTagsChange={(selectedTags, newTags) => {
                  setPowerStabilityTags(selectedTags)
                  setPowerStabilityNewTags(newTags)
                }}
                selectedScore={powerStabilityScore}
                selectedTags={powerStabilityTags}
                newTags={powerStabilityNewTags}
              />
            </CardContent>
          </Card>

          {/* 4. 무료 Wi-Fi 접근성 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Wifi className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  무료 Wi-Fi 접근성
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <WifiAccessInput
                onScoreChange={setWifiAccessScore}
                onTagsChange={(selectedTags, newTags) => {
                  setWifiAccessTags(selectedTags)
                  setWifiAccessNewTags(newTags)
                }}
                selectedScore={wifiAccessScore}
                selectedTags={wifiAccessTags}
                newTags={wifiAccessNewTags}
              />
            </CardContent>
          </Card>

          {/* 5. 코워킹 스페이스 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Building className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  코워킹 스페이스
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <CoworkingSpaceInput
                onScoreChange={setCoworkingSpaceScore}
                onSpacesChange={setCoworkingSpaces}
                onRecommendationsChange={setCoworkingRecommendations}
                selectedScore={coworkingSpaceScore}
                coworkingSpaces={coworkingSpaces}
                selectedRecommendations={coworkingRecommendations}
              />
            </CardContent>
          </Card>

          {/* 6. 노트북 하기 좋은 카페 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Coffee className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  노트북 하기 좋은 카페
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <CafeInput
                onScoreChange={setCafeScore}
                onCafesChange={setCafes}
                onRecommendationsChange={setCafeRecommendations}
                selectedScore={cafeScore}
                cafes={cafes}
                selectedRecommendations={cafeRecommendations}
              />
            </CardContent>
          </Card>

          {/* 7. 단기 멤버십 정보 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6" style={{ color: "#0B24FB" }} />
                <h2 className="text-xl font-bold" style={{ color: "#0B24FB" }}>
                  단기 멤버십 정보
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-16 py-6 pb-14">
              <MembershipInput
                onScoreChange={setMembershipScore}
                onTagsChange={(selectedTags, newTags) => {
                  setMembershipTags(selectedTags)
                  setMembershipNewTags(newTags)
                }}
                onPricePlansChange={setMembershipPricePlans}
                selectedScore={membershipScore}
                selectedTags={membershipTags}
                newTags={membershipNewTags}
                pricePlans={membershipPricePlans}
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
            className={`w-full py-4 text-lg font-semibent transition-colors ${
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
