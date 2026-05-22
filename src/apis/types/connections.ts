export type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED" | null;

export type ConnectionListResponse = ConnectionResponse[];

export type DeleteConnectionResponse = string;

export type SearchMentorResponse = {
  mentorId: number;
  nickname: string;
  intro: string;
  profileImage: string;
  connectionStatus: ConnectionStatus;
}[];

export interface ConnectionResponse {
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
