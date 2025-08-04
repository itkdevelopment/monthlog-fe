"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit } from "lucide-react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell } from "recharts"
import { useState } from "react"
import RecommendedMonthsPanel from "./recommended-months-panel"

interface RecommendedMonthsCardProps {
  cardData?: {
    title: string
    contributorCount: number
    monthlyData: Array<{
      month: string
      recommendations: number
      temperature: number
    }>
    topRecommendations: Array<{
      month: string
      reason: string
      votes: number
    }>
    avoidRecommendations: Array<{
      month: string
      reason: string
      votes: number
    }>
  }
}

export default function RecommendedMonthsCard({ cardData }: RecommendedMonthsCardProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // 기본 데이터 (props가 없을 경우)
  const defaultData = {
    title: "🌗 추천 ↔ 피해야하는 시기",
    contributorCount: 28,
    monthlyData: [
      { month: "1월", recommendations: 8, temperature: 5 },
      { month: "2월", recommendations: 12, temperature: 7 },
      { month: "3월", recommendations: 18, temperature: 12 },
      { month: "4월", recommendations: 35, temperature: 16 },
      { month: "5월", recommendations: 32, temperature: 20 },
      { month: "6월", recommendations: 25, temperature: 24 },
      { month: "7월", recommendations: 15, temperature: 28 },
      { month: "8월", recommendations: 12, temperature: 29 },
      { month: "9월", recommendations: 22, temperature: 25 },
      { month: "10월", recommendations: 28, temperature: 19 },
      { month: "11월", recommendations: 20, temperature: 13 },
      { month: "12월", recommendations: 10, temperature: 8 },
    ],
    topRecommendations: [
      { month: "4월", reason: "벚꽃 시즌이라 완벽한 날씨 속에서 도시 전체가 아름다워요", votes: 23 },
      { month: "5월", reason: "신록의 계절로 관광객이 적어 조용하고 평화로워요", votes: 19 },
      { month: "10월", reason: "단풍과 선선한 날씨로 야외 활동하기 최적이에요", votes: 15 },
    ],
    avoidRecommendations: [
      { month: "11월", reason: "비가 자주 와서 야외 활동이 제한되고 날씨가 변덕스러워요", votes: 18 },
      { month: "1월", reason: "추위가 심하고 바람이 강해서 관광하기 어려워요", votes: 12 },
      { month: "8월", reason: "너무 덥고 습해서 야외 활동이 힘들어요", votes: 10 },
    ],
  }

  const data = cardData || defaultData

  // 추천시기와 피해야하는 시기 기준 설정
  const maxRecommendations = Math.max(...data.monthlyData.map((d) => d.recommendations))
  const minRecommendations = Math.min(...data.monthlyData.map((d) => d.recommendations))
  const recommendThreshold = maxRecommendations * 0.7
  const avoidThreshold = minRecommendations * 1.5

  // 막대 위에 숫자 표시하는 커스텀 라벨
  const renderCustomLabel = (props: any) => {
    const { x, y, width, value } = props
    return (
      <text x={x + width / 2} y={y - 5} fill="#374151" textAnchor="middle" fontSize="12" fontWeight="600">
        {value}
      </text>
    )
  }

  // 막대 색상 결정 함수
  const getBarColor = (recommendations: number) => {
    if (recommendations >= recommendThreshold) return "#0B24FB" // 추천시기 - 파란색
    if (recommendations <= avoidThreshold) return "#ef4444" // 피해야하는 시기 - 빨간색
    return "#e5e7eb" // 보통 시기 - 회색
  }

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl font-bold">{data.title}</span>
                <p className="text-sm text-gray-500 font-normal mt-1">{data.contributorCount}명이 참여했어요</p>
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
              onClick={() => setIsPanelOpen(true)}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 이중 축 차트 */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.monthlyData} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  label={{
                    value: "추천 수",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: "#6b7280" },
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  label={{
                    value: "평균 기온 (°C)",
                    angle: 90,
                    position: "insideRight",
                    style: { textAnchor: "middle", fill: "#6b7280" },
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
                <Bar
                  yAxisId="left"
                  dataKey="recommendations"
                  name="추천 수"
                  radius={[4, 4, 0, 0]}
                  label={renderCustomLabel}
                >
                  {data.monthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.recommendations)} />
                  ))}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#9ca3af"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="평균 기온 (°C)"
                  dot={{ fill: "#9ca3af", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#6b7280" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* 2단 구성: 추천시기와 피해야하는 시기 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 추천시기 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-black text-base flex items-center">🥰 추천하는 이유</h3>
              <div className="space-y-3">
                {data.topRecommendations.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1 mr-3">
                        [{item.month}] {item.reason}
                      </p>
                      <span className="text-xs text-black whitespace-nowrap">{item.votes}명</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 피해야하는 시기 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-black text-base flex items-center">😰 피해야하는 이유</h3>
              <div className="space-y-3">
                {data.avoidRecommendations.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1 mr-3">
                        [{item.month}] {item.reason}
                      </p>
                      <span className="text-xs text-black whitespace-nowrap">{item.votes}명</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 패널 */}
      {isPanelOpen && (
        <RecommendedMonthsPanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          cityName="제주"
          cardData={data}
        />
      )}
    </>
  )
}
