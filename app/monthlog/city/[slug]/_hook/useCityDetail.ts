import {
  contributeCity,
  fetchCityDetail,
  fetchTags,
} from "@/lib/monthlog/city-data";
import { useState, useEffect, useCallback } from "react";
import {
  CityContributionPayload,
  CityDetailData,
  CityDetailFormData,
  TagsResponse,
} from "@/types/monthlog/city-detail";
import { fetchHomeCities } from "@/lib/monthlog/city-home.api";

export function useCityDetail(city: string | number | null) {
  const [data, setData] = useState<CityDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState<string | null>(null);
  const [tags, setTags] = useState<TagsResponse | null>(null);
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

  const fetchTagsData = useCallback(async () => {
    try {
      setTagsLoading(true);
      const tagsData = await fetchTags();
      setTags(tagsData);
      setFormData((prev) => ({
        ...prev,
        tags: tagsData,
      }));
    } catch (err) {
      setTagsError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setTagsLoading(false);
    }
  }, []);

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
    fetchTagsData();
  }, [getListCityDetail, fetchTagsData]);

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
      // cityCost: formData.cityCost ?? undefined,
      cityDigital: formData.cityDigital ?? undefined,
    };

    try {
      await contributeCity(String(cityId), payload);
      console.log("✅ Contribute success:", payload);
    } catch (error) {
      console.error("❌ Contribute failed:", error);
    }
  };
  const getTagsByCategory = useCallback(
    (category: keyof TagsResponse["data"]) => {
      return tags?.data[category] || [];
    },
    [tags]
  );

  const getTagById = useCallback(
    (tagId: number) => {
      if (!tags) return null;

      for (const category of Object.keys(tags.data)) {
        const tag = tags.data[category as keyof TagsResponse["data"]].find(
          (t) => t.id === tagId
        );
        if (tag) return tag;
      }

      return null;
    },
    [tags]
  );

  return {
    data,
    loading,
    error,
    formData,
    setFormData,
    handleSubmit,
    cityId,
    tags,
    tagsLoading,
    tagsError,
    getTagsByCategory,
    getTagById,
  };
}
