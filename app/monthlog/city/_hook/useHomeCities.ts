import { useEffect, useState } from "react";

import { City, HomeStats, UserProfile } from "@/types/monthlog";
import { fetchHomeCities, HomeCityApi } from "@/lib/monthlog/city-home.api";

export function useHomeCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<HomeStats | null>(null);

  const listHomeCities = async () => {
    const data = await fetchHomeCities();

    const mappedCities: City[] = data.cities.map((item: HomeCityApi) => ({
      city_id: item.city_id,
      city_name: item.city_name,
      country_name: item.country_name,
      city_profile_url: item.city_profile_url,
      monthly_cost_range_min: item.monthly_cost_range_min,
      monthly_cost_range_max: item.monthly_cost_range_max,
      internet_speed_mbps: item.internet_speed_mbps,
      air_quality: item.air_quality,
      noise_level: item.noise_level,
      contributors: item.contributors,
      slug: item.slug,
    }));

    const mappedUser: UserProfile = {
      id: "me",
      level: data.user_info.level,
      title: data.user_info.level_title,
      subtitle: "현재 칭호",
      currentExp: data.user_info.current_exp,
      maxExp: data.user_info.required_exp,
      percentage: data.user_info.progress_percentage,
    };
    const mappedStats: HomeStats = {
      pioneeredCities: data.stats.pioneered_cities,
      pioneers: data.stats.pioneers,
      todayRecords: data.stats.today_records,
      cumulativeArchives: data.stats.cumulative_archives,
    };

    setCities(mappedCities);
    setUserInfo(mappedUser);
    setStats(mappedStats);
  };

  useEffect(() => {
    listHomeCities();
  }, []);

  return { cities, userInfo, stats, reload: listHomeCities };
}
