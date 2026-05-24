import { useQuery } from "@tanstack/react-query";

import {
  getAcceptedMentorsApi,
  getConnectionsApi,
  searchMentorApi,
} from "@apis/connections";
import { CONNECTIONS_QUERY_KEY } from "@apis/query-key";
import type { ConnectionListResponse, SearchMentorResponse } from "@apis/types";

export const useConnectionsQuery = () => {
  const {
    data: connectionsData,
    isPending: isPendingConnections,
    isError: isErrorConnections,
    error: connectionsError,
  } = useQuery<ConnectionListResponse>({
    queryKey: CONNECTIONS_QUERY_KEY.DEFAULT,
    queryFn: () => getConnectionsApi(),
    retry: 2,
  });

  return {
    connectionsData,
    isPendingConnections,
    isErrorConnections,
    connectionsError,
  };
};

export const useSearchMentorsQuery = (nickname: string) => {
  const trimmedNickname = nickname.trim();

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

  return {
    searchMentorsData,
    isPendingSearchMentors,
    isErrorSearchMentors,
    searchMentorsError,
  };
};

export const useAcceptedMentorsQuery = () => {
  const {
    data: acceptedMentorsData,
    isPending: isPendingAcceptedMentors,
    isError: isErrorAcceptedMentors,
    error: acceptedMentorsError,
  } = useQuery<ConnectionListResponse>({
    queryKey: CONNECTIONS_QUERY_KEY.ACCEPTED_MENTORS,
    queryFn: () => getAcceptedMentorsApi(),
    retry: 2,
  });

  return {
    acceptedMentorsData,
    isPendingAcceptedMentors,
    isErrorAcceptedMentors,
    acceptedMentorsError,
  };
};
