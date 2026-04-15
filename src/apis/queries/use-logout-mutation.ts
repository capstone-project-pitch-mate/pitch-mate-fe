import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logoutApi } from "@apis/auth";
import useToast from "@hooks/use-toast";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const refreshToken = localStorage.getItem("refreshToken") ?? "";

  const { mutate: logout } = useMutation({
    mutationFn: () => logoutApi(refreshToken),
    onSuccess: () => {
      toast.info("로그아웃되었습니다.");
    },
    onError: () => {
      toast.error(
        "정상적인 로그아웃에 실패했습니다. 로컬 스토리지를 초기화하겠습니다.",
      );
    },
    onSettled: () => {
      localStorage.clear();
      navigate("/login", { replace: true });
    },
  });

  return { logout };
};
