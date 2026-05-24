import { CalendarDays, UserRound } from "lucide-react";

import { formatDate, formatDuration } from "@utils/formatter";

import type { MentorRequestedVideo } from "../../types";

interface RequestedVideoInfoProps {
  video: MentorRequestedVideo;
}

export default function RequestedVideoInfo({ video }: RequestedVideoInfoProps) {
  return (
    <aside className="flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-[#6868FF]">
          피드백 요청 정보
        </span>
        <p className="text-xl leading-8 text-[#1A1A2E]">
          {video.description}
        </p>
      </div>
      <div className="flex flex-col gap-3 text-xl text-[#71718A]">
        <span className="flex flex-row items-center gap-2">
          <UserRound size={22} />
          {video.menteeNickname}
        </span>
        <span className="flex flex-row items-center gap-2">
          <CalendarDays size={22} />
          {formatDate(video.requestedAt)}
        </span>
        <span className="rounded-2xl bg-[rgba(104,104,255,0.10)] px-4 py-3 font-semibold text-[#6868FF]">
          영상 길이 {formatDuration(video.durationSeconds)}
        </span>
      </div>
    </aside>
  );
}
