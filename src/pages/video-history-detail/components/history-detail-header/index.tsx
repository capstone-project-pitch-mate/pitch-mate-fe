import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "@utils/formatter";

interface HistoryDetailHeaderProps {
  title: string;
  createdAt: string;
  isDeleting: boolean;
  onClickDelete: () => void;
}

export default function HistoryDetailHeader({
  title,
  createdAt,
  isDeleting,
  onClickDelete,
}: HistoryDetailHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="flex min-w-0 flex-row items-center gap-8">
        <button type="button" className="p-5" onClick={handleBack}>
          <ArrowLeft />
        </button>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="text-4xl leading-14 font-medium wrap-break-word">
            {title}
          </h1>
          <p className="text-2xl leading-9 text-[#71718A]">
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex w-fit shrink-0 flex-row items-center gap-2 rounded-xl border border-[#E53935] px-4 py-3 text-lg font-semibold text-[#E53935] transition hover:bg-[#FFF3F2] disabled:cursor-not-allowed disabled:opacity-60 sm:self-start"
        onClick={onClickDelete}
        disabled={isDeleting}
        aria-label="영상 삭제"
      >
        <Trash2 size={20} />
        {isDeleting ? "삭제 중..." : "영상 삭제"}
      </button>
    </section>
  );
}
