import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { SideBar } from "@shared/ui";

export default function AppLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };

  // TODO: 인증 가드 추가하기

  return (
    <main className="flex min-h-screen flex-row">
      <SideBar
        pathname={location.pathname}
        isOpen={isOpen}
        handleChange={handleChange}
      />
      <section className="min-w-0 flex-1">
        <Outlet />
      </section>
    </main>
  );
}
