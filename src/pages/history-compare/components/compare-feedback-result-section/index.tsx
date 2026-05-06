import { EVAL_CATEGORY } from "../../constants";
import type { CompareFeedbackResult } from "../../types";
import CompareCategoryChartSection from "../compare-category-chart-section";
import CompareDetailBarChartSection from "../compare-detail-bar-chart-section";
import CompareOverallComment from "../compare-overall-comment";
import CompareTotalScoreSection from "../compare-total-score-section";

interface CompareFeedbackResultSectionProps {
  result: CompareFeedbackResult;
}

const categoryScoreKeys = [
  "speechAvg",
  "nonVerbalAvg",
  "deliveryAvg",
] as const;

export default function CompareFeedbackResultSection({
  result,
}: CompareFeedbackResultSectionProps) {
  const comparedCategoryData = EVAL_CATEGORY.map((category, index) => {
    const scoreKey = categoryScoreKeys[index];

    return {
      category,
      [result.session1.videoTitle]: result.category.session1[scoreKey],
      [result.session2.videoTitle]: result.category.session2[scoreKey],
    };
  });

  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-3xl font-semibold">{result.label}</h2>
      <CompareTotalScoreSection
        session1={result.session1}
        session2={result.session2}
      />
      <CompareCategoryChartSection
        title={`${result.label} 카테고리 비교`}
        data={comparedCategoryData}
        session1Name={result.session1.videoTitle}
        session2Name={result.session2.videoTitle}
      />
      <CompareDetailBarChartSection
        title={`${result.label} 항목별 점수 비교`}
        rubricDetailScores={result.detail}
        session1Name={result.session1.videoTitle}
        session2Name={result.session2.videoTitle}
      />
      <CompareOverallComment
        title={`${result.label} 총평 비교`}
        session1Name={result.session1.videoTitle}
        session2Name={result.session2.videoTitle}
        session1Comment={result.overallComment.session1OverallComment}
        session2Comment={result.overallComment.session2OverallComment}
      />
    </section>
  );
}
