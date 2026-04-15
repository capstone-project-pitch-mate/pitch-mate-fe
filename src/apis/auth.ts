import apiInstance from "@shared/apis";

import type {
  SignupResponse,
  SignupRequestBody,
  LoginRequestBoby,
  LoginResponse,
} from "./types";
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

export const loginApi = async ({ email, password }: LoginRequestBoby) => {
  const response = await apiInstance.post<LoginResponse, LoginRequestBoby>(
    AUTH_URL.LOGIN,
    {
      email,
      password,
    },
  );

  return response.result;
};

export const logoutApi = async (refreshToken: string) => {
  await apiInstance.post(AUTH_URL.LOGOUT, { refreshToken });
};
