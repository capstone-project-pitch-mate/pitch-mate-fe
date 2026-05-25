import type { UserInfoResponse } from "./user";

export interface RecentVideosType {
  videoId: number;
  title: string;
  thumbnailUrl: string | null;
  createdAt: string;
  durationSeconds: number | null;
  analysisStatus: string;
}

export interface MenteeDashboardResponse {
  totalVideos: number;
  analyzedVideos: number;
  averageScore: number | null;
  connectedMentorsCount: number;
  recentVideos: RecentVideosType[];
}

export type DashboardResponse = UserInfoResponse & MenteeDashboardResponse;

export interface MentorDashboardRequestedVideo {
  videoId: number;
  title: string;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  menteeId: number;
  menteeNickname: string;
  createdAt: string;
}

export interface MentorDashboardResponse {
  pendingFeedbackCount: number;
  completedFeedbackCount: number;
  connectedMenteeCount: number;
  requestedVideos: MentorDashboardRequestedVideo[];
}
