import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { FeedbackViewSelector } from "@pages/video-history-detail/components";
import type { FeedbackViewType } from "@pages/video-history-detail/types";

import { CompareFeedbackResultSection } from "./components";
import { AI_COMPARE_RESULT, MENTOR_COMPARE_RESULT } from "./constants";

export default function HistoryCompare() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<FeedbackViewType>("AI");

  const handleBack = () => {
    navigate(-1);
  };

  const compareResults =
    selectedView === "AI"
      ? [AI_COMPARE_RESULT]
      : selectedView === "MENTOR"
        ? [MENTOR_COMPARE_RESULT]
        : [AI_COMPARE_RESULT, MENTOR_COMPARE_RESULT];

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10 pb-30">
      <section className="flex flex-row items-center gap-8">
        <button type="button" className="p-5" onClick={handleBack}>
          <ArrowLeft />
        </button>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl leading-14 font-medium">히스토리 비교</h1>
          <p className="text-2xl leading-9 text-[#71718A]">
            AI와 멘토의 피드백 기준으로 두 영상의 평가 결과를 비교합니다.
          </p>
        </div>
      </section>
      <FeedbackViewSelector
        selectedView={selectedView}
        handleChangeView={setSelectedView}
      />
      {compareResults.map((result) => (
        <CompareFeedbackResultSection key={result.label} result={result} />
      ))}
    </div>
  );
}
