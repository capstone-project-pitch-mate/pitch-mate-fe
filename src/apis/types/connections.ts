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
