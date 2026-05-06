export interface FeedbackType {
  id: number;
  authorId: number;
  authorNickname: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  content: string;
  createdAt: string;
}

export interface RubricDetailType {
  rubricId: number;
  rubricTitle: string;
  score: number;
}

export type FeedbackViewType = "AI" | "MENTOR" | "ALL";

export interface FeedbackCategoryScore {
  speechAvg: number;
  nonVerbalAvg: number;
  deliveryAvg: number;
}

export interface FeedbackResult {
  label: string;
  overallComment: string;
  feedbacks: FeedbackType[];
  totalScore: number;
  categoryScore: FeedbackCategoryScore;
  rubricScores: RubricDetailType[];
}
