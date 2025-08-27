"use client";

interface HeaderSectionProps {
  currentStep: "question" | "search" | "compare" | "plan" | "complete";
  goToStep: (
    step: "question" | "search" | "compare" | "plan" | "complete"
  ) => void;
  programsLength: number;
  selectedProgramsLength: number;
  travelPlanLength: number;
}

export default function HeaderSection({
  currentStep,
  goToStep,
  programsLength,
  selectedProgramsLength,
  travelPlanLength,
}: HeaderSectionProps) {
  return (
    <div className="text-center mb-16 pt-16 relative">
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
            여행지원금 어시 AI
          </h1>
        </div>
        <p className="mt-4 text-gray-600 text-lg">
          AI가 분석하고 추천하는 맞춤형 여행지원금
        </p>
      </div>

      {/* 스텝 표시 개선 */}
      <div className="flex flex-wrap gap-8 md:gap-2 md:flex-row md:items-center md:justify-center mb-16">
        <div
          className={`relative flex items-center justify-center cursor-pointer transition-all ${
            currentStep === "question" ? "text-[#0000f5]" : "text-gray-400"
          }`}
          onClick={() => goToStep("question")}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
              currentStep === "question"
                ? "border-[#0000f5] bg-[#0000f5] text-white shadow-lg"
                : "border-gray-300 bg-white text-gray-600 hover:border-[#0000f5] hover:text-[#0000f5]"
            }`}
          >
            1
          </div>
          <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
            질문하기
          </span>
        </div>

        <div
          className={`w-16 h-0.5 invisible md:visible transition-all ${
            currentStep === "search" ||
            currentStep === "compare" ||
            currentStep === "plan" ||
            currentStep === "complete"
              ? "bg-[#0000f5]"
              : "bg-gray-300"
          }`}
        ></div>

        <div
          className={`relative flex items-center justify-center cursor-pointer transition-all ${
            currentStep === "search" ? "text-[#0000f5]" : "text-gray-400"
          }`}
          onClick={() => programsLength > 0 && goToStep("search")}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
              currentStep === "search"
                ? "border-[#0000f5] bg-[#0000f5] text-white shadow-lg"
                : programsLength > 0
                ? "border-gray-300 bg-white text-gray-600 hover:border-[#0000f5] hover:text-[#0000f5]"
                : "border-gray-200 bg-gray-100 text-gray-400"
            }`}
          >
            2
          </div>
          <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
            추천결과 선택
          </span>
        </div>

        <div
          className={`w-16 h-0.5 invisible md:visible transition-all ${
            currentStep === "compare" ||
            currentStep === "plan" ||
            currentStep === "complete"
              ? "bg-[#0000f5]"
              : "bg-gray-300"
          }`}
        ></div>

        <div
          className={`relative flex items-center justify-center cursor-pointer transition-all ${
            currentStep === "compare" ? "text-[#0000f5]" : "text-gray-400"
          }`}
          onClick={() => selectedProgramsLength > 0 && goToStep("compare")}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
              currentStep === "compare"
                ? "border-[#0000f5] bg-[#0000f5] text-white shadow-lg"
                : selectedProgramsLength > 0
                ? "border-gray-300 bg-white text-gray-600 hover:border-[#0000f5] hover:text-[#0000f5]"
                : "border-gray-200 bg-gray-100 text-gray-400"
            }`}
          >
            3
          </div>
          <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
            추천결과 비교
          </span>
        </div>

        <div
          className={`w-16 h-0.5 transition-all invisible md:visible ${
            currentStep === "plan" || currentStep === "complete"
              ? "bg-[#0000f5]"
              : "bg-gray-300"
          }`}
        ></div>

        <div
          className={`relative flex items-center justify-center cursor-pointer transition-all ${
            currentStep === "plan" ? "text-[#0000f5]" : "text-gray-400"
          }`}
          onClick={() => travelPlanLength > 0 && goToStep("plan")} // 여행계획이 있으면 클릭 가능
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
              currentStep === "plan"
                ? "border-[#0000f5] bg-[#0000f5] text-white shadow-lg"
                : travelPlanLength > 0
                ? "border-gray-300 bg-white text-gray-600 hover:border-[#0000f5] hover:text-[#0000f5]"
                : "border-gray-200 bg-gray-100 text-gray-400"
            }`}
          >
            4
          </div>
          <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
            여행계획서 작성
          </span>
        </div>

        <div
          className={`w-16 h-0.5 transition-all invisible md:visible ${
            currentStep === "complete" ? "bg-[#0000f5]" : "bg-gray-300"
          }`}
        ></div>

        <div
          className={`relative flex items-center justify-center cursor-pointer transition-all ${
            currentStep === "complete" ? "text-[#0000f5]" : "text-gray-400"
          }`}
          onClick={() => travelPlanLength > 0 && goToStep("complete")} // 여행계획이 있으면 클릭 가능
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
              currentStep === "complete"
                ? "border-[#0000f5] bg-[#0000f5] text-white shadow-lg"
                : travelPlanLength > 0
                ? "border-gray-300 bg-white text-gray-600 hover:border-[#0000f5] hover:text-[#0000f5]"
                : "border-gray-200 bg-gray-100 text-gray-400"
            }`}
          >
            5
          </div>
          <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
            계획서 완성
          </span>
        </div>
      </div>
    </div>
  );
}
