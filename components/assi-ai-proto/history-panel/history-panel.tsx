"use client"
import { Card, CardContent } from "@/components/assi-ai-proto/ui/card"
import { Menu, ChevronRight } from "lucide-react"

interface HistoryPanelProps {
  showHistory: boolean
  setShowHistory: (show: boolean) => void
  history: any[]
  loadFromHistory: (item: any) => void
}

export default function HistoryPanel({ showHistory, setShowHistory, history, loadFromHistory }: HistoryPanelProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-30 ${
        showHistory ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 sr-only">이전 검색 목록</h2>
      </div>
      <div className="px-6 pb-6 pt-12 overflow-y-auto h-[calc(100vh-80px)]">
        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Menu className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>아직 저장된 목록이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-all bg-gray-50 hover:bg-gray-100"
                onClick={() => loadFromHistory(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.date} • 단계:{" "}
                        {item.step === "question"
                          ? "질문"
                          : item.step === "search"
                            ? "선택"
                            : item.step === "compare"
                              ? "비교"
                              : item.step === "plan"
                                ? "계획서"
                                : "완성"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">선택된 프로그램: {item.selectedPrograms.length}개</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
