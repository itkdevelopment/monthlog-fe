// 'use client';

// import { useState } from 'react';
// import { X, Plane, Bus } from 'lucide-react';
// import { TransportData } from '@/types/monthlog/city-detail';

// interface TransportEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   data: TransportData;
//   onSave: (data: TransportData) => void;
// }

// export default function TransportEditModal({
//   isOpen,
//   onClose,
//   data,
//   onSave,
// }: TransportEditModalProps) {
//   const [formData, setFormData] = useState<TransportData>(data);

//   if (!isOpen) return null;

//   const handleSave = () => {
//     onSave(formData);
//     onClose();
//   };

//   const handlePublicTransportScoreChange = (score: number) => {
//     setFormData(prev => ({ ...prev, publicTransportScore: score }));
//   };

//   const handleTouristAccessChange = (level: string) => {
//     setFormData(prev => ({ ...prev, touristAccess: level }));
//   };

//   const handleBreakdownChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       breakdown: {
//         ...prev.breakdown,
//         [field]: value,
//       },
//     }));
//   };

//   const touristAccessOptions = [
//     '매우 그렇다',
//     '그렇다',
//     '보통이다',
//     '아니다',
//     '매우 아니다',
//   ];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-2xl">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
//               <Bus className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 교통 및 이동
//               </h3>
//               <p className="text-sm text-gray-600">상세 분석 및 입력</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="space-y-6">
//             <h4 className="font-semibold text-gray-900">
//               교통 및 이동 - 전체 정보 입력
//             </h4>

//             <div className="space-y-6">
//               {/* Public Transport Score */}
//               <div>
//                 <label className="block text-base font-medium text-gray-900 mb-3">
//                   대중교통 편의성 (1-10점)
//                 </label>
//                 <div className="grid grid-cols-5 gap-2">
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
//                     <button
//                       key={score}
//                       onClick={() => handlePublicTransportScoreChange(score)}
//                       className={`h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
//                         formData.publicTransportScore === score
//                           ? 'bg-green-600 text-white shadow-lg transform scale-105'
//                           : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:scale-105'
//                       }`}
//                     >
//                       {score}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Airport Access */}
//               <div>
//                 <label className="block text-base font-medium text-gray-900 mb-3">
//                   공항 접근성
//                 </label>
//                 <div className="grid grid-cols-3 gap-4">
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="이동수단"
//                     value={
//                       formData.breakdown.airportTransport.split(' ')[0] || ''
//                     }
//                     onChange={e => {
//                       const parts =
//                         formData.breakdown.airportTransport.split(' ');
//                       parts[0] = e.target.value;
//                       handleBreakdownChange(
//                         'airportTransport',
//                         parts.join(' '),
//                       );
//                     }}
//                   />
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="소요시간(분)"
//                     type="number"
//                     onChange={e => {
//                       const parts =
//                         formData.breakdown.airportTransport.split(' ');
//                       parts[1] = e.target.value + '분';
//                       handleBreakdownChange(
//                         'airportTransport',
//                         parts.join(' '),
//                       );
//                     }}
//                   />
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="비용(원)"
//                     type="number"
//                     onChange={e => {
//                       const parts =
//                         formData.breakdown.airportTransport.split(' ');
//                       parts[2] = e.target.value + '원';
//                       handleBreakdownChange(
//                         'airportTransport',
//                         parts.join(' '),
//                       );
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Main Transport Methods */}
//               <div>
//                 <label className="block text-base font-medium text-gray-900 mb-3">
//                   주요 교통수단 & 요금
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="교통수단"
//                     value={
//                       formData.breakdown.mainTransportMethods.split(' ')[0] ||
//                       ''
//                     }
//                     onChange={e => {
//                       const parts =
//                         formData.breakdown.mainTransportMethods.split(' ');
//                       parts[0] = e.target.value;
//                       handleBreakdownChange(
//                         'mainTransportMethods',
//                         parts.join(' '),
//                       );
//                     }}
//                   />
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="1회 평균 요금"
//                     value={
//                       formData.breakdown.mainTransportMethods.split(' ')[1] ||
//                       ''
//                     }
//                     onChange={e => {
//                       const parts =
//                         formData.breakdown.mainTransportMethods.split(' ');
//                       parts[1] = e.target.value;
//                       handleBreakdownChange(
//                         'mainTransportMethods',
//                         parts.join(' '),
//                       );
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Recommended Apps */}
//               <div>
//                 <label className="block text-base font-medium text-gray-900 mb-3">
//                   추천 교통 앱
//                 </label>
//                 <input
//                   className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                   placeholder="앱 이름"
//                   value={formData.breakdown.recommendedApps}
//                   onChange={e =>
//                     handleBreakdownChange('recommendedApps', e.target.value)
//                   }
//                 />
//               </div>

//               {/* Tourist Site Access */}
//               <div>
//                 <label className="block text-base font-medium text-gray-900 mb-3">
//                   관광지 접근성
//                 </label>
//                 <div className="grid grid-cols-1 gap-2">
//                   {touristAccessOptions.map(option => (
//                     <button
//                       key={option}
//                       onClick={() => handleTouristAccessChange(option)}
//                       className={`h-9 rounded-lg px-3 text-sm font-medium transition-all duration-200 justify-start flex items-center ${
//                         formData.touristAccess === option
//                           ? 'bg-green-600 text-white shadow-lg'
//                           : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Flight Information */}
//               <div>
//                 <label className="block text-base font-medium text-gray-900 mb-3">
//                   <div className="flex items-center space-x-2">
//                     <Plane className="w-4 h-4 text-gray-600" />
//                     <span>항공권 정보 (해외 도시 한정)</span>
//                   </div>
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="항공사"
//                     value={formData.breakdown.flightCosts.split(' ')[0] || ''}
//                     onChange={e => {
//                       const parts = formData.breakdown.flightCosts.split(' ');
//                       parts[0] = e.target.value;
//                       handleBreakdownChange('flightCosts', parts.join(' '));
//                     }}
//                   />
//                   <input
//                     className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
//                     placeholder="실제 구매 가격"
//                     type="number"
//                     onChange={e => {
//                       const parts = formData.breakdown.flightCosts.split(' ');
//                       parts[1] = e.target.value + '원';
//                       handleBreakdownChange('flightCosts', parts.join(' '));
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   onClick={handleSave}
//                   className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//                 >
//                   전체 정보 제출하기
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }