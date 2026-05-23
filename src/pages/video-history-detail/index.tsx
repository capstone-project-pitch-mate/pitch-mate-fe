import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useVideoHistoryDetailQuery } from "@apis/queries";
import type { VideoHistoryDetailResponse } from "@apis/types";
import { PageError, PageLoading } from "@shared/ui";
import { ROUTES } from "@router/constants";

import {
  FeedbackResultSection,
  FeedbackViewSelector,
  HistoryDetailHeader,
  HistoryDetailVideo,
} from "./components";
import type {
  FeedbackCategoryScore,
  FeedbackResult,
  FeedbackType,
  FeedbackViewType,
  RubricDetailType,
} from "./types";

const EMPTY_CATEGORY_SCORE: FeedbackCategoryScore = {
  speechAvg: 0,
  nonVerbalAvg: 0,
  deliveryAvg: 0,
};

const toFeedback = (
  feedback: VideoHistoryDetailResponse["feedbacks"]["ai"][number],
): FeedbackType => ({
  id: feedback.feedbackId,
  authorId: feedback.authorId ?? 0,
  authorNickname: feedback.authorNickname,
  startTimeSeconds: feedback.startTimeSeconds,
  endTimeSeconds: feedback.endTimeSeconds,
  content: feedback.content,
  createdAt: feedback.createdAt,
});

const toRubricScores = (
  evaluation: VideoHistoryDetailResponse["evaluations"]["ai"],
): RubricDetailType[] =>
  evaluation?.scores.map((score) => ({
    rubricId: score.rubricId,
    rubricTitle: score.rubricTitle,
    score: score.score,
  })) ?? [];

const toFeedbackResult = ({
  label,
  feedbacks,
  evaluation,
  categoryScore,
}: {
  label: string;
  feedbacks: VideoHistoryDetailResponse["feedbacks"]["ai"];
  evaluation: VideoHistoryDetailResponse["evaluations"]["ai"];
  categoryScore: VideoHistoryDetailResponse["categoryScores"]["ai"];
}): FeedbackResult | null => {
  if (!evaluation && feedbacks.length === 0) {
    return null;
  }

  return {
    label,
    overallComment: evaluation?.comment ?? "",
    feedbacks: feedbacks.map(toFeedback),
    totalScore: evaluation?.totalScore ?? 0,
    categoryScore: categoryScore ?? EMPTY_CATEGORY_SCORE,
    rubricScores: toRubricScores(evaluation),
  };
};

const EMPTY_FEEDBACK_MESSAGE: Record<FeedbackViewType, string> = {
  AI: "아직 AI 피드백이 없습니다.",
  MENTOR: "아직 멘토가 피드백하지 않았습니다.",
  ALL: "아직 표시할 피드백이 없습니다.",
};

export default function VideoHistoryDetail() {
  const { videoId } = useParams();
  const parsedVideoId = Number(videoId);

  const { historyDetail, isPendingHistoryDetail, isErrorHistoryDetail } =
    useVideoHistoryDetailQuery(parsedVideoId);
  const [selectedView, setSelectedView] = useState<FeedbackViewType>("AI");

  if (parsedVideoId === null) {
    return <Navigate to={ROUTES.VIDEO_HISTORY} replace />;
  }

  if (isPendingHistoryDetail) {
    return <PageLoading />;
  }

  if (isErrorHistoryDetail || !historyDetail) {
    return <PageError />;
  }

  const aiFeedbackResult = toFeedbackResult({
    label: "AI 피드백",
    feedbacks: historyDetail.feedbacks.ai,
    evaluation: historyDetail.evaluations.ai,
    categoryScore: historyDetail.categoryScores.ai,
  });
  const mentorFeedbackResult = toFeedbackResult({
    label: "멘토 피드백",
    feedbacks: historyDetail.feedbacks.mentor,
    evaluation: historyDetail.evaluations.mentor,
    categoryScore: historyDetail.categoryScores.mentor,
  });

  const feedbackResults =
    selectedView === "AI"
      ? [aiFeedbackResult].filter((result) => result !== null)
      : selectedView === "MENTOR"
        ? [mentorFeedbackResult].filter((result) => result !== null)
        : [aiFeedbackResult, mentorFeedbackResult].filter(
            (result) => result !== null,
          );

  return (
    <div className="flex flex-col gap-10 p-10">
      <HistoryDetailHeader
        title={historyDetail.video.title}
        createdAt={historyDetail.video.createdAt}
      />
      <HistoryDetailVideo videoUrl={historyDetail.video.videoUrl} />
      <FeedbackViewSelector
        selectedView={selectedView}
        handleChangeView={setSelectedView}
      />
      {feedbackResults.length === 0 ? (
        <div className="flex min-h-50 items-center justify-center rounded-3xl bg-[#F5F5FA] text-2xl font-medium text-[#71718A]">
          {EMPTY_FEEDBACK_MESSAGE[selectedView]}
        </div>
      ) : (
        feedbackResults.map((result) => (
          <FeedbackResultSection key={result.label} result={result} />
        ))
      )}
    </div>
  );
}
