import apiInstance from "@shared/apis";

import { CONNECTIONS_URL } from "./constants";
import type {
  ConnectionReponse,
  ConnectionListResponse,
  DeleteConnectionResponse,
  SearchMentorResponse,
} from "./types";

export const getConnectionsApi = async () => {
  const response = await apiInstance.get<ConnectionListResponse>(
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

// TODO: 추후 서버 측에서 menteeIntro 넣지 않고 보내도록 수정하면 반영
export const applyConnectionApi = async (mentorId: number) => {
  const response = await apiInstance.post<ConnectionReponse>(
    CONNECTIONS_URL.DEFAULT,
    {
      mentorId,
      menteeIntro: "",
    },
  );

  return response.result;
};

export const deleteConnectionApi = async (connectionId: number) => {
  const response = await apiInstance.delete<DeleteConnectionResponse>(
    `${CONNECTIONS_URL.DEFAULT}/${connectionId}`,
  );

  return response.result;
};
