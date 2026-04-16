import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { HISTORY_QUERY_KEY } from "@apis/query-key";
import type { AllVideoHistoryResponse } from "@apis/types/video";
import { getVideoHistoryApi } from "@apis/video";
import { useEffect } from "react";
import { ROUTES } from "@router/constants";

export const useVideoHistoryQuery = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (
      isErrorHistoryList &&
      (historyError.status === 403 || historyError.status === 401)
    ) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isErrorHistoryList, historyError, navigate]);

  return {
    allHistoryList,
    isPendingHistoryList,
    isErrorHistoryList,
    historyError,
  };
};
