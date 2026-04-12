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
