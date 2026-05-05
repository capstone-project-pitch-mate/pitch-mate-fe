import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { VideoUploadResponse, VideoUploadRequest } from "@apis/types";
import {
  addDummyUploadedVideoToHistory,
  createDummyVideoUploadResponse,
} from "@apis/dummy-data";
// TEMP_DUMMY_DATA: restore this import and mutationFn call when API integration resumes.
// import { videoUploadApi } from "@apis/video";
import useToast from "@hooks/use-toast";
import { ROUTES } from "@router/constants";
import { DASHBOARD_QUERY_KEY, HISTORY_QUERY_KEY } from "@apis/query-key";

export const useVideoUploadMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const qc = useQueryClient();

  const { mutate: uploadVideo, isPending: isPendingUploadVideo } = useMutation<
    VideoUploadResponse,
    Error,
    VideoUploadRequest
  >({
    // TEMP_DUMMY_DATA: original upload API call is preserved below while dummy video data is used.
    // mutationFn: (data: VideoUploadRequest) => videoUploadApi(data),
    mutationFn: async (data: VideoUploadRequest) =>
      createDummyVideoUploadResponse(data),
    onSuccess: (uploadResponse) => {
      // ADDED_DUMMY_DATA: keep dummy history in sync because React Query is bypassed temporarily.
      addDummyUploadedVideoToHistory(uploadResponse);
      qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY.DEFAULT });
      qc.invalidateQueries({ queryKey: HISTORY_QUERY_KEY.DEFAULT });
      toast.info("동영상이 업로드되었습니다.");
      navigate(ROUTES.VIDEO_HISTORY);
    },
    onError: (error) => {
      toast.error(`업로드 실패: ${error.message}`);
    },
    retry: 0, // 동영상 업로드의 경우 retry를 진행하면 중복 업로드가 발생할 수 있음
  });

  return { uploadVideo, isPendingUploadVideo };
};
