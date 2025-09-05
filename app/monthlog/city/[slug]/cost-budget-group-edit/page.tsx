// app/monthlog/cost-budget-group-edit/page.tsx
"use client";
import {
  ArrowLeft,
  Star,
  House,
  DollarSign,
  Calculator,
  Plus,
  Trash2,
  Zap,
  Bus,
  Phone,
  Utensils,
} from "lucide-react";
import {
  CostData,
  CityContributionPayload,
  Month,
  TagsResponse,
} from "@/types/monthlog/city-detail";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormCompose } from "@/components/monthlog-proto/ui/form";
import {
  useCityDetail,
  useContributeCity,
  useGetTags,
} from "@/lib/monthlog/query/city";
import { Button } from "@/components/monthlog/ui/button";
import { Input } from "@/components/monthlog/ui/input";
import { Label } from "@/components/monthlog/ui/label";
import { Tag } from "@/types/monthlog/city-detail";

import { Select } from "@/components/monthlog/ui/select";
import {
  accommodationTypeOptions,
  roomLayoutOptions,
  amenityOptions,
} from "@/constants/tags";
import { Layer } from "recharts";
import { use, useState } from "react";

interface AccommodationRecommendation {
  id: string;
  name: string;
  comment: string;
  link: string;
  likes: number;
  isSelected: boolean;
}

type EatingStyle = {
  id?: number;
  name: string;
};

type OptionType = {
  value: number;
  label: string;
};

type FoodItemPrice = {
  foodItem: {
    id?: number;
    name: string;
    type: "INGREDIENT" | "MENU";
  };
  price: number;
};

interface CostEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  citySlug: string;
  initialData?: CostData | null;
  targetSection?: string | null;
}

const costFormSchema = z.object({
  costSatisfactionScore: z.number().min(1).max(10).optional(),
  cityCost: z
    .object({
      totalCost: z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        totalCost: z.number().optional(),
      }),
      monthlyRent: z
        .object({
          monthlyRent: z.number().min(0).optional(),
          month: z.number().min(1).max(12),
          numberOfPeople: z.number().min(1).optional(),
          walkable: z.boolean().optional(),
          accommodationTypeId: z.number().optional(),
          accommodationTypeFreeText: z.string().optional(),
          roomCountId: z.number().optional(),
          roomCountFreeText: z.string().optional(),
          accommodationFeatures: z
            .array(
              z.object({
                accommodationFeatureId: z.number().optional(),
                accommodationFeatureCode: z.string().optional(),
                freeTextAccommodationFeature: z.string().optional(),
              })
            )
            .optional(),
          recommendedAccommodations: z
            .object({
              id: z.number().optional(),
              name: z.string(),
              oneLineComment: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      foodCost: z
        .object({
          avgMonthlyCost: z.number().min(0).optional(),
          eatingStyles: z
            .array(
              z.object({
                eatingStyleId: z.number().optional(),
                name: z.string().optional(),
              })
            )
            .optional(),
          foodItemPrices: z
            .array(
              z.object({
                foodItem: z.object({
                  id: z.number().optional(),
                  name: z.string().optional(),
                  type: z.string().optional(),
                }),
                price: z.number().min(0),
              })
            )
            .optional(),
        })
        .optional(),
      communicationCost: z
        .object({
          communicationMethod: z.object({
            id: z.number().optional(),
            name: z.string().optional(),
          }),
          telecomAgency: z
            .object({
              id: z.number().optional(),
              name: z.string().optional(),
              freeText: z.string().optional(),
            })
            .optional(),
          communicationPlan: z
            .object({
              id: z.number().optional(),
              name: z.string().optional(),
              freeText: z.string().optional(),
            })
            .optional(),
          simPurchaseCost: z.number().min(0).optional(),
          avgMonthlyCost: z.number().min(0).optional(),
        })
        .optional(),
      transportationExpenses: z
        .object({
          transportationExpenses: z
            .array(
              z.object({
                transportation: z.object({
                  id: z.number().optional(),
                  name: z.string().optional(),
                }),
                monthlyCost: z.number().min(0),
              })
            )
            .optional(),
        })
        .optional(),
      utilityBills: z
        .object({
          electricityBill: z.number().min(0).optional(),
          waterBill: z.number().min(0).optional(),
          gasBill: z.number().min(0).optional(),
          etc: z.number().min(0).optional(),
        })
        .optional(),
      leisureActivityCost: z
        .object({
          avgMonthlyCost: z.number().min(0).optional(),
          leisureActivityDetails: z
            .array(
              z.object({
                leisureActivity: z.object({
                  id: z.number().optional(),
                  name: z.string().optional(),
                }),
                price: z.number().min(0).optional(),
                url: z.string().optional(),
                companions: z
                  .array(
                    z.object({
                      id: z.number().optional(),
                    })
                  )
                  .optional(),
                categories: z
                  .array(
                    z.object({
                      id: z.number().optional(),
                    })
                  )
                  .optional(),
              })
            )
            .optional(),
        })
        .optional(),
      localPrice: z
        .object({
          price: z.number().min(0).optional(),
          localItem: z.number().optional(),
          localItemFreeText: z.string().optional(),
        })
        .optional(),
      initialSettlement: z
        .object({
          securityFee: z.number().min(0).optional(),
          brokerageFee: z.number().min(0).optional(),
          initialSupplyItems: z
            .array(
              z.object({
                id: z.number().optional(),
                name: z.string().optional(),
                price: z.number().min(0).optional(),
              })
            )
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

type CostFormData = z.infer<typeof costFormSchema>;

export default function CostBudgetGroupEditPage({
  isOpen,
  onClose,
  citySlug,
  targetSection,
}: CostEditModalProps) {
  const { data: tags } = useGetTags();

  const accommodationTypeTags = tags?.["COST_ACCOM"] || [];
  const roomLayoutTags = tags?.["COST_ROOM_LAYOUT"] || [];
  const amenityTags = tags?.["COST_AMENITY"] || [];
  const transportTags = tags?.["COST_TRANSPORT"] || [];
  const commMethodTags = tags?.["COST_COMM_METHOD"] || [];
  const commProviderTags = tags?.["COST_COMM_PROVIDER"] || [];
  const commPlanTags = tags?.["COST_COMM_PLAN"] || [];
  const mealStyleTags = tags?.["COST_MEAL_STYLE"] || [];

  const accommodationTypeOptions = accommodationTypeTags.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const roomLayoutOptions = roomLayoutTags.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const amenityOptions = amenityTags.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  // Month options
  const monthOptions = [
    { value: "1", label: "1월" },
    { value: "2", label: "2월" },
    { value: "3", label: "3월" },
    { value: "4", label: "4월" },
    { value: "5", label: "5월" },
    { value: "6", label: "6월" },
    { value: "7", label: "7월" },
    { value: "8", label: "8월" },
    { value: "9", label: "9월" },
    { value: "10", label: "10월" },
    { value: "11", label: "11월" },
    { value: "12", label: "12월" },
  ];

  const monthOptionsAdapter = monthOptions.map((option) => ({
    ...option,
    stringValue: String(option.value),
  }));

  const walkableOptions = [
    { value: "true", label: "가능" },
    { value: "false", label: "불가능" },
  ];

  const transportTypes = transportTags.map((tag: Tag) => tag.name);

  const communicationMethods = commMethodTags.map((tag: Tag) => tag.name);

  const getCarriersByMethod = (method: string) => {
    const methodTag = commMethodTags.find((tag: Tag) => tag.name === method);
    if (!methodTag) return [];

    return commProviderTags.map((tag: Tag) => tag.name);
  };

  const getPlansByMethod = (method: string) => {
    return commPlanTags.map((tag: Tag) => tag.name);
  };

  // Cập nhật foodTypes từ API - Thêm kiểu rõ ràng cho tham số tag
  const foodTypes = mealStyleTags.map((tag: Tag) => tag.name);

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [selectedTransportTypes, setSelectedTransportTypes] = useState<
    string[]
  >([]);
  const [showPlanInput, setShowPlanInput] = useState(false);
  const [showCarrierInput, setShowCarrierInput] = useState(false);

  const handleTransportTypeToggle = (type: string) => {
    setSelectedTransportTypes((prev) => {
      const isSelected = prev.includes(type);
      if (isSelected) {
        const updatedTypes = prev.filter((t) => t !== type);
        const currentExpenses =
          form.getValues(
            "cityCost.transportationExpenses.transportationExpenses"
          ) || [];
        const updatedExpenses = currentExpenses.filter(
          (expense) => expense.transportation.name !== type
        );
        form.setValue(
          "cityCost.transportationExpenses.transportationExpenses",
          updatedExpenses
        );
        return updatedTypes;
      } else {
        const updatedTypes = [...prev, type];
        const transportTag = transportTags.find(
          (tag: Tag) => tag.name === type
        );
        const transportId = transportTag
          ? transportTag.id
          : transportTypes.indexOf(type) + 1;

        const currentExpenses =
          form.getValues(
            "cityCost.transportationExpenses.transportationExpenses"
          ) || [];
        const newExpense = {
          transportation: {
            id: transportId,
            name: type,
          },
          monthlyCost: 0,
        };
        form.setValue(
          "cityCost.transportationExpenses.transportationExpenses",
          [...currentExpenses, newExpense]
        );
        return updatedTypes;
      }
    });
  };

  const findTransportationIndex = (type: string) => {
    const transportationExpenses =
      form.getValues(
        "cityCost.transportationExpenses.transportationExpenses"
      ) || [];
    return transportationExpenses.findIndex(
      (expense) => expense.transportation.name === type
    );
  };

  const updateTransportationExpense = (type: string, cost: number) => {
    const transportationExpenses =
      form.getValues(
        "cityCost.transportationExpenses.transportationExpenses"
      ) || [];
    const index = transportationExpenses.findIndex(
      (expense) => expense.transportation.name === type
    );
    if (index >= 0) {
      const updatedExpenses = [...transportationExpenses];
      updatedExpenses[index] = {
        ...updatedExpenses[index],
        monthlyCost: cost,
      };
      form.setValue(
        "cityCost.transportationExpenses.transportationExpenses",
        updatedExpenses
      );
    }
  };

  // Initialize form
  const form = useForm<CostFormData>({
    resolver: zodResolver(costFormSchema),
    defaultValues: {
      costSatisfactionScore: 8,
      cityCost: {
        totalCost: {
          startDate: "",
          endDate: "",
          totalCost: undefined,
        },
        monthlyRent: {
          monthlyRent: undefined,
          month: 1,
          numberOfPeople: 1,
          walkable: false,
          accommodationTypeId: undefined,
          accommodationTypeFreeText: "",
          roomCountId: undefined,
          roomCountFreeText: "",
          accommodationFeatures: [],
          recommendedAccommodations: undefined,
        },
        foodCost: {
          avgMonthlyCost: undefined,
          eatingStyles: [],
          foodItemPrices: [],
        },
        communicationCost: {
          communicationMethod: {
            id: undefined,
            name: "",
          },
          telecomAgency: {
            id: undefined,
            name: "",
            freeText: "",
          },
          communicationPlan: {
            id: undefined,
            name: "",
            freeText: "",
          },
          simPurchaseCost: undefined,
          avgMonthlyCost: undefined,
        },
        transportationExpenses: {
          transportationExpenses: [],
        },
        utilityBills: {
          electricityBill: undefined,
          waterBill: undefined,
          gasBill: undefined,
          etc: undefined,
        },
        leisureActivityCost: {
          avgMonthlyCost: undefined,
          leisureActivityDetails: [],
        },
        localPrice: {
          price: undefined,
          localItem: undefined,
          localItemFreeText: "",
        },
        initialSettlement: {
          securityFee: undefined,
          brokerageFee: undefined,
          initialSupplyItems: [],
        },
      },
    },
  });

  // Mutation hook for API call
  const contributeCityMutation = useContributeCity();

  // Watch form values for UI reactivity
  const costSatisfactionScore = form.watch("costSatisfactionScore");
  const accommodationType = form.watch(
    "cityCost.monthlyRent.accommodationTypeId"
  );
  const roomCount = form.watch("cityCost.monthlyRent.roomCountId");
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
    const payload: CityContributionPayload = {
      costSatisfactionScore: data.costSatisfactionScore,
      cityCost: data.cityCost,
    };
    // Call the mutation
    contributeCityMutation.mutate(
      {
        citySlug,
        data: payload,
      },
      {
        onSuccess: () => {
          // Calculate EXP based on filled fields
          let exp = 0;
          if (data.costSatisfactionScore) exp += 50;
          if (data.cityCost?.monthlyRent?.monthlyRent) exp += 30;
          if (data.cityCost?.monthlyRent?.accommodationTypeId) exp += 20;
          if (
            data.cityCost?.initialSettlement?.securityFee ||
            data.cityCost?.initialSettlement?.brokerageFee
          )
            exp += 40;
          if (data.cityCost?.totalCost?.totalCost) exp += 50;
          if (
            data.cityCost?.totalCost?.startDate &&
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

    const amenityTag = amenityTags.find((tag: Tag) => tag.name === feature);

    const newFeature = {
      accommodationFeatureId: amenityTag?.id,
      accommodationFeatureCode: amenityTag?.code || feature,
      freeTextAccommodationFeature: feature.startsWith("#")
        ? feature
        : `#${feature}`,
    };

    const exists = currentFeatures.some(
      (f) =>
        f.accommodationFeatureCode === feature ||
        f.freeTextAccommodationFeature ===
          newFeature.freeTextAccommodationFeature
    );

    let newFeatures;
    if (exists) {
      newFeatures = currentFeatures.filter(
        (f) =>
          f.accommodationFeatureCode !== feature &&
          f.freeTextAccommodationFeature !==
            newFeature.freeTextAccommodationFeature
      );
    } else {
      newFeatures = [...currentFeatures, newFeature];
    }

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

  const [newMenuItems, setNewMenuItems] = useState<{
    [key: string]: { name: string; price: string };
  }>({
    요리: { name: "", price: "" },
    외식: { name: "", price: "" },
  });

  const [selectedEatingStyles, setSelectedEatingStyles] = useState<string[]>(
    []
  );

  // Helper functions cho thực phẩm
  const handleMenuNameChange = (type: string, name: string) => {
    setNewMenuItems((prev) => ({
      ...prev,
      [type]: { ...prev[type], name },
    }));
  };

  const handleMenuPriceChange = (type: string, price: string) => {
    const formattedPrice = formatNumber(price);
    setNewMenuItems((prev) => ({
      ...prev,
      [type]: { ...prev[type], price: formattedPrice },
    }));
  };

  const handleEatingStyleToggle = (style: string) => {
    setSelectedEatingStyles((prev) => {
      if (prev.includes(style)) {
        return prev.filter((s) => s !== style);
      } else {
        return [...prev, style];
      }
    });
  };

  const addMenuItem = (type: string, itemType: "INGREDIENT" | "MENU") => {
    const newItem = newMenuItems[type];
    if (newItem.name && newItem.price) {
      // Add to form
      const currentItems =
        form.getValues("cityCost.foodCost.foodItemPrices") || [];

      const mealStyleTag = mealStyleTags.find((tag: Tag) => tag.name === type);

      const newFoodItem = {
        foodItem: {
          name: newItem.name,
          type: itemType,
          // We can set an ID based on the current items length
          id: mealStyleTag?.id || currentItems.length + 1,
        },
        price: parseInt(newItem.price.replace(/,/g, "")) || 0,
      };

      form.setValue("cityCost.foodCost.foodItemPrices", [
        ...currentItems,
        newFoodItem,
      ]);

      // Reset new item
      setNewMenuItems((prev) => ({
        ...prev,
        [type]: { name: "", price: "" },
      }));
    }
  };
  const removeMenuItem = (
    type: string,
    itemType: "INGREDIENT" | "MENU",
    index: number
  ) => {
    // Remove from form
    const currentItems =
      form.getValues("cityCost.foodCost.foodItemPrices") || [];
    const itemsOfType = currentItems.filter(
      (item) => item.foodItem.type === itemType
    );
    if (index >= 0 && index < itemsOfType.length) {
      const itemToRemove = itemsOfType[index];
      const updatedItems = currentItems.filter(
        (item) =>
          !(
            item.foodItem.name === itemToRemove.foodItem.name &&
            item.foodItem.type === itemToRemove.foodItem.type &&
            item.price === itemToRemove.price
          )
      );
      form.setValue("cityCost.foodCost.foodItemPrices", updatedItems);
    }
  };

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
                  {shouldShowSection("satisfaction") && (
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
                  {shouldShowSection("monthlyRent") && (
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
                                    options={monthOptionsAdapter}
                                    value={
                                      field.value ? String(field.value) : "1"
                                    }
                                    onChange={(value) =>
                                      field.onChange(Number(value))
                                    }
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
                                    value={
                                      field.value
                                        ? String(field.value)
                                        : "false"
                                    }
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
                            {accommodationTypeOptions.map(
                              (option: OptionType) => (
                                <Button
                                  key={option.value}
                                  type="button"
                                  variant={
                                    accommodationType === option.value
                                      ? "default"
                                      : "outline"
                                  }
                                  color={
                                    accommodationType === option.value
                                      ? "neutral"
                                      : "grayscale"
                                  }
                                  size="sm"
                                  onClick={() => {
                                    form.setValue(
                                      "cityCost.monthlyRent.accommodationTypeId",
                                      option.value
                                    );
                                  }}
                                  className="rounded-full"
                                >
                                  {option.label}
                                </Button>
                              )
                            )}
                          </div>
                          <FormCompose
                            name="cityCost.monthlyRent.accommodationTypeFreeText"
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
                            머물렀던 숙소의 방 개수를 선택하거나 직접
                            입력해주세요
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            {roomLayoutOptions.map((option: OptionType) => (
                              <Button
                                key={option.value}
                                type="button"
                                variant={
                                  roomCount === option.value
                                    ? "default"
                                    : "outline"
                                }
                                color={
                                  roomCount === option.value
                                    ? "neutral"
                                    : "grayscale"
                                }
                                size="sm"
                                onClick={() => {
                                  form.setValue(
                                    "cityCost.monthlyRent.roomCountId",
                                    option.value
                                  );
                                }}
                                className="rounded-full"
                              >
                                {option.label}
                              </Button>
                            ))}
                          </div>
                          <FormCompose
                            name="cityCost.monthlyRent.roomCountFreeText"
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
                            숙소의 특징을 선택하거나 직접 입력해주세요 (복수
                            선택 가능)
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            {amenityOptions.map((option: OptionType) => {
                              const isSelected =
                                selectedAccommodationFeatures?.some(
                                  (f) =>
                                    f.freeTextAccommodationFeature ===
                                      `#${option.label}` ||
                                    f.accommodationFeatureCode === option.label
                                );

                              return (
                                <Button
                                  key={option.value}
                                  type="button"
                                  variant={isSelected ? "default" : "outline"}
                                  color={isSelected ? "neutral" : "grayscale"}
                                  size="sm"
                                  onClick={() =>
                                    handleAccommodationFeatureToggle(
                                      option.label
                                    )
                                  }
                                  className="rounded-full"
                                >
                                  {option.label}
                                </Button>
                              );
                            })}
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
                                const input = document.getElementById(
                                  "customFeatureInput"
                                ) as HTMLInputElement;
                                const value = input.value.trim();
                                if (value) {
                                  const feature = value.startsWith("#")
                                    ? value
                                    : `#${value}`;
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
                  {shouldShowSection("initialSettlement") && (
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
                            정착에 필요한 1회성 비용을 입력해주세요111
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
                                      const nameInput = document.getElementById(
                                        "itemNameInput"
                                      ) as HTMLInputElement;
                                      const priceInput =
                                        document.getElementById(
                                          "itemPriceInput"
                                        ) as HTMLInputElement;
                                      const name = nameInput.value.trim();
                                      const price = parseFloat(
                                        priceInput.value
                                      );
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
                  {/* Monthly Budget */}
                  {shouldShowSection("utilityBills") && (
                    <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                      <div className="flex flex-col space-y-1.5 p-6 pb-4">
                        <div className="flex items-center gap-3">
                          <Zap className="h-6 w-6 text-[#0B24FB]" />
                          <h2 className="text-xl font-bold text-[#0B24FB]">
                            공과금 (월평균)
                          </h2>
                        </div>
                      </div>
                      <div className="px-16 py-6 space-y-12 pb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            공과금 입력
                          </h3>
                          <p className="text-sm text-gray-600 mb-6">
                            실제 지불한 공과금을 항목별로 입력해주세요
                          </p>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <FormCompose
                                name="cityCost.utilityBills.electricityBill"
                                label="전기요금"
                                control={form.control}
                                render={(field) => (
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="number"
                                      placeholder="예: 80,000"
                                      className="flex-1"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0
                                        )
                                      }
                                    />
                                    <span className="text-gray-600">원</span>
                                  </div>
                                )}
                              />
                            </div>
                            <div>
                              <FormCompose
                                name="cityCost.utilityBills.gasBill"
                                label="가스요금"
                                control={form.control}
                                render={(field) => (
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="number"
                                      placeholder="예: 50,000"
                                      className="flex-1"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0
                                        )
                                      }
                                    />
                                    <span className="text-gray-600">원</span>
                                  </div>
                                )}
                              />
                            </div>
                            <div>
                              <FormCompose
                                name="cityCost.utilityBills.waterBill"
                                label="수도요금"
                                control={form.control}
                                render={(field) => (
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="number"
                                      placeholder="예: 30,000"
                                      className="flex-1"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0
                                        )
                                      }
                                    />
                                    <span className="text-gray-600">원</span>
                                  </div>
                                )}
                              />
                            </div>
                            <div>
                              <FormCompose
                                name="cityCost.utilityBills.etc"
                                label="기타"
                                control={form.control}
                                render={(field) => (
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="number"
                                      placeholder="예: 20,000"
                                      className="flex-1"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0
                                        )
                                      }
                                    />
                                    <span className="text-gray-600">원</span>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Transportation Budget */}
                  {shouldShowSection("transportationExpenses") && (
                    <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                      <div className="flex flex-col space-y-1.5 p-6 pb-4">
                        <div className="flex items-center gap-3">
                          <Bus className="h-6 w-6 text-[#0B24FB]" />
                          <h2 className="text-xl font-bold text-[#0B24FB]">
                            교통비 (월평균)
                          </h2>
                        </div>
                      </div>
                      <div className="px-16 py-6 space-y-12 pb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            주요 교통수단
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            주로 이용한 교통수단을 선택해주세요 (복수 선택 가능)
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {transportTypes.map((type) => (
                              <Button
                                key={type}
                                type="button"
                                variant={
                                  selectedTransportTypes.includes(type)
                                    ? "default"
                                    : "outline"
                                }
                                color={
                                  selectedTransportTypes.includes(type)
                                    ? "neutral"
                                    : "grayscale"
                                }
                                onClick={() => handleTransportTypeToggle(type)}
                                className="rounded-full"
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                        </div>
                        {selectedTransportTypes.length > 0 && (
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              교통수단별 교통비
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              선택한 교통수단별 월평균 비용을 입력해주세요
                            </p>
                            <div className="space-y-4">
                              {selectedTransportTypes.map((type) => {
                                const transportationExpenses =
                                  form.getValues(
                                    "cityCost.transportationExpenses.transportationExpenses"
                                  ) || [];
                                const transportExpense =
                                  transportationExpenses.find(
                                    (te) => te.transportation.name === type
                                  );
                                return (
                                  <div
                                    key={type}
                                    className="flex items-center gap-3"
                                  >
                                    <div className="w-32 text-sm font-medium text-gray-700">
                                      {type}
                                    </div>
                                    <FormCompose
                                      name={`cityCost.transportationExpenses.transportationExpenses.${findTransportationIndex(
                                        type
                                      )}.monthlyCost`}
                                      label=""
                                      control={form.control}
                                      render={(field) => (
                                        <div className="flex items-center gap-3">
                                          <Input
                                            type="number"
                                            placeholder="예: 120,000"
                                            className="flex-1 w-full min-w-0 max-w-none"
                                            {...field}
                                            onChange={(e) => {
                                              const value =
                                                parseFloat(e.target.value) || 0;
                                              field.onChange(value);
                                              updateTransportationExpense(
                                                type,
                                                value
                                              );
                                            }}
                                          />
                                          <span className="text-gray-600">
                                            원
                                          </span>
                                        </div>
                                      )}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Communication Budget */}
                  {shouldShowSection("communicationCost") && (
                    <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                      <div className="flex flex-col space-y-1.5 p-6 pb-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-6 w-6 text-[#0B24FB]" />
                          <h2 className="text-xl font-bold text-[#0B24FB]">
                            통신비 (월평균)
                          </h2>
                        </div>
                      </div>
                      <div className="px-16 py-6 space-y-12 pb-6">
                        {/* Communication Method */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            통신방법
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            이용한 통신방법을 선택해주세요
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {communicationMethods.map((method, index) => (
                              <FormCompose
                                key={method}
                                name="cityCost.communicationCost.communicationMethod.name"
                                label=""
                                control={form.control}
                                render={(field) => (
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      field.onChange(method);
                                      // Reset other fields when method changes
                                      form.setValue(
                                        "cityCost.communicationCost.telecomAgency.name",
                                        ""
                                      );
                                      form.setValue(
                                        "cityCost.communicationCost.communicationPlan.name",
                                        ""
                                      );
                                      form.setValue(
                                        "cityCost.communicationCost.simPurchaseCost",
                                        0
                                      );
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                      field.value === method
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    {method}
                                  </Button>
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Telecom Agency Selection */}
                        <FormCompose
                          name="cityCost.communicationCost.communicationMethod.name"
                          label=""
                          control={form.control}
                          render={(methodField) => {
                            const communicationMethod = methodField.value;
                            if (!communicationMethod) return null;

                            return (
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                  통신사
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  이용한 통신사를 선택하거나 입력해주세요
                                </p>
                                <div className="flex flex-wrap gap-3 mb-4">
                                  {getCarriersByMethod(communicationMethod).map(
                                    (carrier, index) => (
                                      <FormCompose
                                        key={carrier}
                                        name="cityCost.communicationCost.telecomAgency.name"
                                        label=""
                                        control={form.control}
                                        render={(carrierField) => (
                                          <Button
                                            type="button"
                                            onClick={() => {
                                              carrierField.onChange(carrier);
                                              // Set the ID based on the carrier name
                                              const carrierId = index + 1;
                                              form.setValue(
                                                "cityCost.communicationCost.telecomAgency.id",
                                                carrierId
                                              );
                                              setShowCarrierInput(false);
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                              carrierField.value === carrier
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                          >
                                            {carrier}
                                          </Button>
                                        )}
                                      />
                                    )
                                  )}
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setShowCarrierInput(true);
                                      form.setValue(
                                        "cityCost.communicationCost.telecomAgency.name",
                                        ""
                                      );
                                      form.setValue(
                                        "cityCost.communicationCost.telecomAgency.id",
                                        undefined
                                      );
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                                      showCarrierInput
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    <Plus className="w-4 h-4" />
                                    추가
                                  </Button>
                                </div>
                                {showCarrierInput && (
                                  <FormCompose
                                    name="cityCost.communicationCost.telecomAgency.name"
                                    label=""
                                    control={form.control}
                                    render={(field) => (
                                      <input
                                        type="text"
                                        value={field.value || ""}
                                        onChange={(e) =>
                                          field.onChange(e.target.value)
                                        }
                                        placeholder="통신사명을 입력해주세요"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    )}
                                  />
                                )}
                              </div>
                            );
                          }}
                        />

                        {/* Communication Plan */}
                        <FormCompose
                          name="cityCost.communicationCost.communicationMethod.name"
                          label=""
                          control={form.control}
                          render={(methodField) => {
                            const communicationMethod = methodField.value;
                            const shouldShowPlan =
                              communicationMethod &&
                              communicationMethod !== "국내통신사";

                            if (!shouldShowPlan) return null;

                            return (
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                  통신 플랜
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  이용한 통신 플랜을 선택하거나 입력해주세요
                                </p>

                                <div className="flex flex-wrap gap-3 mb-4">
                                  {getPlansByMethod(communicationMethod).map(
                                    (plan, index) => (
                                      <FormCompose
                                        key={plan}
                                        name="cityCost.communicationCost.communicationPlan.name"
                                        label=""
                                        control={form.control}
                                        render={(planField) => (
                                          <Button
                                            type="button"
                                            onClick={() => {
                                              planField.onChange(plan);
                                              // Set the ID based on the plan name
                                              const planId = index + 1;
                                              form.setValue(
                                                "cityCost.communicationCost.communicationPlan.id",
                                                planId
                                              );
                                              setShowPlanInput(false);
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                              planField.value === plan
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                          >
                                            {plan}
                                          </Button>
                                        )}
                                      />
                                    )
                                  )}
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setShowPlanInput(true);
                                      form.setValue(
                                        "cityCost.communicationCost.communicationPlan.name",
                                        ""
                                      );
                                      form.setValue(
                                        "cityCost.communicationCost.communicationPlan.id",
                                        undefined
                                      );
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                                      showPlanInput
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    <Plus className="w-4 h-4" />
                                    추가
                                  </Button>
                                </div>
                                {showPlanInput && (
                                  <FormCompose
                                    name="cityCost.communicationCost.communicationPlan.name"
                                    label=""
                                    control={form.control}
                                    render={(field) => (
                                      <Input
                                        type="text"
                                        value={field.value || ""}
                                        onChange={(e) =>
                                          field.onChange(e.target.value)
                                        }
                                        placeholder="예: 7일 9GB"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    )}
                                  />
                                )}
                              </div>
                            );
                          }}
                        />

                        {/* SIM Purchase Cost */}
                        <FormCompose
                          name="cityCost.communicationCost.communicationMethod.name"
                          label=""
                          control={form.control}
                          render={(methodField) => {
                            const communicationMethod = methodField.value;
                            const shouldShowSimCost =
                              communicationMethod &&
                              communicationMethod !== "국내통신사";

                            if (!shouldShowSimCost) return null;

                            return (
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                  유심/eSIM 구매 비용
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  유심/eSIM 구매 비용을 입력해주세요
                                </p>
                                <div className="flex items-center gap-3">
                                  <FormCompose
                                    name="cityCost.communicationCost.simPurchaseCost"
                                    label=""
                                    control={form.control}
                                    render={(field) => (
                                      <div className="flex items-center gap-3 w-full">
                                        <Input
                                          type="text"
                                          value={
                                            field.value
                                              ? formatNumber(
                                                  field.value.toString()
                                                )
                                              : ""
                                          }
                                          onChange={(e) => {
                                            const value =
                                              e.target.value.replace(
                                                /[^\d]/g,
                                                ""
                                              );
                                            field.onChange(
                                              value ? parseInt(value) : 0
                                            );
                                          }}
                                          placeholder="예: 10,000"
                                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <span className="text-gray-600">
                                          원
                                        </span>
                                      </div>
                                    )}
                                  />
                                </div>
                              </div>
                            );
                          }}
                        />

                        {/* Monthly Cost */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            월평균 통신비
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            실제 지출한 월평균 통신비를 입력해주세요
                          </p>
                          <div className="flex items-center gap-3">
                            <FormCompose
                              name="cityCost.communicationCost.avgMonthlyCost"
                              label=""
                              control={form.control}
                              render={(field) => (
                                <div className="flex items-center gap-3 w-full">
                                  <Input
                                    type="text"
                                    value={
                                      field.value
                                        ? formatNumber(field.value.toString())
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value.replace(
                                        /[^\d]/g,
                                        ""
                                      );
                                      field.onChange(
                                        value ? parseInt(value) : 0
                                      );
                                    }}
                                    placeholder="예: 50,000"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <span className="text-gray-600">원</span>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Food Costs */}
                  {shouldShowSection("foodCost") && (
                    <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg pb-8">
                      <div className="flex flex-col space-y-1.5 p-6 pb-4">
                        <div className="flex items-center gap-3">
                          <Utensils className="h-6 w-6 text-[#0B24FB]" />
                          <h2 className="text-xl font-bold text-[#0B24FB]">
                            식비 (월평균)
                          </h2>
                        </div>
                      </div>
                      <div className="px-16 py-6 space-y-12 pb-6">
                        {/* Food Type Selection */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            식사 스타일
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            주로 이용한 식사 스타일을 선택해주세요 (복수 선택
                            가능)
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {foodTypes.map((type, index) => (
                              <FormCompose
                                key={type}
                                name={`cityCost.foodCost.eatingStyles.${index}.name`}
                                label=""
                                control={form.control}
                                render={(field) => {
                                  return (
                                    <div>
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          const currentStyles =
                                            form.getValues(
                                              "cityCost.foodCost.eatingStyles"
                                            ) || [];
                                          const exists = currentStyles.some(
                                            (s) => s.name === type
                                          );
                                          if (exists) {
                                            const updatedStyles =
                                              currentStyles.filter(
                                                (s) => s.name !== type
                                              );
                                            form.setValue(
                                              "cityCost.foodCost.eatingStyles",
                                              updatedStyles
                                            );
                                            const currentItems =
                                              form.getValues(
                                                "cityCost.foodCost.foodItemPrices"
                                              ) || [];
                                            const foodItemType =
                                              type === "요리"
                                                ? "INGREDIENT"
                                                : "MENU";
                                            const updatedItems =
                                              currentItems.filter(
                                                (item) =>
                                                  item.foodItem.type !==
                                                  foodItemType
                                              );
                                            form.setValue(
                                              "cityCost.foodCost.foodItemPrices",
                                              updatedItems
                                            );
                                          } else {
                                            // Add eating style
                                            const newStyle = {
                                              name: type,
                                              id: index + 1,
                                            };
                                            form.setValue(
                                              "cityCost.foodCost.eatingStyles",
                                              [...currentStyles, newStyle]
                                            );
                                          }
                                          handleEatingStyleToggle(type);
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                          field.value === type
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                      >
                                        {type}
                                      </Button>
                                    </div>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Menu Items for Each Food Type */}
                        <FormCompose
                          name="cityCost.foodCost.eatingStyles"
                          label=""
                          control={form.control}
                          render={(field) => {
                            const eatingStyles = field.value || [];
                            if (eatingStyles.length === 0) return null;
                            return (
                              <>
                                {eatingStyles.map(
                                  (eatingStyle: EatingStyle) => {
                                    const foodItemType =
                                      eatingStyle.name === "요리"
                                        ? "INGREDIENT"
                                        : "MENU";
                                    return (
                                      <div key={eatingStyle.name}>
                                        {selectedEatingStyles.includes(
                                          eatingStyle.name
                                        ) && (
                                          <>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                              {eatingStyle.name === "요리"
                                                ? "요리 재료/가격"
                                                : "외식 메뉴/가격"}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                              {eatingStyle.name === "요리"
                                                ? "자주 구매했던 재료와 가격을 추가해주세요 (선택사항)"
                                                : "자주 먹었던 메뉴와 가격을 추가해주세요 (선택사항)"}
                                            </p>

                                            <div className="flex gap-3 mb-4">
                                              <Input
                                                type="text"
                                                value={
                                                  newMenuItems[eatingStyle.name]
                                                    ?.name || ""
                                                }
                                                onChange={(e) =>
                                                  handleMenuNameChange(
                                                    eatingStyle.name,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={
                                                  eatingStyle.name === "요리"
                                                    ? "재료명"
                                                    : "메뉴명"
                                                }
                                                className="w-60"
                                              />
                                              <Input
                                                type="text"
                                                value={
                                                  newMenuItems[eatingStyle.name]
                                                    ?.price || ""
                                                }
                                                onChange={(e) =>
                                                  handleMenuPriceChange(
                                                    eatingStyle.name,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="가격"
                                                className="flex-1"
                                              />
                                              <span className="flex items-center text-gray-600">
                                                원
                                              </span>
                                              <Button
                                                onClick={() =>
                                                  addMenuItem(
                                                    eatingStyle.name,
                                                    foodItemType
                                                  )
                                                }
                                                disabled={
                                                  !newMenuItems[
                                                    eatingStyle.name
                                                  ]?.name ||
                                                  !newMenuItems[
                                                    eatingStyle.name
                                                  ]?.price
                                                }
                                                variant="outline"
                                                className="px-4 py-3"
                                              >
                                                추가
                                              </Button>
                                            </div>

                                            <FormCompose
                                              name="cityCost.foodCost.foodItemPrices"
                                              label=""
                                              control={form.control}
                                              render={(itemsField) => {
                                                const foodItemPrices =
                                                  itemsField.value || [];
                                                const itemsForType =
                                                  foodItemPrices.filter(
                                                    (item: FoodItemPrice) =>
                                                      item.foodItem.type ===
                                                      foodItemType
                                                  );
                                                if (itemsForType.length === 0)
                                                  return null;
                                                return (
                                                  <div className="space-y-2">
                                                    <h4 className="font-medium text-gray-900">
                                                      추가된{" "}
                                                      {eatingStyle.name ===
                                                      "요리"
                                                        ? "재료"
                                                        : "메뉴"}
                                                    </h4>
                                                    {itemsForType.map(
                                                      (
                                                        item: FoodItemPrice,
                                                        index: number
                                                      ) => (
                                                        <div
                                                          key={index}
                                                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                                        >
                                                          <span className="text-gray-700">
                                                            {item.foodItem.name}
                                                          </span>
                                                          <div className="flex items-center gap-3">
                                                            <span className="text-gray-600">
                                                              {formatNumber(
                                                                item.price.toString()
                                                              )}
                                                              원
                                                            </span>
                                                            <Button
                                                              onClick={() =>
                                                                removeMenuItem(
                                                                  eatingStyle.name,
                                                                  foodItemType,
                                                                  index
                                                                )
                                                              }
                                                              variant="ghost"
                                                              color="destructive"
                                                              size="icon"
                                                              className="p-1"
                                                            >
                                                              <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                          </div>
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                );
                                              }}
                                            />
                                          </>
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </>
                            );
                          }}
                        />

                        {/* Total Monthly Food Cost */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            월 식비
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            실제 지출한 월평균 식비를 입력해주세요
                          </p>
                          <div className="flex items-center gap-3">
                            <FormCompose
                              name="cityCost.foodCost.avgMonthlyCost"
                              label=""
                              control={form.control}
                              render={(field) => (
                                <div className="flex items-center gap-3 w-full">
                                  <input
                                    type="text"
                                    value={
                                      field.value
                                        ? formatNumber(field.value.toString())
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value.replace(
                                        /[^\d]/g,
                                        ""
                                      );
                                      field.onChange(
                                        value ? parseInt(value) : 0
                                      );
                                    }}
                                    placeholder="예: 600,000"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <span className="text-gray-600">원</span>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Total Budget */}
                  {shouldShowSection("totalCost") && (
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
                            월세, 공과금, 교통비, 통신비, 식비 등을 모두 포함한
                            총 비용을 입력해주세요
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
                  loading={contributeCityMutation.isPending}
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
                    if (accommodationType) exp += 20;
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
