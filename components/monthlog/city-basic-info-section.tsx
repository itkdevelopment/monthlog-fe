// components/monthlog/city-basic-info-section.tsx
'use client';

import { useState } from 'react';
import { Globe, MapPin, CreditCard, Clock, Zap, Users } from 'lucide-react';
import SectionCard from './shared/section-card';
import StatItem from './shared/stat-item';
import BasicInfoEditModal from './modals/basic-info-edit-modal';
import { BasicInfo } from '@/types/monthlog/city-detail';

interface CityBasicInfoSectionProps {
  data: BasicInfo;
}

export default function CityBasicInfoSection({
  data,
}: CityBasicInfoSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [basicInfoData, setBasicInfoData] = useState(data);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (newData: BasicInfo) => {
    setBasicInfoData(newData);
    // Here you would typically call an API to save the data
  };

  return (
    <>
      <SectionCard
        title="기본 정보"
        subtitle="24명이 기여한 정보"
        emoji="🌏"
        onEdit={handleEditClick}
      >
        <div className="space-y-1">
          <StatItem
            icon={<Globe className="h-4 w-4 text-gray-600" />}
            label="언어"
            value={basicInfoData.language}
          />

          <StatItem
            icon={<MapPin className="h-4 w-4 text-gray-600" />}
            label="비자"
            value={basicInfoData.visa}
          />

          <StatItem
            icon={<CreditCard className="h-4 w-4 text-gray-600" />}
            label="화폐"
            value={basicInfoData.currency}
          />

          <StatItem
            icon={<Clock className="h-4 w-4 text-gray-600" />}
            label="한국과의 시차"
            value={basicInfoData.timezone}
          />

          <StatItem
            icon={<Zap className="h-4 w-4 text-gray-600" />}
            label="콘센트 (전압/플러그 타입)"
            value={basicInfoData.plugType}
          />

          <StatItem
            icon={<Users className="h-4 w-4 text-gray-600" />}
            label="주요 종교"
            value={basicInfoData.religion}
          />
        </div>
      </SectionCard>

      <BasicInfoEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={basicInfoData}
        onSave={handleSave}
      />
    </>
  );
}
