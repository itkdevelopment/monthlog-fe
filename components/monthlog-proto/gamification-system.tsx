"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/monthlog-proto/ui/card"
import { Badge } from "@/components/monthlog-proto/ui/badge"
import { Progress } from "@/components/monthlog-proto/ui/progress"
import { Trophy, Star, Target, Zap, Gift, Award } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  progress: number
  maxProgress: number
  completed: boolean
  reward: number
}

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  progress: number
  maxProgress: number
  reward: number
  completed: boolean
}

interface GamificationSystemProps {
  userLevel: number
  currentExp: number
  nextLevelExp: number
}

export function GamificationSystem({ userLevel, currentExp, nextLevelExp }: GamificationSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "첫 기여자",
      description: "첫 번째 데이터를 기여하세요",
      icon: <Star className="h-5 w-5" />,
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: 100,
    },
    {
      id: "2",
      title: "도시 탐험가",
      description: "5개 도시에 데이터를 기여하세요",
      icon: <Target className="h-5 w-5" />,
      progress: 3,
      maxProgress: 5,
      completed: false,
      reward: 500,
    },
    {
      id: "3",
      title: "데이터 마스터",
      description: "100개의 데이터 포인트를 추가하세요",
      icon: <Trophy className="h-5 w-5" />,
      progress: 67,
      maxProgress: 100,
      completed: false,
      reward: 1000,
    },
  ])

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "일일 기여",
      description: "오늘 3개의 데이터를 기여하세요",
      type: "daily",
      progress: 1,
      maxProgress: 3,
      reward: 50,
      completed: false,
    },
    {
      id: "2",
      title: "주간 챌린지",
      description: "이번 주에 새로운 도시 1곳을 탐험하세요",
      type: "weekly",
      progress: 0,
      maxProgress: 1,
      reward: 200,
      completed: false,
    },
    {
      id: "3",
      title: "월간 목표",
      description: "이번 달에 20개의 데이터를 기여하세요",
      type: "monthly",
      progress: 12,
      maxProgress: 20,
      reward: 800,
      completed: false,
    },
  ])

  const [showReward, setShowReward] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)

  const expPercentage = (currentExp / nextLevelExp) * 100

  const getQuestTypeColor = (type: Quest["type"]) => {
    switch (type) {
      case "daily":
        return "bg-green-100 text-green-800"
      case "weekly":
        return "bg-blue-100 text-blue-800"
      case "monthly":
        return "bg-purple-100 text-purple-800"
    }
  }

  const getQuestTypeLabel = (type: Quest["type"]) => {
    switch (type) {
      case "daily":
        return "일일"
      case "weekly":
        return "주간"
      case "monthly":
        return "월간"
    }
  }

  const handleCompleteQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === questId && !quest.completed) {
          setRewardAmount(quest.reward)
          setShowReward(true)
          setTimeout(() => setShowReward(false), 3000)
          return { ...quest, completed: true, progress: quest.maxProgress }
        }
        return quest
      }),
    )
  }

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{userLevel}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">레벨 {userLevel}</h3>
                <p className="text-sm text-gray-600">다음 레벨까지</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {currentExp} / {nextLevelExp} EXP
              </div>
              <div className="text-xs text-gray-500">{nextLevelExp - currentExp} EXP 남음</div>
            </div>
          </div>
          <Progress value={expPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-900">업적</h3>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  achievement.completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        achievement.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.completed && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">완료</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.progress} / {achievement.maxProgress}
                  </div>
                  <div className="ml-4 flex items-center space-x-1 text-sm text-yellow-600">
                    <Zap className="h-4 w-4" />
                    <span>{achievement.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Quests */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">퀘스트</h3>
          </div>
          <div className="space-y-4">
            {quests.map((quest) => (
              <div
                key={quest.id}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  quest.completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={getQuestTypeColor(quest.type)}>{getQuestTypeLabel(quest.type)}</Badge>
                    <div>
                      <h4 className="font-medium text-gray-900">{quest.title}</h4>
                      <p className="text-sm text-gray-600">{quest.description}</p>
                    </div>
                  </div>
                  {quest.completed ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">완료</Badge>
                  ) : (
                    <button
                      onClick={() => handleCompleteQuest(quest.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      disabled={quest.progress < quest.maxProgress}
                    >
                      완료
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {quest.progress} / {quest.maxProgress}
                  </div>
                  <div className="ml-4 flex items-center space-x-1 text-sm text-yellow-600">
                    <Zap className="h-4 w-4" />
                    <span>{quest.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reward Notification */}
      {showReward && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">+{rewardAmount} EXP 획득!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
