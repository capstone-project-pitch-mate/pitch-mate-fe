import { MessageSquareText } from "lucide-react";

import { formatDuration } from "@utils/formatter";

import type { SegmentComment } from "@pages/mentor-requested-videos/types";

interface SegmentCommentListProps {
  comments: SegmentComment[];
}

export default function SegmentCommentList({
  comments,
}: SegmentCommentListProps) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-center gap-3">
        <MessageSquareText color="#6868FF" size={28} />
        <h2 className="text-2xl font-semibold">구간별 멘토 코멘트</h2>
      </div>

      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-2xl bg-[#FFFBEF] p-5"
          >
            <span className="w-fit rounded-xl bg-white px-3 py-1 text-lg font-semibold text-[#71718A]">
              {formatDuration(comment.startTimeSeconds)} ~{" "}
              {formatDuration(comment.endTimeSeconds)}
            </span>
            <p className="mt-3 text-xl leading-8 text-[#1A1A2E]">
              {comment.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
