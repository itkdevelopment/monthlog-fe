"use client";

import { useParams } from "next/navigation";
import CityHeader from "@/components/monthlog/city-header";
import CityHeroSection from "@/components/monthlog/city-hero-section";
// import CityRadarChart from "@/components/monthlog/city-radar-chart";
import CityOverviewStats from "@/components/monthlog/city-overview-stats";
import CityCostSection from "@/components/monthlog/city-cost-section";
import CityHousingSection from "@/components/monthlog/city-housing-section";
import CityConvenienceSection from "@/components/monthlog/city-convenience-section";
import CityTransportSection from "@/components/monthlog/city-transport-section";
import CityCommunitySection from "@/components/monthlog/city-community-section";
import CityBasicInfoSection from "@/components/monthlog/city-basic-info-section";
import CityDigitalSection from "@/components/monthlog/city-digital-section";
import CitySafetySection from "@/components/monthlog/city-safety-section";
import CitySeasonChart from "@/components/monthlog/city-season-chart";
import CityAtmosphereGallery from "@/components/monthlog/city-atmosphere-gallery";
import { useHomeCities, useCityDetail } from "@/lib/monthlog/query/city";

export default function CityDetailPage() {
  const params = useParams();
  const citySlug = params.slug as string;
  
  // Get all home cities to find cityId by slug
  const { data: homeCities } = useHomeCities();
  
  // Find cityId from slug
  const cityFromList = homeCities?.cities.find(
    (city) => city.slug.toLowerCase() === decodeURIComponent(citySlug).toLowerCase()
  );
  const cityId = cityFromList?.city_id;
  
  // Get city detail by cityId
  const { data: cityData } = useCityDetail(String(cityId || ''));
  
  if (!cityData || !cityId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            도시를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600">
            요청하신 도시 정보가 존재하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CityHeader
        cityName={cityData.basic.cityName}
        countryName={cityData.basic.countryCode}
      />

      <div className="max-w-6xl py-8 mx-auto">
        <div className="mx-6 lg:mx-8 pb-8">
          {/* Hero Section */}
          <CityHeroSection
            city={cityData.basic.cityName}
            description={cityData.basic.cityDesc ?? ""}
            image={cityData.basic.cityProfileUrl ?? ""}
            // tags={cityData.tags??[]}
          />

          {/* Overview Stats */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8">
            <CityOverviewStats
              suitabilityScore={cityData.suitability}
              totalContributors={cityData.contribution.totalContributors}
              totalContributions={cityData.contribution.totalContributions}
              reliabilityScore={cityData.reliability}
              // lastUpdated={cityData.}
            />
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8">
            {/* Radar Chart Section */}
            {/* <CityRadarChart
              data={9}
              tags={cityData.popularTags ?? []}
              comments={8}
            /> */}

            {/* Cost Section */}
            <CityCostSection data={cityData.cost} cityId={cityId} citySlug={citySlug} />

            {/* Digital/Work Environment */}
            <CityDigitalSection data={cityData.digital} />

            {/* Safety & Medical */}
            <CitySafetySection data={cityData.safety} />

            {/* Housing Environment */}
            <CityHousingSection data={cityData.residential} />

            {/* Local Convenience */}
            <CityConvenienceSection data={cityData.convenience} />

            {/* Transportation */}
            <CityTransportSection data={cityData.transportation} />

            {/* Community & Local Experience */}
            <CityCommunitySection data={cityData.community} />

            {/* Basic Information */}
            <CityBasicInfoSection data={cityData.detail} />

            {/* Seasonal Recommendations */}
            <CitySeasonChart
              data={cityData.seasonData ?? []}
              // comments={cityData.seasonComments ?? []}
            />

            {/* City Atmosphere Gallery */}
            <CityAtmosphereGallery
              photos={cityData.recentFeeds ?? []}
              totalPhotos={cityData.sectionContributions ?? 0}
            />
          </div>

          {/* Bottom Spacer */}
          <div className="h-8 sm:h-10" />
        </div>
      </div>
    </div>
  );
}
