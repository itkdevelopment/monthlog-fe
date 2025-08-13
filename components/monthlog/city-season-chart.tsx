// components/monthlog/city-season-chart.tsx
'use client';

import { useState } from 'react';
import SectionCard from './shared/section-card';
import SeasonEditModal from './modals/season-edit-modal';
import { SeasonData } from '@/types/monthlog/city-detail';

interface CitySeasonChartProps {
  data: SeasonData;
}

export default function CitySeasonChart({ data }: CitySeasonChartProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seasonData, setSeasonData] = useState(data);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (newData: SeasonData) => {
    setSeasonData(newData);
    // Here you would typically call an API to save the data
  };

  const getBarColor = (recommendations: number) => {
    if (recommendations >= 30) return '#0B24FB'; // Blue for high recommendations
    if (recommendations >= 20) return '#e5e7eb'; // Gray for medium
    return '#ef4444'; // Red for low recommendations
  };

  const maxRecommendations = Math.max(
    ...seasonData.monthlyData.map(d => d.recommendations),
  );

  return (
    <>
      <SectionCard
        title="추천 ↔ 피해야하는 시기"
        subtitle="28명이 참여했어요"
        emoji="🌗"
        onEdit={handleEditClick}
      >
        {/* Chart Container */}
        <div className="h-80">
          <div className="w-full h-full">
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-64 px-4 mb-8">
              {seasonData.monthlyData.map((month, index) => {
                const barHeight =
                  (month.recommendations / maxRecommendations) * 200;
                const color = getBarColor(month.recommendations);

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-12 rounded-t-md flex items-end justify-center text-white text-xs font-medium"
                      style={{
                        height: `${barHeight}px`,
                        backgroundColor: color,
                        minHeight: '20px',
                      }}
                    >
                      {month.recommendations}
                    </div>
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      {month.month}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#0B24FB] mr-2"></div>
                  <span>추천 수</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 border-dashed border-2 mr-2"></div>
                  <span className="text-gray-500">평균 기온 (°C)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations and Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-black text-base flex items-center">
              🥰 추천하는 이유
            </h3>
            <div className="space-y-3">
              {seasonData.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-700 leading-relaxed flex-1 mr-3">
                      [{rec.month}] {rec.reason}
                    </p>
                    <span className="text-xs text-black whitespace-nowrap">
                      {rec.count}명
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-black text-base flex items-center">
              😰 피해야하는 이유
            </h3>
            <div className="space-y-3">
              {seasonData.warnings.map((warning, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-700 leading-relaxed flex-1 mr-3">
                      [{warning.month}] {warning.reason}
                    </p>
                    <span className="text-xs text-black whitespace-nowrap">
                      {warning.count}명
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SeasonEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={seasonData}
        onSave={handleSave}
      />
    </>
  );
}
