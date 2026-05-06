import type {
  MentorRequestedVideo,
  MentorRubricItem,
} from "../types";

// TEMP_DUMMY_MENTOR_FEEDBACK_FLOW: 요청받은 동영상 API 연동 전까지 사용하는 멘토용 더미 목록입니다.
export const DUMMY_REQUESTED_VIDEOS: MentorRequestedVideo[] = [
  {
    id: 101,
    title: "서비스 기획 직무 1분 자기소개",
    menteeNickname: "민지",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    durationSeconds: 184,
    requestedAt: "2026-05-05T11:20:00+09:00",
    description:
      "기획 직무 지원용 1분 자기소개입니다. 문제 정의와 지원 동기가 자연스럽게 이어지는지 확인해주세요.",
  },
  {
    id: 102,
    title: "캡스톤 프로젝트 발표 리허설",
    menteeNickname: "도윤",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    durationSeconds: 367,
    requestedAt: "2026-05-04T19:10:00+09:00",
    description:
      "캡스톤 프로젝트 중간 발표 리허설입니다. 서비스 가치와 구현 범위 설명이 설득력 있는지 보고 싶습니다.",
  },
  {
    id: 103,
    title: "프론트엔드 기술 면접 답변",
    menteeNickname: "서연",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    durationSeconds: 248,
    requestedAt: "2026-05-03T15:40:00+09:00",
    description:
      "React 상태 관리와 성능 최적화 질문에 대한 답변입니다. 답변 구조와 근거가 충분한지 피드백해주세요.",
  },
  {
    id: 104,
    title: "인턴십 지원 발표 연습",
    menteeNickname: "현우",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    durationSeconds: 302,
    requestedAt: "2026-05-02T16:10:00+09:00",
    description:
      "인턴십 면접 발표 연습 영상입니다. 경험 설명이 직무 역량과 잘 연결되는지 확인해주세요.",
  },
  {
    id: 105,
    title: "데이터 분석 포트폴리오 발표",
    menteeNickname: "지안",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=640&q=80",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    durationSeconds: 265,
    requestedAt: "2026-05-01T14:30:00+09:00",
    description:
      "데이터 분석 프로젝트 포트폴리오 발표입니다. 결과 해석과 비즈니스 임팩트 설명을 중심으로 봐주세요.",
  },
];

// ADDED_MENTOR_FEEDBACK_FLOW: 멘토가 평가 루브릭을 작성할 때 사용하는 더미 평가 항목입니다.
export const MENTOR_RUBRIC_ITEMS: MentorRubricItem[] = [
  { id: 1, title: "핵심 메시지 전달력", category: "delivery" },
  { id: 2, title: "논리적 구성", category: "speech" },
  { id: 3, title: "내용 완성도", category: "speech" },
  { id: 4, title: "정보 정확성", category: "speech" },
  { id: 5, title: "설득력", category: "delivery" },
  { id: 6, title: "말 속도 적절성", category: "delivery" },
  { id: 7, title: "발화 안정성", category: "delivery" },
  { id: 8, title: "발음 명확성", category: "delivery" },
  { id: 9, title: "음성 변화", category: "delivery" },
  { id: 10, title: "필러워드 사용", category: "speech" },
  { id: 11, title: "시선 처리", category: "nonVerbal" },
  { id: 12, title: "제스처 활용", category: "nonVerbal" },
  { id: 13, title: "자세 안정성", category: "nonVerbal" },
  { id: 14, title: "표정 활용", category: "nonVerbal" },
  { id: 15, title: "자신감 표현", category: "nonVerbal" },
  { id: 16, title: "시간 활용", category: "delivery" },
  { id: 17, title: "발표 흐름", category: "speech" },
  { id: 18, title: "내용 연결성", category: "speech" },
  { id: 19, title: "집중도 유지", category: "delivery" },
  { id: 20, title: "전체 완성도", category: "delivery" },
];
