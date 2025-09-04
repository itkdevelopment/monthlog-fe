"use client";

import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/monthlog-proto/ui/badge";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/monthlog/ui/input";
import { FormCompose } from "@/components/monthlog-proto/ui/form";
import { Button } from "../ui/button";

interface Cafe {
  name: string;
  plan: string;
  price: string;
  comment: string;
  is24Hour: boolean;
  link: string;
}

interface SelectedRecommendation {
  cafeId: string;
  comment: string;
}

export default function CafeInput() {
  const { watch, setValue, control } = useFormContext();

  const selectedScore: number | null = watch("cafe.score");
  const cafes: Cafe[] = watch("cafe.cafes") || [];
  const selectedRecommendations: SelectedRecommendation[] =
    watch("cafe.recommendations") || [];

  // 추천 카페
  const allCafes = [
    {
      id: "starbucks-gangnam",
      name: "스타벅스 강남역점",
      plan: "음료 주문",
      price: "4500원",
      comment: "넓은 공간과 안정적인 와이파이",
      likes: 189,
      is24Hour: false,
      link: "https://starbucks.co.kr/gangnam",
    },
    {
      id: "twosome-hongdae",
      name: "투썸플레이스 홍대점",
      plan: "음료 주문",
      price: "4000원",
      comment: "조용한 분위기와 편안한 좌석",
      likes: 156,
      is24Hour: true,
      link: "https://twosome.co.kr/hongdae",
    },
    {
      id: "ediya-sinchon",
      name: "이디야커피 신촌점",
      plan: "음료 주문",
      price: "2500원",
      comment: "저렴한 가격과 넓은 공간",
      likes: 143,
      is24Hour: true,
      link: "https://ediya.com/sinchon",
    },
  ];

  // 점수 선택
  const handleScoreChange = (score: number) => {
    setValue("cafe.score", score);
  };

  // 카페 추가
  const addCafe = (newCafe: Cafe) => {
    setValue("cafe.cafes", [...cafes, newCafe]);
  };

  const removeCafe = (index: number) => {
    setValue(
      "cafe.cafes",
      cafes.filter((_, i) => i !== index)
    );
  };

  // 추천 선택
  const handleRecommendationSelect = (cafeId: string) => {
    const exists = selectedRecommendations.find((r) => r.cafeId === cafeId);
    if (exists) {
      setValue(
        "cafe.recommendations",
        selectedRecommendations.filter((r) => r.cafeId !== cafeId)
      );
    } else {
      setValue("cafe.recommendations", [
        ...selectedRecommendations,
        { cafeId, comment: "" },
      ]);
    }
  };

  const updateRecommendationComment = (cafeId: string, comment: string) => {
    setValue(
      "cafe.recommendations",
      selectedRecommendations.map((r) =>
        r.cafeId === cafeId ? { ...r, comment } : r
      )
    );
  };

  return (
    <div className="space-y-12">
      {/* 카페 작업 환경 만족도 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          카페 작업 환경 만족도
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          노트북 작업하기에 카페 환경이 얼마나 좋은지 1~10점으로 평가해주세요
        </p>
        <div className="grid grid-cols-10 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <Button
              key={score}
              type="button"
              onClick={() => handleScoreChange(score)}
              className={`aspect-square text-lg font-semibold rounded-lg transition-colors ${
                selectedScore === score
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {score}
            </Button>
          ))}
        </div>
        {selectedScore && (
          <p className="text-sm text-blue-600 font-medium mt-3">
            선택한 점수: {selectedScore}점
          </p>
        )}
      </div>

      {/* 마음에 드는 장소 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          마음에 드는 장소
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          다른 사람들이 추천한 노트북 카페 중 마음에 드는 곳을 선택해주세요
        </p>
        <div className="space-y-2">
          {allCafes.map((cafe) => {
            const isSelected = selectedRecommendations.some(
              (r) => r.cafeId === cafe.id
            );
            const selectedRec = selectedRecommendations.find(
              (r) => r.cafeId === cafe.id
            );
            return (
              <div key={cafe.id} className="space-y-2">
                <Button
                  type="button"
                  onClick={() => handleRecommendationSelect(cafe.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        [{cafe.name}] {cafe.comment}
                      </span>
                      {cafe.is24Hour && (
                        <Badge className="bg-green-100 text-green-700 text-xs pointer-events-none">
                          24시
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      {cafe.plan} • {cafe.price}
                    </div>
                  </div>
                  <div className="text-sm opacity-70 ml-4 whitespace-nowrap">
                    {cafe.likes}명이 공감
                  </div>
                </Button>
                {isSelected && (
                  <div className="ml-4">
                    <Input
                      type="text"
                      value={selectedRec?.comment || ""}
                      onChange={(e) =>
                        updateRecommendationComment(cafe.id, e.target.value)
                      }
                      placeholder="이 카페에 대한 한줄 코멘트를 입력해주세요"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 카페 추가 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">카페 추가</h3>
        <p className="text-sm text-gray-600 mb-6">
          이용한 노트북 카페 정보를 입력해주세요
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2">
          <FormCompose
            name="cafe.newCafe.name"
            label="카페명"
            control={control}
            render={(field) => <Input {...field} placeholder="카페명" />}
          />
          <FormCompose
            name="cafe.newCafe.plan"
            label="주문 메뉴"
            control={control}
            render={(field) => <Input {...field} placeholder="주문 메뉴" />}
          />
          <FormCompose
            name="cafe.newCafe.price"
            label="가격"
            control={control}
            render={(field) => (
              <Input {...field} placeholder="가격 (숫자만)" type="number" />
            )}
          />
          <FormCompose
            name="cafe.newCafe.comment"
            label="한줄코멘트"
            control={control}
            render={(field) => <Input {...field} placeholder="한줄코멘트" />}
          />
          <FormCompose
            name="cafe.newCafe.link"
            label="카페 링크"
            control={control}
            render={(field) => <Input {...field} placeholder="카페 링크" />}
          />
          <Button
            type="button"
            onClick={() => {
              const newCafe = watch("cafe.newCafe") as Cafe;
              if (
                newCafe?.name &&
                newCafe?.plan &&
                newCafe?.price &&
                newCafe?.comment &&
                newCafe?.link
              ) {
                addCafe(newCafe);
                setValue("cafe.newCafe", {
                  name: "",
                  plan: "",
                  price: "",
                  comment: "",
                  is24Hour: false,
                  link: "",
                });
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border bg-gray-100 hover:bg-gray-200"
          >
            <Plus className="w-3 h-3" />
            카페 추가
          </Button>
        </div>

        {cafes.length > 0 && (
          <div className="space-y-2">
            {cafes.map((cafe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">
                    {cafe.name}
                  </span>
                  <span className="text-sm text-gray-500">{cafe.plan}</span>
                  <span className="text-sm text-gray-500">{cafe.price}원</span>
                  {cafe.is24Hour && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      24시
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">{cafe.comment}</span>
                  <a
                    href={cafe.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                  >
                    링크 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <Button
                  type="button"
                  onClick={() => removeCafe(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
