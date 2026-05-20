import apiInstance from "@shared/apis";

import { AUTH_URL } from "./constants";
import type {
  LoginRequestBoby,
  LoginResponse,
  SignupRequestBody,
  SignupResponse,
} from "./types";

export const signupApi = async (data: SignupRequestBody) => {
  const response = await apiInstance.post<SignupResponse, SignupRequestBody>(
    AUTH_URL.SIGNUP,
    data,
  );

  return response.result;
};

export const loginApi = async (data: LoginRequestBoby) => {
  const response = await apiInstance.post<LoginResponse, LoginRequestBoby>(
    AUTH_URL.LOGIN,
    data,
  );

  return response.result;
};

export const logoutApi = async (refreshToken: string) => {
  await apiInstance.post(AUTH_URL.LOGOUT, { refreshToken });
};
