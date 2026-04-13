import type { HTMLInputTypeAttribute, ReactNode } from "react";

import { cn } from "@utils/cn";

interface InputBarProps {
  label?: ReactNode;
  type?: HTMLInputTypeAttribute;
  text: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
  isError?: boolean;
  error?: string;
  handleChangeText: (text: string) => void;
}

export default function InputBar({
  label,
  type = "text",
  text,
  placeholder,
  disabled,
  maxLength,
  isError,
  error,
  handleChangeText,
}: InputBarProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {label && (
        <div className="flex flex-row items-center gap-4">
          <label className="text-xl leading-6 font-medium">{label}</label>
          {isError && (
            <span className="text-md font-medium text-[#FF9496]">{error}</span>
          )}
        </div>
      )}
      <input
        className={cn(
          "h-14 rounded-xl bg-[#F5F5FA] pt-1.5 pr-5 pb-1.5 pl-5 text-xl placeholder:text-[#71718A]",
          isError && "border border-[#FF9496]",
        )}
        type={type}
        value={text}
        onChange={(e) => handleChangeText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
      />
    </div>
  );
}
