import apiInstance from "@shared/apis";

import { USER_URL } from "./constants";
import type { UserInfoResponse } from "./types";

export const getUserInfoApi = async () => {
  const response = await apiInstance.get<UserInfoResponse>(USER_URL.DEFAULT);

  return response.result;
};
