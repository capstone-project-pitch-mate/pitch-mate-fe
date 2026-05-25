import type { UserRole } from "@shared/types";

export interface UserInfoResponse {
  userId: number;
  email: string;
  nickname: string;
  role: UserRole;
  intro: string | null;
  profileImage: string | null;
  createdAt: string;
}

export interface EditUserInfoRequest {
  nickname?: string;
  profileImage?: File;
  intro?: string;
}

export type DeleteUserResponse = string;
