import { useUserInfoQuery } from "@apis/queries";
import { Overview } from "@shared/ui";

import { EditProfileSection } from "./components";

export default function MyPage() {
  const { userInfoData, isPendingUserInfo, isErrorUserInfo } =
    useUserInfoQuery();

  const roleLabel = userInfoData?.role === "MENTOR" ? "멘토" : "멘티";

  if (isPendingUserInfo) {
    return (
      <div className="flex min-h-screen min-w-300 items-center justify-center p-10">
        <span className="text-2xl text-[#71718A]">
          사용자 정보를 불러오는 중입니다.
        </span>
      </div>
    );
  }

  if (isErrorUserInfo || !userInfoData) {
    return (
      <div className="flex min-h-screen min-w-300 items-center justify-center p-10">
        <span className="text-2xl text-[#71718A]">
          사용자 정보를 불러오지 못했습니다.
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-4xl leading-14 font-medium">내 정보</h1>
        <span className="rounded-full bg-[rgba(104,104,255,0.10)] px-4 py-2 text-xl font-semibold text-[#6868FF]">
          {roleLabel}
        </span>
      </div>
      {userInfoData.role === "MENTEE" && (
        <Overview
          totalCount={userInfoData.totalVideos}
          completedCount={userInfoData.analyzedVideos}
          averageScore={userInfoData.averageScore}
        />
      )}
      <EditProfileSection
        key={userInfoData.userId}
        userInfoData={userInfoData}
      />
    </div>
  );
}
