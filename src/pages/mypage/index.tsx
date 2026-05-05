import { DUMMY_DASHBOARD_RESPONSE } from "@apis/dummy-data";
import type { UserRole } from "@apis/types";
import { Overview } from "@shared/ui";

import { EditProfileSection } from "./components";

// TEMP_DUMMY_DATA: original hard-coded overview values are preserved below.
// const TOTAL_VIDEO_COUNT = 4;
// const COMPLETED_COUNT = 3;
// const AVERAGE_SCORE = 73.2;

// ADDED_DUMMY_DATA: My Page overview now reads from the shared dummy dashboard response.
const TOTAL_VIDEO_COUNT = DUMMY_DASHBOARD_RESPONSE.totalVideos;
const COMPLETED_COUNT = DUMMY_DASHBOARD_RESPONSE.analyzedVideos;
const AVERAGE_SCORE = DUMMY_DASHBOARD_RESPONSE.averageScore;

const getStoredUserRole = (): UserRole => {
  // ADDED_ROLE_FLOW: My Page shows the locally selected dummy role.
  return localStorage.getItem("userRole") === "MENTOR" ? "MENTOR" : "MENTEE";
};

export default function MyPage() {
  const roleLabel = getStoredUserRole() === "MENTOR" ? "멘토" : "멘티";

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-4xl leading-14 font-medium">내 정보</h1>
        {/* ADDED_ROLE_FLOW: role badge makes mentor/mentee state visible on My Page. */}
        <span className="rounded-full bg-[rgba(104,104,255,0.10)] px-4 py-2 text-xl font-semibold text-[#6868FF]">
          {roleLabel}
        </span>
      </div>
      <Overview
        totalCount={TOTAL_VIDEO_COUNT}
        completedCount={COMPLETED_COUNT}
        averageScore={AVERAGE_SCORE}
      />
      <EditProfileSection />
    </div>
  );
}
