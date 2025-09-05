"use client";

import { X, Plus } from "lucide-react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/monthlog/ui/button";
import { Input } from "@/components/monthlog/ui/input";

interface PowerStabilityInputProps {
  name: string;
}

export default function PowerStabilityInput({
  name,
}: PowerStabilityInputProps) {
  const { control, setValue, watch } = useFormContext();
  const [newTag, setNewTag] = useState("");

  const selectedScore: number | null = watch(`${name}.rating`);
  const selectedTags: string[] = watch(`${name}.tags`) || [];
  const [newTags, setNewTags] = useState<string[]>([]);

  const existingTags = [
    { text: "정전 거의 없음", votes: 45 },
    { text: "전압 안정적", votes: 38 },
    { text: "콘센트 충분", votes: 32 },
    { text: "220V 안정", votes: 28 },
    { text: "정전 가끔 발생", votes: 15 },
    { text: "전압 불안정", votes: 8 },
  ];

  // 점수 선택
  const handleScoreChange = (score: number) => {
    setValue(`${name}.rating`, score);
  };

  // 태그 토글
  const toggleTag = (tagText: string) => {
    const updated = selectedTags.includes(tagText)
      ? selectedTags.filter((t) => t !== tagText)
      : [...selectedTags, tagText];
    setValue(`${name}.tags`, updated);
  };

  // 새 태그 추가
  const addNewTag = () => {
    if (newTag.trim() && !newTags.includes(newTag.trim())) {
      setNewTags([...newTags, newTag.trim()]);
      setNewTag("");
      setValue(`${name}.tags`, [...selectedTags, newTag.trim()]);
    }
  };

  const removeNewTag = (tagToRemove: string) => {
    setNewTags(newTags.filter((t) => t !== tagToRemove));
    setValue(
      `${name}.tags`,
      selectedTags.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <div className="space-y-12">
      {/* 만족도 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          전력 안정성 만족도
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          전력 안정성에 대한 만족도를 1~10점으로 평가해주세요
        </p>

        <div className="grid grid-cols-10 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <Button
              key={score}
              type="button"
              onClick={() => handleScoreChange(score)}
              className={`aspect-square rounded-lg font-semibold text-lg transition-colors ${
                selectedScore === score
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {score}
            </Button>
          ))}
        </div>
        {!!selectedScore && (
          <p className="text-sm text-blue-600 font-medium mt-3">
            선택한 점수: {selectedScore}점
          </p>
        )}
      </div>

      {/* 태그 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">관련 태그</h3>
        <p className="text-sm text-gray-600 mb-6">
          해당하는 태그를 선택하거나 새로운 태그를 추가해주세요
        </p>

        {/* 기존 태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {existingTags.map((tag) => (
            <Button
              key={tag.text}
              type="button"
              onClick={() => toggleTag(tag.text)}
              className={`px-3 py-2 border rounded-lg transition-colors ${
                selectedTags.includes(tag.text)
                  ? "bg-black text-white border-black"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
            >
              #{tag.text} ({tag.votes})
            </Button>
          ))}
        </div>

        {/* 새 태그 추가 */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="새로운 태그 입력"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewTag();
                }
              }}
            />
            <Button
              type="button"
              onClick={addNewTag}
              disabled={!newTag.trim()}
              variant="outline"
              className="px-3"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* 추가된 태그 */}
          {newTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {newTags.map((tag, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2"
                >
                  #{tag}
                  <button
                    onClick={() => removeNewTag(tag)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {(!!selectedScore || selectedTags.length > 0) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                {selectedScore && (
                  <span>
                    선택한 점수: <strong>{selectedScore}점</strong>
                  </span>
                )}

                {selectedTags.length > 0 && (
                  <span>
                    {(selectedScore || selectedTags.length > 0) && ", "}새 태그:{" "}
                    <strong>{selectedTags.join(", ")}</strong>
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
