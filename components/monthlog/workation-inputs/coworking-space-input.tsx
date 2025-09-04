"use client";

import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/monthlog-proto/ui/badge";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/monthlog/ui/input";
import { Button } from "@/components/monthlog/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/monthlog/ui/select";

interface CoworkingSpace {
  name: string;
  plan: string;
  price: string;
  comment: string;
  is24Hour: boolean;
  link: string;
}

interface SelectedRecommendation {
  spaceId: string;
  comment: string;
}

interface CoworkingSpaceInputProps {
  name: string;
}

export default function CoworkingSpaceInput({
  name,
}: CoworkingSpaceInputProps) {
  const { watch, setValue, control } = useFormContext();

  const selectedScore: number | null = watch(`${name}.score`);
  const coworkingSpaces: CoworkingSpace[] = watch(`${name}.spaces`) || [];
  const selectedRecommendations: SelectedRecommendation[] =
    watch(`${name}.recommendations`) || [];
  const newSpace: CoworkingSpace = watch(`${name}.newSpace`) || {
    name: "",
    plan: "",
    price: "",
    comment: "",
    is24Hour: false,
    link: "",
  };

  const planOptions = [
    "1시간",
    "1일권",
    "7일권",
    "10일권",
    "15일권",
    "한달플랜",
    "3개월 플랜",
    "6개월 플랜",
    "1년플랜",
  ];

  const allSpaces = [
    {
      id: "wework-gangnam",
      name: "WeWork 강남",
      plan: "데이패스",
      price: "3만원",
      comment: "깔끔한 시설과 좋은 네트워킹 환경",
      likes: 156,
      is24Hour: true,
      link: "https://wework.com/gangnam",
    },
    {
      id: "fastfive-hongdae",
      name: "패스트파이브 홍대",
      plan: "월 멤버십",
      price: "15만원",
      comment: "젊은 분위기와 다양한 이벤트",
      likes: 142,
      is24Hour: false,
      link: "https://fastfive.co.kr/hongdae",
    },
    {
      id: "sparkplus-yeoksam",
      name: "스파크플러스 역삼",
      plan: "주간권",
      price: "8만원",
      comment: "조용한 업무환경과 편리한 위치",
      likes: 128,
      is24Hour: true,
      link: "https://sparkplus.co.kr/yeoksam",
    },
  ];

  const handleScoreChange = (score: number) => {
    setValue(`${name}.score`, score);
  };

  const addCoworkingSpace = () => {
    if (
      newSpace.name &&
      newSpace.plan &&
      newSpace.price &&
      newSpace.comment &&
      newSpace.link
    ) {
      setValue(`${name}.spaces`, [...coworkingSpaces, newSpace]);
      setValue(`${name}.newSpace`, {
        name: "",
        plan: "",
        price: "",
        comment: "",
        is24Hour: false,
        link: "",
      });
    }
  };

  const removeCoworkingSpace = (index: number) => {
    setValue(
      `${name}.spaces`,
      coworkingSpaces.filter((_, i) => i !== index)
    );
  };

  const handleRecommendationSelect = (spaceId: string) => {
    const exists = selectedRecommendations.find((r) => r.spaceId === spaceId);
    if (exists) {
      setValue(
        `${name}.recommendations`,
        selectedRecommendations.filter((r) => r.spaceId !== spaceId)
      );
    } else {
      setValue(`${name}.recommendations`, [
        ...selectedRecommendations,
        { spaceId, comment: "" },
      ]);
    }
  };

  const updateRecommendationComment = (spaceId: string, comment: string) => {
    setValue(
      `${name}.recommendations`,
      selectedRecommendations.map((r) =>
        r.spaceId === spaceId ? { ...r, comment } : r
      )
    );
  };

  return (
    <div className="space-y-12">
      {/* 점수 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          코워킹스페이스 확보 용이성
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          코워킹스페이스를 찾고 예약하는 것이 얼마나 쉬운지 1~10점으로
          평가해주세요
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

      {/* 추천 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          마음에 드는 장소
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          다른 사람들이 추천한 코워킹스페이스 중 마음에 드는 곳을 선택해주세요
        </p>
        <div className="space-y-2">
          {allSpaces.map((space) => {
            const isSelected = selectedRecommendations.some(
              (r) => r.spaceId === space.id
            );
            const selectedRec = selectedRecommendations.find(
              (r) => r.spaceId === space.id
            );
            return (
              <div key={space.id} className="space-y-2">
                <Button
                  type="button"
                  onClick={() => handleRecommendationSelect(space.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        [{space.name}] {space.comment}
                      </span>
                      {space.is24Hour && (
                        <Badge className="bg-green-100 text-green-700 text-xs pointer-events-none">
                          24시
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      {space.plan} • {space.price}
                    </div>
                  </div>
                  <div className="text-sm opacity-70 ml-4 whitespace-nowrap">
                    {space.likes}명이 공감
                  </div>
                </Button>
                {isSelected && (
                  <div className="ml-4">
                    <Input
                      type="text"
                      value={selectedRec?.comment || ""}
                      onChange={(e) =>
                        updateRecommendationComment(space.id, e.target.value)
                      }
                      placeholder="이 장소에 대한 한줄 코멘트를 입력해주세요"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 새 스페이스 추가 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          코워킹스페이스 추가
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          이용한 코워킹스페이스 정보를 입력해주세요
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2">
          <Input
            value={newSpace.name}
            onChange={(e) => setValue(`${name}.newSpace.name`, e.target.value)}
            placeholder="장소명"
          />

          {/* Select với Controller */}
          <Controller
            name={`${name}.newSpace.plan`}
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={planOptions.map((plan) => ({
                  label: plan,
                  value: plan,
                }))}
              />
            )}
          />

          <Input
            type="number"
            value={newSpace.price}
            onChange={(e) => setValue(`${name}.newSpace.price`, e.target.value)}
            placeholder="가격 (숫자만)"
          />
          <Input
            value={newSpace.comment}
            onChange={(e) =>
              setValue(`${name}.newSpace.comment`, e.target.value)
            }
            placeholder="한줄코멘트"
          />
          <Input
            value={newSpace.link}
            onChange={(e) => setValue(`${name}.newSpace.link`, e.target.value)}
            placeholder="코워킹스페이스 링크"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newSpace.is24Hour}
              onChange={(e) =>
                setValue(`${name}.newSpace.is24Hour`, e.target.checked)
              }
            />
            <span className="text-sm">24시간 오픈</span>
          </div>

          <Button
            type="button"
            onClick={addCoworkingSpace}
            disabled={
              !newSpace.name ||
              !newSpace.plan ||
              !newSpace.price ||
              !newSpace.comment ||
              !newSpace.link
            }
            variant="outline"
            className="gap-1"
          >
            <Plus className="w-3 h-3" />
            코워킹스페이스 추가
          </Button>
        </div>

        {coworkingSpaces.length > 0 && (
          <div className="space-y-2">
            {coworkingSpaces.map((space, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">
                    {space.name}
                  </span>
                  <span className="text-sm text-gray-500">{space.plan}</span>
                  <span className="text-sm text-gray-500">{space.price}원</span>
                  {space.is24Hour && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      24시
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">{space.comment}</span>
                  <a
                    href={space.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                  >
                    링크 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <Button
                  type="button"
                  onClick={() => removeCoworkingSpace(index)}
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
