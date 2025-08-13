// components/monthlog/shared/section-card.tsx
import { ReactNode } from 'react';
import EditButton from './edit-button';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  children: ReactNode;
  onEdit?: () => void;
}

export default function SectionCard({
  title,
  subtitle,
  emoji,
  children,
  onEdit,
}: SectionCardProps) {
  return (
    <div className="text-card-foreground bg-white shadow-sm border border-gray-100 rounded-xl sm:rounded-2xl">
      <div className="flex flex-col space-y-1.5 p-4 sm:p-6 pb-2">
        <div className="text-lg sm:text-2xl font-semibold leading-none tracking-tight flex items-center justify-between text-gray-900">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div>
              <span className="text-lg sm:text-2xl">
                {emoji && `${emoji} `}
                {title}
              </span>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {onEdit && <EditButton onClick={onEdit} />}
        </div>
      </div>
      <div className="p-4 sm:p-6 pt-0 space-y-1">{children}</div>
    </div>
  );
}
