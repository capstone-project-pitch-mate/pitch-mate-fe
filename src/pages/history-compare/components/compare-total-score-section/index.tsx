import { TrendingUp, TrendingDown, ArrowRight, Equal } from "lucide-react";

import { formatDate } from "@utils/formatter";

import type { ComparedTotalScoreType } from "../../types";
import { cn } from "@utils/cn";

interface CompareTotalScoreSectionProps {
  session1: ComparedTotalScoreType;
  session2: ComparedTotalScoreType;
}

export default function CompareTotalScoreSection({
  session1,
  session2,
}: CompareTotalScoreSectionProps) {
  const scoreGap = session2.totalScore - session1.totalScore;

  return (
    <section className="flex w-full flex-row items-center justify-between gap-9">
      <div className="flex aspect-2/1 flex-1 flex-col items-center justify-center gap-5 rounded-3xl pt-6 pb-6 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
        <div className="flex h-25 w-25 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)] text-3xl font-bold text-[#6868FF]">
          {session1.totalScore}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xl font-semibold">{session1.videoTitle}</span>
          <span className="text-lg text-[#71718A]">
            {formatDate(session1.createdAt)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        {scoreGap !== 0 && (
          <div
            className={cn(
              "flex flex-row items-center gap-1.5 text-[#00BC7D]",
              scoreGap < 0 && "text-[#FB2C36]",
            )}
          >
            {scoreGap > 0 ? <TrendingUp /> : <TrendingDown />}
            <span className="text-3xl font-bold">
              {scoreGap > 0 ? `+${scoreGap}` : scoreGap}점
            </span>
          </div>
        )}
        {scoreGap === 0 ? (
          <Equal color="#71718A" />
        ) : (
          <ArrowRight color="#71718A" />
        )}
      </div>
      <div className="flex aspect-2/1 flex-1 flex-col items-center justify-center gap-5 rounded-3xl pt-6 pb-6 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
        <div className="flex h-25 w-25 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)] text-3xl font-bold text-[#6868FF]">
          {session2.totalScore}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xl font-semibold">{session2.videoTitle}</span>
          <span className="text-lg text-[#71718A]">
            {formatDate(session2.createdAt)}
          </span>
        </div>
      </div>
    </section>
  );
}
