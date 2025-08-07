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
