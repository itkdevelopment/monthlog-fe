'use client';

import { useParams } from 'next/navigation';
import CityHeader from '@/components/monthlog/city-header';
import CityHeroSection from '@/components/monthlog/city-hero-section';
import CityRadarChart from '@/components/monthlog/city-radar-chart';
import CityOverviewStats from '@/components/monthlog/city-overview-stats';
import CityCostSection from '@/components/monthlog/city-cost-section';
import CityHousingSection from '@/components/monthlog/city-housing-section';
import CityConvenienceSection from '@/components/monthlog/city-convenience-section';
import CityTransportSection from '@/components/monthlog/city-transport-section';
import CityCommunitySection from '@/components/monthlog/city-community-section';
import CityBasicInfoSection from '@/components/monthlog/city-basic-info-section';
import CityDigitalSection from '@/components/monthlog/city-digital-section';
import CitySafetySection from '@/components/monthlog/city-safety-section';
import CitySeasonChart from '@/components/monthlog/city-season-chart';
import CityAtmosphereGallery from '@/components/monthlog/city-atmosphere-gallery';
import { getCityDetailData } from '@/lib/monthlog/city-data';

export default function CityDetailPage() {
  const params = useParams();
  const cityId = params.slug as string;

  // Get city data based on cityId
  const cityData = getCityDetailData(cityId);

  if (!cityData) {
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
      <CityHeader cityName={cityData.name} countryName={cityData.country} />

      <div className="max-w-6xl py-8 mx-auto">
        <div className="mx-6 lg:mx-8 pb-8">
          {/* Hero Section */}
          <CityHeroSection
            city={cityData.name}
            description={cityData.description}
            image={cityData.heroImage}
            tags={cityData.tags}
          />

          {/* Overview Stats */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8">
            <CityOverviewStats
              suitabilityScore={cityData.suitabilityScore}
              totalContributors={cityData.totalContributors}
              totalContributions={cityData.totalContributions}
              reliabilityScore={cityData.reliabilityScore}
              lastUpdated={cityData.lastUpdated}
            />
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8">
            {/* Radar Chart Section */}
            <CityRadarChart
              data={cityData.compatibilityData}
              tags={cityData.popularTags}
              comments={cityData.popularComments}
            />

            {/* Cost Section */}
            <CityCostSection data={cityData.costData} />

            {/* Digital/Work Environment */}
            <CityDigitalSection data={cityData.digitalData} />

            {/* Safety & Medical */}
            <CitySafetySection data={cityData.safetyData} />

            {/* Housing Environment */}
            <CityHousingSection data={cityData.housingData} />

            {/* Local Convenience */}
            <CityConvenienceSection data={cityData.convenienceData} />

            {/* Transportation */}
            <CityTransportSection data={cityData.transportData} />

            {/* Community & Local Experience */}
            <CityCommunitySection data={cityData.communityData} />

            {/* Basic Information */}
            <CityBasicInfoSection data={cityData.basicInfo} />

            {/* Seasonal Recommendations */}
            <CitySeasonChart data={cityData.seasonData} />

            {/* City Atmosphere Gallery */}
            <CityAtmosphereGallery
              photos={cityData.atmospherePhotos}
              totalPhotos={cityData.totalPhotos}
            />
          </div>

          {/* Bottom Spacer */}
          <div className="h-8 sm:h-10" />
        </div>
      </div>
    </div>
  );
}
