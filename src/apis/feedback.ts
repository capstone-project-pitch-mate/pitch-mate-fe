import apiInstance from "@shared/apis";

import { RUBRICS_URL } from "./constants";
import type { RubricsResponse } from "./types";

export const getRubricsApi = async () => {
  const response = await apiInstance.get<RubricsResponse>(RUBRICS_URL.DEFAULT);

  return response.result;
};
