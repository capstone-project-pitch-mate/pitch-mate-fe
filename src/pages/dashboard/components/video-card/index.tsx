import { useNavigate } from "react-router-dom";

import IcTime from "@assets/icon/ic_time.svg";

interface VideoCardProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  durationSeconds: number;
  createdAt: string;
}

export default function VideoCard({
  id,
  title,
  thumbnailUrl,
  durationSeconds,
  createdAt,
}: VideoCardProps) {
  const navigate = useNavigate();
  const date = new Date(createdAt);

  const handleToVideoDetail = () => {
    navigate(`/video-history/${id}`);
  };

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = String(durationSeconds % 60).padStart(2, "0");
  const formattedDate = date.toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  return (
    <button
      className="flex flex-col gap-5"
      type="button"
      onClick={handleToVideoDetail}
    >
      <div className="relative">
        <img
          className="aspect-video w-full flex-1 rounded-3xl"
          src={thumbnailUrl}
          alt={`${id}번 영상 썸네일`}
        />
        <div className="absolute right-4 bottom-4 rounded-lg bg-[rgba(0,0,0,0.70)] pt-1 pr-3 pb-1 pl-3">
          <span className="text-white">
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="overflow-hidden text-start text-2xl leading-9 font-semibold text-ellipsis text-[#1A1A2E]">
          {title}
        </span>
        <div className="flex flex-row items-center gap-1.5">
          <img src={IcTime} alt="날짜" />
          <span className="text-[#71718A]">{formattedDate}</span>
        </div>
      </div>
    </button>
  );
}
