import { createBrowserRouter } from "react-router-dom";

import Dashboard from "@pages/dashboard";
import Login from "@pages/login";
import Signup from "@pages/signup";
import NotFound from "@pages/not-found";
import VideoUpload from "@pages/video-upload";
import VideoHistory from "@pages/video-history";
import VideoHistoryDetail from "@pages/video-history-detail";
import HistoryCompare from "@pages/history-compare";
import MyPage from "@pages/mypage";

import AuthLayout from "./layout/auth-layout";
import AppLayout from "./layout/app-layout";
import { ROUTES } from "./constants";

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: ROUTES.VIDEO_UPLOAD,
            element: <VideoUpload />,
          },
          {
            path: ROUTES.VIDEO_HISTORY,
            element: <VideoHistory />,
          },
          {
            path: ROUTES.VIDEO_HISTORY_DETAIL(":videoId"),
            element: <VideoHistoryDetail />,
          },
          {
            path: ROUTES.HISTORY_COMPARE,
            element: <HistoryCompare />,
          },
          {
            path: ROUTES.MYPAGE,
            element: <MyPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <Login /> },
          { path: ROUTES.SIGNUP, element: <Signup /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
