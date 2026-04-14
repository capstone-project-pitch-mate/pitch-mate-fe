import { cn } from "@utils/cn";

interface DetailBarChartProps {
  rubricTitle: string;
  session1Score: number;
  session2Score?: number;
}

const MAX_SCORE = 10;

export default function DetailBarChart({
  rubricTitle,
  session1Score,
  session2Score,
}: DetailBarChartProps) {
  const session1Percent = (session1Score / MAX_SCORE) * 100;
  const session2Percent = session2Score ? (session2Score / MAX_SCORE) * 100 : 0;

  const scoreGap = session2Score ? session2Score - session1Score : 0;

  const scoreGapColor =
    scoreGap > 0
      ? "text-[#00BC7D]"
      : scoreGap < 0
        ? "text-[#FB2C36]"
        : "text-[#71718A]";

  return (
    <div className="flex flex-1 flex-row items-center gap-5">
      <span className="w-40 text-xl font-medium">{rubricTitle}</span>
      <div className="relative h-6 flex-1 rounded-full bg-[#F5F5FA]">
        <div
          className="absolute left-0 h-6 rounded-full bg-[rgba(104,104,255,0.40)]"
          style={{ width: `${session1Percent}%` }}
        />
        <div
          className="absolute top-1/2 left-0 h-3 -translate-y-1/2 rounded-full bg-[rgba(0,212,146,0.60)]"
          style={{ width: `${session2Percent}%` }}
        />
      </div>
      <span className="w-20 text-center text-xl font-semibold text-[#6868FF]">
        {session1Score}
      </span>
      {session2Score && (
        <>
          <span className="w-20 text-center text-xl font-semibold text-[#00BC7D]">
            {session2Score}
          </span>
          <span
            className={cn(
              "w-20 text-center text-xl font-semibold",
              scoreGapColor,
            )}
          >
            {scoreGap > 0 ? `+${scoreGap}` : scoreGap}
          </span>
        </>
      )}
    </div>
  );
}
