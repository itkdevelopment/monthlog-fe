"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/monthlog-proto/ui/card";
import { Button } from "@/components/monthlog/ui/button";
import {
  CityContributionPayload,
  DigitalData,
} from "@/types/monthlog/city-detail";
import {
  ArrowLeft,
  Building,
  Coffee,
  CreditCard,
  TrendingUp,
  Wifi,
  Zap,
} from "lucide-react";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

// Input components
import CafeInput from "@/components/monthlog/workation-inputs/cafe-input";
import CoworkingSpaceInput from "@/components/monthlog/workation-inputs/coworking-space-input";
import InternetSpeedInput from "@/components/monthlog/workation-inputs/internet-speed-input";
import MembershipInput from "@/components/monthlog/workation-inputs/membership-input";
import PowerStabilityInput from "@/components/monthlog/workation-inputs/power-stability-input";
import SatisfactionInput from "@/components/monthlog/workation-inputs/satisfaction-input";
import WifiAccessInput from "@/components/monthlog/workation-inputs/wifi-access-input";
import { fetchHomeCities } from "@/lib/monthlog/city-home.api";
import { useContributeCity } from "@/lib/monthlog/query/city";

const workationFormSchema = z.object({
  cityDigital: z.object({
    digital_satisfaction_score: z.number().min(0).max(10).optional(),

    internet_speed_mbps: z.number().min(0).optional(),
    internet_speed_score: z.number().min(0).max(10).optional(),

    power_stability: z
      .object({
        rating: z.number().min(0).max(10).optional(),
        tags: z.array(z.string()).optional(),
      })
      .optional(),

    free_wifi_access: z
      .object({
        rating: z.number().min(0).max(10).optional(),
        tags: z.array(z.string()).optional(),
      })
      .optional(),

    coworking_space: z
      .object({
        name: z.string().optional(),
        is_open_24h: z.boolean().optional(),
        comment: z.string().optional(),
        link: z.string().optional(),
        ease_score: z.number().min(0).max(10).optional(),
        plans: z
          .array(
            z.object({
              plan: z.string(),
              price: z.number().min(0).optional(),
            })
          )
          .optional(),
      })
      .optional(),

    short_term_membership: z
      .object({
        ease_score: z.number().min(0).max(10).optional(),
        plans: z
          .array(
            z.object({
              plan: z.string(),
              price: z.number().min(0),
            })
          )
          .optional(),
        tags: z.array(z.string()).optional(),
      })
      .optional(),

    cafe: z
      .object({
        name: z.string().optional(),
        order_menu: z.string().optional(),
        price: z.number().min(0).optional(),
        is_open_24h: z.boolean().optional(),
        comment: z.string().optional(),
        link: z.string().optional(),
        rating: z.number().min(0).max(10).optional(),
      })
      .optional(),
  }),
});

type DigitalFormData = z.infer<typeof workationFormSchema>;

interface WorkationGroupEditPageProps {
  isOpen: boolean;
  onClose: () => void;
  data?: DigitalData;
  citySlug: string;
}

function removeDefaults<T extends Record<string, any>>(
  obj: T,
  defaults: T
): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const defaultValue = defaults[key as keyof T];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const cleaned = removeDefaults(value, defaultValue || {});
      if (Object.keys(cleaned).length > 0) {
        acc[key] = cleaned;
      }
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        acc[key] = value;
      }
    } else {
      // chỉ giữ nếu khác default
      if (value !== defaultValue) {
        acc[key] = value;
      }
    }

    return acc;
  }, {} as Partial<T>);
}

const initValue: DigitalFormData = {
  cityDigital: {
    digital_satisfaction_score: 0,
    internet_speed_mbps: 0,
    internet_speed_score: 0,
    power_stability: {
      rating: 0,
      tags: [],
    },
    free_wifi_access: {
      rating: 0,
      tags: [],
    },
    coworking_space: {
      name: "",
      is_open_24h: false,
      comment: "",
      link: "",
      ease_score: 0,
      plans: [],
    },

    short_term_membership: {
      ease_score: 0,
      plans: [],
      tags: [],
    },
    cafe: {
      name: "",
      order_menu: "",
      price: 0,
      is_open_24h: false,
      comment: "",
      link: "",
      rating: 0,
    },
  },
};
export default function WorkationGroupEditPage({
  isOpen,
  onClose,
  data,
  citySlug,
}: WorkationGroupEditPageProps) {
  const form = useForm<z.infer<typeof workationFormSchema>>({
    resolver: zodResolver(workationFormSchema),
    defaultValues: initValue,
  });
  const contributeCity = useContributeCity();

  const [homeData, setHomeData] = React.useState<{ cities: any[] }>({
    cities: [],
  });

  const foundCity = React.useMemo(() => {
    const decodedSlug = decodeURIComponent(citySlug).toLowerCase();
    return homeData.cities.find((c) => c.slug.toLowerCase() === decodedSlug);
  }, [homeData, citySlug]);

  React.useEffect(() => {
    const loadHomeData = async () => {
      try {
        const data = await fetchHomeCities();
        setHomeData(data);
      } catch (error) {
        console.error("Failed to fetch home cities:", error);
      }
    };
    loadHomeData();
  }, []);

  const onSubmit = async (values: DigitalFormData) => {
    const cleanedCityDigital = removeDefaults(
      values.cityDigital,
      initValue.cityDigital
    );

    const payload: CityContributionPayload = {};
    if (Object.keys(cleanedCityDigital).length > 0) {
      payload.cityDigital = cleanedCityDigital;
    }

    if (!foundCity) throw new Error("City not found");

    contributeCity.mutate(
      {
        cityId: foundCity.city_id,
        data: payload,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Submission error:", error);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Full Screen Content */}
      <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
        <div className="min-h-screen w-full">
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 lg:px-8 bg-white/90 backdrop-blur-sm border-b border-gray-100">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-lg font-bold text-gray-900">
              디지털/업무 환경 한번에 개척하기
            </h1>
            <div className="w-24" />
          </header>

          {/* Main Content */}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-4 py-8 pb-32 max-w-5xl mx-auto space-y-8"
            >
              {/* 1. Satisfaction */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <TrendingUp className="h-6 w-6" />
                  <h2 className="text-xl font-bold">워케이션 환경 만족도</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <SatisfactionInput name="cityDigital.digital_satisfaction_score" />
                </CardContent>
              </Card>

              {/* 2. Internet Speed */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <Wifi className="h-6 w-6" />
                  <h2 className="text-xl font-bold">인터넷 평균 속도</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <InternetSpeedInput name="cityDigital" />
                </CardContent>
              </Card>

              {/* 3. Power Stability */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <Zap className="h-6 w-6" />
                  <h2 className="text-xl font-bold">전력 안정성</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <PowerStabilityInput name="cityDigital.power_stability" />
                </CardContent>
              </Card>

              {/* 4. Wifi Access */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <Wifi className="h-6 w-6" />
                  <h2 className="text-xl font-bold">무료 Wi-Fi 접근성</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <WifiAccessInput name="cityDigital.free_wifi_access" />
                </CardContent>
              </Card>

              {/* 5. Coworking Spaces */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <Building className="h-6 w-6" />
                  <h2 className="text-xl font-bold">코워킹 스페이스</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <CoworkingSpaceInput name="cityDigital.coworking_space" />
                </CardContent>
              </Card>

              {/* 6. Cafes */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <Coffee className="h-6 w-6" />
                  <h2 className="text-xl font-bold">노트북 하기 좋은 카페</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <CafeInput />
                </CardContent>
              </Card>

              {/* 7. Membership */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 flex items-center gap-3 text-[#0B24FB]">
                  <CreditCard className="h-6 w-6" />
                  <h2 className="text-xl font-bold">단기 멤버십 정보</h2>
                </CardHeader>
                <CardContent className="px-16 py-6 pb-14">
                  <MembershipInput name="cityDigital.short_term_membership" />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent">
                <div className="max-w-md mx-auto">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#0B24FB",
                      color: "white",
                      borderRadius: "9999px",
                    }}
                    className="w-full py-4 text-lg font-semibold hover:opacity-90"
                  >
                    한번에 개척하기
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
