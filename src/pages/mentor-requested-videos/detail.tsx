import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  useRubricsQuery,
  useSubmitMentorFeedbackMutation,
} from "@apis/queries";
import type { VideoMetadata } from "@apis/types";
import { ROUTES } from "@router/constants";
import { PageError, PageLoading } from "@shared/ui";

import {
  CommentEditor,
  DetailStepTabs,
  PageHeader,
  RequestedVideoInfo,
  RubricForm,
  VideoFeedbackPlayer,
} from "./components";
import { useMentorFeedbackForm } from "./hooks";
import { toRequestedVideo } from "./utils";

export default function MentorRequestedVideoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId } = useParams();
  const { rubrics, isPendingRubrics, isErrorRubrics } = useRubricsQuery();
  const { submitMentorFeedbackAsync, isPendingSubmitMentorFeedback } =
    useSubmitMentorFeedbackMutation();
  const routeState = location.state as { video?: VideoMetadata } | null;
  const stateVideo = routeState?.video;
  const video =
    stateVideo && String(stateVideo.videoId) === videoId
      ? toRequestedVideo(stateVideo)
      : null;
  const feedbackForm = useMentorFeedbackForm({
    rubrics,
    videoId: video?.id,
    handleSubmitFeedback: submitMentorFeedbackAsync,
    handleCompleteFeedback: () => navigate(ROUTES.MENTOR_FEEDBACK_HISTORY),
  });

  const handleBackToList = () => {
    navigate(ROUTES.MENTOR_REQUESTED_VIDEOS);
  };

  if (isPendingRubrics) {
    return <PageLoading />;
  }

  if (isErrorRubrics) {
    return <PageError />;
  }

  if (!video) {
    return (
      <div className="flex min-h-screen min-w-300 flex-col gap-6 p-10">
        <PageHeader
          title="요청받은 동영상을 찾을 수 없습니다"
          description="목록으로 돌아가 다시 선택해주세요."
        />
        <button
          className="w-fit rounded-2xl bg-[#6868FF] px-6 py-4 text-xl font-bold text-white"
          type="button"
          onClick={handleBackToList}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-8 p-10 pb-30">
      <PageHeader
        title={video.title}
        description="영상 구간별 코멘트를 작성한 뒤 평가 루브릭을 완료하세요."
        action={
          <button
            className="flex shrink-0 flex-row items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-4 text-xl font-semibold text-[#1A1A2E]"
            type="button"
            onClick={handleBackToList}
          >
            <ArrowLeft size={24} />
            목록
          </button>
        }
      />

      <section className="grid grid-cols-[1.15fr_0.85fr] gap-7">
        <VideoFeedbackPlayer
          videoUrl={video.videoUrl}
          durationSeconds={video.durationSeconds}
          draft={feedbackForm.commentDraft}
          handleChangeDraft={feedbackForm.setCommentDraft}
        />
        <RequestedVideoInfo video={video} />
      </section>

      <DetailStepTabs
        selectedStep={feedbackForm.selectedStep}
        rubricDisabled={feedbackForm.comments.length === 0}
        handleChangeStep={feedbackForm.setSelectedStep}
      />

      {feedbackForm.selectedStep === "COMMENT" ? (
        <CommentEditor
          comments={feedbackForm.comments}
          draft={feedbackForm.commentDraft}
          handleChangeDraft={feedbackForm.setCommentDraft}
          handleAddComment={feedbackForm.handleAddComment}
          handleRemoveComment={feedbackForm.handleRemoveComment}
          handleNext={feedbackForm.handleNext}
        />
      ) : (
        <RubricForm
          rubricScores={feedbackForm.rubricScores}
          overallComment={feedbackForm.overallComment}
          handleChangeScore={feedbackForm.handleChangeScore}
          handleChangeOverallComment={feedbackForm.setOverallComment}
          handleComplete={feedbackForm.handleComplete}
          isPending={isPendingSubmitMentorFeedback}
        />
      )}
    </div>
  );
}
