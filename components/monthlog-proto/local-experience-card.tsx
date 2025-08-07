"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Edit, TrendingUp, Users, Globe, BookOpen, Heart, Baby, Palette } from "lucide-react"
import { AnimatedGauge } from "@/components/monthlog-proto/charts/animated-gauge"

interface LocalExperienceCardProps {
  cardData: {
    title: string
    contributorCount: number
    friendliness: {
      value: number
      maxValue: number
    }
    englishCommunication: {
      status: string
    }
    neighborhoodVibe: {
      description: string
    }
    learningOpportunities: {
      count: string
    }
    detailItems: Array<{
      icon: any
      label: string
      value: string
    }>
  }
}

export function LocalExperienceCard({ cardData }: LocalExperienceCardProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-gray-900">
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-2xl">{cardData.title}</span>
              <p className="text-sm text-gray-500 font-normal mt-1">{cardData.contributorCount}명이 기여한 정보</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
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
              value={cardData.friendliness.value}
              maxValue={cardData.friendliness.maxValue}
              label="여행자 친화도"
              color="#141414"
              size={160}
            />
          </div>

          {/* 우측 영역 (65% - 3/5) - 3개 보조 지표 */}
          <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
            {/* 보조 지표 1 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{cardData.englishCommunication.status}</div>
              <div className="text-sm text-gray-600">영어소통 원활도</div>
            </div>

            {/* 보조 지표 2 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{cardData.neighborhoodVibe.description}</div>
              <div className="text-sm text-gray-600">동네 분위기</div>
            </div>

            {/* 보조 지표 3 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{cardData.learningOpportunities.count}</div>
              <div className="text-sm text-gray-600">배움/클래스</div>
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
              <span className="text-gray-700">여행자 친화도</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-900">
                {cardData.friendliness.value}/{cardData.friendliness.maxValue}
              </span>
              <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                <Edit className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          {cardData.detailItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <item.icon className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900">{item.value}</span>
                <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// 기본 props 제공
LocalExperienceCard.defaultProps = {
  cardData: {
    title: "💬 로컬 경험&커뮤니티",
    contributorCount: 47,
    friendliness: {
      value: 8.5,
      maxValue: 10,
    },
    englishCommunication: {
      status: "원활함",
    },
    neighborhoodVibe: {
      description: "정이많아요",
    },
    learningOpportunities: {
      count: "3곳+",
    },
    detailItems: [
      {
        icon: Heart,
        label: "동네 인심&분위기",
        value: "매우 따뜻함",
      },
      {
        icon: Globe,
        label: "영어 소통 원활도",
        value: "대부분 가능",
      },
      {
        icon: Users,
        label: "커뮤니티/소셜",
        value: "활발함",
      },
      {
        icon: BookOpen,
        label: "배움/클래스 정보",
        value: "요가, 쿠킹클래스",
      },
      {
        icon: Palette,
        label: "로컬 문화체험 기회",
        value: "전통공예, 축제",
      },
      {
        icon: Baby,
        label: "어린이 체험/교육",
        value: "키즈카페, 놀이터",
      },
    ],
  },
}
