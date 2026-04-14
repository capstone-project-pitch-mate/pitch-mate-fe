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
