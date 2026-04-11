import { Mic } from "lucide-react";

import { cn } from "@utils/cn";

interface LogoProps {
  size: "sm" | "lg";
  hasShadow?: boolean;
}

export default function Logo({ size = "sm", hasShadow = false }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#6868FF]",
        size === "sm" ? "h-12 w-12 rounded-2xl" : "h-22 w-22 rounded-3xl",
        hasShadow &&
          "shadow-[0_18px_28px_-6px_rgba(104,104,255,0.32),0_8px_14px_-6px_rgba(104,104,255,0.28)]",
      )}
    >
      <Mic size={size === "sm" ? 24 : 44} color="#fff" />
    </div>
  );
}
