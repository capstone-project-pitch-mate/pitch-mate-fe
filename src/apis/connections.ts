import apiInstance from "@shared/apis";

import { CONNECTIONS_URL } from "./constants";
import type { ConnectionsResponse } from "./types";

export const getConnectionsApi = async () => {
  const response = await apiInstance.get<ConnectionsResponse>(
    CONNECTIONS_URL.DEFAULT,
  );

  return response.result;
};
