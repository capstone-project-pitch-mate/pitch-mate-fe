import type { Mentor, MentorStatus } from "../types";

export const MAX_MENTOR_CONNECTIONS = 5;

// TEMP_DUMMY_MENTOR_LIST: mentor search now uses API, but local fixtures remain for non-search fallback flows.
export const DUMMY_MENTORS: Mentor[] = [
  {
    id: 1,
    nickname: "발표코치 수민",
    bio: "스타트업 IR과 캡스톤 발표 구조를 함께 다듬습니다.",
    status: "CONNECTED",
  },
  {
    id: 2,
    nickname: "면접멘토 지훈",
    bio: "기술 면접 답변의 논리성과 전달력을 중심으로 피드백합니다.",
    status: "PENDING",
  },
  {
    id: 3,
    nickname: "스피치 은서",
    bio: "시선, 제스처, 목소리 같은 비언어 표현을 자세히 봅니다.",
    status: "AVAILABLE",
  },
  {
    id: 4,
    nickname: "피칭메이트 현우",
    bio: "서비스 소개 발표와 데모 흐름을 청중 관점에서 점검합니다.",
    status: "AVAILABLE",
  },
  {
    id: 5,
    nickname: "커리어코치 나연",
    bio: "면접 자기소개와 프로젝트 설명을 짧고 명확하게 정리합니다.",
    status: "AVAILABLE",
  },
  {
    id: 6,
    nickname: "프레젠테이션 민재",
    bio: "발표 자료 없이 말의 흐름만으로 설득력을 높이는 연습을 돕습니다.",
    status: "AVAILABLE",
  },
  {
    id: 7,
    nickname: "발성코치 도윤",
    bio: "말의 속도, 발음, 톤을 중심으로 전달력을 높이는 코칭을 합니다.",
    status: "AVAILABLE",
  },
];

export const MENTOR_STATUS_LABEL: Record<MentorStatus, string> = {
  CONNECTED: "연결됨",
  PENDING: "수락 대기중",
  REJECTED: "거절됨",
  AVAILABLE: "신청 가능",
};

export const MENTOR_STATUS_STYLE: Record<MentorStatus, string> = {
  CONNECTED: "bg-[rgba(104,104,255,0.10)] text-[#6868FF]",
  PENDING: "bg-[#FFF4DE] text-[#FE9A00]",
  REJECTED: "bg-[#FFF0F0] text-[#FF5C5C]",
  AVAILABLE: "bg-[#F5F5FA] text-[#71718A]",
};
