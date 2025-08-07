import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

const mockPrograms = [
  {
    id: "1",
    name: "전라북도 가족여행 지원사업",
    region: "전라북도 익산",
    amount: "최대 30만원",
    duration: "2박 3일",
    requirements: ["가족 동반", "주말 이용"],
    needsPlan: true,
    familyFriendly: true,
    applicationMethod: "온라인 신청",
    applicationUrl: "https://www.jeonbuk.go.kr/tour/support",
  },
  {
    id: "2",
    name: "경기도 힐링여행 바우처",
    region: "경기도 가평",
    amount: "최대 25만원",
    duration: "1박 2일 이상",
    requirements: ["도민 우선", "평일 할인"],
    needsPlan: false,
    familyFriendly: true,
    applicationMethod: "선착순 신청",
    applicationUrl: "https://www.gg.go.kr/tour/voucher",
  },
  {
    id: "3",
    name: "제주도 체험관광 지원금",
    region: "제주도",
    amount: "최대 40만원",
    duration: "3박 4일",
    requirements: ["체험 프로그램 필수", "숙박 증빙"],
    needsPlan: true,
    familyFriendly: true,
    applicationMethod: "추첨 신청",
    applicationUrl: "https://www.jeju.go.kr/tour/experience",
  },
  {
    id: "4",
    name: "강원도 자연휴양 패키지",
    region: "강원도 춘천",
    amount: "최대 20만원",
    duration: "2박 3일",
    requirements: ["자연휴양림 이용", "환경보호 서약"],
    needsPlan: false,
    familyFriendly: true,
    applicationMethod: "온라인 신청",
    applicationUrl: "https://www.gangwon.go.kr/tour/nature",
  },
  {
    id: "5",
    name: "부산 해양관광 지원사업",
    region: "부산광역시",
    amount: "최대 35만원",
    duration: "2박 3일 이상",
    requirements: ["해양 체험 필수", "지역 숙박"],
    needsPlan: true,
    familyFriendly: true,
    applicationMethod: "서류 심사",
    applicationUrl: "https://www.busan.go.kr/tour/marine",
  },
  {
    id: "6",
    name: "충청남도 역사문화 탐방",
    region: "충청남도 공주",
    amount: "최대 28만원",
    duration: "1박 2일 이상",
    requirements: ["문화재 관람", "교육 프로그램 참여"],
    needsPlan: false,
    familyFriendly: true,
    applicationMethod: "온라인 신청",
    applicationUrl: "https://www.chungnam.go.kr/tour/culture",
  },
  {
    id: "7",
    name: "경상북도 전통마을 체험",
    region: "경상북도 안동",
    amount: "최대 22만원",
    duration: "2박 3일",
    requirements: ["전통 체험 필수", "한복 착용"],
    needsPlan: true,
    familyFriendly: true,
    applicationMethod: "추첨 신청",
    applicationUrl: "https://www.gyeongbuk.go.kr/tour/traditional",
  },
  {
    id: "8",
    name: "전라남도 섬여행 지원금",
    region: "전라남도 완도",
    amount: "최대 32만원",
    duration: "2박 3일 이상",
    requirements: ["섬 지역 숙박", "해양 액티비티"],
    needsPlan: false,
    familyFriendly: true,
    applicationMethod: "선착순 신청",
    applicationUrl: "https://www.jeonnam.go.kr/tour/island",
  },
]

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const systemPrompt = `당신은 여행지원금 전문 AI 어시스턴트입니다. 
사용자의 여행 조건을 분석하고 맞춤형 프로그램을 추천해주세요.

현재 단계: ${context?.step || "question"}
이전 결과: ${context?.prevResults ? JSON.stringify(context.prevResults) : "없음"}

응답 스타일:
- 친근하고 도움이 되는 톤
- 이모지 적극 활용 (🧠, 📊, ✍️, 🎉 등)
- "분석 중...", "추천 드릴게요!" 같은 AI 시각화 표현 사용
- 단계별 안내 제공

Intent/Slot 추출 및 처리:
1. filterPrograms: 조건에 맞는 프로그램 필터링
2. comparePrograms: 선택된 프로그램들 비교
3. refinePlan: 여행 계획 세부 조정
4. searchPrograms: 새로운 조건으로 프로그램 검색

단계별 로직:
- question: 초기 조건 분석 및 프로그램 추천
- search: 기존 결과 필터링 및 재검색
- compare: 선택된 프로그램들 상세 비교
- plan: 여행 계획 생성 및 수정

매칭 실패 시 fallback:
"죄송해요, 다시 한 번만 입력해 주실래요? 예: '6월 주말 2박3일 지원금'"

주요 기능:
1. 여행 조건 분석 (시기, 기간, 동반자, 지역 등)
2. 맞춤형 프로그램 추천
3. 비교 분석 제공
4. 여행계획서 작성 도움`

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    system: systemPrompt,
    tools: {
      analyzeConditions: tool({
        description: "사용자의 여행 조건을 분석하고 맞춤형 프로그램을 추천합니다",
        parameters: z.object({
          period: z.string().describe("여행 시기"),
          duration: z.string().describe("여행 기간"),
          companions: z.string().describe("동반자 정보"),
          preferences: z.string().describe("선호 사항"),
          intent: z.string().optional().describe("사용자 의도 (filterPrograms, searchPrograms 등)"),
        }),
        execute: async ({ period, duration, companions, preferences, intent }) => {
          let filteredPrograms = mockPrograms

          // 이전 결과가 있으면 해당 결과를 기반으로 필터링
          if (context?.prevResults && context.prevResults.length > 0) {
            filteredPrograms = mockPrograms.filter((p) => context.prevResults.includes(p.id))
          }

          // 조건에 맞는 프로그램 필터링
          const matchingPrograms = filteredPrograms.filter((program) => {
            let score = 0

            // 기간 매칭
            if (duration.includes("2박") && program.duration.includes("2박")) score += 2
            if (duration.includes("3일") && program.duration.includes("3일")) score += 2
            if (duration.includes("1박") && program.duration.includes("1박")) score += 2

            // 동반자 매칭
            if (companions.includes("아이") && program.familyFriendly) score += 3
            if (companions.includes("가족") && program.familyFriendly) score += 3

            // 시기 매칭
            if (period.includes("6월") || period.includes("여름")) score += 1
            if (period.includes("주말") && program.requirements.some((req) => req.includes("주말"))) score += 2

            // 지역 매칭
            if (preferences.includes("제주") && program.region.includes("제주")) score += 3
            if (preferences.includes("부산") && program.region.includes("부산")) score += 3
            if (preferences.includes("강원") && program.region.includes("강원")) score += 3

            // 지원금 조건
            if (preferences.includes("30만원") && program.amount.includes("30만원")) score += 2
            if (preferences.includes("계획서 없이") && !program.needsPlan) score += 3

            return score >= 1
          })

          // 최소 4개 프로그램은 보여주도록
          const finalPrograms = matchingPrograms.length >= 4 ? matchingPrograms : mockPrograms.slice(0, 6)

          return {
            analysis: `좋아요! 조건을 분석해볼게요 🧠
- 시기: ${period}
- 기간: ${duration}  
- 동반: ${companions}
- 선호: ${preferences}

이에 맞는 프로그램을 찾고 있어요...
총 ${finalPrograms.length}개의 프로그램을 추천드릴게요! 👇`,
            programs: finalPrograms,
            shouldTransition: true,
          }
        },
      }),

      filterPrograms: tool({
        description: "기존 프로그램 목록을 새로운 조건으로 필터링합니다",
        parameters: z.object({
          filterCondition: z.string().describe("필터링 조건"),
          prevResults: z.array(z.string()).optional().describe("이전 결과 ID 목록"),
        }),
        execute: async ({ filterCondition, prevResults }) => {
          let basePrograms = mockPrograms

          if (prevResults && prevResults.length > 0) {
            basePrograms = mockPrograms.filter((p) => prevResults.includes(p.id))
          }

          const filteredPrograms = basePrograms.filter((program) => {
            const condition = filterCondition.toLowerCase()

            if (condition.includes("6월") || condition.includes("여름")) {
              return true // 모든 프로그램이 6월에 이용 가능하다고 가정
            }
            if (condition.includes("30만원 이상")) {
              const amount = Number.parseInt(program.amount.match(/\d+/)?.[0] || "0")
              return amount >= 30
            }
            if (condition.includes("계획서 없이") || condition.includes("바로 신청")) {
              return !program.needsPlan
            }
            if (condition.includes("가족")) {
              return program.familyFriendly
            }
            if (condition.includes("제주")) {
              return program.region.includes("제주")
            }
            if (condition.includes("부산")) {
              return program.region.includes("부산")
            }

            return true
          })

          return {
            analysis: `"${filterCondition}" 조건으로 필터링했어요! 📊
총 ${filteredPrograms.length}개의 프로그램이 조건에 맞습니다.`,
            programs: filteredPrograms,
            shouldTransition: false,
          }
        },
      }),

      comparePrograms: tool({
        description: "선택된 프로그램들을 비교 분석합니다",
        parameters: z.object({
          selectedIds: z.array(z.string()).describe("선택된 프로그램 ID 목록"),
          sortBy: z.string().optional().describe("정렬 기준"),
        }),
        execute: async ({ selectedIds, sortBy }) => {
          const selectedPrograms = mockPrograms.filter((p) => selectedIds.includes(p.id))

          if (sortBy) {
            if (sortBy.includes("가족 친화도")) {
              selectedPrograms.sort((a, b) => (b.familyFriendly ? 1 : 0) - (a.familyFriendly ? 1 : 0))
            } else if (sortBy.includes("지원금")) {
              selectedPrograms.sort((a, b) => {
                const amountA = Number.parseInt(a.amount.match(/\d+/)?.[0] || "0")
                const amountB = Number.parseInt(b.amount.match(/\d+/)?.[0] || "0")
                return amountB - amountA
              })
            }
          }

          return {
            comparison: `선택하신 ${selectedPrograms.length}개 프로그램을 비교해볼게요 📊

${sortBy ? `${sortBy} 기준으로 정렬했습니다.` : ""}

지역 / 지원금 / 동반 가능 여부 / 선정 방식 / 여행계획서 필요 여부로 정리했어요.

마음에 드는 걸 골라주세요.
복수 신청도 가능해요!`,
            programs: selectedPrograms,
          }
        },
      }),

      createTravelPlan: tool({
        description: "선택된 프로그램에 대한 여행계획서를 생성합니다",
        parameters: z.object({
          programId: z.string().describe("선택된 프로그램 ID"),
          preferences: z.string().optional().describe("추가 선호사항"),
        }),
        execute: async ({ programId, preferences }) => {
          const program = mockPrograms.find((p) => p.id === programId)

          if (!program?.needsPlan) {
            return {
              message: `해당 프로그램은 여행계획서 없이 바로 신청 가능합니다. 🎉
곧바로 신청 도와드릴게요!
다른 프로그램도 비교해보시겠어요?`,
              needsPlan: false,
            }
          }

          return {
            message: `함께 계획서를 만들어볼까요? ✍️
일정을 기준으로 추천 일정을 준비했어요!

📅 일정: 6월 15일 ~ 6월 17일
📍 지역: ${program.region}

추천 계획표를 생성하고 있습니다...
체크리스트를 수정하거나 원하시는 내용도 반영할 수 있어요!`,
            needsPlan: true,
            program: program,
          }
        },
      }),
    },
    maxSteps: 5,
  })

  return result.toDataStreamResponse()
}
