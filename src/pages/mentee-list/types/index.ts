export type MenteeConnectionStatus = "REQUESTED" | "CONNECTED";

export interface Mentee {
  id: number;
  connectionId: number;
  nickname: string;
  bio: string;
  profileImage?: string | null;
  requestedAt: string;
  connectedAt?: string;
  recentVideoTitle?: string;
  status: MenteeConnectionStatus;
}
