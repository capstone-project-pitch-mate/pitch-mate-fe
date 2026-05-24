import { useNavigate } from "react-router-dom";

import { useRequestedVideosQuery } from "@apis/queries";
import { ROUTES } from "@router/constants";
import { PageError, PageLoading } from "@shared/ui";

import { PageHeader, RequestVideoCard } from "./components";

export default function MentorRequestedVideos() {
  const navigate = useNavigate();
  const {
    requestedVideos,
    isPendingRequestedVideos,
    isErrorRequestedVideos,
  } = useRequestedVideosQuery();

  if (isPendingRequestedVideos) {
    return <PageLoading />;
  }

  if (isErrorRequestedVideos) {
    return <PageError />;
  }

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <PageHeader
        title="요청받은 동영상"
        description="멘티가 피드백을 요청한 발표 영상을 확인하고 평가를 시작하세요."
      />

      {!requestedVideos?.length ? (
        <div className="flex min-h-80 items-center justify-center rounded-3xl bg-[#F5F5FA] text-2xl font-medium text-[#71718A]">
          새로운 피드백 요청 영상이 없습니다.
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-6">
          {requestedVideos.map((video) => (
            <RequestVideoCard
              key={video.videoId}
              video={video}
              handleClick={(videoId) =>
                navigate(ROUTES.MENTOR_REQUESTED_VIDEO_DETAIL(String(videoId)), {
                  state: { video },
                })
              }
            />
          ))}
        </section>
      )}
    </div>
  );
}
