export const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/quicktime", // mov
  "video/x-msvideo", // avi
  "video/webm", // webm
] as const;

export const ALLOWED_VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".avi",
  ".webm",
] as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
