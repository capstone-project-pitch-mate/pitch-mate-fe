import { UserRound } from "lucide-react";

import { Button } from "@shared/ui";

import { MENTOR_STATUS_LABEL, MENTOR_STATUS_STYLE } from "../../constants";
import type { Mentor } from "../../types";

interface MentorCardProps {
  mentor: Mentor;
  handleRequestMentor: (mentorId: number) => void;
}

export default function MentorCard({
  mentor,
  handleRequestMentor,
}: MentorCardProps) {
  const alreadyRequested = mentor.status !== "AVAILABLE";

  return (
    <article className="flex min-h-50 flex-col justify-between gap-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      <div className="flex flex-row items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
          <UserRound color="#6868FF" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
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

      <div className="flex justify-end">
        <Button
          color={alreadyRequested ? "secondary" : "primary"}
          disabled={alreadyRequested}
          handleClick={() => handleRequestMentor(mentor.id)}
        >
          <span className="text-xl font-medium">
            {alreadyRequested ? MENTOR_STATUS_LABEL[mentor.status] : "신청"}
          </span>
        </Button>
      </div>
    </article>
  );
}
