import { useNavigate } from "react-router-dom";

import { ROUTES } from "@router/constants";

import { HistoryCard, PageHeader } from "./components";
import { DUMMY_MENTOR_FEEDBACK_HISTORY } from "./constants";

export default function MentorFeedbackHistory() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <PageHeader
        title="피드백 히스토리"
        description="멘토가 완료한 피드백 기록을 확인하세요."
      />

      <section className="grid grid-cols-2 gap-6">
        {DUMMY_MENTOR_FEEDBACK_HISTORY.map((item) => (
          <HistoryCard
            key={item.id}
            item={item}
            handleClick={(feedbackId) =>
              navigate(ROUTES.MENTOR_FEEDBACK_HISTORY_DETAIL(String(feedbackId)))
            }
          />
        ))}
      </section>
    </div>
  );
}
