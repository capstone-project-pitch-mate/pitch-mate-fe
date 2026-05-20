import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signupApi } from "@apis/auth";
import type { SignupRequestBody } from "@apis/types";
import { ROUTES } from "@router/constants";
import useToast from "@hooks/use-toast";

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: signup, isPending: isPendingSignup } = useMutation({
    mutationFn: (data: SignupRequestBody) => signupApi(data),
    onSuccess: () => {
      toast.info("회원가입에 성공했습니다.");
      navigate(ROUTES.LOGIN);
    },
  });

  return { signup, isPendingSignup };
};
