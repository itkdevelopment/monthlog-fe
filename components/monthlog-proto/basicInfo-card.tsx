"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/monthlog-proto/ui/dialog"
import { Button } from "@/components/monthlog-proto/ui/button"
import { Input } from "@/components/monthlog-proto/ui/input"
import { Label } from "@/components/monthlog-proto/ui/label"
import { Edit, Globe, CreditCard, Clock, Zap, Users, MapPin } from "lucide-react"

interface BasicInfoData {
  language: string
  visa: string
  currency: string
  timeZone: string
  powerOutlet: string
  religion: string
}

interface BasicInfoCardProps {
  cardData?: BasicInfoData
}

const defaultCardData: BasicInfoData = {
  language: "한국어, 영어",
  visa: "무비자 30일",
  currency: "원 (KRW)",
  timeZone: "UTC+9 (시차 없음)",
  powerOutlet: "220V, C/F타입",
  religion: "불교, 기독교",
}

export default function BasicInfoCard({ cardData = defaultCardData }: BasicInfoCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(cardData || defaultCardData)
  const data = cardData || defaultCardData

  const detailItems = [
    { label: "언어", value: data.language, key: "language", icon: Globe },
    { label: "비자", value: data.visa, key: "visa", icon: MapPin },
    { label: "화폐", value: data.currency, key: "currency", icon: CreditCard },
    { label: "한국과의 시차", value: data.timeZone, key: "timeZone", icon: Clock },
    { label: "콘센트 (전압/플러그 타입)", value: data.powerOutlet, key: "powerOutlet", icon: Zap },
    { label: "주요 종교", value: data.religion, key: "religion", icon: Users },
  ]

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Saving basic info data:", formData)
    setIsOpen(false)
  }

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl">🌐 기본 정보</span>
                <p className="text-sm text-gray-500 font-normal mt-1">24명이 기여한 정보</p>
              </div>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>기본 정보 수정</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {detailItems.map((formItem, formIndex) => (
                    <div key={formIndex} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={formItem.key} className="text-right text-sm">
                        {formItem.label}
                      </Label>
                      <Input
                        id={formItem.key}
                        value={formData[formItem.key as keyof BasicInfoData]}
                        onChange={(e) => handleInputChange(formItem.key, e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={handleSave}>저장</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="space-y-1">
            {detailItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">{item.value}</span>
                    <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
