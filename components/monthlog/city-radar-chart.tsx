// components/monthlog/city-radar-chart.tsx
'use client';

import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import SectionCard from './shared/section-card';
import { CompatibilityData, PopularTag } from '@/types/monthlog/city-detail';

interface CityRadarChartProps {
  data: CompatibilityData;
  tags: PopularTag[];
  comments: string[];
}

export default function CityRadarChart({
  data,
  tags,
  comments,
}: CityRadarChartProps) {
  // Transform data for radar chart
  const radarData = [
    {
      subject: '나홀로\n힐링',
      A: data.soloHealing,
      fullMark: 10,
    },
    {
      subject: '디지털노마드&\n워케이션',
      A: data.digitalNomad,
      fullMark: 10,
    },
    {
      subject: '아이와\n함께',
      A: data.withKids,
      fullMark: 10,
    },
    {
      subject: '가성비\n여행',
      A: data.budgetTravel,
      fullMark: 10,
    },
    {
      subject: '특별한\n경험',
      A: data.specialExperience,
      fullMark: 10,
    },
  ];

  return (
    <SectionCard title="">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          이 도시, 나랑 맞을까?
        </h2>
        <p className="text-gray-600">제주도의 핵심 지표를 한눈에 확인하세요</p>
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center mb-8 px-0 py-6">
        <div className="w-[700px] h-[500px] overflow-visible">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={radarData}
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            >
              <PolarGrid
                gridType="polygon"
                radialLines={true}
                stroke="rgba(11, 36, 251, 0.1)"
                strokeWidth={1}
              />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontSize: 12,
                  fontWeight: 500,
                  fill: '#333333',
                  textAnchor: 'middle',
                  dominantBaseline: 'middle',
                }}
                className="text-sm"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tickCount={6}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="적합도"
                dataKey="A"
                stroke="#0B24FB"
                fill="rgba(11, 36, 251, 0.2)"
                strokeWidth={2}
                dot={{ fill: '#0B24FB', strokeWidth: 2, stroke: 'white', r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
          <button className="py-3 px-4 rounded-full bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-200">
            <span className="text-sm font-semibold">🧘‍♀️ 나홀로힐링</span>
          </button>
          <button className="py-3 px-4 rounded-full bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-200">
            <span className="text-sm font-semibold">
              💻 디지털노마드&워케이션
            </span>
          </button>
          <button className="py-3 px-4 rounded-full bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-200">
            <span className="text-sm font-semibold">👨‍👩‍👧‍👦 아이와함께</span>
          </button>
          <button className="py-3 px-4 rounded-full bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-200">
            <span className="text-sm font-semibold">💰 가성비여행</span>
          </button>
          <button className="py-3 px-4 rounded-full bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-200">
            <span className="text-sm font-semibold">✨ 특별한경험</span>
          </button>
        </div>
      </div>

      {/* Tags and Comments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            인기 도시 태그
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1 font-normal"
              >
                {tag.name} {tag.count}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            인기 한줄 코멘트
          </h3>
          <div className="space-y-3 mb-3">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm leading-relaxed text-center">
                  {comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
