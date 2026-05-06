import { useNavigate } from "react-router-dom";

import { ROUTES } from "@router/constants";

import { PageHeader, RequestVideoCard } from "./components";
import { DUMMY_REQUESTED_VIDEOS } from "./constants";

export default function MentorRequestedVideos() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <PageHeader
        title="요청받은 동영상"
        description="멘티가 피드백을 요청한 발표 영상을 확인하고 평가를 시작하세요."
      />

      <section className="grid grid-cols-2 gap-6">
        {DUMMY_REQUESTED_VIDEOS.map((video) => (
          <RequestVideoCard
            key={video.id}
            video={video}
            handleClick={(videoId) =>
              navigate(ROUTES.MENTOR_REQUESTED_VIDEO_DETAIL(String(videoId)))
            }
          />
        ))}
      </section>
    </div>
  );
}
