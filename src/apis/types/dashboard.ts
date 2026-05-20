import type { UserRole } from "@shared/types";

export interface RecentVideosType {
  videoId: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  durationSeconds: number;
  analysisStatus: string;
}

export interface DashboardResponse {
  userId: number;
  email: string;
  nickname: string;
  // ADDED_ROLE_FLOW: dashboard data now exposes the current user's role.
  role: UserRole;
  profileImage: string;
  createdAt: string;
  totalVideos: number;
  analyzedVideos: number;
  averageScore: number;
  recentVideos: RecentVideosType[];
}
