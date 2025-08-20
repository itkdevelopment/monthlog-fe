'use client';

import {
  ShoppingCart,
  Utensils,
  MapPin,
  CreditCard,
  Pill,
  Smartphone,
  Trash2,
  Clock,
  Lightbulb,
} from 'lucide-react';
import SectionCard from './shared/section-card';
import CircularProgress from './shared/circular-progress';
import StatItem from './shared/stat-item';
import { ConvenienceData } from '@/types/monthlog/city-detail';

interface CityConvenienceSectionProps {
  data?: ConvenienceData;
}

export default function CityConvenienceSection({ data }: CityConvenienceSectionProps) {
  if (!data) return null;

  return (
    <SectionCard
      title="현지생활 편의성"
      subtitle="38명이 기여한 정보"
      emoji="🛒"
    >
      {/* Top Stats Grid */}
      <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
        <div className="col-span-2 flex justify-center">
          <CircularProgress
            value={data.convenienceSatisfactionScore ?? 0}
            max={10}
            label="생활편의성 만족도"
          />
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 mb-1">
              {data.martAccessibilityWalkingTime ?? '-'}
            </div>
            <div className="text-sm text-gray-600">마트/편의점 접근성</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.deliveryPickupLocations ?? '-'}곳
            </div>
            <div className="text-sm text-gray-600">추천 배달맛집</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.convenienceStores24h?? '-'}곳
            </div>
            <div className="text-sm text-gray-600">24시간 운영시설</div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Detailed Stats */}
      <div className="space-y-1">
        <StatItem
          icon={<ShoppingCart className="h-4 w-4 text-gray-600" />}
          label="생활편의성 만족도"
          value={`${data.convenienceSatisfactionScore ?? 0}/10`}
        />
        <StatItem
          icon={<Utensils className="h-4 w-4 text-gray-600" />}
          label="배달 편의성"
          value={data.deliveryPickupScore ?? '-'}
        />
        <StatItem
          icon={<MapPin className="h-4 w-4 text-gray-600" />}
          label="배달 맛집 & 꿀팁"
          value={`${data.deliveryPickupLocations ?? '-'}`}
        />
        <StatItem
          icon={<ShoppingCart className="h-4 w-4 text-gray-600" />}
          label="배달 맛집 & 꿀팁"
          value={`${data.martAccessibilityWalkingTime ?? '-'}, ${data.mart24hourAvailability ?? '-'}`}
        />
        <StatItem
          icon={<CreditCard className="h-4 w-4 text-gray-600" />}
          label="현지 금융 & 환전 팁"
          value={`${data.bankingAtmAccess ?? '-'}, ${data.bankingFees}`}
        />
        <StatItem
          icon={<Pill className="h-4 w-4 text-gray-600" />}
          label="약국 접근성"
          value={`${data.pharmacyWalkingTime ?? '-'}, ${data.pharmacy24hour ?? '-'}`}
        />
        <StatItem
          icon={<Smartphone className="h-4 w-4 text-gray-600" />}
          label="유심/데이터 구매 편의성"
          value={`${data.simPurchaseLocation ?? '-'}, ${data.simPurchaseCost ?? '-'}`}
        />
        <StatItem
          icon={<Trash2 className="h-4 w-4 text-gray-600" />}
          label="쓰레기 배출 방법"
          value={data.wasteDisposalMethod ?? '-'}
        />
        <StatItem
          icon={<Clock className="h-4 w-4 text-gray-600" />}
          label="심야/24시간 시설"
          value={`${data.convenienceStores24h ?? 0}, ${data.cafes24h ?? 0}곳`}
        />
        <StatItem
          icon={<Lightbulb className="h-4 w-4 text-gray-600" />}
          label="생활 꿀팁 & 비상상황 대비"
          value={`${data.dailyLifeTips ?? '-'}, ${data.shoppingTipsCount ?? '-'}`}
        />
      </div>
    </SectionCard>
  );
}
