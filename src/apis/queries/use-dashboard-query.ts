import { useQuery } from "@tanstack/react-query";

import { getMenteeDashboardApi, getMentorDashboardApi } from "@apis/dashboard";
import { DASHBOARD_QUERY_KEY } from "@apis/query-key";
import type { DashboardResponse, MentorDashboardResponse } from "@apis/types";
import { getUserInfoApi } from "@apis/user";

const getDashboardData = async (): Promise<DashboardResponse> => {
  const [userInfo, dashboard] = await Promise.all([
    getUserInfoApi(),
    getMenteeDashboardApi(),
  ]);

  return {
    ...userInfo,
    ...dashboard,
  };
};

export const useDashboardQuery = () => {
  const {
    data: dashboardData,
    isPending: isPendingDashboard,
    isError: isErrorDashboard,
    error: dashboardError,
  } = useQuery<DashboardResponse>({
    queryKey: DASHBOARD_QUERY_KEY.MENTEE,
    queryFn: getDashboardData,
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

export const useMentorDashboardQuery = () => {
  const {
    data: mentorDashboardData,
    isPending: isPendingMentorDashboard,
    isError: isErrorMentorDashboard,
    error: mentorDashboardError,
  } = useQuery<MentorDashboardResponse>({
    queryKey: DASHBOARD_QUERY_KEY.MENTOR,
    queryFn: getMentorDashboardApi,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    mentorDashboardData,
    isPendingMentorDashboard,
    isErrorMentorDashboard,
    mentorDashboardError,
  };
};
