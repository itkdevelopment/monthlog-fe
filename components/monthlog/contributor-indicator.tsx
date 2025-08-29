interface ContributorIndicatorsProps {
  contributorCount: number;
  maxContributors?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ContributorIndicators = ({
  contributorCount,
  maxContributors = 3,
  size = 'md',
  className = '',
}: ContributorIndicatorsProps) => {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', inner: 'w-4 h-4' },
    md: { container: 'w-10 h-10', inner: 'w-6 h-6' },
    lg: { container: 'w-12 h-12', inner: 'w-8 h-8' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {[...Array(maxContributors)].map((_, index) => {
        const isFilled = index < contributorCount;

        return (
          <div
            key={index}
            className={`${
              currentSize.container
            } rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isFilled
                ? 'bg-blue-100 border-blue-500 scale-110'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            {isFilled ? (
              <div
                className={`${currentSize.inner} bg-blue-500 rounded-full shadow-sm`}
              />
            ) : (
              <div
                className={`${currentSize.inner} border-2 border-dashed border-gray-400 rounded-full`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContributorIndicators;
