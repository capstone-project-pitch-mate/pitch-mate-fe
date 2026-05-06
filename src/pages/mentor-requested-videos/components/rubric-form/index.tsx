import type { MentorRubricScore } from "../../types";

interface RubricFormProps {
  rubricScores: MentorRubricScore[];
  overallComment: string;
  handleChangeScore: (rubricId: number, score: number) => void;
  handleChangeOverallComment: (value: string) => void;
  handleComplete: () => void;
}

const categoryLabel = {
  speech: "스피치",
  nonVerbal: "비언어",
  delivery: "전달 표현",
};

export default function RubricForm({
  rubricScores,
  overallComment,
  handleChangeScore,
  handleChangeOverallComment,
  handleComplete,
}: RubricFormProps) {
  // ADDED_MENTOR_FEEDBACK_FLOW: convert 20 rubric items scored 1-10 into a 100-point total.
  const totalScore = (
    (rubricScores.reduce((sum, item) => sum + item.score, 0) /
      (rubricScores.length * 10)) *
      100
  ).toFixed(1);

  return (
    <section className="flex flex-col gap-7 rounded-3xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-start justify-between gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">평가 루브릭</h2>
          <p className="text-lg leading-7 text-[#71718A]">
            각 항목을 1점부터 10점까지 평가하고 총평을 작성하세요.
          </p>
        </div>
        <div className="flex h-22 w-22 shrink-0 flex-col items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
          <span className="text-2xl leading-7 font-bold text-[#6868FF]">
            {totalScore}
          </span>
          <span className="text-sm font-semibold text-[#71718A]">/ 100점</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {rubricScores.map((item) => (
          <label key={item.id} className="flex flex-col gap-2">
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
            <input
              className="accent-[#6868FF]"
              min={1}
              max={10}
              type="range"
              value={item.score}
              onChange={(event) =>
                handleChangeScore(item.id, Number(event.target.value))
              }
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-3">
        <span className="text-xl font-semibold">멘토 피드백 총평</span>
        <textarea
          className="min-h-42 resize-none rounded-2xl border border-[rgba(0,0,0,0.08)] p-5 text-xl leading-8 outline-none focus:border-[#6868FF]"
          placeholder="영상 전반에서 잘한 점과 다음 발표에서 바로 개선할 점을 구체적으로 작성하세요."
          value={overallComment}
          onChange={(event) => handleChangeOverallComment(event.target.value)}
        />
      </label>

      <div className="flex justify-end">
        <button
          className="rounded-2xl bg-[#6868FF] px-8 py-4 text-xl font-bold text-white disabled:bg-[#ADADAD]"
          type="button"
          disabled={!overallComment.trim()}
          onClick={handleComplete}
        >
          평가 완료
        </button>
      </div>
    </section>
  );
}
