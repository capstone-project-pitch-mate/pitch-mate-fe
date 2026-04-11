import { Overview } from "@shared/ui";

const TOTAL_VIDEO_COUNT = 4;
const COMPLETED_COUNT = 3;
const AVERAGE_SCORE = 73.2;

export default function MyPage() {
  return (
    <div className="flex min-h-screen min-w-232 flex-col gap-10 p-10">
      <h1 className="text-4xl leading-14 font-medium text-[#1A1A2E]">
        내 정보
      </h1>
      <Overview
        totalCount={TOTAL_VIDEO_COUNT}
        completedCount={COMPLETED_COUNT}
        averageScore={AVERAGE_SCORE}
      />
      <section className="rounded-2xl p-9 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]"></section>
    </div>
  );
}
