"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Button } from "@/components/monthlog-proto/ui/button"
import { Badge } from "@/components/monthlog-proto/ui/badge"
import { Input } from "@/components/monthlog-proto/ui/input"
import { Textarea } from "@/components/monthlog-proto/ui/textarea"
import { Label } from "@/components/monthlog-proto/ui/label"
import { Plus, MapPin, Calendar, Star, Camera, ExternalLink, Edit, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Journey {
  id: string
  city: string
  country: string
  startDate: string
  endDate: string
  memo: string
  photos: string[]
  revisitScore: number
  contributions: number
  isContributed: boolean
}

interface JourneyLogProps {
  journeys: Journey[]
  onAddJourney: (journey: Omit<Journey, "id">) => void
  onEditJourney: (id: string, journey: Partial<Journey>) => void
  onDeleteJourney: (id: string) => void
  onContribute: (journeyId: string) => void
}

export function JourneyLog({ journeys, onAddJourney, onEditJourney, onDeleteJourney, onContribute }: JourneyLogProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    memo: "",
    photos: [] as string[],
    revisitScore: 5,
  })

  const resetForm = () => {
    setFormData({
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      memo: "",
      photos: [],
      revisitScore: 5,
    })
  }

  const handleSubmit = () => {
    if (!formData.city || !formData.startDate || !formData.endDate) return

    const journeyData = {
      ...formData,
      contributions: 0,
      isContributed: false,
    }

    if (editingId) {
      onEditJourney(editingId, journeyData)
      setEditingId(null)
    } else {
      onAddJourney(journeyData)
    }

    resetForm()
    setShowAddForm(false)
  }

  const handleEdit = (journey: Journey) => {
    setFormData({
      city: journey.city,
      country: journey.country,
      startDate: journey.startDate,
      endDate: journey.endDate,
      memo: journey.memo,
      photos: journey.photos,
      revisitScore: journey.revisitScore,
    })
    setEditingId(journey.id)
    setShowAddForm(true)
  }

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays}일`
  }

  return (
    <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <CardTitle className="flex items-center justify-between text-slate-800">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-purple-600" />
            <span>나의 여정 기록</span>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            새로운 여정 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* 여정 추가/편집 폼 */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-6 bg-slate-50 rounded-xl border"
            >
              <h3 className="text-lg font-semibold mb-4">{editingId ? "여정 수정하기" : "새로운 여정 추가하기"}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="city">도시명</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="예: 제주도"
                  />
                </div>
                <div>
                  <Label htmlFor="country">국가</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                    placeholder="예: 한국"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="startDate">시작일</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">종료일</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="memo">한줄 메모</Label>
                <Textarea
                  id="memo"
                  value={formData.memo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, memo: e.target.value }))}
                  placeholder="이 도시에서의 특별한 경험을 간단히 적어보세요"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="revisitScore">재방문 뽐뿌력 (1-10점)</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.revisitScore}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, revisitScore: Number.parseInt(e.target.value) }))
                    }
                    className="flex-1"
                  />
                  <span className="font-semibold text-lg w-8">{formData.revisitScore}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {editingId ? "수정하기" : "추가하기"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingId(null)
                    resetForm()
                  }}
                >
                  취소
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 여정 목록 */}
        <div className="space-y-4">
          {journeys.map((journey) => (
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-50 rounded-xl border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {journey.city}, {journey.country}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {journey.startDate} ~ {journey.endDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{calculateDuration(journey.startDate, journey.endDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(journey)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDeleteJourney(journey.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {journey.memo && <p className="text-slate-700 mb-4 leading-relaxed">{journey.memo}</p>}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">재방문 뽐뿌력 {journey.revisitScore}/10</span>
                  </div>
                  {journey.isContributed && (
                    <Badge className="bg-green-100 text-green-700 border-green-200">개척 완료</Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Camera className="h-3 w-3 mr-1" />
                    분위기 사진
                  </Button>
                  {!journey.isContributed && (
                    <Button
                      size="sm"
                      onClick={() => onContribute(journey.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      도시 개척하기
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {journeys.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <p className="text-lg mb-2">아직 기록된 여정이 없습니다</p>
              <p className="text-sm">첫 번째 여정을 추가해보세요!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
