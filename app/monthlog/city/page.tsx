"use client";

import ExpLevelCard from "@/components/monthlog/experience-level-card";
import CityCard from "@/components/monthlog/city-card";
import { useRouter } from "next/navigation";
import { useHomeCities } from "./_hook";

export default function MonthlogHomePage() {
  const { cities, userInfo } = useHomeCities();
  const router = useRouter();


  return (
    <main className="min-h-dvh digital-garden-bg">
      <header className="px-4 pt-10 pb-6 text-center sm:pt-12">
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
          <span
            className="
              bg-gradient-to-r from-[hsl(var(--primary))] to-[color-mix(in_oklab,hsl(var(--primary))_70%,white)]
              bg-clip-text text-transparent
            "
          >
            도시별
          </span>{" "}
          <span className="text-gray-900">먼슬로그</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600">
          <span className="px-2 py-1 rounded-md bg-[color-mix(in_oklab,hsl(var(--primary))_10%,transparent)] text-gray-700">
            함께 만드는
          </span>{" "}
          한달살기 아카이브
        </p>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-0">
        {userInfo && (
          <section className="mb-6 sm:mb-8">
            <ExpLevelCard
              className="md:sticky md:top-4"
              level={userInfo.level}
              levelName={userInfo.title}
              subtitle="현재 칭호"
              currentExp={userInfo.currentExp}
              maxExp={userInfo.maxExp}
            />
          </section>
        )}

        <section
          className="motion-safe:animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {cities.map((city) => (
              <CityCard
                key={city.city_id}
                city={city.city_name}
                country={city.country_name}
                image={city.city_profile_url}
                airQuality={city.air_quality}
                noiseLevel={city.noise_level}
                contributorCount={city.contributors}
                monthlyCostRangeMin={city.monthly_cost_range_min}
                monthlyCostRangeMax={city.monthly_cost_range_max}
                internetSpeedMbps={city.internet_speed_mbps}
                onClick={() => router.push(`/monthlog/city/${city.slug}`)}
                onRecord={() => {}}
                onTagClick={() => {}}
              />
            ))}
          </div>
        </section>

        <div className="h-8 sm:h-10" />
      </div>
    </main>
  );
}
