// components/monthlog/shared/circular-progress.tsx
interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function CircularProgress({
  value,
  max,
  size = 100,
  strokeWidth = 10,
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(11, 36, 251, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#141414"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(rgba(11, 36, 251, 0.3) 0px 2px 8px)',
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-xs text-gray-500">/ {max}</span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 text-center -mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
