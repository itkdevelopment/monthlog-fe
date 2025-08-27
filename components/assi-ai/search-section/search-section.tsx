"use client";

import { Button } from "@/components/assi-ai/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/assi-ai/ui/card";
import { Badge } from "@/components/assi-ai/ui/badge";
import {
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface SearchSectionProps {
  programs: any[];
  selectedPrograms: string[];
  sortBy: "relevance" | "deadline" | "latest";
  setSortBy: (sortBy: "relevance" | "deadline" | "latest") => void;
  clearSelectedPrograms: () => void;
  handleProgramSelect: (programId: string) => void;
  selectedProgramDetail: string | null;
  setSelectedProgramDetail: (programId: string | null) => void;
  openSidePanel: (url: string, title: string) => void;
  goToStep: (
    step: "question" | "search" | "compare" | "plan" | "complete"
  ) => void;
  changedItems: Set<string>;
  handleCompare: () => void;
}

export default function SearchSection({
  programs,
  selectedPrograms,
  sortBy,
  setSortBy,
  clearSelectedPrograms,
  handleProgramSelect,
  selectedProgramDetail,
  setSelectedProgramDetail,
  openSidePanel,
  goToStep,
  changedItems,
  handleCompare,
}: SearchSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg mb-8 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#0000f5]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            추천 프로그램 ({programs.length}개)
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "relevance" | "deadline" | "latest")
              }
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0000f5] focus:border-[#0000f5]"
            >
              <option value="relevance">적합도순</option>
              <option value="deadline">마감임박순</option>
              <option value="latest">최신등록순</option>
            </select>
            <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <Button
            variant="outline"
            onClick={clearSelectedPrograms}
            className="flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
          >
            <RotateCcw className="w-4 h-4" />
            다시선택
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mb-8">
        카드를 눌러 확인하고 관심 있는 항목만 선택해주세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {programs.map((program) => (
          <Card
            key={program.id}
            className={`cursor-pointer transition-all bg-white border-gray-200 hover:border-gray-300 hover:shadow-md ${
              selectedPrograms.includes(program.id)
                ? "ring-2 ring-[#0000f5] border-[#0000f5] bg-blue-50"
                : ""
            } ${
              changedItems.has(program.id)
                ? "ring-2 ring-green-400 border-green-400 bg-green-50"
                : ""
            }`}
            onClick={() => handleProgramSelect(program.id)}
          >
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-gray-900">
                  {program.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {sortBy === "relevance" && (
                    <span className="text-xs text-blue-600 font-medium">
                      적합도 {Math.floor(Math.random() * 20) + 80}%
                    </span>
                  )}
                  {sortBy === "deadline" && (
                    <span className="text-xs text-blue-600 font-medium">
                      D-{Math.floor(Math.random() * 50) + 10}
                    </span>
                  )}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selectedPrograms.includes(program.id)
                        ? "bg-[#0000f5] border-[#0000f5]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPrograms.includes(program.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{program.region}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{program.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    {program.familyFriendly ? "가족 동반 가능" : "개인 여행"}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-[#0000f5] border border-blue-200 text-sm font-medium"
                  >
                    {program.amount}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProgramDetail(
                        selectedProgramDetail === program.id ? null : program.id
                      );
                    }}
                  >
                    <ChevronDown className="w-3 h-3 mr-1" />
                    자세히보기
                  </Button>
                </div>

                {selectedProgramDetail === program.id && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm border border-gray-200">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">
                          신청 방법:
                        </span>{" "}
                        <span className="text-gray-600">
                          {program.applicationMethod}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          요구사항:
                        </span>
                        <ul className="list-disc list-inside ml-2 mt-1 text-gray-600">
                          {program.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          여행계획서:
                        </span>{" "}
                        <span className="text-gray-600">
                          {program.needsPlan ? "필요" : "불필요"}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openSidePanel(program.applicationUrl, program.name);
                          }}
                          className="w-full bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          프로그램 바로가기
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <Button
          variant="outline"
          onClick={() => goToStep("question")}
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
          이전 단계
        </Button>
        {selectedPrograms.length > 0 && (
          <Button
            onClick={handleCompare}
            size="lg"
            className="px-8 py-6 bg-[#0000f5] hover:bg-[#0000f5]/90 text-white font-medium rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span>선택한 {selectedPrograms.length}개 프로그램 비교하기</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
