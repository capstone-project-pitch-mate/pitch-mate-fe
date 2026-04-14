import type { CompareRubricDetailType } from "@pages/history-compare/types";
import { DetailBarChart } from "@shared/ui";

interface CompareDetailBarChartSectionProps {
  rubricDetailScores: CompareRubricDetailType[];
  session1Name: string;
  session2Name: string;
}

export default function CompareDetailBarChartSection({
  rubricDetailScores,
  session1Name,
  session2Name,
}: CompareDetailBarChartSectionProps) {
  return (
    <section className="flex flex-col gap-10 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <h2 className="text-2xl font-medium">항목별 점수 비교</h2>
      <div className="flex flex-col gap-6">
        {rubricDetailScores.map((item) => (
          <DetailBarChart
            key={item.rubricId}
            rubricTitle={item.rubricTitle}
            session1Score={item.session1Score}
            session2Score={item.session2Score}
          />
        ))}
        <div className="h-px w-full bg-[rgba(0,0,0,0.08)]" />
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-row items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[rgba(104,104,255,0.40)]" />
            <span className="text-xl text-[#71718A]">{session1Name}</span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[rgba(0,212,146,0.60)]" />
            <span className="text-xl text-[#71718A]">{session2Name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
