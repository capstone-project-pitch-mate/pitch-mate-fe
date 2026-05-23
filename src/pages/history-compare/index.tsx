import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useVideoCompareQuery } from "@apis/queries";
import type { VideoCompareResponse } from "@apis/types";
import { FeedbackViewSelector } from "@pages/video-history-detail/components";
import type { FeedbackViewType } from "@pages/video-history-detail/types";
import { PageError, PageLoading } from "@shared/ui";
import { ROUTES } from "@router/constants";

import { CompareFeedbackResultSection } from "./components";
import type { CompareFeedbackResult } from "./types";

const toCompareResult = (data: VideoCompareResponse): CompareFeedbackResult => ({
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

const EMPTY_COMPARE_MESSAGE: Record<FeedbackViewType, string> = {
  AI: "비교할 AI 평가 결과가 없습니다.",
  MENTOR: "멘토 피드백 비교는 아직 지원되지 않습니다.",
  ALL: "표시할 비교 결과가 없습니다.",
};

export default function HistoryCompare() {
  const navigate = useNavigate();
  const { videoId1, videoId2 } = useParams();
  const parsedVideoId1 = Number(videoId1);
  const parsedVideoId2 = Number(videoId2);
  const validVideoId1 = Number.isFinite(parsedVideoId1)
    ? parsedVideoId1
    : null;
  const validVideoId2 = Number.isFinite(parsedVideoId2)
    ? parsedVideoId2
    : null;
  const { compareData, isPendingCompare, isErrorCompare } =
    useVideoCompareQuery(validVideoId1, validVideoId2);
  const [selectedView, setSelectedView] = useState<FeedbackViewType>("AI");

  const handleBack = () => {
    navigate(-1);
  };

  if (validVideoId1 === null || validVideoId2 === null) {
    return <Navigate to={ROUTES.VIDEO_HISTORY} replace />;
  }

  if (isPendingCompare) {
    return <PageLoading />;
  }

  if (isErrorCompare || !compareData) {
    return <PageError />;
  }

  const aiCompareResult = toCompareResult(compareData);
  const compareResults =
    selectedView === "AI"
      ? [aiCompareResult]
    : selectedView === "MENTOR"
      ? []
      : [aiCompareResult];

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
          {EMPTY_COMPARE_MESSAGE[selectedView]}
        </div>
      ) : (
        compareResults.map((result) => (
          <CompareFeedbackResultSection key={result.label} result={result} />
        ))
      )}
    </div>
  );
}
