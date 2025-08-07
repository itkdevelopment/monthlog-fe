"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Star, TrendingUp, Users } from "lucide-react"

interface LeaderboardUser {
  id: string
  username: string
  avatar: string
  level: number
  totalExp: number
  totalContributions: number
  citiesContributed: number
  rank: number
  title: string
  monthlyContributions: number
  streak: number
}

const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    username: "여행마니아김",
    avatar: "/images/new-profile-avatar.jpg",
    level: 15,
    totalExp: 12500,
    totalContributions: 89,
    citiesContributed: 12,
    rank: 1,
    title: "글로벌 노마드",
    monthlyContributions: 23,
    streak: 15,
  },
  {
    id: "2",
    username: "디지털노마드박",
    avatar: "/images/new-profile-avatar.jpg",
    level: 13,
    totalExp: 10800,
    totalContributions: 76,
    citiesContributed: 10,
    rank: 2,
    title: "도시 탐험가",
    monthlyContributions: 19,
    streak: 12,
  },
  {
    id: "3",
    username: "한달살기이",
    avatar: "/images/new-profile-avatar.jpg",
    level: 12,
    totalExp: 9200,
    totalContributions: 64,
    citiesContributed: 8,
    rank: 3,
    title: "여행 전문가",
    monthlyContributions: 16,
    streak: 8,
  },
  {
    id: "4",
    username: "워케이션최",
    avatar: "/images/new-profile-avatar.jpg",
    level: 11,
    totalExp: 8500,
    totalContributions: 58,
    citiesContributed: 7,
    rank: 4,
    title: "리모트 워커",
    monthlyContributions: 14,
    streak: 6,
  },
  {
    id: "5",
    username: "백패커정",
    avatar: "/images/new-profile-avatar.jpg",
    level: 10,
    totalExp: 7800,
    totalContributions: 52,
    citiesContributed: 6,
    rank: 5,
    title: "모험가",
    monthlyContributions: 12,
    streak: 5,
  },
]

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"total" | "monthly">("total")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600"
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">리더보드</h1>
          <p className="text-xl text-gray-600">최고의 기여자들을 만나보세요</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab("total")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "total" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              전체 랭킹
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "monthly" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              이달의 랭킹
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-sm text-gray-600">총 기여자</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">5,678</div>
              <div className="text-sm text-gray-600">총 기여 수</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-600">등록된 도시</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>{activeTab === "total" ? "전체 랭킹" : "이달의 랭킹"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockLeaderboardData.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                    index < 3 ? "bg-gradient-to-r from-blue-50 to-transparent" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">{getRankIcon(user.rank)}</div>

                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">{user.username[0]}</AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{user.username}</h3>
                        <Badge className={`${getRankBadgeColor(user.rank)} text-white border-0 px-2 py-1`}>
                          Lv. {user.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{user.title}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-8 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {activeTab === "total" ? user.totalContributions : user.monthlyContributions}
                      </div>
                      <div className="text-gray-600">기여</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{user.citiesContributed}</div>
                      <div className="text-gray-600">도시</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{user.streak}</div>
                      <div className="text-gray-600">연속</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{user.totalExp.toLocaleString()}</div>
                      <div className="text-gray-600">EXP</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-500" />
              <span>이달의 성취</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">최다 기여자</h3>
                <p className="text-purple-600 font-medium">여행마니아김</p>
                <p className="text-sm text-gray-600">23개 기여</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">신규 도시 개척자</h3>
                <p className="text-green-600 font-medium">디지털노마드박</p>
                <p className="text-sm text-gray-600">3개 신규 도시</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
