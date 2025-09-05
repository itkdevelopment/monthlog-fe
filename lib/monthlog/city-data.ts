// lib/monthlog/city-data.ts
import {
  CityContributionPayload,
  CityDetailData,
  TagsResponse,
} from "@/types/monthlog/city-detail";
import apiHandler from "../api-handler";

/**
 * Fetch city detail by cityId
 * @param id City ID (string)
 * @returns CityDetailData
 */

export async function fetchCityDetail(id: string): Promise<CityDetailData> {
  const res = await apiHandler.get<{ data: CityDetailData }>(
    `/explorer/cities/${id}/details`
  );
  return res.data.data;
}

export async function contributeCity(
  id: number,
  payload: CityContributionPayload
): Promise<CityDetailData> {
  const res = await apiHandler.post<CityDetailData>(
    `/explorer/cities/${id}/contribute`,
    payload
  );
  return res.data;
}

export async function fetchTags(): Promise<TagsResponse> {
  const res = await apiHandler.get<TagsResponse>(`/explorer/cities/tags`);
  return res.data;
}

export async function fetchTagsCityDetail() {
  const res = await apiHandler.get(`/explorer/cities/tags`);
  return res.data;
}

export async function fetchStaticCityDetail(id: string) {
  const res = await apiHandler.get(
    `/explorer/cities/${id}/profile/static-data`
  );
  return res.data.data;
}
