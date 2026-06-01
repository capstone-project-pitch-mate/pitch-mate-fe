import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deleteVideoApi } from "@apis/video";
import {
  DASHBOARD_QUERY_KEY,
  HISTORY_QUERY_KEY,
  VIDEO_QUERY_KEY,
} from "@apis/query-key";
import type { DeleteVideoResponse } from "@apis/types";
import useToast from "@hooks/use-toast";
import type { ApiError } from "@shared/apis";

export const useDeleteVideoMutation = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: deleteVideo, isPending: isPendingDeleteVideo } = useMutation<
    DeleteVideoResponse,
    ApiError,
    number
  >({
    mutationFn: (videoId) => deleteVideoApi(videoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY.MENTEE });
      qc.invalidateQueries({ queryKey: HISTORY_QUERY_KEY.DEFAULT });
      qc.invalidateQueries({ queryKey: VIDEO_QUERY_KEY.REQUESTED });
      qc.invalidateQueries({ queryKey: VIDEO_QUERY_KEY.REQUESTED_COMPLETED });
      toast.info("영상이 삭제되었습니다.");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(`영상 삭제 실패: ${error.message}`);
    },
    retry: 0,
  });

  return { deleteVideo, isPendingDeleteVideo };
};
