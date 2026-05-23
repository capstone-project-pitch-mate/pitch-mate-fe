import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitMentorFeedbackApi } from "@apis/feedback";
import { HISTORY_QUERY_KEY, VIDEO_QUERY_KEY } from "@apis/query-key";
import type {
  SubmitMentorFeedbackRequest,
  SubmitMentorFeedbackResponse,
} from "@apis/types";
import useToast from "@hooks/use-toast";
import type { ApiError } from "@shared/apis";

export const useSubmitMentorFeedbackMutation = () => {
  const toast = useToast();
  const qc = useQueryClient();

  const {
    mutate: submitMentorFeedback,
    mutateAsync: submitMentorFeedbackAsync,
    isPending: isPendingSubmitMentorFeedback,
  } = useMutation<
    SubmitMentorFeedbackResponse,
    ApiError,
    SubmitMentorFeedbackRequest
  >({
    mutationFn: submitMentorFeedbackApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: VIDEO_QUERY_KEY.REQUESTED });
      qc.invalidateQueries({ queryKey: HISTORY_QUERY_KEY.DEFAULT });
      toast.info("멘토 피드백이 완료되었습니다.");
    },
    onError: (error) => {
      toast.error(`멘토 피드백 작성 실패: ${error.message}`);
    },
    retry: 0,
  });

  return {
    submitMentorFeedback,
    submitMentorFeedbackAsync,
    isPendingSubmitMentorFeedback,
  };
};
