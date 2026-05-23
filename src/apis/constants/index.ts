export const AUTH_URL = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REISSUE: "/auth/reissue",
};

export const DASHBOARD_URL = {
  // TODO: 추후 서버 url 수정
  DEFAULT: "/users/me",
};

export const USER_URL = {
  DEFAULT: "/users/me",
  EDIT: "/users/me",
};

export const VIDEO_URL = {
  DEFAULT: "/videos",
};

export const HISTORY_URL = {
  DEFAULT: "/history",
  DETAIL: (videoId: number) => `/history/video/${videoId}`,
  COMPARE: "/history/compare",
};

export const CONNECTIONS_URL = {
  DEFAULT: "/connections",
  SEARCH: "/connections/mentors/search",
  ACCEPT: (connectionId: number) => `/connections/${connectionId}/accept`,
  REJECT: (connectionId: number) => `/connections/${connectionId}/reject`,
  ACCEPTED_CONNECTIONS: "/connections/mentors/accepted",
};
