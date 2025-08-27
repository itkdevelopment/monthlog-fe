"use client";

import { Button } from "@/components/assi-ai/ui/button";
import { Badge } from "@/components/assi-ai/ui/badge";
import { FileText, ChevronLeft, ExternalLink } from "lucide-react";
import MobileProgramComparison from "@/components/assi-ai/mobile-program-comparison";

interface CompareSectionProps {
  programs: any[];
  selectedPrograms: string[];
  goToStep: (
    step: "question" | "search" | "compare" | "plan" | "complete"
  ) => void;
  handleCreatePlan: (programId: string) => void;
  openSidePanel: (url: string, title: string) => void;
}

export default function CompareSection({
  programs,
  selectedPrograms,
  goToStep,
  handleCreatePlan,
  openSidePanel,
}: CompareSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg mb-8 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
            <FileText className="w-4 h-4 text-[#0000f5]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            선택 프로그램 비교
          </h2>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 text-gray-600 font-medium">
                프로그램명
              </th>
              <th className="text-left p-4 text-gray-600 font-medium">지역</th>
              <th className="text-left p-4 text-gray-600 font-medium">
                지원금
              </th>
              <th className="text-left p-4 text-gray-600 font-medium">
                가족 친화도
              </th>
              <th className="text-left p-4 text-gray-600 font-medium">
                계획서 필요
              </th>
              <th className="text-left p-4 text-gray-600 font-medium">액션</th>
            </tr>
          </thead>
          <tbody>
            {programs
              .filter((p) => selectedPrograms.includes(p.id))
              .map((program) => (
                <tr
                  key={program.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {program.name}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 mt-1"
                        onClick={() =>
                          window.open(program.applicationUrl, "_blank")
                        }
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        프로그램 바로가기
                      </Button>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{program.region}</td>
                  <td className="p-4">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-[#0000f5] border border-blue-200"
                    >
                      {program.amount}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-700">
                    {program.familyFriendly ? "⭐⭐⭐" : "⭐"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {program.needsPlan ? "필요" : "불필요"}
                  </td>
                  <td className="p-4">
                    <Button
                      size="sm"
                      onClick={() => handleCreatePlan(program.id)}
                      variant={program.needsPlan ? "default" : "outline"}
                      className={
                        program.needsPlan
                          ? "bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {program.needsPlan ? "계획서 작성" : "바로 신청"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Comparison View */}
      <MobileProgramComparison
        programs={programs.filter((p) => selectedPrograms.includes(p.id))}
        onCreatePlan={handleCreatePlan}
      />

      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <Button
          variant="outline"
          onClick={() => goToStep("search")}
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
          이전 단계
        </Button>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            💡 <strong>팁:</strong> "가족 친화도 높은 순서로 정렬해줘" 같은
            요청도 언제든 환영합니다!
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
}
