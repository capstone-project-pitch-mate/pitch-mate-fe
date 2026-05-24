import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import type { DeleteUserResponse } from "@apis/types";
import { deleteUserApi } from "@apis/user";
import useToast from "@hooks/use-toast";
import { ROUTES } from "@router/constants";
import type { ApiError } from "@shared/apis";

export const useDeleteUserMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: deleteUser, isPending: isPendingDeleteUser } = useMutation<
    DeleteUserResponse,
    ApiError
  >({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      toast.info("회원 탈퇴가 완료되었습니다.");
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: (error) => {
      toast.error(`회원 탈퇴 실패: ${error.message}`);
    },
    retry: 0,
  });

  return { deleteUser, isPendingDeleteUser };
};
