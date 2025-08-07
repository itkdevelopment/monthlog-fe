"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/monthlog-proto/ui/card"
import { AnimatedGauge } from "@/components/monthlog-proto/charts/animated-gauge"
import { Edit, Plane, MapPin, Bus, Smartphone, Navigation, Ticket, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/monthlog-proto/ui/button"
import { Input } from "@/components/monthlog-proto/ui/input"
import { Label } from "@/components/monthlog-proto/ui/label"
import { Textarea } from "@/components/monthlog-proto/ui/textarea"

export default function TransportCard() {
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})

  const closePopup = () => {
    setActivePopup(null)
    setFormData({})
  }

  const handleSubmit = (category: string) => {
    console.log(`Submitted ${category}:`, formData)
    closePopup()
  }

  // 팝업 오버레이 컴포넌트
  const PopupOverlay = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">상세 분석 및 입력</h3>
          <button onClick={closePopup} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )

  // 대중교통 편의성 팝업
  const PublicTransportPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">현재 점수 분포</h4>
          <div className="space-y-2">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
              <div key={score} className="flex items-center gap-3">
                <span className="w-6 text-sm">{score}점</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${Math.random() * 80 + 10}%` }} />
                </div>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 20 + 5)}명</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">점수 입력</h4>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Button
                key={num}
                variant={formData.score === num ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, score: num })}
                className="aspect-square"
              >
                {num}
              </Button>
            ))}
          </div>
          <Button onClick={() => handleSubmit("public-transport")} className="w-full mt-4" disabled={!formData.score}>
            제출하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  // 공항 접근성 팝업
  const AirportAccessPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">이동 수단별 평균 시간/비용</h4>
          <div className="space-y-4">
            {["지하철", "버스", "택시", "렌터카"].map((transport) => (
              <div key={transport} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{transport}</span>
                <div className="flex gap-4 text-sm">
                  <span>평균 {Math.floor(Math.random() * 60 + 30)}분</span>
                  <span>{Math.floor(Math.random() * 50000 + 10000).toLocaleString()}원</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">새로운 정보 입력</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>이동 수단</Label>
              <Input
                placeholder="예: 지하철"
                value={formData.transport || ""}
                onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
              />
            </div>
            <div>
              <Label>소요 시간 (분)</Label>
              <Input
                type="number"
                placeholder="45"
                value={formData.time || ""}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <Label>비용 (원)</Label>
              <Input
                type="number"
                placeholder="15000"
                value={formData.cost || ""}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>이동 팁</Label>
            <Textarea
              placeholder="공항에서 시내까지 이동할 때 유용한 팁을 공유해주세요"
              value={formData.tip || ""}
              onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
            />
          </div>
          <Button onClick={() => handleSubmit("airport-access")} className="w-full">
            제출하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  // 교통 시스템 팝업
  const TransportSystemPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">교통수단별 공감 수</h4>
          <div className="space-y-3">
            {[
              { name: "지하철", fare: "2,000원", likes: 45 },
              { name: "버스", fare: "1,500원", likes: 32 },
              { name: "택시", fare: "기본 3,800원", likes: 28 },
              { name: "따릉이", fare: "1시간 1,000원", likes: 15 },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600 ml-2">{item.fare}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.likes}명 공감</span>
                  <Button size="sm" variant="outline">
                    👍
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">새로운 교통수단 추가</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>교통수단</Label>
              <Input
                placeholder="예: 전동킥보드"
                value={formData.transport || ""}
                onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
              />
            </div>
            <div>
              <Label>1회 평균 요금</Label>
              <Input
                placeholder="예: 2,000원"
                value={formData.fare || ""}
                onChange={(e) => setFormData({ ...formData, fare: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={() => handleSubmit("transport-system")} className="w-full">
            추가하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  // 교통 앱 팝업
  const TransportAppPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">추천 앱 순위</h4>
          <div className="space-y-3">
            {[
              { name: "지하철 지도", likes: 67 },
              { name: "버스타고", likes: 45 },
              { name: "카카오맵", likes: 38 },
              { name: "네이버 지도", likes: 29 },
            ].map((app, index) => (
              <div key={app.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium">{app.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{app.likes}명 추천</span>
                  <Button size="sm" variant="outline">
                    👍
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">새로운 앱 추천</h4>
          <div>
            <Label>앱 이름</Label>
            <Input
              placeholder="추천하고 싶은 교통 앱 이름을 입력하세요"
              value={formData.appName || ""}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
            />
          </div>
          <Button onClick={() => handleSubmit("transport-app")} className="w-full">
            추천하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  // 관광지 접근성 팝업
  const TouristAccessPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">현재 평가 분포</h4>
          <div className="space-y-2">
            {[
              { label: "매우 그렇다", count: 23 },
              { label: "그렇다", count: 31 },
              { label: "보통이다", count: 18 },
              { label: "아니다", count: 12 },
              { label: "매우 아니다", count: 6 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-20 text-sm">{item.label}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(item.count / 90) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-600">{item.count}명</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">주요 관광지에 30분 내로 갈 수 있었나요?</h4>
          <div className="grid grid-cols-1 gap-2">
            {["매우 그렇다", "그렇다", "보통이다", "아니다", "매우 아니다"].map((option) => (
              <Button
                key={option}
                variant={formData.rating === option ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, rating: option })}
                className="justify-start"
              >
                {option}
              </Button>
            ))}
          </div>
          <Button onClick={() => handleSubmit("tourist-access")} className="w-full" disabled={!formData.rating}>
            평가하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  // 항공권 팝업
  const FlightTicketPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">월별 평균 항공료 추이</h4>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map((month) => (
              <div key={month} className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">{month}</div>
                <div className="text-blue-600">{Math.floor(Math.random() * 200000 + 300000).toLocaleString()}원</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">항공권 정보 입력</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>항공사</Label>
              <Input
                placeholder="예: 대한항공"
                value={formData.airline || ""}
                onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
              />
            </div>
            <div>
              <Label>출발 월</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.month || ""}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              >
                <option value="">선택하세요</option>
                {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"].map(
                  (month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div>
              <Label>항공편 유형</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.flightType || ""}
                onChange={(e) => setFormData({ ...formData, flightType: e.target.value })}
              >
                <option value="">선택하세요</option>
                <option value="direct">직항</option>
                <option value="connecting">경유</option>
              </select>
            </div>
            <div>
              <Label>실제 구매 가격 (원)</Label>
              <Input
                type="number"
                placeholder="450000"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={() => handleSubmit("flight-ticket")} className="w-full">
            가격 분석하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  // 그룹 입력 팝업
  const GroupInputPopup = () => (
    <PopupOverlay>
      <div className="space-y-6">
        <h4 className="font-semibold">교통 및 이동 - 전체 정보 입력</h4>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">대중교통 편의성 (1-10점)</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Button
                  key={num}
                  variant={formData.publicTransport === num ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, publicTransport: num })}
                  size="sm"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">공항 접근성</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Input placeholder="이동수단" />
              <Input placeholder="소요시간(분)" type="number" />
              <Input placeholder="비용(원)" type="number" />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">주요 교통수단 & 요금</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input placeholder="교통수단" />
              <Input placeholder="1회 평균 요금" />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">추천 교통 앱</Label>
            <Input placeholder="앱 이름" className="mt-2" />
          </div>

          <div>
            <Label className="text-base font-medium">관광지 접근성</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {["매우 그렇다", "그렇다", "보통이다", "아니다", "매우 아니다"].map((option) => (
                <Button
                  key={option}
                  variant={formData.touristAccess === option ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, touristAccess: option })}
                  size="sm"
                  className="justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">항공권 정보 (해외 도시 한정)</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input placeholder="항공사" />
              <Input placeholder="실제 구매 가격" type="number" />
            </div>
          </div>

          <Button onClick={() => handleSubmit("group-input")} className="w-full">
            전체 정보 제출하기
          </Button>
        </div>
      </div>
    </PopupOverlay>
  )

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl">🚃 교통 및 이동</span>
                <p className="text-sm text-gray-500 font-normal mt-1">42명이 기여한 정보</p>
              </div>
            </div>
            <button
              onClick={() => setActivePopup("group-input")}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {/* 상단: 2단 분할 레이아웃 - 좌측 35%, 우측 65% */}
          <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
            {/* 좌측 영역 (35% - 2/5) - 대표 지표 */}
            <div className="col-span-2 flex justify-center">
              <AnimatedGauge value={85} maxValue={100} label="대중교통 편의성" color="#141414" size={160} />
            </div>

            {/* 우측 영역 (65% - 3/5) - 3개 보조 지표 */}
            <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
              {/* 보조 지표 1 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">평균 50분</div>
                <div className="text-sm text-gray-600">공항↔︎시내</div>
              </div>

              {/* 보조 지표 2 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">가까움</div>
                <div className="text-sm text-gray-600">관광지 접근성</div>
              </div>

              {/* 보조 지표 3 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">썽태우</div>
                <div className="text-sm text-gray-600">주요 교통수단</div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-200" />

          {/* 하단: 상세 정보 리스트 - 깔끔한 텍스트 형태 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Bus className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">대중교통 편의성</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  9/10
                </span>
                <button
                  onClick={() => setActivePopup("public-transport")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Plane className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">공항↔︎시내 이동정보</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  택시 약 1시간, 4만원
                </span>
                <button
                  onClick={() => setActivePopup("airport-access")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">주요 교통수단&요금</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  지하철, 버스
                </span>
                <button
                  onClick={() => setActivePopup("transport-system")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">추천 교통 앱</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  Uber, 카카오 T
                </span>
                <button
                  onClick={() => setActivePopup("transport-app")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">주요 관광지까지의 거리</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  대중교통 30분 내
                </span>
                <button
                  onClick={() => setActivePopup("tourist-access")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Ticket className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">항공권 가성비 진단</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  평균 왕복 85만원
                </span>
                <button
                  onClick={() => setActivePopup("flight-ticket")}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 팝업들 */}
      {activePopup === "public-transport" && <PublicTransportPopup />}
      {activePopup === "airport-access" && <AirportAccessPopup />}
      {activePopup === "transport-system" && <TransportSystemPopup />}
      {activePopup === "transport-app" && <TransportAppPopup />}
      {activePopup === "tourist-access" && <TouristAccessPopup />}
      {activePopup === "flight-ticket" && <FlightTicketPopup />}
      {activePopup === "group-input" && <GroupInputPopup />}
    </>
  )
}
