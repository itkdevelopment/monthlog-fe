"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Edit, TrendingUp, Wifi, Zap, Building, Coffee, CreditCard } from "lucide-react"
import { AnimatedGauge } from "@/components/monthlog-proto/charts/animated-gauge"
import SatisfactionPanel from "@/components/monthlog-proto/workation-panels/satisfaction-panel"
import InternetSpeedPanel from "@/components/monthlog-proto/workation-panels/internet-speed-panel"
import PowerStabilityPanel from "@/components/monthlog-proto/workation-panels/power-stability-panel"
import WifiAccessPanel from "@/components/monthlog-proto/workation-panels/wifi-access-panel"
import CoworkingSpacePanel from "@/components/monthlog-proto/workation-panels/coworking-space-panel"
import CafePanel from "@/components/monthlog-proto/workation-panels/cafe-panel"
import MembershipPanel from "@/components/monthlog-proto/workation-panels/membership-panel"

interface WorkationCardProps {
  cardData: {
    title: string
    contributorCount: number
    satisfaction: {
      value: number
      maxValue: number
    }
    internetSpeed: {
      value: string
      unit: string
    }
    coworkingSpaces: {
      count: string
      description: string
    }
    powerStability: {
      status: string
    }
    detailItems: Array<{
      icon: any
      label: string
      value: string
      modalKey: string
    }>
    modalData: any
  }
  onExpGain: (amount: number) => void
  onGroupEdit: () => void
}

export function WorkationCard({ cardData, onExpGain, onGroupEdit }: WorkationCardProps) {
  const router = useRouter()
  const [activePanelType, setActivePanelType] = useState<string | null>(null)

  // 패널 열기 함수
  const openPanel = (key: string) => {
    setActivePanelType(key)
  }

  // 패널 닫기 함수
  const closePanel = () => {
    setActivePanelType(null)
  }

  // 그룹 수정 페이지로 이동
  const handleGroupEdit = () => {
    router.push("/monthlog-proto/workation-group-edit")
  }

  return (
    <>
      {/* 패널들 */}
      <SatisfactionPanel isOpen={activePanelType === "satisfaction"} onClose={closePanel} />
      <InternetSpeedPanel isOpen={activePanelType === "internetSpeed"} onClose={closePanel} />
      <PowerStabilityPanel isOpen={activePanelType === "powerStability"} onClose={closePanel} />
      <WifiAccessPanel isOpen={activePanelType === "wifiAccess"} onClose={closePanel} />
      <CoworkingSpacePanel isOpen={activePanelType === "coworkingSpace"} onClose={closePanel} />
      <CafePanel isOpen={activePanelType === "cafe"} onClose={closePanel} />
      <MembershipPanel isOpen={activePanelType === "membership"} onClose={closePanel} />

      {/* 💻 디지털/업무 환경 카드 - 새로운 2단 분할 레이아웃 */}
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
          {/* 상단: 2단 분할 레이아웃 - 좌측 35%, 우측 65% */}
          <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
            {/* 좌측 영역 (35% - 2/5) - 대표 지표 */}
            <div className="col-span-2 flex justify-center">
              <AnimatedGauge
                value={cardData.satisfaction.value}
                maxValue={cardData.satisfaction.maxValue}
                label="워케이션 환경 만족도"
                color="#141414"
                size={160}
              />
            </div>

            {/* 우측 영역 (65% - 3/5) - 3개 보조 지표 */}
            <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
              {/* 보조 지표 1 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">100Mbps</div>
                <div className="text-sm text-gray-600">인터넷 평균 속도</div>
              </div>

              {/* 보조 지표 2 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">12곳</div>
                <div className="text-sm text-gray-600">코워킹 스페이스</div>
              </div>

              {/* 보조 지표 3 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">매우안정</div>
                <div className="text-sm text-gray-600">전력 안정성</div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-200" />

          {/* 하단: 상세 정보 리스트 - 깔끔한 텍스트 형태 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">워케이션 환경 만족도</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("satisfaction")}
                >
                  {cardData.satisfaction.value}/{cardData.satisfaction.maxValue}
                </span>
                <button
                  onClick={() => openPanel("satisfaction")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">인터넷 평균 속도</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("internetSpeed")}
                >
                  100Mbps, 9/10
                </span>
                <button
                  onClick={() => openPanel("internetSpeed")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">전력 안정성</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("powerStability")}
                >
                  정전 거의 없음, 9/10
                </span>
                <button
                  onClick={() => openPanel("powerStability")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">무료 Wi-Fi 접근성</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("wifiAccess")}
                >
                  카페에서 매우 용이, 8/10
                </span>
                <button
                  onClick={() => openPanel("wifiAccess")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">코워킹 스페이스</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("coworkingSpace")}
                >
                  추천 12곳, 9/10
                </span>
                <button
                  onClick={() => openPanel("coworkingSpace")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">노트북 하기 좋은 카페</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("cafe")}
                >
                  추천 3곳, 6/10
                </span>
                <button
                  onClick={() => openPanel("cafe")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">단기 멤버십 정보</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("membership")}
                >
                  한달플랜 35만원, 8/10
                </span>
                <button
                  onClick={() => openPanel("membership")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
