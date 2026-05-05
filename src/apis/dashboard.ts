// TEMP_DUMMY_DATA: restore apiInstance import when API integration resumes.
// import apiInstance from "@shared/apis";

// TEMP_DUMMY_DATA: restore DASHBOARD_URL import when API integration resumes.
// import { DASHBOARD_URL } from "./constants";
// TEMP_DUMMY_DATA: restore DashboardResponse type import when API integration resumes.
// import type { DashboardResponse } from "./types";
import { DUMMY_DASHBOARD_RESPONSE } from "./dummy-data";

export const dashboardApi = async () => {
  // TEMP_DUMMY_DATA: original dashboard API call is preserved below while dummy data is used.
  // const response = await apiInstance.get<DashboardResponse>(
  //   DASHBOARD_URL.DEFAULT,
  // );
  //
  // return response.result;

  // ADDED_DUMMY_DATA: return local dashboard response until backend contract is reconnected.
  return DUMMY_DASHBOARD_RESPONSE;
};
