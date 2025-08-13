"use client";

import {
  Bus,
  Plane,
  Navigation,
  Smartphone,
  MapPin,
  Ticket,
} from "lucide-react";
import SectionCard from "./shared/section-card";
import CircularProgress from "./shared/circular-progress";
import StatItem from "./shared/stat-item";
import { TransportData } from "@/types/monthlog/city-detail";

interface CityTransportSectionProps {
  data?: TransportData; // Cho phép undefined
}

export default function CityTransportSection({
  data,
}: CityTransportSectionProps) {
  if (!data) {
    return null; // Không render nếu chưa có dữ liệu
  }

  return (
    <SectionCard title="교통 및 이동" subtitle="42명이 기여한 정보" emoji="🚃">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
        <div className="col-span-2 flex justify-center">
          <CircularProgress
            value={data?.publicTransportConvenienceScore ?? 0}
            max={100}
            label="대중교통 편의성"
          />
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data?.airportToCityAvgTime ?? "-"}
            </div>
            <div className="text-sm text-gray-600">공항↔시내</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data?.touristSiteAccessibility ?? "-"}
            </div>
            <div className="text-sm text-gray-600">관광지 접근성</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data?.mainTransportMethod ?? "-"}
            </div>
            <div className="text-sm text-gray-600">주요 교통수단</div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Detailed Stats */}
      <div className="space-y-1">
        <StatItem
          icon={<Bus className="h-4 w-4 text-gray-600" />}
          label="대중교통 편의성"
          value={`${Math.round(
            (data?.publicTransportConvenienceScore ?? 0) / 10
          )}/10`}
        />

        <StatItem
          icon={<Plane className="h-4 w-4 text-gray-600" />}
          label="공항↔시내 이동정보"
          value={data?.airportTransportTaxiCost ?? "-"}
        />

        <StatItem
          icon={<Navigation className="h-4 w-4 text-gray-600" />}
          label="주요 교통수단&요금"
          value={data?.mainTransportMethod ?? "-"}
        />

        <StatItem
          icon={<Smartphone className="h-4 w-4 text-gray-600" />}
          label="추천 교통 앱"
          value={data?.recommendedTransportBus ?? "-"}
        />

        <StatItem
          icon={<MapPin className="h-4 w-4 text-gray-600" />}
          label="주요 관광지까지의 거리"
          value={data?.touristSiteAccessibility ?? "-"}
        />

        <StatItem
          icon={<Ticket className="h-4 w-4 text-gray-600" />}
          label="항공권 가성비 진단"
          value={data?.ridehailApps ?? "-"}
        />
      </div>
    </SectionCard>
  );
}
