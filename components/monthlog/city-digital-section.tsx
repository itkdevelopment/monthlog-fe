'use client';

import {
  TrendingUp,
  Wifi,
  Zap,
  Building,
  Coffee,
  CreditCard,
} from 'lucide-react';
import SectionCard from './shared/section-card';
import CircularProgress from './shared/circular-progress';
import StatItem from './shared/stat-item';
import { DigitalData } from '@/types/monthlog/city-detail';

interface CityDigitalSectionProps {
  data: DigitalData;
}

export default function CityDigitalSection({ data }: CityDigitalSectionProps) {
  return (
    <SectionCard
      title="디지털/업무 환경"
      subtitle="18명이 기여한 정보"
      emoji="💻"
    >
      {/* Top Stats Grid */}
      <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
        <div className="col-span-2 flex justify-center">
          <CircularProgress
            value={data.satisfaction}
            max={10}
            label="워케이션 환경 만족도"
          />
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.avgInternetSpeed}
            </div>
            <div className="text-sm text-gray-600">인터넷 평균 속도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.coworkingSpaces}곳
            </div>
            <div className="text-sm text-gray-600">코워킹 스페이스</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.powerStability}
            </div>
            <div className="text-sm text-gray-600">전력 안정성</div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Detailed Stats */}
      <div className="space-y-1">
        <StatItem
          icon={<TrendingUp className="h-4 w-4 text-gray-600" />}
          label="워케이션 환경 만족도"
          value={`${data.satisfaction}/10`}
        />

        <StatItem
          icon={<Wifi className="h-4 w-4 text-gray-600" />}
          label="인터넷 평균 속도"
          value={data.breakdown.internetSpeed}
        />

        <StatItem
          icon={<Zap className="h-4 w-4 text-gray-600" />}
          label="전력 안정성"
          value={data.breakdown.powerStability}
        />

        <StatItem
          icon={<Wifi className="h-4 w-4 text-gray-600" />}
          label="무료 Wi-Fi 접근성"
          value={data.breakdown.wifiAccess}
        />

        <StatItem
          icon={<Building className="h-4 w-4 text-gray-600" />}
          label="코워킹 스페이스"
          value={data.breakdown.coworkingSpaces}
        />

        <StatItem
          icon={<Coffee className="h-4 w-4 text-gray-600" />}
          label="노트북 하기 좋은 카페"
          value={data.breakdown.laptopFriendlyCafes}
        />

        <StatItem
          icon={<CreditCard className="h-4 w-4 text-gray-600" />}
          label="단기 멤버십 정보"
          value={data.breakdown.shortTermMembership}
        />
      </div>
    </SectionCard>
  );
}
