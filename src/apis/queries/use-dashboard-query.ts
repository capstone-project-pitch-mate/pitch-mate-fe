import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { DASHBOARD_QUERY_KEY } from "@apis/query-key";
import { dashboardApi } from "@apis/dashboard";
import type { DashboardResponse } from "@apis/types";

export const useDashboardQuery = () => {
  const navigate = useNavigate();

  const {
    data: dashboardData,
    isPending: isPendingDashboard,
    isError: isErrorDashboard,
    error: dashboardError,
  } = useQuery<DashboardResponse>({
    queryKey: DASHBOARD_QUERY_KEY.DEFAULT,
    queryFn: () => dashboardApi(),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (
      isErrorDashboard &&
      (dashboardError.status === 403 || dashboardError.status === 401)
    ) {
      navigate("/login", { replace: true });
    }
  }, [isErrorDashboard, dashboardError, navigate]);

  return {
    dashboardData,
    isPendingDashboard,
    isErrorDashboard,
    dashboardError,
  };
};
