import { contributeCity, fetchCityDetail } from "@/lib/monthlog/city-data";
import { useState, useEffect, useCallback } from "react";
import {
  CityContributionPayload,
  CityDetailData,
  CityDetailFormData,
} from "@/types/monthlog/city-detail";
import { fetchHomeCities } from "@/lib/monthlog/city-home.api";

export function useCityDetail(city: string | number | null) {
  const [data, setData] = useState<CityDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CityDetailFormData>({
    primaryLanguage: null,
    visaRequirement: null,
    currency: null,
    timezone: null,
    electricalVoltage: null,
    electricalPlugType: null,
    mainReligions: null,
    seasonComment: null,
    cityCost: null,
  });

  const getListCityDetail = useCallback(async () => {
    if (!city) return;

    const load = async () => {
      try {
        setLoading(true);

        if (typeof city === "string") {
          const decodedSlug = decodeURIComponent(city).toLowerCase();
          const homeData = await fetchHomeCities();
          const foundCity = homeData.cities.find(
            (c) => c.slug.toLowerCase() === decodedSlug
          );
          if (!foundCity) throw new Error("City not found");

          setCityId(foundCity.city_id);
          const detail = await fetchCityDetail(String(foundCity.city_id));
          setData(detail);
        } else {
          setCityId(city);
          const detail = await fetchCityDetail(String(city));
          setData(detail);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [city]);

  useEffect(() => {
    getListCityDetail();
  }, [getListCityDetail]);

  const handleSubmit = async () => {
    if (!cityId) return;
    console.log("ưewewe", cityId);

    const payload: CityContributionPayload = {
      cityDetail: {
        primaryLanguage: formData.primaryLanguage ?? "",
        visaRequirement: formData.visaRequirement ?? "",
        currency: formData.currency ?? "",
        timezone: formData.timezone ?? "",
        electricalVoltage: formData.electricalVoltage ?? "",
        electricalPlugType: formData.electricalPlugType ?? "",
        mainReligions: formData.mainReligions ?? "",
      },
      seasonComment: formData.seasonComment ?? null,
      cityCost: formData.cityCost ?? null,
    };

    try {
      await contributeCity(String(cityId), payload);
      console.log("Contribute success");
    } catch (error) {
      console.error("Contribute failed:", error);
    }
  };

  return { data, loading, error, formData, setFormData, handleSubmit, cityId };
}
