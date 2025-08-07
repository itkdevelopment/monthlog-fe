"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import InternetSpeedInput from "../workation-inputs/internet-speed-input"

interface InternetSpeedPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function InternetSpeedPanel({ isOpen, onClose }: InternetSpeedPanelProps) {
  const [inputSpeed, setInputSpeed] = useState("")
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(null)

  const speedDistribution = [
    { range: "0-10", count: 5, percentage: 5 },
    { range: "10-30", count: 12, percentage: 12 },
    { range: "30-50", count: 25, percentage: 25 },
    { range: "50-100", count: 35, percentage: 35 },
    { range: "100-200", count: 18, percentage: 18 },
    { range: "200+", count: 5, percentage: 5 },
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        className="fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl flex flex-col h-[95vh] z-50"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">인터넷 평균 속도 75Mbps</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">100명이 기여한 정보</span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          <div className="w-[30%] bg-gray-50 border-r-2 border-gray-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  와이파이 속도 만족도 7.2점
                </h3>
                <div className="space-y-4">
                  {[
                    { range: "1-2점", count: 3, percentage: 3 },
                    { range: "3-4점", count: 8, percentage: 8 },
                    { range: "5-6점", count: 15, percentage: 15 },
                    { range: "7-8점", count: 45, percentage: 45 },
                    { range: "9-10점", count: 29, percentage: 29 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.range}</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">속도별 분포</h3>
                <div className="space-y-4">
                  {speedDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{item.range}Mbps</span>
                        <span className="text-gray-500">{item.count}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%`, backgroundColor: "#0B24FB" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] bg-white overflow-y-auto">
            <div className="px-16 py-6 space-y-8 pb-24">
              <InternetSpeedInput
                onSpeedChange={setInputSpeed}
                inputSpeed={inputSpeed}
                onSatisfactionChange={setSatisfactionScore}
                satisfactionScore={satisfactionScore}
              />

              <div className="pt-6">
                <button
                  disabled={!inputSpeed || !satisfactionScore}
                  className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 py-3 font-medium rounded-lg transition-colors"
                >
                  개척하기 (+10 EXP)
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
