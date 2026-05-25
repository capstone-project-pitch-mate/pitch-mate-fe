import { CalendarDays, X } from "lucide-react";

import { formatDate } from "@utils/formatter";
import { UserAvatar } from "@shared/ui";

import type { Mentee } from "../../types";

interface ConnectedMenteeCardProps {
  mentee: Mentee;
  isPendingDelete: boolean;
  handleRemove: (connectionId: number) => void;
}

export default function ConnectedMenteeCard({
  mentee,
  isPendingDelete,
  handleRemove,
}: ConnectedMenteeCardProps) {
  return (
    <article className="flex min-h-40 flex-row items-start justify-between gap-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      <div className="flex min-w-0 flex-row gap-4">
        <UserAvatar imageUrl={mentee.profileImage} name={mentee.nickname} />
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-row flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold">{mentee.nickname}</h3>
            <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-lg font-semibold text-[#00A86B]">
              연결됨
            </span>
          </div>
          <p className="text-xl leading-8 text-[#71718A]">{mentee.bio}</p>
          <div className="flex flex-row flex-wrap gap-x-5 gap-y-2 text-lg text-[#71718A]">
            {mentee.connectedAt && (
              <span className="flex flex-row items-center gap-1.5">
                <CalendarDays size={18} />
                연결일 {formatDate(mentee.connectedAt)}
              </span>
            )}
            {mentee.recentVideoTitle && (
              <span>최근 영상: {mentee.recentVideoTitle}</span>
            )}
          </div>
        </div>
      </div>
      <button
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-[#F5F5FA]"
        type="button"
        aria-label={`${mentee.nickname} 삭제`}
        disabled={isPendingDelete}
        onClick={() => handleRemove(mentee.connectionId)}
      >
        <X size={22} color="#71718A" />
      </button>
    </article>
  );
}
