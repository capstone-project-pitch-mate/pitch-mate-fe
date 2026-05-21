import type { Mentee } from "../types";

export const MAX_CONNECTED_MENTEES = 10;

// TEMP_DUMMY_MENTEE_LIST: API 연동 전까지 멘토의 멘티 연결 요청/연결 목록을 보여주는 더미 데이터입니다.
export const DUMMY_MENTEES: Mentee[] = [
  {
    id: 1,
    connectionId: 1,
    nickname: "민지",
    bio: "서비스 기획 직무 면접을 준비하고 있어요. 발표 구조와 설득력을 개선하고 싶습니다.",
    requestedAt: "2026-05-06T18:20:00+09:00",
    recentVideoTitle: "서비스 기획 직무 1분 자기소개",
    status: "REQUESTED",
  },
  {
    id: 2,
    connectionId: 2,
    nickname: "현우",
    bio: "인턴십 지원 발표를 연습 중입니다. 경험을 직무 역량으로 연결하는 피드백이 필요해요.",
    requestedAt: "2026-05-05T13:10:00+09:00",
    recentVideoTitle: "인턴십 지원 발표 연습",
    status: "REQUESTED",
  },
  {
    id: 3,
    connectionId: 3,
    nickname: "수지",
    bio: "데이터 분석 직무 지원자입니다. 분석 프로젝트를 더 명확하게 설명하고 싶어요.",
    requestedAt: "2026-04-28T09:30:00+09:00",
    connectedAt: "2026-04-29T11:00:00+09:00",
    recentVideoTitle: "데이터 분석 직무 지원 동기",
    status: "CONNECTED",
  },
  {
    id: 4,
    connectionId: 4,
    nickname: "지훈",
    bio: "AI 서비스 발표와 창업 피칭을 준비하고 있습니다.",
    requestedAt: "2026-04-25T20:40:00+09:00",
    connectedAt: "2026-04-26T10:20:00+09:00",
    recentVideoTitle: "AI 서비스 런칭 발표",
    status: "CONNECTED",
  },
  {
    id: 5,
    connectionId: 5,
    nickname: "유나",
    bio: "인턴 경험 기반 역량 답변을 다듬고 있습니다. 말의 흐름을 개선하고 싶어요.",
    requestedAt: "2026-04-22T15:00:00+09:00",
    connectedAt: "2026-04-23T09:15:00+09:00",
    recentVideoTitle: "인턴 경험 기반 역량 답변",
    status: "CONNECTED",
  },
];
