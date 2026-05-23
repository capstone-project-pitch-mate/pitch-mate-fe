import { useQuery } from "@tanstack/react-query";

import { DASHBOARD_QUERY_KEY } from "@apis/query-key";
import type { UserInfoResponse } from "@apis/types";
import { getUserInfoApi } from "@apis/user";

export const useDashboardQuery = () => {
  const {
    data: dashboardData,
    isPending: isPendingDashboard,
    isError: isErrorDashboard,
    error: dashboardError,
  } = useQuery<UserInfoResponse>({
    queryKey: DASHBOARD_QUERY_KEY.DEFAULT,
    queryFn: () => getUserInfoApi(),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  return {
    dashboardData,
    isPendingDashboard,
    isErrorDashboard,
    dashboardError,
  };
};
