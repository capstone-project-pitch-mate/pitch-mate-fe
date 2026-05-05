export interface VideoUploadRequest {
  title: string;
  description: string;
  videoType: "UPLOAD" | "RECORD";
  file: File;
}

export interface VideoUploadResponse {
  videoId: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationSeconds: number;
  createdAt: string;
}

export type AllVideoHistoryResponse = {
  videoId: number;
  videoTitle: string;
  videoThumbnailUrl: string;
  durationSeconds: number;
  totalScore: number;
  analysisStatus: string;
  createdAt: string;
}[];
