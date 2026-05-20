// ADDED_ROLE_FLOW: mentor/mentee role selection support for auth screens.
export type UserRole = "MENTOR" | "MENTEE";

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

export interface LoginFormBoby {
  email: string;
  password: string;
  // ADDED_ROLE_FLOW: selected role is included in the login payload while dummy auth is used.
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
