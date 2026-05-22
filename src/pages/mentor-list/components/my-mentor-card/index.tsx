import { UserRound, X } from "lucide-react";

import { MENTOR_STATUS_LABEL, MENTOR_STATUS_STYLE } from "../../constants";
import type { Mentor } from "../../types";

interface MyMentorCardProps {
  mentor: Mentor;
  isPendingRemove: boolean;
  handleRemoveMentor: (connectionId: number) => void;
}

export default function MyMentorCard({
  mentor,
  isPendingRemove,
  handleRemoveMentor,
}: MyMentorCardProps) {
  const canRemove = mentor.connectionId !== undefined && !isPendingRemove;

  return (
    <article className="flex min-h-36 flex-row items-center justify-between gap-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      <div className="flex min-w-0 flex-row items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
          <UserRound color="#6868FF" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-row flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold">{mentor.nickname}</h3>
            <span
              className={`rounded-full px-3 py-1 text-lg font-semibold ${
                MENTOR_STATUS_STYLE[mentor.status]
              }`}
            >
              {MENTOR_STATUS_LABEL[mentor.status]}
            </span>
          </div>
          <p className="text-xl leading-8 text-[#71718A]">{mentor.bio}</p>
        </div>
      </div>
      <button
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-[#F5F5FA]"
        type="button"
        aria-label={`${mentor.nickname} 삭제`}
        disabled={!canRemove}
        onClick={() => {
          if (mentor.connectionId !== undefined) {
            handleRemoveMentor(mentor.connectionId);
          }
        }}
      >
        <X size={22} color="#71718A" />
      </button>
    </article>
  );
}
