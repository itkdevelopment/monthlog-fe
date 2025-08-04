"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Edit,
  DollarSign,
  Wifi,
  Home,
  Car,
  Globe,
  Coffee,
  MapPin,
  Phone,
  Zap,
  CreditCard,
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  Palette,
  Baby,
} from "lucide-react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { WorkationCard } from "@/components/workation-card"
import { CostBudgetCard } from "@/components/cost-budget-card"
import LivingEnvironmentCard from "@/components/living-environment-card"
import ConvenienceCard from "@/components/convenience-card"
import TransportCard from "@/components/transport-card"
import SafetyMedicalCard from "@/components/safety-medical-card"
import { LocalExperienceCard } from "@/components/local-experience-card"
import BasicInfoCard from "@/components/basicInfo-card"
import CityProfileCard from "@/components/city-profile-card"
import RecommendedMonthsCard from "@/components/recommended-months-card"
import CityVibeCard from "@/components/city-vibe-card"
import { CityDetailHeader } from "@/components/city-detail-header"
import CityCompatibilityCard from "@/components/city-compatibility-card"

// AnimatedNumber 컴포넌트 추가 (파일 상단에)
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

export default function CityDetailPage() {
  const params = useParams()
  const [showModal, setShowModal] = useState<string | null>(null)
  const [showScoreModal, setShowScoreModal] = useState<string | null>(null)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const [showExpGain, setShowExpGain] = useState(false)
  const [expAmount, setExpAmount] = useState(0)
  const [showDigitalGroupModal, setShowDigitalGroupModal] = useState(false)
  const [costModalType, setCostModalType] = useState<string | null>(null)
  const [costModalData, setCostModalData] = useState<any>(null)
  const [showCostGroupModal, setShowCostGroupModal] = useState(false)
  const [costFormData, setCostFormData] = useState({
    satisfaction: "",
    rent: "",
    utilities: "",
    initial: "",
    activities: { name: "", price: "", hours: "", link: "" },
    flights: { name: "", price: "", hours: "", link: "" },
  })

  const [digitalFormData, setDigitalFormData] = useState({
    satisfaction: "",
    internetSpeed: "",
    powerStability: "",
    wifiAccess: "",
    coworkingSpace: { name: "", price: "", hours: "", link: "" },
    cafe: { name: "", price: "", hours: "", link: "" },
    membership: "",
  })

  const [scrolled, setScrolled] = useState(false)

  // 섹션별 ref 추가
  const cityProfileRef = useRef<HTMLDivElement>(null)
  const compatibilityRef = useRef<HTMLDivElement>(null)
  const costRef = useRef<HTMLDivElement>(null)
  const workationRef = useRef<HTMLDivElement>(null)
  const safetyRef = useRef<HTMLDivElement>(null)
  const livingRef = useRef<HTMLDivElement>(null)
  const convenienceRef = useRef<HTMLDivElement>(null)
  const transportRef = useRef<HTMLDivElement>(null)
  const localRef = useRef<HTMLDivElement>(null)
  const basicRef = useRef<HTMLDivElement>(null)
  const monthsRef = useRef<HTMLDivElement>(null)
  const vibeRef = useRef<HTMLDivElement>(null)

  // 네비게이션 메뉴 항목들
  const navItems = [
    { label: "도시프로필", ref: cityProfileRef },
    { label: "이 도시, 나랑 맞을까?", ref: compatibilityRef },
    { label: "한달살기 비용", ref: costRef },
    { label: "디지털/업무 환경", ref: workationRef },
    { label: "안전 및 의료", ref: safetyRef },
    { label: "거주 환경 디테일", ref: livingRef },
    { label: "현지생활 편의성", ref: convenienceRef },
    { label: "교통 및 이동", ref: transportRef },
    { label: "로컬 경험&커뮤니티", ref: localRef },
    { label: "기본 정보", ref: basicRef },
    { label: "추천 ↔ 피해야하는 시기", ref: monthsRef },
    { label: "도시 분위기", ref: vibeRef },
  ]

  // 스크롤 이동 함수
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const headerHeight = 80 // 헤더 높이 + 여유 공간
      const elementPosition = ref.current.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 제주도 데이터
  const cityData = {
    id: "jeju",
    name: "제주도",
    country: "한국",
    isOverseas: false, // 해외 여부
    image: "/placeholder.svg?height=400&width=1200",
    description: "한국의 대표적인 휴양지이자 ���지털 노마드들에게 인기 있는 워케이션 명소입니다.",
    summary: "자연과 함께하는 완벽한 워케이션 환경",
    tags: ["조용한 힐링", "자연 친화적", "카페 천국", "가족과 함께", "워케이션"],
    rating: 4.8,
    totalContributors: 47,
    dataPoints: 156,
    lastUpdated: "2024-01-15",
  }

  // 비용 관련 데이터
  const costData = {
    satisfaction: 7,
    rentMedian: "130만원",
    transportation: "12만원", // 국내용
    flightCost: "80만원", // 해외용
    totalEstimate: "200만원",
    utilities: { electric: "8만원", gas: "5만원", water: "3만원" },
    activities: [
      {
        name: "한라산 등반",
        description: "제주 대표 트레킹",
        price: "무료",
        link: "https://maps.google.com",
        tags: ["#혼자서", "#친구와"],
      },
      {
        name: "성산일출봉",
        description: "일출 명소",
        price: "5천원",
        link: "https://maps.google.com",
        tags: ["#가족과", "#친구와"],
      },
    ],
    flights: [{ airline: "제주항공", type: "직항", price: "15만원", priceLevel: "저렴" }],
  }

  // 레이더 차트 데이터 (5개 축)
  const radarData = [
    { label: "워케이션", value: 8, maxValue: 10 },
    { label: "가성비", value: 6, maxValue: 10 },
    { label: "안전 & 쾌적성", value: 9, maxValue: 10 },
    { label: "로컬 경험", value: 7, maxValue: 10 },
    { label: "생활 편의성", value: 8, maxValue: 10 },
  ]

  // 영향력 있는 개척자 데이터
  const topContributors = [
    {
      id: "1",
      username: "제주러버",
      avatar: "/placeholder.svg?height=40&width=40",
      level: 25,
      contributions: 45,
      badge: "🏝️ 제주 전문가",
      rank: 1,
    },
    {
      id: "2",
      username: "워케이션왕",
      avatar: "/placeholder.svg?height=40&width=40",
      level: 22,
      contributions: 38,
      badge: "💻 디지털 노마드",
      rank: 2,
    },
    {
      id: "3",
      username: "힐링마스터",
      avatar: "/placeholder.svg?height=40&width=40",
      level: 18,
      contributions: 32,
      badge: "🧘‍♀️ 힐링 전문가",
      rank: 3,
    },
  ]

  // 추천하는 달 데이터
  const recommendedMonths = [
    { month: "4월", reason: "벚꽃 시즌, 완벽한 날씨", votes: 23 },
    { month: "5월", reason: "신록의 계절, 관광객 적음", votes: 19 },
    { month: "10월", reason: "단풍과 선선한 날씨", votes: 15 },
  ]

  const InfoItem = ({ icon: Icon, label, value, hasEdit = true }: any) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-gray-600" />
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-gray-900">{value}</span>
        {hasEdit && (
          <button
            ref={(el) => (buttonRefs.current[label] = el)}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setPopupPosition({
                x: rect.left - 120, // 팝업을 버튼 왼쪽에 위치
                y: rect.top - 10,
              })

              if (
                label.includes("만족도") ||
                label.includes("수준") ||
                label.includes("편의성") ||
                label.includes("원활도") ||
                label.includes("친화도")
              ) {
                setShowScoreModal(label)
              }
            }}
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  )

  const TagItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <Badge
      variant="outline"
      className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1 cursor-pointer hover:bg-blue-100 transition-colors"
      onClick={onClick}
    >
      {children}
    </Badge>
  )

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `${rank}`
    }
  }

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score)
    console.log(`Selected score: ${score} for ${showScoreModal}`)
    setTimeout(() => {
      setShowScoreModal(null)
      setSelectedScore(null)
    }, 400)
  }

  const handleGroupEdit = (groupName: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPopupPosition({
      x: rect.left - 200, // 팝업을 버튼 왼쪽에 위치
      y: rect.top - 10,
    })
    setShowModal(groupName)
  }

  // 디지털 환경 데이터 정의 (기존 데이터 뒤에 추가)
  const digitalEnvironmentData = {
    satisfaction: {
      type: "score",
      title: "워케이션 환경 만족도",
      currentValue: 8,
      distribution: [2, 5, 8, 12, 18, 25, 15, 10, 3, 2], // 1-10점 분포
    },
    internetSpeed: {
      type: "number",
      title: "인터넷 평균 속도",
      currentValue: 100,
      unit: "Mbps",
      distribution: [5, 12, 25, 35, 45, 15], // 80-100 Mbps 구간(인덱스 4)이 가장 높음
      labels: ["0-20", "20-40", "40-60", "60-80", "80-100", "100+"],
    },
    powerStability: {
      type: "tags",
      title: "전력 안정성",
      tags: [
        { text: "정전 거의 없음", votes: 23 },
        { text: "전압 안정적", votes: 18 },
        { text: "가끔 정전", votes: 5 },
        { text: "전력 불안정", votes: 2 },
        { text: "UPS 필요", votes: 3 },
        { text: "콘센트 충분", votes: 15 },
        { text: "멀티탭 필수", votes: 8 },
        { text: "220V 안정", votes: 12 },
      ],
    },
    wifiAccess: {
      type: "tags",
      title: "무료 Wi-Fi 접근성",
      tags: [
        { text: "카페에서 매우 용이", votes: 28 },
        { text: "공공장소 WiFi 좋음", votes: 22 },
        { text: "호텔 WiFi 빠름", votes: 15 },
        { text: "WiFi 비밀번호 쉽게 구함", votes: 12 },
        { text: "도서관 WiFi 안정", votes: 10 },
        { text: "공항 WiFi 무료", votes: 18 },
        { text: "쇼핑몰 WiFi 빠름", votes: 14 },
        { text: "관광지 WiFi 느림", votes: 6 },
      ],
    },
    coworkingSpaces: {
      type: "places",
      title: "코워킹 스페이스",
      places: [
        { name: "제주 스페이스", price: "2만원/일", hours: "09:00-22:00", link: "https://maps.google.com" },
        { name: "워크라운지 제주", price: "1.5만원/일", hours: "24시간", link: "https://maps.google.com" },
        { name: "코워킹 아일랜드", price: "3만원/일", hours: "08:00-20:00", link: "https://maps.google.com" },
        { name: "제주 허브", price: "2.5만원/일", hours: "07:00-23:00", link: "https://maps.google.com" },
        { name: "아일랜드 워크", price: "1.8만원/일", hours: "09:00-21:00", link: "https://maps.google.com" },
        { name: "스마트 오피스", price: "3.5만원/일", hours: "24시간", link: "https://maps.google.com" },
      ],
    },
    cafes: {
      type: "places",
      title: "노트북 하기 좋은 카페",
      places: [
        { name: "바다뷰 카페", price: "아메리카노 5천원", hours: "07:00-22:00", link: "https://maps.google.com" },
        { name: "조용한 서재", price: "라떼 6천원", hours: "09:00-21:00", link: "https://maps.google.com" },
        { name: "힐링 카페", price: "아메리카노 4.5천원", hours: "08:00-20:00", link: "https://maps.google.com" },
        { name: "워크 카페", price: "라떼 5.5천원", hours: "06:00-24:00", link: "https://maps.google.com" },
        { name: "제주 로스터리", price: "드립커피 7천원", hours: "10:00-22:00", link: "https://maps.google.com" },
      ],
    },
    membership: {
      type: "tags",
      title: "단기 멤버십 정보",
      tags: [
        { text: "주단위 이용권 구매 용이", votes: 20 },
        { text: "일일권 저렴", votes: 15 },
        { text: "월 멤버십 할인", votes: 12 },
        { text: "체험권 제공", votes: 8 },
        { text: "학생 할인", votes: 6 },
        { text: "단체 할인", votes: 9 },
      ],
    },
  }

  // 인기 태그들
  const popularTags = {
    powerStability: ["정전 거의 없음", "전압 안정적", "콘센트 충분", "220V 안정"],
    wifiAccess: ["카페에서 매우 용이", "공공장소 WiFi 좋음", "호텔 WiFi 빠름"],
    membership: ["주단위 이용권 구매 용이", "일일권 저렴", "월 멤버십 할인"],
  }

  // 경험치 획득 함수
  const handleExpGain = (amount: number) => {
    setExpAmount(amount)
    setShowExpGain(true)
    setTimeout(() => setShowExpGain(false), 2000)
  }

  // 경험치 계산 함수
  const calculateExp = () => {
    let exp = 0
    if (digitalFormData.satisfaction) exp += 10
    if (digitalFormData.internetSpeed) exp += 10
    if (digitalFormData.powerStability) exp += 5
    if (digitalFormData.wifiAccess) exp += 5
    if (digitalFormData.coworkingSpace.name) exp += 15
    if (digitalFormData.cafe.name) exp += 15
    if (digitalFormData.membership) exp += 5
    return Math.min(exp, 100) // 최대 100 EXP
  }

  // 배경 스크롤 방지
  useEffect(() => {
    if (showDigitalGroupModal || showCostGroupModal) {
      // 팝업이 열릴 때 body 스크롤 방지
      document.body.style.overflow = "hidden"

      return () => {
        // 팝업이 닫힐 때 body 스크롤 복원
        document.body.style.overflow = "unset"
      }
    }
  }, [showDigitalGroupModal, showCostGroupModal])

  // 팝업 내부 스크롤 이벤트 처리
  const handleModalScroll = (e: React.WheelEvent) => {
    e.stopPropagation()

    const target = e.currentTarget as HTMLElement
    const { scrollTop, scrollHeight, clientHeight } = target

    // 스크롤이 맨 위나 맨 아래에 도달했을 때 추가 스크롤 방지
    if ((e.deltaY < 0 && scrollTop === 0) || (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)) {
      e.preventDefault()
    }
  }

  // 비용 환경 데이터 정의 (디지털 환경과 동일한 구조)
  const costEnvironmentData = {
    satisfaction: {
      type: "score",
      title: "물가 만족도",
      currentValue: 7,
      distribution: [1, 3, 5, 8, 15, 20, 18, 12, 8, 5], // 1-10점 분포
    },
    rent: {
      type: "complex",
      title: "월세 (원룸/스튜디오 기준)",
      currentValue: 130,
      unit: "만원",
      monthlyData: [
        { month: "1월", avgPrice: 120, count: 8 },
        { month: "2월", avgPrice: 125, count: 12 },
        { month: "3월", avgPrice: 135, count: 15 },
        { month: "4월", avgPrice: 140, count: 20 },
        { month: "5월", avgPrice: 145, count: 18 },
        { month: "6월", avgPrice: 150, count: 22 },
        { month: "7월", avgPrice: 160, count: 25 },
        { month: "8월", avgPrice: 155, count: 23 },
        { month: "9월", avgPrice: 140, count: 16 },
        { month: "10월", avgPrice: 135, count: 14 },
        { month: "11월", avgPrice: 125, count: 10 },
        { month: "12월", avgPrice: 120, count: 8 },
      ],
      priceDistribution: [5, 12, 25, 30, 20, 8], // 80-90, 90-100, 100-120, 120-140, 140-160, 160+ 만원
      priceLabels: ["80-90", "90-100", "100-120", "120-140", "140-160", "160+"],
    },
    utilities: {
      type: "breakdown",
      title: "공과금 (월평균)",
      items: [
        { name: "전기요금", avgCost: 8, unit: "만원", votes: 18 },
        { name: "가스요금", avgCost: 5, unit: "만원", votes: 15 },
        { name: "수도요금", avgCost: 3, unit: "만원", votes: 12 },
        { name: "인터넷", avgCost: 3, unit: "만원", votes: 20 },
      ],
    },
    initial: {
      type: "breakdown",
      title: "초기 정착 비용",
      tooltip: "보증금, 중개수수료, 첫 달 비품 구매 비용을 포함해요",
      items: [
        { name: "보증금", avgCost: 500, unit: "만원", votes: 25 },
        { name: "중개수수료", avgCost: 50, unit: "만원", votes: 18 },
        { name: "비품 구매비", avgCost: 30, unit: "만원", votes: 15 },
      ],
    },
    transportation: {
      type: "pie",
      title: "교통비 (월평균)",
      data: [
        { name: "대중교통", value: 60, cost: "7만원" },
        { name: "택시", value: 25, cost: "3만원" },
        { name: "렌터카", value: 15, cost: "2만원" },
      ],
    },
    communication: {
      type: "number",
      title: "통신비 (월평균)",
      currentValue: 10,
      unit: "만원",
      distribution: [5, 15, 25, 30, 20, 5], // 5-7, 7-9, 9-11, 11-13, 13-15, 15+ 만원
      labels: ["5-7", "7-9", "9-11", "11-13", "13-15", "15+"],
    },
    food: {
      type: "pie",
      title: "식비 (월평균)",
      totalCost: 60,
      unit: "만원",
      data: [
        { name: "외식", value: 70, cost: "42만원" },
        { name: "요리", value: 30, cost: "18만원" },
      ],
    },
    activities: {
      type: "places",
      title: "여가/액티비티",
      places: [
        {
          name: "한라산 등반",
          price: "무료",
          hours: "일출~일몰",
          link: "https://maps.google.com",
          tags: ["#혼자서", "#친구와", "#자연"],
          category: "자연/관광",
        },
        {
          name: "성산일출봉",
          price: "5천원",
          hours: "06:00-19:00",
          link: "https://maps.google.com",
          tags: ["#가족과", "#친구와", "#일출"],
          category: "자연/관광",
        },
        {
          name: "우도 관광",
          price: "왕복 5천원",
          hours: "08:00-17:00",
          link: "https://maps.google.com",
          tags: ["#가족과", "#데이트", "#섬"],
          category: "자연/관광",
        },
        {
          name: "제주 올레길",
          price: "무료",
          hours: "24시간",
          link: "https://maps.google.com",
          tags: ["#혼자서", "#친구와", "#트레킹"],
          category: "액티비티",
        },
        {
          name: "카약 체험",
          price: "3만원",
          hours: "09:00-18:00",
          link: "https://maps.google.com",
          tags: ["#친구와", "#액티비티", "#바다"],
          category: "액티비티",
        },
      ],
      categories: ["자연/관광", "액티비티", "문화/예술", "음식/카페"],
    },
    localPrices: {
      type: "items",
      title: "현지 물가 수준",
      items: [
        { name: "아메리카노", price: "4,500원", votes: 28 },
        { name: "라면", price: "3,000원", votes: 22 },
        { name: "김밥", price: "3,500원", votes: 20 },
        { name: "치킨", price: "18,000원", votes: 18 },
        { name: "맥주 (편의점)", price: "2,500원", votes: 15 },
        { name: "택시 기본요금", price: "3,800원", votes: 12 },
      ],
    },
    flights: {
      type: "places",
      title: "항공권 (왕복)",
      places: [
        {
          name: "제주항공",
          price: "15만원",
          hours: "직항 1시간",
          link: "https://maps.google.com",
          type: "직항",
          priceLevel: "저렴",
        },
        {
          name: "대한항공",
          price: "25만원",
          hours: "직항 1시간",
          link: "https://maps.google.com",
          type: "직항",
          priceLevel: "보통",
        },
        {
          name: "아시아나항공",
          price: "23만원",
          hours: "직항 1시간",
          link: "https://maps.google.com",
          type: "직항",
          priceLevel: "보통",
        },
      ],
    },
  }

  // TransportCard 에 전달할 데이터 구조 (간단 샘플)
  const transportEnvironmentCardData = {
    title: "🚌 교통 환경",
    contributorCount: 14,
    // 버블 차트·그래프에 들어갈 예시 숫자들
    modes: [
      { mode: "대중교통", cost: 7, usage: 60 }, // cost 만원, usage %
      { mode: "택시", cost: 3, usage: 25 },
      { mode: "렌터카", cost: 2, usage: 15 },
    ],
    satisfaction: { value: 6, maxValue: 10 },
    // 필요할 수 있는 추가 필드
    modalData: costEnvironmentData.transportation,
  }

  // LocalExperienceCard 에 전달할 데이터 구조
  const localExperienceCardData = {
    title: "💬 로컬 경험&커뮤니티",
    contributorCount: 12,
    friendliness: {
      value: 8.5,
      maxValue: 10,
    },
    englishCommunication: {
      status: "원활함",
    },
    neighborhoodVibe: {
      description: "정이 많아요",
    },
    learningOpportunities: {
      count: "3곳+",
    },
    detailItems: [
      { icon: Heart, label: "동네 인심&분위기", value: "매우 따뜻함" },
      { icon: Globe, label: "영어 소통 원활도", value: "대부분 가능" },
      { icon: Users, label: "커뮤니티/소셜", value: "활발함" },
      { icon: BookOpen, label: "배움/클래스 정보", value: "요가, 쿠킹클래스" },
      { icon: Palette, label: "로컬 문화체험 기회", value: "전통공예, 축제" },
      { icon: Baby, label: "어린이 체험/교육", value: "키즈카페, 놀이터" },
    ],
  }

  // ConvenienceCard 에 전달할 데이터 구조
  const convenienceData = {
    title: "🛍️ 현지생활 편의성",
    contributorCount: 16,
    satisfaction: {
      value: 8.2,
      maxValue: 10,
    },
    deliveryConvenience: {
      status: "매우 편리함",
    },
    storeAccess: {
      description: "도보 5분 내",
    },
  }

  // BasicInfoCard 에 전달할 데이터 구조
  const basicInfoData = {
    language: "한국어",
    visa: "무비자 (국내)",
    currency: "원화 (KRW)",
    timeZone: "UTC+9 (시차 없음)",
    powerOutlet: "220V / A, C타입",
    religion: "불교, 기독교 등",
  }

  // 비용 모달 열기 함수
  const openCostModal = (key: string) => {
    setCostModalType(key)
    setCostModalData(costEnvironmentData[key])
  }

  // 비용 모달 컴포넌트들 추가
  const CostModal = ({ type, data, onClose }: { type: string; data: any; onClose: () => void }) => {
    const [formData, setFormData] = useState<any>({})

    if (!data) return null

    const renderContent = () => {
      switch (data.type) {
        case "score":
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{data.currentValue}/10</div>
                <p className="text-gray-600">현재 평균 점수</p>
              </div>

              {/* 점수 분포 막대그래프 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">점수 분포</h3>
                <div className="space-y-1">
                  {data.distribution.map((count: number, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-6 text-sm text-gray-600">{index + 1}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${(count / Math.max(...data.distribution)) * 100}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-gray-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 점수 입력 버튼들 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">내 점수 매기기</h3>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      onClick={() => {
                        handleExpGain(10)
                        onClose()
                      }}
                      className="w-full h-12 bg-gray-100 hover:bg-blue-100 rounded-lg font-semibold text-gray-700 hover:text-blue-700 transition-colors"
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )

        case "complex":
          return (
            <div className="space-y-6">
              {/* 상단: 월별 평균가 막대그래프 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">월별 평균 월세</h3>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {data.monthlyData.map((month: any) => (
                    <div key={month.month} className="text-center">
                      <div className="h-20 bg-gray-200 rounded-lg mb-2 flex items-end justify-center p-1">
                        <div
                          className="bg-blue-600 rounded w-full transition-all duration-500"
                          style={{ height: `${(month.avgPrice / 160) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600">{month.month}</div>
                      <div className="text-xs font-semibold text-gray-900">{month.avgPrice}만원</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 가격 분포도 히스토그램 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">가격 분포</h3>
                <div className="space-y-2">
                  {data.priceDistribution.map((count: number, index: number) => {
                    const percentage = (count / Math.max(...data.priceDistribution)) * 100
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="w-16 text-sm text-gray-600">{data.priceLabels[index]}만원</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-gray-600">{count}명</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 하단: 입력 필드들 */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">내 정보 입력</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">체류 시기</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map(
                        (month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">주거 형태</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>원룸</option>
                      <option>투룸</option>
                      <option>오피스텔</option>
                      <option>아파트</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">방 규모</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>10평 미만</option>
                      <option>10-15평</option>
                      <option>15-20평</option>
                      <option>20평 이상</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">위치 특징</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>시내 중심가</option>
                      <option>주택가</option>
                      <option>해안가</option>
                      <option>산간지역</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">가격 범위 (만원)</label>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    className="w-full"
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>80만원</span>
                    <span className="font-semibold">{formData.price || 130}만원</span>
                    <span>200만원</span>
                  </div>
                </div>
              </div>
            </div>
          )

        case "breakdown":
          return (
            <div className="space-y-6">
              {/* 상단: 항목별 평균 비용 비교 그래프 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">항목별 평균 비용</h3>
                <div className="space-y-3">
                  {data.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(item.avgCost / Math.max(...data.items.map((i: any) => i.avgCost))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-semibold text-gray-900 w-16">
                          {item.avgCost}
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 하단: 각 항목별 숫자 입력 필드 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">내 비용 입력</h3>
                <div className="space-y-3">
                  {data.items.map((item: any, index: number) => (
                    <div key={index}>
                      <label className="block text-sm text-gray-700 mb-1">{item.name}</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder={item.avgCost.toString()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <span className="text-gray-600">{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )

        case "pie":
          return (
            <div className="space-y-6">
              {/* 상단: 교통수단별/외식요리별 지출 분포 파이 차트 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">지출 분포</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {data.data.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: `hsl(${index * 120}, 70%, 50%)` }}
                          />
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{item.value}%</div>
                          <div className="text-sm text-gray-600">{item.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                      <span className="text-white font-bold">분포도</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단: 입력 필드 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">내 정보 입력</h3>
                {type === "transportation" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">주요 교통수단</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>대중교통</option>
                        <option>택시</option>
                        <option>렌터카</option>
                        <option>도보/자전거</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">월 교통비</label>
                      <input
                        type="number"
                        placeholder="12"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">세부 내용</label>
                      <textarea
                        placeholder="버스 정기권, 택시 이용 빈도 등"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">월 식비 총액</label>
                      <input
                        type="number"
                        placeholder="60"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">외식/요리 비중</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="foodType" value="외식위주" className="mr-2" />
                          외식 위주
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="foodType" value="요리위주" className="mr-2" />
                          요리 위주
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="foodType" value="균형" className="mr-2" />
                          균형
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )

        case "number":
          return (
            <div className="space-y-6">
              {/* 상단: 가격 분포 히스토그램 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">가격 분포</h3>
                <div className="space-y-2">
                  {data.distribution.map((count: number, index: number) => {
                    const percentage = (count / Math.max(...data.distribution)) * 100
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="w-12 text-sm text-gray-600">{data.labels[index]}만원</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-gray-600">{count}명</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 하단: 숫자 입력 필드 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">내 비용 입력</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder={data.currentValue.toString()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <span className="text-gray-600">{data.unit}</span>
                </div>
              </div>
            </div>
          )

        case "places":
          return (
            <div className="space-y-6">
              {/* 상단: 카테고리별 지출 분포 그래프 (액티비티용) */}
              {type === "activities" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">카테고리별 활동 분포</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {data.categories.map((category: string, index: number) => {
                      const count = data.places.filter((place: any) => place.category === category).length
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{category}</span>
                          <span className="font-semibold text-gray-900">{count}개</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 기존 장소 목록 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">추천 {data.title}</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {data.places.map((place: any, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{place.name}</h4>
                        <span className="text-sm font-semibold text-blue-600">{place.price}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{place.hours}</div>
                      {place.tags && (
                        <div className="flex flex-wrap gap-1">
                          {place.tags.map((tag: string, tagIndex: number) => (
                            <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 하단: 새 항목 추가 UI */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">새 {data.title} 추가</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="활동명/장소명"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input type="text" placeholder="가격" className="px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <input
                    type="url"
                    placeholder="링크 (선택사항)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  {type === "activities" && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">태그 (여러 개 선택 가능)</label>
                      <div className="flex flex-wrap gap-2">
                        {["#혼자서", "#친구와", "#가족과", "#아이랑", "#데이트", "#자연", "#액티비티", "#문화"].map(
                          (tag) => (
                            <button
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700"
                            >
                              {tag}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )

        case "items":
          return (
            <div className="space-y-6">
              {/* 상단: 품목별 공감 수 순위 그래프 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">품목별 공감 순위</h3>
                <div className="space-y-2">
                  {data.items.map((item: any, index: number) => {
                    const percentage = (item.votes / Math.max(...data.items.map((i: any) => i.votes))) * 100
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="w-20 text-sm text-gray-900 font-medium">{item.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm font-semibold text-gray-900">{item.price}</span>
                        <span className="w-8 text-sm text-gray-600">{item.votes}명</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 하단: 품목과 가격을 입력하는 리스트 추가형 UI */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">새 품목 추가</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="품목명 (예: 아메리카노)"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="가격 (예: 4,500원)"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">품목 추가</button>
                </div>
              </div>
            </div>
          )

        default:
          return <div>데이터를 불러올 수 없습니다.</div>
      }
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleModalScroll}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {renderContent()}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  handleExpGain(calculateExp())
                  onClose()
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                저장하기 (+{calculateExp()} EXP)
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50"
              >
                취소
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // 비용 그룹 모달 추가
  const CostGroupModal = ({ onClose }: { onClose: () => void }) => {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: -100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: -100 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">💰 한달살기 비용 정보 입력</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">어떤 정보를 입력하시겠어요?</p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    onClose()
                    openCostModal("satisfaction")
                  }}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <div className="font-semibold text-gray-900">물가 만족도</div>
                  <div className="text-sm text-gray-600">전반적인 물가 수준에 대한 평가</div>
                </button>

                <button
                  onClick={() => {
                    onClose()
                    openCostModal("rent")
                  }}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <div className="font-semibold text-gray-900">월세 정보</div>
                  <div className="text-sm text-gray-600">숙소 유형별 월세 정보</div>
                </button>

                <button
                  onClick={() => {
                    onClose()
                    openCostModal("utilities")
                  }}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <div className="font-semibold text-gray-900">공과금</div>
                  <div className="text-sm text-gray-600">전기, 가스, 수도, 인터넷 비용</div>
                </button>

                <button
                  onClick={() => {
                    onClose()
                    openCostModal("activities")
                  }}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <div className="font-semibold text-gray-900">여가/액티비티</div>
                  <div className="text-sm text-gray-600">추천 활동과 비용 정보</div>
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
            >
              닫기
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // 경험치 획득 애니메이션 추가
  const ExpGainAnimation = ({ show, amount }: { show: boolean; amount: number }) => {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>+{amount} EXP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // WorkationCard에 전달할 데이터 구조
  const workationEnvironmentCardData = {
    title: "💻 디지털/업무 환경",
    contributorCount: 18,
    satisfaction: {
      value: 8,
      maxValue: 10,
    },
    internetSpeed: {
      value: "100",
      unit: "Mbps",
    },
    coworkingSpaces: {
      count: "5곳+",
      description: "코워킹 스페이스",
    },
    powerStability: {
      status: "매우안정",
    },
    detailItems: [
      { icon: Wifi, label: "인터넷 평균 속도", value: "100Mbps", modalKey: "internetSpeed" },
      { icon: Zap, label: "전력 안정성", value: "정전 거의 없음", modalKey: "powerStability" },
      { icon: Wifi, label: "무료 Wi-Fi 접근성", value: "카페, 공공장소에서 매우 용이", modalKey: "wifiAccess" },
      { icon: Coffee, label: "코워킹 스페이스", value: "5곳 이상 / 1일 평균 2만원", modalKey: "coworkingSpaces" },
      { icon: Coffee, label: "노트북 하기 좋은 카페", value: "사용자 추천 장소 2~3곳", modalKey: "cafes" },
      { icon: Calendar, label: "단기 멤버십 정보", value: "주(Week)단위 이용권 구매 용이", modalKey: "membership" },
    ],
    modalData: digitalEnvironmentData,
  }

  // CostBudgetCard에 전달할 데이터 구조
  const costBudgetCardData = {
    title: "💰 한달살기 비용",
    contributorCount: 23,
    satisfaction: {
      value: costData.satisfaction,
      maxValue: 10,
    },
    totalEstimate: costData.totalEstimate,
    rentMedian: costData.rentMedian,
    essentialCost: "45만원",
    detailItems: [
      { icon: TrendingUp, label: "물가 만족도", value: "7/10", modalKey: "satisfaction" },
      { icon: Home, label: "월세 (원룸/스튜디오 기준)", value: costData.rentMedian, modalKey: "rent" },
      { icon: Zap, label: "공과금 (월평균)", value: "16만원", modalKey: "utilities" },
      { icon: CreditCard, label: "초기 정착 비용", value: "보증금 평균 500만원", modalKey: "initial" },
      ...(cityData.isOverseas
        ? [{ icon: Globe, label: "항공권 (왕복)", value: costData.flightCost, modalKey: "flights" }]
        : []),
      { icon: Car, label: "교통비 (월평균)", value: costData.transportation, hasEdit: true },
      { icon: Phone, label: "통신비 (월평균)", value: "8-12만원", hasEdit: true },
      { icon: Coffee, label: "식비 (월평균)", value: "60만원", hasEdit: true },
      {
        icon: Calendar,
        label: "여가/액티비티",
        value: `사용자 추천 ${costData.activities.length}곳`,
        modalKey: "activities",
      },
      { icon: DollarSign, label: "현지 물가 수준", value: "☕️커피 4,500원 등", modalKey: "localPrices" },
    ],
    isOverseas: cityData.isOverseas,
    flightCost: costData.flightCost,
    modalData: costEnvironmentData,
  }

  // 생활환경 데이터 정의
  const livingEnvironmentData = {
    title: "🏠 생활환경",
    contributorCount: 18,
    satisfaction: {
      value: 8.5,
      maxValue: 10,
    },
    airQuality: {
      status: "매우 좋음",
    },
    noiseLevel: {
      description: "조용함",
    },
    detailItems: [
      { icon: TrendingUp, label: "생활환경 만족도", value: "8.5/10" },
      { icon: Zap, label: "대기질", value: "매우 좋음" },
      { icon: Home, label: "소음 수준", value: "조용함" },
      { icon: Coffee, label: "카페/작업공간 접근성", value: "도보 3분 내" },
      { icon: Wifi, label: "인터넷 인프라", value: "매우 안정적" },
      { icon: Car, label: "주차 편의성", value: "여유로움" },
      { icon: MapPin, label: "주요 시설 접근성", value: "편리함" },
      { icon: Phone, label: "통신 품질", value: "우수함" },
    ],
  }

  const cityName = cityData.name
  const countryName = cityData.country

  return (
    <div className="min-h-screen bg-slate-50">
      <CityDetailHeader
        cityName={cityName}
        countryName={countryName}
        scrolled={scrolled}
        navItems={navItems}
        onScrollToSection={scrollToSection}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mx-6 lg:mx-8 pb-8">
          {/* 도시 프로필 카드 */}
          <div ref={cityProfileRef}>
            <CityProfileCard cityData={cityData} topContributors={topContributors} />
          </div>

          {/* 본문 영역 (전체 너비) */}
          <div className="space-y-8">
            {/* B. 이 도시, 나랑 맞을까? (레이더 차트) */}
            <div ref={compatibilityRef}>
              <CityCompatibilityCard cityName={cityData.name} radarData={radarData} />
            </div>

            {/* D. 상세 데이터 카드들 */}

            {/* 💰 한달살기 비용 카드 - CostBudgetCard 컴포넌트 사용 */}
            <div ref={costRef}>
              <CostBudgetCard cardData={costBudgetCardData} onExpGain={handleExpGain} />
            </div>

            {/* 💻 디지털/업무 환경 카드 - WorkationCard 컴포넌트 사용 */}
            <div ref={workationRef}>
              <WorkationCard cardData={workationEnvironmentCardData} onExpGain={handleExpGain} />
            </div>

            {/* 🛡️ 안전 및 의료 카드 - SafetyMedicalCard 컴포넌트 사용 */}
            <div ref={safetyRef}>
              <SafetyMedicalCard />
            </div>

            {/* Living Environment Card */}
            <div ref={livingRef}>
              <LivingEnvironmentCard {...livingEnvironmentData} />
            </div>

            {/* Convenience Card */}
            <div ref={convenienceRef}>
              <ConvenienceCard {...convenienceData} />
            </div>

            {/* Transport Card */}
            <div ref={transportRef}>
              <TransportCard cardData={transportEnvironmentCardData} />
            </div>

            {/* Local Experience Card */}
            <div ref={localRef}>
              <LocalExperienceCard cardData={localExperienceCardData} />
            </div>

            {/* Basic Info Card */}
            <div ref={basicRef}>
              <BasicInfoCard cardData={basicInfoData} />
            </div>

            {/* Recommended Months Card */}
            <div ref={monthsRef}>
              <RecommendedMonthsCard />
            </div>

            {/* City Vibe Card */}
            <div ref={vibeRef}>
              <CityVibeCard onExpGain={handleExpGain} />
            </div>
          </div>
        </div>
      </div>
      {/* Add extra spacing at bottom */}
      <div style={{ height: "200px" }} />
    </div>
  )
}
