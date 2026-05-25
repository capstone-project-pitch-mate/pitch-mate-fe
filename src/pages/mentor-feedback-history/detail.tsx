import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";

import { useVideoHistoryDetailQuery } from "@apis/queries";
import type { VideoHistoryDetailResponse } from "@apis/types";
import { ROUTES } from "@router/constants";
import { PageError, PageLoading } from "@shared/ui";
import { formatDate, formatDuration } from "@utils/formatter";
import type {
  MentorRubricScore,
  SegmentComment,
} from "@pages/mentor-requested-videos/types";

import {
  PageHeader,
  RubricResult,
  SegmentCommentList,
} from "./components";

const toSegmentComments = (
  feedbacks: NonNullable<VideoHistoryDetailResponse["mentor"]>["feedbacks"],
): SegmentComment[] =>
  feedbacks.map((feedback) => ({
    id: feedback.feedbackId,
    startTimeSeconds: feedback.startTimeSeconds,
    endTimeSeconds: feedback.endTimeSeconds,
    content: feedback.content,
  }));

const toRubricScores = (
  evaluation: NonNullable<VideoHistoryDetailResponse["mentor"]>["evaluation"],
): MentorRubricScore[] =>
  evaluation?.scores.map((score) => ({
    id: score.rubricId,
    title: score.rubricTitle,
    category: "delivery",
    score: score.score,
  })) ?? [];

export default function MentorFeedbackHistoryDetail() {
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const parsedVideoId = Number(feedbackId);
  const { historyDetail, isPendingHistoryDetail, isErrorHistoryDetail } =
    useVideoHistoryDetailQuery(Number.isNaN(parsedVideoId) ? null : parsedVideoId);

  if (Number.isNaN(parsedVideoId)) {
    return <Navigate to={ROUTES.MENTOR_FEEDBACK_HISTORY} replace />;
  }

  if (isPendingHistoryDetail) {
    return <PageLoading />;
  }

  if (isErrorHistoryDetail || !historyDetail) {
    return <PageError />;
  }

  const { video } = historyDetail;
  const mentorEvaluation = historyDetail.mentor?.evaluation ?? null;
  const mentorComments = toSegmentComments(historyDetail.mentor?.feedbacks ?? []);
  const mentorRubricScores = toRubricScores(mentorEvaluation);
  const durationSeconds = video.durationSeconds ?? 0;

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-8 p-10 pb-30">
      <PageHeader
        title={video.title}
        description="완료한 멘토 피드백을 다시 확인하세요."
        action={
          <button
            className="flex shrink-0 flex-row items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-4 text-xl font-semibold text-[#1A1A2E]"
            type="button"
            onClick={() => navigate(ROUTES.MENTOR_FEEDBACK_HISTORY)}
          >
            <ArrowLeft size={24} />
            목록
          </button>
        }
      />

      <section className="grid grid-cols-[1.15fr_0.85fr] gap-7">
        <div className="rounded-3xl border-3 border-[rgba(0,0,0,0.08)] bg-[rgba(104,104,255,0.05)] p-7">
          <video className="w-full rounded-3xl" src={video.videoUrl} controls />
        </div>

        <aside className="flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#6868FF]">
              피드백 완료 정보
            </span>
            <p className="text-xl leading-8 text-[#1A1A2E]">
              {video.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xl text-[#71718A]">
            <span className="flex flex-row items-center gap-2">
              <UserRound size={22} />
              {video.ownerNickname}
            </span>
            <span className="flex flex-row items-center gap-2">
              <CalendarDays size={22} />
              완료일 {formatDate(mentorEvaluation?.createdAt ?? video.createdAt)}
            </span>
            <span className="rounded-2xl bg-[rgba(104,104,255,0.10)] px-4 py-3 font-semibold text-[#6868FF]">
              영상 길이 {formatDuration(durationSeconds)}
            </span>
          </div>
        </aside>
      </section>

      <SegmentCommentList comments={mentorComments} />

      <RubricResult
        totalScore={String(mentorEvaluation?.totalScore ?? 0)}
        overallComment={
          mentorEvaluation?.comment ?? "아직 등록된 멘토 총평이 없습니다."
        }
        rubricScores={mentorRubricScores}
      />
    </div>
  );
}
