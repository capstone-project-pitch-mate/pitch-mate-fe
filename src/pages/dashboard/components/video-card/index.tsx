import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

import { formatDate, formatDuration } from "@utils/formatter";
import { ROUTES } from "@router/constants";

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

  const handleToVideoDetail = () => {
    navigate(ROUTES.VIDEO_HISTORY_DETAIL(String(id)));
  };

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
          <span className="text-white">{formatDuration(durationSeconds)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="overflow-hidden text-start text-2xl leading-9 font-semibold text-ellipsis text-[#1A1A2E]">
          {title}
        </span>
        <div className="flex flex-row items-center gap-1.5">
          <Clock color="#71718A" size={20} />
          <span className="text-lg text-[#71718A]">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </button>
  );
}
