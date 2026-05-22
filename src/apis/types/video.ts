export interface VideoUploadRequest {
  title: string;
  description: string;
  videoType: "UPLOAD" | "RECORD";
  // practiceType: "PRESENTATION" | "INTERVIEW" | "SPEECH";
  requestedMentorId?: number | null;
  file: File;
}

export interface VideoUploadResponse {
  videoId: number;
  ownerId: number;
  ownerNickname: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  type: "UPLOAD" | "RECORD";
  // practiceType: "PRESENTATION" | "INTERVIEW" | "SPEECH";
  requestedMentorId: number | null;
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
