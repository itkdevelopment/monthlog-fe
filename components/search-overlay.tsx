"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export function SearchOverlay({ isOpen, onClose, onSearch }: SearchOverlayProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleSearch = () => {
    onSearch(query)
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="search-overlay active"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">어떤 도시로 떠나볼까요?</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="도시명을 입력하세요..."
                className="pl-12 pr-4 py-4 text-lg border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                autoFocus
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleSearch} className="flex-1 primary-btn text-white py-3 rounded-2xl font-medium">
                검색하기
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="px-6 py-3 border-gray-200 rounded-2xl bg-transparent"
              >
                취소
              </Button>
            </div>

            {/* 인기 검색어 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">인기 검색어</p>
              <div className="flex flex-wrap gap-2">
                {["제주도", "치앙마이", "리스본", "부산", "강릉"].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setQuery(keyword)
                      onSearch(keyword)
                      onClose()
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
