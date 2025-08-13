// components/monthlog/city-housing-section.tsx
'use client';

import { House, Volume2, Droplets, Wind, Info } from 'lucide-react';
import SectionCard from './shared/section-card';
import CircularProgress from './shared/circular-progress';
import StatItem from './shared/stat-item';
import { HousingData } from '@/types/monthlog/city-detail';

interface CityHousingSectionProps {
  data: HousingData;
}

export default function CityHousingSection({ data }: CityHousingSectionProps) {
  return (
    <SectionCard
      title="거주 환경 디테일"
      subtitle="24명이 기여한 정보"
      emoji="🏠"
    >
      {/* Top Stats Grid */}
      <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
        <div className="col-span-2 flex justify-center">
          <CircularProgress
            value={data.satisfaction}
            max={10}
            label="주거 환경 만족도"
          />
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.noiseLevel}
            </div>
            <div className="text-sm text-gray-600">소음 수준</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.airQuality}
            </div>
            <div className="text-sm text-gray-600">대기 질</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.laundryFacilities}
            </div>
            <div className="text-sm text-gray-600">세탁 시설</div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Detailed Stats */}
      <div className="space-y-1">
        <StatItem
          icon={<House className="h-4 w-4 text-gray-600" />}
          label="주거 환경 만족도"
          value={`${data.satisfaction}/10`}
        />

        <StatItem
          icon={<Volume2 className="h-4 w-4 text-gray-600" />}
          label="소음 수준 (주거지역 기준)"
          value={data.breakdown.noiseLevel}
        />

        <StatItem
          icon={<Droplets className="h-4 w-4 text-gray-600" />}
          label="세탁 시설 정보"
          value={data.breakdown.laundryInfo}
        />

        <StatItem
          icon={<Wind className="h-4 w-4 text-gray-600" />}
          label="대기 질 (연평균)"
          value={data.breakdown.airQuality}
        />

        <StatItem
          icon={<Info className="h-4 w-4 text-gray-600" />}
          label="현지 생활 필수 정보"
          value={data.breakdown.localLifeInfo}
        />
      </div>
    </SectionCard>
  );
}
