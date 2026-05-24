interface DeleteUserConfirmModalProps {
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteUserConfirmModal({
  isPending,
  onCancel,
  onConfirm,
}: DeleteUserConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-user-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
      >
        <div className="flex flex-col gap-3">
          <h4
            id="delete-user-modal-title"
            className="text-2xl font-semibold text-[#1F1F2E]"
          >
            회원 탈퇴
          </h4>
          <p className="text-lg leading-7 text-[#5E5E72]">
            계정을 삭제하면 복구할 수 없습니다. 정말 탈퇴하시겠습니까?
          </p>
        </div>

        <div className="mt-7 flex flex-row justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-[#D8D8E4] px-5 py-3 text-base font-semibold text-[#5E5E72] transition hover:bg-[#F7F7FB] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onCancel}
            disabled={isPending}
          >
            취소
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#E53935] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#D32F2F] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "탈퇴 중..." : "탈퇴하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
