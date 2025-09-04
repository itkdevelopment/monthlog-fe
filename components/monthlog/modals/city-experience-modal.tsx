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
import {
  TContributeHeroSectionPayload,
  TTag,
  TTagData,
} from "@/types/monthlog/city-detail";

interface CityExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  totalContributors?: number;
  initialData?: any;
  cityId: number | null;
}

interface FormData {
  startDate: string;
  endDate: string;
  companion: number | null;
  totalPeople: number;
  travelStyles: number[];
  cityTags: number[];
  citySubTags: number[];
  customTags: string[];
  selectedComment: string;
  customComment: string;
}

export const travelStyleToTags: Record<number, number[]> = {
  8: [21, 22, 23, 24, 25, 26, 27],
  9: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
  10: [39, 40, 41, 42, 43, 44],
  11: [46, 47, 48, 49, 50, 51],
  12: [52, 53, 54, 55, 56, 57],
};

export default function CityExperienceModal({
  isOpen,
  onClose,
  cityName,
  cityId,
  totalContributors = 155,
}: CityExperienceModalProps) {
  const { tags, handleContributeHeroSection, staticData } =
    useCityDetail(cityId);
  const [activeFilter, setActiveFilter] = useState<
    "period" | "companion" | "style" | "tag" | "comment" | "all"
  >("all");

  const [customTag, setCustomTag] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    startDate: "",
    endDate: "",
    companion: null,
    totalPeople: 1,
    travelStyles: [],
    cityTags: [],
    citySubTags: [],
    customTags: [],
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

  const periodStats = (staticData?.travelPeriodStats || []).map(
    (stat: any) => ({
      label: stat.period,
      count: stat.count,
      percentage: Math.round((stat.count / totalContributors) * 100),
    })
  );

  const companionStats = (staticData?.companionTypeStats || []).map(
    (stat: any) => ({
      label: stat.companionType,
      count: stat.count,
      percentage: Math.round((stat.count / totalContributors) * 100),
    })
  );

  const travelStyleStats = (staticData?.travelStyleStats || []).map(
    (stat: any) => ({
      label: stat.travelStyle,
      count: stat.count,
      percentage: Math.round((stat.count / totalContributors) * 100),
    })
  );

  const cityTagStats = (staticData?.cityRepresentativeStats || []).map(
    (stat: any) => ({
      label: stat.cityRepresentative,
      count: stat.count,
      percentage: Math.round((stat.count / totalContributors) * 100),
    })
  );

  const popularComments = (staticData?.oneLineCommentStats || []).map(
    (comment: any) => ({
      text: comment.comment,
      count: comment.count,
    })
  );

  const getTagByCate = (category: string) => {
    return tags![category as keyof TTagData].map((item: TTag) => ({
      ...item,
      label: item.name,
    }));
  };

  const companions = getTagByCate("COMPANION");

  const travelStyles = getTagByCate("TRAVEL_STYLE");

  const recommendedTags = getTagByCate("CITY_REP_SUB");

  const cityTags = getTagByCate("CITY_REP");

  const recommendedTagIds = formData.travelStyles.flatMap(
    (styleId) => travelStyleToTags[styleId] || []
  );

  const handleToggleStyle = (style: number) => {
    setFormData((prev) => ({
      ...prev,
      travelStyles: prev.travelStyles.includes(style)
        ? prev.travelStyles.filter((s) => s !== style)
        : [...prev.travelStyles, style],
    }));
  };

  const handleToggleTag = (
    tag: number | string,
    type: "tag" | "sub" | "custom"
  ) => {
    switch (type) {
      case "tag":
        setFormData((prev) => ({
          ...prev,
          cityTags: prev.cityTags.includes(tag as number)
            ? prev.cityTags.filter((t) => t !== (tag as number))
            : [...prev.cityTags, tag as number],
        }));
        break;
      case "sub":
        setFormData((prev) => ({
          ...prev,
          citySubTags: prev.citySubTags.includes(tag as number)
            ? prev.citySubTags.filter((t) => t !== (tag as number))
            : [...prev.citySubTags, tag as number],
        }));
        break;
      default:
        setFormData((prev) => ({
          ...prev,
          customTags: prev.customTags.includes(tag as string)
            ? prev.customTags.filter((t) => t !== (tag as string))
            : [...prev.customTags, tag as string],
        }));
        break;
    }
  };

  const handleAddCustomTag = () => {
    if (!!customTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        customTags: [...prev.customTags, customTag.trim()],
      }));

      setCustomTag("");
    }
  };

  const handleSubmit = () => {
    const payload: TContributeHeroSectionPayload =
      {} as TContributeHeroSectionPayload;
    if (formData.companion)
      payload.companion = { companionId: formData.companion };

    if (formData.totalPeople) payload.totalPeople = formData.totalPeople;

    if (!!formData.startDate) payload.startDate = formData.startDate;
    if (!!formData.endDate) payload.endDate = formData.endDate;
    if (!!formData.selectedComment) payload.comment = formData.selectedComment;
    if (!!formData.customComment) payload.comment = formData.customComment;

    if (formData.cityTags.length > 0)
      payload.cityRepresentation = { cityRepIds: formData.cityTags };

    if (formData.citySubTags.length > 0)
      payload.cityRepresentation = {
        ...payload.cityRepresentation,
        cityRepSubIds: formData.citySubTags,
      };

    if (formData.customTags.length > 0)
      payload.cityRepresentation = {
        ...payload.cityRepresentation,
        freeTextTags: formData.customTags,
      };

    if (formData.travelStyles.length > 0)
      payload.travelStyle = { travelStyleIds: formData.travelStyles };
    handleContributeHeroSection(payload);
    onClose();
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSelectActiveFilter = (
    filter: "comment" | "companion" | "period" | "style" | "tag" | "all"
  ) => {
    if (activeFilter === filter) setActiveFilter("all");
    else setActiveFilter(filter);
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
                onClick={() => handleSelectActiveFilter("period")}
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
                onClick={() => handleSelectActiveFilter("companion")}
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
                onClick={() => handleSelectActiveFilter("style")}
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
                onClick={() => handleSelectActiveFilter("tag")}
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
                onClick={() => handleSelectActiveFilter("comment")}
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
              {["all", "period"].includes(activeFilter) && (
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
              )}

              {/* Companion Info */}
              {["all", "companion"].includes(activeFilter) && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    동행정보
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    함께한 동행자를 선택해주세요
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {companions.map((companion: TTag) => (
                      <button
                        key={companion.id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            companion: companion.id,
                          }))
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          formData.companion === companion.id
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {companion.name}
                      </button>
                    ))}
                  </div>

                  <div
                    className={`flex items-center gap-3 ${
                      formData.companion === 1 ? "hidden" : ""
                    }`}
                  >
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
              )}

              {/* Travel Style */}
              {["all", "style"].includes(activeFilter) && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    여행 스타일
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {travelStyles.map((style: TTag) => (
                      <button
                        key={style.id}
                        onClick={() => handleToggleStyle(style.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          formData.travelStyles.includes(style.id)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* City Tags */}
              {["all", "tag"].includes(activeFilter) && (
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
                        {recommendedTags
                          .filter((tag: TTag) =>
                            recommendedTagIds.includes(tag.id)
                          )
                          .map((tag: TTag) => (
                            <button
                              key={tag.id}
                              onClick={() => handleToggleTag(tag.id, "sub")}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                formData.citySubTags.includes(tag.id)
                                  ? "bg-blue-600 text-white"
                                  : "bg-green-600 text-white hover:bg-green-700"
                              }`}
                            >
                              {tag.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Regular City Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {cityTags.map((tag: TTag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleToggleTag(tag.id, "tag")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          formData.cityTags.includes(tag.id)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>

                  {/* Selected Tags Display */}
                  {(formData.cityTags.length > 0 ||
                    formData.citySubTags.length > 0 ||
                    formData.customTags.length > 0) && (
                    <div className="mb-6 flex items-center gap-3 flex-wrap">
                      <p className="text-sm text-gray-600">선택된 태그:</p>
                      {[
                        ...formData.cityTags,
                        ...formData.citySubTags,
                        ...formData.customTags,
                      ].map((tag) => (
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
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                    />
                    <button
                      onClick={handleAddCustomTag}
                      disabled={!customTag.trim()}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Comments */}
              {["all", "comment"].includes(activeFilter) && (
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
                              customComment: comment.text,
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
                    <p className="text-sm text-gray-600 mb-3">
                      또는 직접 입력:
                    </p>
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
                          onClick={() => handleToggleTag("힐링 스팟", "custom")}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.customTags.includes("힐링 스팟")
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                          }`}
                        >
                          힐링 스팟
                        </button>
                        <button
                          onClick={() => handleToggleTag("자연 경관", "custom")}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.customTags.includes("자연 경관")
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                          }`}
                        >
                          자연 경관
                        </button>
                        <button
                          onClick={() =>
                            handleToggleTag("여유로운 분위기", "custom")
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.customTags.includes("여유로운 분위기")
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                          }`}
                        >
                          여유로운 분위기
                        </button>
                        <button
                          onClick={() =>
                            handleToggleTag("재방문 추천", "custom")
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.customTags.includes("재방문 추천")
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                          }`}
                        >
                          재방문 추천
                        </button>
                        <button
                          onClick={() => handleToggleTag("휴식 최적", "custom")}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.customTags.includes("휴식 최적")
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                          }`}
                        >
                          휴식 최적
                        </button>
                        <button
                          onClick={() => handleToggleTag("경치 좋은", "custom")}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            formData.customTags.includes("경치 좋은")
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                          }`}
                        >
                          경치 좋은
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
