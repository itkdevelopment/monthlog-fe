// components/monthlog/city-hero-section.tsx
"use client";

import { Pen } from "lucide-react";

interface CityHeroSectionProps {
  city: string;
  description: string;
  image: string;
  // tags: string[];
}

export default function CityHeroSection({
  city,
  description,
  image,
  // tags,
}: CityHeroSectionProps) {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-6 sm:mb-8">
      <div className="relative h-48 sm:h-64">
        <img
          src={image}
          alt={`${city} 풍경`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Edit Button - Responsive */}
        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20 cursor-pointer z-10">
          <Pen className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </button>

        {/* Content Overlay - Responsive */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-4 sm:mt-8 px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white text-center drop-shadow-lg">
            {city}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white text-center opacity-90 mb-4 sm:mb-6 drop-shadow-md max-w-sm sm:max-w-none">
            {description}
          </p>

          {/* Tags - Responsive */}
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center max-w-xs sm:max-w-none">
            {/* {(tags ?? []).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 sm:px-3 sm:py-1 backdrop-blur-sm bg-white/20 text-white text-xs sm:text-sm font-medium rounded-full"
              >
                #{tag}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
