import { MessageSquare, Clock } from "lucide-react";

import type { FeedbackType } from "@pages/video-history-detail/types";
import { formatDuration } from "@utils/formatter";

interface FeedbackSectionProps {
  feedbacks: FeedbackType[];
}

export default function FeedbackSection({ feedbacks }: FeedbackSectionProps) {
  return (
    <section className="flex flex-col gap-9 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-center gap-3">
        <MessageSquare color="#6868FF" />
        <h3 className="text-2xl font-medium">구간별 AI 피드백</h3>
      </div>
      <div className="flex flex-col gap-5">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="flex flex-col gap-2.5 rounded-2xl bg-[#FFFBEB] p-6"
          >
            <div className="flex w-fit flex-row items-center gap-2 rounded-3xl border border-[#71718A] pt-1 pr-2 pb-1 pl-2 text-[#71718A]">
              <Clock size={16} />
              <span className="text-lg">
                {formatDuration(feedback.startTimeSeconds)} ~{" "}
                {formatDuration(feedback.endTimeSeconds)}
              </span>
            </div>
            <p className="text-xl leading-8">{feedback.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
