import { Link, useNavigate } from "react-router-dom";

import { Button, Overview } from "@shared/ui";
import IcUploadWhite from "@assets/icon/ic_upload_white.svg";
import IcRightArrow from "@assets/icon/ic_right_arrow.svg";
import { DUMMY_DASHBOARD_VIDEO_LIST } from "./constants";

import { VideoCard } from "./components";

const NICKNAME = "김발표";
const TOTAL_VIDEO_COUNT = 4;
const COMPLETED_COUNT = 3;
const AVERAGE_SCORE = 73.2;

export default function Dashboard() {
  const navigate = useNavigate();
  const handleToUpload = () => {
    navigate("/video-upload");
  };

  return (
    <div className="flex min-w-232 flex-col gap-13 p-10">
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl leading-14 font-medium text-[#1A1A2E]">
            안녕하세요, {NICKNAME}님!
          </h1>
          <p className="text-2xl leading-9 text-[#71718A]">
            오늘도 실력을 키워볼까요?
          </p>
        </div>
        <Button size="lg" handleClick={handleToUpload}>
          <div className="flex flex-row items-center gap-2.5">
            <img src={IcUploadWhite} alt="업로드 버튼" />
            <span className="text-xl leading-8 font-medium text-white">
              새 영상 업로드
            </span>
          </div>
        </Button>
      </section>
      <Overview
        totalCount={TOTAL_VIDEO_COUNT}
        completedCount={COMPLETED_COUNT}
        averageScore={AVERAGE_SCORE}
      />
      <section className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <label className="text-3xl leading-12 font-medium text-[#1A1A2E]">
            최근 영상
          </label>
          <Link
            to="/video-history"
            className="flex flex-row items-center gap-1.5"
          >
            <span className="text-xl text-[#6868FF]">전체 보기</span>
            <img src={IcRightArrow} alt="전체 보기" />
          </Link>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-8">
          {DUMMY_DASHBOARD_VIDEO_LIST.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              durationSeconds={video.durationSeconds}
              createdAt={video.createdAt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
