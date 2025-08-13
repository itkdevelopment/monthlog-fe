// components/monthlog/shared/stat-item.tsx
import { ReactNode } from 'react';
import EditButton from './edit-button';

interface StatItemProps {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
  onEdit?: () => void;
}

export default function StatItem({
  icon,
  label,
  value,
  onEdit,
}: StatItemProps) {
  return (
    <div className="flex items-center justify-between py-2 group relative">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
          {value}
        </span>
        {onEdit && (
          <div className="w-7 h-7">
            <EditButton onClick={onEdit} />
          </div>
        )}
      </div>
    </div>
  );
}
