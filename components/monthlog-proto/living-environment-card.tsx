'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/monthlog-proto/ui/card';
import { Button } from '@/components/monthlog-proto/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/monthlog-proto/ui/dialog';
import { Input } from '@/components/monthlog-proto/ui/input';
import { Label } from '@/components/monthlog-proto/ui/label';
import { Textarea } from '@/components/monthlog-proto/ui/textarea';
import { Badge } from '@/components/monthlog-proto/ui/badge';
import {
  Edit,
  X,
  Plus,
  Home,
  Volume2,
  Wind,
  Droplets,
  Info,
} from 'lucide-react';
import { ExpGainAnimation } from './domain/city-detail/exp-gain-animation';
import { AnimatedGauge } from '@/components/monthlog-proto/charts/animated-gauge';

interface LivingEnvironmentCardData {
  title: string;
  participantCount: number;
  detailItems: {
    name: string;
    value: string;
    unit?: string;
  }[];
}

interface LivingEnvironmentCardProps {
  cardData?: LivingEnvironmentCardData;
}

export default function LivingEnvironmentCard({
  cardData = {
    title: '🏠 거주 환경 디테일',
    participantCount: 24,
    detailItems: [
      { name: '주거 환경 만족도', value: '7.5', unit: '/10' },
      { name: '소음 수준 (주거지역 기준)', value: '보통', unit: '' },
      { name: '세탁 시설 정보', value: '코인세탁소 3곳', unit: '' },
      { name: '대기 질 (연평균)', value: '좋음', unit: '' },
      { name: '현지 생활 필수 정보', value: '미입력', unit: '' },
    ],
  },
}: LivingEnvironmentCardProps) {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [showExpAnimation, setShowExpAnimation] = useState(false);
  const [expGain, setExpGain] = useState(0);

  // 그룹 입력 상태
  const [groupData, setGroupData] = useState({
    satisfaction: '',
    noiseLevel: '',
    laundryInfo: '',
    airQuality: '',
    essentialInfo: '',
  });

  // 개별 항목 입력 상태
  const [itemData, setItemData] = useState({
    satisfaction: '',
    noiseLevel: '',
    laundryInfo: '',
    airQuality: '',
    essentialInfo: '',
  });

  const handleGroupSubmit = () => {
    const filledFields = Object.values(groupData).filter(
      value => value.trim() !== '',
    ).length;
    const gainedExp = filledFields * 10;

    setExpGain(gainedExp);
    setShowExpAnimation(true);
    setShowGroupModal(false);

    setTimeout(() => setShowExpAnimation(false), 2000);
  };

  const handleItemSubmit = () => {
    setExpGain(10);
    setShowExpAnimation(true);
    setShowItemModal(false);

    setTimeout(() => setShowExpAnimation(false), 2000);
  };

  const openItemModal = (itemName: string) => {
    setSelectedItem(itemName);
    setShowItemModal(true);
  };

  const renderItemModal = () => {
    const getModalContent = () => {
      switch (selectedItem) {
        case '주거 환경 만족도':
          return (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">만족도 분포</h4>
                <div className="space-y-2">
                  {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(score => (
                    <div key={score} className="flex items-center gap-2">
                      <span className="w-6 text-sm">{score}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 10) + 1}명
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="satisfaction">만족도 점수 (1-10)</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <Button
                      key={num}
                      variant={
                        itemData.satisfaction === num.toString()
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      onClick={() =>
                        setItemData({
                          ...itemData,
                          satisfaction: num.toString(),
                        })
                      }
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          );

        case '소음 수준 (주거지역 기준)':
          return (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">소음 수준 태그별 공감 수</h4>
                <div className="space-y-2">
                  {[
                    '매우 조용함',
                    '조용함',
                    '보통',
                    '시끄러움',
                    '매우 시끄러움',
                  ].map(tag => (
                    <div key={tag} className="flex items-center gap-2">
                      <span className="w-20 text-sm">{tag}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.random() * 70 + 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 15) + 1}명
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>기존 태그 선택</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['#매우조용', '#야간소음있음', '#교통소음', '#공사소음'].map(
                    tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="newTag">새 태그 추가</Label>
                <Input
                  id="newTag"
                  placeholder="예: #새벽배송소음"
                  value={itemData.noiseLevel}
                  onChange={e =>
                    setItemData({ ...itemData, noiseLevel: e.target.value })
                  }
                />
              </div>
            </div>
          );

        case '세탁 시설 정보':
          return (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">기존 세탁 시설</h4>
                <div className="space-y-3">
                  {['코인세탁소 A', '코인세탁소 B', '세탁카페 C'].map(place => (
                    <div key={place} className="p-3 border rounded-lg">
                      <div className="font-medium">{place}</div>
                      <div className="text-sm text-gray-600">
                        세탁 3,000원 / 건조 2,000원
                      </div>
                      <div className="text-sm text-gray-600">
                        운영시간: 06:00-24:00
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />새 세탁 시설 추가하기
                </Button>
              </div>
            </div>
          );

        case '대기 질 (연평균)':
          return (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">대기질 태그별 공감 수</h4>
                <div className="space-y-2">
                  {['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'].map(
                    tag => (
                      <div key={tag} className="flex items-center gap-2">
                        <span className="w-20 text-sm">{tag}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.random() * 60 + 20}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 12) + 1}명
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <Label>기존 태그 선택</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    '#미세먼지보통',
                    '#황사주의',
                    '#공기맑음',
                    '#알레르기주의',
                  ].map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );

        case '현지 생활 필수 정보':
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="essentialInfo">생활 필수 정보</Label>
                <Textarea
                  id="essentialInfo"
                  placeholder="예: 마트 운영시간, 택배 수령 방법, 쓰레기 배출 규칙 등"
                  value={itemData.essentialInfo}
                  onChange={e =>
                    setItemData({ ...itemData, essentialInfo: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div>
                <Label>기존 정보 태그</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    '#24시간마트',
                    '#택배함있음',
                    '#분리수거엄격',
                    '#관리사무소친절',
                  ].map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );

        default:
          return <div>항목을 선택해주세요.</div>;
      }
    };

    return (
      <Dialog open={showItemModal} onOpenChange={setShowItemModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedItem}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowItemModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">{getModalContent()}</div>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-600">수정하기 +10 EXP</span>
            <Button onClick={handleItemSubmit}>수정하기</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      {/* 디지털/업무 환경 카드와 동일한 스타일 적용 */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl">{cardData.title}</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  {cardData.participantCount}명이 기여한 정보
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowGroupModal(true)}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {/* 상단: 2단 분할 레이아웃 - 좌측 35%, 우측 65% */}
          <div className="grid grid-cols-5 gap-8 pt-0 pb-6">
            {/* 좌측 영역 (35% - 2/5) - 대표 지표 */}
            <div className="col-span-2 flex justify-center">
              <AnimatedGauge
                value={7.5}
                maxValue={10}
                label="주거 환경 만족도"
                color="#141414"
                size={50}
              />
            </div>

            {/* 우측 영역 (65% - 3/5) - 3개 보조 지표 */}
            <div className="col-span-3 grid grid-cols-3 gap-4 items-center pr-16">
              {/* 보조 지표 1 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  보통
                </div>
                <div className="text-sm text-gray-600">소음 수준</div>
              </div>

              {/* 보조 지표 2 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  좋음
                </div>
                <div className="text-sm text-gray-600">대기 질</div>
              </div>

              {/* 보조 지표 3 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  3곳+
                </div>
                <div className="text-sm text-gray-600">세탁 시설</div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-200" />

          {/* 하단: 상세 정보 리스트 - 디지털/업무 환경 카드와 동일한 스타일 */}
          <div className="space-y-1">
            {cardData.detailItems?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-2">
                  {/* 아이콘 매핑 */}
                  {item.name === '주거 환경 만족도' && (
                    <Home className="h-4 w-4 text-gray-600" />
                  )}
                  {item.name === '소음 수준 (주거지역 기준)' && (
                    <Volume2 className="h-4 w-4 text-gray-600" />
                  )}
                  {item.name === '세탁 시설 정보' && (
                    <Droplets className="h-4 w-4 text-gray-600" />
                  )}
                  {item.name === '대기 질 (연평균)' && (
                    <Wind className="h-4 w-4 text-gray-600" />
                  )}
                  {item.name === '현지 생활 필수 정보' && (
                    <Info className="h-4 w-4 text-gray-600" />
                  )}
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => openItemModal(item.name)}
                  >
                    {item.value}
                    {item.unit}
                  </span>
                  <button
                    onClick={() => openItemModal(item.name)}
                    className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  >
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 그룹 입력 모달 */}
      <Dialog open={showGroupModal} onOpenChange={setShowGroupModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              🏠 거주 환경 디테일 - 전체 입력
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGroupModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            <div>
              <Label htmlFor="satisfaction">주거 환경 만족도 (1-10)</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <Button
                    key={num}
                    variant={
                      groupData.satisfaction === num.toString()
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      setGroupData({
                        ...groupData,
                        satisfaction: num.toString(),
                      })
                    }
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {['#조용한동네', '#편리한위치'].map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="noiseLevel">소음 수준 (주거지역 기준)</Label>
              <Input
                id="noiseLevel"
                placeholder="예: 보통, 조용함 등"
                value={groupData.noiseLevel}
                onChange={e =>
                  setGroupData({ ...groupData, noiseLevel: e.target.value })
                }
              />
              <div className="flex gap-2 mt-2">
                {['#야간조용', '#교통소음있음'].map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="laundryInfo">세탁 시설 정보</Label>
              <Input
                id="laundryInfo"
                placeholder="예: 코인세탁소 3곳"
                value={groupData.laundryInfo}
                onChange={e =>
                  setGroupData({ ...groupData, laundryInfo: e.target.value })
                }
              />
              <div className="flex gap-2 mt-2">
                {['#24시간이용', '#저렴한가격'].map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="airQuality">대기 질 (연평균)</Label>
              <Input
                id="airQuality"
                placeholder="예: 좋음, 보통 등"
                value={groupData.airQuality}
                onChange={e =>
                  setGroupData({ ...groupData, airQuality: e.target.value })
                }
              />
              <div className="flex gap-2 mt-2">
                {['#공기맑음', '#미세먼지보통'].map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="essentialInfo">현지 생활 필수 정보</Label>
              <Textarea
                id="essentialInfo"
                placeholder="마트 운영시간, 택배 수령 방법, 쓰레기 배출 규칙 등"
                value={groupData.essentialInfo}
                onChange={e =>
                  setGroupData({ ...groupData, essentialInfo: e.target.value })
                }
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                {['#편의시설많음', '#생활편리'].map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t bg-white">
            <span className="text-sm text-gray-600">
              개척하기 +
              {Object.values(groupData).filter(v => v.trim() !== '').length *
                10}{' '}
              EXP
            </span>
            <Button onClick={handleGroupSubmit}>
              개척하기 (+
              {Object.values(groupData).filter(v => v.trim() !== '').length *
                10}{' '}
              EXP)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {renderItemModal()}

      {showExpAnimation && (
        <ExpGainAnimation
          exp={expGain}
          onComplete={() => setShowExpAnimation(false)}
        />
      )}
    </>
  );
}
