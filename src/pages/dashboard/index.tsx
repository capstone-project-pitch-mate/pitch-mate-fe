import { Link, useNavigate } from "react-router-dom";
import { Upload, ArrowRight } from "lucide-react";

import { ROUTES } from "@router/constants";
import {
  Button,
  Overview,
  PageError,
  PageLoading,
  VideoEmptyView,
} from "@shared/ui";
import { useDashboardQuery } from "@apis/queries";

import { VideoCard } from "./components";

export default function Dashboard() {
  const navigate = useNavigate();

  const { dashboardData, isPendingDashboard, isErrorDashboard } =
    useDashboardQuery();

  const handleToUpload = () => {
    navigate(ROUTES.VIDEO_UPLOAD);
  };

  if (isPendingDashboard) {
    return <PageLoading />;
  }

  if (!isErrorDashboard) {
    return <PageError />;
  }

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-13 p-10">
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl leading-14 font-medium">
            안녕하세요, {dashboardData?.nickname}님!
          </h1>
          <p className="text-2xl leading-9 text-[#71718A]">
            오늘도 실력을 키워볼까요?
          </p>
        </div>
        <Button size="lg" handleClick={handleToUpload}>
          <div className="flex flex-row items-center gap-2.5">
            <Upload />
            <span className="text-xl leading-8 font-medium text-white">
              새 영상 업로드
            </span>
          </div>
        </Button>
      </section>
      <Overview
        totalCount={dashboardData?.totalVideos ?? 0}
        completedCount={dashboardData?.analyzedVideos ?? 0}
        averageScore={dashboardData?.averageScore ?? null}
      />
      <section className="flex flex-1 flex-col gap-6">
        {!dashboardData?.recentVideos?.length ? (
          <VideoEmptyView />
        ) : (
          <>
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-3xl leading-12 font-medium">최근 영상</h2>
              <Link
                to={ROUTES.VIDEO_HISTORY}
                className="flex flex-row items-center gap-1.5"
              >
                <span className="text-xl text-[#6868FF]">전체 보기</span>
                <ArrowRight color="#6868FF" />
              </Link>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-8">
              {dashboardData?.recentVideos.map((video) => (
                <VideoCard
                  key={video.videoId}
                  id={video.videoId}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                  durationSeconds={video.durationSeconds}
                  createdAt={video.createdAt}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
