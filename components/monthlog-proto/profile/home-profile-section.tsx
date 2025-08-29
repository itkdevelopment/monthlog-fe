'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/monthlog-proto/ui/avatar';
import { Progress } from '@/components/monthlog-proto/ui/progress';
import Link from 'next/link';

interface HomeProfileSectionProps {
  userProfile: {
    username: string;
    avatar: string;
    level: number;
    currentExp: number;
    nextLevelExp: number;
    title: string;
  };
}

export function HomeProfileSection({ userProfile }: HomeProfileSectionProps) {
  const expPercentage =
    (userProfile.currentExp / userProfile.nextLevelExp) * 100;

  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        도시별 먼슬로그
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        함께 만드는 한달살기 아카이브
      </p>

      {/* Profile Section */}
      <Link href="/profile">
        <div className="inline-block cursor-pointer hover:opacity-80 transition-opacity">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-6">
              {/* Profile Image and Level */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://v0-b5-six.vercel.app/images/new-profile-avatar.jpg" />
                  <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                    {userProfile.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    Lv.{userProfile.level}
                  </div>
                  <div className="text-sm text-gray-500">레벨</div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gray-200" />

              {/* Title */}
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {userProfile.title}
                </div>
                <div className="text-sm text-gray-500">현재 칭호</div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gray-200" />

              {/* Progress */}
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <Progress value={expPercentage} className="w-32 h-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round(expPercentage)}%
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {userProfile.currentExp} / {userProfile.nextLevelExp} EXP
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
