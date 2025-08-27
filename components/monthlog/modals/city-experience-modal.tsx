// components/monthlog/modals/city-experience-modal.tsx
"use client";

import { useState } from "react";
import {
  X,
  Calendar,
  Users,
  Heart,
  Filter,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useCityDetail } from "@/app/monthlog/city/[slug]/_hook";

interface CityExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  totalContributors?: number;
  initialData?: any;
  cityId: number | null;
}

type TravelPeriod = "short" | "week" | "2-3weeks" | "month" | "longterm";
type CompanionType =
  | "solo"
  | "friends"
  | "partner"
  | "colleagues"
  | "family"
  | "familyWithKids"
  | "familyWithParents";
type TravelStyle =
  | "soloHealing"
  | "digitalNomad"
  | "budgetTravel"
  | "withKids"
  | "specialExperience"
  | "coupleTravel"
  | "friendsTravel"
  | "familyTravel"
  | "business";

interface FormData {
  startDate: string;
  endDate: string;
  companion: CompanionType | null;
  totalPeople: number;
  travelStyles: TravelStyle[];
  cityTags: string[];
  customTag: string;
  selectedComment: string;
  customComment: string;
}

export default function CityExperienceModal({
  isOpen,
  onClose,
  cityName,
  cityId,
  totalContributors = 155,
}: CityExperienceModalProps) {
  const { handleSubmit } = useCityDetail(cityId);
  const [activeFilter, setActiveFilter] = useState<
    "period" | "companion" | "style" | "tag" | "comment"
  >("period");
  const [formData, setFormData] = useState<FormData>({
    startDate: "",
    endDate: "",
    companion: null,
    totalPeople: 1,
    travelStyles: [],
    cityTags: [],
    customTag: "",
    selectedComment: "",
    customComment: "",
  });

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    travelStyle: false,
    cityTag: true,
    comment: true,
  });

  if (!isOpen) return null;

  const periodStats = [
    { label: "짧은여행 (6박 미만)", count: 25, percentage: 28 },
    { label: "일주일살기 (6박~13박)", count: 30, percentage: 34 },
    { label: "2-3주 살기 (14박~21박)", count: 20, percentage: 23 },
    { label: "한달살기 (22박~30박)", count: 10, percentage: 11 },
    { label: "1개월 이상 (31박 이상)", count: 3, percentage: 4 },
  ];

  const companionStats = [
    { label: "혼자", count: 35, percentage: 32 },
    { label: "친구", count: 25, percentage: 23 },
    { label: "연인", count: 20, percentage: 18 },
    { label: "가족", count: 12, percentage: 11 },
    { label: "동료", count: 8, percentage: 7 },
    { label: "가족(아이랑)", count: 6, percentage: 5 },
    { label: "가족(부모님이랑)", count: 4, percentage: 4 },
  ];

  const travelStyleStats = [
    { label: "#나혼자힐링", count: 42, percentage: 38 },
    { label: "#디지털노마드&워케이션", count: 50, percentage: 45 },
    { label: "#가성비여행", count: 15, percentage: 14 },
    { label: "#아이와함께", count: 8, percentage: 7 },
    { label: "#특별한 경험", count: 5, percentage: 4 },
    { label: "#커플여행", count: 12, percentage: 11 },
    { label: "#친구여행", count: 18, percentage: 16 },
    { label: "#가족여행", count: 14, percentage: 13 },
    { label: "#비즈니스", count: 6, percentage: 5 },
  ];

  const cityTagStats = [
    { label: "조용한 힐링", count: 45, percentage: 35 },
    { label: "자연 친화적", count: 38, percentage: 30 },
    { label: "해변 도시", count: 32, percentage: 25 },
    { label: "카페 문화", count: 25, percentage: 20 },
    { label: "맛집 천국", count: 20, percentage: 15 },
  ];

  const popularComments = [
    {
      text: "제주도는 정말 힐링하기 좋은 곳이에요. 바다를 보며 산책하는 것만으로도 마음이 편안해집니다.",
      count: 28,
    },
    {
      text: "자연이 아름다운 도시라는 말이 딱 맞아요. 한라산과 바다가 어우러진 �경이 정말 인상적이었습니다.",
      count: 21,
    },
  ];

  const companions = [
    { id: "solo", label: "혼자" },
    { id: "friends", label: "친구" },
    { id: "partner", label: "연인" },
    { id: "colleagues", label: "동료" },
    { id: "family", label: "가족" },
    { id: "familyWithKids", label: "가족(아이랑)" },
    { id: "familyWithParents", label: "가족(부모님이랑)" },
  ];

  const travelStyles = [
    { id: "soloHealing", label: "#나혼자힐링" },
    { id: "digitalNomad", label: "#디지털노마드&워케이션" },
    { id: "withKids", label: "#아이와함께" },
    { id: "budgetTravel", label: "#가성비여행" },
    { id: "specialExperience", label: "#특별한 경험" },
  ];

  const recommendedTags = [
    "빠른인터넷",
    "24시간카페",
    "코워킹스페이스",
    "저렴한물가",
    "노마드커뮤니티",
    "콘센트많은곳",
    "업무집중",
    "분위기좋은카페",
    "교통편리",
    "다양한액티비티",
    "휴양지",
    "키즈존",
    "안전한놀이터",
    "소아과인접",
    "유모차접근성좋음",
    "취사가능숙소많음",
    "가족여행",
    "안전한치안",
    "고급숙소",
    "파인다이닝",
    "프라이빗투어",
    "호캉스",
    "쇼핑몰근접",
    "특별한경험",
  ];

  const cityTags = [
    "조용한 힐링",
    "자연 친화적",
    "카페 문화",
    "해변 도시",
    "산악 지대",
    "문화 예술",
    "맛집 천국",
    "교통 편리",
  ];

  const handleToggleStyle = (style: TravelStyle) => {
    setFormData((prev) => ({
      ...prev,
      travelStyles: prev.travelStyles.includes(style)
        ? prev.travelStyles.filter((s) => s !== style)
        : [...prev.travelStyles, style],
    }));
  };

  const handleToggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      cityTags: prev.cityTags.includes(tag)
        ? prev.cityTags.filter((t) => t !== tag)
        : [...prev.cityTags, tag],
    }));
  };

  const handleAddCustomTag = () => {
    if (formData.customTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        cityTags: [...prev.cityTags, prev.customTag.trim()],
        customTag: "",
      }));
    }
  };

//   const handleSubmit = () => {
//     // Handle form submission
//     console.log("Form data:", formData);
//     onClose();
//   };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Bottom Sheet Modal */}
      <div
        className="fixed left-0 right-0 bg-white rounded-t-2xl flex flex-col"
        style={{ bottom: 0, height: "95vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {cityName}는 어땠나요?
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveFilter("period")}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                  activeFilter === "period"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Calendar className="h-4 w-4" />
                여행기간만
              </button>
              <button
                onClick={() => setActiveFilter("companion")}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                  activeFilter === "companion"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Users className="h-4 w-4" />
                동행정보만
              </button>
              <button
                onClick={() => setActiveFilter("style")}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                  activeFilter === "style"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Heart className="h-4 w-4" />
                여행스타일만
              </button>
              <button
                onClick={() => setActiveFilter("tag")}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                  activeFilter === "tag"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Filter className="h-4 w-4" />
                도시 태그만
              </button>
              <button
                onClick={() => setActiveFilter("comment")}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                  activeFilter === "comment"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Filter className="h-4 w-4" />
                한줄 코멘트만
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {totalContributors}명이 기여한 정보
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Left Sidebar - Statistics */}
          <div className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Travel Period Distribution */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  여행기간 분포
                </h3>
                <div className="space-y-4">
                  {periodStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {stat.label}
                        </span>
                        <span className="text-gray-500">{stat.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: "rgb(11, 36, 251)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Companion Distribution */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  동행정보 분포
                </h3>
                <div className="space-y-4">
                  {companionStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {stat.label}
                        </span>
                        <span className="text-gray-500">{stat.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: "rgb(11, 36, 251)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Style Distribution */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    여행 스타일 분포
                  </h3>
                  <button
                    onClick={() => toggleSection("travelStyle")}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {expandedSections.travelStyle ? "접기" : "더보기"}
                    <ChevronDown
                      className={`h-4 w-4 ml-1 transition-transform ${
                        expandedSections.travelStyle ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div className="space-y-4">
                  {(expandedSections.travelStyle
                    ? travelStyleStats
                    : travelStyleStats.slice(0, 5)
                  ).map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {stat.label}
                        </span>
                        <span className="text-gray-500">{stat.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: "rgb(11, 36, 251)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* City Tags Distribution */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    도시 태그 분포
                  </h3>
                  <button
                    onClick={() => toggleSection("cityTag")}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    더보기
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform" />
                  </button>
                </div>
                <div className="space-y-4">
                  {cityTagStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {stat.label}
                        </span>
                        <span className="text-gray-500">{stat.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: "rgb(11, 36, 251)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Distribution */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    한줄 코멘트 분포
                  </h3>
                  <button
                    onClick={() => toggleSection("comment")}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    더보기
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform" />
                  </button>
                </div>
                <div className="space-y-5">
                  {popularComments.map((comment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">
                          {comment.count}명
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {comment.text}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${(comment.count / 70) * 100}%`,
                            backgroundColor: "rgb(11, 36, 251)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
              {/* Travel Period */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  여행기간
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  시작일과 종료일을 선택해주세요
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시작일
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      종료일
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.endDate}
                      min={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Companion Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  동행정보
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  함께한 동행자를 선택해주세요
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {companions.map((companion) => (
                    <button
                      key={companion.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          companion: companion.id as CompanionType,
                        }))
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.companion === companion.id
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {companion.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    총 인원수:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.totalPeople}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        totalPeople: parseInt(e.target.value),
                      }))
                    }
                  />
                  <span className="text-sm text-gray-600">명</span>
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  여행 스타일
                </h3>
                <div className="flex flex-wrap gap-3">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleToggleStyle(style.id as TravelStyle)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.travelStyles.includes(style.id as TravelStyle)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Tags */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  도시 대표 태그
                </h3>

                {/* Recommended Tags based on Travel Style */}
                {formData.travelStyles.length > 0 && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium mb-3">
                      ✨ 선택한 여행 스타일에 맞는 추천 태그:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recommendedTags.slice(0, 12).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleToggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.cityTags.includes(tag)
                              ? "bg-blue-600 text-white"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular City Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {cityTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.cityTags.includes(tag)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Selected Tags Display */}
                {formData.cityTags.length > 0 && (
                  <div className="mb-6 flex items-center gap-3 flex-wrap">
                    <p className="text-sm text-gray-600">선택된 태그:</p>
                    {formData.cityTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Custom Tag Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="새로운 태그 입력"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.customTag}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customTag: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={handleAddCustomTag}
                    disabled={!formData.customTag.trim()}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  한줄 코멘트
                </h3>

                {/* Popular Comments */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">
                    인기 코멘트에서 선택하거나 직접 입력하세요:
                  </p>
                  <div className="space-y-2">
                    {popularComments.map((comment, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            selectedComment: comment.text,
                          }))
                        }
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          formData.selectedComment === comment.text
                            ? "bg-black text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-sm">{comment.text}</span>
                        <span className="text-xs opacity-70 ml-2">
                          ({comment.count}명)
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Comment */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">또는 직접 입력:</p>
                  <textarea
                    placeholder="이 도시에 대한 당신만의 한줄 코멘트를 남겨주세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    value={formData.customComment}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customComment: e.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.customComment.length}/200자
                  </p>
                </div>

                {/* AI Suggested Tags */}
                {formData.customComment && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium mb-3">
                      💡 코멘트를 바탕으로 추천하는 도시 태그:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleToggleTag("힐링 스팟")}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          formData.cityTags.includes("힐링 스팟")
                            ? "bg-blue-600 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        힐링 스팟
                      </button>
                      <button
                        onClick={() => handleToggleTag("자연 경관")}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          formData.cityTags.includes("자연 경관")
                            ? "bg-blue-600 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        자연 경관
                      </button>
                      <button
                        onClick={() => handleToggleTag("여유로운 분위기")}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-colors bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                      >
                        여유로운 분위기
                      </button>
                      <button
                        onClick={() => handleToggleTag("재방문 추천")}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-colors bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                      >
                        재방문 추천
                      </button>
                      <button
                        onClick={() => handleToggleTag("휴식 최적")}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-colors bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                      >
                        휴식 최적
                      </button>
                      <button
                        onClick={() => handleToggleTag("경치 좋은")}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-colors bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                      >
                        경치 좋은
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+430 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
