export type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED" | null;

export type ConnectionListResponse = ConnectionReponse[];

export type DeleteConnectionResponse = string;

export type SearchMentorResponse = {
  mentorId: number;
  nickname: string;
  intro: string | null;
  profileImage: string | null;
  connectionStatus: ConnectionStatus;
}[];

export interface ConnectionReponse {
  connectionId: number;
  mentorId: number;
  mentorNickname: string;
  mentorIntro: string;
  menteeId: number;
  menteeNickname: string;
  menteeIntro: string;
  status: ConnectionStatus;
  createdAt: string;
}
