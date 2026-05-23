import { useQuery } from "@tanstack/react-query";

import { VIDEO_QUERY_KEY } from "@apis/query-key";
import type { RequestedVideosResponse } from "@apis/types";
import { getRequestedVideosApi } from "@apis/video";

export const useRequestedVideosQuery = () => {
  const {
    data: requestedVideos,
    isPending: isPendingRequestedVideos,
    isError: isErrorRequestedVideos,
    error: requestedVideosError,
  } = useQuery<RequestedVideosResponse>({
    queryKey: VIDEO_QUERY_KEY.REQUESTED,
    queryFn: () => getRequestedVideosApi(),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  return {
    requestedVideos,
    isPendingRequestedVideos,
    isErrorRequestedVideos,
    requestedVideosError,
  };
};
