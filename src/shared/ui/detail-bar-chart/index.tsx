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
  const isSingle = session2Score === undefined;

  const session1Percent = (session1Score / MAX_SCORE) * 100;
  const session2Percent =
    session2Score !== undefined ? (session2Score / MAX_SCORE) * 100 : 0;

  const scoreGap =
    session2Score !== undefined ? session2Score - session1Score : 0;

  const scoreGapColor =
    scoreGap > 0
      ? "text-[#00BC7D]"
      : scoreGap < 0
        ? "text-[#FB2C36]"
        : "text-[#71718A]";

  return (
    <div
      className={cn(
        "flex flex-1 flex-row items-center",
        isSingle ? "gap-3" : "gap-5",
      )}
    >
      <span
        className={cn(
          "font-medium",
          isSingle ? "w-28 text-base" : "w-40 text-xl",
        )}
      >
        {rubricTitle}
      </span>
      <div
        className={cn(
          "relative flex-1 rounded-full bg-[#F5F5FA]",
          isSingle ? "h-4" : "h-6",
        )}
      >
        <div
          className={cn(
            "absolute left-0 rounded-full",
            isSingle
              ? "h-4 bg-[#6868FF]"
              : session2Score === undefined
                ? "h-6 bg-[#6868FF]"
                : "h-6 bg-[rgba(104,104,255,0.40)]",
          )}
          style={{ width: `${session1Percent}%` }}
        />

        {session2Score !== undefined && (
          <div
            className="absolute top-1/2 left-0 h-3 -translate-y-1/2 rounded-full bg-[rgba(0,212,146,0.60)]"
            style={{ width: `${session2Percent}%` }}
          />
        )}
      </div>
      <span
        className={cn(
          "text-center font-semibold text-[#6868FF]",
          isSingle ? "w-12 text-base" : "w-20 text-xl",
        )}
      >
        {session1Score}
      </span>
      {session2Score !== undefined && (
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
