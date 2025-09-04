// app/monthlog/cost-budget-group-edit/page.tsx
"use client";
import {
  ArrowLeft,
  Star,
  House,
  DollarSign,
  Zap,
  Car,
  Smartphone,
  UtensilsCrossed,
  MapPin,
  ShoppingCart,
  Calculator,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  CostData,
  CityContributionPayload,
  Month,
} from "@/types/monthlog/city-detail";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormCompose } from "@/components/monthlog-proto/ui/form";
import { useContributeCity } from "@/lib/monthlog/query/city";
import { Button } from "@/components/monthlog/ui/button";
import { Input } from "@/components/monthlog/ui/input";
import { Label } from "@/components/monthlog/ui/label";

import { Select } from "@/components/monthlog/ui/select";
import {
  accommodationTypeOptions,
  roomLayoutOptions,
  amenityOptions,
} from "@/constants/tags";

interface AccommodationRecommendation {
  id: string;
  name: string;
  comment: string;
  link: string;
  likes: number;
  isSelected: boolean;
}

interface CostEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  citySlug: string;
  initialData?: CostData | null;
  targetSection?: string | null;
}

const costFormSchema = z.object({
  costSatisfactionScore: z.number().min(1).max(10),
  cityCost: z.object({
    totalCost: z.object({
      startDate: z.string().min(1, "시작일을 선택해주세요"),
      endDate: z.string().min(1, "종료일을 선택해주세요"),
      totalCost: z.number().min(0, "총 비용을 입력해주세요"),
    }),
    monthlyRent: z.object({
      monthlyRent: z.number().min(0, "월세를 입력해주세요"),
      month: z.enum([
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ]),
      numberOfPeople: z.number().min(1, "인원수를 입력해주세요"),
      walkable: z.boolean().optional(),
      accommodationType: z
        .object({
          id: z.number().optional(),
          name: z.string().optional(),
        })
        .optional(),
      roomCount: z
        .object({
          id: z.number().optional(),
          name: z.string().optional(),
        })
        .optional(),
      accommodationFeatures: z
        .array(
          z.object({
            id: z.number().optional(),
            name: z.string(),
          })
        )
        .optional(),
    }),
    initialSettlement: z.object({
      securityFee: z.number().min(0).optional(),
      brokerageFee: z.number().min(0).optional(),
      initialSupplyItems: z
        .array(
          z.object({
            id: z.number().optional(),
            name: z.string(),
            price: z.number().min(0).optional(),
          })
        )
        .optional(),
    }),
  }),
});

type CostFormData = z.infer<typeof costFormSchema>;

export default function CostBudgetGroupEditPage({
  isOpen,
  onClose,
  citySlug,
  targetSection,
}: CostEditModalProps) {
  // Month options
  const monthOptions = [
    { value: "JANUARY", label: "1월" },
    { value: "FEBRUARY", label: "2월" },
    { value: "MARCH", label: "3월" },
    { value: "APRIL", label: "4월" },
    { value: "MAY", label: "5월" },
    { value: "JUNE", label: "6월" },
    { value: "JULY", label: "7월" },
    { value: "AUGUST", label: "8월" },
    { value: "SEPTEMBER", label: "9월" },
    { value: "OCTOBER", label: "10월" },
    { value: "NOVEMBER", label: "11월" },
    { value: "DECEMBER", label: "12월" },
  ];

  const walkableOptions = [
    { value: "true", label: "가능" },
    { value: "false", label: "불가능" },
  ];

  // Initialize form
  const form = useForm<CostFormData>({
    resolver: zodResolver(costFormSchema),
    defaultValues: {
      costSatisfactionScore: 8,
      cityCost: {
        totalCost: {
          startDate: "",
          endDate: "",
          totalCost: 0,
        },
        monthlyRent: {
          monthlyRent: 0,
          month: "JANUARY",
          numberOfPeople: 1,
          walkable: false,
          accommodationType: {
            name: "",
          },
          roomCount: {
            name: "",
          },
          accommodationFeatures: [],
        },
        initialSettlement: {
          securityFee: 0,
          brokerageFee: 0,
          initialSupplyItems: [],
        },
      },
    },
  });


  // Mutation hook for API call
  const contributeCity = useContributeCity();

  // Watch form values for UI reactivity
  const costSatisfactionScore = form.watch("costSatisfactionScore");
  const accommodationType = form.watch(
    "cityCost.monthlyRent.accommodationType"
  );
  const roomCount = form.watch("cityCost.monthlyRent.roomCount");
  const selectedAccommodationFeatures = form.watch(
    "cityCost.monthlyRent.accommodationFeatures"
  );
  const monthlyRent = form.watch("cityCost.monthlyRent.monthlyRent");
  const securityFee = form.watch("cityCost.initialSettlement.securityFee");
  const brokerageFee = form.watch("cityCost.initialSettlement.brokerageFee");
  const startDate = form.watch("cityCost.totalCost.startDate");
  const endDate = form.watch("cityCost.totalCost.endDate");
  const totalCost = form.watch("cityCost.totalCost.totalCost");

  const {
    fields: essentialItemsFields,
    append: appendEssentialItem,
    remove: removeEssentialItem,
  } = useFieldArray({
    control: form.control,
    name: "cityCost.initialSettlement.initialSupplyItems",
  });

  const onSubmit = async (data: CostFormData) => {
    console.log("Form data:", data);

    // Transform to CityContributionPayload format
    const payload: CityContributionPayload = {
      costSatisfactionScore: data.costSatisfactionScore,
      cityCost: data.cityCost,
    };

    // Call the mutation
    contributeCity.mutate(
      {
        citySlug,
        data: payload,
      },
      {
        onSuccess: () => {
          // Calculate EXP based on filled fields
          let exp = 0;
          if (data.costSatisfactionScore) exp += 50;
          if (data.cityCost.monthlyRent?.monthlyRent) exp += 30;
          if (data.cityCost.monthlyRent?.accommodationType?.name) exp += 20;
          if (
            data.cityCost.initialSettlement?.securityFee ||
            data.cityCost.initialSettlement?.brokerageFee
          )
            exp += 40;
          if (data.cityCost.totalCost?.totalCost) exp += 50;
          if (
            data.cityCost.totalCost?.startDate &&
            data.cityCost.totalCost?.endDate
          )
            exp += 40;

          alert(`한번에 개척하기 완료! (+${exp} EXP)`);
          onClose();
        },
        onError: (error) => {
          console.error("Submission error:", error);
        },
      }
    );
  };

  // Handle accommodation feature toggle
  const handleAccommodationFeatureToggle = (feature: string) => {
    const currentFeatures =
      form.getValues("cityCost.monthlyRent.accommodationFeatures") || [];
    const featureObj = { name: feature };
    const exists = currentFeatures.some((f) => f.name === feature);

    const newFeatures = exists
      ? currentFeatures.filter((f) => f.name !== feature)
      : [...currentFeatures, featureObj];

    form.setValue("cityCost.monthlyRent.accommodationFeatures", newFeatures);
  };

  // Handle adding essential item
  const handleAddEssentialItem = (name: string, price: number) => {
    if (name.trim() && !isNaN(price)) {
      const newItem = {
        name: name.trim(),
        price,
      };
      appendEssentialItem(newItem);
    }
  };

  // Handle overlay click to close modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to determine which sections to show
  const shouldShowSection = (section: string) => {
    if (!targetSection) return true; // Show all sections if no target specified
    return targetSection === section;
  };

  // Return null if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white" onClick={handleOverlayClick}>
      <div
        className="relative w-full h-screen flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <header className="bg-white/80 border-b border-gray-100 backdrop-blur-sm sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    상세페이지로
                  </Button>
                  <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                    한달살기 비용 한번에 개척하기
                  </h1>
                  <div className="w-24"></div>
                </div>
              </div>
            </header>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
                <div className="space-y-8">
                  {/* Price Satisfaction */}
                  {shouldShowSection('satisfaction') && (
                  <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-6 w-6 text-[#0B24FB]" />
                        <h2 className="text-xl font-bold text-[#0B24FB]">
                          물가 만족도
                        </h2>
                      </div>
                    </div>
                    <div className="px-16 py-6 space-y-8 pb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          물가 만족도를 평가해주세요
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                          1점 (매우 불만족) ~ 10점 (매우 만족)
                        </p>
                        <div className="grid grid-cols-5 gap-3">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                            <Button
                              key={score}
                              type="button"
                              variant={
                                costSatisfactionScore === score
                                  ? "default"
                                  : "outline"
                              }
                              color={
                                costSatisfactionScore === score
                                  ? "neutral"
                                  : "grayscale"
                              }
                              onClick={() =>
                                form.setValue("costSatisfactionScore", score)
                              }
                              className="h-16 rounded-lg font-bold text-lg"
                            >
                              {score}점
                            </Button>
                          ))}
                        </div>
                        {costSatisfactionScore && (
                          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-blue-800">
                              선택한 점수:{" "}
                              <strong>{costSatisfactionScore}점</strong>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  )}
                  {/* Accommodation Monthly Rent */}
                  {shouldShowSection('monthlyRent') && (
                  <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center gap-3">
                        <House className="h-6 w-6 text-[#0B24FB]" />
                        <h2 className="text-xl font-bold text-[#0B24FB]">
                          숙소 월세
                        </h2>
                      </div>
                    </div>
                    <div className="px-16 py-6 space-y-12 pb-6">
                      {/* Basic Info Grid */}
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <FormCompose
                            name="cityCost.monthlyRent.month"
                            label="체류 시기"
                            control={form.control}
                            render={(field) => {
                              return (
                                <Select
                                  placeholder="선택하세요"
                                  className="w-full"
                                  options={monthOptions}
                                  value={field.value || ""}
                                  onChange={(value) => field.onChange(value)}
                                />
                              );
                            }}
                          />
                        </div>
                        <div>
                          <FormCompose
                            name="cityCost.monthlyRent.numberOfPeople"
                            label="머문 인원 수"
                            control={form.control}
                            render={(field) => {
                              return (
                                <Input
                                  type="number"
                                  min="1"
                                  className="w-full"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                />
                              );
                            }}
                          />
                        </div>
                        <div>
                          <FormCompose
                            name="cityCost.monthlyRent.walkable"
                            label="발품가능여부"
                            control={form.control}
                            render={(field) => {
                              return (
                                <Select
                                  placeholder="선택하세요"
                                  className="w-full"
                                  options={walkableOptions}
                                  value={field.value ? "true" : "false"}
                                  onChange={(value) =>
                                    field.onChange(value === "true")
                                  }
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                      {/* Accommodation Type */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          숙소 타입
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          머물렀던 숙소 타입을 선택하거나 직접 입력해주세요
                        </p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {accommodationTypeOptions.map((option) => (
                            <Button
                              key={option.value}
                              type="button"
                              variant={
                                accommodationType?.id === option.value
                                  ? "default"
                                  : "outline"
                              }
                              color={
                                accommodationType?.id === option.value
                                  ? "neutral"
                                  : "grayscale"
                              }
                              size="sm"
                              onClick={() => {
                                form.setValue(
                                  "cityCost.monthlyRent.accommodationType",
                                  { id: option.value }
                                );
                              }}
                              className="rounded-full"
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>
                        <FormCompose
                          name="cityCost.monthlyRent.accommodationType.name"
                          label=""
                          control={form.control}
                          render={(field) => (
                            <div className="flex gap-2">
                              <Input
                                type="text"
                                placeholder="직접 입력"
                                className="flex-1"
                                {...field}
                              />
                            </div>
                          )}
                        />
                      </div>
                      {/* Room Count */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          방 개수
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          머물렀던 숙소의 방 개수를 선택하거나 직접 입력해주세요
                        </p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {roomLayoutOptions.map((option) => (
                            <Button
                              key={option.value}
                              type="button"
                              variant={
                                roomCount?.id === option.value
                                  ? "default"
                                  : "outline"
                              }
                              color={
                                roomCount?.id === option.value
                                  ? "neutral"
                                  : "grayscale"
                              }
                              size="sm"
                              onClick={() => {
                                form.setValue(
                                  "cityCost.monthlyRent.roomCount",
                                  { id: option.value }
                                );
                              }}
                              className="rounded-full"
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>
                        <FormCompose
                          name="cityCost.monthlyRent.roomCount.name"
                          label=""
                          control={form.control}
                          render={(field) => (
                            <div className="flex gap-2">
                              <Input
                                type="text"
                                placeholder="직접 입력"
                                className="flex-1"
                                {...field}
                              />
                            </div>
                          )}
                        />
                      </div>
                      {/* Accommodation Features */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          숙소 특징
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          숙소의 특징을 선택하거나 직접 입력해주세요 (복수 선택
                          가능)
                        </p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {amenityOptions.map((option) => (
                            <Button
                              key={option.value}
                              type="button"
                              variant={
                                selectedAccommodationFeatures?.some(
                                  (f) => f.name === option.label
                                )
                                  ? "default"
                                  : "outline"
                              }
                              color={
                                selectedAccommodationFeatures?.some(
                                  (f) => f.name === option.label
                                )
                                  ? "neutral"
                                  : "grayscale"
                              }
                              size="sm"
                              onClick={() =>
                                handleAccommodationFeatureToggle(option.label)
                              }
                              className="rounded-full"
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="직접 입력 (예: #와이파이)"
                            className="flex-1"
                            id="customFeatureInput"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const input = document.getElementById('customFeatureInput') as HTMLInputElement;
                              const value = input.value.trim();
                              if (value) {
                                const feature = value.startsWith("#") ? value : `#${value}`;
                                handleAccommodationFeatureToggle(feature);
                                input.value = "";
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {/* Monthly Rent */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          월세 가격
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          실제 지불한 월세 금액을 입력해주세요
                        </p>
                        <div className="flex items-center gap-3">
                          <FormCompose
                            name="cityCost.monthlyRent.monthlyRent"
                            label=""
                            control={form.control}
                            render={(field) => (
                              <Input
                                type="number"
                                placeholder="예: 150"
                                className="flex-1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            )}
                          />
                          <span className="text-gray-600">만원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                  {/* Initial Settlement Costs */}
                  {shouldShowSection('initialSettlement') && (
                  <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-[#0B24FB]" />
                        <h2 className="text-xl font-bold text-[#0B24FB]">
                          초기 정착 비용
                        </h2>
                      </div>
                    </div>
                    <div className="px-16 py-6 space-y-12 pb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          초기 정착 비용
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                          보증금, 중개수수료, 첫 달 필수 비품 구매 등 초기
                          정착에 필요한 1회성 비용을 입력해주세요
                        </p>
                        <div className="space-y-6">
                          <div>
                            <FormCompose
                              name="cityCost.initialSettlement.securityFee"
                              label="보증금"
                              control={form.control}
                              render={(field) => (
                                <div className="flex items-center gap-3">
                                  <Input
                                    type="number"
                                    placeholder="예: 50"
                                    className="flex-1"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                  />
                                  <span className="text-gray-600">만원</span>
                                </div>
                              )}
                            />
                          </div>
                          <div>
                            <FormCompose
                              name="cityCost.initialSettlement.brokerageFee"
                              label="중개수수료"
                              control={form.control}
                              render={(field) => (
                                <div className="flex items-center gap-3">
                                  <Input
                                    type="number"
                                    placeholder="예: 15"
                                    className="flex-1"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                  />
                                  <span className="text-gray-600">만원</span>
                                </div>
                              )}
                            />
                          </div>
                          <div>
                            <Label className="block mb-2">
                              필수 비품 구매비
                            </Label>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <div className="flex items-center gap-2">
                                <Input
                                  type="text"
                                  placeholder="품목명"
                                  className="flex-1"
                                  id="itemNameInput"
                                />
                                <Input
                                  type="number"
                                  placeholder="가격"
                                  className="w-24"
                                  id="itemPriceInput"
                                />
                                <span className="text-gray-600 text-sm">
                                  원
                                </span>
                                <Button
                                  type="button"
                                  color="primary"
                                  size="icon"
                                  onClick={() => {
                                    const nameInput = document.getElementById('itemNameInput') as HTMLInputElement;
                                    const priceInput = document.getElementById('itemPriceInput') as HTMLInputElement;
                                    const name = nameInput.value.trim();
                                    const price = parseFloat(priceInput.value);
                                    if (name && !isNaN(price)) {
                                      handleAddEssentialItem(name, price);
                                      nameInput.value = "";
                                      priceInput.value = "";
                                    }
                                  }}
                                  className="w-8 h-8"
                                  icon={<Plus />}
                                ></Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {essentialItemsFields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">
                                      {field.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {field.price}원
                                    </span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    color="destructive"
                                    size="icon"
                                    onClick={() => removeEssentialItem(index)}
                                    className="w-8 h-8"
                                    icon={<Trash2 />}
                                  ></Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                  {/* Total Budget */}
                  {shouldShowSection('totalCost') && (
                  <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center gap-3">
                        <Calculator className="h-6 w-6 text-[#0B24FB]" />
                        <h2 className="text-xl font-bold text-[#0B24FB]">
                          총 예상 비용
                        </h2>
                      </div>
                    </div>
                    <div className="px-16 py-6 space-y-12 pb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          여행기간
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          여행 시작일과 종료일을 선택해주세요
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <FormCompose
                              name="cityCost.totalCost.startDate"
                              label="시작일"
                              control={form.control}
                              render={(field) => (
                                <Input
                                  type="date"
                                  className="w-full"
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <div>
                            <FormCompose
                              name="cityCost.totalCost.endDate"
                              label="종료일"
                              control={form.control}
                              render={(field) => (
                                <Input
                                  type="date"
                                  className="w-full"
                                  {...field}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          총 예상 비용
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          월세, 공과금, 교통비, 통신비, 식비 등을 모두 포함한 총
                          비용을 입력해주세요
                        </p>
                        <div className="flex items-center gap-3">
                          <FormCompose
                            name="cityCost.totalCost.totalCost"
                            label=""
                            control={form.control}
                            render={(field) => (
                              <Input
                                type="number"
                                placeholder="예: 2000000"
                                className="flex-1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            )}
                          />
                          <span className="text-gray-600">원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </main>
            </div>
            {/* Fixed Bottom Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent">
              <div className="max-w-md mx-auto">
                <Button
                  type="submit"
                  size="lg"
                  loading={contributeCity.isPending}
                  className="w-full py-4 text-lg font-semibold rounded-full"
                  style={{
                    backgroundColor: "rgb(11, 36, 251)",
                    color: "white",
                  }}
                >
                  한번에 개척하기 (+
                  {(() => {
                    let exp = 0;
                    if (costSatisfactionScore) exp += 50;
                    if (monthlyRent) exp += 30;
                    if (accommodationType?.name) exp += 20;
                    if (securityFee || brokerageFee) exp += 40;
                    if (startDate && endDate) exp += 40;
                    if (totalCost) exp += 50;
                    return exp;
                  })()}{" "}
                  EXP)
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
