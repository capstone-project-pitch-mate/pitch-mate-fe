import apiInstance from "@shared/apis";

import type { SignupResponse, SignupRequestBody } from "./types";
import { AUTH_URL } from "./constants";

export const signupApi = async ({
  email,
  nickname,
  password,
}: SignupRequestBody) => {
  const response = await apiInstance.post<SignupResponse, SignupRequestBody>(
    AUTH_URL.SIGNUP,
    {
      email,
      nickname,
      password,
    },
  );

  return response.result;
};
