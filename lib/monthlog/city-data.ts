// lib/monthlog/city-data.ts
import { CityDetailData } from '@/types/monthlog/city-detail';

const MOCK_CITY_DATA: Record<string, CityDetailData> = {
  jeju: {
    id: '1',
    slug: 'jeju',
    name: '제주도',
    country: '한국',
    description: '자연과 함께하는 완벽한 워케이션 환경',
    heroImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-06-30%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.29.52-mzrVWJqK0dtGnXiCzaDV7y817YJvyj.png',
    tags: ['조용한 힐링', '자연 친화적', '카페 천국', '가족과 함께', '워케이션'],
    suitabilityScore: 8,
    totalContributors: 47,
    totalContributions: 156,
    reliabilityScore: 89,
    lastUpdated: '2024-01-15',
    compatibilityData: {
      soloHealing: 9,
      digitalNomad: 8,
      withKids: 7,
      budgetTravel: 6,
      specialExperience: 8
    },
    popularTags: [
      { name: '자연친화적', count: 245 },
      { name: '힐링스팟', count: 189 },
      { name: '카페천국', count: 167 },
      { name: '안전한환경', count: 156 },
      { name: '교통편리', count: 134 },
      { name: '가성비좋음', count: 123 }
    ],
    popularComments: [
      '자연과 도시가 조화롭게 어우러진 완벽한 여행지예요',
      '힐링하기에 최고의 장소, 마음의 평화를 찾을 수 있어요',
      '다양한 액티비티와 맛집이 가득한 매력적인 도시입니다'
    ],
    costData: {
      satisfaction: 7,
      totalBudget: '200만원',
      monthlyRent: '130만원',
      livingCost: '45만원',
      breakdown: {
        rent: '130만원, 발품가능, 추천숙소 3곳',
        utilities: '16만원, 전기요금 15,000원',
        transport: '12만원, 택시 선호',
        communication: '5만원, 현지유심구매 선호',
        food: '60만원, 외식 1회당 32,000원',
        activities: '25만원, 카페투어 인기, 추천 9곳',
        localPrices: '스타벅스 아메리카노 4,500원'
      }
    },
    digitalData: {
      satisfaction: 8,
      avgInternetSpeed: '100Mbps',
      coworkingSpaces: 12,
      powerStability: '매우안정',
      breakdown: {
        internetSpeed: '100Mbps, 9/10',
        powerStability: '정전 거의 없음, 9/10',
        wifiAccess: '카페에서 매우 용이, 8/10',
        coworkingSpaces: '추천 12곳, 9/10',
        laptopFriendlyCafes: '추천 3곳, 6/10',
        shortTermMembership: '한달플랜 35만원, 8/10'
      }
    },
    safetyData: {
      safetyLevel: 9,
      medicalLevel: 7,
      waterSafety: '음용 가능',
      breakdown: {
        crimeTypes: '소매치기 거의 없음',
        emergencyContacts: '119 (응급실), 112 (경찰)',
        embassyContact: '주제주 한국영사관 064-722-8062'
      }
    },
    housingData: {
      satisfaction: 7.5,
      noiseLevel: '보통',
      airQuality: '좋음',
      laundryFacilities: '3곳+',
      breakdown: {
        noiseLevel: '보통',
        laundryInfo: '코인세탁소 3곳',
        airQuality: '좋음',
        localLifeInfo: '미입력'
      }
    },
    convenienceData: {
      satisfaction: 8.2,
      martAccess: '도보 5분 내',
      deliveryRestaurants: 4,
      facilities24h: 12,
      breakdown: {
        deliveryConvenience: '배달의민족, 9/10',
        deliveryRecommendations: 'OO치킨 / 추천 4곳',
        martAccess: '도보 5분 내, 24시간',
        bankingInfo: '신한은행 ATM (수수료 무료)',
        pharmacyAccess: '도보 3분 내, 24시간 약국 있음',
        simCardInfo: '공항 내 KT 매장 / 8,000원',
        wasteDisposal: '#분리수거 간편',
        facilities24h: '편의점 3곳, 카페 2곳',
        lifeTips: '"분리수거는 안해도..." / 찐꿀팁 8개'
      }
    },
    transportData: {
      publicTransportScore: 85,
      airportToCity: '평균 50분',
      touristAccess: '가까움',
      mainTransport: '코택우',
      breakdown: {
        airportTransport: '택시 약 1시간, 4만원',
        mainTransportMethods: '지하철, 버스',
        recommendedApps: 'Uber, 카카오 T',
        touristSiteAccess: '대중교통 30분 내',
        flightCosts: '평균 왕복 85만원'
      }
    },
    communityData: {
      travelerFriendliness: 8.5,
      englishCommunication: '원활함',
      localAtmosphere: '정이 많아요',
      learningClasses: '3곳+',
      breakdown: {
        neighborhoodVibe: '매우 따뜻함',
        englishFluency: '대부분 가능',
        communityActivity: '활발함',
        learningOpportunities: '요가, 쿠킹클래스',
        culturalExperiences: '전통공예, 축제',
        kidsActivities: '키즈카페, 놀이터'
      }
    },
    basicInfo: {
      language: '한국어',
      visa: '무비자 (국내)',
      currency: '원화 (KRW)',
      timezone: 'UTC+9 (시차 없음)',
      plugType: '220V / A, C타입',
      religion: '불교, 기독교 등'
    },
    seasonData: {
      monthlyData: [
        { month: '1월', recommendations: 8, avgTemperature: 3 },
        { month: '2월', recommendations: 12, avgTemperature: 5 },
        { month: '3월', recommendations: 18, avgTemperature: 9 },
        { month: '4월', recommendations: 35, avgTemperature: 15 },
        { month: '5월', recommendations: 32, avgTemperature: 20 },
        { month: '6월', recommendations: 25, avgTemperature: 25 },
        { month: '7월', recommendations: 15, avgTemperature: 28 },
        { month: '8월', recommendations: 12, avgTemperature: 29 },
        { month: '9월', recommendations: 22, avgTemperature: 24 },
        { month: '10월', recommendations: 28, avgTemperature: 18 },
        { month: '11월', recommendations: 20, avgTemperature: 12 },
        { month: '12월', recommendations: 10, avgTemperature: 6 }
      ],
      recommendations: [
        { month: '4월', reason: '벚꽃 시즌이라 완벽한 날씨 속에서 도시 전체가 아름다워요', count: 23 },
        { month: '5월', reason: '신록의 계절로 관광객이 적어 조용하고 평화로워요', count: 19 },
        { month: '10월', reason: '단풍과 선선한 날씨로 야외 활동하기 최적이에요', count: 15 }
      ],
      warnings: [
        { month: '11월', reason: '비가 자주 와서 야외 활동이 제한되고 날씨가 변덕스러워요', count: 18 },
        { month: '1월', reason: '추위가 심하고 바람이 강해서 관광하기 어려워요', count: 12 },
        { month: '8월', reason: '너무 덥고 습해서 야외 활동이 힘들어요', count: 10 }
      ]
    },
    atmospherePhotos: [
      {
        id: '1',
        src: 'https://v0-b5-six.vercel.app/images/jeju-coast-1.avif',
        alt: '성산일출봉에서 본 황금빛 일몰',
        isFeatured: true
      },
      {
        id: '2',
        src: 'https://v0-b5-six.vercel.app/images/jeju-hills-2.avif',
        alt: '제주 서쪽 바다뷰 카페'
      },
      {
        id: '3',
        src: 'https://v0-b5-six.vercel.app/images/jeju-beach-3.avif',
        alt: '한라산 등반로의 신록',
        isFeatured: true
      },
      {
        id: '4',
        src: 'https://v0-b5-six.vercel.app/images/jeju-mountain-4.avif',
        alt: '제주 구시가지 골목길'
      },
      {
        id: '5',
        src: 'https://v0-b5-six.vercel.app/images/jeju-coastline-5.avif',
        alt: '에메랄드빛 제주 바다'
      },
      {
        id: '6',
        src: 'https://v0-b5-six.vercel.app/images/jeju-sunset-6.avif',
        alt: '제주 전통시장의 활기'
      }
    ],
    totalPhotos: 8
  },

  busan: {
    id: '3',
    slug: 'busan',
    name: '부산',
    country: '한국',
    description: '해안 도시의 매력과 도시적 편의성의 조화',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop&crop=center',
    tags: ['해변 도시', '자연 가까운 뚝배기', '맛집 천국', '교통 편리'],
    suitabilityScore: 7.5,
    totalContributors: 32,
    totalContributions: 89,
    reliabilityScore: 85,
    lastUpdated: '2024-01-10',
    compatibilityData: {
      soloHealing: 8,
      digitalNomad: 7,
      withKids: 8,
      budgetTravel: 8,
      specialExperience: 7
    },
    popularTags: [
      { name: '해변접근', count: 198 },
      { name: '맛집투어', count: 176 },
      { name: '교통편리', count: 145 },
      { name: '문화체험', count: 123 },
      { name: '가성비좋음', count: 112 }
    ],
    popularComments: [
      '바다와 도시가 어우러진 완벽한 조합이에요',
      '먹거리가 정말 다양하고 맛있어요',
      'KTX로 접근성이 좋고 대중교통도 편리해요'
    ],
    costData: {
      satisfaction: 8,
      totalBudget: '180만원',
      monthlyRent: '110만원',
      livingCost: '40만원',
      breakdown: {
        rent: '110만원, 해운대/서면 추천',
        utilities: '14만원, 전기요금 12,000원',
        transport: '8만원, 지하철/버스 편리',
        communication: '4만원, 통신비 저렴',
        food: '50만원, 해산물 맛집 다수',
        activities: '20만원, 해변/문화시설',
        localPrices: '커피 4,000원, 밀면 8,000원'
      }
    },
    digitalData: {
      satisfaction: 7.5,
      avgInternetSpeed: '95Mbps',
      coworkingSpaces: 8,
      powerStability: '안정',
      breakdown: {
        internetSpeed: '95Mbps, 8/10',
        powerStability: '안정적, 8/10',
        wifiAccess: '대부분 카페 제공, 8/10',
        coworkingSpaces: '추천 8곳, 7/10',
        laptopFriendlyCafes: '해변가 카페 다수, 8/10',
        shortTermMembership: '한달플랜 30만원, 7/10'
      }
    },
    safetyData: {
      safetyLevel: 8,
      medicalLevel: 8,
      waterSafety: '음용 가능',
      breakdown: {
        crimeTypes: '관광지 소매치기 주의',
        emergencyContacts: '119 (응급실), 112 (경찰)',
        embassyContact: '부산총영사관 051-123-4567'
      }
    },
    housingData: {
      satisfaction: 7.8,
      noiseLevel: '도심지역 약간 시끄러움',
      airQuality: '보통',
      laundryFacilities: '5곳+',
      breakdown: {
        noiseLevel: '해변지역 조용, 도심 보통',
        laundryInfo: '코인세탁소 충분',
        airQuality: '바다 바람으로 쾌적',
        localLifeInfo: '해변 산책로 훌륭'
      }
    },
    convenienceData: {
      satisfaction: 8.5,
      martAccess: '도보 3분 내',
      deliveryRestaurants: 6,
      facilities24h: 15,
      breakdown: {
        deliveryConvenience: '배달 매우 편리, 9/10',
        deliveryRecommendations: '돼지국밥, 밀면 전문점',
        martAccess: '대형마트 접근 용이',
        bankingInfo: '시중은행 ATM 다수',
        pharmacyAccess: '24시간 약국 3곳',
        simCardInfo: 'KTX역 내 통신사 매장',
        wasteDisposal: '분리수거 체계적',
        facilities24h: '편의점 15곳, 찜질방 3곳',
        lifeTips: '해운대/광안리 추천 / 꿀팁 12개'
      }
    },
    transportData: {
      publicTransportScore: 90,
      airportToCity: '지하철 40분',
      touristAccess: '매우 좋음',
      mainTransport: '지하철/버스',
      breakdown: {
        airportTransport: '지하철 직통 40분',
        mainTransportMethods: '지하철, 버스, 택시',
        recommendedApps: '부산교통공사, 카카오T',
        touristSiteAccess: '대중교통 20분 내',
        flightCosts: '평균 왕복 45만원'
      }
    },
    communityData: {
      travelerFriendliness: 8.0,
      englishCommunication: '보통',
      localAtmosphere: '활기참',
      learningClasses: '5곳+',
      breakdown: {
        neighborhoodVibe: '친근하고 활기참',
        englishFluency: '관광지에서 가능',
        communityActivity: '매우 활발',
        learningOpportunities: '서핑, 요가, 쿠킹클래스',
        culturalExperiences: '전통시장, 영화제',
        kidsActivities: '아쿠아리움, 해변놀이'
      }
    },
    basicInfo: {
      language: '한국어',
      visa: '무비자 (국내)',
      currency: '원화 (KRW)',
      timezone: 'UTC+9 (시차 없음)',
      plugType: '220V / A, C타입',
      religion: '불교, 기독교 등'
    },
    seasonData: {
      monthlyData: [
        { month: '1월', recommendations: 6, avgTemperature: 5 },
        { month: '2월', recommendations: 8, avgTemperature: 7 },
        { month: '3월', recommendations: 15, avgTemperature: 12 },
        { month: '4월', recommendations: 28, avgTemperature: 18 },
        { month: '5월', recommendations: 30, avgTemperature: 23 },
        { month: '6월', recommendations: 25, avgTemperature: 26 },
        { month: '7월', recommendations: 18, avgTemperature: 29 },
        { month: '8월', recommendations: 15, avgTemperature: 30 },
        { month: '9월', recommendations: 26, avgTemperature: 26 },
        { month: '10월', recommendations: 32, avgTemperature: 20 },
        { month: '11월', recommendations: 22, avgTemperature: 14 },
        { month: '12월', recommendations: 8, avgTemperature: 8 }
      ],
      recommendations: [
        { month: '10월', reason: '선선한 날씨와 아름다운 단풍으로 해변 산책이 최고예요', count: 20 },
        { month: '5월', reason: '따뜻한 날씨에 바다 활동과 야외 활동이 완벽해요', count: 18 },
        { month: '4월', reason: '벚꽃과 함께하는 해안 드라이브가 환상적이에요', count: 15 }
      ],
      warnings: [
        { month: '8월', reason: '무더위와 습도가 높아 야외 활동이 힘들어요', count: 16 },
        { month: '1월', reason: '바닷바람이 차갑고 궂은 날씨가 많아요', count: 10 },
        { month: '7월', reason: '장마철로 비가 자주 와서 해변 활동이 제한돼요', count: 8 }
      ]
    },
    atmospherePhotos: [
      {
        id: '1',
        src: 'https://v0-b5-six.vercel.app/images/busan-beach-1.avif',
        alt: '광안리 해변의 야경',
        isFeatured: true
      },
      {
        id: '2',
        src: 'https://v0-b5-six.vercel.app/images/busan-market-2.avif',
        alt: '자갈치시장의 활기'
      },
      {
        id: '3',
        src: 'https://v0-b5-six.vercel.app/images/busan-temple-3.avif',
        alt: '해동용궁사의 신비로운 분위기',
        isFeatured: true
      },
      {
        id: '4',
        src: 'https://v0-b5-six.vercel.app/images/busan-village-4.avif',
        alt: '감천문화마을의 알록달록한 집들'
      }
    ],
    totalPhotos: 6
  }
};

export function getCityDetailData(cityId: string): CityDetailData | null {
  console.log("🚀 ~ getCityDetailData ~ cityId:", cityId)
  console.log("🚀 ~ getCityDetailData ~ MOCK_CITY_DATA[cityId]:", MOCK_CITY_DATA[cityId])
  return MOCK_CITY_DATA[cityId] || null;
}

export function getAllCities(): CityDetailData[] {
  return Object.values(MOCK_CITY_DATA);
}