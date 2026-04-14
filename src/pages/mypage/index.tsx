import { Overview } from "@shared/ui";
import { EditProfileSection } from "./components";

const TOTAL_VIDEO_COUNT = 4;
const COMPLETED_COUNT = 3;
const AVERAGE_SCORE = 73.2;

export default function MyPage() {
  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10">
      <h1 className="text-4xl leading-14 font-medium">내 정보</h1>
      <Overview
        totalCount={TOTAL_VIDEO_COUNT}
        completedCount={COMPLETED_COUNT}
        averageScore={AVERAGE_SCORE}
      />
      <EditProfileSection />
    </div>
  );
}
