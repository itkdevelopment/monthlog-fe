// components/monthlog/workation-inputs/membership-input.tsx
"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/monthlog/ui/button";
import { Input } from "@/components/monthlog/ui/input";
import { Label } from "@/components/monthlog/ui/label";
import { useFormContext } from "react-hook-form";

interface PricePlan {
  tag: string;
  price: string;
}

interface MembershipInputProps {
  // nếu bạn muốn component hoạt động bên trong react-hook-form, truyền `name`.
  // nếu không truyền `name` thì component hoạt động bằng props callback (legacy).
  name?: string;

  // các callback / giá trị để sử dụng khi NOT dùng form context
  onScoreChange?: (score: number | null) => void;
  onTagsChange?: (selectedTags: string[], newTags: string[]) => void;
  onPricePlansChange?: (pricePlans: PricePlan[]) => void;
  selectedScore?: number | null;
  selectedTags?: string[];
  newTags?: string[];
  pricePlans?: PricePlan[];
}

export default function MembershipInput(props: MembershipInputProps) {
  const {
    name,
    onScoreChange,
    onTagsChange,
    onPricePlansChange,
    selectedScore: selectedScoreProp,
    selectedTags: selectedTagsProp,
    newTags: newTagsProp,
    pricePlans: pricePlansProp,
  } = props;

  // Try to get form context. If not inside a FormProvider this will be caught.
  let form: ReturnType<typeof useFormContext> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    form = useFormContext();
  } catch (e) {
    form = null;
  }

  // If name && form available, use form state; otherwise fallback to props
  const usingForm = Boolean(name && form);

  // Local UI state used when NOT using form
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(
    selectedTagsProp ?? []
  );
  const [localNewTags, setLocalNewTags] = useState<string[]>(newTagsProp ?? []);
  const [localPricePlans, setLocalPricePlans] = useState<PricePlan[]>(
    pricePlansProp ?? []
  );
  const [localSelectedPriceTags, setLocalSelectedPriceTags] = useState<
    string[]
  >([]);
  const [priceValue, setPriceValue] = useState("");
  const [currentPriceTag, setCurrentPriceTag] = useState("");
  const [newTagInput, setNewTagInput] = useState("");

  // helpers to read/write either from form or from props/local
  const readSelectedScore = (): number | null =>
    usingForm
      ? (form!.watch(`${name}.ease_score`) as number | null) ?? null
      : selectedScoreProp ?? null;

  const readSelectedTags = (): string[] =>
    usingForm
      ? (form!.watch(`${name}.tags`) as string[]) ?? []
      : localSelectedTags;

  const readNewTags = (): string[] =>
    usingForm
      ? (form!.watch(`${name}.newTags`) as string[]) ?? []
      : localNewTags;

  const readPricePlans = (): PricePlan[] =>
    usingForm
      ? (form!.watch(`${name}.plans`) as PricePlan[]) ?? []
      : localPricePlans;

  // write helpers
  const writeScore = (score: number | null) => {
    if (usingForm) {
      form!.setValue(`${name}.ease_score`, score);
    } else {
      onScoreChange?.(score ?? null);
    }
  };

  const writeTags = (selectedTags: string[], newTags: string[]) => {
    if (usingForm) {
      form!.setValue(`${name}.tags`, selectedTags);
      form!.setValue(`${name}.newTags`, newTags);
    } else {
      setLocalSelectedTags(selectedTags);
      setLocalNewTags(newTags);
      onTagsChange?.(selectedTags, newTags);
    }
  };

  const writePricePlans = (plans: PricePlan[]) => {
    if (usingForm) {
      form!.setValue(`${name}.plans`, plans);
    } else {
      setLocalPricePlans(plans);
      onPricePlansChange?.(plans);
    }
  };

  // UI data
  const existingTags = [
    { text: "주단위 이용권 구매 용이", votes: 48 },
    { text: "일일권 저렴", votes: 42 },
    { text: "월 멤버십 할인", votes: 38 },
    { text: "시간당 요금제", votes: 32 },
    { text: "학생 할인 있음", votes: 28 },
    { text: "멤버십 비쌈", votes: 15 },
  ];

  const priceTags = [
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

  // Toggles
  const toggleTag = (tagText: string) => {
    const selectedTags = readSelectedTags();
    const newTags = readNewTags();
    const updatedSelected = selectedTags.includes(tagText)
      ? selectedTags.filter((t) => t !== tagText)
      : [...selectedTags, tagText];
    writeTags(updatedSelected, newTags);
  };

  const addNewTag = () => {
    const selectedTags = readSelectedTags();
    const newTags = readNewTags();
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (!newTags.includes(trimmed)) {
      const updatedNew = [...newTags, trimmed];
      writeTags(selectedTags, updatedNew);
    }
    setNewTagInput("");
  };

  const removeNewTag = (tagToRemove: string) => {
    const selectedTags = readSelectedTags();
    const newTags = readNewTags();
    const updatedNew = newTags.filter((t) => t !== tagToRemove);
    writeTags(selectedTags, updatedNew);
  };

  const togglePriceTag = (tag: string) => {
    const selected = localSelectedPriceTags.slice();
    if (selected.includes(tag)) {
      setLocalSelectedPriceTags(selected.filter((t) => t !== tag));
    } else {
      setLocalSelectedPriceTags([...selected, tag]);
    }
    setCurrentPriceTag(tag);
  };

  const formatPrice = (price: number) => price.toLocaleString("ko-KR");

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setPriceValue(numericValue);
  };

  const addPricePlan = () => {
    if (!currentPriceTag || !priceValue) return;
    const plans = readPricePlans();
    const newPlan: PricePlan = { tag: currentPriceTag, price: priceValue };
    writePricePlans([...plans, newPlan]);
    setPriceValue("");
  };

  const removePricePlan = (index: number) => {
    const plans = readPricePlans();
    writePricePlans(plans.filter((_, i) => i !== index));
  };

  const selectedScore = readSelectedScore();
  const selectedTags = readSelectedTags();
  const newTags = readNewTags();
  const pricePlans = readPricePlans();

  return (
    <div className="space-y-12">
      {/* Score */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          단기 이용권 구매 편의성
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          단기 이용권 구매의 편의성에 대해 1~10점으로 평가해주세요
        </p>
        <div className="grid grid-cols-10 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <Button
              key={score}
              type="button"
              variant={selectedScore === score ? "default" : "outline"}
              color={selectedScore === score ? "neutral" : "grayscale"}
              onClick={() => writeScore(score)}
              className="h-12 rounded-lg font-semibold text-lg"
            >
              {score}
            </Button>
          ))}
        </div>
        {!!selectedScore && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              선택한 점수: <strong>{selectedScore}점</strong>
            </p>
          </div>
        )}
      </div>

      {/* Price tag selection */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">이용권 가격대</h3>
        <p className="text-sm text-gray-600 mb-4">
          이용권 종류를 클릭하거나 직접 추가해주세요 (다중 선택 가능)
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {priceTags.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant={
                localSelectedPriceTags.includes(tag) ? "default" : "outline"
              }
              color={
                localSelectedPriceTags.includes(tag) ? "neutral" : "grayscale"
              }
              size="sm"
              onClick={() => togglePriceTag(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>

        {localSelectedPriceTags.map((tag) => (
          <div key={tag} className="mb-6">
            <Label className="block mb-2">{tag} 가격 정보</Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={tag}
                readOnly
                className="w-32 bg-gray-100"
              />
              <Input
                type="text"
                value={
                  currentPriceTag === tag && priceValue
                    ? formatPrice(Number.parseInt(priceValue))
                    : ""
                }
                onChange={(e) => {
                  setCurrentPriceTag(tag);
                  handlePriceChange(e.target.value);
                }}
                placeholder="가격"
                className="flex-1"
              />
              <span className="text-gray-600">원</span>
              <Button
                type="button"
                color="primary"
                size="icon"
                onClick={addPricePlan}
                disabled={currentPriceTag !== tag || !priceValue}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {pricePlans.filter((p) => p.tag === tag).length > 0 && (
              <div className="mt-3 space-y-2">
                {pricePlans
                  .filter((p) => p.tag === tag)
                  .map((plan, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        {plan.tag} - {formatPrice(Number.parseInt(plan.price))}
                        원
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        color="destructive"
                        size="icon"
                        onClick={() => removePricePlan(idx)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">관련 태그</h3>
        <p className="text-sm text-gray-600 mb-4">
          해당하는 태그를 선택하거나 새로운 태그를 추가해주세요
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {existingTags.map((t, i) => (
            <Button
              key={i}
              type="button"
              variant={selectedTags.includes(t.text) ? "default" : "outline"}
              color={selectedTags.includes(t.text) ? "neutral" : "grayscale"}
              size="sm"
              onClick={() => toggleTag(t.text)}
            >
              #{t.text} ({t.votes})
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder="새로운 태그 입력"
            onKeyPress={(e) => {
              if (e.key === "Enter") addNewTag();
            }}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={addNewTag}
            disabled={!newTagInput.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {newTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {newTags.map((t, i) => (
              <div
                key={i}
                className="px-3 py-2 bg-green-50 text-green-700 border rounded-lg flex items-center gap-2"
              >
                #{t}
                <button
                  onClick={() => removeNewTag(t)}
                  className="text-green-500 hover:text-green-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
