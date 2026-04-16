import apiInstance from "@shared/apis";

import type { VideoUploadRequest, VideoUploadResponse } from "./types";
import { VIDEO_URL } from "./constants";

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
