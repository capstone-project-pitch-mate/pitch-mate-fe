import { cn } from "@utils/cn";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "lg" | "full";
  color?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  handleClick?: () => void;
}

export default function Button({
  children,
  size = "sm",
  color = "primary",
  type = "button",
  disabled = false,
  handleClick,
}: ButtonProps) {
  const buttonStyle =
    size === "sm"
      ? "p-3 w-fit"
      : size === "lg"
        ? "p-4.5 w-fit"
        : "p-4.5 w-full";
  const buttonColor =
    color === "primary"
      ? "bg-[#6868FF] text-white"
      : "bg-white   border border-[rgba(0,0,0,0.08)]";

  return (
    <button
      className={cn(
        "items-center justify-center rounded-xl",
        buttonStyle,
        buttonColor,
        disabled && "bg-[#ADADAD]",
      )}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
