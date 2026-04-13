import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginApi } from "@apis/auth";
import type { LoginRequestBoby } from "@apis/types";
import { ROUTES } from "@router/constants";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending: isPendingLogin } = useMutation({
    mutationFn: (data: LoginRequestBoby) => loginApi(data),
    onSuccess: ({ accessToken, refreshToken }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate(ROUTES.DASHBOARD);
    },
  });

  return { login, isPendingLogin };
};
