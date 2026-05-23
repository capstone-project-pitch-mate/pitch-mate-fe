import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { toast } from "react-toastify";

import type { VideoMetadata } from "@apis/types";
import { ROUTES } from "@router/constants";
import { formatDate, formatDuration } from "@utils/formatter";

import {
  CommentEditor,
  DetailStepTabs,
  PageHeader,
  RubricForm,
  VideoFeedbackPlayer,
} from "./components";
import {
  DUMMY_REQUESTED_VIDEOS,
  MENTOR_RUBRIC_ITEMS,
} from "./constants";
import type {
  FeedbackWritingStep,
  MentorRubricScore,
  SegmentComment,
  SegmentCommentDraft,
} from "./types";

const toRequestedVideo = (video: VideoMetadata) => ({
  id: video.videoId,
  title: video.title,
  menteeNickname: video.ownerNickname,
  thumbnailUrl: video.thumbnailUrl ?? "",
  videoUrl: video.videoUrl,
  durationSeconds: video.durationSeconds ?? 0,
  requestedAt: video.createdAt,
  description: video.description,
});

export default function MentorRequestedVideoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId } = useParams();
  const routeState = location.state as { video?: VideoMetadata } | null;
  const video = routeState?.video
    ? toRequestedVideo(routeState.video)
    : DUMMY_REQUESTED_VIDEOS.find((item) => String(item.id) === videoId);

  const [selectedStep, setSelectedStep] =
    useState<FeedbackWritingStep>("COMMENT");
  const [comments, setComments] = useState<SegmentComment[]>([]);
  const [commentDraft, setCommentDraft] = useState<SegmentCommentDraft>({
    startTimeSeconds: 0,
    endTimeSeconds: 0,
    content: "",
  });
  const [rubricScores, setRubricScores] = useState<MentorRubricScore[]>(
    () => MENTOR_RUBRIC_ITEMS.map((item) => ({ ...item, score: 5 })),
  );
  const [overallComment, setOverallComment] = useState("");

  const totalScore = useMemo(
    () =>
      (
        (rubricScores.reduce((sum, item) => sum + item.score, 0) /
          (rubricScores.length * 10)) *
        100
      ).toFixed(1),
    [rubricScores],
  );

  if (!video) {
    return (
      <div className="flex min-h-screen min-w-300 flex-col gap-6 p-10">
        <PageHeader
          title="요청받은 동영상을 찾을 수 없습니다"
          description="더미 데이터에 없는 동영상입니다. 목록으로 돌아가 다시 선택해주세요."
        />
        <button
          className="w-fit rounded-2xl bg-[#6868FF] px-6 py-4 text-xl font-bold text-white"
          type="button"
          onClick={() => navigate(ROUTES.MENTOR_REQUESTED_VIDEOS)}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const handleAddComment = () => {
    if (commentDraft.endTimeSeconds <= commentDraft.startTimeSeconds) {
      toast.error("타임라인에서 시작 시간과 종료 시간을 선택해주세요.");
      return;
    }

    if (!commentDraft.content.trim()) {
      toast.error("구간 코멘트를 입력해주세요.");
      return;
    }

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        startTimeSeconds: commentDraft.startTimeSeconds,
        endTimeSeconds: commentDraft.endTimeSeconds,
        content: commentDraft.content.trim(),
      },
    ]);
    setCommentDraft({
      startTimeSeconds: commentDraft.endTimeSeconds,
      endTimeSeconds: commentDraft.endTimeSeconds,
      content: "",
    });
  };

  const handleNext = () => {
    if (comments.length === 0) {
      toast.error("루브릭 작성 전에 구간 코멘트를 1개 이상 남겨주세요.");
      return;
    }

    setSelectedStep("RUBRIC");
  };

  const handleChangeScore = (rubricId: number, score: number) => {
    setRubricScores((prev) =>
      prev.map((item) => (item.id === rubricId ? { ...item, score } : item)),
    );
  };

  const handleComplete = () => {
    if (!overallComment.trim()) {
      toast.error("멘토 피드백 총평을 입력해주세요.");
      return;
    }

    // TEMP_DUMMY_MENTOR_FEEDBACK_FLOW: API 연동 전에는 완료 처리 후 히스토리 페이지로 이동하는 더미 흐름만 제공합니다.
    console.log("[mentor-feedback-complete]", {
      videoId: video.id,
      comments,
      rubricScores,
      overallComment,
      totalScore,
    });
    toast.info("멘토 피드백이 완료되었습니다.");
    navigate(ROUTES.MENTOR_FEEDBACK_HISTORY);
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-8 p-10 pb-30">
      <PageHeader
        title={video.title}
        description="영상 구간별 코멘트를 작성한 뒤 평가 루브릭을 완료하세요."
        action={
          <button
            className="flex shrink-0 flex-row items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-4 text-xl font-semibold text-[#1A1A2E]"
            type="button"
            onClick={() => navigate(ROUTES.MENTOR_REQUESTED_VIDEOS)}
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
          draft={commentDraft}
          handleChangeDraft={setCommentDraft}
        />

        <aside className="flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#6868FF]">
              피드백 요청 정보
            </span>
            <p className="text-xl leading-8 text-[#1A1A2E]">
              {video.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xl text-[#71718A]">
            <span className="flex flex-row items-center gap-2">
              <UserRound size={22} />
              {video.menteeNickname}
            </span>
            <span className="flex flex-row items-center gap-2">
              <CalendarDays size={22} />
              {formatDate(video.requestedAt)}
            </span>
            <span className="rounded-2xl bg-[rgba(104,104,255,0.10)] px-4 py-3 font-semibold text-[#6868FF]">
              영상 길이 {formatDuration(video.durationSeconds)}
            </span>
          </div>
        </aside>
      </section>

      <DetailStepTabs
        selectedStep={selectedStep}
        rubricDisabled={comments.length === 0}
        handleChangeStep={setSelectedStep}
      />

      {selectedStep === "COMMENT" ? (
        <CommentEditor
          comments={comments}
          draft={commentDraft}
          handleChangeDraft={setCommentDraft}
          handleAddComment={handleAddComment}
          handleRemoveComment={(commentId) =>
            setComments((prev) => prev.filter((item) => item.id !== commentId))
          }
          handleNext={handleNext}
        />
      ) : (
        <RubricForm
          rubricScores={rubricScores}
          overallComment={overallComment}
          handleChangeScore={handleChangeScore}
          handleChangeOverallComment={setOverallComment}
          handleComplete={handleComplete}
        />
      )}
    </div>
  );
}
