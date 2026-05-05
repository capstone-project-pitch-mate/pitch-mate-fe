// TEMP_DUMMY_AUTH: restore apiInstance import when API integration resumes.
// import apiInstance from "@shared/apis";

import type {
  // TEMP_DUMMY_AUTH: original response types needed when API integration resumes.
  // SignupResponse,
  SignupRequestBody,
  LoginRequestBoby,
  // LoginResponse,
} from "./types";
// TEMP_DUMMY_AUTH: restore AUTH_URL import when API integration resumes.
// import { AUTH_URL } from "./constants";
import { createDummyLoginResponse, createDummySignupResponse } from "./dummy-data";

export const signupApi = async (data: SignupRequestBody) => {
  // TEMP_DUMMY_AUTH: original signup API call is preserved below while dummy auth is used.
  // const response = await apiInstance.post<SignupResponse, SignupRequestBody>(
  //   AUTH_URL.SIGNUP,
  //   {
  //     email: data.email,
  //     nickname: data.nickname,
  //     password: data.password,
  //   },
  // );
  //
  // return response.result;

  // ADDED_DUMMY_DATA: return local signup response until backend contract is reconnected.
  return createDummySignupResponse({
    ...data,
    // ADDED_DUMMY_DATA: API function keeps the original request type, so dummy mode supplies a fallback role.
    role: "MENTEE",
  });
};

export const loginApi = async (data: LoginRequestBoby) => {
  // TEMP_DUMMY_AUTH: original login API call is preserved below while dummy auth is used.
  // const response = await apiInstance.post<LoginResponse, LoginRequestBoby>(
  //   AUTH_URL.LOGIN,
  //   {
  //     email: data.email,
  //     password: data.password,
  //   },
  // );
  //
  // return response.result;

  // ADDED_DUMMY_DATA: return local login response until backend contract is reconnected.
  return createDummyLoginResponse({
    ...data,
    // ADDED_DUMMY_DATA: API function keeps the original request type, so dummy mode supplies a fallback role.
    role: "MENTEE",
  });
};

export const logoutApi = async (refreshToken: string) => {
  // TEMP_DUMMY_AUTH: original logout API call is preserved below while dummy auth is used.
  // await apiInstance.post(AUTH_URL.LOGOUT, { refreshToken });

  // ADDED_DUMMY_DATA: keep signature compatible and avoid network calls during UI expansion.
  await Promise.resolve(refreshToken);
};
