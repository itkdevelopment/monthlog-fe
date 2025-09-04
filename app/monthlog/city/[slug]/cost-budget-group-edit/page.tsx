// app/monthlog/cost-budget-group-edit/page.tsx
"use client";
import { useState, useEffect } from "react";
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
import { CostData } from "@/types/monthlog/city-detail";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormCompose } from "@/components/monthlog-proto/ui/form";

interface Item {
  id: string;
  name: string;
  price: string;
}

interface Activity {
  id: string;
  name: string;
  price: string;
  link?: string;
  companions: string[];
  categories: string[];
}

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
  cityName: string;
  initialData?: CostData | null;
  cityId: number | null;
  onSave?: (data: CostData) => void;
}

export default function CostBudgetGroupEditPage({
  isOpen,
  onClose,
  cityName,
  initialData,
  cityId,
  onSave,
}: CostEditModalProps) {
  // Static data for selections
  const accommodationTypes = [
    "아파트",
    "단독주택",
    "호텔",
    "게스트하우스",
    "에어비앤비",
  ];
  const roomCounts = ["원룸", "투룸", "쓰리룸", "스튜디오"];
  const accommodationFeatures = [
    "#수영장",
    "#주방있음",
    "#세탁기",
    "#주차가능",
    "#바다뷰",
    "#산뷰",
    "#도심위치",
  ];
  const transportMethods = [
    "대중교통",
    "렌터카",
    "택시",
    "도보/자전거",
    "기타",
  ];
  const communicationMethods = [
    "현지유심구매",
    "공항유심구매",
    "한국에서유심구매",
    "로밍",
    "이심",
    "국내통신사",
  ];
  const telecomCompanies = ["제주텔레콤", "KT", "SKT", "LG U+"];
  const planNames = ["7일 9GB", "15일 5GB", "30일 무제한"];
  const mealStyles = ["요리", "외식"];
  const activityCompanions = ["혼자서", "아이랑", "연인과", "친구와", "가족과"];
  const activityCategories = [
    "박물관/미술관",
    "서핑/하이킹",
    "쿠킹클래스",
    "카페투어",
    "공연관람",
    "무료체험",
  ];
  const commonItems = [
    "커피",
    "맥주",
    "상수",
    "라면",
    "김밥",
    "치킨",
    "피자",
    "버스요금",
    "택시기본요금",
  ];

  const [accommodationRecommendations] = useState<
    AccommodationRecommendation[]
  >([
    {
      id: "1",
      name: "[제주 오션뷰 아파트] 바다가 보이는 깨끗한 숙소",
      likes: 24,
      isSelected: true,
      comment: "",
      link: "",
    },
    {
      id: "2",
      name: "[한라산 근처 게스트하우스] 등산하기 좋은 위치",
      likes: 18,
      isSelected: true,
      comment: "",
      link: "",
    },
    {
      id: "3",
      name: "[제주시 중심가 원룸] 교통이 편리하고 시설 좋음",
      likes: 32,
      isSelected: false,
      comment: "",
      link: "",
    },
  ]);

  // Initialize form
  const form = useForm({
    defaultValues: {
      priceStatisfaction: 8,
      stayPeriod: "",
      peopleCount: 1,
      cookingAvailable: "",
      accommodationType: "",
      customAccommodationType: "",
      roomCount: "",
      customRoomCount: "",
      accommodationFeatures: [] as string[],
      customAccommodationFeature: "",
      monthlyRent: "",
      deposit: "",
      brokerFee: "",
      essentialItems: [] as Item[],
      newItemName: "",
      newItemPrice: "",
      electricity: "",
      gas: "",
      water: "",
      other: "",
      transportMethods: [] as string[],
      transportCosts: {} as Record<string, string>,
      communicationMethod: "",
      telecomCompany: "",
      customTelecomCompany: "",
      planName: "",
      customPlanName: "",
      purchaseCost: "",
      monthlyCommunicationCost: "",
      mealStyles: [] as string[],
      menuItems: [] as Item[],
      newMenuName: "",
      newMenuPrice: "",
      monthlyFoodCost: "",
      activities: [] as Activity[],
      monthlyActivityCost: "",
      selectedItems: [] as string[],
      localPriceItems: {} as Record<string, Item[]>,
      startDate: "",
      endDate: "",
      totalBudget: "",
    },
  });

  const {
    fields: essentialItemsFields,
    append: appendEssentialItem,
    remove: removeEssentialItem,
  } = useFieldArray({
    control: form.control,
    name: "essentialItems",
  });

  // Initialize form data when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...form.getValues(),
        priceStatisfaction: initialData.costSatisfactionScore || 8,
        monthlyRent: initialData.monthlyRent || "",
        deposit: initialData.housingDeposit || "",
        totalBudget: initialData.totalEstimatedCost || "",
      });
    }
  }, [initialData, form]);

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // Calculate EXP based on filled fields
    let exp = 0;
    if (data.priceStatisfaction) exp += 50;
    if (data.monthlyRent) exp += 30;
    if (data.accommodationType) exp += 20;
    if (data.deposit || data.brokerFee) exp += 40;
    if (data.electricity || data.gas || data.water) exp += 30;
    if (data.transportMethods.length > 0) exp += 40;
    if (data.communicationMethod) exp += 30;
    if (data.mealStyles.length > 0) exp += 30;
    if (data.monthlyFoodCost) exp += 20;
    if (data.selectedItems.length > 0) exp += 50;
    if (data.totalBudget) exp += 50;
    if (data.startDate && data.endDate) exp += 40;
    alert(`한번에 개척하기 완료! (+${exp} EXP)`);
    onClose(); // Close modal after submission
  };

  // Handle multi-select toggle
  const handleMultiSelectToggle = (fieldName: string, value: string) => {
    const currentValues = form.getValues(fieldName) as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    form.setValue(fieldName, newValues);
  };

  // Handle adding item to a list
  const handleAddItem = (
    listField: string,
    nameField: string,
    priceField: string
  ) => {
    const name = form.getValues(nameField) as string;
    const price = form.getValues(priceField) as string;
    if (name.trim() && price.trim()) {
      const newItem: Item = {
        id: Date.now().toString(),
        name: name.trim(),
        price: price.trim(),
      };
      const currentItems = form.getValues(listField) as Item[];
      form.setValue(listField, [...currentItems, newItem]);
      form.setValue(nameField, "");
      form.setValue(priceField, "");
    }
  };

  // Handle removing item from a list
  const handleRemoveItem = (listField: string, itemId: string) => {
    const currentItems = form.getValues(listField) as Item[];
    form.setValue(
      listField,
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  // Handle adding activity
  const handleAddActivity = () => {
    console.log("Add activity");
  };

  // Handle overlay click to close modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Return null if modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white"
      onClick={handleOverlayClick}
    >
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
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    상세페이지로
                  </button>
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
                            <button
                              key={score}
                              type="button"
                              onClick={() =>
                                form.setValue("priceStatisfaction", score)
                              }
                              className={`h-16 rounded-lg font-bold text-lg transition-colors ${
                                form.watch("priceStatisfaction") === score
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {score}점
                            </button>
                          ))}
                        </div>
                        {form.watch("priceStatisfaction") && (
                          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-blue-800">
                              선택한 점수:{" "}
                              <strong>
                                {form.watch("priceStatisfaction")}점
                              </strong>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Accommodation Monthly Rent */}
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
                            name="stayPeriod"
                            label="체류 시기"
                            control={form.control}
                            render={(field) => (
                              <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              >
                                <option value="">선택하세요</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <option key={i + 1} value={`${i + 1}월`}>
                                    {i + 1}월
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                        </div>
                        <div>
                          <FormCompose
                            name="peopleCount"
                            label="머문 인원 수"
                            control={form.control}
                            render={({ field }) => (
                              <input
                                type="number"
                                min="1"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <FormCompose
                            name="cookingAvailable"
                            label="발품가능여부"
                            control={form.control}
                            render={(field) => (
                              <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              >
                                <option value="">선택하세요</option>
                                <option value="가능">가능</option>
                                <option value="불가능">불가능</option>
                              </select>
                            )}
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
                          {accommodationTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                form.setValue("accommodationType", type)
                              }
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                form.watch("accommodationType") === type
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <FormCompose
                            name="customAccommodationType"
                            label=""
                            control={form.control}
                            render={({ field }) => (
                              <input
                                type="text"
                                placeholder="직접 입력"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              />
                            )}
                          />
                          <button
                            type="button"
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={
                              !form.watch("customAccommodationType").trim()
                            }
                            onClick={() => {
                              if (
                                form.watch("customAccommodationType").trim()
                              ) {
                                form.setValue(
                                  "accommodationType",
                                  form.watch("customAccommodationType")
                                );
                                form.setValue("customAccommodationType", "");
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
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
                          {roomCounts.map((count) => (
                            <button
                              key={count}
                              type="button"
                              onClick={() => form.setValue("roomCount", count)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                form.watch("roomCount") === count
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {count}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <FormCompose
                            name="customRoomCount"
                            label=""
                            control={form.control}
                            render={({ field }) => (
                              <input
                                type="text"
                                placeholder="직접 입력"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              />
                            )}
                          />
                          <button
                            type="button"
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={!form.watch("customRoomCount").trim()}
                            onClick={() => {
                              if (form.watch("customRoomCount").trim()) {
                                form.setValue(
                                  "roomCount",
                                  form.watch("customRoomCount")
                                );
                                form.setValue("customRoomCount", "");
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
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
                          {accommodationFeatures.map((feature) => (
                            <button
                              key={feature}
                              type="button"
                              onClick={() =>
                                handleMultiSelectToggle(
                                  "accommodationFeatures",
                                  feature
                                )
                              }
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                form
                                  .watch("accommodationFeatures")
                                  .includes(feature)
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {feature}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <FormCompose
                            name="customAccommodationFeature"
                            label=""
                            control={form.control}
                            render={({ field }) => (
                              <input
                                type="text"
                                placeholder="직접 입력 (예: #와이파이)"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              />
                            )}
                          />
                          <button
                            type="button"
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={
                              !form.watch("customAccommodationFeature").trim()
                            }
                            onClick={() => {
                              if (
                                form.watch("customAccommodationFeature").trim()
                              ) {
                                const feature = form
                                  .watch("customAccommodationFeature")
                                  .startsWith("#")
                                  ? form.watch("customAccommodationFeature")
                                  : `#${form.watch(
                                      "customAccommodationFeature"
                                    )}`;
                                const currentFeatures = form.watch(
                                  "accommodationFeatures"
                                );
                                form.setValue("accommodationFeatures", [
                                  ...currentFeatures,
                                  feature,
                                ]);
                                form.setValue("customAccommodationFeature", "");
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
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
                            name="monthlyRent"
                            label=""
                            control={form.control}
                            render={({ field }) => (
                              <input
                                type="number"
                                placeholder="예: 150"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              />
                            )}
                          />
                          <span className="text-gray-600">만원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Initial Settlement Costs */}
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
                              name="deposit"
                              label="보증금"
                              control={form.control}
                              render={({ field }) => (
                                <div className="flex items-center gap-3">
                                  <input
                                    type="number"
                                    placeholder="예: 50"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...field}
                                  />
                                  <span className="text-gray-600">만원</span>
                                </div>
                              )}
                            />
                          </div>
                          <div>
                            <FormCompose
                              name="brokerFee"
                              label="중개수수료"
                              control={form.control}
                              render={({ field }) => (
                                <div className="flex items-center gap-3">
                                  <input
                                    type="number"
                                    placeholder="예: 15"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...field}
                                  />
                                  <span className="text-gray-600">만원</span>
                                </div>
                              )}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              필수 비품 구매비
                            </label>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <div className="flex items-center gap-2">
                                <FormCompose
                                  name="newItemName"
                                  label=""
                                  control={form.control}
                                  render={({ field }) => (
                                    <input
                                      type="text"
                                      placeholder="비품명"
                                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                      {...field}
                                    />
                                  )}
                                />
                                <FormCompose
                                  name="newItemPrice"
                                  label=""
                                  control={form.control}
                                  render={({ field }) => (
                                    <input
                                      type="text"
                                      placeholder="가격"
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                      {...field}
                                    />
                                  )}
                                />
                                <span className="text-gray-600 text-sm">
                                  원
                                </span>
                                <button
                                  type="button"
                                  className="w-8 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
                                  disabled={
                                    !form.watch("newItemName").trim() ||
                                    !form.watch("newItemPrice").trim()
                                  }
                                  onClick={() =>
                                    handleAddItem(
                                      "essentialItems",
                                      "newItemName",
                                      "newItemPrice"
                                    )
                                  }
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
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
                                  <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeEssentialItem(index)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Total Budget */}
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
                              name="startDate"
                              label="시작일"
                              control={form.control}
                              render={({ field }) => (
                                <input
                                  type="date"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <div>
                            <FormCompose
                              name="endDate"
                              label="종료일"
                              control={form.control}
                              render={({ field }) => (
                                <input
                                  type="date"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            name="totalBudget"
                            label=""
                            control={form.control}
                            render={({ field }) => (
                              <input
                                type="text"
                                placeholder="예: 2,000,000"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...field}
                              />
                            )}
                          />
                          <span className="text-gray-600">원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            {/* Fixed Bottom Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent">
              <div className="max-w-md mx-auto">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full py-4 text-lg font-semibold transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: "rgb(11, 36, 251)",
                    color: "white",
                    borderRadius: "9999px",
                  }}
                >
                  한번에 개척하기 (+
                  {(() => {
                    let exp = 0;
                    if (form.watch("priceStatisfaction")) exp += 50;
                    if (form.watch("monthlyRent")) exp += 30;
                    if (form.watch("accommodationType")) exp += 20;
                    if (form.watch("deposit") || form.watch("brokerFee"))
                      exp += 40;
                    if (form.watch("startDate") && form.watch("endDate"))
                      exp += 40;
                    if (form.watch("totalBudget")) exp += 50;
                    return exp;
                  })()}{" "}
                  EXP)
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}