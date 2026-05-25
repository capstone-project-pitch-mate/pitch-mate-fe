import apiInstance from "@shared/apis";

import { DASHBOARD_URL } from "./constants";
import type { MenteeDashboardResponse, MentorDashboardResponse } from "./types";

export const getMenteeDashboardApi = async () => {
  const response = await apiInstance.get<MenteeDashboardResponse>(
    DASHBOARD_URL.MENTEE,
  );

  return response.result;
};

export const getMentorDashboardApi = async () => {
  const response = await apiInstance.get<MentorDashboardResponse>(
    DASHBOARD_URL.MENTOR,
  );

  return response.result;
};
