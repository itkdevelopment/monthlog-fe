'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/monthlog-proto/ui/card';
import {
  Edit,
  ShoppingCart,
  MapPin,
  Utensils,
  CreditCard,
  Pill,
  Smartphone,
  Trash2,
  Clock,
  Lightbulb,
} from 'lucide-react';
import { AnimatedGauge } from '@/components/monthlog-proto/charts/animated-gauge';

interface ConvenienceCardProps {
  cardData?: {
    title: string;
    contributorCount: number;
    satisfaction: {
      value: number;
      maxValue: number;
    };
    storeAccess: {
      description: string;
    };
    deliveryRestaurants: {
      count: string;
    };
    nighttimeFacilities: {
      count: string;
    };
    detailItems: Array<{
      icon: any;
      label: string;
      value: string;
    }>;
  };
  onGroupEdit?: () => void;
}

export default function ConvenienceCard({
  cardData = {
    title: '🛍️ 현지생활 편의성',
    contributorCount: 38,
    satisfaction: {
      value: 8.2,
      maxValue: 10,
    },
    storeAccess: {
      description: '도보 5분 내',
    },
    deliveryRestaurants: {
      count: '4곳',
    },
    nighttimeFacilities: {
      count: '12곳',
    },
    detailItems: [
      { icon: ShoppingCart, label: '생활편의성 만족도', value: '8.2/10' },
      { icon: Utensils, label: '배달 편의성', value: '배달의민족, 9/10' },
      { icon: MapPin, label: '배달 맛집 & 꿀팁', value: 'OO치킨 / 추천 4곳' },
      {
        icon: ShoppingCart,
        label: '마트/편의점 접근성',
        value: '도보 5분 내, 24시간',
      },
      {
        icon: CreditCard,
        label: '현지 금융 & 환전 팁',
        value: '신한은행 ATM (수수료 무료)',
      },
      {
        icon: Pill,
        label: '약국 접근성',
        value: '도보 3분 내, 24시간 약국 있음',
      },
      {
        icon: Smartphone,
        label: '유심/데이터 구매 편의성',
        value: '공항 내 KT 매장 / 8,000원',
      },
      { icon: Trash2, label: '쓰레기 배출 방법', value: '#분리수거 간편' },
      { icon: Clock, label: '심야/24시간 시설', value: '편의점 3곳, 카페 2곳' },
      {
        icon: Lightbulb,
        label: '생활 꿀팁 & 비상상황 대비',
        value: '"분리수거는 안해도..." / 찐꿀팁 8개',
      },
    ],
  },
  onGroupEdit = () => {},
}: ConvenienceCardProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-gray-900">
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-2xl">{cardData.title}</span>
              <p className="text-sm text-gray-500 font-normal mt-1">
                {cardData.contributorCount}명이 기여한 정보
              </p>
            </div>
          </div>
          <button
            onClick={onGroupEdit}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* 상단: 2단 분할 레이아웃 - 좌측 35%, 우측 65% */}
        <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
          {/* 좌측 영역 (35% - 2/5) - 대표 지표 */}
          <div className="col-span-2 flex justify-center">
            <AnimatedGauge
              value={cardData.satisfaction.value}
              maxValue={cardData.satisfaction.maxValue}
              label="생활편의성 만족도"
              color="#141414"
              size={50}
            />
          </div>

          {/* 우측 영역 (65% - 3/5) - 3개 보조 지표 */}
          <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
            {/* 보조 지표 1 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {cardData.storeAccess.description}
              </div>
              <div className="text-sm text-gray-600">마트/편의점 접근성</div>
            </div>

            {/* 보조 지표 2 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {cardData.deliveryRestaurants.count}
              </div>
              <div className="text-sm text-gray-600">추천 배달맛집</div>
            </div>

            {/* 보조 지표 3 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {cardData.nighttimeFacilities.count}
              </div>
              <div className="text-sm text-gray-600">24시간 운영시설</div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-gray-200" />

        {/* 하단: 상세 정보 리스트 - 최종 정의된 내용으로 수정 */}
        <div className="space-y-1">
          {cardData.detailItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <item.icon className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  {item.value}
                </span>
                <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
