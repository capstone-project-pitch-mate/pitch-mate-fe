import { signupApi } from "@apis/auth";
import type { SignupRequestBody } from "@apis/types";
import { ROUTES } from "@router/constants";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignupMutation = () => {
  const navigate = useNavigate();

  const { mutate: signup, isPending: isPendingSignup } = useMutation({
    mutationFn: (data: SignupRequestBody) => signupApi(data),
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });

  return { signup, isPendingSignup };
};
