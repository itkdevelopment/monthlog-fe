// components/monthlog/shared/stat-item.tsx
import { ReactNode } from "react";
import EditButton from "./edit-button";
import { Edit } from "lucide-react";

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
          <button
            onClick={onEdit}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
