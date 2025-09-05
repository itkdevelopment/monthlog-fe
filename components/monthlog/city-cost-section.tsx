// app/monthlog/city/components/city-cost-section.tsx
"use client";
import {
  Star,
  House,
  DollarSign,
  Car,
  Wifi,
  Utensils,
  MapPin,
  ShoppingCart,
  Calculator,
  Edit,
  Zap,
} from "lucide-react";
import SectionCard from "./shared/section-card";
import CircularProgress from "./shared/circular-progress";
import StatItem from "./shared/stat-item";
import { CostData } from "@/types/monthlog/city-detail";
import { useState } from "react";
import CostBudgetGroupEditPage from "@/app/monthlog/city/[slug]/cost-budget-group-edit/page";

interface CityCostSectionProps {
  data?: CostData;
  cityName?: string;
  cityId: number | null;
  citySlug: string;
}

export default function CityCostSection({
  data,
  citySlug,
  cityId,
}: CityCostSectionProps) {
  const [budgetInputs, setBudgetInputs] = useState({
    people: 1,
    days: 30,
    season: "4월",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const [costData, setCostData] = useState<CostData | null>(data || null);

  const handleInputChange = (field: string, value: string | number) => {
    setBudgetInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditClick = () => {
    setTargetSection(null); // Full form edit
    setIsEditModalOpen(true);
  };

  const handleSectionEdit = (section: string) => {
    setTargetSection(section);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTargetSection(null);
  };

  const handleSaveCostData = (updatedData: CostData) => {
    setCostData(updatedData);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <SectionCard
        title="한달살이 비용"
        subtitle="23명이 기여한 정보"
        emoji="💰"
        onEdit={
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
        }
      >
        {/* Top Stats Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8 pt-0 pb-6">
          <div className="lg:col-span-2 flex justify-center">
            <CircularProgress
              value={data?.costSatisfactionScore ?? 0}
              max={10}
              label="물가 만족도"
              size={120}
            />
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:pr-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {data?.totalEstimatedCost ?? "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                총 예상 비용
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {data?.monthlyRent ?? "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                월세 (원룸 기준)
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {data?.livingExpenses ?? "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                필수 생활비 (월)
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200" />
        {/* Detailed Breakdown */}
        <div className="space-y-1">
          <StatItem
            icon={<Star className="h-4 w-4 text-gray-600" />}
            label="물가 만족도"
            value={`${data?.costSatisfactionScore ?? 0}/10점`}
            onEdit={() => handleSectionEdit("satisfaction")}
          />
          <StatItem
            icon={<House className="h-4 w-4 text-gray-600" />}
            label="숙소 월세"
            value={data?.monthlyRent ?? "-"}
            onEdit={() => handleSectionEdit("monthlyRent")}
          />
          <StatItem
            icon={<DollarSign className="h-4 w-4 text-gray-600" />}
            label="초기 정착 비용"
            value={data?.housingDeposit ?? "-"}
            onEdit={() => handleSectionEdit("initialSettlement")}
          />
          <StatItem
            icon={<Zap className="h-4 w-4 text-gray-600" />}
            label="공과금 (월평균)"
            value={data?.utilitiesCost ?? "-"}
            onEdit={() => handleSectionEdit("utilityBills")}
          />
          <StatItem
            icon={<Car className="h-4 w-4 text-gray-600" />}
            label="교통비 (월평균)"
            value={`${data?.transportationCost ?? "-"}, ${
              data?.transportationPreference ?? "-"
            }`}
            onEdit={() => handleSectionEdit("transportationExpenses")}
          />
          <StatItem
            icon={<Wifi className="h-4 w-4 text-gray-600" />}
            label="통신비 (월평균)"
            value={`${data?.communicationCost ?? "-"}, ${
              data?.communicationPreference ?? "-"
            }`}
            onEdit={() => handleSectionEdit("communicationCost")}
          />
          <StatItem
            icon={<Utensils className="h-4 w-4 text-gray-600" />}
            label="식비 (월평균)"
            value={`${data?.foodCost ?? "-"}, ${data?.avgMealCost ?? "-"}`}
            onEdit={() => handleSectionEdit("foodCost")}
          />
          <StatItem
            icon={<MapPin className="h-4 w-4 text-gray-600" />}
            label="여가/액티비티"
            value={`${data?.entertainmentCost ?? "-"}, ${
              data?.popularActivities ?? "-"
            }`}
          />
          <StatItem
            icon={<ShoppingCart className="h-4 w-4 text-gray-600" />}
            label="현지물가 수준"
            value={`${data?.referencePriceItem ?? "-"}, ${
              data?.referencePrice ?? "-"
            }`}
          />
          <StatItem
            icon={<Calculator className="h-4 w-4 text-gray-600" />}
            label="총 예상 비용 (월)"
            value={`${data?.monthlyCostRangeMin ?? "-"}, ${
              data?.monthlyCostRangeMax ?? "-"
            }`}
            onEdit={() => handleSectionEdit("totalCost")}
          />
        </div>
        {/* Budget Calculator */}
        <div className="border-t border-gray-200 pt-4 sm:pt-6 mt-4 sm:mt-6">
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
            나만의 예산 계산기
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-700 mb-1">
                인원수
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B24FB] focus:border-[#0B24FB]"
                value={budgetInputs.people}
                onChange={(e) =>
                  handleInputChange("people", parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-700 mb-1">
                체류 일수
              </label>
              <input
                type="number"
                min="1"
                max="365"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B24FB] focus:border-[#0B24FB]"
                value={budgetInputs.days}
                onChange={(e) =>
                  handleInputChange("days", parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-700 mb-1">
                체류 시기
              </label>
              <select
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B24FB] focus:border-[#0B24FB]"
                value={budgetInputs.season}
                onChange={(e) => handleInputChange("season", e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={`${i + 1}월`}>
                    {i + 1}월
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-colors bg-[#0B24FB] hover:bg-blue-700 text-white text-sm sm:text-base">
            내 예산 확인하기
          </button>
        </div>
      </SectionCard>

      {/* Edit Modal */}
      <CostBudgetGroupEditPage
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        initialData={costData ?? undefined}
        citySlug={citySlug}
        cityId={cityId}
        targetSection={targetSection}
      />
    </>
  );
}
