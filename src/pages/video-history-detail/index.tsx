import { useState } from "react";

import {
  DUMMY_AI_FEEDBACK_RESULT,
  DUMMY_DETAIL_VIDEO_INFO,
  DUMMY_MENTOR_FEEDBACK_RESULT,
} from "./constants";
import {
  FeedbackResultSection,
  FeedbackViewSelector,
  HistoryDetailHeader,
  HistoryDetailVideo,
} from "./components";
import type { FeedbackViewType } from "./types";

export default function VideoHistoryDetail() {
  const [selectedView, setSelectedView] = useState<FeedbackViewType>("AI");

  const feedbackResults =
    selectedView === "AI"
      ? [DUMMY_AI_FEEDBACK_RESULT]
      : selectedView === "MENTOR"
        ? [DUMMY_MENTOR_FEEDBACK_RESULT]
        : [DUMMY_AI_FEEDBACK_RESULT, DUMMY_MENTOR_FEEDBACK_RESULT];

  return (
    <div className="flex flex-col gap-10 p-10">
      <HistoryDetailHeader
        title={DUMMY_DETAIL_VIDEO_INFO.title}
        createdAt={DUMMY_DETAIL_VIDEO_INFO.createdAt}
      />
      <HistoryDetailVideo videoUrl={DUMMY_DETAIL_VIDEO_INFO.videoUrl} />
      <FeedbackViewSelector
        selectedView={selectedView}
        handleChangeView={setSelectedView}
      />
      {feedbackResults.map((result) => (
        <FeedbackResultSection key={result.label} result={result} />
      ))}
    </div>
  );
}
