import {
  DUMMY_DETAIL_VIDEO_INFO,
  DUMMY_FEEDBACKS,
  DUMMY_HISTORY_TOTAL_SCORE,
  DUMMY_OVERALL_COMMENT,
  DUMMY_RUBRIC_CATEGORY,
  DUMMY_RUBRIC_SCORE,
} from "./constants";
import {
  FeedbackSection,
  HistoryDetailHeader,
  HistoryDetailVideo,
  OverallComment,
  RubricSection,
} from "./components";

export default function VideoHistoryDetail() {
  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10 pb-30">
      <HistoryDetailHeader
        title={DUMMY_DETAIL_VIDEO_INFO.title}
        createdAt={DUMMY_DETAIL_VIDEO_INFO.createdAt}
      />
      <HistoryDetailVideo videoUrl={DUMMY_DETAIL_VIDEO_INFO.videoUrl} />
      <OverallComment overallComment={DUMMY_OVERALL_COMMENT} />
      <FeedbackSection feedbacks={DUMMY_FEEDBACKS} />
      <RubricSection
        title={DUMMY_DETAIL_VIDEO_INFO.title}
        totalScore={DUMMY_HISTORY_TOTAL_SCORE}
        speechAvg={DUMMY_RUBRIC_CATEGORY.speechAvg}
        nonVerbalAvg={DUMMY_RUBRIC_CATEGORY.nonVerbalAvg}
        deliveryAvg={DUMMY_RUBRIC_CATEGORY.deliveryAvg}
        rubricDetailScores={DUMMY_RUBRIC_SCORE}
      />
    </div>
  );
}
