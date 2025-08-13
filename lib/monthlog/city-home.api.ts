export interface HomeCityApi {
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
}

export interface HomeStatsApi {
  pioneered_cities: number;
  pioneers: number;
  today_records: number;
  cumulative_archives: number;
}

export interface HomeUserInfoApi {
  level: number;
  level_title: string;
  current_exp: number;
  required_exp: number;
  progress_percentage: number;
}

export interface HomeApiResponse {
  cities: HomeCityApi[];
  stats: HomeStatsApi;
  user_info: HomeUserInfoApi;
}

export async function fetchHomeCities(): Promise<HomeApiResponse> {
  const res = await fetch("/api/v1/explorer/home/cms", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch home cities: ${res.status}`);
  }
  return res.json();
}
