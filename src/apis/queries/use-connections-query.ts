import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getConnectionsApi } from "@apis/connections";
import { CONNECTIONS_QUERY_KEY } from "@apis/query-key";
import type { ConnectionsResponse } from "@apis/types";
import { ROUTES } from "@router/constants";

export const useConnectionsQuery = () => {
  const navigate = useNavigate();

  const {
    data: connectionsData,
    isPending: isPendingConnections,
    isError: isErrorConnections,
    error: connectionsError,
  } = useQuery<ConnectionsResponse>({
    queryKey: CONNECTIONS_QUERY_KEY.DEFAULT,
    queryFn: () => getConnectionsApi(),
    retry: 2,
  });

  useEffect(() => {
    if (
      isErrorConnections &&
      (connectionsError.status === 403 || connectionsError.status === 401)
    ) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isErrorConnections, connectionsError, navigate]);

  return {
    connectionsData,
    isPendingConnections,
    isErrorConnections,
    connectionsError,
  };
};
