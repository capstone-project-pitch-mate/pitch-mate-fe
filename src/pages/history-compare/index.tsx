import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  CompareCategoryChartSection,
  CompareDetailBarChartSection,
  CompareOverallComment,
  CompareTotalScoreSection,
} from "./components";
import {
  DUMMY_COMPARE_OVERALL_COMMENT,
  DUMMY_COMPARED_CATEGORY,
  DUMMY_COMPARED_DETAIL,
  DUMMY_COMPARED_SESSION1,
  DUMMY_COMPARED_SESSION2,
  EVAL_CATEGORY,
} from "./constants";

export default function HistoryCompare() {
  const navigate = useNavigate();

  const categoryScoreKeys = [
    "speechAvg",
    "nonVerbalAvg",
    "deliveryAvg",
  ] as const;

  const comparedCategoryData = EVAL_CATEGORY.map((category, index) => {
    const scoreKey = categoryScoreKeys[index];

    return {
      category,
      [DUMMY_COMPARED_SESSION1.videoTitle]:
        DUMMY_COMPARED_CATEGORY.session1[scoreKey],
      [DUMMY_COMPARED_SESSION2.videoTitle]:
        DUMMY_COMPARED_CATEGORY.session2[scoreKey],
    };
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10 pb-30">
      <section className="flex flex-row items-center gap-8">
        <button type="button" className="p-5" onClick={handleBack}>
          <ArrowLeft />
        </button>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl leading-14 font-medium">히스토리 비교</h1>
          <p className="text-2xl leading-9 text-[#71718A]">
            두 영상의 평가 결과를 비교합니다.
          </p>
        </div>
      </section>
      <CompareTotalScoreSection
        session1={DUMMY_COMPARED_SESSION1}
        session2={DUMMY_COMPARED_SESSION2}
      />
      <CompareCategoryChartSection
        data={comparedCategoryData}
        session1Name={DUMMY_COMPARED_SESSION1.videoTitle}
        session2Name={DUMMY_COMPARED_SESSION2.videoTitle}
      />
      <CompareDetailBarChartSection
        rubricDetailScores={DUMMY_COMPARED_DETAIL}
        session1Name={DUMMY_COMPARED_SESSION1.videoTitle}
        session2Name={DUMMY_COMPARED_SESSION2.videoTitle}
      />
      <CompareOverallComment
        session1Name={DUMMY_COMPARED_SESSION1.videoTitle}
        session2Name={DUMMY_COMPARED_SESSION2.videoTitle}
        session1Comment={DUMMY_COMPARE_OVERALL_COMMENT.session1OverallComment}
        session2Comment={DUMMY_COMPARE_OVERALL_COMMENT.session2OverallComment}
      />
    </div>
  );
}
