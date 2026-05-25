export type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED" | null;

export type ConnectionListResponse = ConnectionResponse[];

export type DeleteConnectionResponse = string;

export type SearchMentorResponse = {
  mentorId: number;
  nickname: string;
  intro: string | null;
  profileImage: string | null;
  connectionStatus: ConnectionStatus;
}[];

export interface ConnectionResponse {
  connectionId: number;
  userId: number;
  nickname: string;
  intro: string | null;
  profileImage: string | null;
  connectionStatus: ConnectionStatus;
  createdAt: string;
}
