"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/assi-ai/ui/card";
import { Badge } from "@/components/assi-ai/ui/badge";
import { Button } from "@/components/assi-ai/ui/button";
import { ChevronRight, ExternalLink } from "lucide-react";

interface TravelProgram {
  id: string;
  name: string;
  region: string;
  amount: string;
  duration: string;
  requirements: string[];
  needsPlan: boolean;
  familyFriendly: boolean;
  applicationMethod: string;
  applicationUrl: string;
}

interface MobileProgramComparisonProps {
  programs: TravelProgram[];
  onCreatePlan: (id: string) => void;
}

export default function MobileProgramComparison({
  programs,
  onCreatePlan,
}: MobileProgramComparisonProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (programs.length === 0) return null;
  const current = programs[activeTab];

  return (
    <div className="lg:hidden mb-8">
      {/* tab nav */}
      <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
        {programs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === idx
                ? "border-[#0000f5] text-[#0000f5] bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            프로그램 {idx + 1}
          </button>
        ))}
      </div>

      {/* main card */}
      <Card className="border-2 border-[#0000f5] bg-blue-50">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl leading-tight">
              {current.name}
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-[#0000f5] text-white border-[#0000f5] text-sm font-medium ml-2 flex-shrink-0"
            >
              {current.amount}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {[
            ["📍 지역", current.region],
            ["⏰ 기간", current.duration],
            [
              "👨‍👩‍👧‍👦 가족 친화도",
              current.familyFriendly ? "⭐⭐⭐ 높음" : "⭐ 보통",
            ],
            ["📝 계획서 필요", current.needsPlan ? "필요" : "불필요"],
            ["📋 신청 방법", current.applicationMethod],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
            >
              <span className="text-gray-600 font-medium">{label}</span>
              <span
                className={`font-semibold ${
                  label === "📝 계획서 필요"
                    ? current.needsPlan
                      ? "text-orange-600"
                      : "text-green-600"
                    : "text-gray-900"
                }`}
              >
                {value as string}
              </span>
            </div>
          ))}

          {/* 요구사항 */}
          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-gray-600 font-medium block mb-2">
              ✅ 요구사항
            </span>
            <ul className="space-y-1">
              {current.requirements.map((req) => (
                <li
                  key={req}
                  className="text-sm text-gray-700 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#0000f5] rounded-full"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* action buttons */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Button
              size="lg"
              onClick={() => onCreatePlan(current.id)}
              variant={current.needsPlan ? "default" : "outline"}
              className={
                current.needsPlan
                  ? "w-full bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                  : "w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {current.needsPlan ? "계획서 작성하기" : "바로 신청하기"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => window.open(current.applicationUrl, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              프로그램 상세 페이지 보기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* quick-switch list */}
      {programs.length > 1 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            💡 다른 프로그램과 비교
          </h4>
          <div className="space-y-2">
            {programs.map((p, idx) =>
              idx === activeTab ? null : (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  className="w-full flex items-center justify-between p-2 bg-white rounded border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      {p.region} • {p.amount}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* hint */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center text-sm text-blue-700">
        👆 탭을 눌러 다른 프로그램과 비교해보세요
      </div>
    </div>
  );
}
