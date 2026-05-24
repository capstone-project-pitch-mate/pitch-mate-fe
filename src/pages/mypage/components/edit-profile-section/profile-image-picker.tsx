import { Camera, User } from "lucide-react";
import type { ChangeEvent, RefObject } from "react";

import { ALLOWED_PROFILE_IMAGE_TYPES } from "@shared/constants";

interface ProfileImagePickerProps {
  disabled: boolean;
  email: string;
  imageUrl: string;
  inputRef: RefObject<HTMLInputElement | null>;
  nickname: string;
  onChangeFile: (file: File | undefined) => void;
}

export default function ProfileImagePicker({
  disabled,
  email,
  imageUrl,
  inputRef,
  nickname,
  onChangeFile,
}: ProfileImagePickerProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeFile(event.target.files?.[0]);
    event.target.value = "";
  };

  return (
    <div className="flex flex-row items-center gap-9">
      <button
        className="relative flex h-30 w-30 shrink-0 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]"
        type="button"
        aria-label="프로필 사진 선택"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {imageUrl ? (
          <img
            className="h-full w-full rounded-full border border-[#6868FF] object-cover"
            src={imageUrl}
            alt="프로필 사진"
          />
        ) : (
          <User size={55} color="#6868FF" />
        )}
        <span className="absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#6868FF] shadow-[0_10px_20px_rgba(104,104,255,0.30)]">
          <Camera size={24} color="#fff" />
        </span>
      </button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={ALLOWED_PROFILE_IMAGE_TYPES.join(",")}
        disabled={disabled}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-2">
        <span className="text-3xl font-medium">{nickname}</span>
        <span className="text-xl text-[#71718A]">{email}</span>
      </div>
    </div>
  );
}
