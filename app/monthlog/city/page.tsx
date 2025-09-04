"use client";

import ExpLevelCard from "@/components/monthlog/experience-level-card";
import CityCard from "@/components/monthlog/city-card";
import { useRouter } from "next/navigation";
import { useHomeCities } from "./_hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormCompose } from "@/components/monthlog-proto/ui/form";
import { Select } from "@/components/monthlog/ui/select";
import { Input } from "@/components/monthlog/ui/input";
import { Button } from "@/components/monthlog/ui/button";
import { useState } from "react";

// Test form schema with nested payload structure
const testFormSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "이름을 입력해주세요"),
    age: z.number().min(1, "나이를 입력해주세요"),
    experience: z.string().min(1, "경험을 선택해주세요"),
  }),
  travelPreferences: z.object({
    destination: z.string().min(1, "목적지를 선택해주세요"),
    budget: z.number().min(1, "예산을 입력해주세요"),
    duration: z.string().min(1, "기간을 선택해주세요"),
  }),
});

type TestFormData = z.infer<typeof testFormSchema>;

export default function MonthlogHomePage() {
  const { cities, userInfo, stats } = useHomeCities();
  const router = useRouter();
  const [showTestForm, setShowTestForm] = useState(false);

  // Form options
  const experienceOptions = [
    { value: "beginner", label: "초보자" },
    { value: "intermediate", label: "중급자" },
    { value: "expert", label: "전문가" },
  ];

  const destinationOptions = [
    { value: "seoul", label: "서울" },
    { value: "busan", label: "부산" },
    { value: "jeju", label: "제주" },
    { value: "tokyo", label: "도쿄" },
    { value: "bangkok", label: "방콕" },
  ];

  const durationOptions = [
    { value: "1week", label: "1주일" },
    { value: "2weeks", label: "2주일" },
    { value: "1month", label: "1개월" },
    { value: "3months", label: "3개월" },
  ];

  // Initialize form
  const form = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      personalInfo: {
        name: "",
        age: 0,
        experience: "",
      },
      travelPreferences: {
        destination: "",
        budget: 0,
        duration: "",
      },
    },
  });

  // Handle form submission
  const onSubmit = async (data: TestFormData) => {
    console.log("Form submitted with nested payload:", data);
    alert(`폼 제출 완료!\n이름: ${data.personalInfo.name}\n목적지: ${data.travelPreferences.destination}`);
    setShowTestForm(false);
    form.reset();
  };

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
        {/* Test Form Toggle Button */}
        <section className="mb-6 sm:mb-8 text-center">
          <Button 
            onClick={() => setShowTestForm(!showTestForm)}
            className="mb-4"
          >
            {showTestForm ? "폼 숨기기" : "테스트 폼 보기"}
          </Button>
          
          {/* Test Form */}
          {showTestForm && (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                테스트 폼 (중첩 페이로드 구조)
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">개인 정보</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormCompose
                        name="personalInfo.name"
                        label="이름"
                        control={form.control}
                        render={(field) => (
                          <Input
                            placeholder="이름을 입력하세요"
                            {...field}
                          />
                        )}
                      />
                      
                      <FormCompose
                        name="personalInfo.age"
                        label="나이"
                        control={form.control}
                        render={(field) => (
                          <Input
                            type="number"
                            placeholder="나이를 입력하세요"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        )}
                      />
                    </div>
                    
                    <FormCompose
                      name="personalInfo.experience"
                      label="여행 경험"
                      control={form.control}
                      render={(field) => (
                        <Select
                          placeholder="경험 수준을 선택하세요"
                          options={experienceOptions}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  {/* Travel Preferences Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">여행 선호도</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormCompose
                        name="travelPreferences.destination"
                        label="목적지"
                        control={form.control}
                        render={(field) => (
                          <Select
                            placeholder="목적지를 선택하세요"
                            options={destinationOptions}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      
                      <FormCompose
                        name="travelPreferences.duration"
                        label="여행 기간"
                        control={form.control}
                        render={(field) => (
                          <Select
                            placeholder="기간을 선택하세요"
                            options={durationOptions}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    
                    <FormCompose
                      name="travelPreferences.budget"
                      label="예산 (만원)"
                      control={form.control}
                      render={(field) => (
                        <Input
                          type="number"
                          placeholder="예산을 입력하세요"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      제출하기
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => form.reset()}
                    >
                      초기화
                    </Button>
                  </div>
                  
                  {/* Debug Info */}
                  <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
                    <h4 className="font-medium mb-2">현재 폼 데이터:</h4>
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(form.watch(), null, 2)}
                    </pre>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </section>
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
        <div className="text-center py-8 pb-32">
          <div className="flex items-center justify-center space-x-8 text-sm minimal-stats">
            <div>
              <span className="stat-number">{stats?.pioneeredCities}</span>{" "}
              개척된도시
            </div>
            <div>
              <span className="stat-number">
                {stats?.pioneers.toLocaleString()}
              </span>
              개척자
            </div>
            <div>
              <span className="stat-number">{stats?.todayRecords}</span> 오늘의
              기록
            </div>
            <div>
              <span className="stat-number">
                {stats?.cumulativeArchives.toLocaleString()}
              </span>
              누적 아카이브
            </div>
          </div>
        </div>

        <div className="h-8 sm:h-10" />
      </div>
    </main>
  );
}
