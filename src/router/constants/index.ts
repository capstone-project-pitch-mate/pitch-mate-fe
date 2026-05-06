export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VIDEO_UPLOAD: "/video-upload",
  VIDEO_HISTORY: "/video-history",
  // ADDED_MENTOR_LIST: mentee mentor search/request page route.
  MENTOR_LIST: "/mentor-list",
  // ADDED_MENTOR_DASHBOARD: mentor home page route.
  MENTOR_DASHBOARD: "/mentor-dashboard",
  // ADDED_MENTOR_DASHBOARD: mentor dashboard section detail routes.
  MENTOR_REQUESTED_VIDEOS: "/mentor-requested-videos",
  MENTOR_FEEDBACK_HISTORY: "/mentor-feedback-history",
  VIDEO_HISTORY_DETAIL: (videoId: string) => `/video-history/${videoId}`,
  HISTORY_COMPARE: (videoId1: string, videoId2: string) =>
    `/history-compare/${videoId1}/${videoId2}`,
  MYPAGE: "/mypage",
};
