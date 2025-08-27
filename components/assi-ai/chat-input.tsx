"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/assi-ai/ui/button";
import { Textarea } from "@/components/assi-ai/ui/textarea";
import { ArrowUp, RotateCcw, Copy } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  currentStep: "question" | "search" | "compare" | "plan" | "complete";
  queryHistory: string[];
  onQueryHistoryClick: (query: string) => void;
  onReset: () => void;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  currentStep,
  queryHistory,
  onQueryHistoryClick,
  onReset,
}: ChatInputProps) {
  const [showHistory, setShowHistory] = useState(false);

  const getPlaceholder = () => {
    switch (currentStep) {
      case "search":
        return "추가 조건을 입력하세요... (예: '6월 진행만 보기', '30만원 이상만')";
      case "compare":
        return "비교 조건을 입력하세요... (예: '가족 친화도 높은 순으로 정렬')";
      case "plan":
        return "계획 수정 요청을 입력하세요... (예: '카페는 조용한 곳으로 바꿔줘')";
      case "complete":
        return "제목이나 요약을 수정하세요... (예: '제목은 익산 가족여행으로 넣어줘')";
      default:
        return "여행 조건을 자유롭게 입력하세요...";
    }
  };

  const getExamplePrompts = () => {
    switch (currentStep) {
      case "question":
        return [
          "6월에 아이랑 주말 2박 3일 여행 갈 건데 지원금 있나요?",
          "제주도로 가족여행 가려는데 어떤 지원 프로그램이 있을까요?",
          "여행계획서 없이 바로 신청할 수 있는 지원금 찾아주세요",
          "30만원 이상 지원받을 수 있는 여행 프로그램 추천해주세요",
        ];
      case "search":
        return [
          "6월 진행만 보기",
          "30만원 이상 지원금만 필터링해줘",
          "계획서 없이 바로 신청 가능한 것만",
          "가족 친화적인 프로그램만 보여줘",
        ];
      case "compare":
        return [
          "가족 친화도 높은 순으로 정렬해줘",
          "지원금 많은 순서로 보여줘",
          "신청 방법이 간단한 순으로 정렬",
          "계획서 필요 여부로 그룹화해줘",
        ];
      case "plan":
        return [
          "카페는 조용한 곳으로 바꿔줘",
          "아이들이 더 좋아할 만한 장소 추가해줘",
          "첫째 날 일정을 더 여유롭게 조정해줘",
          "맛집을 현지 특산물 위주로 바꿔줘",
        ];
      case "complete":
        return [
          "제목은 '익산 가족여행'으로 넣어줘",
          "요약에 '아이와 함께하는 교육적 여행'이라고 써줘",
          "제목을 더 감성적으로 바꿔줘",
          "요약을 더 구체적으로 작성해줘",
        ];
      default:
        return [];
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = getExamplePrompts();

  return (
    <div className="space-y-4">
      {/* 쿼리 히스토리 */}
      {queryHistory.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">이전 요청:</span>
          {queryHistory.slice(-3).map((query, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full"
              onClick={() => onQueryHistoryClick(query)}
            >
              <span className="text-gray-600">
                ❯ {query.length > 20 ? query.slice(0, 20) + "..." : query}
              </span>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-gray-400 hover:text-gray-600"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "접기" : "더보기"}
          </Button>
        </div>
      )}

      {/* 전체 히스토리 */}
      {showHistory && queryHistory.length > 3 && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {queryHistory.slice(0, -3).map((query, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-xs bg-white hover:bg-gray-100 border border-gray-200 rounded-full group"
                onClick={() => onQueryHistoryClick(query)}
              >
                <span className="text-gray-600 flex-1">
                  {query.length > 30 ? query.slice(0, 30) + "..." : query}
                </span>
                <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0" />
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 예시 프롬프트 - 질문 단계가 아닐 때만 표시 */}
      {currentStep !== "question" && examples.length > 0 && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 mb-2 font-medium">
            💡 이런 요청을 해보세요:
          </p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-xs bg-white hover:bg-blue-100 border border-blue-200 rounded-full group"
                onClick={() => {
                  onQueryHistoryClick(example);
                  copyToClipboard(example);
                }}
              >
                <span className="text-blue-700 flex-1">{example}</span>
                <Copy className="w-3 h-3 text-blue-400 group-hover:text-blue-600 ml-2 flex-shrink-0" />
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 입력창 */}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                if (input.trim()) {
                  handleSubmit(e as any);
                }
              }
            }}
            placeholder={getPlaceholder()}
            disabled={isLoading}
            className="min-h-[56px] max-h-32 text-base px-5 py-4 pr-16 bg-white border-gray-300 focus:border-[#0000f5] focus:ring-2 focus:ring-[#0000f5]/20 rounded-xl text-gray-900 placeholder:text-gray-500 resize-none"
            rows={1}
          />

          {/* 제출 버튼 */}
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-lg font-medium shadow-lg ${
              input.trim()
                ? "bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>

      {/* 하단 안내 텍스트 */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 text-center flex-1">
          AI가 완벽하지 않을 수 있으니, 중요한 내용은 재차 검토하세요.
        </p>
        {currentStep !== "question" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-3 h-3" />
            처음부터
          </Button>
        )}
      </div>
    </div>
  );
}
