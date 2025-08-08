import ContributorIndicators from './contributor-indicator';
import { DollarSign, Wifi, Wind, Volume2, Users, Plus } from 'lucide-react';

interface CityCardProps {
  city: string;
  country: string;
  image: string;
  tags?: string[];
  costRange?: string;
  livingCost?: number;
  safety?: number;
  culture?: number;
  likes?: number;
  // New props for data collection state
  contributorCount?: number;
  contributors?: { id: string; name: string; avatar?: string }[]; // Array of contributors
  className?: string;
  onClick?: () => void;
  onRecord?: () => void;
  onTagClick?: (tag: string) => void;
}

const CityCard = ({
  city,
  country,
  image,
  tags = [],
  costRange,
  livingCost,
  likes,
  contributorCount = 0,
  contributors = [],
  className = '',
  onClick,
  onRecord,
  onTagClick,
}: CityCardProps) => {
  // Determine message based on contributor count
  const getContributorMessage = () => {
    if (contributorCount === 0) return '첫번째 개척자가 되어주세요!';
    if (contributorCount === 1) return '두번째 개척자가 되어주세요!';
    if (contributorCount === 2) return '마지막 개척자가 되어주세요!';
    return '';
  };

  // Generate contributor avatars with overlap
  const renderContributors = () => {
    const maxVisible = 3;
    const visibleContributors = contributors.slice(0, maxVisible);
    const remainingCount = contributorCount - maxVisible;

    return (
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {visibleContributors.map((contributor, index) => (
            <div
              key={contributor.id}
              className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-medium text-blue-600"
              style={{ zIndex: maxVisible - index }}
            >
              {contributor.avatar ? (
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                contributor.name.charAt(0).toUpperCase()
              )}
            </div>
          ))}
          {remainingCount > 0 && (
            <div
              className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600"
              style={{ zIndex: 0 }}
            >
              +{remainingCount}
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-700">+{likes}명</span>
      </div>
    );
  };

  const isActive = contributors.length >= 3;

  return (
    <div
      className={`glass-card cursor-pointer group relative overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${className}`}
      onClick={onClick}
    >
      {/* Image Section - Top Half */}
      <div
        className="relative h-44 bg-cover bg-center overflow-hidden rounded-2xl mb-5"
        style={{
          backgroundImage: isActive
            ? `url(${image})`
            : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />

        {/* Tags only for active cities */}
        {isActive && tags && tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <button
                key={index}
                onClick={e => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium rounded-full border border-white/20 hover:bg-black/80 hover:scale-105 transition-all duration-200 active:scale-95"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* City Name Overlay - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-2xl font-bold text-white text-shadow-gray-700  drop-shadow-lg mb-1">
            {city}
          </h3>
          <p className="text-sm text-white/90 drop-shadow font-medium">
            {country}
          </p>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <div className="bg-white">
        {isActive ? (
          /* Active City Content - Full Stats */
          <>
            {/* Stats Grid */}
            <div className="space-y-4 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="font-thin w-5 h-5" />
                  <span className="text-sm font-medium ">한달살기 비용</span>
                </div>
                <span className="text-sm text-blue-600 font-semibold">
                  {costRange}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 " />
                  <span className="text-sm font-medium text-gray-700">
                    인터넷 속도
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {livingCost} Mbps
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 " />
                  <span className="text-sm font-medium ">대기질</span>
                </div>
                <span className="text-sm font-semibold ">매우 좋음</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  <span className="text-sm font-medium ">소음 수준</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  조용함
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-5" />

            {/* Contributors Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 " />
                <span className="text-sm font-medium ">참여자</span>
              </div>
              {renderContributors()}
            </div>
          </>
        ) : (
          /* Data Collection State - Center Content */
          <div className="flex flex-col items-center justify-center py-4 text-center">
            {/* Contributor indicators using new component */}
            <ContributorIndicators
              contributorCount={contributors.length}
              className="mb-6"
            />

            {/* Message */}
            <p className="text-sm font-medium mb-6 text-gray-700 leading-relaxed max-w-xs">
              {getContributorMessage()}
            </p>

            {/* Record button */}
            <button
              onClick={e => {
                e.stopPropagation();
                onRecord?.();
              }}
              className="primary-btn text-white px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />내 경험 기록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityCard;
