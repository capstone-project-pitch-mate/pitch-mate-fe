import type { ChartData } from "recharts/types/state/chartDataSlice";

import { CategoryChart } from "@shared/ui";

interface CompareCategoryChartSectionProps {
  data: ChartData;
  session1Name: string;
  sesssion2Name: string;
}

export default function CompareCategoryChartSection({
  data,
  session1Name,
  sesssion2Name,
}: CompareCategoryChartSectionProps) {
  return (
    <section className="flex flex-col gap-12 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <h2 className="text-2xl font-medium">카테고리별 비교</h2>
      <div className="flex flex-1 flex-col items-center gap-8">
        <CategoryChart
          data={data}
          session1Name={session1Name}
          sesssion2Name={sesssion2Name}
        />
      </div>
    </section>
  );
}
