// components/monthlog/city-overview-stats.tsx
'use client';

import { Calendar } from 'lucide-react';

interface CityOverviewStatsProps {
  suitabilityScore: number;
  totalContributors: number;
  totalContributions: number;
  reliabilityScore: number;
  lastUpdated: string;
}

export default function CityOverviewStats({
  suitabilityScore,
  totalContributors,
  totalContributions,
  reliabilityScore,
  lastUpdated,
}: CityOverviewStatsProps) {
  return (
    <div className="p-4 sm:p-6">
      {/* Main Stats Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
            {suitabilityScore}/10
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            한달살기 적합도
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
            {totalContributors}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">개척자</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
            {totalContributions}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">총 기여</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
            {reliabilityScore}%
          </div>
          <div className="text-xs sm:text-sm text-gray-600">데이터 신뢰도</div>
        </div>
      </div>

      {/* Bottom Info Bar - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-200"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-200"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-200"></div>
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            <span className="font-bold">{totalContributors}명</span>이 이 도시에
            기여했어요
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>최근 업데이트: {lastUpdated}</span>
          </div>
          <button className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors duration-200 hover:opacity-90 bg-[#0B24FB]">
            + 내 모든 경험 한번에 개척하기
          </button>
        </div>
      </div>
    </div>
  );
}
