'use client';

import ExpLevelCard from '@/components/monthlog/experience-level-card';
import CityCard from '@/components/monthlog/city-card';
import type { City, Recommendation } from '@/types/monthlog';
import { useRouter } from 'next/navigation';

/**
 * MonthlogHomePage
 * - Mobile-first layout
 * - Sticky EXP card on md+ only to avoid stealing space on small screens
 * - Responsive grid: 1 → 2 → 3 columns
 */
export default function MonthlogHomePage() {
  const MOCK_CITIES: City[] = [
    {
      id: '1',
      slug: 'jeju',
      city: '제주도',
      country: '한국',
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.29.52-mzrVWJqK0dtGnXiCzaDV7y817YJvyj.png',
      tags: ['반려동물 동반', '코워킹 스페이스', '카페 투어'],
      costRange: '150-250만원',
      livingCost: 100,
      safety: 48,
      culture: 25,
      likes: 45,
      contributors: [
        { id: '1', name: '김민수' },
        { id: '2', name: '이지영' },
        { id: '3', name: '박철수' },
        { id: '4', name: '최유진' },
      ],
    },
    {
      id: '2',
      slug: 'chiangmai',
      city: '치앙마이',
      country: '태국',
      image:
        'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1200&h=800&fit=crop&crop=center',
      tags: ['코워킹 노마드', '카페로 떠나기'],
      costRange: '80-120만원',
      livingCost: 50,
      safety: 8,
      culture: 10,
      likes: 32,
      contributors: [
        { id: '5', name: '정다은' },
        { id: '6', name: '한승우' },
      ],
    },
    {
      id: '3',
      slug: 'busan',
      city: '부산',
      country: '한국',
      image:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop&crop=center',
      tags: ['자연 가까운 뚝배기', '해변 도시'],
      costRange: '120-200만원',
      livingCost: 95,
      safety: 8,
      culture: 8,
      likes: 38,
      contributors: [
        { id: '8', name: '강민지' },
        { id: '9', name: '조현우' },
        { id: '10', name: '신은영' },
      ],
    },
    {
      id: '4',
      slug: 'gangneung',
      city: '강릉',
      country: '한국',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop&crop=center',
      contributors: [],
    },
    {
      id: '5',
      city: '리스본',
      slug: 'lisbon',
      country: '포르투갈',
      image:
        'https://images.unsplash.com/photo-1526481280698-8fcc8f5a0980?w=1200&h=800&fit=crop&crop=center',
      contributors: [
        { id: '8', name: '강민지' },
        { id: '9', name: '조현우' },
      ],
    },
    {
      id: '6',
      city: '발리',
      slug: 'bali',
      country: '인도네시아',
      image:
        'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1200&h=800&fit=crop&crop=center',
      contributors: [{ id: '10', name: '신은영' }],
    },
  ];
  [
    {
      id: '1',
      city: '제주도',
      country: '한국',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=800&fit=crop&crop=center',
      tags: ['반려동물 동반', '코워킹 스페이스', '카페 투어'],
      costRange: '150-250만원',
      livingCost: 100,
      safety: 48,
      culture: 25,
      likes: 45,
      contributors: [
        { id: '1', name: '김민수' },
        { id: '2', name: '이지영' },
        { id: '3', name: '박철수' },
        { id: '4', name: '최유진' },
      ],
    },
    {
      id: '2',
      city: '치앙마이',
      country: '태국',
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=center',
      tags: ['코워킹 노마드', '카페로 떠나기'],
      costRange: '80-120만원',
      livingCost: 50,
      safety: 8,
      culture: 10,
      likes: 32,
      contributors: [
        { id: '5', name: '정다은' },
        { id: '6', name: '한승우' },
      ],
    },
    {
      id: '3',
      city: '부산',
      country: '한국',
      image:
        'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=800&fit=crop&crop=center',
      tags: ['자연 가까운 뚝배기', '해변 도시'],
      costRange: '120-200만원',
      livingCost: 95,
      safety: 8,
      culture: 8,
      likes: 38,
      contributors: [
        { id: '8', name: '강민지' },
        { id: '9', name: '조현우' },
        { id: '10', name: '신은영' },
      ],
    },
    {
      id: '4',
      city: '강릉',
      country: '한국',
      image:
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop&crop=center',
      contributors: [],
    },
    {
      id: '5',
      city: '리스본',
      country: '포르투갈',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop&crop=center',
      contributors: [
        { id: '8', name: '강민지' },
        { id: '9', name: '조현우' },
      ],
    },
    {
      id: '6',
      city: '발리',
      country: '인도네시아',
      image:
        'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&h=800&fit=crop&crop=center',
      contributors: [{ id: '10', name: '신은영' }],
    },
  ];

  // Event handlers (stubbed)

  const router = useRouter();
  const handleCityClick = (city: City) => {
    router.push(`/monthlog/city/${city.slug}`);
  };
  const handleRecordClick = (city: City) => {};
  const handleTagClick = (tag: string) => {};
  const handleRecordRecommendation = (recommendation: Recommendation) => {};

  return (
    <main className="min-h-dvh digital-garden-bg">
      {/* Header: mobile-first typography, scales on breakpoints */}
      <header className="px-4 pt-10 pb-6 text-center sm:pt-12">
        {/* Title: big, two-tone (blue gradient + gray) */}
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
          <span
            className="
        bg-gradient-to-r from-[hsl(var(--primary))] to-[color-mix(in_oklab,hsl(var(--primary))_70%,white)]
        bg-clip-text text-transparent
      "
          >
            도시별
          </span>{' '}
          <span className="text-gray-900">먼슬로그</span>
        </h1>

        {/* Subtitle: elegant gray with subtle blue accent */}
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600">
          <span className="px-2 py-1 rounded-md bg-[color-mix(in_oklab,hsl(var(--primary))_10%,transparent)] text-gray-700">
            함께 만드는
          </span>{' '}
          한달살기 아카이브
        </p>
      </header>

      {/* Container scales padding by breakpoint. Max width keeps lines readable. */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-0">
        {/* EXP/Level section: normal on mobile, sticky from md+ */}
        <section className="mb-6 sm:mb-8">
          <ExpLevelCard
            className="md:sticky md:top-4"
            level={15}
            levelName="여유로운 도시 유랑자"
            subtitle="현재 칭호"
            currentExp={2340}
            maxExp={3000}
          />
        </section>

        {/* Cities Grid: 1 → 2 → 3 columns. Gaps scale with breakpoint. */}
        <section
          className="motion-safe:animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div
            className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2 sm:gap-5
              lg:grid-cols-3 lg:gap-6
            "
          >
            {MOCK_CITIES.map(city => (
              <CityCard
                key={city.id}
                {...city}
                className="h-64 sm:h-72"
                onClick={() => handleCityClick(city)}
                onRecord={() => handleRecordClick(city)}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        </section>

        {/* Spacer to avoid sticky overlap with page footer */}
        <div className="h-8 sm:h-10" />
      </div>
    </main>
  );
}
