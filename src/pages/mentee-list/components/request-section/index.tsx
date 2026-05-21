import type { Mentee } from "../../types";
import MenteeRequestCard from "../mentee-request-card";

interface RequestSectionProps {
  requestedMentees: Mentee[];
  isPendingDelete: boolean;
  handleAccept: (menteeId: number) => void;
  handleReject: (connectionId: number) => void;
}

export default function RequestSection({
  requestedMentees,
  isPendingDelete,
  handleAccept,
  handleReject,
}: RequestSectionProps) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">연결 요청 멘티</h2>
          <p className="mt-1 text-lg text-[#71718A]">
            멘티가 보낸 연결 요청을 승낙하거나 거절할 수 있습니다.
          </p>
        </div>
      </div>

      {requestedMentees.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-2xl bg-[#F7F7FC] text-xl text-[#71718A]">
          새로운 연결 요청이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {requestedMentees.map((mentee) => (
            <MenteeRequestCard
              key={mentee.id}
              mentee={mentee}
              isPendingDelete={isPendingDelete}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          ))}
        </div>
      )}
    </section>
  );
}
