import { cn } from "@utils/cn";
import { FEEDBACK_VIEW_OPTIONS } from "../../constants";
import type { FeedbackViewType } from "../../types";

interface FeedbackViewSelectorProps {
  selectedView: FeedbackViewType;
  handleChangeView: (view: FeedbackViewType) => void;
}

export default function FeedbackViewSelector({
  selectedView,
  handleChangeView,
}: FeedbackViewSelectorProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl p-6 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <span className="px-1 text-2xl font-medium">피드백 보기</span>
      <div className="grid grid-cols-3 gap-3">
        {FEEDBACK_VIEW_OPTIONS.map((option) => {
          const isSelected = selectedView === option.value;
          return (
            <button
              key={option.value}
              className={cn(
                "flex h-14 cursor-pointer items-center justify-center rounded-xl border text-xl font-semibold",
                isSelected
                  ? "border-[#6868FF] bg-[rgba(104,104,255,0.10)] text-[#6868FF]"
                  : "border-[rgba(0,0,0,0.08)] text-[#71718A]",
              )}
              onClick={() => handleChangeView(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
