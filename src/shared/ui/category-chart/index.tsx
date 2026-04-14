import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";

interface CategoryChartProps {
  data: ChartData;
  session1Name: string;
  session2Name?: string;
  width?: number;
}

export default function CategoryChart({
  data,
  session1Name,
  session2Name,
  width,
}: CategoryChartProps) {
  const radiusTicks = Array.from(
    { length: 10 },
    (_, index) => (index + 1) / 10,
  );

  return (
    <ResponsiveContainer width={width} height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e5f0" />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis
          domain={[0, 1]}
          ticks={radiusTicks}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey={session1Name}
          stroke="#6868FF"
          fill="#6868FF"
          fillOpacity={0.15}
          strokeWidth={2}
        />
        {session2Name && (
          <>
            <Radar
              dataKey={session2Name}
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Legend
              itemSorter={(item: { value?: string }) =>
                item.value === session1Name ? 0 : 1
              }
            />
          </>
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
}
