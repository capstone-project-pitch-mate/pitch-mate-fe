import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyMentorApi } from "@apis/connections";
import { CONNECTIONS_QUERY_KEY } from "@apis/query-key";
import type { ApplyMentorResponse } from "@apis/types";
import useToast from "@hooks/use-toast";

export const useApplyConnectionsMutation = () => {
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: applyConnections, isPending: isPendingApplyConnections } =
    useMutation<ApplyMentorResponse, Error, number>({
      mutationFn: (mentorId) => applyMentorApi(mentorId),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: CONNECTIONS_QUERY_KEY.DEFAULT });
        toast.info("멘토 신청이 완료되었습니다.");
      },
      onError: (error) => {
        toast.error(`멘토 신청 실패: ${error.message}`);
      },
    });

  return { applyConnections, isPendingApplyConnections };
};
