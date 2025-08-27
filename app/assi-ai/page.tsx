"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/assi-ai-proto/ui/button";
import { X, Menu } from "lucide-react";
import HeaderSection from "@/components/assi-ai-proto/header-section/header-section";
import QuestionSection from "@/components/assi-ai-proto/question-section/question-section";
import SearchSection from "@/components/assi-ai-proto/search-section/search-section";
import CompareSection from "@/components/assi-ai-proto/compare-section/compare-section";
import PlanSection from "@/components/assi-ai-proto/plan-section/plan-section";
import HistoryPanel from "@/components/assi-ai-proto/history-panel/history-panel";

interface ActivityDetail {
  name: string;
  location: string;
  comment: string;
  rating: number;
  likes: number;
  mapUrl: string;
  duration: string;
  category: "관광" | "체험" | "식사" | "숙박" | "쇼핑" | "휴식";
  popularityData: {
    monthlyVisitors: number;
    peakTime: string;
    peakSeason: string;
    recommendedBy: number;
    averageStay: string;
  };
  selected?: boolean;
  userMemo?: string;
}

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

interface TravelPlan {
  day: number;
  date: string;
  activities: ActivityDetail[];
  notes: string;
}

interface HistoryItem {
  id: string;
  date: string;
  title: string;
  step: "question" | "search" | "compare" | "plan" | "complete";
  programs: TravelProgram[];
  selectedPrograms: string[];
  travelPlan: TravelPlan[];
  messages: any[];
}

// 기본 프로그램 데이터
const defaultPrograms: TravelProgram[] = [
  {
    id: "1",
    name: "전라북도 가족여행 지원사업",
    region: "전라북도 익산",
    amount: "최대 30만원",
    duration: "2박 3일",
    requirements: ["가족 동반", "주말 이용"],
    needsPlan: true,
    familyFriendly: true,
    applicationMethod: "온라인 신청",
    applicationUrl: "https://www.jeonbuk.go.kr/tour/support",
  },
  {
    id: "2",
    name: "경기도 힐링여행 바우처",
    region: "경기도 가평",
    amount: "최대 25만원",
    duration: "1박 2일 이상",
    requirements: ["도민 우선", "평일 할인"],
    needsPlan: false,
    familyFriendly: true,
    applicationMethod: "선착순 신청",
    applicationUrl: "https://www.gg.go.kr/tour/voucher",
  },
  {
    id: "3",
    name: "제주도 체험관광 지원금",
    region: "제주도",
    amount: "최대 40만원",
    duration: "3박 4일",
    requirements: ["체험 프로그램 필수", "숙박 증빙"],
    needsPlan: true,
    familyFriendly: true,
    applicationMethod: "추첨 신청",
    applicationUrl: "https://www.jeju.go.kr/tour/experience",
  },
  {
    id: "4",
    name: "강원도 자연휴양 패키지",
    region: "강원도 춘천",
    amount: "최대 20만원",
    duration: "2박 3일",
    requirements: ["자연휴양림 이용", "환경보호 서약"],
    needsPlan: false,
    familyFriendly: true,
    applicationMethod: "온라인 신청",
    applicationUrl: "https://www.gangwon.go.kr/tour/nature",
  },
];

export default function TravelGrantAssistant() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "question" | "search" | "compare" | "plan" | "complete"
  >("question");
  const [programs, setPrograms] = useState<TravelProgram[]>([]);
  const [travelPlan, setTravelPlan] = useState<TravelPlan[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedProgramDetail, setSelectedProgramDetail] = useState<
    string | null
  >(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sidePanel, setSidePanel] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
  });
  const [overallSummary, setOverallSummary] = useState("");
  const [planTitle, setPlanTitle] = useState("여행일정 계획하기");
  const [showDetailFor, setShowDetailFor] = useState<{
    dayIndex: number;
    activityIndex: number;
  } | null>(null);
  const [showMemoFor, setShowMemoFor] = useState<{
    dayIndex: number;
    activityIndex: number;
  } | null>(null);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [changedItems, setChangedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"relevance" | "deadline" | "latest">(
    "relevance"
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
  } = useChat({
    api: "/api/chat",
    body: {
      context: {
        step: currentStep,
        prevResults: selectedPrograms,
        sessionId: Date.now().toString(),
      },
    },
    onResponse: () => {
      setIsThinking(false);
    },
    onFinish: (message) => {
      // 스텝5에서 제목이나 요약 관련 요청 처리
      if (currentStep === "complete" && message.content) {
        const content = message.content.toLowerCase();

        // 제목 변경 요청 감지
        if (
          content.includes("제목") &&
          (content.includes("넣어") ||
            content.includes("바꿔") ||
            content.includes("변경"))
        ) {
          const titleMatch = message.content.match(
            /제목[은는]?\s*['"]([^'"]+)['"]/
          );
          if (titleMatch) {
            setPlanTitle(titleMatch[1]);
          }
        }

        // 요약 변경 요청 감지
        if (
          content.includes("요약") &&
          (content.includes("넣어") ||
            content.includes("써") ||
            content.includes("작성"))
        ) {
          const summaryMatch = message.content.match(
            /요약[에는]?\s*['"]([^'"]+)['"]/
          );
          if (summaryMatch) {
            setOverallSummary(summaryMatch[1]);
          }
        }
      }

      if (message.toolInvocations) {
        message.toolInvocations.forEach((invocation: any) => {
          if (
            invocation.toolName === "analyzeConditions" &&
            invocation.result
          ) {
            const result = invocation.result;
            if (result.programs && result.programs.length > 0) {
              // 변경된 항목 하이라이트
              const newChangedItems = new Set<string>();
              result.programs.forEach((program: TravelProgram) => {
                if (!programs.find((p) => p.id === program.id)) {
                  newChangedItems.add(program.id);
                }
              });
              setChangedItems(newChangedItems);

              // AI 응답으로 받은 프로그램으로 업데이트
              setPrograms(result.programs);
            }
          }
          if (invocation.toolName === "filterPrograms" && invocation.result) {
            const result = invocation.result;
            if (result.programs) {
              // 변경된 항목 하이라이트
              const newChangedItems = new Set<string>();
              result.programs.forEach((program: TravelProgram) => {
                if (!programs.find((p) => p.id === program.id)) {
                  newChangedItems.add(program.id);
                }
              });
              setChangedItems(newChangedItems);

              setPrograms(result.programs);
            }
          }
        });
      }
    },
  });

  const handleProgramSelect = (programId: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const handleCompare = () => {
    if (selectedPrograms.length === 0) return;
    setCurrentStep("compare");
  };

  const handleCreatePlan = (programId: string) => {
    setCurrentStep("plan");
    setIsThinking(true);

    setTimeout(() => {
      setTravelPlan([
        {
          day: 1,
          date: "6월 15일 (토)",
          activities: [
            {
              name: "익산역 도착",
              location: "익산역",
              comment: "KTX로 편리하게 접근 가능한 교통 허브",
              rating: 4.2,
              likes: 156,
              mapUrl: "https://map.naver.com/v5/search/익산역",
              duration: "30분",
              category: "휴식",
              popularityData: {
                monthlyVisitors: 15420,
                peakTime: "오후 6-8시",
                peakSeason: "주말",
                recommendedBy: 89,
                averageStay: "30분",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "익산 보석박물관",
              location: "익산시 왕궁면",
              comment: "아이들이 좋아하는 체험형 박물관, 보석 만들기 체험 가능",
              rating: 4.6,
              likes: 324,
              mapUrl: "https://map.naver.com/v5/search/익산보석박물관",
              duration: "2시간",
              category: "관광",
              popularityData: {
                monthlyVisitors: 8940,
                peakTime: "오후 2-4시",
                peakSeason: "여름휴가철",
                recommendedBy: 156,
                averageStay: "2시간 30분",
              },
              selected: false,
              userMemo: "아이가 보석 만들기를 정말 좋아할 것 같아요",
            },
            {
              name: "미륵사지 석탑",
              location: "익산시 금마면",
              comment: "백제 역사의 숨결을 느낄 수 있는 유네스코 세계문화유산",
              rating: 4.8,
              likes: 892,
              mapUrl: "https://map.naver.com/v5/search/미륵사지석탑",
              duration: "1.5시간",
              category: "관광",
              popularityData: {
                monthlyVisitors: 12350,
                peakTime: "오전 10-12시",
                peakSeason: "봄/가을",
                recommendedBy: 234,
                averageStay: "1시간 45분",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "숙소 체크인",
              location: "익산시 중심가",
              comment: "가족 단위 숙박에 최적화된 펜션, 주차 무료",
              rating: 4.4,
              likes: 267,
              mapUrl: "https://map.naver.com/v5/search/익산펜션",
              duration: "30분",
              category: "숙박",
              popularityData: {
                monthlyVisitors: 3240,
                peakTime: "오후 3-6시",
                peakSeason: "주말",
                recommendedBy: 78,
                averageStay: "1박",
              },
              selected: false,
              userMemo: "",
            },
          ],
          notes: "아이와 함께 즐길 수 있는 교육적 장소 위주로 구성",
        },
        {
          day: 2,
          date: "6월 16일 (일)",
          activities: [
            {
              name: "왕궁리 유적 탐방",
              location: "익산시 왕궁면",
              comment:
                "백제 왕궁터로 추정되는 역사적 장소, 넓은 잔디밭에서 휴식 가능",
              rating: 4.5,
              likes: 445,
              mapUrl: "https://map.naver.com/v5/search/왕궁리유적",
              duration: "2시간",
              category: "관광",
              popularityData: {
                monthlyVisitors: 6780,
                peakTime: "오전 9-11시",
                peakSeason: "봄",
                recommendedBy: 123,
                averageStay: "2시간 15분",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "익산 치즈마을",
              location: "익산시 함라면",
              comment: "아이들이 직접 치즈를 만들어볼 수 있는 체험 농장",
              rating: 4.7,
              likes: 612,
              mapUrl: "https://map.naver.com/v5/search/익산치즈마을",
              duration: "3시간",
              category: "체험",
              popularityData: {
                monthlyVisitors: 4560,
                peakTime: "오후 1-3시",
                peakSeason: "여름",
                recommendedBy: 189,
                averageStay: "3시간 30분",
              },
              selected: false,
              userMemo: "치즈 만들기 체험 예약 필수!",
            },
            {
              name: "가족 카페 방문",
              location: "익산시 부송동",
              comment:
                "키즈존이 있는 대형 카페, 부모는 휴식하고 아이는 놀 수 있어요",
              rating: 4.3,
              likes: 189,
              mapUrl: "https://map.naver.com/v5/search/익산키즈카페",
              duration: "1시간",
              category: "휴식",
              popularityData: {
                monthlyVisitors: 2340,
                peakTime: "오후 3-5시",
                peakSeason: "주말",
                recommendedBy: 67,
                averageStay: "1시간 30분",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "익산 맛집 탐방",
              location: "익산시 모현동",
              comment: "현지인 추천 갈비탕 맛집, 아이 메뉴도 준비되어 있음",
              rating: 4.6,
              likes: 378,
              mapUrl: "https://map.naver.com/v5/search/익산갈비탕",
              duration: "1시간",
              category: "식사",
              popularityData: {
                monthlyVisitors: 1890,
                peakTime: "오후 6-8시",
                peakSeason: "연중",
                recommendedBy: 145,
                averageStay: "1시간 15분",
              },
              selected: false,
              userMemo: "",
            },
          ],
          notes: "체험 활동과 휴식의 균형을 맞춘 일정",
        },
        {
          day: 3,
          date: "6월 17일 (월)",
          activities: [
            {
              name: "아침 산책",
              location: "익산시 금강둔치",
              comment: "금강을 따라 걷는 산책로, 아침 공기가 상쾌해요",
              rating: 4.4,
              likes: 234,
              mapUrl: "https://map.naver.com/v5/search/익산금강둔치",
              duration: "1시간",
              category: "휴식",
              popularityData: {
                monthlyVisitors: 5670,
                peakTime: "오전 7-9시",
                peakSeason: "봄/가을",
                recommendedBy: 89,
                averageStay: "1시간 30분",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "기념품 쇼핑",
              location: "익산역 상가",
              comment: "지역 특산품과 기념품을 구매할 수 있는 곳",
              rating: 4.1,
              likes: 145,
              mapUrl: "https://map.naver.com/v5/search/익산역상가",
              duration: "1시간",
              category: "쇼핑",
              popularityData: {
                monthlyVisitors: 3450,
                peakTime: "오후 2-4시",
                peakSeason: "연중",
                recommendedBy: 56,
                averageStay: "45분",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "점심 식사",
              location: "익산역 근처",
              comment: "기차 시간에 맞춰 간단하게 식사할 수 있는 곳",
              rating: 4.2,
              likes: 167,
              mapUrl: "https://map.naver.com/v5/search/익산역맛집",
              duration: "1시간",
              category: "식사",
              popularityData: {
                monthlyVisitors: 2890,
                peakTime: "오후 12-2시",
                peakSeason: "연중",
                recommendedBy: 78,
                averageStay: "1시간",
              },
              selected: false,
              userMemo: "",
            },
            {
              name: "귀가",
              location: "익산역",
              comment: "즐거웠던 여행의 마무리",
              rating: 4.0,
              likes: 89,
              mapUrl: "https://map.naver.com/v5/search/익산역",
              duration: "30분",
              category: "휴식",
              popularityData: {
                monthlyVisitors: 15420,
                peakTime: "오후 4-6시",
                peakSeason: "연중",
                recommendedBy: 45,
                averageStay: "30분",
              },
              selected: false,
              userMemo: "",
            },
          ],
          notes: "여유로운 마무리로 피로하지 않게 귀가",
        },
      ]);
      setIsThinking(false);
    }, 3000);
  };

  const handleActivitySelect = (dayIndex: number, activityIndex: number) => {
    const newPlan = [...travelPlan];
    newPlan[dayIndex].activities[activityIndex].selected =
      !newPlan[dayIndex].activities[activityIndex].selected;
    setTravelPlan(newPlan);
  };

  const handleMemoChange = (
    dayIndex: number,
    activityIndex: number,
    memo: string
  ) => {
    const newPlan = [...travelPlan];
    newPlan[dayIndex].activities[activityIndex].userMemo = memo;
    setTravelPlan(newPlan);
  };

  const saveToHistory = () => {
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ko-KR"),
      title: `${
        programs.find((p) => selectedPrograms.includes(p.id))?.name ||
        "여행 계획"
      } - ${new Date().toLocaleDateString()}`,
      step: currentStep,
      programs,
      selectedPrograms,
      travelPlan,
      messages,
    };
    setHistory((prev) => [newHistoryItem, ...prev]);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setPrograms(item.programs);
    setSelectedPrograms(item.selectedPrograms);
    setTravelPlan(item.travelPlan);
    setCurrentStep(item.step);
    setMessages(item.messages);
    setShowHistory(false);
  };

  const openSidePanel = (url: string, title: string) => {
    setSidePanel({ isOpen: true, url, title });
  };

  const getCategoryColor = (category: ActivityDetail["category"]) => {
    const colors = {
      관광: "bg-emerald-100 text-emerald-700 border-emerald-200",
      체험: "bg-green-100 text-green-700 border-green-200",
      식사: "bg-orange-100 text-orange-700 border-orange-200",
      숙박: "bg-purple-100 text-purple-700 border-purple-200",
      쇼핑: "bg-pink-100 text-pink-700 border-pink-200",
      휴식: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[category];
  };

  const goToStep = (
    step: "question" | "search" | "compare" | "plan" | "complete"
  ) => {
    setCurrentStep(step);
  };

  const clearSelectedPrograms = () => {
    if (selectedPrograms.length === 0) {
      alert("선택한 프로그램이 없습니다.");
      return;
    }
    setSelectedPrograms([]);
  };

  const resetAndClearSelection = () => {
    setCurrentStep("question");
    setSelectedPrograms([]);
    setTravelPlan([]);
    setQueryHistory([]);
    setMessages([]);
    setInput("");
    setPrograms([]);
  };

  const completeTravel = () => {
    setCurrentStep("complete");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleQueryHistoryClick = (query: string) => {
    setInput(query);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    if (input.trim()) {
      setQueryHistory((prev) => [...prev, input.trim()]);
      setIsThinking(true);

      // 질문 단계에서 입력이 있으면 즉시 2단계로 전환하고 기본 프로그램 표시
      if (currentStep === "question") {
        // 기본 프로그램 설정
        setPrograms(defaultPrograms);
        // 즉시 2단계로 전환
        setTimeout(() => {
          setCurrentStep("search");
          setIsThinking(false);
        }, 1000);
      }
    }
    handleSubmit(e);
  };

  const openOnlineDocument = (
    style:
      | "simple"
      | "standard"
      | "visual"
      | "calendar"
      | "calendar2" = "standard"
  ) => {
    // 심플버전 (기존 유지)
    const simpleDocumentContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${planTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #37352f;
      background: #ffffff;
      padding: 60px 80px;
      max-width: 900px;
      margin: 0 auto;
    }
    h1 { 
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #37352f;
    }
    h2 { 
      font-size: 24px;
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: 16px;
      color: #37352f;
    }
    p { 
      margin-bottom: 16px;
      color: #37352f;
    }
    .summary {
      margin-bottom: 32px;
      padding: 16px 0;
      border-bottom: 1px solid #e9e9e7;
    }
    .day-section { 
      margin-bottom: 32px;
    }
    .activity { 
      margin-bottom: 16px;
      margin-left: 16px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .activity-dot {
      width: 6px;
      height: 6px;
      background: #37352f;
      border-radius: 50%;
      margin-top: 8px;
      flex-shrink: 0;
    }
    .activity-content {
      flex: 1;
    }
    .activity-title { 
      font-weight: 600;
      margin-bottom: 4px;
    }
    .activity-details { 
      color: #787774;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .activity-description { 
      margin-bottom: 8px;
    }
    .memo { 
      font-style: italic;
      color: #787774;
      margin-top: 8px;
      padding-left: 16px;
      border-left: 3px solid #e9e9e7;
    }
    .header {
      text-align: center;
      margin-bottom: 48px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e9e9e7;
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
    .action-btn {
      background-color: #f0f0f0;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
  </style>
  <script>
    function downloadPDF() {
      window.print();
    }
    function copyText() {
      const text = document.body.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("텍스트가 클립보드에 복사되었습니다.");
      });
    }
    function shareDocument() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: document.body.innerText,
          url: document.location.href,
        });
      } else {
        alert("공유하기 기능은 지원되지 않는 환경입니다.");
      }
    }
  </script>
</head>
<body>
  <div class="header">
    <h1 class="title">${planTitle}</h1>
    <p class="subtitle">AI가 추천하는 맞춤형 여행 일정</p>
    <div class="action-buttons">
      <button onclick="downloadPDF()" class="action-btn">📥 다운로드(PDF)</button>
      <button onclick="copyText()" class="action-btn">📋 글복사</button>
      <button onclick="shareDocument()" class="action-btn">🔗 공유하기</button>
    </div>
  </div>
  
  ${overallSummary ? `<div class="summary"><p>${overallSummary}</p></div>` : ""}
  
  ${travelPlan
    .map(
      (day) => `
    <div class="day-section">
      <h2>${day.day}일차 - ${day.date}</h2>
      ${day.activities
        .map(
          (activity) => `
        <div class="activity">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <div class="activity-title">${activity.name}</div>
            <div class="activity-details">${activity.location} • ${
            activity.duration
          } • ${activity.category}</div>
            <div class="activity-description">${activity.comment}</div>
            ${
              activity.userMemo
                ? `<div class="memo">${activity.userMemo}</div>`
                : ""
            }
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `
    )
    .join("")}
</body>
</html>
`;

    // 달력버전 (기존)
    const calendarDocumentContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${planTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #37352f;
      background: #ffffff;
      padding: 60px 80px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 { 
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #37352f;
    }
    h2 { 
      font-size: 24px;
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: 16px;
      color: #37352f;
    }
    p { 
      margin-bottom: 16px;
      color: #37352f;
    }
    .summary {
      margin-bottom: 32px;
      padding: 16px 0;
      border-bottom: 1px solid #e9e9e7;
    }
    .header {
      text-align: center;
      margin-bottom: 48px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e9e9e7;
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
    .action-btn {
      background-color: #f0f0f0;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    
    /* 달력 스타일 */
    .calendar-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 32px;
      margin-bottom: 32px;
    }
    .day-calendar {
      border: 2px solid #e9e9e7;
      border-radius: 12px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .day-header {
      background: #374151;
      color: white;
      padding: 16px;
      text-align: center;
    }
    .day-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .day-date {
      font-size: 14px;
      opacity: 0.9;
    }
    .day-notes {
      background: #f3f4f6;
      padding: 12px 16px;
      font-size: 14px;
      color: #6b7280;
      border-bottom: 1px solid #e5e7eb;
    }
    .activities-list {
      padding: 16px;
    }
    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .activity-item:last-child {
      border-bottom: none;
    }
    .activity-time {
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      min-width: 60px;
      text-align: center;
      flex-shrink: 0;
    }
    .activity-content {
      flex: 1;
    }
    .activity-name {
      font-weight: 600;
      margin-bottom: 4px;
      color: #111827;
    }
    .activity-location {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .activity-description {
      font-size: 13px;
      color: #374151;
      line-height: 1.4;
    }
    .activity-memo {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 6px;
      padding: 8px;
      margin-top: 8px;
      font-size: 12px;
      color: #92400e;
      font-style: italic;
    }
    .category-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      margin-left: 8px;
    }
    .category-관광 { background: #d1fae5; color: #065f46; }
    .category-체험 { background: #dcfce7; color: #166534; }
    .category-식사 { background: #fed7aa; color: #9a3412; }
    .category-숙박 { background: #e9d5ff; color: #7c2d12; }
    .category-쇼핑 { background: #fce7f3; color: #be185d; }
    .category-휴식 { background: #f3f4f6; color: #374151; }
  </style>
  <script>
    function downloadPDF() {
      window.print();
    }
    function copyText() {
      const text = document.body.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("텍스트가 클립보드에 복사되었습니다.");
      });
    }
    function shareDocument() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: "여행 계획서를 공유합니다",
          url: document.location.href,
        });
      } else {
        alert("공유하기 기능은 지원되지 않는 환경입니다.");
      }
    }
  </script>
</head>
<body>
  <div class="header">
    <h1 class="title">${planTitle}</h1>
    <p class="subtitle">AI가 추천하는 맞춤형 여행 일정</p>
    <div class="action-buttons">
      <button onclick="downloadPDF()" class="action-btn">📥 다운로드(PDF)</button>
      <button onclick="copyText()" class="action-btn">📋 글복사</button>
      <button onclick="shareDocument()" class="action-btn">🔗 공유하기</button>
    </div>
  </div>
  
  ${overallSummary ? `<div class="summary"><p>${overallSummary}</p></div>` : ""}
  
  <div class="calendar-container">
    ${travelPlan
      .map(
        (day) => `
      <div class="day-calendar">
        <div class="day-header">
          <div class="day-title">${day.day}일차</div>
          <div class="day-date">${day.date}</div>
        </div>
        <div class="day-notes">✨ ${day.notes}</div>
        <div class="activities-list">
          ${day.activities
            .map(
              (activity, index) => `
            <div class="activity-item">
              <div class="activity-time">${
                index === 0
                  ? "오전"
                  : index === day.activities.length - 1
                  ? "저녁"
                  : index < day.activities.length / 2
                  ? "오전"
                  : "오후"
              }</div>
              <div class="activity-content">
                <div class="activity-name">
                  ${activity.name}
                  <span class="category-badge category-${activity.category}">${
                activity.category
              }</span>
                </div>
                <div class="activity-location">📍 ${activity.location} • ⏰ ${
                activity.duration
              }</div>
                <div class="activity-description">${activity.comment}</div>
                ${
                  activity.userMemo
                    ? `<div class="activity-memo">💭 ${activity.userMemo}</div>`
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      )
      .join("")}
  </div>
</body>
</html>
`;

    // 달력버전2 (새로운 캘린더 형태)
    const calendar2DocumentContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${planTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #37352f;
      background: #ffffff;
      padding: 60px 80px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 { 
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #37352f;
    }
    .header {
      text-align: center;
      margin-bottom: 48px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e9e9e7;
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
    .action-btn {
      background-color: #f0f0f0;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    .summary {
      margin-bottom: 32px;
      padding: 16px 0;
      border-bottom: 1px solid #e9e9e7;
    }
    
    /* 달력 스타일 */
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
      padding: 0 16px;
    }
    .calendar-title {
      font-size: 24px;
      font-weight: 700;
      color: #37352f;
    }
    .calendar-nav {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      color: #6b7280;
    }
    .nav-btn:hover {
      background: #f3f4f6;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #e5e7eb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 32px;
    }
    .calendar-day-header {
      background: #f9fafb;
      padding: 12px 8px;
      text-align: center;
      font-weight: 600;
      font-size: 14px;
      color: #6b7280;
    }
    .calendar-day {
      background: #ffffff;
      min-height: 120px;
      padding: 8px;
      position: relative;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .calendar-day:hover {
      background: #f9fafb;
    }
    .calendar-day.has-events {
      background: #eff6ff;
      border: 2px solid #3b82f6;
    }
    .calendar-day.has-events:hover {
      background: #dbeafe;
    }
    .day-number {
      font-weight: 600;
      color: #374151;
      margin-bottom: 4px;
    }
    .day-number.other-month {
      color: #d1d5db;
    }
    .event-item {
      background: #3b82f6;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event-item.category-관광 { background: #10b981; }
    .event-item.category-체험 { background: #059669; }
    .event-item.category-식사 { background: #f59e0b; }
    .event-item.category-숙박 { background: #8b5cf6; }
    .event-item.category-쇼핑 { background: #ec4899; }
    .event-item.category-휴식 { background: #6b7280; }
    
    /* 상세 정보 패널 */
    .detail-panel {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-top: 32px;
      display: none;
    }
    .detail-panel.active {
      display: block;
    }
    .detail-header {
      display: flex;
      align-items: center;
      justify-content: between;
      margin-bottom: 16px;
    }
    .detail-title {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      color: #6b7280;
      margin-left: auto;
    }
    .detail-activities {
      space-y: 16px;
    }
    .detail-activity {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .detail-activity-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .detail-activity-name {
      font-weight: 600;
      color: #111827;
    }
    .detail-category-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .detail-category-badge.category-관광 { background: #d1fae5; color: #065f46; }
    .detail-category-badge.category-체험 { background: #dcfce7; color: #166534; }
    .detail-category-badge.category-식사 { background: #fed7aa; color: #9a3412; }
    .detail-category-badge.category-숙박 { background: #e9d5ff; color: #7c2d12; }
    .detail-category-badge.category-쇼핑 { background: #fce7f3; color: #be185d; }
    .detail-category-badge.category-휴식 { background: #f3f4f6; color: #374151; }
    .detail-activity-meta {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .detail-activity-description {
      color: #374151;
      font-size: 14px;
      line-height: 1.5;
    }
    .detail-activity-memo {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 6px;
      padding: 8px;
      margin-top: 8px;
      font-size: 13px;
      color: #92400e;
      font-style: italic;
    }
  </style>
  <script>
    let selectedDate = null;
    
    function downloadPDF() {
      window.print();
    }
    function copyText() {
      const text = document.body.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("텍스트가 클립보드에 복사되었습니다.");
      });
    }
    function shareDocument() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: "여행 계획서를 공유합니다",
          url: document.location.href,
        });
      } else {
        alert("공유하기 기능은 지원되지 않는 환경입니다.");
      }
    }
    
    function showDayDetail(dayIndex) {
      selectedDate = dayIndex;
      const detailPanel = document.getElementById('detail-panel');
      const detailTitle = document.getElementById('detail-title');
      const detailContent = document.getElementById('detail-content');
      
      const travelData = ${JSON.stringify(travelPlan)};
      const dayData = travelData[dayIndex];
      
      if (dayData) {
        detailTitle.textContent = dayData.day + '일차 - ' + dayData.date;
        
        let activitiesHtml = '';
        dayData.activities.forEach(activity => {
          activitiesHtml += \`
            <div class="detail-activity">
              <div class="detail-activity-header">
                <span class="detail-activity-name">\${activity.name}</span>
                <span class="detail-category-badge category-\${activity.category}">\${activity.category}</span>
              </div>
              <div class="detail-activity-meta">📍 \${activity.location} • ⏰ \${activity.duration}</div>
              <div class="detail-activity-description">\${activity.comment}</div>
              \${activity.userMemo ? \`<div class="detail-activity-memo">💭 \${activity.userMemo}</div>\` : ''}
            </div>
          \`;
        });
        
        detailContent.innerHTML = activitiesHtml;
        detailPanel.classList.add('active');
        detailPanel.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    function closeDetail() {
      document.getElementById('detail-panel').classList.remove('active');
    }
  </script>
</head>
<body>
  <div class="header">
    <h1 class="title">${planTitle}</h1>
    <p class="subtitle">AI가 추천하는 맞춤형 여행 일정</p>
    <div class="action-buttons">
      <button onclick="downloadPDF()" class="action-btn">📥 다운로드(PDF)</button>
      <button onclick="copyText()" class="action-btn">📋 글복사</button>
      <button onclick="shareDocument()" class="action-btn">🔗 공유하기</button>
    </div>
  </div>
  
  ${overallSummary ? `<div class="summary"><p>${overallSummary}</p></div>` : ""}
  
  <div class="calendar-header">
    <h2 class="calendar-title">2024년 6월</h2>
    <div class="calendar-nav">
      <button class="nav-btn">‹</button>
      <span>오늘</span>
      <button class="nav-btn">›</button>
    </div>
  </div>
  
  <div class="calendar-grid">
    <div class="calendar-day-header">일</div>
    <div class="calendar-day-header">월</div>
    <div class="calendar-day-header">화</div>
    <div class="calendar-day-header">수</div>
    <div class="calendar-day-header">목</div>
    <div class="calendar-day-header">금</div>
    <div class="calendar-day-header">토</div>
    
    <!-- 6월 달력 생성 -->
    ${Array.from({ length: 42 }, (_, i) => {
      const dayNum = i - 5; // 6월 1일이 토요일이라고 가정
      const isCurrentMonth = dayNum >= 1 && dayNum <= 30;
      const displayNum = isCurrentMonth
        ? dayNum
        : dayNum <= 0
        ? 31 + dayNum
        : dayNum - 30;

      // 여행 일정이 있는 날짜 확인
      let hasEvents = false;
      let eventsHtml = "";
      let dayIndex = -1;

      if (isCurrentMonth) {
        travelPlan.forEach((day, index) => {
          const dayDate = Number.parseInt(day.date.match(/\d+/)[0]);
          if (dayDate === dayNum) {
            hasEvents = true;
            dayIndex = index;
            day.activities.slice(0, 3).forEach((activity) => {
              eventsHtml += `<div class="event-item category-${activity.category}">${activity.name}</div>`;
            });
            if (day.activities.length > 3) {
              eventsHtml += `<div class="event-item">+${
                day.activities.length - 3
              }개 더</div>`;
            }
          }
        });
      }

      return `
        <div class="calendar-day ${hasEvents ? "has-events" : ""}" ${
        hasEvents ? `onclick="showDayDetail(${dayIndex})"` : ""
      }>
          <div class="day-number ${
            !isCurrentMonth ? "other-month" : ""
          }">${displayNum}</div>
          ${eventsHtml}
        </div>
      `;
    }).join("")}
  </div>
  
  <div id="detail-panel" class="detail-panel">
    <div class="detail-header">
      <h3 id="detail-title" class="detail-title"></h3>
      <button class="close-btn" onclick="closeDetail()">✕</button>
    </div>
    <div id="detail-content" class="detail-activities"></div>
  </div>
</body>
</html>
`;

    // 기본버전과 사진버전 (심플버전 베이스 + 스텝5 타임라인 스타일 + 배경색 변경)
    const getPlaceholderImage = (activity: any) => {
      const queries = {
        "익산역 도착": "modern train station building",
        "익산 보석박물관": "jewelry museum with colorful gems",
        "미륵사지 석탑": "ancient korean stone pagoda temple",
        "숙소 체크인": "cozy family pension accommodation",
        "왕궁리 유적 탐방": "ancient korean palace ruins archaeological site",
        "익산 치즈마을": "cheese making farm with cows",
        "가족 카페 방문": "family cafe with kids play area",
        "익산 맛집 탐방": "korean traditional restaurant galbitang",
        "아침 산책": "peaceful river walking path morning",
        "기념품 쇼핑": "local souvenir shop traditional crafts",
        "점심 식사": "korean restaurant near train station",
        귀가: "train departure platform goodbye",
      };
      return `/placeholder.svg?height=60&width=80&query=${encodeURIComponent(
        queries[activity.name as keyof typeof queries] || activity.name
      )}`;
    };

    const advancedDocumentContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${planTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #37352f;
      background: #ffffff;
      padding: 60px 80px;
      max-width: 900px;
      margin: 0 auto;
    }
    h1 { 
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #37352f;
    }
    h2 { 
      font-size: 24px;
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: 16px;
      color: #37352f;
    }
    p { 
      margin-bottom: 16px;
      color: #37352f;
    }
    .summary {
      margin-bottom: 32px;
      padding: 16px 0;
      border-bottom: 1px solid #e9e9e7;
    }
    .header {
      text-align: center;
      margin-bottom: 48px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e9e9e7;
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
    .action-btn {
      background-color: #f0f0f0;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    
    /* 스텝5 타임라인 스타일 */
    .day-section { 
      margin-bottom: 48px;
    }
    .day-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }
    .day-badge {
      background: #202a37;
      color: white;
      padding: 8px 16px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
    }
    .day-notes {
      color: #6b7280;
      font-size: 14px;
    }
    .timeline {
      position: relative;
      padding-left: 80px;
    }
    .timeline-line {
      position: absolute;
      left: 64px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #d1d5db;
    }
    .activity-item {
      position: relative;
      margin-bottom: 32px;
    }
    .timeline-dot {
      position: absolute;
      left: -17px;
      top: 20px;
      width: 16px;
      height: 16px;
      background: #d1d5db;
      border-radius: 50%;
      z-index: 10;
    }
    .activity-card {
      background: #fafafa;
      border-radius: 12px;
      padding: 24px;
      max-width: 800px;
    }
    .activity-header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
    }
    .activity-image {
      width: 80px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .activity-content {
      flex: 1;
    }
    .activity-title {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }
    .activity-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
      font-size: 14px;
      color: #6b7280;
    }
    .activity-description {
      color: #374151;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .activity-memo {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 8px;
      padding: 12px;
      font-size: 14px;
      color: #92400e;
      font-style: italic;
      margin-top: 12px;
    }
  </style>
  <script>
    function downloadPDF() {
      window.print();
    }
    function copyText() {
      const text = document.body.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("텍스트가 클립보드에 복사되었습니다.");
      });
    }
    function shareDocument() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: "여행 계획서를 공유합니다",
          url: document.location.href,
        });
      } else {
        alert("공유하기 기능은 지원되지 않는 환경입니다.");
      }
    }
  </script>
</head>
<body>
  <div class="header">
    <h1 class="title">${planTitle}</h1>
    <p class="subtitle">AI가 추천하는 맞춤형 여행 일정</p>
    <div class="action-buttons">
      <button onclick="downloadPDF()" class="action-btn">📥 다운로드(PDF)</button>
      <button onclick="copyText()" class="action-btn">📋 글복사</button>
      <button onclick="shareDocument()" class="action-btn">🔗 공유하기</button>
    </div>
  </div>
  
  ${overallSummary ? `<div class="summary"><p>${overallSummary}</p></div>` : ""}
  
  ${travelPlan
    .map(
      (day) => `
    <div class="day-section">
      <div class="day-header">
        <div class="day-badge">
          ${day.day}일차 - ${day.date}
        </div>
        <div class="day-notes">
          ✨ ${day.notes}
        </div>
      </div>
      
      <div class="timeline">
        <div class="timeline-line"></div>
        ${day.activities
          .map(
            (activity) => `
          <div class="activity-item">
            <div class="timeline-dot"></div>
            <div class="activity-card">
              <div class="activity-header">
                ${
                  style === "visual"
                    ? `<img src="${getPlaceholderImage(activity)}" alt="${
                        activity.name
                      }" class="activity-image" />`
                    : ""
                }
                <div class="activity-content">
                  <h3 class="activity-title">${activity.name}</h3>
                  <div class="activity-meta">
                    <span>📍 ${activity.location}</span>
                    <span>⏰ ${activity.duration}</span>
                    <span>🏷️ ${activity.category}</span>
                  </div>
                  <div class="activity-description">
                    ${activity.comment}
                  </div>
                  ${
                    activity.userMemo
                      ? `<div class="activity-memo">💭 ${activity.userMemo}</div>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("")}
</body>
</html>
`;

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      if (style === "simple") {
        newWindow.document.write(simpleDocumentContent);
      } else if (style === "calendar") {
        newWindow.document.write(calendarDocumentContent);
      } else if (style === "calendar2") {
        newWindow.document.write(calendar2DocumentContent);
      } else {
        newWindow.document.write(advancedDocumentContent);
      }
      newWindow.document.close();
    }
  };

  // 예시 히스토리 데이터 추가
  useEffect(() => {
    if (history.length === 0) {
      const exampleHistories: HistoryItem[] = [
        {
          id: "example-1",
          date: "2024.12.06",
          title: "6월에 아이랑 주말 2박 3일 여행 갈 건데 지원금 있나요?",
          step: "complete",
          programs: [
            {
              id: "1",
              name: "전라북도 가족여행 지원사업",
              region: "전라북도 익산",
              amount: "최대 30만원",
              duration: "2박 3일",
              requirements: ["가족 동반", "주말 이용"],
              needsPlan: true,
              familyFriendly: true,
              applicationMethod: "온라인 신청",
              applicationUrl: "https://www.jeonbuk.go.kr/tour/support",
            },
          ],
          selectedPrograms: ["1"],
          travelPlan: [],
          messages: [],
        },
        {
          id: "example-2",
          date: "2024.12.05",
          title: "30만원 이상 지원받을 수 있는 여행 프로그램 추천해주세요",
          step: "search",
          programs: [
            {
              id: "1",
              name: "전라북도 가족여행 지원사업",
              region: "전라북도 익산",
              amount: "최대 30만원",
              duration: "2박 3일",
              requirements: ["가족 동반", "주말 이용"],
              needsPlan: true,
              familyFriendly: true,
              applicationMethod: "온라인 신청",
              applicationUrl: "https://www.jeonbuk.go.kr/tour/support",
            },
            {
              id: "3",
              name: "제주도 체험관광 지원금",
              region: "제주도",
              amount: "최대 40만원",
              duration: "3박 4일",
              requirements: ["체험 프로그램 필수", "숙박 증빙"],
              needsPlan: true,
              familyFriendly: true,
              applicationMethod: "추첨 신청",
              applicationUrl: "https://www.jeju.go.kr/tour/experience",
            },
          ],
          selectedPrograms: [],
          travelPlan: [],
          messages: [],
        },
      ];
      setHistory(exampleHistories);
    }
  }, []);

  // 자동 저장
  useEffect(() => {
    if (travelPlan.length > 0) {
      saveToHistory();
    }
  }, [travelPlan]);

  // 변경된 항목 하이라이트 제거
  useEffect(() => {
    if (changedItems.size > 0) {
      const timer = setTimeout(() => {
        setChangedItems(new Set());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [changedItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 flex">
      {/* History Panel */}
      <HistoryPanel
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        history={history}
        loadFromHistory={loadFromHistory}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          showHistory ? "ml-80" : "ml-0"
        }`}
      >
        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <HeaderSection
              currentStep={currentStep}
              goToStep={goToStep}
              programsLength={programs.length}
              selectedProgramsLength={selectedPrograms.length}
              travelPlanLength={travelPlan.length}
            />

            {/* Chat Interface - 스텝1~3에서만 표시 */}
            {(currentStep === "question" ||
              currentStep === "search" ||
              currentStep === "compare") && (
              <QuestionSection
                currentStep={currentStep}
                handleChatSubmit={handleChatSubmit}
                handleInputChange={handleInputChange}
                input={input}
                isLoading={isLoading}
                messages={messages}
                queryHistory={queryHistory}
                handleQueryHistoryClick={handleQueryHistoryClick}
                resetAndClearSelection={resetAndClearSelection}
                copyToClipboard={copyToClipboard}
                setInput={setInput}
                isThinking={isThinking}
              />
            )}

            {/* Step 2: Program Selection */}
            {currentStep === "search" && programs.length > 0 && (
              <SearchSection
                programs={programs}
                selectedPrograms={selectedPrograms}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearSelectedPrograms={clearSelectedPrograms}
                handleProgramSelect={handleProgramSelect}
                selectedProgramDetail={selectedProgramDetail}
                setSelectedProgramDetail={setSelectedProgramDetail}
                openSidePanel={openSidePanel}
                goToStep={goToStep}
                changedItems={changedItems}
                handleCompare={handleCompare}
              />
            )}

            {/* Step 3: Comparison */}
            {currentStep === "compare" && (
              <CompareSection
                programs={programs}
                selectedPrograms={selectedPrograms}
                goToStep={goToStep}
                handleCreatePlan={handleCreatePlan}
                openSidePanel={openSidePanel}
              />
            )}

            {/* Step 4 & 5: Travel Plan */}
            {(currentStep === "plan" || currentStep === "complete") && (
              <PlanSection
                currentStep={currentStep}
                travelPlan={travelPlan}
                completeTravel={completeTravel}
                getCategoryColor={getCategoryColor}
                handleActivitySelect={handleActivitySelect}
                handleMemoChange={handleMemoChange}
                showDetailFor={showDetailFor}
                setShowDetailFor={setShowDetailFor}
                showMemoFor={showMemoFor}
                setShowMemoFor={setShowMemoFor}
                planTitle={planTitle}
                setPlanTitle={setPlanTitle}
                overallSummary={overallSummary}
                setOverallSummary={setOverallSummary}
                openOnlineDocument={openOnlineDocument}
                goToStep={goToStep}
                isThinking={isThinking}
              />
            )}

            {/* Side Panel */}
            {sidePanel.isOpen && (
              <div className="fixed inset-0 z-50 flex">
                <div
                  className="fixed inset-0 bg-black/20"
                  onClick={() =>
                    setSidePanel({ isOpen: false, url: "", title: "" })
                  }
                ></div>

                <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-xl z-50 border-l border-gray-200">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">
                      {sidePanel.title}
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSidePanel({ isOpen: false, url: "", title: "" })
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <iframe
                    src={sidePanel.url}
                    className="w-full h-full"
                    title={sidePanel.title}
                  />
                </div>
              </div>
            )}

            {/* History Button */}
            <div className="fixed top-6 left-6 z-40">
              <Button
                onClick={() => setShowHistory(!showHistory)}
                className="w-16 h-16 rounded-full bg-transparent hover:bg-transparent border-none shadow-none"
                style={{ boxShadow: "none" }}
              >
                <Menu className="w-12 h-12" style={{ color: "#222" }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
