export interface Program {
  activityEndDate: string;
  activityStartDate: string;
  announcementAt: string;
  announcementText: string;
  applicantsNumber: number;
  applyUrl: string;
  attachedFiles: {
    category: string;
    description: string;
    fileName: string;
    fileUrl: string;
    programFileId: number;
    type: string;
    volume: number;
  }[];
  countComment: number;
  detailText: string;
  firstPublishedAt: string;
  imageFiles: {
    category: string;
    description: string;
    fileName: string;
    fileUrl: string;
    programFileId: number;
    type: string;
    volume: number;
  }[];
  isFullSubsidy: boolean;
  isGlobal: boolean;
  isNotification: boolean;
  isPublished: boolean;
  isMonthlerForm: boolean;
  mainText: string;
  managerEmail: string;
  managerPhone: string;
  maxActivityDay: number;
  maxPerTeam: number;
  // metaDataKeywords: string;
  minActivityDay: number;
  minPerTeam: number;
  noticeEndAt: string;
  noticeStartAt: string;
  noticeUrl: string;
  personNumber: number;
  possibleChild: boolean;
  programHashtags: {
    hashtag: string;
    programHashtagId: number;
  }[];
  programId: number;
  publishedAt: string;
  publishedReserveAt: string;
  selectedUsersNumber: number;
  sidoName: string;
  siggAdmCode: number;
  siggName: string;
  teamNumber: number;
  themes: string;
  title: string;
  totalSubsidy: number;
  viewCnt: number;
  formApplicantsNumber: number;
  subsidy?: Subsidy;
  clickNumber: number;
  isTravelPlanRequired: boolean;
}

export interface Subsidy {
  isFullSubsidy?: boolean;
  subsidyFor1?: number;
  subsidyFor2?: number;
  subsidyFor3?: number;
  subsidyFor4?: number;
  subsidyFor5?: number;
  accommodationSubsidy?: boolean;
  experienceSubsidy?: boolean;
  mealSubsidy?: boolean;
  transportationSubsidy?: boolean;
  travelSubsidy?: boolean;
  etcSubsidy?: string;
}

export interface User {
  accessExpiredAt: string;
  accessToken: string;
  applyReason: string;
  birthyear: number;
  bookmarkId: number;
  bookmarks: Bookmark[];
  canReJoin: boolean;
  commentId: number;
  createdAt: string;
  deletedAt: string;
  email: string;
  fcmToken: string;
  gender: string;
  isRemoveAds: boolean;
  lastPasswordChangedAt: string;
  lastRequestAt: string;
  lastVisitDate: string;
  loginFailCount: number;
  nickname: string;
  notificationCount: number;
  password: string;
  profileImage: string;
  programNotificationId: number;
  programNotifications: ProgramNotification[];
  provider: string;
  refreshExpiredAt: string;
  refreshToken: string;
  replyId: number;
  reset: boolean;
  resetPasswordToken: string;
  roles: number[];
  status: string;
  updatedAt: string;
  userDevice: UserDevice[];
  userId: number;
  userRole: string;
  commentAndReplyCount?: number;
  programNotificationCount?: number;
  noticeCount?: number;
  membership?: Membership;
}

export interface Membership {
  membershipId?: number;
  isSubscribed: boolean;
  role: string;
  startDate?: string;
  endDate?: string;
  membershipOption?: string;
}

export interface Bookmark {
  bookmarkId: number;
  createdAt: string;
  programId: number;
  updatedAt: string;
  userId: number;
}

export interface ProgramNotification {
  createdAt: string;
  programId: number;
  programNotificationId: number;
  updatedAt: string;
  userId: number;
}

export interface UserDevice {
  accessExpiredAt: string;
  accessToken: string;
  isWeb: boolean;
  macAddress: string;
  refreshExpiredAt: string;
  refreshToken: string;
  userDeviceId: number;
  userId: number;
}

export interface CreatedBy {
  accessExpiredAt: string;
  accessToken: string;
  applyReason: string;
  birthyear: number;
  bookmarkId: number;
  bookmarks: Bookmark[];
  canReJoin: boolean;
  commentId: number;
  createdAt: string;
  deletedAt: string;
  email: string;
  fcmToken: string;
  gender: string;
  isRemoveAds: boolean;
  lastPasswordChangedAt: string;
  lastRequestAt: string;
  lastVisitDate: string;
  loginFailCount: number;
  nickname: string;
  notificationCount: number;
  password: string;
  profileImage: string;
  programNotificationId: number;
  programNotifications: ProgramNotification[];
  provider: string;
  refreshExpiredAt: string;
  refreshToken: string;
  replyId: number;
  reset: boolean;
  resetPasswordToken: string;
  roles: number[];
  status: string;
  updatedAt: string;
  userDevice: UserDevice[];
  userId: number;
}
