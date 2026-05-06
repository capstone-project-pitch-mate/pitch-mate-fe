import type { LucideIcon } from "lucide-react";

export type MentorDashboardVideoStatus =
  | "REQUESTED"
  | "IN_REVIEW"
  | "COMPLETED";

export interface MentorDashboardVideo {
  id: number;
  title: string;
  menteeNickname: string;
  thumbnailUrl: string;
  durationSeconds: number;
  date: string;
  status: MentorDashboardVideoStatus;
}

export interface MentorDashboardSummary {
  id: string;
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}
