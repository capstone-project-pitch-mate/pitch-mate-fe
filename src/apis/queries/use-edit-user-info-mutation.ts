import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { EditUserInfoRequest, UserInfoResponse } from "@apis/types";
import { editUserInfoApi } from "@apis/user";
import { DASHBOARD_QUERY_KEY, USER_INFO_QUERY_KEY } from "@apis/query-key";
import useToast from "@hooks/use-toast";

export const useEditUserInfoMutation = () => {
  const qc = useQueryClient();
  const toast = useToast();

  const { mutate: editUserInfo, isPending: isPendingEditUserInfo } =
    useMutation<UserInfoResponse, Error, EditUserInfoRequest>({
      mutationFn: (data) => editUserInfoApi(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: USER_INFO_QUERY_KEY.DEFAULT });
        qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY.MENTEE });
        toast.info("프로필이 수정되었습니다.");
      },
      onError: (error) => {
        toast.error(`프로필 수정 실패: ${error.message}`);
      },
    });

  return { editUserInfo, isPendingEditUserInfo };
};
