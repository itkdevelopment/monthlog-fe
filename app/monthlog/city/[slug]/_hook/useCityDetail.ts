import {
  contributeCity,
  fetchCityDetail,
  fetchTagsCityDetail,
} from "@/lib/monthlog/city-data";
import { useState, useEffect, useCallback } from "react";
import {
  CityContributionPayload,
  CityDetailData,
  CityDetailFormData,
  TContributeHeroSectionPayload,
  TTagData,
} from "@/types/monthlog/city-detail";
import { fetchHomeCities } from "@/lib/monthlog/city-home.api";

export function useCityDetail(city: string | number | null) {
  const [data, setData] = useState<CityDetailData | null>(null);
  const [tags, setTags] = useState<TTagData>();
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
    cityCost: {},
    cityDigital: {},
  });

  const getCityDetailTags = useCallback(async () => {
    if (!city) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await fetchTagsCityDetail();
        setTags(res?.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [city]);

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
    getCityDetailTags();
  }, [getListCityDetail, getCityDetailTags]);

  const handleSubmit = async () => {
    if (!cityId) return;
    console.log("📌 Submitting city:", cityId);

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
      seasonComment: formData.seasonComment ?? undefined,
      cityCost: formData.cityCost ?? undefined,
      cityDigital: formData.cityDigital ?? undefined,
    };

    try {
      await contributeCity(String(cityId), payload);
      console.log("✅ Contribute success:", payload);
    } catch (error) {
      console.error("❌ Contribute failed:", error);
    }
  };

  const handleContributeHeroSection = async (
    formData: TContributeHeroSectionPayload
  ) => {
    if (!cityId) return;

    const payload: CityContributionPayload = {
      cityProfile: formData,
    };
    try {
      await contributeCity(String(cityId), payload);
      console.log("Contribute success");
    } catch (error) {
      console.error("Contribute failed:", error);
    }
  };

  return {
    data,
    loading,
    error,
    formData,
    setFormData,
    handleSubmit,
    cityId,
    getCityDetailTags,
    tags,
    handleContributeHeroSection,
  };
}
