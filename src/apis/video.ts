import apiInstance from "@shared/apis";

import type { VideoUploadRequest, VideoUploadResponse } from "./types";
import { HISTORY_URL, VIDEO_URL } from "./constants";
import type { AllVideoHistoryResponse } from "./types/video";

export const videoUploadApi = async ({
  title,
  description,
  videoType,
  file,
}: VideoUploadRequest) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiInstance.post<VideoUploadResponse>(
    VIDEO_URL.DEFAULT,
    formData,
    {
      contentType: "form-data",
      params: { title, description, videoType },
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
