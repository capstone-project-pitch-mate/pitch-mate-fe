import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { createDummyLoginResponse } from "@apis/dummy-data";
// TEMP_DUMMY_AUTH: restore the commented loginApi import and mutationFn when API integration resumes.
// API 재연동 시 아래 import와 mutationFn을 복구하면 됩니다.
// import { loginApi } from "@apis/auth";
import type { LoginFormBoby } from "@apis/types";
import { ROUTES } from "@router/constants";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending: isPendingLogin } = useMutation({
    // TEMP_DUMMY_AUTH: original API call is preserved below while role UI is built with dummy auth.
    // 기존 API 호출은 확장 기능 UI 작업 중 더미 인증 흐름을 위해 임시 주석 처리했습니다.
    // mutationFn: (data: LoginRequestBoby) => loginApi(data),
    mutationFn: async (data: LoginFormBoby) => createDummyLoginResponse(data),
    onSuccess: ({ accessToken, refreshToken, role }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userRole", role);
      navigate(ROUTES.DASHBOARD);
    },
  });

  return { login, isPendingLogin };
};
