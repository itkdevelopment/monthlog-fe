"use client"

import { Calendar, Edit2 } from "lucide-react"
import { useState } from "react"
import CityProfilePanel from "./city-profile-panel"

interface CityProfileCardProps {
  cityData: {
    name: string
    summary: string
    tags: string[]
    totalContributors: number
    dataPoints: number
    rating: number
    lastUpdated: string
  }
  topContributors: Array<{
    id: string
    username: string
  }>
}

export default function CityProfileCard({ cityData, topContributors }: CityProfileCardProps) {
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false)

  const handleProfileSubmit = (data: {
    travelStyles: string[]
    cityTags: string[]
    comment: string
  }) => {
    // 프로필 데이터 제출 로직
    console.log("프로필 데이터:", data)
    // 여기서 EXP 획득 애니메이션 등을 트리거할 수 있음
  }

  return (
    <>
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8">
        {/* 히어로 이미지 섹션 */}
        <div className="relative h-64">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.29.52-mzrVWJqK0dtGnXiCzaDV7y817YJvyj.png"
            alt="제주도 풍경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>

          {/* 수정 버튼 - 우측 상단 */}
          <button
            onClick={() => setIsProfilePanelOpen(true)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20 cursor-pointer z-10"
          >
            <Edit2 className="h-4 w-4 text-white" />
          </button>

          {/* 도시명, 코멘트, 태그 - 조금 아래쪽으로 이동 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
            <h1 className="text-5xl font-bold mb-3 text-white text-center drop-shadow-lg">{cityData.name}</h1>
            <p className="text-xl text-white text-center opacity-90 mb-6 drop-shadow-md">{cityData.summary}</p>

            {/* 태그들 - 5개 표시, 여백 증가 */}
            <div className="flex flex-wrap gap-2 justify-center">
              {cityData.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 backdrop-blur-sm bg-white/20 text-white text-sm font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 메트릭 섹션 */}
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* 한달살기 적합도 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">8/10</div>
              <div className="text-sm text-gray-600">한달살기 적합도</div>
            </div>

            {/* 개척자 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">{cityData.totalContributors}</div>
              <div className="text-sm text-gray-600">개척자</div>
            </div>

            {/* 총 기여 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">{cityData.dataPoints}</div>
              <div className="text-sm text-gray-600">총 기여</div>
            </div>

            {/* 데이터 신뢰도 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">89%</div>
              <div className="text-sm text-gray-600">데이터 신뢰도</div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* 기여자 정보 */}
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {topContributors.slice(0, 3).map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ backgroundColor: "#eaeaea" }}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                <span className="font-bold">{cityData.totalContributors}명</span>이 이 도시에 기여했어요
              </span>
            </div>

            {/* 최근 업데이트 및 버튼 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>최근 업데이트: {cityData.lastUpdated}</span>
              </div>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: "#0B24FB" }}
              >
                + 내 모든 경험 한번에 개척하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 도시 프로필 패널 */}
      <CityProfilePanel
        isOpen={isProfilePanelOpen}
        onClose={() => setIsProfilePanelOpen(false)}
        onSubmit={handleProfileSubmit}
      />
    </>
  )
}
