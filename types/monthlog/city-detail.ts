// types/monthlog/city-detail.ts

export interface CityDetailData {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  heroImage: string;
  tags: string[];
  suitabilityScore: number;
  totalContributors: number;
  totalContributions: number;
  reliabilityScore: number;
  lastUpdated: string;
  compatibilityData: CompatibilityData;
  popularTags: PopularTag[];
  popularComments: string[];
  costData: CostData;
  digitalData: DigitalData;
  safetyData: SafetyData;
  housingData: HousingData;
  convenienceData: ConvenienceData;
  transportData: TransportData;
  communityData: CommunityData;
  basicInfo: BasicInfo;
  seasonData: SeasonData;
  atmospherePhotos: AtmospherePhoto[];
  totalPhotos: number;
}

export interface CompatibilityData {
  soloHealing: number;
  digitalNomad: number;
  withKids: number;
  budgetTravel: number;
  specialExperience: number;
}

export interface PopularTag {
  name: string;
  count: number;
}

export interface CostData {
  satisfaction: number;
  totalBudget: string;
  monthlyRent: string;
  livingCost: string;
  breakdown: {
    rent: string;
    utilities: string;
    transport: string;
    communication: string;
    food: string;
    activities: string;
    localPrices: string;
  };
}

export interface DigitalData {
  satisfaction: number;
  avgInternetSpeed: string;
  coworkingSpaces: number;
  powerStability: string;
  breakdown: {
    internetSpeed: string;
    powerStability: string;
    wifiAccess: string;
    coworkingSpaces: string;
    laptopFriendlyCafes: string;
    shortTermMembership: string;
  };
}

export interface SafetyData {
  safetyLevel: number;
  medicalLevel: number;
  waterSafety: string;
  breakdown: {
    crimeTypes: string;
    emergencyContacts: string;
    embassyContact: string;
  };
}

export interface HousingData {
  satisfaction: number;
  noiseLevel: string;
  airQuality: string;
  laundryFacilities: string;
  breakdown: {
    noiseLevel: string;
    laundryInfo: string;
    airQuality: string;
    localLifeInfo: string;
  };
}

export interface ConvenienceData {
  satisfaction: number;
  martAccess: string;
  deliveryRestaurants: number;
  facilities24h: number;
  breakdown: {
    deliveryConvenience: string;
    deliveryRecommendations: string;
    martAccess: string;
    bankingInfo: string;
    pharmacyAccess: string;
    simCardInfo: string;
    wasteDisposal: string;
    facilities24h: string;
    lifeTips: string;
  };
}

export interface TransportData {
  publicTransportScore: number;
  airportToCity: string;
  touristAccess: string;
  mainTransport: string;
  breakdown: {
    airportTransport: string;
    mainTransportMethods: string;
    recommendedApps: string;
    touristSiteAccess: string;
    flightCosts: string;
  };
}

export interface CommunityData {
  travelerFriendliness: number;
  englishCommunication: string;
  localAtmosphere: string;
  learningClasses: string;
  breakdown: {
    neighborhoodVibe: string;
    englishFluency: string;
    communityActivity: string;
    learningOpportunities: string;
    culturalExperiences: string;
    kidsActivities: string;
  };
}

export interface BasicInfo {
  language: string;
  visa: string;
  currency: string;
  timezone: string;
  plugType: string;
  religion: string;
}

export interface SeasonData {
  monthlyData: MonthlyData[];
  recommendations: SeasonRecommendation[];
  warnings: SeasonWarning[];
}

export interface MonthlyData {
  month: string;
  recommendations: number;
  avgTemperature: number;
}

export interface SeasonRecommendation {
  month: string;
  reason: string;
  count: number;
}

export interface SeasonWarning {
  month: string;
  reason: string;
  count: number;
}

export interface AtmospherePhoto {
  id: string;
  src: string;
  alt: string;
  isFeatured?: boolean;
}