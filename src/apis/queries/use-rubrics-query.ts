import { useQuery } from "@tanstack/react-query";

import { getRubricsApi } from "@apis/feedback";
import { RUBRICS_QUERY_KEY } from "@apis/query-key";
import type { RubricsResponse } from "@apis/types";

export const useRubricsQuery = () => {
  const {
    data: rubrics,
    isPending: isPendingRubrics,
    isError: isErrorRubrics,
    error: rubricsError,
  } = useQuery<RubricsResponse>({
    queryKey: RUBRICS_QUERY_KEY.DEFAULT,
    queryFn: () => getRubricsApi(),
    retry: 2,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    rubrics,
    isPendingRubrics,
    isErrorRubrics,
    rubricsError,
  };
};
