// lib/monthlog/city-data.ts
import { CityDetailData } from "@/types/monthlog/city-detail";



/**
 * Fetch city detail by cityId
 * @param id City ID (string)
 * @returns CityDetailData
 */
 
export async function fetchCityDetail(id: string): Promise<CityDetailData> {
  const res = await fetch(`/api/v1/explorer/cities/${id}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch city detail: ${res.status}`);
  }

  const json = await res.json();
  return json.data as CityDetailData;
}
