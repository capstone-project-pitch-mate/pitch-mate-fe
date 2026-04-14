export interface ComparedTotalScoreType {
  videoId: number;
  videoTitle: string;
  totalScore: number;
  durationSeconds: number;
  createdAt: string;
}

export interface CompareRubricDetailType {
  rubricId: number;
  rubricTitle: string;
  session1Score: number;
  session2Score: number;
}
