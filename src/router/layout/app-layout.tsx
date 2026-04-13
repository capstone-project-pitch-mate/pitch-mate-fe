import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "@router/constants";
import { SideBar } from "@shared/ui";

export default function AppLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };

  if (!accessToken) {
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
