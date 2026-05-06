import { Clock, MessageSquare } from "lucide-react";

import type { FeedbackType } from "@pages/video-history-detail/types";
import { formatDuration } from "@utils/formatter";

interface FeedbackSectionProps {
  title: string;
  feedbacks: FeedbackType[];
}

export default function FeedbackSection({
  title,
  feedbacks,
}: FeedbackSectionProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-center gap-3">
        <MessageSquare color="#6868FF" />
        <h3 className="text-2xl font-medium">{title}</h3>
      </div>
      {feedbacks.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-2xl bg-[#F5F5FA] text-xl text-[#71718A]">
          아직 피드백이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {feedbacks.map((feedback) => (
            <article
              key={feedback.id}
              className="flex flex-col gap-3 rounded-2xl bg-[#FFFBEB] p-6"
            >
              <div className="flex w-fit flex-row items-center gap-2 rounded-3xl border border-[#71718A] px-2 py-1 text-[#71718A]">
                <Clock size={16} />
                <span className="text-lg">
                  {formatDuration(feedback.startTimeSeconds)} ~{" "}
                  {formatDuration(feedback.endTimeSeconds)}
                </span>
              </div>
              <p className="text-xl leading-8">{feedback.content}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
