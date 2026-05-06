import type {
  MentorRubricScore,
  SegmentComment,
} from "@pages/mentor-requested-videos/types";

export interface MentorFeedbackHistoryItem {
  id: number;
  videoId: number;
  title: string;
  menteeNickname: string;
  thumbnailUrl: string;
  videoUrl: string;
  durationSeconds: number;
  requestedAt: string;
  completedAt: string;
  description: string;
  totalScore: string;
  overallComment: string;
  comments: SegmentComment[];
  rubricScores: MentorRubricScore[];
}
