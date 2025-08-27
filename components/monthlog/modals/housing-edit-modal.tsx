// 'use client';

// import { useState } from 'react';
// import { X } from 'lucide-react';
// import { HousingData } from '@/types/monthlog/city-detail';

// interface HousingEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   data: HousingData;
//   onSave: (data: HousingData) => void;
// }

// export default function HousingEditModal({
//   isOpen,
//   onClose,
//   data,
//   onSave,
// }: HousingEditModalProps) {
//   const [formData, setFormData] = useState<HousingData>(data);

//   if (!isOpen) return null;

//   const handleSave = () => {
//     onSave(formData);
//     onClose();
//   };

//   const handleSatisfactionChange = (rating: number) => {
//     setFormData(prev => ({ ...prev, satisfaction: rating }));
//   };

//   const handleFieldChange = (field: string, value: string) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setFormData(prev => ({
//         ...prev,
//         breakdown: {
//           ...prev.breakdown,
//           [child]: value,
//         },
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [field]: value }));
//     }
//   };

//   const satisfactionTags = ['#조용한동네', '#편리한위치'];
//   const noiseTags = ['#야간조용', '#교통소음있음'];
//   const laundryTags = ['#24시간이용', '#저렴한가격'];
//   const airQualityTags = ['#공기맑음', '#미세먼지보통'];
//   const essentialTags = ['#편의시설많음', '#생활편리'];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col transform transition-all border border-gray-100">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-lg">🏠</span>
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">
//                 거주 환경 디테일
//               </h2>
//               <p className="text-sm text-gray-600">전체 정보를 입력해주세요</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//           >
//             <X className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-8">
//           {/* Satisfaction Rating */}
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">
//                 주거 환경 만족도
//               </label>
//               <p className="text-sm text-gray-600 mb-4">
//                 1점(매우 불만족)부터 10점(매우 만족)까지 평가해주세요
//               </p>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
//                 <button
//                   key={rating}
//                   onClick={() => handleSatisfactionChange(rating)}
//                   className={`w-12 h-12 rounded-xl font-semibold transition-all duration-200 ${
//                     formData.satisfaction === rating
//                       ? 'bg-blue-600 text-white shadow-lg transform scale-105'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {satisfactionTags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Form Fields */}
//           <div className="grid gap-6">
//             {/* Noise Level */}
//             <div className="space-y-3">
//               <label className="block text-sm font-semibold text-gray-900">
//                 소음 수준 (주거지역 기준)
//               </label>
//               <input
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-sm"
//                 placeholder="예: 조용함, 보통, 시끄러움 등"
//                 value={formData.breakdown.noiseLevel}
//                 onChange={e =>
//                   handleFieldChange('breakdown.noiseLevel', e.target.value)
//                 }
//               />
//               <div className="flex gap-2 flex-wrap">
//                 {noiseTags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Laundry Info */}
//             <div className="space-y-3">
//               <label className="block text-sm font-semibold text-gray-900">
//                 세탁 시설 정보
//               </label>
//               <input
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-sm"
//                 placeholder="예: 코인세탁소 3곳, 건물 내 세탁기 등"
//                 value={formData.breakdown.laundryInfo}
//                 onChange={e =>
//                   handleFieldChange('breakdown.laundryInfo', e.target.value)
//                 }
//               />
//               <div className="flex gap-2 flex-wrap">
//                 {laundryTags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Air Quality */}
//             <div className="space-y-3">
//               <label className="block text-sm font-semibold text-gray-900">
//                 대기 질 (연평균)
//               </label>
//               <input
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-sm"
//                 placeholder="예: 매우 좋음, 좋음, 보통, 나쁨 등"
//                 value={formData.breakdown.airQuality}
//                 onChange={e =>
//                   handleFieldChange('breakdown.airQuality', e.target.value)
//                 }
//               />
//               <div className="flex gap-2 flex-wrap">
//                 {airQualityTags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Essential Local Info */}
//             <div className="space-y-3">
//               <label className="block text-sm font-semibold text-gray-900">
//                 현지 생활 필수 정보
//               </label>
//               <textarea
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-sm resize-none"
//                 placeholder="마트 운영시간, 택배 수령 방법, 쓰레기 배출 규칙, 관리사무소 연락처 등 생활에 필요한 정보를 자세히 적어주세요"
//                 rows={4}
//                 value={formData.breakdown.localLifeInfo}
//                 onChange={e =>
//                   handleFieldChange('breakdown.localLifeInfo', e.target.value)
//                 }
//               />
//               <div className="flex gap-2 flex-wrap">
//                 {essentialTags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50/50">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm font-bold">+50</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">경험치 획득</p>
//               <p className="text-xs text-gray-600">개척하기 완료시</p>
//             </div>
//           </div>

//           <div className="flex space-x-3">
//             <button
//               onClick={onClose}
//               className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//             >
//               취소
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//             >
//               개척하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }