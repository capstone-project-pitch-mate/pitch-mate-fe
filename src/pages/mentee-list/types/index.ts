export type MenteeConnectionStatus = "REQUESTED" | "CONNECTED";

export interface Mentee {
  id: number;
  connectionId: number;
  nickname: string;
  bio: string;
  requestedAt: string;
  connectedAt?: string;
  recentVideoTitle?: string;
  status: MenteeConnectionStatus;
}
