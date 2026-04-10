import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { SideBar } from "@shared/ui";

export default function AppLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="flex min-h-screen flex-row">
      <SideBar
        pathname={location.pathname}
        isOpen={isOpen}
        handleChange={handleChange}
      />
      <Outlet />
    </main>
  );
}
