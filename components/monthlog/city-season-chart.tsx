'use client';

import { useState } from 'react';
import SectionCard from './shared/section-card';
import SeasonEditModal from './modals/season-edit-modal';
import { MonthlySeasonData, SeasonComment } from '@/types/monthlog/city-detail';

interface CitySeasonChartProps {
  data?: MonthlySeasonData[];
  comments?: SeasonComment[];
}

export default function CitySeasonChart({ data, comments }: CitySeasonChartProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seasonData, setSeasonData] = useState<MonthlySeasonData[] | undefined>(data);
  const [seasonComments] = useState<SeasonComment[] | undefined>(comments);

  // const handleEditClick = () => {
  //   setIsEditModalOpen(true);
  // };

  const handleSave = (newData: MonthlySeasonData[]) => {
    setSeasonData(newData);
    // TODO: Call API to save
    // setSeasonComments(comments);
  };

  const getBarColor = (count: number) => {
    if (count >= 30) return '#0B24FB';
    if (count >= 20) return '#e5e7eb';
    return '#ef4444';
  };

  const monthlyData = seasonData ?? [];
  const maxRecommendations =
    monthlyData.length > 0 ? Math.max(...monthlyData.map(d => d.recommendedCount)) : 0;

  const recommendComments = (seasonComments ?? []).filter(c => c.commentType === 'recommend');
  const warningComments = (seasonComments ?? []).filter(c => c.commentType === 'warning');

  return (
    <>
      <SectionCard
        title="추천 ↔ 피해야하는 시기"
        subtitle={`${comments?.length ?? 0}명이 참여했어요`}
        emoji="🌗"
        // onEdit={handleEditClick}
      >
        {/* Chart Container */}
        <div className="h-80">
          <div className="w-full h-full">
            <div className="flex items-end justify-between h-64 px-4 mb-8">
              {monthlyData.map((month, index) => {
                const barHeight =
                  maxRecommendations > 0
                    ? (month.recommendedCount / maxRecommendations) * 200
                    : 20;
                const color = getBarColor(month.recommendedCount);

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
                      {month.recommendedCount}
                    </div>
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      {month.month}월
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
              {recommendComments.map((rec, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-700 leading-relaxed flex-1 mr-3">
                      [{rec.month}월] {rec.commentText}
                    </p>
                    <span className="text-xs text-black whitespace-nowrap">
                      {rec.voteCount}명
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
              {warningComments.map((warning, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-700 leading-relaxed flex-1 mr-3">
                      [{warning.month}월] {warning.commentText}
                    </p>
                    <span className="text-xs text-black whitespace-nowrap">
                      {warning.voteCount}명
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {seasonData && (
        <SeasonEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={seasonData}
          onSave={handleSave}
        />
      )}
    </>
  );
}
