import { fetchCityDetail } from "@/lib/monthlog/city-data";
import { useState, useEffect, useCallback } from "react";
import { CityDetailData } from "@/types/monthlog/city-detail";
import { fetchHomeCities } from "@/lib/monthlog/city-home.api";

export function useCityDetail(slug: string) {
  const [data, setData] = useState<CityDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getListCityDetail = useCallback(async () => {
    if (!slug) return;

    const load = async () => {
      try {
        setLoading(true);
        const decodedSlug = decodeURIComponent(slug).toLowerCase();

        const homeData = await fetchHomeCities();

        const city = homeData.cities.find(
          (c) => c.slug.toLowerCase() === decodedSlug
        );

        if (!city) {
          setError("City not found");
          return;
        }

        const detail = await fetchCityDetail(String(city.city_id));
        setData(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  useEffect(() => {
    getListCityDetail();
  }, [getListCityDetail]);

  return { data, loading, error };
}
