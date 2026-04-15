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
  role: string;
  profileImage: string;
  createdAt: string;
  totalVideos: number;
  analyzedVideos: number;
  averageScore: number;
  recentVideos: RecentVideosType[];
}
