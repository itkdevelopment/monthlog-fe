"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SatisfactionInput from "../workation-inputs/satisfaction-input";
import { useFormContext } from "react-hook-form";

interface SatisfactionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export default function SatisfactionPanel({
  isOpen,
  onClose,
  name,
}: SatisfactionPanelProps) {
  const { control, setValue, watch } = useFormContext();
  const selectedScore: number | null = watch(`${name}`);

  const scoreDistribution = [
    { score: 1, count: 1, percentage: 1 },
    { score: 2, count: 2, percentage: 2 },
    { score: 3, count: 5, percentage: 5 },
    { score: 4, count: 8, percentage: 8 },
    { score: 5, count: 12, percentage: 12 },
    { score: 6, count: 18, percentage: 18 },
    { score: 7, count: 25, percentage: 25 },
    { score: 8, count: 20, percentage: 20 },
    { score: 9, count: 7, percentage: 7 },
    { score: 10, count: 2, percentage: 2 },
  ];

  // 평균 점수 계산
  const totalResponses = scoreDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const weightedSum = scoreDistribution.reduce(
    (sum, item) => sum + item.score * item.count,
    0
  );
  const averageScore = Math.round(weightedSum / totalResponses);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        className="fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl flex flex-col h-[95vh] z-50"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            워케이션 환경 만족도 {averageScore}/10
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">100명이 기여한 정보</span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          <div className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  점수별 분포
                </h3>
                <div className="space-y-4">
                  {scoreDistribution.map((item) => (
                    <div key={item.score} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {item.score}점
                        </span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: "#0B24FB",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-8 pb-24">
              <SatisfactionInput name={name} />

              <div className="pt-6">
                <button
                  disabled={!selectedScore}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+10 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
