import type { RecentVideosType } from "./dashboard";
import type { UserRole } from "@shared/types";

export interface UserInfoResponse {
  userId: number;
  email: string;
  nickname: string;
  role: UserRole;
  intro: string | null;
  profileImage: string | null;
  createdAt: string;
  totalVideos: number;
  analyzedVideos: number;
  averageScore: number | null;
  recentVideos: RecentVideosType[];
}
