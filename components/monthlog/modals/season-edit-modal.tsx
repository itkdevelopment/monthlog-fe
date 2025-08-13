'use client';

import { useState } from 'react';
import { X, Filter, ChevronDown } from 'lucide-react';
import { SeasonData } from '@/types/monthlog/city-detail';

interface SeasonEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SeasonData;
  onSave: (data: SeasonData) => void;
}

export default function SeasonEditModal({
  isOpen,
  onClose,
  data,
  onSave,
}: SeasonEditModalProps) {
  const [selectedRecommendMonths, setSelectedRecommendMonths] = useState<
    string[]
  >([]);
  const [selectedAvoidMonths, setSelectedAvoidMonths] = useState<string[]>([]);
  const [recommendReason, setRecommendReason] = useState('');
  const [avoidReason, setAvoidReason] = useState('');

  if (!isOpen) return null;

  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const handleMonthToggle = (month: string, type: 'recommend' | 'avoid') => {
    if (type === 'recommend') {
      setSelectedRecommendMonths(prev =>
        prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month],
      );
    } else {
      setSelectedAvoidMonths(prev =>
        prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month],
      );
    }
  };

  const handleSave = () => {
    // Process and save data
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Bottom Sheet Modal */}
      <div
        className="fixed left-0 right-0 bg-white rounded-t-2xl flex flex-col"
        style={{ bottom: 0, height: '95vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              추천 ↔ 피해야하는 시기
            </h2>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                추천하는 시기만
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                피해야하는 시기만
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">28명이 기여한 정보</p>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Left Sidebar - Monthly Distribution */}
          <div className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  월별 추천/피해야하는 시기 분포
                </h3>

                {/* Monthly bars - simplified representation */}
                <div className="space-y-4">
                  {data.monthlyData.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {month.month}
                        </span>
                        <span className="text-gray-500">
                          {month.recommendations}명
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-blue-600"
                          style={{
                            width: `${(month.recommendations / 35) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current month details */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900">
                  8월 관련 의견
                </h3>

                <div>
                  <h5 className="text-sm font-medium text-blue-600 mb-2">
                    🥰 추천하는 이유
                  </h5>
                  <div className="space-y-2">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        바다 활동하기 최고의 시기예요
                      </p>
                      <span className="text-xs text-gray-500">2명</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-red-600 mb-2">
                    😰 피해야하는 이유
                  </h5>
                  <div className="space-y-2">
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        폭염으로 너무 더워요
                      </p>
                      <span className="text-xs text-gray-500">10명</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Edit Form */}
          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-12 pb-24">
              {/* Recommend Section */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  🥰 추천하는 시기
                </h4>

                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    추천하는 월을 선택해주세요 (다중 선택 가능)
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {months.map(month => (
                      <button
                        key={month}
                        onClick={() => handleMonthToggle(month, 'recommend')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedRecommendMonths.includes(month)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    추천하는 이유를 작성해주세요
                  </p>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="예: 벚꽃 시즌이라 완벽한 날씨 속에서 도시 전체가 아름다워요"
                    value={recommendReason}
                    onChange={e => setRecommendReason(e.target.value)}
                  />
                </div>
              </div>

              {/* Avoid Section */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  😰 피해야하는 시기
                </h4>

                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    피해야하는 월을 선택해주세요 (다중 선택 가능)
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {months.map(month => (
                      <button
                        key={month}
                        onClick={() => handleMonthToggle(month, 'avoid')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedAvoidMonths.includes(month)
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    피해야하는 이유를 작성해주세요
                  </p>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="예: 비가 자주 와서 야외 활동이 제한되고 날씨가 변덕스러워요"
                    value={avoidReason}
                    onChange={e => setAvoidReason(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSave}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 font-medium rounded-lg transition-colors"
                >
                  경험 공유하기 (+50 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
