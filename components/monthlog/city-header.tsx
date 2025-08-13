// components/monthlog/city-header.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronDown, Bookmark, Share2 } from 'lucide-react';

interface CityHeaderProps {
  cityName: string;
  countryName: string;
}

export default function CityHeader({ cityName, countryName }: CityHeaderProps) {
  return (
    <header className="bg-white/80 border-b border-gray-100 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 relative">
          {/* Back Button */}
          <Link href="/monthlog">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-8 px-2 sm:h-10 sm:px-4 py-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">홈으로</span>
            </button>
          </Link>

          {/* City Selector - Responsive */}
          <div className="absolute left-1/2 transform -translate-x-1/2 sm:relative sm:left-auto sm:transform-none sm:pl-28">
            <button className="flex items-center space-x-1 sm:space-x-2 text-base sm:text-lg font-bold text-gray-900 transition-colors">
              <span className="text-sm sm:text-base">
                {cityName} / {countryName}
              </span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200" />
            </button>
          </div>

          {/* Action Buttons - Mobile hidden, tablet+ visible */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-8 lg:h-10 px-2 lg:px-4 py-2 border-gray-200 bg-transparent border hover:bg-accent">
              <Bookmark className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">저장</span>
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-8 lg:h-10 px-2 lg:px-4 py-2 border-gray-200 bg-transparent border hover:bg-accent">
              <Share2 className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">공유</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
