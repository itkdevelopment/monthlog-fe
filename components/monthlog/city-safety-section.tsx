'use client';

import {
  Shield,
  Heart,
  Droplets,
  TriangleAlert,
  Phone,
  Building2,
} from 'lucide-react';
import SectionCard from './shared/section-card';
import CircularProgress from './shared/circular-progress';
import StatItem from './shared/stat-item';
import { SafetyData } from '@/types/monthlog/city-detail';

interface CitySafetySectionProps {
  data: SafetyData;
}

export default function CitySafetySection({ data }: CitySafetySectionProps) {
  return (
    <SectionCard title="안전 및 의료" subtitle="15명이 기여한 정보" emoji="🛡️">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
        <div className="col-span-2 flex justify-center">
          <CircularProgress
            value={data.safetyLevel}
            max={10}
            label="치안 수준"
          />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-4 items-center pr-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.medicalLevel}/10
            </div>
            <div className="text-sm text-gray-600">의료 환경 수준</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.waterSafety}
            </div>
            <div className="text-sm text-gray-600">수돗물 음용</div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Detailed Stats */}
      <div className="space-y-1">
        <StatItem
          icon={<Shield className="h-4 w-4 text-gray-600" />}
          label="치안 수준"
          value={`${data.safetyLevel}/10`}
        />

        <StatItem
          icon={<Heart className="h-4 w-4 text-gray-600" />}
          label="의료 환경 수준"
          value={`${data.medicalLevel}/10`}
        />

        <StatItem
          icon={<Droplets className="h-4 w-4 text-gray-600" />}
          label="수돗물 안정성"
          value={data.waterSafety}
        />

        <StatItem
          icon={<TriangleAlert className="h-4 w-4 text-gray-600" />}
          label="여행객 대상 범죄 유형"
          value={data.breakdown.crimeTypes}
        />

        <StatItem
          icon={<Phone className="h-4 w-4 text-gray-600" />}
          label="긴급 연락처"
          value={data.breakdown.emergencyContacts}
        />

        <StatItem
          icon={<Building2 className="h-4 w-4 text-gray-600" />}
          label="대사관 연락처"
          value={data.breakdown.embassyContact}
        />
      </div>
    </SectionCard>
  );
}
