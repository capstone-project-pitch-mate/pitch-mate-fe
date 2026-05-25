export type RubricCategory = "SPEECH" | "NON_VERBAL" | "DELIVERY" | string;
export type FeedbackRating = "GOOD" | "NORMAL" | "BAD";

export interface Rubric {
  rubricId: number;
  title: string;
  description: string;
  category: RubricCategory;
  maxScore: number;
  displayOrder: number;
}

export type RubricsResponse = Rubric[];

export interface CreateMentorFeedbackRequest {
  rubricId?: number;
  rating: FeedbackRating;
  startTimeSeconds: number;
  endTimeSeconds: number;
  content: string;
}

export interface MentorFeedbackResponse {
  feedbackId: number;
  authorId: number;
  authorNickname: string;
  rubricId: number | null;
  rubricTitle: string | null;
  rating: FeedbackRating | string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  content: string;
  type: string;
  createdAt: string;
}

export interface CreateMentorEvaluationScore {
  rubricId: number;
  score: number;
}

export interface CreateMentorEvaluationRequest {
  scores: CreateMentorEvaluationScore[];
  comment: string;
}

export interface MentorEvaluationResponse {
  evaluationId: number;
  videoId: number;
  evaluatorId: number;
  evaluatorNickname: string;
  type: string;
  totalScore: number;
  maxTotalScore: number;
  comment: string;
  scores: CreateMentorEvaluationScore[];
  createdAt: string;
}

export interface SubmitMentorFeedbackRequest {
  videoId: number;
  feedbacks: CreateMentorFeedbackRequest[];
  evaluation: CreateMentorEvaluationRequest;
}

export interface SubmitMentorFeedbackResponse {
  feedbacks: MentorFeedbackResponse[];
  evaluation: MentorEvaluationResponse;
}
