import { MAX_MENTOR_CONNECTIONS } from "@pages/mentor-list/constants";

import type { Mentor } from "../../types";
import MyMentorCard from "../my-mentor-card";

interface MyMentorSectionProps {
  connectedOrPendingCount: number;
  myMentors: Mentor[];
  isPendingRemove: boolean;
  handleRemoveMentor: (connectionId: number) => void;
}

export default function MyMentorSection({
  connectedOrPendingCount,
  myMentors,
  isPendingRemove,
  handleRemoveMentor,
}: MyMentorSectionProps) {
  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <h2 className="text-3xl leading-10 font-semibold">내 멘토 목록</h2>
          <div className="rounded-2xl bg-[rgba(104,104,255,0.10)] px-3 py-2">
            <span className="text-lg font-bold text-[#6868FF]">
              {connectedOrPendingCount} / {MAX_MENTOR_CONNECTIONS}
            </span>
          </div>
        </div>

        <p className="text-xl leading-8 text-[#71718A]">
          연결된 멘토와 승낙 대기 중인 멘토를 확인할 수 있습니다.
        </p>
      </div>

      {myMentors.length === 0 ? (
        <div className="flex min-h-36 items-center justify-center rounded-2xl bg-[#F5F5FA] text-xl text-[#71718A]">
          아직 신청하거나 연결된 멘토가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {myMentors.map((mentor) => (
            <MyMentorCard
              key={mentor.id}
              mentor={mentor}
              isPendingRemove={isPendingRemove}
              handleRemoveMentor={handleRemoveMentor}
            />
          ))}
        </div>
      )}
    </section>
  );
}
