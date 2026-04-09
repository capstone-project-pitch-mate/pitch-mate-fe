import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "./constants";

import Dashboard from "@pages/dashboard";
import Login from "@pages/login";
import Signup from "@pages/signup";
import NotFound from "@pages/not-found";
import AuthLayout from "./layout/auth-layout";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
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
