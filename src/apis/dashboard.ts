import apiInstance from "@shared/apis";

import { DASHBOARD_URL } from "./constants";
import type { DashboardResponse } from "./types";

export const dashboardApi = async () => {
  const response = await apiInstance.get<DashboardResponse>(
    DASHBOARD_URL.DEFAULT,
  );

  return response.result;
};
