import apiInstance from "@shared/apis";

import { CONNECTIONS_URL } from "./constants";
import type { ConnectionsResponse, SearchMentorResponse } from "./types";

export const getConnectionsApi = async () => {
  const response = await apiInstance.get<ConnectionsResponse>(
    CONNECTIONS_URL.DEFAULT,
  );

  return response.result;
};

export const searchMentorApi = async (nickname: string) => {
  const response = await apiInstance.get<SearchMentorResponse>(
    CONNECTIONS_URL.SEARCH,
    {
      params: { nickname },
    },
  );

  return response.result;
};
