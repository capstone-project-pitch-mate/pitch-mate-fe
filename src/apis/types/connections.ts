export type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED" | null;

export type ConnectionsResponse = {
  connectionId: number;
  mentorId: number;
  mentorNickname: string;
  mentorIntro: string | null;
  menteeId: number;
  menteeNickname: string;
  menteeIntro: string | null;
  status: ConnectionStatus;
  createdAt: string;
}[];

export type SearchMentorResponse = {
  mentorId: number;
  nickname: string;
  intro: string | null;
  profileImage: string | null;
  connectionStatus: ConnectionStatus;
}[];

export interface ApplyMentorResponse {
  connectionId: number;
  mentorId: number;
  mentorNickname: string;
  mentorIntro: string;
  menteeId: number;
  menteeNickname: string;
  menteeIntro: string;
  status: string;
  createdAt: string;
}
