import { cn } from "@utils/cn";

import type { FeedbackWritingStep } from "../../types";

interface DetailStepTabsProps {
  selectedStep: FeedbackWritingStep;
  rubricDisabled: boolean;
  handleChangeStep: (step: FeedbackWritingStep) => void;
}

export default function DetailStepTabs({
  selectedStep,
  rubricDisabled,
  handleChangeStep,
}: DetailStepTabsProps) {
  const tabs: {
    label: string;
    value: FeedbackWritingStep;
    disabled?: boolean;
  }[] = [
    { label: "구간별 코멘트", value: "COMMENT" },
    { label: "평가 루브릭", value: "RUBRIC", disabled: rubricDisabled },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-3 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "h-14 rounded-2xl text-xl font-semibold text-[#71718A] transition-colors",
            selectedStep === tab.value &&
              "bg-[rgba(104,104,255,0.10)] text-[#6868FF]",
            tab.disabled && "cursor-not-allowed opacity-40",
          )}
          type="button"
          disabled={tab.disabled}
          onClick={() => handleChangeStep(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
