export interface City {
  city_id: number;
  city_name: string;
  country_name: string;
  city_profile_url: string;
  monthly_cost_range_min: number;
  monthly_cost_range_max: number;
  internet_speed_mbps: number;
  air_quality: string;
  noise_level: string;
  contributors: number;
  slug: string;
  // New fields for data collection state
  // contributors: any[];
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

export interface HomeStats {
  pioneeredCities: number;
  pioneers: number;
  todayRecords: number;
  cumulativeArchives: number;
}
