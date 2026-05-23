import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import type { Rubric } from "@apis/types";

import type {
  FeedbackWritingStep,
  SegmentComment,
  SegmentCommentDraft,
} from "../types";
import { calculateRubricTotalScore, toMentorRubricScores } from "../utils";

const INITIAL_COMMENT_DRAFT: SegmentCommentDraft = {
  startTimeSeconds: 0,
  endTimeSeconds: 0,
  content: "",
};

interface UseMentorFeedbackFormParams {
  rubrics?: Rubric[];
  videoId?: number;
  handleCompleteFeedback: () => void;
}

export const useMentorFeedbackForm = ({
  rubrics,
  videoId,
  handleCompleteFeedback,
}: UseMentorFeedbackFormParams) => {
  const [selectedStep, setSelectedStep] =
    useState<FeedbackWritingStep>("COMMENT");
  const [comments, setComments] = useState<SegmentComment[]>([]);
  const [commentDraft, setCommentDraft] = useState<SegmentCommentDraft>(
    INITIAL_COMMENT_DRAFT,
  );
  const [rubricScoreOverrides, setRubricScoreOverrides] = useState<
    Record<number, number>
  >({});
  const [overallComment, setOverallComment] = useState("");

  const rubricScores = useMemo(
    () => toMentorRubricScores(rubrics ?? [], rubricScoreOverrides),
    [rubricScoreOverrides, rubrics],
  );
  const totalScore = useMemo(
    () => calculateRubricTotalScore(rubricScores),
    [rubricScores],
  );

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
      ...INITIAL_COMMENT_DRAFT,
      startTimeSeconds: commentDraft.endTimeSeconds,
      endTimeSeconds: commentDraft.endTimeSeconds,
    });
  };

  const handleRemoveComment = (commentId: number) => {
    setComments((prev) => prev.filter((item) => item.id !== commentId));
  };

  const handleNext = () => {
    if (comments.length === 0) {
      toast.error("루브릭 작성 전에 구간 코멘트를 1개 이상 남겨주세요.");
      return;
    }

    setSelectedStep("RUBRIC");
  };

  const handleChangeScore = (rubricId: number, score: number) => {
    setRubricScoreOverrides((prev) => ({
      ...prev,
      [rubricId]: score,
    }));
  };

  const handleComplete = () => {
    if (!overallComment.trim()) {
      toast.error("멘토 피드백 총평을 입력해주세요.");
      return;
    }

    console.log("[mentor-feedback-complete]", {
      videoId,
      comments,
      rubricScores,
      overallComment,
      totalScore,
    });
    toast.info("멘토 피드백이 완료되었습니다.");
    handleCompleteFeedback();
  };

  return {
    selectedStep,
    comments,
    commentDraft,
    rubricScores,
    overallComment,
    setSelectedStep,
    setCommentDraft,
    setOverallComment,
    handleAddComment,
    handleRemoveComment,
    handleNext,
    handleChangeScore,
    handleComplete,
  };
};
