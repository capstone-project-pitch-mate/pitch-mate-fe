// TEMP_DUMMY_DATA: restore apiInstance import when API integration resumes.
// import apiInstance from "@shared/apis";

import type { VideoUploadRequest } from "./types";
// TEMP_DUMMY_DATA: restore response type imports when API integration resumes.
// import type { VideoUploadResponse } from "./types";
// import type { AllVideoHistoryResponse } from "./types/video";
// TEMP_DUMMY_DATA: restore URL constants when API integration resumes.
// import { HISTORY_URL, VIDEO_URL } from "./constants";
import {
  createDummyVideoUploadResponse,
  getDummyVideoHistoryResponse,
} from "./dummy-data";

export const videoUploadApi = async ({
  title,
  description,
  videoType,
  file,
}: VideoUploadRequest) => {
  // TEMP_DUMMY_DATA: original upload API call is preserved below while dummy data is used.
  // const formData = new FormData();
  // formData.append("file", file);

  // const response = await apiInstance.post<VideoUploadResponse>(
  //   VIDEO_URL.DEFAULT,
  //   formData,
  //   {
  //     contentType: "form-data",
  //     params: { title, description, videoType },
  //   },
  // );
  //
  // return response.result;

  // ADDED_DUMMY_DATA: return local upload response until backend contract is reconnected.
  return createDummyVideoUploadResponse({ title, description, videoType, file });
};

export const getVideoHistoryApi = async () => {
  // TEMP_DUMMY_DATA: original history API call is preserved below while dummy data is used.
  // const response = await apiInstance.get<AllVideoHistoryResponse>(
  //   HISTORY_URL.DEFAULT,
  // );
  //
  // return response.result;

  // ADDED_DUMMY_DATA: return local history response until backend contract is reconnected.
  return getDummyVideoHistoryResponse();
};
