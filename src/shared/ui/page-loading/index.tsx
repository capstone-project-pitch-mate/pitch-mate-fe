import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div
      className="flex h-full flex-1 items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="페이지 로딩 중"
    >
      <Loader2 color="#6868FF" size={60} className="animate-spin" aria-hidden />
    </div>
  );
}
