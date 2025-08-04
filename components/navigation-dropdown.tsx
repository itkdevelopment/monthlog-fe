"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

interface NavigationDropdownProps {
  isOpen: boolean
  navItems: Array<{
    label: string
    ref: React.RefObject<HTMLDivElement>
  }>
  onScrollToSection: (ref: React.RefObject<HTMLDivElement>) => void
}

export function NavigationDropdown({ isOpen, navItems, onScrollToSection }: NavigationDropdownProps) {
  // 각 메뉴 항목에 대응하는 이모지 매핑
  const getEmojiForLabel = (label: string) => {
    switch (label) {
      case "도시프로필 (맨 위로)":
        return "" // 이모지 없음
      case "이 도시, 나랑 맞을까?":
        return "" // 이모지 없음
      case "한달살기 비용":
        return "💰"
      case "디지털/업무 환경":
        return "💻"
      case "안전 및 의료":
        return "🏥"
      case "거주 환경 디테일":
        return "🏠"
      case "현지생활 편의성":
        return "🛒"
      case "교통 및 이동":
        return "🚗"
      case "로컬 경험&커뮤니티":
        return "🌟"
      case "기본 정보":
        return "🌐"
      case "추천 ↔ 피해야하는 시기":
        return "📅"
      case "도시 분위기":
        return "✨"
      default:
        return ""
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            marginLeft: "-130px", // 왼쪽으로 130px 이동
          }}
        >
          <div className="py-2">
            {navItems.map((item, index) => {
              const emoji = getEmojiForLabel(item.label)
              return (
                <button
                  key={index}
                  onClick={() => onScrollToSection(item.ref)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  {emoji && <span className="mr-2">{emoji}</span>}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
