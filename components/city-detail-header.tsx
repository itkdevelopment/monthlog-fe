"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bookmark, Share2, ChevronDown } from "lucide-react"
import Link from "next/link"
import { NavigationDropdown } from "./navigation-dropdown"

interface CityDetailHeaderProps {
  cityName: string
  countryName: string
  scrolled: boolean
  navItems: Array<{
    label: string
    ref: React.RefObject<HTMLDivElement>
  }>
  onScrollToSection: (ref: React.RefObject<HTMLDivElement>) => void
}

export function CityDetailHeader({
  cityName,
  countryName,
  scrolled,
  navItems,
  onScrollToSection,
}: CityDetailHeaderProps) {
  const [showNavDropdown, setShowNavDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNavDropdown(false)
      }
    }

    if (showNavDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNavDropdown])

  return (
    <header
      className={`${scrolled ? "bg-white/80 border-b border-gray-100" : "bg-transparent border-b border-transparent"} backdrop-blur-sm sticky top-0 z-40`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로
            </Button>
          </Link>

          {/* 네비게이션 드롭다운 - 왼쪽 패딩 110px 적용 */}
          <div className="relative" style={{ paddingLeft: "110px" }} ref={dropdownRef}>
            <button
              onClick={() => setShowNavDropdown(!showNavDropdown)}
              className="flex items-center space-x-2 text-lg font-bold text-gray-900 transition-colors"
            >
              <span>
                {cityName} / {countryName}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${showNavDropdown ? "rotate-180" : ""}`}
              />
            </button>

            <NavigationDropdown
              isOpen={showNavDropdown}
              navItems={navItems}
              onScrollToSection={(ref) => {
                onScrollToSection(ref)
                setShowNavDropdown(false)
              }}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-200 bg-transparent">
              <Bookmark className="h-4 w-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" className="border-gray-200 bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
