import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// TEMP_DUMMY_AUTH: restore this import and mutationFn call when API integration resumes.
// import { logoutApi } from "@apis/auth";
import useToast from "@hooks/use-toast";
import { ROUTES } from "@router/constants";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: logout } = useMutation({
    mutationFn: () => {
      // TEMP_DUMMY_AUTH: original API logout flow is preserved below while dummy auth is used.
      // const refreshToken = localStorage.getItem("refreshToken");
      // if (!refreshToken) return Promise.resolve();
      // return logoutApi(refreshToken);
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.info("로그아웃되었습니다.");
    },
    onError: () => {
      toast.error(
        "정상적인 로그아웃에 실패했습니다. 로컬 스토리지를 초기화하겠습니다.",
      );
    },
    onSettled: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // ADDED_ROLE_FLOW: clear locally selected user role on logout.
      localStorage.removeItem("userRole");
      navigate(ROUTES.LOGIN, { replace: true });
    },
    retry: 3,
  });

  return { logout };
};
