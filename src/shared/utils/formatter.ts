export const formatDuration = (durationSeconds: number) => {
  const minutes = String(Math.floor(durationSeconds / 60)).padStart(2, "0");
  const seconds = String(durationSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);
  return date.toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
};
