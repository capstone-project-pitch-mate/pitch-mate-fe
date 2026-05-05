// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { DASHBOARD_QUERY_KEY } from "@apis/query-key";
// import { dashboardApi } from "@apis/dashboard";
import { DUMMY_DASHBOARD_RESPONSE } from "@apis/dummy-data";
import type { DashboardResponse } from "@apis/types";
// import { ROUTES } from "@router/constants";

export const useDashboardQuery = () => {
  // const navigate = useNavigate();
  // TEMP_DUMMY_DATA: original dashboard query is preserved below while mentor/mentee UI is built with dummy data.

  // 기존 API 조회는 확장 기능 UI 작업 중 더미 대시보드 데이터 사용을 위해 임시 주석 처리했습니다.
  // const {
  //   data: dashboardData,
  //   isPending: isPendingDashboard,
  //   isError: isErrorDashboard,
  //   error: dashboardError,
  // } = useQuery<DashboardResponse>({
  //   queryKey: DASHBOARD_QUERY_KEY.DEFAULT,
  //   queryFn: () => dashboardApi(),
  //   retry: 2,
  //   staleTime: 1000 * 60 * 10,
  //   gcTime: 1000 * 60 * 15,
  // });

  // useEffect(() => {
  //   if (
  //     isErrorDashboard &&
  //     (dashboardError.status === 403 || dashboardError.status === 401)
  //   ) {
  //     navigate(ROUTES.LOGIN, { replace: true });
  //   }
  // }, [isErrorDashboard, dashboardError, navigate]);

  const dashboardData: DashboardResponse = {
    ...DUMMY_DASHBOARD_RESPONSE,
    role:
      localStorage.getItem("userRole") === "MENTOR"
        ? "MENTOR"
        : DUMMY_DASHBOARD_RESPONSE.role,
    nickname:
      localStorage.getItem("userRole") === "MENTOR"
        ? "멘토발표"
        : DUMMY_DASHBOARD_RESPONSE.nickname,
  };

  return {
    dashboardData,
    isPendingDashboard: false,
    isErrorDashboard: false,
    dashboardError: null,
  };
};
