import { Clock, Loader2, ArrowRight } from "lucide-react";

import { cn } from "@utils/cn";
import { formatDate, formatDuration } from "@utils/formatter";

interface HistoryCardProps {
  videoId: number;
  videoTitle: string;
  videoThumbnailUrl: string;
  createdAt: string;
  durationSeconds: number;
  totalScore: number;
  isAnalyzing: boolean;
  compareMode: boolean;
  selectedOrder?: number | null;
  handleClick: (videoId: number) => void;
}

export default function HistoryCard({
  videoId,
  videoTitle,
  videoThumbnailUrl,
  createdAt,
  durationSeconds,
  isAnalyzing,
  totalScore,
  compareMode,
  selectedOrder,
  handleClick,
}: HistoryCardProps) {
  return (
    <button
      className="flex h-45 min-w-200 flex-row items-center justify-between rounded-2xl pr-6 pl-6 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]"
      type="button"
      onClick={() => handleClick(videoId)}
      disabled={isAnalyzing}
    >
      <div className="flex flex-row items-center gap-5">
        <div className="relative">
          <img
            className="aspect-video w-50 rounded-2xl"
            src={videoThumbnailUrl}
            alt="영상 썸네일"
          />
          <div className="absolute right-2 bottom-2 rounded-lg bg-[rgba(0,0,0,0.70)] pt-0.5 pr-2 pb-0.5 pl-2">
            <span className="text-sm text-white">
              {formatDuration(durationSeconds)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <p className="text-xl font-semibold">{videoTitle}</p>
            {isAnalyzing && (
              <div className="flex flex-row items-center gap-2 rounded-xl border border-[#FEE685] pt-1 pr-2 pb-1 pl-2 text-[#FE9A00]">
                <Loader2 className="animate-spin" size={20} />
                <span>분석 중</span>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center gap-1.5 text-[#71718A]">
            <Clock size={20} />
            <span className="text-xl">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
      {!isAnalyzing && (
        <div className="flex flex-row items-center gap-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)] text-xl font-bold text-[#6868FF]">
            {totalScore}
          </span>
          {compareMode ? (
            <div
              className={cn(
                "flex h-7.5 w-7.5 items-center justify-center rounded-full",
                selectedOrder
                  ? "bg-[#6868FF] text-white"
                  : "border-2 border-[rgba(113,113,138,0.30)]",
              )}
            >
              {selectedOrder}
            </div>
          ) : (
            <ArrowRight color="#1A1A2E" size={30} />
          )}
        </div>
      )}
    </button>
  );
}
