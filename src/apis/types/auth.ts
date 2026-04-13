export interface SignupResponse {
  userId: number;
  email: string;
  nickname: string;
  role: string;
}

export interface SignupRequestBody {
  email: string;
  password: string;
  nickname: string;
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
  role: string;
}
