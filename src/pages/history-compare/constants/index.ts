import type { ComparedTotalScoreType, CompareRubricDetailType } from "../types";

export const DUMMY_COMPARED_SESSION1: ComparedTotalScoreType = {
  videoId: 3,
  videoTitle: "프로젝트 최종 발표 연습 1회차",
  totalScore: 65,
  durationSeconds: 80,
  createdAt: "2026-04-12T14:08:37.442Z",
};

export const DUMMY_COMPARED_SESSION2: ComparedTotalScoreType = {
  videoId: 5,
  videoTitle: "발표 연습 5회차",
  totalScore: 82,
  durationSeconds: 64,
  createdAt: "2026-04-19T14:08:37.442Z",
};

export const EVAL_CATEGORY = ["스피치", "비언어", "전달력/표현력"];

export const DUMMY_COMPARED_CATEGORY = {
  session1: {
    speechAvg: 0.5,
    nonVerbalAvg: 0.4,
    deliveryAvg: 0.6,
  },
  session2: {
    speechAvg: 0.7,
    nonVerbalAvg: 0.8,
    deliveryAvg: 0.9,
  },
};

export const DUMMY_COMPARED_DETAIL: CompareRubricDetailType[] = [
  {
    rubricId: 1,
    rubricTitle: "핵심 전달력",
    session1Score: 5,
    session2Score: 7,
  },
  {
    rubricId: 2,
    rubricTitle: "논리적 구성",
    session1Score: 4,
    session2Score: 5,
  },
  {
    rubricId: 3,
    rubricTitle: "내용 완성도",
    session1Score: 6,
    session2Score: 9,
  },
  {
    rubricId: 4,
    rubricTitle: "정보 정확성",
    session1Score: 6,
    session2Score: 6,
  },
  {
    rubricId: 5,
    rubricTitle: "설득력",
    session1Score: 4,
    session2Score: 5,
  },
  {
    rubricId: 6,
    rubricTitle: "말 속도 적절성",
    session1Score: 8,
    session2Score: 9,
  },
  {
    rubricId: 7,
    rubricTitle: "발화 안정성",
    session1Score: 7,
    session2Score: 7,
  },
  {
    rubricId: 8,
    rubricTitle: "발음 명확성",
    session1Score: 9,
    session2Score: 9,
  },
  {
    rubricId: 9,
    rubricTitle: "음성 변화",
    session1Score: 6,
    session2Score: 7,
  },
  {
    rubricId: 10,
    rubricTitle: "필러워드 사용",
    session1Score: 5,
    session2Score: 9,
  },
  {
    rubricId: 11,
    rubricTitle: "시선 처리",
    session1Score: 7,
    session2Score: 8,
  },
  {
    rubricId: 12,
    rubricTitle: "제스처 활용",
    session1Score: 9,
    session2Score: 7,
  },
  {
    rubricId: 13,
    rubricTitle: "자세 안정성",
    session1Score: 6,
    session2Score: 7,
  },
  {
    rubricId: 14,
    rubricTitle: "표정 활용",
    session1Score: 5,
    session2Score: 7,
  },
  {
    rubricId: 15,
    rubricTitle: "자신감 표현",
    session1Score: 5,
    session2Score: 8,
  },
  {
    rubricId: 16,
    rubricTitle: "시간 활용",
    session1Score: 3,
    session2Score: 4,
  },
  {
    rubricId: 17,
    rubricTitle: "발표 흐름",
    session1Score: 3,
    session2Score: 6,
  },
  {
    rubricId: 18,
    rubricTitle: "내용 연결성",
    session1Score: 6,
    session2Score: 7,
  },
  {
    rubricId: 19,
    rubricTitle: "집중도 유지",
    session1Score: 5,
    session2Score: 7,
  },
  {
    rubricId: 20,
    rubricTitle: "전체 완성도",
    session1Score: 7,
    session2Score: 9,
  },
];

export const DUMMY_COMPARE_OVERALL_COMMENT = {
  session1OverallComment: `전반적으로 내용 구성과 시간 활용은 우수하나, 비언어적 표현(시선, 제스처)과 필러워드 사용에서 개선이 필요합니다. 특히 발표 중 청중과의 아이컨택을 늘리고, "음...", "그..." 같은 습관적 표현을 줄이는 연습이 효과적입니다.`,
  session2OverallComment:
    "1회차 대비 전반적으로 크게 향상되었습니다. 특히 발음 명확성과 시선 처리가 개선되었고, 필러워드 사용도 줄었습니다. 제스처 활용을 조금 더 자연스럽게 연습하면 더욱 좋은 발표가 될 것입니다.",
};
