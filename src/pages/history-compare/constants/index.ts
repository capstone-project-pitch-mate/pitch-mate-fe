import type { CompareFeedbackResult } from "../types";

export const EVAL_CATEGORY = ["스피치", "비언어", "전달 표현"];

const AI_DETAIL = [
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
    rubricTitle: "정보 정확도",
    session1Score: 6,
    session2Score: 6,
  },
  { rubricId: 5, rubricTitle: "설득력", session1Score: 4, session2Score: 5 },
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
  { rubricId: 9, rubricTitle: "음성 변화", session1Score: 6, session2Score: 7 },
  {
    rubricId: 10,
    rubricTitle: "필러워드 사용",
    session1Score: 5,
    session2Score: 9,
  },
];

const MENTOR_DETAIL = [
  {
    rubricId: 1,
    rubricTitle: "핵심 전달력",
    session1Score: 7,
    session2Score: 8,
  },
  {
    rubricId: 2,
    rubricTitle: "논리적 구성",
    session1Score: 6,
    session2Score: 8,
  },
  {
    rubricId: 3,
    rubricTitle: "내용 완성도",
    session1Score: 7,
    session2Score: 8,
  },
  {
    rubricId: 4,
    rubricTitle: "정보 정확도",
    session1Score: 8,
    session2Score: 8,
  },
  { rubricId: 5, rubricTitle: "설득력", session1Score: 6, session2Score: 8 },
  {
    rubricId: 6,
    rubricTitle: "말 속도 적절성",
    session1Score: 7,
    session2Score: 8,
  },
  {
    rubricId: 7,
    rubricTitle: "발화 안정성",
    session1Score: 7,
    session2Score: 8,
  },
  {
    rubricId: 8,
    rubricTitle: "발음 명확성",
    session1Score: 8,
    session2Score: 9,
  },
  { rubricId: 9, rubricTitle: "음성 변화", session1Score: 6, session2Score: 7 },
  {
    rubricId: 10,
    rubricTitle: "필러워드 사용",
    session1Score: 6,
    session2Score: 8,
  },
];

export const AI_COMPARE_RESULT: CompareFeedbackResult = {
  label: "AI 피드백 비교",
  session1: {
    videoId: 3,
    videoTitle: "프로젝트 최종 발표 연습 1회차",
    totalScore: 65,
    durationSeconds: 80,
    createdAt: "2026-04-12T14:08:37.442Z",
  },
  session2: {
    videoId: 5,
    videoTitle: "발표 연습 5회차",
    totalScore: 82,
    durationSeconds: 64,
    createdAt: "2026-04-19T14:08:37.442Z",
  },
  category: {
    session1: { speechAvg: 0.5, nonVerbalAvg: 0.4, deliveryAvg: 0.6 },
    session2: { speechAvg: 0.7, nonVerbalAvg: 0.8, deliveryAvg: 0.9 },
  },
  detail: AI_DETAIL,
  overallComment: {
    session1OverallComment:
      "1회차는 내용 구성은 안정적이지만 시선 처리와 필러워드 사용에서 개선이 필요합니다.",
    session2OverallComment:
      "5회차는 발음 명확성과 시선 처리가 좋아졌고 전체 흐름도 더 자연스러워졌습니다.",
  },
};

export const MENTOR_COMPARE_RESULT: CompareFeedbackResult = {
  label: "멘토 피드백 비교",
  session1: {
    videoId: 3,
    videoTitle: "프로젝트 최종 발표 연습 1회차",
    totalScore: 70,
    durationSeconds: 80,
    createdAt: "2026-04-12T14:08:37.442Z",
  },
  session2: {
    videoId: 5,
    videoTitle: "발표 연습 5회차",
    totalScore: 84,
    durationSeconds: 64,
    createdAt: "2026-04-19T14:08:37.442Z",
  },
  category: {
    session1: { speechAvg: 0.65, nonVerbalAvg: 0.55, deliveryAvg: 0.72 },
    session2: { speechAvg: 0.78, nonVerbalAvg: 0.72, deliveryAvg: 0.86 },
  },
  detail: MENTOR_DETAIL,
  overallComment: {
    session1OverallComment:
      "1회차는 문제 정의와 해결책 사이의 연결이 약했습니다. 청중이 따라올 수 있는 전환 문장이 필요합니다.",
    session2OverallComment:
      "5회차는 흐름이 크게 좋아졌습니다. 마지막 요청 사항을 더 단정적으로 말하면 완성도가 더 올라갑니다.",
  },
};
