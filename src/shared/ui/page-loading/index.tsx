import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Loader2 color="#6868FF" size={60} className="animate-spin" />
    </div>
  );
}
