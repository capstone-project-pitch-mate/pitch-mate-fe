import { CalendarDays, UserRound } from "lucide-react";

import { formatDate } from "@utils/formatter";

import type { Mentee } from "../../types";

interface MenteeRequestCardProps {
  mentee: Mentee;
  handleAccept: (menteeId: number) => void;
  handleReject: (menteeId: number) => void;
}

export default function MenteeRequestCard({
  mentee,
  handleAccept,
  handleReject,
}: MenteeRequestCardProps) {
  return (
    <article className="flex min-h-48 flex-col justify-between gap-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      <div className="flex flex-row gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
          <UserRound color="#6868FF" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-row flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold">{mentee.nickname}</h3>
            <span className="rounded-full bg-[#FFF4DE] px-3 py-1 text-lg font-semibold text-[#FE9A00]">
              연결 요청
            </span>
          </div>
          <p className="text-xl leading-8 text-[#71718A]">{mentee.bio}</p>
          <div className="flex flex-row flex-wrap gap-x-5 gap-y-2 text-lg text-[#71718A]">
            <span className="flex flex-row items-center gap-1.5">
              <CalendarDays size={18} />
              요청일 {formatDate(mentee.requestedAt)}
            </span>
            {mentee.recentVideoTitle && (
              <span>최근 영상: {mentee.recentVideoTitle}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-3">
        <button
          className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-3 text-xl font-semibold text-[#71718A]"
          type="button"
          onClick={() => handleReject(mentee.id)}
        >
          거절
        </button>
        <button
          className="rounded-xl bg-[#6868FF] px-5 py-3 text-xl font-semibold text-white"
          type="button"
          onClick={() => handleAccept(mentee.id)}
        >
          승낙
        </button>
      </div>
    </article>
  );
}
