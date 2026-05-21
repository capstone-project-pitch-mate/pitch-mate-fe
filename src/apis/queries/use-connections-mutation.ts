import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  acceptConnectionApi,
  applyConnectionApi,
  deleteConnectionApi,
  rejectConnectionApi,
} from "@apis/connections";
import { CONNECTIONS_QUERY_KEY } from "@apis/query-key";
import type { ConnectionReponse, DeleteConnectionResponse } from "@apis/types";
import useToast from "@hooks/use-toast";

export const useApplyConnectionMutation = () => {
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: applyConnection, isPending: isPendingApplyConnection } =
    useMutation<ConnectionReponse, Error, number>({
      mutationFn: (mentorId) => applyConnectionApi(mentorId),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: CONNECTIONS_QUERY_KEY.DEFAULT });
        toast.info("멘토 신청이 완료되었습니다.");
      },
      onError: (error) => {
        toast.error(`멘토 신청 실패: ${error.message}`);
      },
    });

  return { applyConnection, isPendingApplyConnection };
};

export const useDeleteConnectionMutation = () => {
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: deleteConnection, isPending: isPendingDeleteConnection } =
    useMutation<DeleteConnectionResponse, Error, number>({
      mutationFn: (connectionId) => deleteConnectionApi(connectionId),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: CONNECTIONS_QUERY_KEY.DEFAULT });
        toast.info("연결이 삭제되었습니다.");
      },
      onError: (error) => {
        toast.error(`연결 삭제 실패: ${error.message}`);
      },
    });

  return { deleteConnection, isPendingDeleteConnection };
};

export const useAcceptConnectionMutation = () => {
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: acceptConnection, isPending: isPendingAcceptConnection } =
    useMutation<ConnectionReponse, Error, number>({
      mutationFn: (connectionId) => acceptConnectionApi(connectionId),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: CONNECTIONS_QUERY_KEY.DEFAULT });
        toast.info("연결 요청을 수락했습니다.");
      },
      onError: (error) => {
        toast.error(`연결 수락 실패: ${error.message}`);
      },
    });

  return { acceptConnection, isPendingAcceptConnection };
};

export const useRejectConnectionMutation = () => {
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: rejectConnection, isPending: isPendingRejectConnection } =
    useMutation<ConnectionReponse, Error, number>({
      mutationFn: (connectionId) => rejectConnectionApi(connectionId),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: CONNECTIONS_QUERY_KEY.DEFAULT });
        toast.info("연결 요청을 거절했습니다.");
      },
      onError: (error) => {
        toast.error(`연결 거절 실패: ${error.message}`);
      },
    });

  return { rejectConnection, isPendingRejectConnection };
};
