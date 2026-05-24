interface ProfileSectionHeaderProps {
  isDeleting: boolean;
  onClickDelete: () => void;
}

export default function ProfileSectionHeader({
  isDeleting,
  onClickDelete,
}: ProfileSectionHeaderProps) {
  return (
    <div className="flex flex-row items-start justify-between gap-4">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl leading-6 font-semibold">프로필 수정</h3>
        <p className="text-2xl leading-6 text-[#71718A]">
          닉네임, 프로필 이미지, 자기소개를 수정할 수 있습니다.
        </p>
      </div>
      <button
        type="button"
        className="flex shrink-0 flex-row items-center gap-2 rounded-lg border border-[#FFB4B4] bg-[#FFF1F1] px-4 py-2 text-base font-semibold text-[#E53935] transition hover:bg-[#FFE4E4] disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onClickDelete}
        disabled={isDeleting}
      >
        탈퇴하기
      </button>
    </div>
  );
}
