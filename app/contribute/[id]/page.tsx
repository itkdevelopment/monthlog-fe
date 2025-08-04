"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Star, MapPin, DollarSign, Wifi, Home, Car, Shield, Heart } from "lucide-react"

interface ContributionData {
  category: string
  subcategory: string
  value: string | number
  description: string
  source?: string
  confidence: number
}

const categories = [
  {
    id: "cost",
    name: "비용 정보",
    icon: <DollarSign className="h-5 w-5" />,
    subcategories: ["숙박비", "식비", "교통비", "통신비", "기타 생활비"],
  },
  {
    id: "accommodation",
    name: "숙박 정보",
    icon: <Home className="h-5 w-5" />,
    subcategories: ["에어비앤비", "호텔", "게스트하우스", "장기임대", "코워킹 스페이스"],
  },
  {
    id: "transport",
    name: "교통 정보",
    icon: <Car className="h-5 w-5" />,
    subcategories: ["대중교통", "택시", "렌터카", "자전거", "도보"],
  },
  {
    id: "internet",
    name: "인터넷/통신",
    icon: <Wifi className="h-5 w-5" />,
    subcategories: ["와이파이 속도", "통신사", "데이터 요금", "카페 와이파이", "코워킹 스페이스"],
  },
  {
    id: "safety",
    name: "안전/의료",
    icon: <Shield className="h-5 w-5" />,
    subcategories: ["치안", "의료시설", "응급상황", "보험", "약국"],
  },
  {
    id: "lifestyle",
    name: "생활/문화",
    icon: <Heart className="h-5 w-5" />,
    subcategories: ["음식", "쇼핑", "엔터테인먼트", "언어", "현지인 친화도"],
  },
]

export default function ContributePage() {
  const params = useParams()
  const router = useRouter()
  const cityId = params.id as string

  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [formData, setFormData] = useState<ContributionData>({
    category: "",
    subcategory: "",
    value: "",
    description: "",
    source: "",
    confidence: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory("")
    setFormData((prev) => ({ ...prev, category: categoryId, subcategory: "" }))
  }

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory)
    setFormData((prev) => ({ ...prev, subcategory }))
  }

  const handleInputChange = (field: keyof ContributionData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.category || !formData.subcategory || !formData.value || !formData.description) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("기여해주셔서 감사합니다! 검토 후 반영됩니다.")
    router.push(`/city/${cityId}`)
  }

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>돌아가기</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">데이터 기여하기</h1>
            <p className="text-gray-600 flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{cityId} 도시 정보</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>카테고리 선택</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                      selectedCategory === category.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          selectedCategory === category.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>정보 입력</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subcategory Selection */}
                {selectedCategoryData && (
                  <div>
                    <Label className="text-base font-medium">세부 카테고리</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {selectedCategoryData.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategorySelect(subcategory)}
                          className={`p-2 rounded-md border text-sm transition-colors ${
                            selectedSubcategory === subcategory
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Value Input */}
                {selectedSubcategory && (
                  <>
                    <div>
                      <Label htmlFor="value" className="text-base font-medium">
                        값/정보 *
                      </Label>
                      <Input
                        id="value"
                        placeholder="예: 50000원, 매우 좋음, 10Mbps 등"
                        value={formData.value}
                        onChange={(e) => handleInputChange("value", e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base font-medium">
                        상세 설명 *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="경험한 내용을 자세히 설명해주세요..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="source" className="text-base font-medium">
                        정보 출처 (선택)
                      </Label>
                      <Input
                        id="source"
                        placeholder="예: 직접 경험, 현지인 추천, 웹사이트 등"
                        value={formData.source}
                        onChange={(e) => handleInputChange("source", e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-medium">신뢰도</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} onClick={() => handleInputChange("confidence", rating)} className="p-1">
                            <Star
                              className={`h-6 w-6 ${
                                rating <= formData.confidence ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{formData.confidence}/5</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full" size="lg">
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>제출 중...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Upload className="h-4 w-4" />
                            <span>기여하기</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">기여 가이드라인</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      1
                    </Badge>
                    <p>정확하고 최신의 정보를 제공해주세요.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      2
                    </Badge>
                    <p>개인적인 경험을 바탕으로 한 구체적인 정보가 도움됩니다.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      3
                    </Badge>
                    <p>가격 정보는 시기와 조건을 명시해주세요.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      4
                    </Badge>
                    <p>모든 기여는 검토 후 반영되며, 부정확한 정보는 제외될 수 있습니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
