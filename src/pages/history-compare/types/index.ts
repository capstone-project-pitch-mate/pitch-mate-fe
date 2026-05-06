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

export interface ComparedCategoryType {
  session1: {
    speechAvg: number;
    nonVerbalAvg: number;
    deliveryAvg: number;
  };
  session2: {
    speechAvg: number;
    nonVerbalAvg: number;
    deliveryAvg: number;
  };
}

export interface CompareOverallCommentType {
  session1OverallComment: string;
  session2OverallComment: string;
}

export interface CompareFeedbackResult {
  label: string;
  session1: ComparedTotalScoreType;
  session2: ComparedTotalScoreType;
  category: ComparedCategoryType;
  detail: CompareRubricDetailType[];
  overallComment: CompareOverallCommentType;
}
