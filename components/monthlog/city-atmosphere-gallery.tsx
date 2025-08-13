'use client';

import { Camera } from 'lucide-react';
import SectionCard from './shared/section-card';
import { AtmospherePhoto } from '@/types/monthlog/city-detail';

interface CityAtmosphereGalleryProps {
  photos: AtmospherePhoto[];
  totalPhotos: number;
}

export default function CityAtmosphereGallery({
  photos,
  totalPhotos,
}: CityAtmosphereGalleryProps) {
  return (
    <SectionCard
      title="도시 분위기"
      subtitle={`${photos.length}명이 기여한 정보 | 제주도의 분위기를 사진으로 공유해보세요`}
      emoji="✨"
    >
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-gray-600 border-gray-200 bg-transparent">
          <Camera className="h-4 w-4 mr-1" />
          업로드
        </button>
      </div>

      <div className="space-y-6">
        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-24 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                />

                {/* Featured Star */}
                {photo.isFeatured && (
                  <div className="absolute top-1 right-1">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white fill-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.612-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-700 hover:bg-white text-xs px-2 py-1 rounded-md">
                    대표사진으로 추천
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Photos Button */}
        <div className="text-center">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-700 border-gray-300 bg-transparent">
            더 많은 사진보기 ({totalPhotos - photos.length}개 더)
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
