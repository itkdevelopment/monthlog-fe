"use client";
import React, { useState, useEffect } from "react";
import { X, Star, ArrowLeft, Upload, Camera } from "lucide-react";

export type Photo = {
  id: number;
  userId: number;
  feedContent: string;
  recommendedCnt: number;
  images: string[];
  likesCount: number;
  createdAt: string;
};

interface CityAtmospherePanelProps {
  photos: Photo[];
  selectedPhotoId: number | null;
  onClose: () => void;
  onRecommendPhoto?: (photoId: number) => void;
  onUploadPhoto?: (file: File, description: string) => void;
}

export default function CityAtmospherePanel({
  photos,
  selectedPhotoId,
  onClose,
  onRecommendPhoto,
  onUploadPhoto,
}: CityAtmospherePanelProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadDescription, setUploadDescription] = useState("");

  useEffect(() => {
    if (selectedPhotoId != null) {
      const photo = photos.find((p) => p.id === selectedPhotoId) || null;
      setSelectedPhoto(photo);
    } else if (photos.length > 0) {
      setSelectedPhoto(photos[0]);
    }
  }, [selectedPhotoId, photos]);

  const handleUpload = () => {
    if (uploadFile && onUploadPhoto) {
      onUploadPhoto(uploadFile, uploadDescription);
      setUploadFile(null);
      setUploadDescription("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center pt-16">
      <div className="bg-white w-full h-[95vh] rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="hover:bg-gray-100 rounded p-1"
            ></button>
            <h1 className="text-lg font-medium">도시 분위기 사진</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>대표사진만</span>
              <span>전체 8개</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
              대표사진으로 추천 50
            </div>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(80vh-80px)]">
          {/* Left side - Back to list + Main photo */}
          <div className="flex-1 flex flex-col">
            {/* Back button */}
            <div className="p-4 border-b">
              <button
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                onClick={onClose}
              >
                <ArrowLeft className="w-4 h-4" />
                목록으로 돌아가기
              </button>
            </div>

            {/* Main photo area */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50">
              {selectedPhoto ? (
                <>
                  <div className="w-full max-w-2xl">
                    <img
                      src={selectedPhoto.images[0]}
                      alt={selectedPhoto.feedContent}
                      className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700 mb-2">
                      {selectedPhoto.feedContent}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>사진을 선택하세요</p>
                </div>
              )}
            </div>

            {/* Bottom info */}
            <div className="p-4 border-t bg-white flex items-start gap-3">
              <img
                src="/path/to/avatar.jpg"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Text info */}
              <div className="flex flex-col text-sm text-gray-500">
                <span className="text-gray-800 font-medium">제주리버</span>
                <span>2시간 전</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-2">
              성산일출봉에서 본 황금빛 일몰
            </p>
          </div>

          {/* Right side - Upload panel */}
          <div className="w-80 bg-white p-6 border-l">
            <div className="mb-6">
              <h3 className="text-lg font-medium">사진 업로드</h3>
            </div>

            {/* Upload area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    제주도의 분위기를 담은 사진
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    을 올려주세요
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG 파일 (최대 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <button className="cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      사진 선택
                    </span>
                  </button>
                </label>
              </div>
            </div>

            {uploadFile && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-1">
                  선택된 파일:
                </p>
                <p className="text-sm text-blue-600">{uploadFile.name}</p>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                사진 설명 (선택사항)
              </label>
              <textarea
                placeholder="이 사진에서 느껴지는 제주도의 분위기를 설명해주세요"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                maxLength={100}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {uploadDescription.length}/100
              </div>
            </div>

            {/* Upload button */}
            <button
              onClick={handleUpload}
              disabled={!uploadFile}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-medium"
            >
              업로드 (+20 EXP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
