export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VIDEO_UPLOAD: "/video-upload",
  VIDEO_HISTORY: "/video-history",
  VIDEO_HISTORY_DETAIL: (videoId: string) => `/video-history/${videoId}`,
  HISTORY_COMPARE: "/history-compare",
  MYPAGE: "/mypage",
};
