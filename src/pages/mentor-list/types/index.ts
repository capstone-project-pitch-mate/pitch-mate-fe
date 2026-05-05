// ADDED_MENTOR_LIST: mentor list page local types until mentor APIs are connected.
export type MentorStatus = "CONNECTED" | "PENDING" | "AVAILABLE";

export interface Mentor {
  id: number;
  nickname: string;
  bio: string;
  status: MentorStatus;
}
