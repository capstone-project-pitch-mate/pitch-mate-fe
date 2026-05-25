import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useVideoCompareQuery } from "@apis/queries";
import type {
  CategoryScore,
  VideoCompareResponse,
  VideoHistoryDetailEvaluation,
} from "@apis/types";
import { FeedbackViewSelector } from "@pages/video-history-detail/components";
import type { FeedbackViewType } from "@pages/video-history-detail/types";
import { PageError, PageLoading } from "@shared/ui";
import { ROUTES } from "@router/constants";

import { CompareFeedbackResultSection } from "./components";
import type { CompareFeedbackResult } from "./types";

const EMPTY_CATEGORY_SCORE: CategoryScore = {
  speechAvg: 0,
  nonVerbalAvg: 0,
  deliveryAvg: 0,
};

const SPEECH_RUBRIC_IDS = new Set([19, 21, 27, 28, 29, 31, 33, 34]);
const NON_VERBAL_RUBRIC_IDS = new Set([22, 23, 24, 25, 35]);

const toAiCompareResult = (
  data: VideoCompareResponse,
): CompareFeedbackResult => ({
  label: "AI 피드백 비교",
  session1: {
    videoId: data.session1.videoId,
    videoTitle: data.session1.videoTitle,
    totalScore: data.evaluationScores.session1TotalScore,
    durationSeconds: data.session1.durationSeconds,
    createdAt: data.session1.createdAt,
  },
  session2: {
    videoId: data.session2.videoId,
    videoTitle: data.session2.videoTitle,
    totalScore: data.evaluationScores.session2TotalScore,
    durationSeconds: data.session2.durationSeconds,
    createdAt: data.session2.createdAt,
  },
  category: data.categoryData,
  detail: data.evaluationScores.rubricComparisons,
  overallComment: {
    session1OverallComment: data.session1OverallComment,
    session2OverallComment: data.session2OverallComment,
  },
});

const averageByRubricIds = (
  evaluation: VideoHistoryDetailEvaluation,
  rubricIds: Set<number>,
) => {
  const scores = evaluation.scores.filter((score) => rubricIds.has(score.rubricId));

  if (scores.length === 0) {
    return 0;
  }

  return (
    scores.reduce((sum, score) => sum + score.score, 0) / scores.length
  );
};

const deriveCategoryScore = (
  evaluation: VideoHistoryDetailEvaluation | null | undefined,
): CategoryScore => {
  if (!evaluation) {
    return EMPTY_CATEGORY_SCORE;
  }

  return {
    speechAvg: averageByRubricIds(evaluation, SPEECH_RUBRIC_IDS),
    nonVerbalAvg: averageByRubricIds(evaluation, NON_VERBAL_RUBRIC_IDS),
    deliveryAvg: averageByRubricIds(
      evaluation,
      new Set(
        evaluation.scores
          .map((score) => score.rubricId)
          .filter(
            (rubricId) =>
              !SPEECH_RUBRIC_IDS.has(rubricId) &&
              !NON_VERBAL_RUBRIC_IDS.has(rubricId),
          ),
      ),
    ),
  };
};

const toMentorCompareResult = (
  data: VideoCompareResponse,
): CompareFeedbackResult | null => {
  const session1Evaluation = data.session1MentorEvaluation;
  const session2Evaluation = data.session2MentorEvaluation;

  if (!session1Evaluation || !session2Evaluation) {
    return null;
  }

  const session2ScoreMap = new Map(
    session2Evaluation.scores.map((score) => [score.rubricId, score.score]),
  );
  const rubricComparisons = session1Evaluation.scores.map((score) => ({
    rubricId: score.rubricId,
    rubricTitle: score.rubricTitle,
    session1Score: score.score,
    session2Score: session2ScoreMap.get(score.rubricId) ?? 0,
  }));

  return {
    label: "멘토 피드백 비교",
    session1: {
      videoId: data.session1.videoId,
      videoTitle: data.session1.videoTitle,
      totalScore: session1Evaluation.totalScore,
      durationSeconds: data.session1.durationSeconds,
      createdAt: data.session1.createdAt,
    },
    session2: {
      videoId: data.session2.videoId,
      videoTitle: data.session2.videoTitle,
      totalScore: session2Evaluation.totalScore,
      durationSeconds: data.session2.durationSeconds,
      createdAt: data.session2.createdAt,
    },
    category: data.mentorCategoryData ?? {
      session1: deriveCategoryScore(session1Evaluation),
      session2: deriveCategoryScore(session2Evaluation),
    },
    detail: rubricComparisons,
    overallComment: {
      session1OverallComment: session1Evaluation.comment,
      session2OverallComment: session2Evaluation.comment,
    },
  };
};

const getMentorCompareBlockMessage = (
  data: VideoCompareResponse,
): string | null => {
  const statuses = [
    data.session1.mentorFeedbackStatus,
    data.session2.mentorFeedbackStatus,
  ];

  if (statuses.includes("NOT_REQUESTED")) {
    return "멘토 피드백을 요청하지 않은 영상이 있어서 비교할 수 없습니다.";
  }

  if (statuses.includes("PENDING")) {
    return "아직 멘토 피드백을 받지 못한 영상이 있어서 비교할 수 없습니다.";
  }

  if (!statuses.every((status) => status === "COMPLETED")) {
    return "멘토 피드백이 완료된 영상끼리만 비교할 수 있습니다.";
  }

  return null;
};

const EMPTY_COMPARE_MESSAGE: Record<FeedbackViewType, string> = {
  AI: "비교할 AI 평가 결과가 없습니다.",
  MENTOR: "비교할 멘토 피드백 결과가 없습니다.",
  ALL: "표시할 비교 결과가 없습니다.",
};

export default function HistoryCompare() {
  const navigate = useNavigate();
  const { videoId1, videoId2 } = useParams();
  const parsedVideoId1 = Number(videoId1);
  const parsedVideoId2 = Number(videoId2);

  const { compareData, isPendingCompare, isErrorCompare } =
    useVideoCompareQuery(parsedVideoId1, parsedVideoId2);
  const [selectedView, setSelectedView] = useState<FeedbackViewType>("AI");

  const handleBack = () => {
    navigate(-1);
  };

  if (parsedVideoId1 === null || parsedVideoId2 === null) {
    return <Navigate to={ROUTES.VIDEO_HISTORY} replace />;
  }

  if (isPendingCompare) {
    return <PageLoading />;
  }

  if (isErrorCompare || !compareData) {
    return <PageError />;
  }

  const aiCompareResult = toAiCompareResult(compareData);
  const mentorCompareResult = toMentorCompareResult(compareData);
  const mentorCompareBlockMessage = getMentorCompareBlockMessage(compareData);
  const compareResults =
    selectedView === "AI"
      ? [aiCompareResult]
      : selectedView === "MENTOR"
        ? mentorCompareBlockMessage || !mentorCompareResult
          ? []
          : [mentorCompareResult]
        : [
            aiCompareResult,
            ...(!mentorCompareBlockMessage && mentorCompareResult
              ? [mentorCompareResult]
              : []),
          ];
  const emptyMessage =
    selectedView === "MENTOR" && mentorCompareBlockMessage
      ? mentorCompareBlockMessage
      : EMPTY_COMPARE_MESSAGE[selectedView];

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
      {compareResults.length === 0 ? (
        <div className="flex min-h-50 items-center justify-center rounded-3xl bg-[#F5F5FA] text-2xl font-medium text-[#71718A]">
          {emptyMessage}
        </div>
      ) : (
        <>
          {compareResults.map((result) => (
            <CompareFeedbackResultSection key={result.label} result={result} />
          ))}
          {selectedView === "ALL" && mentorCompareBlockMessage ? (
            <div className="flex min-h-36 items-center justify-center rounded-3xl bg-[#F5F5FA] px-8 text-center text-2xl font-medium text-[#71718A]">
              {mentorCompareBlockMessage}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
