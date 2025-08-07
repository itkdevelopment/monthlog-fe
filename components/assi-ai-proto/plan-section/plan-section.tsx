"use client"

import { Calendar, Sparkles, ChevronLeft, ImageIcon, Plus, Route } from "lucide-react"
import { Button } from "@/components/assi-ai-proto/ui/button"
import { Card, CardContent } from "@/components/assi-ai-proto/ui/card"
import { Textarea } from "@/components/assi-ai-proto/ui/textarea"
import { Input } from "@/components/assi-ai-proto/ui/input"
import { Badge } from "@/components/assi-ai-proto/ui/badge"
import { MapPin, Clock, ThumbsUp, Info, PenLine, Map } from "lucide-react"

interface PlanSectionProps {
  currentStep: "question" | "search" | "compare" | "plan" | "complete"
  travelPlan: any[]
  completeTravel: () => void
  getCategoryColor: (category: string) => string
  handleActivitySelect: (dayIndex: number, activityIndex: number) => void
  handleMemoChange: (dayIndex: number, activityIndex: number, memo: string) => void
  showDetailFor: { dayIndex: number; activityIndex: number } | null
  setShowDetailFor: (detail: { dayIndex: number; activityIndex: number } | null) => void
  showMemoFor: { dayIndex: number; activityIndex: number } | null
  setShowMemoFor: (memo: { dayIndex: number; activityIndex: number } | null) => void
  planTitle: string
  setPlanTitle: (title: string) => void
  overallSummary: string
  setOverallSummary: (summary: string) => void
  openOnlineDocument: (style: "simple" | "standard" | "visual" | "calendar" | "calendar2") => void
  goToStep: (step: "question" | "search" | "compare" | "plan" | "complete") => void
  isThinking: boolean
}

export default function PlanSection({
  currentStep,
  travelPlan,
  completeTravel,
  getCategoryColor,
  handleActivitySelect,
  handleMemoChange,
  showDetailFor,
  setShowDetailFor,
  showMemoFor,
  setShowMemoFor,
  planTitle,
  setPlanTitle,
  overallSummary,
  setOverallSummary,
  openOnlineDocument,
  goToStep,
  isThinking,
}: PlanSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg mb-8 p-6">
      <div className="flex items-center justify-between mb-3 mt-4">
        <div className="flex items-center gap-3 ml-6">
          <Input
            value={planTitle}
            onChange={(e) => setPlanTitle(e.target.value)}
            className="text-3xl font-bold text-gray-900 border-none p-0 h-auto bg-transparent focus:ring-0 focus:border-none"
            placeholder="여행일정 계획하기"
          />
        </div>
        {travelPlan.length > 0 && currentStep === "plan" && (
          <Button
            onClick={completeTravel}
            className="bg-[#0000f5] hover:bg-[#0000f5]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl"
          >
            계획서 완성하기
          </Button>
        )}
      </div>

      {isThinking ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#0000f5] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-800 mb-2">AI가 맞춤형 여행계획을 생성하고 있어요</p>
          <p className="text-sm text-gray-600">잠시만 기다려주세요</p>
        </div>
      ) : travelPlan.length > 0 ? (
        <div className="space-y-6">
          {/* 스텝4에서만 안내 텍스트 표시 */}
          {currentStep === "plan" && (
            <div className="mt-1 ml-6">
              <p className="text-gray-900 text-lg font-medium">
                추천 계획표가 준비됐어요. 카드를 클릭해서 여행계획을 완료하세요.
              </p>
            </div>
          )}

          {currentStep === "complete" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">여행 계획 요약</h3>
              <Textarea
                placeholder="여행 계획에 대한 요약을 입력하세요..."
                value={overallSummary}
                onChange={(e) => setOverallSummary(e.target.value)}
                className="w-full h-32 text-sm resize-none"
              />
            </div>
          )}

          {/* 여행 계획 */}
          <div className="p-6 mb-6">
            <div className="space-y-16">
              {travelPlan.map((day, dayIndex) => (
                <div key={day.day} className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-800 text-white px-4 py-2 rounded-full shadow-sm">
                        <Calendar className="w-4 h-4" />
                        <h4 className="text-base font-semibold">
                          {day.day}일차 - {day.date}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gray-500" />
                        {day.notes}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-50 bg-white"
                      onClick={() => {
                        window.open("", "_blank")
                      }}
                    >
                      <Route className="w-4 h-4" />
                      코스 동선 보기
                    </Button>
                  </div>

                  {/* 타임라인 컨테이너 - 완전히 새로운 구조 */}
                  <div className="relative">
                    {/* 세로선 - 절대 위치로 고정 */}
                    <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-300 z-0"></div>

                    <div className="space-y-6">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="relative flex items-start">
                          {/* 타임라인 원 - 세로선 중앙에 절대 위치로 고정 */}
                          <div
                            className={`absolute w-4 h-4 rounded-full shadow-sm z-10 ${
                              currentStep === "complete"
                                ? "bg-gray-300"
                                : activity.selected
                                  ? "bg-[#0000f5]"
                                  : "bg-gray-300"
                            }`}
                            style={{
                              left: "65px",
                              top: "20px",
                              transform: "translateX(-50%)",
                            }}
                          ></div>

                          {/* 카드 - 원과 독립적으로 배치 */}
                          <div className="ml-24 flex-1">
                            <Card
                              className={`max-w-4xl ${
                                currentStep === "complete"
                                  ? "bg-[#fafafa]"
                                  : activity.selected
                                    ? "bg-blue-50 border-[#0000f5] border-2 shadow-sm cursor-pointer"
                                    : "bg-white border-gray-200 hover:border-gray-300 cursor-pointer"
                              }`}
                              onClick={
                                currentStep === "plan" ? () => handleActivitySelect(dayIndex, activityIndex) : undefined
                              }
                            >
                              {/* 기존 CardContent 내용은 그대로 유지 */}
                              <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                      <h5
                                        className={`text-xl text-gray-900 ${
                                          activity.selected ? "font-black" : "font-bold"
                                        }`}
                                      >
                                        {activity.name}
                                      </h5>
                                      <Badge
                                        variant="secondary"
                                        className={`text-sm ${getCategoryColor(activity.category)}`}
                                      >
                                        {activity.category}
                                      </Badge>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{activity.location}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{activity.duration}</span>
                                      </div>
                                    </div>

                                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{activity.comment}</p>

                                    {activity.userMemo && (
                                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-3">
                                        <p className="text-sm text-yellow-800 italic">💭 {activity.userMemo}</p>
                                      </div>
                                    )}

                                    {/* 메모 입력 영역 */}
                                    {showMemoFor?.dayIndex === dayIndex &&
                                      showMemoFor?.activityIndex === activityIndex && (
                                        <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                          <Textarea
                                            placeholder="메모를 입력하세요..."
                                            value={activity.userMemo || ""}
                                            onChange={(e) => handleMemoChange(dayIndex, activityIndex, e.target.value)}
                                            className="w-full h-20 text-sm resize-none border-yellow-300 focus:border-yellow-400"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <div className="flex gap-2 mt-2">
                                            <Button
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setShowMemoFor(null)
                                              }}
                                              className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                            >
                                              저장
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setShowMemoFor(null)
                                              }}
                                              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                                            >
                                              취소
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                  </div>

                                  {/* 스텝4에서만 체크박스와 한달살러 UI 표시 */}
                                  {currentStep === "plan" && (
                                    <div className="flex items-center gap-6 ml-4">
                                      <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                                        <ThumbsUp className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-800">
                                          한달살러 {activity.popularityData.recommendedBy}명 선택
                                        </span>
                                      </div>

                                      {/* 체크박스 */}
                                      <div
                                        className={`w-7 h-7 rounded border-2 flex items-center justify-center cursor-pointer ${
                                          activity.selected
                                            ? "bg-[#0000f5] border-[#0000f5]"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleActivitySelect(dayIndex, activityIndex)
                                        }}
                                      >
                                        {activity.selected && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
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
                                  )}
                                </div>

                                {currentStep === "plan" && (
                                  <div className="flex items-center justify-end pt-3 border-t border-gray-200 mt-3">
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setShowMemoFor(
                                            showMemoFor?.dayIndex === dayIndex &&
                                              showMemoFor?.activityIndex === activityIndex
                                              ? null
                                              : { dayIndex, activityIndex },
                                          )
                                          setShowDetailFor(null)
                                        }}
                                      >
                                        <PenLine className="w-3 h-3 mr-1" />
                                        메모하기
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          window.open("", "_blank")
                                        }}
                                      >
                                        <Info className="w-3 h-3 mr-1" />
                                        상세정보
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          window.open(activity.mapUrl, "_blank")
                                        }}
                                      >
                                        <Map className="w-3 h-3 mr-1" />
                                        지도보기
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      ))}

                      {/* 장소 추가 카드 - 스텝4에서만 표시 */}
                      {currentStep === "plan" && (
                        <div className="relative flex items-start">
                          <div
                            className="absolute w-4 h-4 rounded-full shadow-sm bg-gray-200 z-10"
                            style={{
                              left: "65px",
                              top: "20px",
                              transform: "translateX(-50%)",
                            }}
                          ></div>

                          <div className="ml-24 flex-1">
                            <Card className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-100 max-w-4xl">
                              <CardContent className="p-5">
                                <div className="flex items-center justify-center gap-3 text-gray-500">
                                  <Plus className="w-6 h-6" />
                                  <div className="text-center">
                                    <h5 className="text-lg font-medium text-gray-600 mb-1">장소 추가하기</h5>
                                    <p className="text-sm text-gray-500">원하는 장소를 직접 추가해보세요</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentStep === "complete" && (
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                onClick={() => openOnlineDocument("simple")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                심플버전
              </Button>
              <Button
                className="bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                onClick={() => openOnlineDocument("standard")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                기본버전
              </Button>
              <Button
                className="bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                onClick={() => openOnlineDocument("visual")}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                사진버전
              </Button>
              <Button
                className="bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                onClick={() => openOnlineDocument("calendar")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                달력버전
              </Button>
              <Button
                className="bg-[#0000f5] hover:bg-[#0000f5]/90 text-white"
                onClick={() => openOnlineDocument("calendar2")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                달력버전2
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => goToStep(currentStep === "complete" ? "plan" : "compare")}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              이전 단계
            </Button>

            {currentStep === "plan" && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 text-center">
                  💡 <strong>팁:</strong> 카드를 드래그해서 순서를 변경할 수 있어요!
                </p>
              </div>
            )}

            <div></div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <ImageIcon className="w-10 h-10 mx-auto mb-6 text-gray-400" />
          <p className="text-xl text-gray-800 mb-2">아직 추천된 여행 계획이 없습니다</p>
          <p className="text-sm text-gray-600">상세한 여행 조건을 입력하거나, 이전 단계에서 프로그램을 선택해주세요.</p>
        </div>
      )}
    </div>
  )
}
