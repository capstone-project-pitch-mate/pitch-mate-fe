import { Check, UserRound } from "lucide-react";

import type { Mentor } from "@pages/mentor-list/types";
import { cn } from "@utils/cn";

import type { SelectedMentorId } from "../../types";

interface MentorFeedbackSectionProps {
  connectedMentors: Mentor[];
  isPending: boolean;
  isError: boolean;
  selectedMentorId: SelectedMentorId;
  handleSelectMentor: (mentorId: number) => void;
}

export default function MentorFeedbackSection({
  connectedMentors,
  isPending,
  isError,
  selectedMentorId,
  handleSelectMentor,
}: MentorFeedbackSectionProps) {
  if (isPending || isError || connectedMentors.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl leading-10 font-semibold">멘토 피드백 요청</h2>
        <p className="text-xl leading-8 text-[#71718A]">
          선택하지 않으면 AI 피드백만 제공됩니다. 선택한 멘토는 다시 클릭해
          해제할 수 있습니다.
        </p>
      </div>

      {connectedMentors.length === 0 ? (
        <p className="text-xl leading-8 text-[#71718A]">
          아직 연결된 멘토가 없습니다. 멘토 목록 페이지에 신청하세요!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {connectedMentors.map((mentor) => {
            const isSelected = selectedMentorId === mentor.id;

            return (
              <button
                key={mentor.id}
                className={cn(
                  "flex min-h-34 flex-row items-start justify-between gap-5 rounded-2xl border p-6 text-left",
                  isSelected
                    ? "border-[#6868FF] bg-[rgba(104,104,255,0.08)]"
                    : "border-[rgba(0,0,0,0.08)] bg-white",
                )}
                type="button"
                onClick={() => handleSelectMentor(mentor.id)}
              >
                <div className="flex min-w-0 flex-row gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
                    <UserRound color="#6868FF" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <h3 className="text-2xl font-semibold">
                      {mentor.nickname}
                    </h3>
                    <p className="text-xl leading-8 text-[#71718A]">
                      {mentor.bio}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6868FF]">
                    <Check size={22} color="#fff" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
