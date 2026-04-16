import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { VideoUploadResponse, VideoUploadRequest } from "@apis/types";
import { videoUploadApi } from "@apis/video";
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
    mutationFn: (data: VideoUploadRequest) => videoUploadApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY.DEFAULT });
      qc.invalidateQueries({ queryKey: HISTORY_QUERY_KEY.DEFAULT });
      toast.info("동영상이 업로드되었습니다.");
      navigate(ROUTES.VIDEO_HISTORY);
    },
    onError: (error) => {
      toast.error(`업로드 실패: ${error.message}`);
    },
    retry: 2,
  });

  return { uploadVideo, isPendingUploadVideo };
};
