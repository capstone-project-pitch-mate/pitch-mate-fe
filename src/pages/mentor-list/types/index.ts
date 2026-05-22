// ADDED_MENTOR_LIST: mentor list page local types until mentor APIs are connected.
export type MentorStatus = "CONNECTED" | "PENDING" | "REJECTED" | "AVAILABLE";

export interface Mentor {
  id: number;
  connectionId?: number;
  nickname: string;
  bio: string;
  status: MentorStatus;
}
