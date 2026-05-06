import { CheckCircle2, Clock3, UsersRound } from "lucide-react";

import type {
  MentorDashboardSummary,
  MentorDashboardVideo,
  MentorDashboardVideoStatus,
} from "../types";

// TEMP_DUMMY_MENTOR_DASHBOARD: API 연동 전까지 멘토 대시보드 화면 검증용 더미 요약 데이터입니다.
export const MENTOR_DASHBOARD_SUMMARY: MentorDashboardSummary[] = [
  {
    id: "pending-feedback",
    title: "대기 중인 피드백",
    value: 4,
    description: "멘티가 피드백을 기다리는 영상입니다.",
    icon: Clock3,
  },
  {
    id: "completed-feedback",
    title: "완료한 피드백",
    value: 18,
    description: "이번 달 누적 완료 건수입니다.",
    icon: CheckCircle2,
  },
  {
    id: "connected-mentees",
    title: "연결된 멘티",
    value: 7,
    description: "현재 피드백을 주고받는 멘티입니다.",
    icon: UsersRound,
  },
];

// TEMP_DUMMY_MENTOR_DASHBOARD: 요청받은 동영상 목록 API가 준비되기 전까지 사용하는 더미 데이터입니다.
export const FEEDBACK_REQUEST_VIDEOS: MentorDashboardVideo[] = [
  {
    id: 101,
    title: "서비스 기획 직무 1분 자기소개",
    menteeNickname: "민지",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 184,
    date: "2026-05-05T11:20:00+09:00",
    status: "REQUESTED",
  },
  {
    id: 102,
    title: "캡스톤 프로젝트 발표 리허설",
    menteeNickname: "도윤",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 367,
    date: "2026-05-04T19:10:00+09:00",
    status: "REQUESTED",
  },
  {
    id: 103,
    title: "프론트엔드 기술 면접 답변",
    menteeNickname: "서연",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 248,
    date: "2026-05-03T15:40:00+09:00",
    status: "IN_REVIEW",
  },
  {
    id: 104,
    title: "인턴십 지원 발표 연습",
    menteeNickname: "현우",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 302,
    date: "2026-05-02T16:10:00+09:00",
    status: "REQUESTED",
  },
  {
    id: 105,
    title: "데이터 분석 포트폴리오 발표",
    menteeNickname: "지안",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 265,
    date: "2026-05-01T14:30:00+09:00",
    status: "REQUESTED",
  },
];

// TEMP_DUMMY_MENTOR_DASHBOARD: 피드백 히스토리 API가 준비되기 전까지 사용하는 더미 데이터입니다.
export const FEEDBACK_HISTORY_VIDEOS: MentorDashboardVideo[] = [
  {
    id: 201,
    title: "데이터 분석 직무 지원 동기",
    menteeNickname: "수지",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 213,
    date: "2026-05-01T13:30:00+09:00",
    status: "COMPLETED",
  },
  {
    id: 202,
    title: "AI 서비스 런칭 발표",
    menteeNickname: "지훈",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 401,
    date: "2026-04-29T20:15:00+09:00",
    status: "COMPLETED",
  },
  {
    id: 203,
    title: "인턴 경험 기반 역량 답변",
    menteeNickname: "유나",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 276,
    date: "2026-04-27T10:05:00+09:00",
    status: "COMPLETED",
  },
  {
    id: 204,
    title: "서비스 운영 개선 제안 발표",
    menteeNickname: "태오",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 332,
    date: "2026-04-24T09:45:00+09:00",
    status: "COMPLETED",
  },
  {
    id: 205,
    title: "마케팅 캠페인 결과 공유",
    menteeNickname: "예린",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=640&q=80",
    durationSeconds: 241,
    date: "2026-04-21T18:20:00+09:00",
    status: "COMPLETED",
  },
];

export const MENTOR_VIDEO_STATUS_LABEL: Record<
  MentorDashboardVideoStatus,
  string
> = {
  REQUESTED: "요청됨",
  IN_REVIEW: "검토 중",
  COMPLETED: "완료",
};

export const MENTOR_VIDEO_STATUS_STYLE: Record<
  MentorDashboardVideoStatus,
  string
> = {
  REQUESTED: "bg-[rgba(104,104,255,0.10)] text-[#6868FF]",
  IN_REVIEW: "bg-[#FFF4DE] text-[#FE9A00]",
  COMPLETED: "bg-[#ECFDF3] text-[#00A86B]",
};
