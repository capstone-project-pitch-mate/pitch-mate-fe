import type { FeedbackType, RubricDetailType } from "../types";

export const DUMMY_DETAIL_VIDEO_INFO = {
  title: "프로젝트 최종 발표 연습 1회차",
  videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
  createdAt: "2026-04-14T09:38:32.871Z",
  durationSeconds: 30,
};

export const DUMMY_OVERALL_COMMENT = `전반적으로 내용 구성과 시간 활용은 우수하나, 비언어적 표현(시선, 제스처)과 필러워드 사용에서 개선이 필요합니다. 특히 발표 중 청중과의 아이컨택을 늘리고, "음...", "그..." 같은 습관적 표현을 줄이는 연습이 효과적입니다.`;

export const DUMMY_FEEDBACKS: FeedbackType[] = [
  {
    id: 1,
    authorId: 101,
    authorNickname: "김발표",
    startTimeSeconds: 3,
    endTimeSeconds: 8,
    content:
      "도입부에서 인사와 자기소개는 자연스러웠지만, 첫 문장의 속도가 조금 빨라서 전달력이 살짝 떨어졌어요.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 2,
    authorId: 102,
    authorNickname: "이면접",
    startTimeSeconds: 10,
    endTimeSeconds: 15,
    content:
      "이 구간에서 시선이 아래로 자주 내려가 보여요. 카메라를 조금 더 자주 바라보면 자신감 있는 인상을 줄 수 있습니다.",
    createdAt: "2026-04-14T10:02:00",
  },
  {
    id: 3,
    authorId: 103,
    authorNickname: "박코치",
    startTimeSeconds: 16,
    endTimeSeconds: 22,
    content:
      "핵심 경험을 설명하는 부분은 좋았어요. 다만 손동작이 거의 없어서 조금 딱딱하게 느껴질 수 있습니다.",
    createdAt: "2026-04-14T10:05:00",
  },
  {
    id: 4,
    authorId: 104,
    authorNickname: "최피드백",
    startTimeSeconds: 23,
    endTimeSeconds: 28,
    content:
      "중간에 잠깐 멈추는 구간이 있는데, 오히려 생각을 정리하는 느낌은 좋았습니다. 다만 침묵이 너무 길어지지 않도록 주의하면 더 좋아요.",
    createdAt: "2026-04-14T10:08:00",
  },
  {
    id: 5,
    authorId: 105,
    authorNickname: "정연습",
    startTimeSeconds: 29,
    endTimeSeconds: 35,
    content:
      "마무리 문장은 분명하고 좋았습니다. 마지막에 미소를 조금 더 보여주면 전체 인상이 더 부드러워질 것 같아요.",
    createdAt: "2026-04-14T10:10:00",
  },
];

export const DUMMY_HISTORY_TOTAL_SCORE = 65;

export const DUMMY_RUBRIC_CATEGORY = {
  speechAvg: 0.5,
  nonVerbalAvg: 0.4,
  deliveryAvg: 0.6,
};

export const DUMMY_RUBRIC_SCORE: RubricDetailType[] = [
  {
    rubricId: 1,
    rubricTitle: "핵심 전달력",
    score: 5,
  },
  {
    rubricId: 2,
    rubricTitle: "논리적 구성",
    score: 4,
  },
  {
    rubricId: 3,
    rubricTitle: "내용 완성도",
    score: 6,
  },
  {
    rubricId: 4,
    rubricTitle: "정보 정확성",
    score: 6,
  },
  {
    rubricId: 5,
    rubricTitle: "설득력",
    score: 4,
  },
  {
    rubricId: 6,
    rubricTitle: "말 속도 적절성",
    score: 8,
  },
  {
    rubricId: 7,
    rubricTitle: "발화 안정성",
    score: 7,
  },
  {
    rubricId: 8,
    rubricTitle: "발음 명확성",
    score: 9,
  },
  {
    rubricId: 9,
    rubricTitle: "음성 변화",
    score: 6,
  },
  {
    rubricId: 10,
    rubricTitle: "필러워드 사용",
    score: 5,
  },
  {
    rubricId: 11,
    rubricTitle: "시선 처리",
    score: 7,
  },
  {
    rubricId: 12,
    rubricTitle: "제스처 활용",
    score: 9,
  },
  {
    rubricId: 13,
    rubricTitle: "자세 안정성",
    score: 6,
  },
  {
    rubricId: 14,
    rubricTitle: "표정 활용",
    score: 5,
  },
  {
    rubricId: 15,
    rubricTitle: "자신감 표현",
    score: 5,
  },
  {
    rubricId: 16,
    rubricTitle: "시간 활용",
    score: 3,
  },
  {
    rubricId: 17,
    rubricTitle: "발표 흐름",
    score: 3,
  },
  {
    rubricId: 18,
    rubricTitle: "내용 연결성",
    score: 6,
  },
  {
    rubricId: 19,
    rubricTitle: "집중도 유지",
    score: 5,
  },
  {
    rubricId: 20,
    rubricTitle: "전체 완성도",
    score: 7,
  },
];
