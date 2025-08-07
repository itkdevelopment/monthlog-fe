"use client"

import type React from "react"
import { ChatInput } from "@/components/assi-ai-proto/chat-input"
import { Sparkles, Copy } from "lucide-react"

interface QuestionSectionProps {
  currentStep: "question" | "search" | "compare" | "plan" | "complete"
  handleChatSubmit: (e: React.FormEvent) => void
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  input: string
  isLoading: boolean
  messages: any[]
  queryHistory: string[]
  handleQueryHistoryClick: (query: string) => void
  resetAndClearSelection: () => void
  copyToClipboard: (text: string) => void
  setInput: (input: string) => void
  isThinking: boolean
}

export default function QuestionSection({
  currentStep,
  handleChatSubmit,
  handleInputChange,
  input,
  isLoading,
  messages,
  queryHistory,
  handleQueryHistoryClick,
  resetAndClearSelection,
  copyToClipboard,
  setInput,
  isThinking,
}: QuestionSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg mb-8 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        {/* Messages */}
        <div className="space-y-6 p-2 mb-6">
          {messages.length === 0 && currentStep === "question" && (
            <div className="text-center py-12 text-gray-600">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border border-blue-200">
                <Sparkles className="w-8 h-8 text-[#0000f5]" />
              </div>
              <p className="text-xl mb-3 text-gray-800">여행 조건을 알려주시면 맞춤형 지원금을 찾아드립니다</p>
              <p className="text-sm text-gray-500 mb-6">자연어로 자유롭게 질문해보세요</p>

              {/* 예시안 */}
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  <div
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => {
                      setInput("6월에 아이랑 주말 2박 3일 여행 갈 건데 지원금 있나요?")
                      copyToClipboard("6월에 아이랑 주말 2박 3일 여행 갈 건데 지원금 있나요?")
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">
                        6월에 아이랑 주말 2박 3일 여행 갈 건데 지원금 있나요?
                      </p>
                      <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0" />
                    </div>
                  </div>
                  <div
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => {
                      setInput("제주도 가족여행 지원 프로그램 있을까요?")
                      copyToClipboard("제주도 가족여행 지원 프로그램 있을까요?")
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">
                        제주도 가족여행 지원 프로그램 있을까요?
                      </p>
                      <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0" />
                    </div>
                  </div>
                  <div
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => {
                      setInput("여행계획서 없이 바로 신청할 수 있는 지원금 찾아주세요")
                      copyToClipboard("여행계획서 없이 바로 신청할 수 있는 지원금 찾아주세요")
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">
                        여행계획서 없이 바로 신청할 수 있는 지원금 찾아주세요
                      </p>
                      <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0" />
                    </div>
                  </div>
                  <div
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => {
                      setInput("30만원 이상 지원받을 수 있는 여행 프로그램 추천해주세요")
                      copyToClipboard("30만원 이상 지원받을 수 있는 여행 프로그램 추천해주세요")
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">
                        30만원 이상 지원받을 수 있는 여행 프로그램 추천해주세요
                      </p>
                      <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(messages.length > 0 || currentStep !== "question") && (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === "user"
                        ? "bg-[#0000f5] text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#0000f5] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#0000f5] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#0000f5] rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span>분석 중...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleChatSubmit}
          isLoading={isLoading}
          currentStep={currentStep}
          queryHistory={queryHistory}
          onQueryHistoryClick={handleQueryHistoryClick}
          onReset={resetAndClearSelection}
        />
      </div>
    </div>
  )
}
