import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "@utils/formatter";

interface HistoryDetailHeaderProps {
  title: string;
  createdAt: string;
}

export default function HistoryDetailHeader({
  title,
  createdAt,
}: HistoryDetailHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="flex flex-row items-center gap-8">
      <button type="button" className="p-5" onClick={handleBack}>
        <ArrowLeft />
      </button>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-4xl leading-14 font-medium">{title}</h1>
        <p className="text-2xl leading-9 text-[#71718A]">
          {formatDate(createdAt)}
        </p>
      </div>
    </section>
  );
}
