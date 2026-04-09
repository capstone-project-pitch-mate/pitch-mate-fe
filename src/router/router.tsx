import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import { ROUTES } from "./constants";

import Dashboard from "@pages/dashboard";
import Login from "@pages/login";
import Signup from "@pages/signup";
import NotFound from "@pages/not-found";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.SIGNUP, element: <Signup /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
