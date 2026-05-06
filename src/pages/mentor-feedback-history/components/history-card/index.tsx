import { CalendarDays, Clock, UserRound } from "lucide-react";

import { formatDate, formatDuration } from "@utils/formatter";

import type { MentorFeedbackHistoryItem } from "../../types";

interface HistoryCardProps {
  item: MentorFeedbackHistoryItem;
  handleClick: (feedbackId: number) => void;
}

export default function HistoryCard({ item, handleClick }: HistoryCardProps) {
  return (
    <button
      className="flex min-h-78 flex-col gap-4 rounded-2xl bg-white p-5 text-left shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)] transition-colors hover:bg-[rgba(104,104,255,0.04)]"
      type="button"
      onClick={() => handleClick(item.id)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#F5F5FA]">
        <img
          className="aspect-video w-full object-cover"
          src={item.thumbnailUrl}
          alt={`${item.title} 썸네일`}
        />
        <div className="absolute right-2 bottom-2 rounded-lg bg-[rgba(0,0,0,0.70)] px-2 py-0.5">
          <span className="text-sm text-white">
            {formatDuration(item.durationSeconds)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-row items-start justify-between gap-3">
          <h2 className="min-w-0 flex-1 truncate text-2xl leading-9 font-semibold text-[#1A1A2E]">
            {item.title}
          </h2>
          <span className="shrink-0 rounded-full bg-[rgba(104,104,255,0.10)] px-3 py-1 text-lg font-bold text-[#6868FF]">
            {item.totalScore}
          </span>
        </div>
        <p className="line-clamp-2 text-lg leading-7 text-[#71718A]">
          {item.overallComment}
        </p>
        <div className="mt-auto flex flex-row flex-wrap gap-x-5 gap-y-2 text-lg text-[#71718A]">
          <span className="flex flex-row items-center gap-1.5">
            <UserRound size={18} />
            {item.menteeNickname}
          </span>
          <span className="flex flex-row items-center gap-1.5">
            <CalendarDays size={18} />
            {formatDate(item.completedAt)}
          </span>
          <span className="flex flex-row items-center gap-1.5">
            <Clock size={18} />
            {formatDuration(item.durationSeconds)}
          </span>
        </div>
      </div>
    </button>
  );
}
