"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { Button } from "@/components/monthlog-proto/ui/button"
import { Camera, Star } from "lucide-react"
import { ExpGainAnimation } from "@/components/monthlog-proto/domain/city-detail/exp-gain-animation"
import CityVibePanel, { type CityVibePhoto } from "./city-vibe-panel"

interface CityVibeCardProps {
  onExpGain?: (amount: number) => void
}

export default function CityVibeCard({ onExpGain }: CityVibeCardProps) {
  const [showPhotosPanel, setShowPhotosPanel] = useState(false)
  const [uploadDescription, setUploadDescription] = useState("")
  const [showExpGain, setShowExpGain] = useState(false)
  const [expAmount, setExpAmount] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)

  // 샘플 사진 데이터 (최신순으로 정렬)
  const [photos, setPhotos] = useState<CityVibePhoto[]>(
    [
      {
        id: "1",
        imageUrl: "/images/jeju-coast-1.avif",
        author: "제주러버",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 48,
        isRecommended: true,
        uploadedAt: "2시간 전",
        uploadedTimestamp: Date.now() - 2 * 60 * 60 * 1000,
        description: "성산일출봉에서 본 황금빛 일몰",
      },
      {
        id: "2",
        imageUrl: "/images/jeju-hills-2.avif",
        author: "워케이션왕",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 32,
        isRecommended: false,
        uploadedAt: "4시간 전",
        uploadedTimestamp: Date.now() - 4 * 60 * 60 * 1000,
        description: "제주 서쪽 바다뷰 카페",
      },
      {
        id: "3",
        imageUrl: "/images/jeju-beach-3.avif",
        author: "힐링마스터",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 67,
        isRecommended: true,
        uploadedAt: "6시간 전",
        uploadedTimestamp: Date.now() - 6 * 60 * 60 * 1000,
        description: "한라산 등반로의 신록",
      },
      {
        id: "4",
        imageUrl: "/images/jeju-mountain-4.avif",
        author: "제주탐험가",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 28,
        isRecommended: false,
        uploadedAt: "8시간 전",
        uploadedTimestamp: Date.now() - 8 * 60 * 60 * 1000,
        description: "제주 구시가지 골목길",
      },
      {
        id: "5",
        imageUrl: "/images/jeju-coastline-5.avif",
        author: "바다사랑",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 41,
        isRecommended: false,
        uploadedAt: "1일 전",
        uploadedTimestamp: Date.now() - 24 * 60 * 60 * 1000,
        description: "에메랄드빛 제주 바다",
      },
      {
        id: "6",
        imageUrl: "/images/jeju-sunset-6.avif",
        author: "로컬푸드",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 19,
        isRecommended: false,
        uploadedAt: "1일 전",
        uploadedTimestamp: Date.now() - 25 * 60 * 60 * 1000,
        description: "제주 전통시장의 활기",
      },
      {
        id: "7",
        imageUrl: "/images/jeju-coast-1.avif",
        author: "제주탐험가2",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 55,
        isRecommended: true,
        uploadedAt: "2일 전",
        uploadedTimestamp: Date.now() - 48 * 60 * 60 * 1000,
        description: "제주 올레길의 아름다운 풍경",
      },
      {
        id: "8",
        imageUrl: "/images/jeju-hills-2.avif",
        author: "힐링여행자",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        recommendations: 38,
        isRecommended: false,
        uploadedAt: "3일 전",
        uploadedTimestamp: Date.now() - 72 * 60 * 60 * 1000,
        description: "제주 카페거리의 여유로운 오후",
      },
    ].sort((a, b) => b.uploadedTimestamp - a.uploadedTimestamp),
  )

  // 핸들러들
  const handleRecommendPhoto = useCallback(
    (photoId: string) => {
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoId ? { ...photo, isRecommended: true, recommendations: photo.recommendations + 1 } : photo,
        ),
      )

      if (onExpGain) {
        onExpGain(15)
      }
    },
    [onExpGain],
  )

  const handleUpload = useCallback(() => {
    if (!selectedFile) return

    const gainAmount = 20
    if (onExpGain) {
      onExpGain(gainAmount)
    }

    setExpAmount(gainAmount)
    setShowExpGain(true)
    setTimeout(() => setShowExpGain(false), 2000)

    setUploadDescription("")
    setSelectedFile(null)
  }, [selectedFile, onExpGain])

  const handlePhotoClickInCard = useCallback((photoId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPhotoId(photoId)
    setShowPhotosPanel(true)
  }, [])

  const handleOpenPanel = useCallback(() => {
    setSelectedPhotoId(null)
    setShowPhotosPanel(true)
  }, [])

  const handleClosePanel = useCallback(() => {
    setShowPhotosPanel(false)
    setSelectedPhotoId(null)
  }, [])

  const handleFileSelect = useCallback((file: File | null) => {
    setSelectedFile(file)
  }, [])

  const handleDescriptionChange = useCallback((description: string) => {
    setUploadDescription(description)
  }, [])

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-semibold text-gray-900">✨ 도시 분위기</span>
              <p className="text-sm text-gray-500 font-normal mt-1">
                8명이 기여한 정보 | 제주도의 분위기를 사진으로 공유해보세요
              </p>
            </div>
            <Button
              onClick={handleOpenPanel}
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-200 bg-transparent"
            >
              <Camera className="h-4 w-4 mr-1" />
              업로드
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="grid grid-cols-3 gap-3">
              {photos.slice(0, 6).map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer"
                  onClick={(e) => handlePhotoClickInCard(photo.id, e)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={photo.imageUrl || "/placeholder.svg"}
                      alt={photo.description}
                      className="w-full h-24 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                    />

                    {photo.isRecommended && (
                      <div className="absolute top-1 right-1">
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRecommendPhoto(photo.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-700 hover:bg-white text-xs px-2 py-1 h-auto"
                        size="sm"
                      >
                        대표사진으로 추천
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {photos.length > 6 && (
            <div className="text-center">
              <Button
                onClick={handleOpenPanel}
                variant="outline"
                className="text-gray-700 border-gray-300 bg-transparent"
              >
                더 많은 사진보기 ({photos.length - 6}개 더)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 분리된 패널 컴포넌트 */}
      <CityVibePanel
        isOpen={showPhotosPanel}
        onClose={handleClosePanel}
        photos={photos}
        onRecommendPhoto={handleRecommendPhoto}
        onUpload={handleUpload}
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
        uploadDescription={uploadDescription}
        onDescriptionChange={handleDescriptionChange}
        initialSelectedPhotoId={selectedPhotoId}
      />

      {/* 경험치 획득 애니메이션 */}
      {showExpGain && <ExpGainAnimation amount={expAmount} onComplete={() => setShowExpGain(false)} />}
    </>
  )
}
