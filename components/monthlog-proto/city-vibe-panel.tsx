"use client"

import type React from "react"
import { useState, useCallback, useMemo, memo, useEffect } from "react"
import { Button } from "@/components/monthlog-proto/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/monthlog-proto/ui/avatar"
import { Camera, Upload, Star, Filter, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface CityVibePhoto {
  id: string
  imageUrl: string
  author: string
  authorAvatar: string
  recommendations: number
  isRecommended: boolean
  uploadedAt: string
  uploadedTimestamp: number
  description?: string
}

interface CityVibePanelProps {
  isOpen: boolean
  onClose: () => void
  photos: CityVibePhoto[]
  onRecommendPhoto: (photoId: string) => void
  onUpload: () => void
  selectedFile: File | null
  onFileSelect: (file: File | null) => void
  uploadDescription: string
  onDescriptionChange: (description: string) => void
  initialSelectedPhotoId?: string | null
}

// 메모이제이션된 사진 그리드 컴포넌트
const PhotoGrid = memo(
  ({
    photos,
    onPhotoClick,
    onRecommend,
  }: {
    photos: CityVibePhoto[]
    onPhotoClick: (id: string, e: React.MouseEvent) => void
    onRecommend: (id: string) => void
  }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="relative group">
          <div
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            onClick={(e) => onPhotoClick(photo.id, e)}
          >
            <img
              src={photo.imageUrl || "/placeholder.svg"}
              alt={photo.description}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />

            {photo.isRecommended && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onRecommend(photo.id)
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-700 hover:bg-white text-sm px-3 py-2"
                size="sm"
              >
                대표사진으로 추천
              </Button>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <Avatar className="w-6 h-6">
                <AvatarImage src={photo.authorAvatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{photo.author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900">{photo.author}</span>
              <span className="text-xs text-gray-500">{photo.uploadedAt}</span>
            </div>
            {photo.description && <p className="text-sm text-gray-600 line-clamp-2 mb-2">{photo.description}</p>}

            <div className="flex justify-end">
              <Button
                onClick={() => onRecommend(photo.id)}
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-auto"
              >
                추천 {photo.recommendations}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
)

PhotoGrid.displayName = "PhotoGrid"

// 메모이제이션된 사진 상세보기 컴포넌트
const PhotoDetail = memo(
  ({
    photo,
    onBack,
    onRecommend,
  }: {
    photo: CityVibePhoto
    onBack: () => void
    onRecommend: (id: string) => void
  }) => (
    <div className="relative h-full">
      {/* 고정된 상단 버튼 영역 */}
      <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm" className="bg-transparent">
          ← 목록으로 돌아가기
        </Button>
        <Button onClick={() => onRecommend(photo.id)} className="bg-black hover:bg-gray-800 text-white">
          대표사진으로 추천 {photo.recommendations}
        </Button>
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="p-6 pb-24">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-center mb-6">
            <img
              src={photo.imageUrl || "/placeholder.svg"}
              alt={photo.description}
              className="max-w-full max-h-[60vh] object-contain rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={photo.authorAvatar || "/placeholder.svg"} />
                <AvatarFallback>{photo.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{photo.author}</p>
                <p className="text-sm text-gray-500">{photo.uploadedAt}</p>
              </div>
            </div>

            {photo.description && <p className="text-gray-700 text-lg leading-relaxed">{photo.description}</p>}
          </div>
        </div>
      </div>
    </div>
  ),
)

PhotoDetail.displayName = "PhotoDetail"

export default function CityVibePanel({
  isOpen,
  onClose,
  photos,
  onRecommendPhoto,
  onUpload,
  selectedFile,
  onFileSelect,
  uploadDescription,
  onDescriptionChange,
  initialSelectedPhotoId,
}: CityVibePanelProps) {
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false)
  const [selectedPhotoInPanel, setSelectedPhotoInPanel] = useState<string | null>(null)

  // 패널이 열릴 때 초기 선택된 사진 ID가 있으면 상세보기로 이동
  useEffect(() => {
    if (isOpen && initialSelectedPhotoId) {
      setSelectedPhotoInPanel(initialSelectedPhotoId)
    } else if (!isOpen) {
      setSelectedPhotoInPanel(null)
    }
  }, [isOpen, initialSelectedPhotoId])

  const handlePhotoClickInPanel = useCallback((photoId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPhotoInPanel(photoId)
  }, [])

  const handleToggleRecommended = useCallback(() => {
    setShowOnlyRecommended((prev) => !prev)
  }, [])

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onDescriptionChange(e.target.value)
    },
    [onDescriptionChange],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      onFileSelect(file || null)
    },
    [onFileSelect],
  )

  const handleBackToGrid = useCallback(() => {
    setSelectedPhotoInPanel(null)
  }, [])

  const handleClosePanel = useCallback(() => {
    onClose()
    setSelectedPhotoInPanel(null)
  }, [onClose])

  // 메모이제이션된 계산값들
  const filteredPhotos = useMemo(() => {
    return showOnlyRecommended ? photos.filter((photo) => photo.isRecommended) : photos
  }, [photos, showOnlyRecommended])

  const selectedPhoto = useMemo(() => {
    return selectedPhotoInPanel ? photos.find((p) => p.id === selectedPhotoInPanel) : null
  }, [selectedPhotoInPanel, photos])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 - 네비게이션 포함 전체 화면 덮기 */}
          <div
            className="fixed bg-black/50"
            style={{
              top: "auto",
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 50,
              position: "fixed",
            }}
            onClick={handleClosePanel}
          />

          {/* 패널 - 화면의 95% 높이 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 right-0 bg-white rounded-t-2xl flex flex-col"
            style={{
              bottom: 0,
              height: "95vh",
              zIndex: 51,
              position: "fixed",
            }}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">도시 분위기 사진</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleToggleRecommended}
                    variant={showOnlyRecommended ? "default" : "outline"}
                    size="sm"
                    className={showOnlyRecommended ? "bg-black hover:bg-gray-800 text-white" : ""}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    대표사진만
                  </Button>
                  <span className="text-sm text-gray-500">
                    {showOnlyRecommended ? `${filteredPhotos.length}개` : `전체 ${photos.length}개`}
                  </span>
                </div>
              </div>
              <button
                onClick={handleClosePanel}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex min-h-0">
              {/* 왼쪽: 사진 그리드 또는 선택된 사진 상세보기 */}
              <div className="flex-1 overflow-y-auto">
                {selectedPhoto ? (
                  <PhotoDetail photo={selectedPhoto} onBack={handleBackToGrid} onRecommend={onRecommendPhoto} />
                ) : (
                  <div className="p-6">
                    <PhotoGrid
                      photos={filteredPhotos}
                      onPhotoClick={handlePhotoClickInPanel}
                      onRecommend={onRecommendPhoto}
                    />

                    {filteredPhotos.length === 0 && (
                      <div className="text-center py-12">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {showOnlyRecommended ? "대표사진이 없습니다" : "아직 업로드된 사진이 없습니다"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 오른쪽: 업로드 사이드바 */}
              <div className="w-80 border-l border-gray-200 p-6 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">사진 업로드</h3>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Camera className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">제주도의 분위기를 담은 사진을 올려주세요</p>
                    <p className="text-sm text-gray-500 mb-3">JPG, PNG 파일 (최대 10MB)</p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload">
                      <Button className="bg-black hover:bg-gray-800 text-white cursor-pointer" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          사진 선택
                        </span>
                      </Button>
                    </label>

                    {selectedFile && <p className="text-sm text-green-600 mt-2">선택된 파일: {selectedFile.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">사진 설명 (선택사항)</label>
                    <textarea
                      value={uploadDescription}
                      onChange={handleDescriptionChange}
                      placeholder="이 사진에서 느껴지는 제주도의 분위기를 설명해주세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={onUpload}
                    disabled={!selectedFile}
                    className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400"
                  >
                    업로드 (+20 EXP)
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
