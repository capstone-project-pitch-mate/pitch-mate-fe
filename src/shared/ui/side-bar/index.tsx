import { useNavigate } from "react-router-dom";

import IcLeft from "@assets/icon/ic_left.svg";
import IcHamburger from "@assets/icon/ic_hamburger.svg";
import IcDashboard from "@assets/icon/ic_dashboard.svg";
import IcDashboardSelected from "@assets/icon/ic_dashboard_selected.svg";
import IcUpload from "@assets/icon/ic_upload.svg";
import IcUploadSelected from "@assets/icon/ic_upload_selected.svg";
import IcHistory from "@assets/icon/ic_history.svg";
import IcHistorySelected from "@assets/icon/ic_history_selected.svg";
import IcMypage from "@assets/icon/ic_mypage.svg";
import IcMypageSelected from "@assets/icon/ic_mypage_selected.svg";
import IcLogout from "@assets/icon/ic_logout.svg";
import { cn } from "@utils/cn";

import Logo from "../logo";

interface SideBarProps {
  pathname: string;
  isOpen: boolean;
  handleChange: () => void;
}

interface MenuItem {
  label: string;
  path: string;
  defaultIcon: string;
  selectedIcon: string;
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
  };

  const menuItems: MenuItem[] = [
    {
      label: "대시보드",
      path: "/",
      defaultIcon: IcDashboard,
      selectedIcon: IcDashboardSelected,
      isActive: pathname === "/",
    },
    {
      label: "영상 업로드",
      path: "/video-upload",
      defaultIcon: IcUpload,
      selectedIcon: IcUploadSelected,
      isActive: pathname.startsWith("/video-upload"),
    },
    {
      label: "히스토리",
      path: "/video-history",
      defaultIcon: IcHistory,
      selectedIcon: IcHistorySelected,
      isActive: pathname.startsWith("/video-history"),
    },
    {
      label: "내 정보",
      path: "/mypage",
      defaultIcon: IcMypage,
      selectedIcon: IcMypageSelected,
      isActive: pathname.startsWith("/mypage"),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r border-[rgba(0,0,0,0.08)] bg-[#FAFAFF]",
        isOpen ? "min-w-95" : "min-w-23.25",
      )}
    >
      <div className="flex h-22 flex-row items-center gap-5 border-b border-[rgba(0,0,0,0.08)] pl-5">
        {isOpen ? (
          <>
            <button className="p-2.5" type="button" onClick={handleChange}>
              <img src={IcLeft} alt="사이드바 닫기 버튼" />
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
            <img src={IcHamburger} alt="사이드바 열기 버튼" />
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
              <img
                className="h-8 w-8"
                src={item.isActive ? item.selectedIcon : item.defaultIcon}
                alt={`${item.label} 버튼`}
              />
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
          <img className="h-8 w-8" src={IcLogout} alt="로그아웃 버튼" />
          {isOpen && <h3 className="text-2xl text-[#71718A]">로그아웃</h3>}
        </button>
      </div>
    </div>
  );
}
