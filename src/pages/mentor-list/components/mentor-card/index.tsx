import { Button, UserAvatar } from "@shared/ui";

import { MENTOR_STATUS_LABEL, MENTOR_STATUS_STYLE } from "../../constants";
import type { Mentor } from "../../types";

interface MentorCardProps {
  mentor: Mentor;
  isPendingRequest: boolean;
  handleRequestMentor: (mentorId: number) => void;
}

export default function MentorCard({
  mentor,
  isPendingRequest,
  handleRequestMentor,
}: MentorCardProps) {
  const alreadyRequested = mentor.status !== "AVAILABLE";

  return (
    <article className="flex min-h-50 flex-col justify-between gap-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      <div className="flex flex-row items-start gap-4">
        <UserAvatar imageUrl={mentor.profileImage} name={mentor.nickname} />
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
          disabled={alreadyRequested || isPendingRequest}
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
