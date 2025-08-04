"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

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
}

interface ProfileSectionProps {
  userProfile: UserProfile
}

export function ProfileSection({ userProfile }: ProfileSectionProps) {
  const expPercentage = (userProfile.currentExp / userProfile.nextLevelExp) * 100

  return (
    <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/images/new-profile-avatar.jpg" />
          <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{userProfile.username[0]}</AvatarFallback>
        </Avatar>

        <div className="text-left">
          <div className="text-2xl font-bold text-blue-600 mb-1">Lv.{userProfile.level}</div>
          <div className="text-sm text-gray-500">레벨</div>
        </div>
      </div>

      <div className="text-left">
        <div className="text-2xl font-bold text-gray-900 mb-1">{userProfile.title}</div>
        <div className="text-sm text-gray-500">현재 칭호</div>
      </div>

      <div className="flex-1 max-w-xs">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">경험치</span>
          <span className="font-semibold text-gray-800">{Math.round(expPercentage)}%</span>
        </div>
        <Progress value={expPercentage} className="h-3 rounded-full" />
        <p className="text-xs text-gray-500 mt-1">
          {userProfile.currentExp} / {userProfile.nextLevelExp} EXP
        </p>
      </div>
    </div>
  )
}
