import type { UserRole } from "@apis/types";
import { cn } from "@utils/cn";

// ADDED_ROLE_FLOW: shared radio UI used by login and signup for mentor/mentee selection.
interface RoleSelectProps {
  selectedRole: UserRole;
  handleChangeRole: (role: UserRole) => void;
}

const ROLE_OPTIONS: { label: string; description: string; value: UserRole }[] =
  [
    {
      label: "멘티",
      description: "발표와 면접 피드백을 받습니다.",
      value: "MENTEE",
    },
    {
      label: "멘토",
      description: "멘티의 영상을 보고 피드백합니다.",
      value: "MENTOR",
    },
  ];

export default function RoleSelect({
  selectedRole,
  handleChangeRole,
}: RoleSelectProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <span className="text-xl leading-6 font-medium">역할 선택</span>
      <div className="grid grid-cols-2 gap-3">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = selectedRole === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer flex-col gap-1 rounded-xl border p-4",
                isSelected
                  ? "border-[#6868FF] bg-[rgba(104,104,255,0.08)]"
                  : "border-[rgba(0,0,0,0.08)] bg-white",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleChangeRole(option.value)}
                />
                <span className="text-xl font-semibold text-[#222236]">
                  {option.label}
                </span>
              </div>
              <span className="text-md leading-6 text-[#71718A]">
                {option.description}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
