import type { MentorRubricScore } from "@pages/mentor-requested-videos/types";

interface RubricResultProps {
  totalScore: string;
  overallComment: string;
  rubricScores: MentorRubricScore[];
}

const categoryLabel = {
  speech: "스피치",
  nonVerbal: "비언어",
  delivery: "전달 표현",
};

export default function RubricResult({
  totalScore,
  overallComment,
  rubricScores,
}: RubricResultProps) {
  return (
    <section className="flex flex-col gap-7 rounded-3xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-start justify-between gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">평가 루브릭</h2>
          <p className="text-lg leading-7 text-[#71718A]">
            멘토가 완료한 평가 항목과 총평입니다.
          </p>
        </div>
        <div className="flex h-22 w-22 shrink-0 flex-col items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
          <span className="text-2xl leading-7 font-bold text-[#6868FF]">
            {totalScore}
          </span>
          <span className="text-sm font-semibold text-[#71718A]">/ 100점</span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#F7F7FC] p-5">
        <h3 className="text-xl font-semibold">멘토 피드백 총평</h3>
        <p className="mt-3 text-xl leading-8 text-[#1A1A2E]">
          {overallComment}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {rubricScores.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex min-w-0 flex-row items-center gap-2">
                <span className="shrink-0 rounded-lg bg-[#F5F5FA] px-2 py-1 text-base font-semibold text-[#71718A]">
                  {categoryLabel[item.category]}
                </span>
                <span className="truncate text-lg font-semibold">
                  {item.title}
                </span>
              </div>
              <strong className="text-lg text-[#6868FF]">{item.score}</strong>
            </div>
            <div className="h-3 rounded-full bg-[#ECECF4]">
              <div
                className="h-full rounded-full bg-[#6868FF]"
                style={{ width: `${item.score * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
