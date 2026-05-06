import { ROUTES } from "@router/constants";

import {
  FEEDBACK_HISTORY_VIDEOS,
  FEEDBACK_REQUEST_VIDEOS,
  MENTOR_DASHBOARD_SUMMARY,
} from "./constants";
import {
  MentorDashboardHeader,
  SummaryCard,
  VideoListSection,
} from "./components";
import type { MentorDashboardVideo } from "./types";

export default function MentorDashboard() {
  const handleClickVideo = (sectionName: string, video: MentorDashboardVideo) => {
    console.log(
      `[mentor-dashboard] ${sectionName} 상세 페이지는 이후 태스크에서 연결 예정입니다. videoId=${video.id}, title=${video.title}`,
    );
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10 pb-30">
      <MentorDashboardHeader />

      <section className="grid grid-cols-3 gap-7">
        {MENTOR_DASHBOARD_SUMMARY.map((summary) => (
          <SummaryCard key={summary.id} summary={summary} />
        ))}
      </section>

      <section className="flex flex-col gap-7">
        <VideoListSection
          title="요청받은 동영상"
          description="멘티가 검토를 요청한 최신 발표 영상입니다."
          videos={FEEDBACK_REQUEST_VIDEOS}
          emptyMessage="새로운 피드백 요청이 없습니다."
          viewAllPath={ROUTES.MENTOR_REQUESTED_VIDEOS}
          handleClickVideo={(video) => handleClickVideo("요청받은 동영상", video)}
        />

        <VideoListSection
          title="피드백 히스토리"
          description="최근 완료한 피드백 기록입니다."
          videos={FEEDBACK_HISTORY_VIDEOS}
          emptyMessage="아직 완료한 피드백이 없습니다."
          viewAllPath={ROUTES.MENTOR_FEEDBACK_HISTORY}
          compact
          handleClickVideo={(video) => handleClickVideo("피드백 히스토리", video)}
        />
      </section>
    </div>
  );
}
