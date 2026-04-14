import type { ComparedTotalScoreType } from "../types";

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

export const DUMMY_COMPARED_CATEGORY = {
  session1: {
    speechAvg: 0.5,
    nonVerbalAvg: 0.4,
    deliveryAvg: 0.6,
  },
  session2: {
    speechAvg: 0.7,
    nonVerbalAvg: 0.8,
    deliveryAvg: 0.8,
  },
};
