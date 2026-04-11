import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  History,
  User,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@utils/cn";
import { ROUTES } from "@router/constants";

import Logo from "../logo";
import type { ReactNode } from "react";

interface SideBarProps {
  pathname: string;
  isOpen: boolean;
  handleChange: () => void;
}

interface MenuItem {
  label: string;
  path: string;
  defaultIcon: ReactNode;
  selectedIcon: ReactNode;
  isActive: boolean;
}

export default function SideBar({
  pathname,
  isOpen,
  handleChange,
}: SideBarProps) {
  const navigate = useNavigate();

  const handleToPage = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // TODO: 추후 api 연동 및 로그아웃 로직
    console.log("로그아웃");
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const menuItems: MenuItem[] = [
    {
      label: "대시보드",
      path: ROUTES.DASHBOARD,
      defaultIcon: <LayoutDashboard size={32} color="#71718A" />,
      selectedIcon: <LayoutDashboard size={32} color="#6868FF" />,
      isActive: pathname === ROUTES.DASHBOARD,
    },
    {
      label: "영상 업로드",
      path: ROUTES.VIDEO_UPLOAD,
      defaultIcon: <Upload size={32} color="#71718A" />,
      selectedIcon: <Upload size={32} color="#6868FF" />,
      isActive: pathname.startsWith(ROUTES.VIDEO_UPLOAD),
    },
    {
      label: "히스토리",
      path: ROUTES.VIDEO_HISTORY,
      defaultIcon: <History size={32} color="#71718A" />,
      selectedIcon: <History size={32} color="#6868FF" />,
      isActive: pathname.startsWith(ROUTES.VIDEO_HISTORY),
    },
    {
      label: "내 정보",
      path: ROUTES.MYPAGE,
      defaultIcon: <User size={32} color="#71718A" />,
      selectedIcon: <User size={32} color="#6868FF" />,
      isActive: pathname.startsWith(ROUTES.MYPAGE),
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-[rgba(0,0,0,0.08)] bg-[#FAFAFF]",
        isOpen ? "w-95" : "w-23.25",
      )}
    >
      <div className="flex h-22 shrink-0 flex-row items-center gap-5 border-b border-[rgba(0,0,0,0.08)] pl-5">
        {isOpen ? (
          <>
            <button className="p-2.5" type="button" onClick={handleChange}>
              <ChevronLeft size={32} color="#71718A" />
            </button>
            <div className="flex flex-row items-center gap-3">
              <Logo size="sm" />
              <h2 className="text-[28px] font-bold text-[#6868FF]">
                PitchMate
              </h2>
            </div>
          </>
        ) : (
          <button className="p-2.5" type="button" onClick={handleChange}>
            <Menu size={32} color="#71718A" />
          </button>
        )}
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-1.5 pt-4.5 pr-3 pl-3">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={cn(
                "flex h-17 w-full flex-row items-center gap-4.5 pr-4.5 pl-4.5",
                item.isActive && "rounded-2xl bg-[rgba(104,104,255,0.10)]",
              )}
              type="button"
              onClick={() => handleToPage(item.path)}
            >
              {item.isActive ? item.selectedIcon : item.defaultIcon}
              {isOpen && (
                <h3
                  className={cn(
                    "text-2xl text-[#71718A]",
                    item.isActive && "font-semibold text-[#6868FF]",
                  )}
                >
                  {item.label}
                </h3>
              )}
            </button>
          ))}
        </div>
        <button
          className="flex h-22 w-full flex-row items-center gap-4.5 border-t border-[rgba(0,0,0,0.08)] pr-7.5 pl-7.5"
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={32} color="#71718A" />
          {isOpen && <h3 className="text-2xl text-[#71718A]">로그아웃</h3>}
        </button>
      </div>
    </div>
  );
}
