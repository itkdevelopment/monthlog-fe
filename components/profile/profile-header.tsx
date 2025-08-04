"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Camera } from "lucide-react"

interface ProfileHeaderProps {
  userProfile: {
    id: string
    username: string
    avatar: string
    level: number
    currentExp: number
    nextLevelExp: number
    totalExp: number
    title: string
    bio: string
    stats: {
      totalContributions: number
      citiesContributed: number
      dataPointsAdded: number
      badgesEarned: number
      helpfulVotes: number
      photoShared: number
    }
  }
  onProfileUpdate: (field: string, value: string) => void
}

export function ProfileHeader({ userProfile, onProfileUpdate }: ProfileHeaderProps) {
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [tempUsername, setTempUsername] = useState(userProfile.username)
  const [tempBio, setTempBio] = useState(userProfile.bio)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const expPercentage = (userProfile.currentExp / userProfile.nextLevelExp) * 100

  const handleUsernameEdit = () => {
    if (isEditingUsername) {
      onProfileUpdate("username", tempUsername)
    }
    setIsEditingUsername(!isEditingUsername)
  }

  const handleBioEdit = () => {
    if (isEditingBio) {
      onProfileUpdate("bio", tempBio)
    }
    setIsEditingBio(!isEditingBio)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onProfileUpdate("avatar", result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
      <CardContent className="relative px-8 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
          {/* Avatar with edit functionality */}
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src="/images/new-profile-avatar.jpg" />
              <AvatarFallback className="text-2xl bg-slate-100 text-slate-600">
                {userProfile.username[0]}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          <div className="flex-1 md:mt-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                {/* Username with edit functionality */}
                <div className="flex items-center space-x-2 mb-1">
                  {isEditingUsername ? (
                    <input
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="text-2xl font-bold text-slate-800 bg-transparent border-b-2 border-blue-500 outline-none"
                      onKeyDown={(e) => e.key === "Enter" && handleUsernameEdit()}
                      autoFocus
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-slate-800">{userProfile.username}</h2>
                  )}
                  <button
                    onClick={handleUsernameEdit}
                    className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 px-3 py-1">
                  Lv. {userProfile.level} {userProfile.title}
                </Badge>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-2xl font-bold text-blue-600">{userProfile.stats.totalContributions}</div>
                <div className="text-sm text-slate-600">총 기여</div>
              </div>
            </div>

            {/* Bio with edit functionality */}
            <div className="mb-4">
              <div className="flex items-start space-x-2">
                {isEditingBio ? (
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="flex-1 text-slate-600 leading-relaxed bg-transparent border-2 border-blue-500 rounded-lg p-2 outline-none resize-none"
                    rows={3}
                    onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleBioEdit()}
                    autoFocus
                  />
                ) : (
                  <p className="flex-1 text-slate-600 leading-relaxed">{userProfile.bio}</p>
                )}
                <button
                  onClick={handleBioEdit}
                  className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors mt-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Experience Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">경험치</span>
                <span className="font-semibold text-slate-800">
                  {userProfile.currentExp} / {userProfile.nextLevelExp} EXP
                </span>
              </div>
              <Progress value={expPercentage} className="h-3 rounded-full" />
              <p className="text-xs text-slate-500">
                다음 레벨까지 {userProfile.nextLevelExp - userProfile.currentExp} EXP 남음
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
