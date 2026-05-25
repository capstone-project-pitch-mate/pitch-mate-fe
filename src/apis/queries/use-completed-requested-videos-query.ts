import { useQuery } from "@tanstack/react-query";

import { VIDEO_QUERY_KEY } from "@apis/query-key";
import type { CompletedRequestedVideosResponse } from "@apis/types";
import { getCompletedRequestedVideosApi } from "@apis/video";

export const useCompletedRequestedVideosQuery = () => {
  const {
    data: completedRequestedVideos,
    isPending: isPendingCompletedRequestedVideos,
    isError: isErrorCompletedRequestedVideos,
    error: completedRequestedVideosError,
  } = useQuery<CompletedRequestedVideosResponse>({
    queryKey: VIDEO_QUERY_KEY.REQUESTED_COMPLETED,
    queryFn: () => getCompletedRequestedVideosApi(),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  return {
    completedRequestedVideos,
    completedRequestedVideosError,
    isPendingCompletedRequestedVideos,
    isErrorCompletedRequestedVideos,
  };
};
