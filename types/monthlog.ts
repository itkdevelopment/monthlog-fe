export interface City {
  id?: string;
  city: string;
  country: string;
  image: string;
  tags?: string[];
  costRange?: string;
  livingCost?: number;
  safety?: number;
  culture?: number;
  likes?: number;
  // New fields for data collection state
  contributors: any[]
}

export interface Recommendation {
  id?: string;
  city?: string;
  country?: string;
  reason?: string;
  isActive?: boolean;
  isEmpty?: boolean;
}

export interface UserProfile {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  currentExp: number;
  maxExp: number;
  percentage: number;
  avatar?: string;
}

export interface StatItem {
  value: string | number;
  label: string;
}

export interface MonthlogStats {
  totalCities: number;
  totalUsers: number;
  todayRecords: number;
  totalArchives: number;
}