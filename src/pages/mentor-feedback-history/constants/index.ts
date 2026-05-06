import type { MentorFeedbackHistoryItem } from "../types";

// TEMP_DUMMY_MENTOR_FEEDBACK_HISTORY: API 연동 전까지 멘토가 완료한 피드백 히스토리를 보여주는 더미 데이터입니다.
export const DUMMY_MENTOR_FEEDBACK_HISTORY: MentorFeedbackHistoryItem[] = [
  {
    id: 201,
    videoId: 201,
    title: "데이터 분석 직무 지원 동기",
    menteeNickname: "수지",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    durationSeconds: 213,
    requestedAt: "2026-04-30T18:20:00+09:00",
    completedAt: "2026-05-01T13:30:00+09:00",
    description:
      "데이터 분석 직무 지원 동기와 프로젝트 경험을 연결한 발표입니다.",
    totalScore: "78.5",
    overallComment:
      "지원 동기와 프로젝트 경험의 연결은 좋았습니다. 다만 분석 결과가 실제 의사결정에 어떤 영향을 줬는지 한 문장 더 보강하면 설득력이 올라갑니다.",
    comments: [
      {
        id: 1,
        startTimeSeconds: 5,
        endTimeSeconds: 12,
        content:
          "처음에 지원 직무를 먼저 명확히 말한 점이 좋습니다. 이어지는 경험 설명과 자연스럽게 연결해보세요.",
      },
      {
        id: 2,
        startTimeSeconds: 38,
        endTimeSeconds: 49,
        content:
          "분석 도구 설명보다 문제를 어떻게 정의했는지에 시간을 조금 더 쓰면 좋겠습니다.",
      },
      {
        id: 3,
        startTimeSeconds: 91,
        endTimeSeconds: 104,
        content:
          "마무리에서 입사 후 기여 방향을 구체적인 업무 상황으로 말하면 더 선명해집니다.",
      },
    ],
    rubricScores: [
      { id: 1, title: "핵심 메시지 전달력", category: "delivery", score: 8 },
      { id: 2, title: "논리적 구성", category: "speech", score: 8 },
      { id: 3, title: "내용 완성도", category: "speech", score: 8 },
      { id: 4, title: "정보 정확성", category: "speech", score: 9 },
      { id: 5, title: "설득력", category: "delivery", score: 8 },
      { id: 6, title: "말 속도 적절성", category: "delivery", score: 7 },
      { id: 7, title: "발화 안정성", category: "delivery", score: 8 },
      { id: 8, title: "발음 명확성", category: "delivery", score: 8 },
      { id: 9, title: "음성 변화", category: "delivery", score: 7 },
      { id: 10, title: "필러워드 사용", category: "speech", score: 7 },
      { id: 11, title: "시선 처리", category: "nonVerbal", score: 8 },
      { id: 12, title: "제스처 활용", category: "nonVerbal", score: 7 },
      { id: 13, title: "자세 안정성", category: "nonVerbal", score: 8 },
      { id: 14, title: "표정 활용", category: "nonVerbal", score: 7 },
      { id: 15, title: "자신감 표현", category: "nonVerbal", score: 8 },
      { id: 16, title: "시간 활용", category: "delivery", score: 8 },
      { id: 17, title: "발표 흐름", category: "speech", score: 8 },
      { id: 18, title: "내용 연결성", category: "speech", score: 8 },
      { id: 19, title: "집중도 유지", category: "delivery", score: 8 },
      { id: 20, title: "전체 완성도", category: "delivery", score: 8 },
    ],
  },
  {
    id: 202,
    videoId: 202,
    title: "AI 서비스 런칭 발표",
    menteeNickname: "지훈",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    durationSeconds: 401,
    requestedAt: "2026-04-28T16:00:00+09:00",
    completedAt: "2026-04-29T20:15:00+09:00",
    description:
      "AI 기반 발표 피드백 서비스의 런칭 전략과 핵심 기능을 설명한 발표입니다.",
    totalScore: "82.0",
    overallComment:
      "서비스 가치 제안이 분명하고 발표 흐름도 안정적입니다. 시장 문제를 설명하는 구간에서 숫자 근거를 한 번 더 제시하면 신뢰도가 높아집니다.",
    comments: [
      {
        id: 1,
        startTimeSeconds: 9,
        endTimeSeconds: 18,
        content:
          "문제 제기가 빠르게 들어가서 좋습니다. 다만 청중이 공감할 사용자 사례를 하나 덧붙여보세요.",
      },
      {
        id: 2,
        startTimeSeconds: 76,
        endTimeSeconds: 89,
        content:
          "기능 설명은 충분하지만 차별점 문장을 먼저 말하면 집중도가 더 좋아집니다.",
      },
    ],
    rubricScores: [
      { id: 1, title: "핵심 메시지 전달력", category: "delivery", score: 9 },
      { id: 2, title: "논리적 구성", category: "speech", score: 8 },
      { id: 3, title: "내용 완성도", category: "speech", score: 8 },
      { id: 4, title: "정보 정확성", category: "speech", score: 8 },
      { id: 5, title: "설득력", category: "delivery", score: 8 },
      { id: 6, title: "말 속도 적절성", category: "delivery", score: 8 },
      { id: 7, title: "발화 안정성", category: "delivery", score: 8 },
      { id: 8, title: "발음 명확성", category: "delivery", score: 9 },
      { id: 9, title: "음성 변화", category: "delivery", score: 8 },
      { id: 10, title: "필러워드 사용", category: "speech", score: 8 },
      { id: 11, title: "시선 처리", category: "nonVerbal", score: 8 },
      { id: 12, title: "제스처 활용", category: "nonVerbal", score: 8 },
      { id: 13, title: "자세 안정성", category: "nonVerbal", score: 8 },
      { id: 14, title: "표정 활용", category: "nonVerbal", score: 8 },
      { id: 15, title: "자신감 표현", category: "nonVerbal", score: 9 },
      { id: 16, title: "시간 활용", category: "delivery", score: 8 },
      { id: 17, title: "발표 흐름", category: "speech", score: 8 },
      { id: 18, title: "내용 연결성", category: "speech", score: 8 },
      { id: 19, title: "집중도 유지", category: "delivery", score: 8 },
      { id: 20, title: "전체 완성도", category: "delivery", score: 9 },
    ],
  },
  {
    id: 203,
    videoId: 203,
    title: "인턴 경험 기반 역량 답변",
    menteeNickname: "유나",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    durationSeconds: 276,
    requestedAt: "2026-04-26T09:00:00+09:00",
    completedAt: "2026-04-27T10:05:00+09:00",
    description:
      "인턴 경험을 바탕으로 협업 역량과 문제 해결 경험을 설명한 면접 답변입니다.",
    totalScore: "74.5",
    overallComment:
      "경험 자체는 좋지만 상황, 행동, 결과가 한 번에 섞여 들립니다. 답변을 세 구간으로 나누고 결과 수치를 마지막에 배치해보세요.",
    comments: [
      {
        id: 1,
        startTimeSeconds: 13,
        endTimeSeconds: 24,
        content:
          "상황 설명이 길어지고 있습니다. 본인이 맡은 역할을 더 빨리 말해주세요.",
      },
      {
        id: 2,
        startTimeSeconds: 58,
        endTimeSeconds: 70,
        content:
          "협업 갈등을 해결한 행동이 구체적입니다. 이 부분은 좋은 강점으로 보입니다.",
      },
    ],
    rubricScores: [
      { id: 1, title: "핵심 메시지 전달력", category: "delivery", score: 7 },
      { id: 2, title: "논리적 구성", category: "speech", score: 7 },
      { id: 3, title: "내용 완성도", category: "speech", score: 8 },
      { id: 4, title: "정보 정확성", category: "speech", score: 8 },
      { id: 5, title: "설득력", category: "delivery", score: 7 },
      { id: 6, title: "말 속도 적절성", category: "delivery", score: 7 },
      { id: 7, title: "발화 안정성", category: "delivery", score: 8 },
      { id: 8, title: "발음 명확성", category: "delivery", score: 8 },
      { id: 9, title: "음성 변화", category: "delivery", score: 7 },
      { id: 10, title: "필러워드 사용", category: "speech", score: 7 },
      { id: 11, title: "시선 처리", category: "nonVerbal", score: 7 },
      { id: 12, title: "제스처 활용", category: "nonVerbal", score: 7 },
      { id: 13, title: "자세 안정성", category: "nonVerbal", score: 8 },
      { id: 14, title: "표정 활용", category: "nonVerbal", score: 7 },
      { id: 15, title: "자신감 표현", category: "nonVerbal", score: 8 },
      { id: 16, title: "시간 활용", category: "delivery", score: 7 },
      { id: 17, title: "발표 흐름", category: "speech", score: 7 },
      { id: 18, title: "내용 연결성", category: "speech", score: 8 },
      { id: 19, title: "집중도 유지", category: "delivery", score: 7 },
      { id: 20, title: "전체 완성도", category: "delivery", score: 8 },
    ],
  },
];
