import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";

import { ROUTES } from "@router/constants";
import { formatDate, formatDuration } from "@utils/formatter";

import {
  PageHeader,
  RubricResult,
  SegmentCommentList,
} from "./components";
import { DUMMY_MENTOR_FEEDBACK_HISTORY } from "./constants";

export default function MentorFeedbackHistoryDetail() {
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const feedback = DUMMY_MENTOR_FEEDBACK_HISTORY.find(
    (item) => String(item.id) === feedbackId,
  );

  if (!feedback) {
    return (
      <div className="flex min-h-screen min-w-300 flex-col gap-6 p-10">
        <PageHeader
          title="피드백 히스토리를 찾을 수 없습니다"
          description="더미 데이터에 없는 피드백입니다. 목록으로 돌아가 다시 선택해주세요."
        />
        <button
          className="w-fit rounded-2xl bg-[#6868FF] px-6 py-4 text-xl font-bold text-white"
          type="button"
          onClick={() => navigate(ROUTES.MENTOR_FEEDBACK_HISTORY)}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-8 p-10 pb-30">
      <PageHeader
        title={feedback.title}
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
          <video
            className="w-full rounded-3xl"
            src={feedback.videoUrl}
            controls
          />
        </div>

        <aside className="flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#6868FF]">
              피드백 완료 정보
            </span>
            <p className="text-xl leading-8 text-[#1A1A2E]">
              {feedback.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xl text-[#71718A]">
            <span className="flex flex-row items-center gap-2">
              <UserRound size={22} />
              {feedback.menteeNickname}
            </span>
            <span className="flex flex-row items-center gap-2">
              <CalendarDays size={22} />
              완료일 {formatDate(feedback.completedAt)}
            </span>
            <span className="rounded-2xl bg-[rgba(104,104,255,0.10)] px-4 py-3 font-semibold text-[#6868FF]">
              영상 길이 {formatDuration(feedback.durationSeconds)}
            </span>
          </div>
        </aside>
      </section>

      <SegmentCommentList comments={feedback.comments} />

      <RubricResult
        totalScore={feedback.totalScore}
        overallComment={feedback.overallComment}
        rubricScores={feedback.rubricScores}
      />
    </div>
  );
}
