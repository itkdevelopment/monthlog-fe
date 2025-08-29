// types/monthlog/city-detail.ts

export interface CityDetailData {
  basic: BasicInfo;
  contribution: ContributionInfo;
  detail: DetailInfo;
  cost: CostData;
  digital: DigitalData;
  safety: SafetyData;
  residential: HousingData;
  convenience: ConvenienceData;
  transportation: TransportData;
  community: CommunityData;
  seasonData: MonthlySeasonData[];
  seasonComments: SeasonComment[];
  recentFeeds: RecentFeed[];
  userProfiles: UserProfile[];
  sectionContributions: SectionContributions;
  reliability: number;
  suitability: number;
}

export interface BasicInfo {
  id: number;
  cityName: string;
  cityDesc: string;
  cityCode: string;
  countryCode: string;
  cityProfileUrl: string;
  status: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContributionInfo {
  totalContributors: number;
  totalContributions: number;
}

export interface DetailInfo {
  id: number;
  primaryLanguage: string;
  visaRequirement: string;
  currency: string;
  timezone: string;
  electricalVoltage: string;
  electricalPlugType: string;
  mainReligions: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface CostData {
  id: number;
  userId: number;
  costSatisfactionScore: number;
  totalEstimatedCost: number;
  monthlyRent: number;
  livingExpenses: number;
  housingDeposit: number;
  utilitiesCost: number;
  electricityCost: number;
  transportationCost: number;
  transportationPreference: string;
  communicationCost: number;
  communicationPreference: string;
  foodCost: number;
  avgMealCost: number;
  entertainmentCost: number;
  popularActivities: string;
  recommendedSpotsCount: number;
  shoppingCost: number | null;
  referencePriceItem: string;
  referencePrice: number;
  monthlyCostRangeMin: number;
  monthlyCostRangeMax: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface DigitalData {
  id: number;
  userId: number;
  digitalSatisfactionScore: number;
  internetSpeedMbps: number;
  internetSpeedScore: number;
  coworkingSpacesCount: number;
  coworkingSpacesScore: number;
  powerStability: string;
  powerStabilityScore: number;
  freeWifiAccess: string;
  freeWifiScore: number;
  laptopFriendlyCafesCount: number;
  laptopFriendlyCafesScore: number;
  monthlyMembershipCost: number;
  monthlyMembershipScore: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface SafetyData {
  id: number;
  userId: number;
  safetySatisfactionScore: number;
  publicSafetyScore: number;
  medicalEnvironmentScore: number;
  tapWaterSafety: string;
  soloFemaleTravelSafety: string;
  emergencyNumberGeneral: string;
  emergencyNumberPolice: string;
  embassyContact: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface HousingData {
  id: number;
  userId: number;
  residentialSatisfactionScore: number;
  noiseLevel: string;
  airQuality: string;
  laundryFacilities: string;
  laundryFacilitiesCount: number;
  internetQuality: string;
  localNecessities: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConvenienceData {
  id: number;
  userId: number;
  convenienceSatisfactionScore: number;
  deliveryConvenienceScore: number;
  deliveryPickupLocations: number;
  deliveryPickupScore: string;
  martAccessibilityWalkingTime: string;
  mart24hourAvailability: string;
  bankingAtmAccess: string;
  bankingFees: string;
  pharmacyWalkingTime: string;
  pharmacy24hour: string;
  simPurchaseLocation: string;
  simPurchaseCost: number;
  wasteDisposalMethod: string;
  convenienceStores24h: number;
  cafes24h: number;
  dailyLifeTips: string;
  shoppingTipsCount: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface TransportData {
  id: number;
  userId: number;
  transportationConvenienceScore: number;
  publicTransportConvenienceScore: number;
  airportToCityAvgTime: string;
  airportToCityRoute: string;
  touristSiteAccessibility: string;
  mainTransportMethod: string;
  airportTransportTaxiTime: string;
  airportTransportTaxiCost: number;
  recommendedTransportSubway: string;
  recommendedTransportBus: string;
  ridehailApps: string;
  touristAttractionDistance: string;
  airportAccessCostAvg: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityData {
  id: number;
  userId: number;
  communityFriendlinessScore: number;
  localAcceptance: string;
  englishCommunicationLevel: string;
  communityActivities: string;
  learningClasses: string;
  culturalActivities: string;
  languageEducation: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlySeasonData {
  month: number;
  recommendedCount: number;
  avgTemperature: number;
}

export interface SeasonComment {
  id: number;
  userId: number;
  commentType: "recommend" | "warning";
  month: number;
  commentText: string;
  voteCount: number;
  createdAt: string;
}

export interface RecentFeed {
  id: number;
  userId: number;
  feedContent: string;
  recommendedCnt: number;
  images: string[];
  likesCount: number;
  createdAt: string;
}

export interface UserProfile {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  companionType: number;
  comment: string;
  profileTags: ProfileTag[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileTag {
  id: number;
  profileTagType: number;
  profileTagCode: string;
  profileTagText: string;
}

export interface SectionContributions {
  basic: number;
  cost: number;
  digital: number;
  safety: number;
  residential: number;
  convenience: number;
  transportation: number;
  community: number;
  season: number;
  seasonComments: number;
  feeds: number;
}

export interface CityDetail {
  primaryLanguage?: string | null;
  visaRequirement?: string | null;
  currency?: string | null;
  timezone?: string | null;
  electricalVoltage?: string | null;
  electricalPlugType?: string | null;
  mainReligions?: string;
}

export type Month =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER";

export type CommentType = "WEATHER" | "LIFESTYLE";

export interface SeasonComment {
  commentTypeSeason: CommentType;
  monthTypeSeason: Month;
  commentText: string;
}

export interface CityContributionPayload {
  cityDetail?: CityDetail;
  seasonComment: SeasonComment | null;
  cityCost: {
    totalCost?: {
      startDate?: string;
      endDate?: string;
      totalCost?: number;
    };
    monthlyRent?: {
      monthlyRent?: number;
      month: Month;
      numberOfPeople?: number;
      walkable?: boolean;
      accommodationType?: { id?: number; name?: string };
      roomCount?: { id?: number; name?: string };
      accommodationFeatures?: { id?: number; name?: string }[];
      recommendedAccommodations?: {
        id?: number;
        name: string;
        oneLineComment?: string;
        url?: string;
      };
    };
    foodCost?: {
      avgMonthlyCost?: number;
      eatingStyles?: { id?: number; name?: string }[];
      foodItemPrices?: {
        foodItem: { id?: number; name?: string; type?: "INGREDIENT" | "MENU" };
        price: number;
      }[];
    };
    communicationCost?: {
      communicationMethod: { id?: number; name: string };
      telecomAgency?: { id?: number; name?: string };
      communicationPlan?: { id?: number; name?: string };
      simPurchaseCost?: number;
      avgMonthlyCost?: number;
    };
    transportationExpenses?: {
      transportationExpenses: {
        transportation: { id?: number; name: string };
        monthlyCost: number;
      }[];
    };
    utilityBills?: {
      electricityBill?: number;
      waterBill?: number;
      gasBill?: number;
      etc?: number;
    };
    initialSettlement?: {
      securityFee?: number;
      brokerageFee?: number;
      initialSupplyItems?: { id?: number; name?: string; price?: number }[];
    };
    leisureActivityCost?: {
      avgMonthlyCost?: number;
      leisureActivityDetails?: {
        leisureActivity: { id?: number; name: string };
        price?: number;
        url?: string;
        companions?: { id?: number; name?: string }[];
        categories?: { id?: number; name?: string }[];
      }[];
    };
    localPrice?: {
      price?: number;
      localItem: { id?: number; name: string };
    };
  } | null;
}

export interface CityDetailFormData {
  primaryLanguage: string | null;
  visaRequirement: string | null;
  currency: string | null;
  timezone: string | null;
  electricalVoltage: string | null;
  electricalPlugType: string | null;
  mainReligions: string| null;

  seasonComment: SeasonComment | null;

  cityCost: {
    totalCost?: {
      startDate?: string;
      endDate?: string;
      totalCost?: number;
    };
    monthlyRent?: {
      monthlyRent?: number;
      month: Month;
      numberOfPeople?: number;
      walkable?: boolean;
      accommodationType?: { id?: number; name?: string };
      roomCount?: { id?: number; name?: string };
      accommodationFeatures?: { id?: number; name?: string }[];
      recommendedAccommodations?: {
        id?: number;
        name: string;
        oneLineComment?: string;
        url?: string;
      };
    };
    foodCost?: {
      avgMonthlyCost?: number;
      eatingStyles?: { id?: number; name?: string }[];
      foodItemPrices?: {
        foodItem: { id?: number; name?: string; type?: "INGREDIENT" | "MENU" };
        price: number;
      }[];
    };
    communicationCost?: {
      communicationMethod: { id?: number; name: string };
      telecomAgency?: { id?: number; name?: string };
      communicationPlan?: { id?: number; name?: string };
      simPurchaseCost?: number;
      avgMonthlyCost?: number;
    };
    transportationExpenses?: {
      transportationExpenses: {
        transportation: { id?: number; name: string };
        monthlyCost: number;
      }[];
    };
    utilityBills?: {
      electricityBill?: number;
      waterBill?: number;
      gasBill?: number;
      etc?: number;
    };
    initialSettlement?: {
      securityFee?: number;
      brokerageFee?: number;
      initialSupplyItems?: { id?: number; name?: string; price?: number }[];
    };
    leisureActivityCost?: {
      avgMonthlyCost?: number;
      leisureActivityDetails?: {
        leisureActivity: { id?: number; name: string };
        price?: number;
        url?: string;
        companions?: { id?: number; name?: string }[];
        categories?: { id?: number; name?: string }[];
      }[];
    };
    localPrice?: {
      price?: number;
      localItem: { id?: number; name: string };
    };
  } | null;
}
