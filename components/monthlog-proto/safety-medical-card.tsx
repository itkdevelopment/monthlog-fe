"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Edit, Shield, AlertTriangle, Heart, Phone, Droplets, Building2 } from "lucide-react"
import { AnimatedGauge } from "@/components/monthlog-proto/charts/animated-gauge"

// 패널 컴포넌트들 import
import SafetyLevelPanel from "@/components/monthlog-proto/safety-panels/safety-level-panel"
import MedicalLevelPanel from "@/components/monthlog-proto/safety-panels/medical-level-panel"
import WaterSafetyPanel from "@/components/monthlog-proto/safety-panels/water-safety-panel"
import CrimeTypesPanel from "@/components/monthlog-proto/safety-panels/crime-types-panel"
import EmergencyContactsPanel from "@/components/monthlog-proto/safety-panels/emergency-contacts-panel"
import EmbassyContactsPanel from "@/components/monthlog-proto/safety-panels/embassy-contacts-panel"

interface SafetyMedicalCardProps {
  cardData?: {
    title?: string
    participantCount?: number
    safetyLevel?: {
      value: number
      maxValue: number
    }
    medicalLevel?: number
    waterSafety?: string
    items?: Array<{
      label: string
      value: string | number
    }>
  }
  onExpGain?: (amount: number) => void
}

export default function SafetyMedicalCard({
  cardData = {
    title: "🛡️ 안전 및 의료",
    participantCount: 15,
    safetyLevel: {
      value: 9,
      maxValue: 10,
    },
    medicalLevel: 7,
    waterSafety: "음용 가능",
    items: [
      { label: "치안 수준", value: "9/10" },
      { label: "의료 환경 수준", value: "7/10" },
      { label: "수돗물 안정성", value: "음용 가능" },
      { label: "여행객 대상 범죄 유형", value: "소매치기 거의 없음" },
      { label: "긴급 연락처", value: "119 (응급실), 112 (경찰)" },
      { label: "대사관 연락처", value: "주제주 한국영사관 064-722-8062" },
    ],
  },
  onExpGain = () => {},
}: SafetyMedicalCardProps) {
  const [activePanelType, setActivePanelType] = useState<string | null>(null)

  // 패널 열기 함수
  const openPanel = (key: string) => {
    setActivePanelType(key)
  }

  // 패널 닫기 함수
  const closePanel = () => {
    setActivePanelType(null)
  }

  const handleGroupEdit = () => {
    console.log("안전 및 의료 그룹 편집")
  }

  return (
    <>
      {/* 패널들 */}
      <SafetyLevelPanel isOpen={activePanelType === "safetyLevel"} onClose={closePanel} />
      <MedicalLevelPanel isOpen={activePanelType === "medicalLevel"} onClose={closePanel} />
      <WaterSafetyPanel isOpen={activePanelType === "waterSafety"} onClose={closePanel} />
      <CrimeTypesPanel isOpen={activePanelType === "crimeTypes"} onClose={closePanel} />
      <EmergencyContactsPanel isOpen={activePanelType === "emergencyContacts"} onClose={closePanel} />
      <EmbassyContactsPanel isOpen={activePanelType === "embassyContacts"} onClose={closePanel} />

      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl">{cardData.title}</span>
                <p className="text-sm text-gray-500 font-normal mt-1">{cardData.participantCount}명이 기여한 정보</p>
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
                value={cardData.safetyLevel.value}
                maxValue={cardData.safetyLevel.maxValue}
                label="치안 수준"
                color="#141414"
                size={160}
              />
            </div>

            {/* 우측 영역 (65% - 3/5) - 2개 보조 지표 */}
            <div className="col-span-3 grid grid-cols-2 gap-4 items-center pr-16">
              {/* 보조 지표 1 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{cardData.medicalLevel}/10</div>
                <div className="text-sm text-gray-600">의료 환경 수준</div>
              </div>

              {/* 보조 지표 2 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{cardData.waterSafety}</div>
                <div className="text-sm text-gray-600">수돗물 음용</div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-200" />

          {/* 하단: 상세 정보 리스트 - 순서에 맞게 배치 */}
          <div className="space-y-1">
            {/* 치안 수준 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">치안 수준</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("safetyLevel")}
                >
                  9/10
                </span>
                <button
                  onClick={() => openPanel("safetyLevel")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 의료 환경 수준 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">의료 환경 수준</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("medicalLevel")}
                >
                  7/10
                </span>
                <button
                  onClick={() => openPanel("medicalLevel")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 수돗물 안정성 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">수돗물 안정성</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("waterSafety")}
                >
                  음용 가능
                </span>
                <button
                  onClick={() => openPanel("waterSafety")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 여행객 대상 범죄 유형 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">여행객 대상 범죄 유형</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("crimeTypes")}
                >
                  소매치기 거의 없음
                </span>
                <button
                  onClick={() => openPanel("crimeTypes")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 긴급 연락처 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">긴급 연락처</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("emergencyContacts")}
                >
                  119 (응급실), 112 (경찰)
                </span>
                <button
                  onClick={() => openPanel("emergencyContacts")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 대사관 연락처 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">대사관 연락처</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => openPanel("embassyContacts")}
                >
                  주제주 한국영사관 064-722-8062
                </span>
                <button
                  onClick={() => openPanel("embassyContacts")}
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
