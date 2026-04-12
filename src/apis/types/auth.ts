export interface SignupResponse {
  userId: number;
  email: string;
  nickname: string;
}

export interface SignupRequestBody {
  email: string;
  password: string;
  nickname: string;
}
