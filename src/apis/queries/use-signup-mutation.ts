import { createDummySignupResponse } from "@apis/dummy-data";
// TEMP_DUMMY_AUTH: restore the commented signupApi import and mutationFn when API integration resumes.
// API 재연동 시 아래 import와 mutationFn을 복구하면 됩니다.
// import { signupApi } from "@apis/auth";
import type { SignupFormBody } from "@apis/types";
import { ROUTES } from "@router/constants";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignupMutation = () => {
  const navigate = useNavigate();

  const { mutate: signup, isPending: isPendingSignup } = useMutation({
    // TEMP_DUMMY_AUTH: original API call is preserved below while role UI is built with dummy signup.
    // 기존 API 호출은 확장 기능 UI 작업 중 더미 회원가입 흐름을 위해 임시 주석 처리했습니다.
    // mutationFn: (data: SignupRequestBody) => signupApi(data),
    mutationFn: async (data: SignupFormBody) =>
      createDummySignupResponse(data),
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });

  return { signup, isPendingSignup };
};
