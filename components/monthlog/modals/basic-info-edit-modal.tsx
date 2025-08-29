'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { DetailInfo } from '@/types/monthlog/city-detail';

interface BasicInfoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DetailInfo;
  onSave: (data: DetailInfo) => void;
}

export default function BasicInfoEditModal({
  isOpen,
  onClose,
  data,
  onSave,
}: BasicInfoEditModalProps) {
  const [formData, setFormData] = useState<DetailInfo>(data);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof DetailInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              기본 정보 수정
            </h2>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity p-1"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="font-medium text-right text-sm"
                htmlFor="language"
              >
                언어
              </label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="language"
                value={formData.primaryLanguage}
                onChange={e => handleChange('primaryLanguage', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium text-right text-sm" htmlFor="visa">
                비자
              </label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="visa"
                value={formData.visaRequirement}
                onChange={e => handleChange('visaRequirement', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="font-medium text-right text-sm"
                htmlFor="currency"
              >
                화폐
              </label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="currency"
                value={formData.currency}
                onChange={e => handleChange('currency', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="font-medium text-right text-sm"
                htmlFor="timeZone"
              >
                한국과의 시차
              </label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="timeZone"
                value={formData.timezone}
                onChange={e => handleChange('timezone', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="font-medium text-right text-sm"
                htmlFor="powerOutlet"
              >
                콘센트 (전압/플러그 타입)
              </label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="powerOutlet"
                value={formData.electricalPlugType}
                onChange={e => handleChange('electricalPlugType', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="font-medium text-right text-sm"
                htmlFor="religion"
              >
                주요 종교
              </label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="religion"
                value={formData.mainReligions}
                onChange={e => handleChange('mainReligions', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
