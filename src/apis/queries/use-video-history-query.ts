import { useQuery } from "@tanstack/react-query";

import { HISTORY_QUERY_KEY } from "@apis/query-key";
import type { AllVideoHistoryResponse } from "@apis/types";
import { getVideoHistoryApi } from "@apis/video";

export const useVideoHistoryQuery = () => {
  const {
    data: allHistoryList,
    isPending: isPendingHistoryList,
    isError: isErrorHistoryList,
    error: historyError,
  } = useQuery<AllVideoHistoryResponse>({
    queryKey: HISTORY_QUERY_KEY.DEFAULT,
    queryFn: () => getVideoHistoryApi(),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  return {
    allHistoryList,
    isPendingHistoryList,
    isErrorHistoryList,
    historyError,
  };
};
