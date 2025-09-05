import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCityDetail, contributeCity, fetchTags } from "../city-data";
import { fetchHomeCities } from "../city-home.api";
import {
  CityDetailData,
  CityContributionPayload,
  TagsResponse,
} from "@/types/monthlog/city-detail";

// Query to get all home cities
export function useHomeCities() {
  return useQuery({
    queryKey: ["home-cities"],
    queryFn: fetchHomeCities,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Query to get city detail by ID
export function useCityDetail(cityId: string) {
  return useQuery<CityDetailData, Error>({
    queryKey: ["city-detail", cityId],
    queryFn: () => fetchCityDetail(cityId),
    enabled: !!cityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGetTags() {
  return useQuery<TagsResponse, Error, TagsResponse['data']>({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: 10 * 60 * 1000, // 10 minutes,
    select: (data) => data.data
  })
}

// Mutation to contribute to a city
interface ContributeCityVariables {
  cityId: number;
  data: CityContributionPayload;
}

export function useContributeCity() {
  return useMutation<CityDetailData, Error, ContributeCityVariables>({
    mutationFn: ({ cityId, data }) => contributeCity(cityId, data),
  });
}
