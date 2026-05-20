export type ConnectionsResponse = {
  connectionId: number;
  mentorId: number;
  mentorNickname: string;
  mentorIntro: string | null;
  menteeId: number;
  menteeNickname: string;
  menteeIntro: string | null;
  status: string;
  createdAt: string;
}[];
