export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VIDEO_UPLOAD: "/video-upload",
  VIDEO_HISTORY: "/video-history",
  VIDEO_HISTORY_DETAIL: (videoId: string) => `/video-history/${videoId}`,
  HISTORY_COMPARE: (videoId1: string, videoId2: string) =>
    `/history-compare/${videoId1}/${videoId2}`,
  MYPAGE: "/mypage",
};
