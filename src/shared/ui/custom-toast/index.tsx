import { Info, TriangleAlert } from "lucide-react";

interface CustomToastProps {
  message: string;
  isError?: boolean;
}

export default function CustomToast({ message, isError }: CustomToastProps) {
  return (
    <div className="z-30 flex flex-row items-center justify-center gap-2 rounded-4xl bg-white px-8 py-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
      {isError ? <TriangleAlert color="#FB2C36" /> : <Info color="#00BC7D" />}
      <span className="text-2xl font-semibold text-[#1A1A2E]">{message}</span>
    </div>
  );
}
