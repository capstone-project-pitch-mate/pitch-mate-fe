import type {
  FeedbackResult,
  FeedbackType,
  FeedbackViewType,
  RubricDetailType,
} from "../types";

export const DUMMY_DETAIL_VIDEO_INFO = {
  title: "프로젝트 최종 발표 연습 1회차",
  videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
  createdAt: "2026-04-14T09:38:32.871Z",
  durationSeconds: 30,
};

export const FEEDBACK_VIEW_OPTIONS: {
  label: string;
  value: FeedbackViewType;
}[] = [
  { label: "AI 피드백", value: "AI" },
  { label: "멘토 피드백", value: "MENTOR" },
  { label: "전체", value: "ALL" },
];

const AI_FEEDBACKS: FeedbackType[] = [
  {
    id: 1,
    authorId: 101,
    authorNickname: "AI 분석",
    startTimeSeconds: 3,
    endTimeSeconds: 8,
    content:
      "도입부에서 발표 주제는 명확하지만 첫 문장의 속도가 조금 빨라 핵심 메시지가 약하게 전달됩니다.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 2,
    authorId: 102,
    authorNickname: "AI 분석",
    startTimeSeconds: 10,
    endTimeSeconds: 15,
    content:
      "이 구간에서 시선이 아래로 자주 내려갑니다. 카메라를 더 자주 바라보면 자신감 있는 인상을 줄 수 있습니다.",
    createdAt: "2026-04-14T10:02:00",
  },
  {
    id: 3,
    authorId: 103,
    authorNickname: "AI 분석",
    startTimeSeconds: 16,
    endTimeSeconds: 22,
    content:
      "프로젝트 경험 설명은 좋지만 제스처가 거의 없어 다소 정적으로 보입니다.",
    createdAt: "2026-04-14T10:05:00",
  },
];

const MENTOR_FEEDBACKS: FeedbackType[] = [
  {
    id: 11,
    authorId: 201,
    authorNickname: "발표코치 수민",
    startTimeSeconds: 4,
    endTimeSeconds: 9,
    content:
      "문제 정의를 말한 뒤 바로 해결책으로 넘어가고 있습니다. 청중이 공감할 수 있도록 실제 사례를 한 문장 더 넣어보세요.",
    createdAt: "2026-04-14T13:00:00",
  },
  {
    id: 12,
    authorId: 201,
    authorNickname: "발표코치 수민",
    startTimeSeconds: 13,
    endTimeSeconds: 18,
    content:
      "기술 설명은 충분하지만 핵심 차별점이 묻힙니다. 이 부분은 '그래서 우리 서비스가 다른 점은'으로 문장을 분리하면 좋습니다.",
    createdAt: "2026-04-14T13:03:00",
  },
  {
    id: 13,
    authorId: 201,
    authorNickname: "발표코치 수민",
    startTimeSeconds: 24,
    endTimeSeconds: 29,
    content:
      "마무리에서 다음 행동 요청이 약합니다. 발표 마지막에는 기대 효과와 요청 사항을 더 단정적으로 말해보세요.",
    createdAt: "2026-04-14T13:06:00",
  },
];

const AI_RUBRIC_SCORE: RubricDetailType[] = [
  { rubricId: 1, rubricTitle: "핵심 전달력", score: 5 },
  { rubricId: 2, rubricTitle: "논리적 구성", score: 4 },
  { rubricId: 3, rubricTitle: "내용 완성도", score: 6 },
  { rubricId: 4, rubricTitle: "정보 정확도", score: 6 },
  { rubricId: 5, rubricTitle: "설득력", score: 4 },
  { rubricId: 6, rubricTitle: "말 속도 적절성", score: 8 },
  { rubricId: 7, rubricTitle: "발화 안정성", score: 7 },
  { rubricId: 8, rubricTitle: "발음 명확성", score: 9 },
  { rubricId: 9, rubricTitle: "음성 변화", score: 6 },
  { rubricId: 10, rubricTitle: "필러워드 사용", score: 5 },
  { rubricId: 11, rubricTitle: "시선 처리", score: 7 },
  { rubricId: 12, rubricTitle: "제스처 활용", score: 9 },
  { rubricId: 13, rubricTitle: "자세 안정성", score: 6 },
  { rubricId: 14, rubricTitle: "표정 활용", score: 5 },
  { rubricId: 15, rubricTitle: "자신감 표현", score: 5 },
  { rubricId: 16, rubricTitle: "시간 활용", score: 3 },
  { rubricId: 17, rubricTitle: "발표 흐름", score: 3 },
  { rubricId: 18, rubricTitle: "내용 연결성", score: 6 },
  { rubricId: 19, rubricTitle: "집중도 유지", score: 5 },
  { rubricId: 20, rubricTitle: "전체 완성도", score: 7 },
];

const MENTOR_RUBRIC_SCORE: RubricDetailType[] = [
  { rubricId: 1, rubricTitle: "핵심 전달력", score: 7 },
  { rubricId: 2, rubricTitle: "논리적 구성", score: 6 },
  { rubricId: 3, rubricTitle: "내용 완성도", score: 7 },
  { rubricId: 4, rubricTitle: "정보 정확도", score: 8 },
  { rubricId: 5, rubricTitle: "설득력", score: 6 },
  { rubricId: 6, rubricTitle: "말 속도 적절성", score: 7 },
  { rubricId: 7, rubricTitle: "발화 안정성", score: 7 },
  { rubricId: 8, rubricTitle: "발음 명확성", score: 8 },
  { rubricId: 9, rubricTitle: "음성 변화", score: 6 },
  { rubricId: 10, rubricTitle: "필러워드 사용", score: 6 },
  { rubricId: 11, rubricTitle: "시선 처리", score: 6 },
  { rubricId: 12, rubricTitle: "제스처 활용", score: 5 },
  { rubricId: 13, rubricTitle: "자세 안정성", score: 7 },
  { rubricId: 14, rubricTitle: "표정 활용", score: 6 },
  { rubricId: 15, rubricTitle: "자신감 표현", score: 7 },
  { rubricId: 16, rubricTitle: "시간 활용", score: 6 },
  { rubricId: 17, rubricTitle: "발표 흐름", score: 7 },
  { rubricId: 18, rubricTitle: "내용 연결성", score: 7 },
  { rubricId: 19, rubricTitle: "집중도 유지", score: 6 },
  { rubricId: 20, rubricTitle: "전체 완성도", score: 7 },
];

export const DUMMY_AI_FEEDBACK_RESULT: FeedbackResult = {
  label: "AI 피드백",
  overallComment:
    "전반적으로 내용 구성과 시간 활용은 우수하지만 시선, 제스처, 필러워드 사용에서 개선이 필요합니다.",
  feedbacks: AI_FEEDBACKS,
  totalScore: 65,
  categoryScore: {
    speechAvg: 0.5,
    nonVerbalAvg: 0.4,
    deliveryAvg: 0.6,
  },
  rubricScores: AI_RUBRIC_SCORE,
};

export const DUMMY_MENTOR_FEEDBACK_RESULT: FeedbackResult = {
  label: "멘토 피드백",
  overallComment:
    "발표의 기본 구조는 안정적입니다. 다만 문제 제기와 해결책 사이의 연결 문장을 보강하면 설득력이 더 좋아집니다.",
  feedbacks: MENTOR_FEEDBACKS,
  totalScore: 70,
  categoryScore: {
    speechAvg: 0.65,
    nonVerbalAvg: 0.55,
    deliveryAvg: 0.72,
  },
  rubricScores: MENTOR_RUBRIC_SCORE,
};
