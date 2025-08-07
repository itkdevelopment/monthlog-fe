"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Trophy,
  Wifi,
  Shield,
  Wind,
  Volume2,
  Coffee,
  DollarSign,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ---------- (mock data – unchanged) ---------- */
interface City {
  id: string;
  name: string;
  country: string;
  totalCost: string;
  internetSpeed: string;
  coworkingSpaces: number;
  safetyLevel: number;
  participants: number;
  isDataComplete: boolean;
  dataProgress?: number;
  lastUpdated: string;
  image: string;
  highlights: string[];
  participantAvatars: string[];
  airQuality?: string;
  noiseLevel?: string;
  costSatisfaction?: number;
}

const cities: City[] = [
  {
    id: "jeju",
    name: "제주도",
    country: "한국",
    totalCost: "150-250만원",
    internetSpeed: "100 Mbps",
    coworkingSpaces: 3,
    safetyLevel: 9,
    participants: 45,
    isDataComplete: true,
    lastUpdated: "2024-01-15",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.29.52-mzrVWJqK0dtGnXiCzaDV7y817YJvyj.png",
    highlights: ["조용한 힐링", "자연 친화적", "카페 천국"],
    participantAvatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    airQuality: "매우 좋음",
    noiseLevel: "조용함",
    costSatisfaction: 7,
  },
  {
    id: "chiang-mai",
    name: "치앙마이",
    country: "태국",
    totalCost: "80-120만원",
    internetSpeed: "50 Mbps",
    coworkingSpaces: 8,
    safetyLevel: 8,
    participants: 32,
    isDataComplete: true,
    lastUpdated: "2024-01-12",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.30.36-SlYoMGdjms54zOBKA5jkSMo3xjqSH7.png",
    highlights: ["디지털 노마드", "저렴한 물가"],
    participantAvatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    costSatisfaction: 9,
  },
  {
    id: "lisbon",
    name: "리스본",
    country: "포르투갈",
    totalCost: "데이터 수집 중",
    internetSpeed: "데이터 수집 중",
    coworkingSpaces: 0,
    safetyLevel: 0,
    participants: 2,
    isDataComplete: false,
    dataProgress: 67,
    lastUpdated: "2024-01-10",
    image: "/placeholder.svg?height=300&width=400",
    highlights: [],
    participantAvatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
  },
  {
    id: "cota-kinabalu",
    name: "코타키나발루",
    country: "말레이시아",
    totalCost: "데이터 수집 중",
    internetSpeed: "데이터 수집 중",
    coworkingSpaces: 0,
    safetyLevel: 0,
    participants: 1,
    isDataComplete: false,
    dataProgress: 33,
    lastUpdated: "2024-01-08",
    image: "/placeholder.svg?height=300&width=400",
    highlights: [],
    participantAvatars: ["/placeholder.svg?height=32&width=32"],
  },
  {
    id: "busan",
    name: "부산",
    country: "한국",
    totalCost: "120-200만원",
    internetSpeed: "95 Mbps",
    coworkingSpaces: 3,
    safetyLevel: 8,
    participants: 38,
    isDataComplete: true,
    lastUpdated: "2024-01-14",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.32.37-BZiNj3fh7ilCgGqPOdXUaj8FB8UkTP.png",
    highlights: ["해안 도시", "활기찬 대도시"],
    participantAvatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    costSatisfaction: 6,
  },
  {
    id: "gangneung",
    name: "강릉",
    country: "한국",
    totalCost: "100-160만원",
    internetSpeed: "우수",
    coworkingSpaces: 0,
    safetyLevel: 9,
    participants: 28,
    isDataComplete: true,
    lastUpdated: "2024-01-13",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.33.14-ScluWXAdgTLJHvuv2S5noy4ygwNqhq.png",
    highlights: ["자연환경", "저렴"],
    participantAvatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    airQuality: "좋음",
    noiseLevel: "매우 조용함",
    costSatisfaction: 8,
  },
];

const stats = {
  totalCities: 174,
  pioneers: 1432,
  todayRecords: 80,
  totalArchives: 24681,
};
/* -------------------------------------------- */

const getDynamicInfo = (city: City) => {
  const baseInfo = [
    {
      icon: DollarSign,
      label: "한달살기 비용",
      value: city.totalCost,
      color: "#0B24FB",
    },
    {
      icon: Wifi,
      label: "인터넷 속도",
      value: city.internetSpeed,
      color: "text-gray-900",
    },
  ];

  let additionalInfo = [];

  if (
    city.highlights.includes("자연 친화적") ||
    city.highlights.includes("자연환경")
  ) {
    additionalInfo = [
      {
        icon: Wind,
        label: "대기질",
        value: city.airQuality || "좋음",
        color: "text-gray-900",
      },
      {
        icon: Volume2,
        label: "소음 수준",
        value: city.noiseLevel || "보통",
        color: "text-gray-900",
      },
    ];
  } else if (city.highlights.includes("디지털 노마드")) {
    additionalInfo = [
      {
        icon: Coffee,
        label: "코워킹 스페이스",
        value:
          city.coworkingSpaces > 0 ? `${city.coworkingSpaces}곳` : "정보 없음",
        color: "text-gray-900",
      },
      {
        icon: DollarSign,
        label: "물가 만족도",
        value: city.costSatisfaction
          ? `${city.costSatisfaction}/10`
          : "정보 없음",
        color: "text-gray-900",
      },
    ];
  } else {
    additionalInfo = [
      {
        icon: DollarSign,
        label: "물가 만족도",
        value: city.costSatisfaction
          ? `${city.costSatisfaction}/10`
          : "정보 없음",
        color: "text-gray-900",
      },
      {
        icon: Shield,
        label: "안전도",
        value: `${city.safetyLevel}/10`,
        color: "text-gray-900",
      },
    ];
  }

  return [...baseInfo, ...additionalInfo];
};

export default function HomePage() {
  const [showNewCityModal, setShowNewCityModal] = useState(false);
  const [newCityName, setNewCityName] = useState("");

  const handleNewCity = () => {
    if (!newCityName.trim()) return;
    setShowNewCityModal(false);
    setNewCityName("");
    alert(`🎉 ${newCityName} 개척을 시작했습니다! +1000 EXP 획득!`);
  };

  const handleCityClick = (cityId: string) =>
    (window.location.href = `/monthlog-proto/city/${cityId}`);
  const handleContributeClick = (e: React.MouseEvent, cityId: string) => {
    e.stopPropagation();
    window.location.href = `/monthlog-proto/contribute/${cityId}`;
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* 새 도시 개척 버튼 */}
      <div className="fixed top-8 right-8 z-50">
        <Button
          onClick={() => setShowNewCityModal(true)}
          className="px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-black transition-colors shadow-lg whitespace-nowrap"
        >
          <Plus className="h-5 w-5 mr-2" />새 도시 개척하기
        </Button>
      </div>

      {/* 개척 모달 */}
      <AnimatePresence>
        {showNewCityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.5, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -100 }}
              className="glass-card p-8 max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🌟 새 도시 개척하기
              </h2>
              <p className="text-gray-600 mb-6">
                어떤 도시를 개척하고 싶으신가요?
              </p>
              <input
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="도시명을 입력하세요"
                className="w-full mb-6 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleNewCity()}
              />
              <div className="flex space-x-3">
                <Button
                  onClick={handleNewCity}
                  className="flex-1 primary-btn text-white py-3 rounded-2xl"
                >
                  개척 시작하기 (+1000 EXP)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewCityModal(false)}
                  className="flex-1 border-gray-200 py-3 rounded-2xl"
                >
                  취소
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 헤더 (로고/레벨) */}
        <div className="text-center py-24">
          {/* 메인 로고 텍스트 – 요청 1️⃣ */}
          <Link href="/">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              도시별 먼슬로그
            </h1>
          </Link>

          {/* 서브 타이틀 */}
          <p className="text-xl text-gray-600 mb-10">
            함께 만드는 한달살기 아카이브
          </p>

          {/* 레벨 디스플레이 */}
          <Link href="/profile">
            {/* 요청 2️⃣: mb-3 → mb-1 로 더 가까이 */}
            <div className="inline-block cursor-pointer hover:opacity-80 transition-opacity mb-1">
              <div className="bg-white rounded-2xl px-8 py-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-6">
                  {/* Level badge */}
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        Lv.15
                      </div>
                      <div className="text-sm text-gray-500">레벨</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-12 bg-gray-200" />

                  {/* Title */}
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      여유로운 도시 유랑자
                    </div>
                    <div className="text-sm text-gray-500">현재 칭호</div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-12 bg-gray-200" />

                  {/* Progress */}
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <Progress value={78} className="w-32 h-2" />
                      <span className="text-sm font-medium text-gray-700">
                        78%
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">2340 / 3000 EXP</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 도시 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cities.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card
                className={`glass-card cursor-pointer h-[420px] ${
                  !city.isDataComplete ? "opacity-90" : ""
                }`}
                onClick={() => handleCityClick(city.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={city.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* 태그를 absolute로 띄우기 */}
                  {city.highlights.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
                      {city.highlights.map((highlight, idx) => (
                        <Badge
                          key={idx}
                          className="bg-black/60 text-white border-0 px-2 py-1 rounded-full text-xs backdrop-blur-sm"
                        >
                          #{highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {/* 도시명/지역명을 가로세로 중앙에 배치하고 조금 아래로 이동 */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-white"
                    style={{ paddingTop: "20px" }}
                  >
                    <h3
                      className="text-3xl font-bold mb-1"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {city.name}
                    </h3>
                    <p
                      className="text-lg opacity-90"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      {city.country}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6 h-[180px] flex flex-col justify-between">
                  {city.isDataComplete ? (
                    <div className="space-y-4">
                      {/* Dynamic Info - 4개 항목 */}
                      <div className="space-y-3">
                        {getDynamicInfo(city).map((info, idx) => {
                          const IconComponent = info.icon;
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center space-x-1">
                                <IconComponent className="h-4 w-4 text-gray-600" />
                                <span className="text-gray-600">
                                  {info.label}
                                </span>
                              </div>
                              <span
                                className={`font-semibold ${
                                  info.color.startsWith("#") ? "" : info.color
                                }`}
                                style={
                                  info.color.startsWith("#")
                                    ? { color: info.color }
                                    : {}
                                }
                              >
                                {info.value}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Participants */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">참여자</span>
                          <div className="flex -space-x-1">
                            {city.participantAvatars
                              .slice(0, 3)
                              .map((avatar, idx) => (
                                <Avatar
                                  key={idx}
                                  className="h-6 w-6 border-2 border-white"
                                >
                                  <AvatarImage
                                    src={avatar || "/placeholder.svg"}
                                  />
                                  <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                    {idx + 1}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            +{city.participants}명
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      {/* 중앙 그룹 - 개척자 슬롯과 텍스트 (버튼 위 공간에서 세로 중앙 정렬) */}
                      <div className="flex-1 flex flex-col items-center justify-center space-y-6 pt-4">
                        {/* 개척자 슬롯 - 동그라미 3개 */}
                        <div className="flex items-center space-x-3">
                          {[1, 2, 3].map((slot) => (
                            <div
                              key={slot}
                              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                                slot <= city.participants
                                  ? "bg-blue-100 border-blue-500"
                                  : "bg-gray-100 border-gray-300"
                              }`}
                            >
                              {slot <= city.participants ? (
                                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                              ) : (
                                <div className="w-6 h-6 border-2 border-dashed border-gray-400 rounded-full"></div>
                              )}
                            </div>
                          ))}
                        </div>

                        <h3 className="text-base font-bold text-gray-900 text-center">
                          {city.participants === 2
                            ? "마지막 개척자가 되어주세요!"
                            : city.participants === 1
                            ? "두번째 개척자가 되어주세요!"
                            : "첫번째 개척자가 되어주세요!"}
                        </h3>
                      </div>

                      {/* 하단 버튼 - 카드 맨 아래에 고정 */}
                      <div className="mt-auto pt-6 flex justify-center">
                        <Button
                          onClick={(e) => handleContributeClick(e, city.id)}
                          className="px-6 py-2 text-sm text-white font-medium rounded-xl"
                          style={{ backgroundColor: "#0B24FB" }}
                        >
                          <Plus className="h-4 w-4 mr-1" />내 경험 기록하기
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 통계 영역 */}
        <div className="text-center py-8 pb-32">
          <div className="flex items-center justify-center space-x-8 text-sm minimal-stats">
            <div>
              <span className="stat-number">{stats.totalCities}</span> 개척된
              도시
            </div>
            <div>
              <span className="stat-number">
                {stats.pioneers.toLocaleString()}
              </span>{" "}
              개척자
            </div>
            <div>
              <span className="stat-number">{stats.todayRecords}</span> 오늘의
              기록
            </div>
            <div>
              <span className="stat-number">
                {stats.totalArchives.toLocaleString()}
              </span>{" "}
              누적 아카이브
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
