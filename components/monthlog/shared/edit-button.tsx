// components/monthlog/shared/edit-button.tsx
import { SquarePen } from 'lucide-react';

interface EditButtonProps {
  onClick?: () => void;
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
    >
      <SquarePen className="h-4 w-4 text-gray-600" />
    </button>
  );
}
