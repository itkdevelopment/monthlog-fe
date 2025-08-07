"use client"

import { motion } from "framer-motion"
import { RadarChart } from "@/components/monthlog-proto/charts/radar-chart"
import { useState } from "react"
import { Badge } from "@/components/monthlog-proto/ui/badge"
import { Button } from "@/components/monthlog-proto/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CityCompatibilityCardProps {
  cityName: string
  radarData: Array<{
    label: string
    value: number
    maxValue: number
  }>
}

// 기본 레이더 차트 데이터 (여행 스타일별 총합 수치)
const defaultRadarData = [
  { label: "나홀로\n힐링", value: 8.2, maxValue: 10 },
  { label: "디지털노마드&\n워케이션", value: 7.6, maxValue: 10 },
  { label: "아이와\n함께", value: 7.4, maxValue: 10 },
  { label: "가성비\n여행", value: 7.2, maxValue: 10 },
  { label: "특별한\n경험", value: 7.0, maxValue: 10 },
]

// 여행 스타일별 핵심 지표 정의
const travelStyleIndicators = {
  나홀로힐링: [
    { label: "안전 &\n쾌적", value: 9, maxValue: 10 },
    { label: "힐링 &\n영감", value: 8, maxValue: 10 },
    { label: "생활\n편의성", value: 8, maxValue: 10 },
    { label: "교통\n편의성", value: 7, maxValue: 10 },
    { label: "가성비", value: 6, maxValue: 10 },
  ],
  "디지털노마드&워케이션": [
    { label: "업무\n인프라", value: 8, maxValue: 10 },
    { label: "가성비", value: 6, maxValue: 10 },
    { label: "생활\n안정성", value: 9, maxValue: 10 },
    { label: "워크 &\n라이프", value: 8, maxValue: 10 },
    { label: "이동\n편의성", value: 7, maxValue: 10 },
  ],
  아이와함께: [
    { label: "안전 &\n의료", value: 9, maxValue: 10 },
    { label: "주거 &\n생활", value: 8, maxValue: 10 },
    { label: "교육 &\n체험", value: 7, maxValue: 10 },
    { label: "이동\n편의성", value: 7, maxValue: 10 },
    { label: "가성비", value: 6, maxValue: 10 },
  ],
  가성비여행: [
    { label: "물가\n만족도", value: 7, maxValue: 10 },
    { label: "주거비", value: 6, maxValue: 10 },
    { label: "필수\n생활비", value: 7, maxValue: 10 },
    { label: "교통\n효율성", value: 8, maxValue: 10 },
    { label: "무료\n즐길거리", value: 8, maxValue: 10 },
  ],
  특별한경험: [
    { label: "고급 주거\n환경", value: 5, maxValue: 10 },
    { label: "쇼핑 &\n특별한경험", value: 7, maxValue: 10 },
    { label: "최상의\n편의성", value: 8, maxValue: 10 },
    { label: "안전 &\n프라이빗", value: 9, maxValue: 10 },
    { label: "럭셔리 &\n플렉스", value: 6, maxValue: 10 },
  ],
}

// 기본 인기 태그와 코멘트
const defaultInfo = {
  tags: [
    { name: "자연친화적", count: 245 },
    { name: "힐링스팟", count: 189 },
    { name: "카페천국", count: 167 },
    { name: "안전한환경", count: 156 },
    { name: "교통편리", count: 134 },
    { name: "가성비좋음", count: 123 },
  ],
  comments: [
    "자연과 도시가 조화롭게 어우러진 완벽한 여행지예요",
    "힐링하기에 최고의 장소, 마음의 평화를 찾을 수 있어요",
    "다양한 액티비티와 맛집이 가득한 매력적인 도시입니다",
  ],
}

// 여행 스타일별 도시 정보
const travelStyleInfo = {
  나홀로힐링: {
    tags: [
      { name: "조용한힐링", count: 298 },
      { name: "자연친화적", count: 245 },
      { name: "카페천국", count: 167 },
      { name: "안전한환경", count: 156 },
      { name: "힐링스팟", count: 189 },
      { name: "명상공간", count: 89 },
      { name: "산책로", count: 134 },
      { name: "일출명소", count: 76 },
      { name: "독서카페", count: 92 },
      { name: "온천", count: 45 },
    ],
    comments: [
      "혼자만의 시간을 보내기에 완벽한 곳이에요",
      "자연 속에서 마음의 평화를 찾을 수 있어요",
      "조용한 카페에서 책 읽기 좋아요",
      "일출을 보며 명상하기 좋은 장소가 많아요",
      "혼자 걸어도 안전하고 편안한 분위기예요",
      "힐링 스팟이 곳곳에 숨어있어서 발견하는 재미가 있어요",
    ],
  },
  "디지털노마드&워케이션": {
    tags: [
      { name: "빠른인터넷", count: 312 },
      { name: "24시간카페", count: 198 },
      { name: "코워킹스페이스", count: 156 },
      { name: "저렴한물가", count: 234 },
      { name: "노마드커뮤니티", count: 89 },
      { name: "콘센트많은곳", count: 145 },
      { name: "업무집중", count: 167 },
      { name: "분위기좋은카페", count: 189 },
      { name: "교통편리", count: 134 },
      { name: "다양한액티비티", count: 98 },
      { name: "휴양지", count: 76 },
      { name: "와이파이무료", count: 201 },
    ],
    comments: [
      "업무하기에 최적의 환경이 갖춰져 있어요",
      "빠른 인터넷과 좋은 카페가 많아요",
      "워케이션하기에 완벽한 도시예요",
      "일과 휴식의 균형을 맞추기 좋은 곳이에요",
      "노마드 커뮤니티가 활발해서 네트워킹하기 좋아요",
      "업무 후 즐길 거리가 풍부해서 지루하지 않아요",
    ],
  },
  아이와함께: {
    tags: [
      { name: "가족친화적", count: 267 },
      { name: "안전한환경", count: 156 },
      { name: "키즈시설", count: 189 },
      { name: "교육체험", count: 134 },
      { name: "의료시설", count: 98 },
      { name: "놀이공원", count: 76 },
      { name: "체험학습", count: 112 },
      { name: "안전한해변", count: 145 },
      { name: "가족카페", count: 89 },
      { name: "어린이박물관", count: 67 },
    ],
    comments: [
      "아이들과 함께 즐길 거리가 많아요",
      "안전하고 깨끗한 환경이에요",
      "가족 단위 여행객들이 많아서 편해요",
      "아이들이 좋아할 체험 프로그램이 다양해요",
      "의료시설이 잘 갖춰져 있어서 안심이에요",
      "가족 모두가 만족할 수 있는 완벽한 여행지예요",
    ],
  },
  가성비여행: {
    tags: [
      { name: "저렴한물가", count: 234 },
      { name: "가성비숙소", count: 198 },
      { name: "무료관광지", count: 167 },
      { name: "대중교통", count: 145 },
      { name: "로컬맛집", count: 189 },
      { name: "할인혜택", count: 89 },
      { name: "무료체험", count: 112 },
      { name: "저렴한교통비", count: 134 },
      { name: "시장구경", count: 76 },
      { name: "무료박물관", count: 67 },
    ],
    comments: [
      "적은 비용으로도 충분히 즐길 수 있어요",
      "현지 물가가 합리적이에요",
      "가성비 좋은 숙소와 맛집이 많아요",
      "무료로 즐길 수 있는 관광지가 많아서 좋아요",
      "대중교통이 저렴하고 편리해요",
      "로컬 맛집에서 저렴하게 맛있는 음식을 즐길 수 있어요",
    ],
  },
  특별한경험: {
    tags: [
      { name: "럭셔리숙소", count: 386 },
      { name: "특별한체험", count: 298 },
      { name: "고급레스토랑", count: 234 },
      { name: "프리미엄서비스", count: 189 },
      { name: "독특한문화", count: 167 },
      { name: "VIP투어", count: 134 },
      { name: "미슐랭맛집", count: 112 },
      { name: "스파리조트", count: 98 },
      { name: "프라이빗투어", count: 89 },
      { name: "럭셔리쇼핑", count: 76 },
    ],
    comments: [
      "특별하고 독특한 경험을 할 수 있어요",
      "럭셔리한 서비스와 시설이 인상적이에요",
      "평생 기억에 남을 경험을 했어요",
      "프리미엄 서비스로 최고의 만족도를 얻었어요",
      "독특한 문화 체험이 정말 특별했어요",
      "럭셔리한 분위기에서 완벽한 휴식을 취할 수 있어요",
    ],
  },
}

export default function CityCompatibilityCard({ cityName, radarData }: CityCompatibilityCardProps) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [showMoreTags, setShowMoreTags] = useState(false)
  const [showMoreComments, setShowMoreComments] = useState(false)

  const travelStyles = [
    { key: "나홀로힐링", label: "🧘‍♀️ 나홀로힐링" },
    { key: "디지털노마드&워케이션", label: "💻 디지털노마드&워케이션" },
    { key: "아이와함께", label: "👨‍👩‍👧‍👦 아이와함께" },
    { key: "가성비여행", label: "💰 가성비여행" },
    { key: "특별한경험", label: "✨ 특별한경험" },
  ]

  // 현재 표시할 레이더 차트 데이터
  const currentRadarData = selectedStyle ? travelStyleIndicators[selectedStyle] : defaultRadarData

  // 현재 표시할 정보
  const currentInfo = selectedStyle ? travelStyleInfo[selectedStyle] : defaultInfo

  // 표시할 태그와 코멘트 개수 결정
  const displayTags = showMoreTags ? currentInfo.tags : currentInfo.tags.slice(0, 6)
  const displayComments = showMoreComments ? currentInfo.comments : currentInfo.comments.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      {/* 제목과 설명 - 중앙 정렬 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">이 도시, 나랑 맞을까?</h2>
        <p className="text-gray-600">
          {selectedStyle
            ? `${selectedStyle} 스타일로 ${cityName}을 확인하세요`
            : `${cityName}의 핵심 지표를 한눈에 확인하세요`}
        </p>
      </div>

      {/* 레이더 차트 - 중앙 정렬, 가로 700 세로 500 고정, 상하 마진 50% 줄임 */}
      <div className="flex justify-center mb-8 px-0 py-6">
        <div className="w-[700px] h-[500px] overflow-visible">
          <RadarChart data={currentRadarData} size={500} />
        </div>
      </div>

      {/* 여행 스타일 버튼 - 중앙 정렬, 스크롤바 없이 1줄로 배치 */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
          {travelStyles.map((style) => (
            <Button
              key={style.key}
              variant={selectedStyle === style.key ? "default" : "outline"}
              size="sm"
              className={`h-auto py-3 px-4 transition-all duration-200 transform rounded-full whitespace-nowrap flex-shrink-0 ${
                selectedStyle === style.key
                  ? "bg-black text-white hover:bg-gray-800 shadow-xl scale-105 border-2 border-black"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
              }`}
              onClick={() => setSelectedStyle(selectedStyle === style.key ? null : style.key)}
            >
              <span className="text-sm font-semibold">{style.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 도시 정보 - 2열 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 도시 태그 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedStyle ? "도시 태그" : "인기 도시 태그"}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {displayTags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1 font-normal"
              >
                {tag.name} {tag.count}
              </Badge>
            ))}
          </div>
          {currentInfo.tags.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreTags(!showMoreTags)}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
            >
              {showMoreTags ? (
                <>
                  접기 <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  더보기 ({currentInfo.tags.length - 6}개 더) <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* 한줄 코멘트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {selectedStyle ? "한줄 코멘트" : "인기 한줄 코멘트"}
          </h3>
          <div className="space-y-3 mb-3">
            {displayComments.map((comment, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm leading-relaxed text-center">"{comment}"</p>
              </div>
            ))}
          </div>
          {currentInfo.comments.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreComments(!showMoreComments)}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
            >
              {showMoreComments ? (
                <>
                  접기 <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  더보기 ({currentInfo.comments.length - 3}개 더) <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
