"use client";
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Wifi,
  Zap,
  Building,
  Coffee,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/monthlog-proto/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/monthlog-proto/ui/card";
import { DigitalData } from "@/types/monthlog/city-detail";
// Import các input components
import SatisfactionInput from "@/components/monthlog-proto/workation-inputs/satisfaction-input";
import InternetSpeedInput from "@/components/monthlog-proto/workation-inputs/internet-speed-input";
import PowerStabilityInput from "@/components/monthlog-proto/workation-inputs/power-stability-input";
import WifiAccessInput from "@/components/monthlog-proto/workation-inputs/wifi-access-input";
import CoworkingSpaceInput from "@/components/monthlog-proto/workation-inputs/coworking-space-input";
import CafeInput from "@/components/monthlog-proto/workation-inputs/cafe-input";
import MembershipInput from "@/components/monthlog-proto/workation-inputs/membership-input";

interface WorkationGroupEditPageProps {
  isOpen: boolean;
  onClose: () => void;
  data?: DigitalData;
}

export default function WorkationGroupEditPage({
  isOpen,
  onClose,
  data,
}: WorkationGroupEditPageProps) {
  const [expPoints, setExpPoints] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);
  // State cho các form inputs
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(
    null
  );
  const [internetSpeed, setInternetSpeed] = useState("");
  const [internetSatisfactionScore, setInternetSatisfactionScore] = useState<
    number | null
  >(null);
  const [powerStabilityScore, setPowerStabilityScore] = useState<number | null>(
    null
  );
  const [powerStabilityTags, setPowerStabilityTags] = useState<string[]>([]);
  const [powerStabilityNewTags, setPowerStabilityNewTags] = useState<string[]>(
    []
  );
  const [wifiAccessScore, setWifiAccessScore] = useState<number | null>(null);
  const [wifiAccessTags, setWifiAccessTags] = useState<string[]>([]);
  const [wifiAccessNewTags, setWifiAccessNewTags] = useState<string[]>([]);
  const [coworkingSpaceScore, setCoworkingSpaceScore] = useState<number | null>(
    null
  );
  const [coworkingSpaces, setCoworkingSpaces] = useState<any[]>([]);
  const [coworkingRecommendations, setCoworkingRecommendations] = useState<
    any[]
  >([]);
  const [cafeScore, setCafeScore] = useState<number | null>(null);
  const [cafes, setCafes] = useState<any[]>([]);
  const [cafeRecommendations, setCafeRecommendations] = useState<any[]>([]);
  const [membershipScore, setMembershipScore] = useState<number | null>(null);
  const [membershipTags, setMembershipTags] = useState<string[]>([]);
  const [membershipNewTags, setMembershipNewTags] = useState<string[]>([]);
  const [membershipPricePlans, setMembershipPricePlans] = useState<any[]>([]);

  // Load existing data when popup opens
  useEffect(() => {
    if (isOpen && data) {
      setSatisfactionScore(data.digitalSatisfactionScore ?? null);
      setInternetSpeed(data.internetSpeedMbps?.toString() ?? "");
      // Load other existing data...
    }
  }, [isOpen, data]);

  // Global click detection
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const editContent = document.querySelector(".edit-popup-content");
      if (editContent && editContent.contains(target)) {
        if (
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea")
        ) {
          setIsButtonActive(true);
        }
      }
    };

    const handleGlobalInput = (event: Event) => {
      const target = event.target as HTMLElement;
      const editContent = document.querySelector(".edit-popup-content");
      if (editContent && editContent.contains(target)) {
        setIsButtonActive(true);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("input", handleGlobalInput);
    document.addEventListener("change", handleGlobalInput);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("input", handleGlobalInput);
      document.removeEventListener("change", handleGlobalInput);
    };
  }, [isOpen]);

  const handleSubmit = () => {
    console.log("Form submitted");
    console.log("Total EXP gained:", expPoints);
    // TODO: Save data to backend
    onClose();
  };

  // Không hiển thị component nếu isOpen là false
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Full Screen Content */}
      <div className=" fixed inset-0 bg-gray-50 overflow-y-auto">
        <div className="min-h-screen max-w-5xl mx-auto edit-popup-content">
          {/* Header */}
          <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100 w-full">
            <div className="flex items-center justify-between h-16 px-6 lg:px-8">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                돌아가기
              </Button>
              <h1 className="text-lg font-bold text-gray-900">
                디지털/업무 환경 한번에 개척하기
              </h1>
              <div className="w-24"></div>
            </div>
          </header>

          {/* Main Content */}
          <main className="px-4 py-8 pb-32">
            <div className="space-y-8">
              {/* 1. 워케이션 환경 만족도 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp
                      className="h-6 w-6"
                      style={{ color: "#0B24FB" }}
                    />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      워케이션 환경 만족도
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <SatisfactionInput
                    onScoreChange={setSatisfactionScore}
                    selectedScore={satisfactionScore}
                  />
                </CardContent>
              </Card>

              {/* 2. 인터넷 평균 속도 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-6 w-6" style={{ color: "#0B24FB" }} />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      인터넷 평균 속도
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <InternetSpeedInput
                    onSpeedChange={setInternetSpeed}
                    inputSpeed={internetSpeed}
                    onSatisfactionChange={setInternetSatisfactionScore}
                    satisfactionScore={internetSatisfactionScore}
                  />
                </CardContent>
              </Card>

              {/* 3. 전력 안정성 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6" style={{ color: "#0B24FB" }} />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      전력 안정성
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <PowerStabilityInput
                    onScoreChange={setPowerStabilityScore}
                    onTagsChange={(selectedTags, newTags) => {
                      setPowerStabilityTags(selectedTags);
                      setPowerStabilityNewTags(newTags);
                    }}
                    selectedScore={powerStabilityScore}
                    selectedTags={powerStabilityTags}
                    newTags={powerStabilityNewTags}
                  />
                </CardContent>
              </Card>

              {/* 4. 무료 Wi-Fi 접근성 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-6 w-6" style={{ color: "#0B24FB" }} />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      무료 Wi-Fi 접근성
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <WifiAccessInput
                    onScoreChange={setWifiAccessScore}
                    onTagsChange={(selectedTags, newTags) => {
                      setWifiAccessTags(selectedTags);
                      setWifiAccessNewTags(newTags);
                    }}
                    selectedScore={wifiAccessScore}
                    selectedTags={wifiAccessTags}
                    newTags={wifiAccessNewTags}
                  />
                </CardContent>
              </Card>

              {/* 5. 코워킹 스페이스 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Building
                      className="h-6 w-6"
                      style={{ color: "#0B24FB" }}
                    />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      코워킹 스페이스
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <CoworkingSpaceInput
                    onScoreChange={setCoworkingSpaceScore}
                    onSpacesChange={setCoworkingSpaces}
                    onRecommendationsChange={setCoworkingRecommendations}
                    selectedScore={coworkingSpaceScore}
                    coworkingSpaces={coworkingSpaces}
                    selectedRecommendations={coworkingRecommendations}
                  />
                </CardContent>
              </Card>

              {/* 6. 노트북 하기 좋은 카페 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-6 w-6" style={{ color: "#0B24FB" }} />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      노트북 하기 좋은 카페
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <CafeInput
                    onScoreChange={setCafeScore}
                    onCafesChange={setCafes}
                    onRecommendationsChange={setCafeRecommendations}
                    selectedScore={cafeScore}
                    cafes={cafes}
                    selectedRecommendations={cafeRecommendations}
                  />
                </CardContent>
              </Card>

              {/* 7. 단기 멤버십 정보 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <CreditCard
                      className="h-6 w-6"
                      style={{ color: "#0B24FB" }}
                    />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#0B24FB" }}
                    >
                      단기 멤버십 정보
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <MembershipInput
                    onScoreChange={setMembershipScore}
                    onTagsChange={(selectedTags, newTags) => {
                      setMembershipTags(selectedTags);
                      setMembershipNewTags(newTags);
                    }}
                    onPricePlansChange={setMembershipPricePlans}
                    selectedScore={membershipScore}
                    selectedTags={membershipTags}
                    newTags={membershipNewTags}
                    pricePlans={membershipPricePlans}
                  />
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Bottom Fixed Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent">
            <div className="max-w-md mx-auto">
              <Button
                onClick={handleSubmit}
                disabled={!isButtonActive}
                style={{
                  backgroundColor: isButtonActive ? "#0B24FB" : "#d1d5db",
                  color: isButtonActive ? "white" : "#6b7280",
                  borderRadius: "9999px",
                }}
                className={`w-full py-4 text-lg font-semibold transition-colors ${
                  isButtonActive ? "hover:opacity-90" : "cursor-not-allowed"
                }`}
              >
                한번에 개척하기 (+{expPoints} EXP)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}