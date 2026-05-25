import { UserRound } from "lucide-react";

interface UserAvatarProps {
  imageUrl?: string | null;
  name: string;
  sizeClassName?: string;
}

export default function UserAvatar({
  imageUrl,
  name,
  sizeClassName = "h-14 w-14",
}: UserAvatarProps) {
  return (
    <div
      className={`${sizeClassName} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgba(104,104,255,0.10)]`}
    >
      {imageUrl ? (
        <img
          className="h-full w-full rounded-full border border-[#6868FF] object-cover"
          src={imageUrl}
          alt={`${name} 프로필 사진`}
        />
      ) : (
        <UserRound color="#6868FF" />
      )}
    </div>
  );
}
