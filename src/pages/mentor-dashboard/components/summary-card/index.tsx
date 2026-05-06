import type { MentorDashboardSummary } from "../../types";

interface SummaryCardProps {
  summary: MentorDashboardSummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  const Icon = summary.icon;

  return (
    <article className="flex h-36 flex-row items-center justify-between rounded-2xl bg-white px-7 py-6 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-medium text-[#71718A]">
          {summary.title}
        </span>
        <div className="flex flex-row items-end gap-2">
          <strong className="text-4xl leading-11 font-bold text-[#1A1A2E]">
            {summary.value}
          </strong>
          <span className="pb-1 text-lg text-[#71718A]">건</span>
        </div>
        <p className="text-lg leading-6 text-[#71718A]">
          {summary.description}
        </p>
      </div>
      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[rgba(104,104,255,0.10)]">
        <Icon color="#6868FF" size={28} />
      </div>
    </article>
  );
}
