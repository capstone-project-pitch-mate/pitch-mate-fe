import type {
  AllVideoHistoryResponse,
  DashboardResponse,
  VideoUploadRequest,
  VideoUploadResponse,
} from "./types";

// ADDED_DUMMY_DATA: API-connected screens use these local responses while mentor/mentee UI is being built.
export const DUMMY_DASHBOARD_RESPONSE: DashboardResponse = {
  userId: 1,
  email: "user@example.com",
  nickname: "김발표",
  role: "MENTEE",
  profileImage: "https://placehold.co/120/png",
  createdAt: "2025-12-01",
  totalVideos: 4,
  analyzedVideos: 3,
  averageScore: 73.2,
  recentVideos: [
    {
      videoId: 1,
      title: "서비스 소개 발표",
      thumbnailUrl: "https://placehold.co/640x360/png",
      createdAt: "2026-04-28",
      durationSeconds: 184,
      analysisStatus: "COMPLETED",
    },
    {
      videoId: 2,
      title: "기술 면접 답변 연습",
      thumbnailUrl: "https://placehold.co/640x360/png",
      createdAt: "2026-04-29",
      durationSeconds: 236,
      analysisStatus: "COMPLETED",
    },
    {
      videoId: 3,
      title: "캡스톤 최종 발표",
      thumbnailUrl: "https://placehold.co/640x360/png",
      createdAt: "2026-05-01",
      durationSeconds: 312,
      analysisStatus: "PROCESSING",
    },
  ],
};

export const DUMMY_VIDEO_HISTORY_RESPONSE: AllVideoHistoryResponse = [
  {
    videoId: 1,
    videoTitle: "서비스 소개 발표",
    videoThumbnailUrl: "https://placehold.co/640x360/png",
    durationSeconds: 184,
    totalScore: 78,
    analysisStatus: "COMPLETED",
    createdAt: "2026-04-28",
  },
  {
    videoId: 2,
    videoTitle: "기술 면접 답변 연습",
    videoThumbnailUrl: "https://placehold.co/640x360/png",
    durationSeconds: 236,
    totalScore: 72,
    analysisStatus: "COMPLETED",
    createdAt: "2026-04-29",
  },
  {
    videoId: 3,
    videoTitle: "캡스톤 최종 발표",
    videoThumbnailUrl: "https://placehold.co/640x360/png",
    durationSeconds: 312,
    totalScore: 0,
    analysisStatus: "PROCESSING",
    createdAt: "2026-05-01",
  },
];

const DUMMY_HISTORY_STORAGE_KEY = "dummyVideoHistoryList";

const readDummyHistory = (): AllVideoHistoryResponse => {
  const savedHistory = localStorage.getItem(DUMMY_HISTORY_STORAGE_KEY);

  if (!savedHistory) {
    return DUMMY_VIDEO_HISTORY_RESPONSE;
  }

  try {
    return JSON.parse(savedHistory) as AllVideoHistoryResponse;
  } catch {
    return DUMMY_VIDEO_HISTORY_RESPONSE;
  }
};

const writeDummyHistory = (historyList: AllVideoHistoryResponse) => {
  localStorage.setItem(DUMMY_HISTORY_STORAGE_KEY, JSON.stringify(historyList));
};

// ADDED_DUMMY_DATA: exposes mutable local history so dummy uploads appear in the history screen.
export const getDummyVideoHistoryResponse = () => readDummyHistory();

// ADDED_DUMMY_DATA: local upload response keeps the upload flow usable without the video API.
export const createDummyVideoUploadResponse = ({
  title,
  description,
  videoType,
  requestedMentorId,
  file,
}: VideoUploadRequest): VideoUploadResponse => ({
  videoId: Date.now(),
  ownerId: 1,
  ownerNickname: "김발표",
  title,
  description,
  videoUrl: URL.createObjectURL(file),
  thumbnailUrl: "https://placehold.co/640x360/png",
  type: videoType,
  practiceType: null,
  requestedMentorId: requestedMentorId ?? null,
  durationSeconds: 180,
  createdAt: new Date().toISOString(),
});

// ADDED_DUMMY_DATA: appends a dummy upload result to local history until the upload API is restored.
export const addDummyUploadedVideoToHistory = (
  uploadResponse: VideoUploadResponse,
) => {
  const nextHistory: AllVideoHistoryResponse = [
    {
      videoId: uploadResponse.videoId,
      videoTitle: uploadResponse.title,
      videoThumbnailUrl:
        uploadResponse.thumbnailUrl ?? "https://placehold.co/640x360/png",
      durationSeconds: uploadResponse.durationSeconds ?? 0,
      totalScore: 0,
      analysisStatus: "PROCESSING",
      createdAt: uploadResponse.createdAt,
    },
    ...readDummyHistory(),
  ];

  writeDummyHistory(nextHistory);
};
