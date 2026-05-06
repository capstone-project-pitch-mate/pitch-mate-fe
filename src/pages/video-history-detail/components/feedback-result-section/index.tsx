import type { FeedbackResult } from "../../types";
import FeedbackSection from "../feedback-section";
import OverallComment from "../overall-comment";
import RubricSection from "../rubric-section";

interface FeedbackResultSectionProps {
  result: FeedbackResult;
}

export default function FeedbackResultSection({
  result,
}: FeedbackResultSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center gap-3">
        <h2 className="text-3xl font-semibold">{result.label}</h2>
        <span className="rounded-full bg-[rgba(104,104,255,0.10)] px-3 py-1 text-lg font-semibold text-[#6868FF]">
          {result.totalScore}점
        </span>
      </div>
      <OverallComment
        title={`${result.label} 총평`}
        overallComment={result.overallComment}
      />
      <FeedbackSection
        title={`구간별 ${result.label}`}
        feedbacks={result.feedbacks}
      />
      <RubricSection
        sectionTitle={`${result.label} 평가 루브릭`}
        title={result.label}
        totalScore={result.totalScore}
        speechAvg={result.categoryScore.speechAvg}
        nonVerbalAvg={result.categoryScore.nonVerbalAvg}
        deliveryAvg={result.categoryScore.deliveryAvg}
        rubricDetailScores={result.rubricScores}
      />
    </div>
  );
}
