"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Button } from "@/components/monthlog-proto/ui/button"
import { Badge } from "@/components/monthlog-proto/ui/badge"
import { ArrowLeft, Trophy, MapPin, TrendingUp, Zap, Target, BarChart3, Edit, Share2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/monthlog-proto/ui/avatar"
import { Progress } from "@/components/monthlog-proto/ui/progress"
import { JourneyMap } from "@/components/monthlog-proto/profile/journey-map"

interface UserProfile {
  id: string
  username: string
  avatar: string
  level: number
  currentExp: number
  nextLevelExp: number
  totalExp: number
  title: string
  joinDate: string
  lastActive: string
  bio: string
  stats: {
    totalContributions: number
    citiesContributed: number
    dataPointsAdded: number
    badgesEarned: number
    helpfulVotes: number
    photoShared: number
    pioneeredCities: number
    vibePhotos: number
  }
  badges: Array<{
    id: string
    name: string
    description: string
    earnedAt: string
    category: string
    rarity: "common" | "rare" | "epic" | "legendary"
    icon: string
  }>
  journeys: Array<{
    id: string
    city: string
    country: string
    duration: string
    period: string
    rating: number
    summary: string
    image: string
    contributions: number
    exp: number
    lat: number
    lng: number
    startDate: string
    endDate: string
    memo: string
    photos: string[]
    revisitScore: number
    isContributed: boolean
  }>
  recentActivity: Array<{
    id: string
    type: string
    description: string
    exp: number
    timestamp: string
  }>
  expHistory: Array<{
    id: string
    type: "earned" | "received"
    description: string
    exp: number
    timestamp: string
    source?: string
  }>
  pioneeredCities: Array<{
    id: string
    city: string
    status: "active" | "inactive"
    contributions: number
    exp: number
    lastActivity: string
  }>
}

const levelTitles: { [key: number]: string } = {
  1: "호기심 많은 골목 탐험가",
  5: "꼼꼼한 골목 탐험가",
  10: "자신감 있는 골목 탐험가",
  11: "용감한 도시 유랑자",
  20: "여유로운 도시 유랑자",
  30: "성실한 도시 유랑자",
  31: "지치지 않는 대륙 방랑자",
  40: "노련한 대륙 방랑자",
  50: "지혜로운 대륙 방랑자",
}

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user_001",
    username: "애나",
    avatar: "/images/profile-avatar.png",
    level: 15,
    currentExp: 2340,
    nextLevelExp: 3000,
    totalExp: 12340,
    title: "여유로운 도시 유랑자",
    joinDate: "2024-01-01",
    lastActive: "방금 전",
    bio: "도시별 반반살이하는 디지털노마드 애나입니다.",
    stats: {
      totalContributions: 47,
      citiesContributed: 8,
      dataPointsAdded: 156,
      badgesEarned: 12,
      helpfulVotes: 89,
      photoShared: 23,
      pioneeredCities: 5,
      vibePhotos: 18,
    },
    badges: [
      {
        id: "first_step",
        name: "첫 발자국",
        description: "첫 번째 정보를 입력했습니다",
        earnedAt: "2024-01-02",
        category: "활동",
        rarity: "common",
        icon: "👣",
      },
      {
        id: "data_contributor",
        name: "정보의 조각",
        description: "10개의 정보를 입력했습니다",
        earnedAt: "2024-01-05",
        category: "활동",
        rarity: "common",
        icon: "🧩",
      },
      {
        id: "jeju_pioneer",
        name: "제주 개척자",
        description: "제주도 정보에 기여했습니다",
        earnedAt: "2024-01-03",
        category: "지역",
        rarity: "rare",
        icon: "🏝️",
      },
      {
        id: "digital_expert",
        name: "디지털 유목민",
        description: "디지털/업무 환경 전문가",
        earnedAt: "2024-01-10",
        category: "전문성",
        rarity: "epic",
        icon: "💻",
      },
    ],
    journeys: [
      {
        id: "bali-2023-09",
        city: "발리",
        country: "인도네시아",
        duration: "60일",
        period: "2023.09 - 2023.10",
        rating: 7,
        summary: "아름다운 자연과 저렴한 생활비",
        image: "/placeholder.svg?height=150&width=200",
        contributions: 8,
        exp: 80,
        lat: -8.3405,
        lng: 115.092,
        startDate: "2023-09-01",
        endDate: "2023-10-30",
        memo: "아름다운 자연과 저렴한 생활비",
        photos: [],
        revisitScore: 7,
        isContributed: true,
      },
      {
        id: "chiang-mai-2023-11",
        city: "치앙마이",
        country: "태국",
        duration: "45일",
        period: "2023.11 - 2023.12",
        rating: 8,
        summary: "저렴한 비용과 좋은 날씨, 디지털 노마드 천국",
        image: "/placeholder.svg?height=150&width=200",
        contributions: 12,
        exp: 120,
        lat: 18.7883,
        lng: 98.9853,
        startDate: "2023-11-01",
        endDate: "2023-12-15",
        memo: "저렴한 비용과 좋은 날씨, 디지털 노마드 천국",
        photos: [],
        revisitScore: 8,
        isContributed: true,
      },
      {
        id: "jeju-2024-01",
        city: "제주도",
        country: "한국",
        duration: "30일",
        period: "2024.01 - 2024.02",
        rating: 9,
        summary: "완벽한 워케이션 환경과 힐링이 가능한 곳",
        image: "/placeholder.svg?height=150&width=200",
        contributions: 15,
        exp: 150,
        lat: 33.4996,
        lng: 126.5312,
        startDate: "2024-01-01",
        endDate: "2024-01-30",
        memo: "완벽한 워케이션 환경과 힐링이 가능한 곳",
        photos: [],
        revisitScore: 9,
        isContributed: true,
      },
    ],
    recentActivity: [
      {
        id: "act_001",
        type: "데이터 입력",
        description: "제주도 > 비용 정보 > 월세 데이터 입력",
        exp: 10,
        timestamp: "2시간 전",
      },
      {
        id: "act_002",
        type: "태그 공감",
        description: "치앙마이 > 안전 정보 > #소매치기 거의 없음 공감",
        exp: 2,
        timestamp: "5시간 전",
      },
    ],
    expHistory: [
      {
        id: "exp_001",
        type: "earned",
        description: "제주도 월세 정보 입력",
        exp: 10,
        timestamp: "2시간 전",
      },
      {
        id: "exp_002",
        type: "received",
        description: "다른 사용자가 내 정보에 공감",
        exp: 5,
        timestamp: "3시간 전",
        source: "user_002",
      },
    ],
    pioneeredCities: [
      {
        id: "jeju",
        city: "제주도",
        status: "active",
        contributions: 15,
        exp: 150,
        lastActivity: "2시간 전",
      },
      {
        id: "chiang-mai",
        city: "치앙마이",
        status: "active",
        contributions: 12,
        exp: 120,
        lastActivity: "1일 전",
      },
    ],
  })

  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showExpGain, setShowExpGain] = useState(false)
  const [expGainAmount, setExpGainAmount] = useState(0)
  const [activeTab, setActiveTab] = useState<"journey" | "pioneered" | "exp" | "badges">("journey")
  const [showEditModal, setShowEditModal] = useState(false)

  const gainExp = (amount: number) => {
    const newCurrentExp = userProfile.currentExp + amount
    const newTotalExp = userProfile.totalExp + amount

    setExpGainAmount(amount)
    setShowExpGain(true)
    setTimeout(() => setShowExpGain(false), 2000)

    if (newCurrentExp >= userProfile.nextLevelExp) {
      const newLevel = userProfile.level + 1
      const newTitle = levelTitles[newLevel] || userProfile.title
      const remainingExp = newCurrentExp - userProfile.nextLevelExp
      const newNextLevelExp = Math.floor(userProfile.nextLevelExp * 1.5)

      setUserProfile((prev) => ({
        ...prev,
        level: newLevel,
        currentExp: remainingExp,
        nextLevelExp: newNextLevelExp,
        totalExp: newTotalExp,
        title: newTitle,
      }))

      setShowLevelUp(true)
      setTimeout(() => setShowLevelUp(false), 4000)
    } else {
      setUserProfile((prev) => ({
        ...prev,
        currentExp: newCurrentExp,
        totalExp: newTotalExp,
      }))
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userProfile.username}의 프로필`,
        text: `${userProfile.bio}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-slate-100 text-slate-600 border-slate-200"
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  // 홈화면과 동일한 프로필 섹션 디자인
  const expPercentage = (userProfile.currentExp / userProfile.nextLevelExp) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* EXP Gain Animation */}
      <AnimatePresence>
        {showExpGain && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>+{expGainAmount} EXP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: -100, rotate: -10 }}
              animate={{ y: 0, rotate: 0 }}
              className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: 1,
                }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">레벨 업!</h2>
              <p className="text-lg text-slate-600 mb-4">새로운 칭호를 획득했습니다</p>
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                Lv. {userProfile.level} {userProfile.title}
              </Badge>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - 도시 상세페이지와 동일한 스타일 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/monthlog-proto">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100/50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                홈으로
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-gray-900">내 프로필</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditModal(true)}
                className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 bg-transparent"
              >
                <Edit className="h-4 w-4 mr-1" />
                편집
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-1" />
                공유
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Journey Map Component */}
      <div className="mt-16">
        <JourneyMap journeys={userProfile.journeys} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* 닉네임 + 자기소개 영역 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{userProfile.username}</h1>
          <p className="text-lg text-gray-600">{userProfile.bio}</p>
        </div>

        {/* Profile Header - 홈화면과 동일한 디자인 */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-sm border border-gray-100 inline-block">
            <div className="flex items-center space-x-6">
              {/* Profile Image and Level */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userProfile.avatar || "/images/profile-avatar.png"} />
                  <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                    {userProfile.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-bold text-gray-900">Lv.{userProfile.level}</div>
                  <div className="text-sm text-gray-500">레벨</div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gray-200" />

              {/* Title */}
              <div>
                <div className="text-lg font-semibold text-gray-900">{userProfile.title}</div>
                <div className="text-sm text-gray-500">현재 칭호</div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gray-200" />

              {/* Progress */}
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <Progress value={expPercentage} className="w-32 h-2" />
                  <span className="text-sm font-medium text-gray-700">{Math.round(expPercentage)}%</span>
                </div>
                <div className="text-sm text-gray-500">
                  {userProfile.currentExp} / {userProfile.nextLevelExp} EXP
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("journey")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "journey" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MapPin className="h-4 w-4 inline mr-2" />
              여정 기록
            </button>
            <button
              onClick={() => setActiveTab("pioneered")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "pioneered" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Target className="h-4 w-4 inline mr-2" />
              개척한 도시
            </button>
            <button
              onClick={() => setActiveTab("exp")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "exp" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-2" />
              경험치 히스토리
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "badges" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Trophy className="h-4 w-4 inline mr-2" />
              뱃지 컬렉션
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "journey" && (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="flex items-center space-x-2 text-gray-900">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <span>나의 여정 기록</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {userProfile.journeys.map((journey, index) => (
                        <motion.div
                          key={journey.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <img
                            src={journey.image || "/placeholder.svg"}
                            alt={journey.city}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">{journey.city}</h3>
                                <p className="text-sm text-gray-600">
                                  {journey.country} • {journey.duration}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-blue-600">{journey.exp} EXP</div>
                                <div className="text-xs text-gray-500">획득 경험치</div>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 mb-3">{journey.summary}</p>

                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                {journey.period} • 재방문 의향: {journey.revisitScore}/10
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-gray-200 text-gray-600 text-xs bg-transparent"
                                >
                                  수정
                                </Button>
                                {!journey.isContributed && (
                                  <Button size="sm" className="bg-blue-600 text-white text-xs hover:bg-blue-700">
                                    개척하기
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                      >
                        새로운 여정 기록하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "pioneered" && (
              <motion.div
                key="pioneered"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="flex items-center space-x-2 text-gray-900">
                      <Target className="h-5 w-5 text-gray-600" />
                      <span>내가 개척한 도시</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {userProfile.pioneeredCities.map((city) => (
                        <div key={city.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-900">{city.city}</h3>
                            <Badge
                              className={
                                city.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                              }
                            >
                              {city.status === "active" ? "활성" : "비활성"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>
                              {city.contributions}개 기여 • {city.exp} EXP
                            </span>
                            <span>마지막 활동: {city.lastActivity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "exp" && (
              <motion.div
                key="exp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="flex items-center space-x-2 text-gray-900">
                      <BarChart3 className="h-5 w-5 text-gray-600" />
                      <span>경험치 히스토리</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {userProfile.expHistory.map((exp) => (
                        <div key={exp.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-900">{exp.description}</p>
                            <p className="text-sm text-gray-600">{exp.timestamp}</p>
                            {exp.source && <p className="text-xs text-blue-600">공감한 사용자: {exp.source}</p>}
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${exp.type === "earned" ? "text-green-600" : "text-blue-600"}`}>
                              +{exp.exp} EXP
                            </div>
                            <div className="text-xs text-gray-500">
                              {exp.type === "earned" ? "직접 획득" : "공감 획득"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "badges" && (
              <motion.div
                key="badges"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="flex items-center space-x-2 text-gray-900">
                      <Trophy className="h-5 w-5 text-gray-600" />
                      <span>뱃지 컬렉션</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
                        {userProfile.badges.length}개
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {userProfile.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`border rounded-xl p-4 text-center hover:shadow-md transition-shadow ${getRarityColor(
                            badge.rarity,
                          )}`}
                        >
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                          <p className="text-xs opacity-75 mb-2">{badge.description}</p>
                          <Badge variant="outline" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    {/* 기본 뱃지 독려 */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4 text-center">🎯 다음 뱃지를 노려보세요!</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-medium">데이터 마스터</span>
                            <span className="text-gray-600 text-sm">50개 데이터 입력</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">30/50 (20개 더 필요)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Statistics */}
          <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <span>활동 통계</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{userProfile.stats.pioneeredCities}</div>
                  <div className="text-sm text-gray-600">개척한 도시</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{userProfile.stats.citiesContributed}</div>
                  <div className="text-sm text-gray-600">기여한 도시</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{userProfile.stats.dataPointsAdded}</div>
                  <div className="text-sm text-gray-600">기록한 데이터</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{userProfile.stats.vibePhotos}</div>
                  <div className="text-sm text-gray-600">도시분위기 사진</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{userProfile.stats.badgesEarned}</div>
                  <div className="text-sm text-gray-600">획득한 뱃지</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{userProfile.totalExp}</div>
                  <div className="text-sm text-gray-600">총 경험치</div>
                </div>
              </div>

              {/* Test Buttons */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <p className="text-sm text-gray-600 mb-4">경험치 테스트</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => gainExp(10)}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    +10 EXP
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => gainExp(50)}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    +50 EXP
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => gainExp(100)}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    +100 EXP
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => gainExp(1000)}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    +1000 EXP
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">프로필 편집</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">프로필 이미지</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={userProfile.avatar || "/images/profile-avatar.png"}
                      alt="프로필"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <Button variant="outline" size="sm">
                      이미지 변경
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">한줄소개</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows={3}
                    defaultValue={userProfile.bio}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    취소
                  </Button>
                  <Button onClick={() => setShowEditModal(false)}>저장</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
