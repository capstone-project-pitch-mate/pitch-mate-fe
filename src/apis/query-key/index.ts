export const DASHBOARD_QUERY_KEY = {
  DEFAULT: ["dashboard"],
};

export const USER_INFO_QUERY_KEY = {
  DEFAULT: ["user-info"],
};

export const CONNECTIONS_QUERY_KEY = {
  DEFAULT: ["connections"],
  MENTOR_SEARCH: (nickname: string) => ["connections", "mentors", nickname],
  ACCEPTED_MENTORS: ["connections", "mentors", "accepted"],
};

export const HISTORY_QUERY_KEY = {
  DEFAULT: ["history"],
  DETAIL: (videoId: number) => ["history", "video", videoId],
  COMPARE: (videoId1: number, videoId2: number) => [
    "history",
    "compare",
    videoId1,
    videoId2,
  ],
};
