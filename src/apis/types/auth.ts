import type { UserRole } from "@shared/types";

export interface SignupResponse {
  userId: number;
  email: string;
  nickname: string;
  role: UserRole;
}

export interface SignupFormBody {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

export interface SignupRequestBody {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

export interface LoginRequestBoby {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  nickname: string;
  role: UserRole;
}
