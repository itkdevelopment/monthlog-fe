// components/monthlog/city-community-section.tsx
'use client';

import {
  TrendingUp,
  Heart,
  Globe,
  Users,
  BookOpen,
  Palette,
  Baby,
} from 'lucide-react';
import SectionCard from './shared/section-card';
import CircularProgress from './shared/circular-progress';
import StatItem from './shared/stat-item';
import { CommunityData } from '@/types/monthlog/city-detail';

interface CityCommunitySectionProps {
  data: CommunityData;
}

export default function CityCommunitySection({
  data,
}: CityCommunitySectionProps) {
  return (
    <SectionCard
      title="로컬 경험&커뮤니티"
      subtitle="12명이 기여한 정보"
      emoji="💬"
    >
      {/* Top Stats Grid */}
      <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
        <div className="col-span-2 flex justify-center">
          <CircularProgress
            value={data.travelerFriendliness}
            max={10}
            label="여행자 친화도"
          />
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.englishCommunication}
            </div>
            <div className="text-sm text-gray-600">영어소통 원활도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.localAtmosphere}
            </div>
            <div className="text-sm text-gray-600">동네 분위기</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.learningClasses}
            </div>
            <div className="text-sm text-gray-600">배움/클래스</div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Detailed Stats */}
      <div className="space-y-1">
        <StatItem
          icon={<TrendingUp className="h-4 w-4 text-gray-600" />}
          label="여행자 친화도"
          value={`${data.travelerFriendliness}/10`}
        />

        <StatItem
          icon={<Heart className="h-4 w-4 text-gray-600" />}
          label="동네 인심&분위기"
          value={data.breakdown.neighborhoodVibe}
        />

        <StatItem
          icon={<Globe className="h-4 w-4 text-gray-600" />}
          label="영어 소통 원활도"
          value={data.breakdown.englishFluency}
        />

        <StatItem
          icon={<Users className="h-4 w-4 text-gray-600" />}
          label="커뮤니티/소셜"
          value={data.breakdown.communityActivity}
        />

        <StatItem
          icon={<BookOpen className="h-4 w-4 text-gray-600" />}
          label="배움/클래스 정보"
          value={data.breakdown.learningOpportunities}
        />

        <StatItem
          icon={<Palette className="h-4 w-4 text-gray-600" />}
          label="로컬 문화체험 기회"
          value={data.breakdown.culturalExperiences}
        />

        <StatItem
          icon={<Baby className="h-4 w-4 text-gray-600" />}
          label="어린이 체험/교육"
          value={data.breakdown.kidsActivities}
        />
      </div>
    </SectionCard>
  );
}
