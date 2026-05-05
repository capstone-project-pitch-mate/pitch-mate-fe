// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

import { getDummyVideoHistoryResponse } from "@apis/dummy-data";
// import { HISTORY_QUERY_KEY } from "@apis/query-key";
import type { AllVideoHistoryResponse } from "@apis/types/video";
// import { getVideoHistoryApi } from "@apis/video";
// import { ROUTES } from "@router/constants";

export const useVideoHistoryQuery = () => {
  // const navigate = useNavigate();
  // TEMP_DUMMY_DATA: original history query is preserved below while mentor/mentee UI is built with dummy data.

  // 기존 API 조회는 확장 기능 UI 작업 중 더미 히스토리 데이터 사용을 위해 임시 주석 처리했습니다.
  // const {
  //   data: allHistoryList,
  //   isPending: isPendingHistoryList,
  //   isError: isErrorHistoryList,
  //   error: historyError,
  // } = useQuery<AllVideoHistoryResponse>({
  //   queryKey: HISTORY_QUERY_KEY.DEFAULT,
  //   queryFn: () => getVideoHistoryApi(),
  //   retry: 2,
  //   staleTime: 1000 * 60 * 10,
  //   gcTime: 1000 * 60 * 15,
  // });

  // useEffect(() => {
  //   if (
  //     isErrorHistoryList &&
  //     (historyError.status === 403 || historyError.status === 401)
  //   ) {
  //     navigate(ROUTES.LOGIN, { replace: true });
  //   }
  // }, [isErrorHistoryList, historyError, navigate]);

  const allHistoryList: AllVideoHistoryResponse = getDummyVideoHistoryResponse();

  return {
    allHistoryList,
    isPendingHistoryList: false,
    isErrorHistoryList: false,
    historyError: null,
  };
};
