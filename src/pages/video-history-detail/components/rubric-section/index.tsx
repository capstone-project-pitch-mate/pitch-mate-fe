import type { RubricDetailType } from "@pages/video-history-detail/types";
import { CategoryChart, DetailBarChart } from "@shared/ui";

interface RubricSectionProps {
  title: string;
  totalScore: number;
  speechAvg: number;
  nonVerbalAvg: number;
  deliveryAvg: number;
  rubricDetailScores: RubricDetailType[];
}

export default function RubricSection({
  title,
  totalScore,
  speechAvg,
  nonVerbalAvg,
  deliveryAvg,
  rubricDetailScores,
}: RubricSectionProps) {
  const data = [
    {
      category: "스피치",
      [title]: speechAvg,
    },
    {
      category: "비언어",
      [title]: nonVerbalAvg,
    },
    {
      category: "전달력/표현력",
      [title]: deliveryAvg,
    },
  ];

  return (
    <section className="flex flex-col gap-9 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <h3 className="text-2xl font-medium">AI 평가 루브릭</h3>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <span className="text-xl">카테고리별 평가</span>
            <CategoryChart data={data} session1Name={title} width={350} />
          </div>

          <div className="flex flex-col items-center gap-6">
            <span className="text-xl">종합 점수</span>
            <div className="flex h-30 w-30 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
              <span className="text-3xl font-bold text-[#6868FF]">
                {totalScore}
              </span>
            </div>
            <span className="text-2xl font-semibold">
              {totalScore}점 / 100점
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rubricDetailScores.map((item) => (
            <DetailBarChart
              key={item.rubricId}
              rubricTitle={item.rubricTitle}
              session1Score={item.score}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
