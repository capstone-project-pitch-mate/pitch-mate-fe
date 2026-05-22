import apiInstance from "@shared/apis";

import type {
  AllVideoHistoryResponse,
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

export const getVideoHistoryApi = async () => {
  const response = await apiInstance.get<AllVideoHistoryResponse>(
    HISTORY_URL.DEFAULT,
  );

  return response.result;
};
