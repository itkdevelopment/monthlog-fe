// Accommodation Types
export enum AccommodationTypeEnum {
  APARTMENT = 58,
  DETACHED_HOUSE = 59,
  HOTEL = 60,
  GUESTHOUSE = 61,
  AIRBNB = 62,
}

export const accommodationTypeOptions = [
  { value: AccommodationTypeEnum.APARTMENT, label: '아파트' },
  { value: AccommodationTypeEnum.DETACHED_HOUSE, label: '단독주택' },
  { value: AccommodationTypeEnum.HOTEL, label: '호텔' },
  { value: AccommodationTypeEnum.GUESTHOUSE, label: '게스트하우스' },
  { value: AccommodationTypeEnum.AIRBNB, label: '에어비앤비' },
] as const;

// Room Layout Types
export enum RoomLayoutEnum {
  ONE_ROOM = 63,
  TWO_ROOMS = 64,
  THREE_ROOMS = 65,
  STUDIO = 66,
}

export const roomLayoutOptions = [
  { value: RoomLayoutEnum.ONE_ROOM, label: '원룸' },
  { value: RoomLayoutEnum.TWO_ROOMS, label: '투룸' },
  { value: RoomLayoutEnum.THREE_ROOMS, label: '쓰리룸' },
  { value: RoomLayoutEnum.STUDIO, label: '스튜디오' },
] as const;

// Amenity Types
export enum AmenityTypeEnum {
  POOL = 67,
  KITCHEN = 68,
  WASHER = 69,
  PARKING = 70,
  SEA_VIEW = 71,
  MOUNTAIN_VIEW = 72,
  DOWNTOWN = 73,
}

export const amenityOptions = [
  { value: AmenityTypeEnum.POOL, label: '수영장' },
  { value: AmenityTypeEnum.KITCHEN, label: '주방있음' },
  { value: AmenityTypeEnum.WASHER, label: '세탁기' },
  { value: AmenityTypeEnum.PARKING, label: '주차가능' },
  { value: AmenityTypeEnum.SEA_VIEW, label: '바다뷰' },
  { value: AmenityTypeEnum.MOUNTAIN_VIEW, label: '산뷰' },
  { value: AmenityTypeEnum.DOWNTOWN, label: '도심위치' },
] as const;

// Transportation Types
export enum TransportTypeEnum {
  PUBLIC_TRANSPORT = 74,
  CAR_RENTAL = 75,
  TAXI = 76,
  WALK_BIKE = 77,
  OTHER = 78,
}

export const transportOptions = [
  { value: TransportTypeEnum.PUBLIC_TRANSPORT, label: '대중교통' },
  { value: TransportTypeEnum.CAR_RENTAL, label: '렌터카' },
  { value: TransportTypeEnum.TAXI, label: '택시' },
  { value: TransportTypeEnum.WALK_BIKE, label: '도보/자전거' },
  { value: TransportTypeEnum.OTHER, label: '기타' },
] as const;

// Communication Methods
export enum CommunicationMethodEnum {
  LOCAL_SIM = 79,
  AIRPORT_SIM = 80,
  KOREA_SIM = 81,
  ROAMING = 82,
  E_SIM = 83,
  KOREA_CARRIER = 84,
}

export const communicationMethodOptions = [
  { value: CommunicationMethodEnum.LOCAL_SIM, label: '현지유심구매' },
  { value: CommunicationMethodEnum.AIRPORT_SIM, label: '공항유심구매' },
  { value: CommunicationMethodEnum.KOREA_SIM, label: '한국에서유심구매' },
  { value: CommunicationMethodEnum.ROAMING, label: '로밍' },
  { value: CommunicationMethodEnum.E_SIM, label: '이심' },
  { value: CommunicationMethodEnum.KOREA_CARRIER, label: '국내통신사' },
] as const;

// Communication Providers
export enum CommunicationProviderEnum {
  SKT = 85,
  KT = 86,
  LG = 87,
  AIRALO = 88,
  UBIGI = 89,
  HOLAFLY = 90,
  BUDGET_MVNO = 91,
}

export const communicationProviderOptions = [
  { value: CommunicationProviderEnum.SKT, label: 'SKT' },
  { value: CommunicationProviderEnum.KT, label: 'KT' },
  { value: CommunicationProviderEnum.LG, label: 'LG U+' },
  { value: CommunicationProviderEnum.AIRALO, label: 'Airalo' },
  { value: CommunicationProviderEnum.UBIGI, label: 'Ubigi' },
  { value: CommunicationProviderEnum.HOLAFLY, label: 'Holafly' },
  { value: CommunicationProviderEnum.BUDGET_MVNO, label: '알뜰폰' },
] as const;

// Communication Plans
export enum CommunicationPlanEnum {
  '7D_3GB' = 92,
  '7D_5GB' = 93,
  '7D_9GB' = 94,
  '15D_5GB' = 95,
  '15D_10GB' = 96,
  '15D_15GB' = 97,
  '30D_20GB' = 98,
  '7D_UNLIMITED' = 99,
  '15D_UNLIMITED' = 100,
  '30D_UNLIMITED' = 101,
}

export const communicationPlanOptions = [
  { value: CommunicationPlanEnum['7D_3GB'], label: '7일 3GB' },
  { value: CommunicationPlanEnum['7D_5GB'], label: '7일 5GB' },
  { value: CommunicationPlanEnum['7D_9GB'], label: '7일 9GB' },
  { value: CommunicationPlanEnum['15D_5GB'], label: '15일 5GB' },
  { value: CommunicationPlanEnum['15D_10GB'], label: '15일 10GB' },
  { value: CommunicationPlanEnum['15D_15GB'], label: '15일 15GB' },
  { value: CommunicationPlanEnum['30D_20GB'], label: '30일 20GB' },
  { value: CommunicationPlanEnum['7D_UNLIMITED'], label: '7일 무제한' },
  { value: CommunicationPlanEnum['15D_UNLIMITED'], label: '15일 무제한' },
  { value: CommunicationPlanEnum['30D_UNLIMITED'], label: '30일 무제한' },
] as const;

// Meal Styles
export enum MealStyleEnum {
  COOK = 102,
  EAT_OUT = 103,
}

export const mealStyleOptions = [
  { value: MealStyleEnum.COOK, label: '요리' },
  { value: MealStyleEnum.EAT_OUT, label: '외식' },
] as const;

// Activity Companions
export enum ActivityCompanionEnum {
  ALONE = 104,
  WITH_KIDS = 105,
  WITH_PARTNER = 106,
  WITH_FRIENDS = 107,
  WITH_FAMILY = 108,
}

export const activityCompanionOptions = [
  { value: ActivityCompanionEnum.ALONE, label: '혼자서' },
  { value: ActivityCompanionEnum.WITH_KIDS, label: '아이랑' },
  { value: ActivityCompanionEnum.WITH_PARTNER, label: '연인과' },
  { value: ActivityCompanionEnum.WITH_FRIENDS, label: '친구와' },
  { value: ActivityCompanionEnum.WITH_FAMILY, label: '가족과' },
] as const;

// Activity Categories
export enum ActivityCategoryEnum {
  MUSEUM_ART = 109,
  SURF_HIKE = 110,
  COOKING_CLASS = 111,
  CAFE_TOUR = 112,
  PERFORMANCE = 113,
  FREE_EXPERIENCE = 114,
}

export const activityCategoryOptions = [
  { value: ActivityCategoryEnum.MUSEUM_ART, label: '박물관/미술관' },
  { value: ActivityCategoryEnum.SURF_HIKE, label: '서핑/하이킹' },
  { value: ActivityCategoryEnum.COOKING_CLASS, label: '쿠킹클래스' },
  { value: ActivityCategoryEnum.CAFE_TOUR, label: '카페투어' },
  { value: ActivityCategoryEnum.PERFORMANCE, label: '공연관람' },
  { value: ActivityCategoryEnum.FREE_EXPERIENCE, label: '무료체험' },
] as const;

// Common Items
export enum CommonItemEnum {
  COFFEE = 115,
  BEER = 116,
  WATER = 117,
  RAMEN = 118,
  KIMBAP = 119,
  CHICKEN = 120,
  PIZZA = 121,
  BUS_FARE = 122,
  TAXI_BASE_FARE = 123,
}

export const commonItemOptions = [
  { value: CommonItemEnum.COFFEE, label: '커피' },
  { value: CommonItemEnum.BEER, label: '맥주' },
  { value: CommonItemEnum.WATER, label: '생수' },
  { value: CommonItemEnum.RAMEN, label: '라면' },
  { value: CommonItemEnum.KIMBAP, label: '김밥' },
  { value: CommonItemEnum.CHICKEN, label: '치킨' },
  { value: CommonItemEnum.PIZZA, label: '피자' },
  { value: CommonItemEnum.BUS_FARE, label: '버스요금' },
  { value: CommonItemEnum.TAXI_BASE_FARE, label: '택시기본요금' },
] as const;

// Group categories for organizing related enums
export const TAG_GROUPS = {
  COST_ACCOM: {
    name: '숙소 타입',
    enum: AccommodationTypeEnum,
    options: accommodationTypeOptions,
  },
  COST_ROOM_LAYOUT: {
    name: '방 구조',
    enum: RoomLayoutEnum,
    options: roomLayoutOptions,
  },
  COST_AMENITY: {
    name: '숙소 편의시설',
    enum: AmenityTypeEnum,
    options: amenityOptions,
  },
  COST_TRANSPORT: {
    name: '교통수단',
    enum: TransportTypeEnum,
    options: transportOptions,
  },
  COST_COMM_METHOD: {
    name: '통신 방법',
    enum: CommunicationMethodEnum,
    options: communicationMethodOptions,
  },
  COST_COMM_PROVIDER: {
    name: '통신 업체',
    enum: CommunicationProviderEnum,
    options: communicationProviderOptions,
  },
  COST_COMM_PLAN: {
    name: '통신 요금제',
    enum: CommunicationPlanEnum,
    options: communicationPlanOptions,
  },
  COST_MEAL_STYLE: {
    name: '식사 스타일',
    enum: MealStyleEnum,
    options: mealStyleOptions,
  },
  COST_ACTIVITY_COMPANION: {
    name: '활동 동반자',
    enum: ActivityCompanionEnum,
    options: activityCompanionOptions,
  },
  COST_ACTIVITY_CATEGORY: {
    name: '활동 카테고리',
    enum: ActivityCategoryEnum,
    options: activityCategoryOptions,
  },
  COST_ITEM: {
    name: '일반 아이템',
    enum: CommonItemEnum,
    options: commonItemOptions,
  },
} as const;