import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { reissueApi } from "@apis/auth";
import { ROUTES } from "@router/constants";
import { PageLoading, SideBar } from "@shared/ui";

export default function AppLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [hasAccessToken, setHasAccessToken] = useState(
    () => localStorage.getItem("accessToken") !== null,
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(
    () =>
      localStorage.getItem("accessToken") === null &&
      localStorage.getItem("refreshToken") !== null,
  );

  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (hasAccessToken) {
      return;
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return;
    }

    let ignore = false;

    reissueApi(refreshToken)
      .then(({ accessToken, refreshToken: newRefreshToken, role }) => {
        if (ignore) {
          return;
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("userRole", role);
        setHasAccessToken(true);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
      })
      .finally(() => {
        if (!ignore) {
          setIsCheckingAuth(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [hasAccessToken]);

  if (isCheckingAuth) {
    return <PageLoading />;
  }

  if (!hasAccessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <main className="flex h-screen overflow-hidden">
      <SideBar
        pathname={location.pathname}
        isOpen={isOpen}
        handleChange={handleChange}
      />
      <section className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </section>
    </main>
  );
}
