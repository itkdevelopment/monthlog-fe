"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Button } from "../ui/button";

interface SatisfactionInputProps {
  name: string;
}

export default function SatisfactionInput({ name }: SatisfactionInputProps) {
  const { control } = useFormContext();

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        워케이션 환경 만족도를 평가해주세요
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        1점(매우 불만족) ~ 10점(매우 만족)
      </p>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <Button
                  key={score}
                  type="button"
                  onClick={() => field.onChange(score)}
                  className={`h-16 rounded-lg font-bold text-lg transition-colors ${
                    field.value === score
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {score}점
                </Button>
              ))}
            </div>

            {!!field.value && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  선택한 점수: <strong>{field.value}점</strong>
                </p>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
