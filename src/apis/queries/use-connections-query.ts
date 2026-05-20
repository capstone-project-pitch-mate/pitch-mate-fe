import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getConnectionsApi, searchMentorApi } from "@apis/connections";
import { CONNECTIONS_QUERY_KEY } from "@apis/query-key";
import type { ConnectionsResponse, SearchMentorResponse } from "@apis/types";
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

export const useSearchMentorsQuery = (nickname: string) => {
  const trimmedNickname = nickname.trim();
  const navigate = useNavigate();

  const {
    data: searchMentorsData,
    isPending: isPendingSearchMentors,
    isError: isErrorSearchMentors,
    error: searchMentorsError,
  } = useQuery<SearchMentorResponse>({
    queryKey: CONNECTIONS_QUERY_KEY.MENTOR_SEARCH(trimmedNickname),
    queryFn: () => searchMentorApi(trimmedNickname),
    enabled: trimmedNickname.length > 0,
    retry: 2,
  });

  useEffect(() => {
    if (
      isErrorSearchMentors &&
      (searchMentorsError.status === 403 || searchMentorsError.status === 401)
    ) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isErrorSearchMentors, searchMentorsError, navigate]);

  return {
    searchMentorsData,
    isPendingSearchMentors,
    isErrorSearchMentors,
    searchMentorsError,
  };
};
