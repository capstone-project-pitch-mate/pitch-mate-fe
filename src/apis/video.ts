import apiInstance from "@shared/apis";

import type {
  AllVideoHistoryResponse,
  CompletedRequestedVideosResponse,
  RequestedVideosResponse,
  VideoCompareResponse,
  VideoHistoryDetailResponse,
  VideoUploadRequest,
  VideoUploadResponse,
} from "./types";
import { HISTORY_URL, VIDEO_URL } from "./constants";

export const videoUploadApi = async ({
  title,
  description,
  videoType,
  requestedMentorId,
  file,
}: VideoUploadRequest) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiInstance.post<VideoUploadResponse, FormData>(
    VIDEO_URL.DEFAULT,
    formData,
    {
      contentType: "form-data",
      params: {
        title,
        description,
        videoType,
        ...(requestedMentorId !== null &&
          requestedMentorId !== undefined && { requestedMentorId }),
      },
    },
  );

  return response.result;
};

export const getRequestedVideosApi = async () => {
  const response = await apiInstance.get<RequestedVideosResponse>(
    VIDEO_URL.REQUESTED,
  );

  return response.result;
};

export const getCompletedRequestedVideosApi = async () => {
  const response = await apiInstance.get<CompletedRequestedVideosResponse>(
    VIDEO_URL.REQUESTED_COMPLETED,
  );

  return response.result;
};

export const getVideoHistoryApi = async () => {
  const response = await apiInstance.get<AllVideoHistoryResponse>(
    HISTORY_URL.DEFAULT,
  );

  return response.result;
};

export const getVideoHistoryDetailApi = async (videoId: number) => {
  const response = await apiInstance.get<VideoHistoryDetailResponse>(
    HISTORY_URL.DETAIL(videoId),
  );

  return response.result;
};

export const getVideoCompareApi = async (videoId1: number, videoId2: number) => {
  const response = await apiInstance.get<VideoCompareResponse>(
    HISTORY_URL.COMPARE,
    {
      params: {
        videoId1,
        videoId2,
      },
    },
  );

  return response.result;
};
