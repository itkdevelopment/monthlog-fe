"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Wifi,
  Zap,
  Building,
  Coffee,
  CreditCard,
  Edit,
} from "lucide-react";
import SectionCard from "./shared/section-card";
import CircularProgress from "./shared/circular-progress";
import StatItem from "./shared/stat-item";
import {
  CityContributionPayload,
  DigitalData,
} from "@/types/monthlog/city-detail";
import WorkationGroupEditPage from "@/app/monthlog/city/[slug]/workation-group-edit/page";
import SatisfactionPanel from "./modals/satisfaction-panel";
import z from "zod";
import { useContributeCity } from "@/lib/monthlog/query/city";
import { fetchHomeCities } from "@/lib/monthlog/city-home.api";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CityDigitalSectionProps {
  data?: DigitalData;
  cityId: number | null;
  citySlug: string;
}

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

const initValue = {
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

export default function CityDigitalSection({
  data,
  citySlug,
}: CityDigitalSectionProps) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [activePanelType, setActivePanelType] = useState<string | null>(null);
  const contributeCity = useContributeCity();

  const [homeData, setHomeData] = React.useState<{ cities: any[] }>({
    cities: [],
  });
  const form = useForm<z.infer<typeof workationFormSchema>>({
    resolver: zodResolver(workationFormSchema),
    defaultValues: initValue,
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
  // 패널 열기 함수
  const openPanel = (key: string) => {
    setActivePanelType(key);
  };

  // 패널 닫기 함수
  const closePanel = () => {
    setActivePanelType(null);
  };

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };
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
          closePanel();
          form.reset(initValue);
        },
        onError: (error) => {
          console.error("Submission error:", error);
        },
      }
    );
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <SectionCard
        title="디지털/업무 환경"
        subtitle="18명이 기여한 정보"
        emoji="💻"
        onEdit={
          <button
            onClick={handleEditClick}
            className=" flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="편집"
          >
            <Edit className="h-4 w-4" />
          </button>
        }
      >
        {/* Top Stats Grid */}
        <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
          <div className="col-span-2 flex justify-center">
            <CircularProgress
              value={data?.digitalSatisfactionScore ?? 0}
              max={10}
              label="워케이션 환경 만족도"
            />
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data?.internetSpeedMbps ?? "-"}Mbps
              </div>
              <div className="text-sm text-gray-600">인터넷 평균 속도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data?.coworkingSpacesCount ?? 0}곳
              </div>
              <div className="text-sm text-gray-600">코워킹 스페이스</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data?.powerStability ?? "-"}
              </div>
              <div className="text-sm text-gray-600">전력 안정성</div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Detailed Stats */}

        <div className="space-y-1">
          <StatItem
            icon={<TrendingUp className="h-4 w-4 text-gray-600" />}
            label="워케이션 환경 만족도"
            value={`${data?.digitalSatisfactionScore ?? 0}/10`}
            onEdit={() => openPanel("satisfaction")}
          />

          <StatItem
            icon={<Wifi className="h-4 w-4 text-gray-600" />}
            label="인터넷 평균 속도"
            value={`${data?.internetSpeedMbps ?? "-"}Mbps , ${
              data?.internetSpeedScore ?? "-"
            }`}
          />

          <StatItem
            icon={<Zap className="h-4 w-4 text-gray-600" />}
            label="전력 안정성"
            value={`${data?.powerStability ?? "-"}  , ${
              data?.powerStabilityScore ?? "-"
            }`}
          />

          <StatItem
            icon={<Wifi className="h-4 w-4 text-gray-600" />}
            label="무료 Wi-Fi 접근성"
            value={`${data?.freeWifiAccess ?? "-"}  , ${
              data?.freeWifiScore ?? "-"
            }`}
          />

          <StatItem
            icon={<Building className="h-4 w-4 text-gray-600" />}
            label="코워킹 스페이스"
            value={`${data?.coworkingSpacesCount ?? "-"}  , ${
              data?.coworkingSpacesScore ?? "-"
            }`}
          />

          <StatItem
            icon={<Coffee className="h-4 w-4 text-gray-600" />}
            label="노트북 하기 좋은 카페"
            value={`${data?.laptopFriendlyCafesCount ?? "-"}  , ${
              data?.laptopFriendlyCafesCount ?? "-"
            }`}
          />

          <StatItem
            icon={<CreditCard className="h-4 w-4 text-gray-600" />}
            label="단기 멤버십 정보"
            value={`${data?.monthlyMembershipCost ?? "-"}  , ${
              data?.monthlyMembershipScore ?? "-"
            }`}
          />
        </div>
      </SectionCard>

      {/* Digital Edit Popup */}
      <WorkationGroupEditPage
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        data={data}
        citySlug={citySlug}
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SatisfactionPanel
            isOpen={activePanelType === "satisfaction"}
            onClose={closePanel}
            name="cityDigital.digital_satisfaction_score"
          />
        </form>
      </FormProvider>
    </>
  );
}
