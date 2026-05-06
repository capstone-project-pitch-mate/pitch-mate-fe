import { CalendarDays, Clock, UserRound } from "lucide-react";

import { formatDate, formatDuration } from "@utils/formatter";

import type { MentorRequestedVideo } from "../../types";

interface RequestVideoCardProps {
  video: MentorRequestedVideo;
  handleClick: (videoId: number) => void;
}

export default function RequestVideoCard({
  video,
  handleClick,
}: RequestVideoCardProps) {
  return (
    <button
      className="flex min-h-78 flex-col gap-4 rounded-2xl bg-white p-5 text-left shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)] transition-colors hover:bg-[rgba(104,104,255,0.04)]"
      type="button"
      onClick={() => handleClick(video.id)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#F5F5FA]">
        <img
          className="aspect-video w-full object-cover"
          src={video.thumbnailUrl}
          alt={`${video.title} 썸네일`}
        />
        <div className="absolute right-2 bottom-2 rounded-lg bg-[rgba(0,0,0,0.70)] px-2 py-0.5">
          <span className="text-sm text-white">
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h2 className="truncate text-2xl leading-9 font-semibold text-[#1A1A2E]">
          {video.title}
        </h2>
        <p className="line-clamp-2 text-lg leading-7 text-[#71718A]">
          {video.description}
        </p>
        <div className="mt-auto flex flex-row flex-wrap gap-x-5 gap-y-2 text-lg text-[#71718A]">
          <span className="flex flex-row items-center gap-1.5">
            <UserRound size={18} />
            {video.menteeNickname}
          </span>
          <span className="flex flex-row items-center gap-1.5">
            <CalendarDays size={18} />
            {formatDate(video.requestedAt)}
          </span>
          <span className="flex flex-row items-center gap-1.5">
            <Clock size={18} />
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
      </div>
    </button>
  );
}
