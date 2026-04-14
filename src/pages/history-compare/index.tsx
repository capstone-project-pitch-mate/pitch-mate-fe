import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { CompareTotalScoreSection } from "./components";
import { DUMMY_COMPARED_SESSION1, DUMMY_COMPARED_SESSION2 } from "./constants";

export default function HistoryCompare() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-10 p-10">
      <section className="flex flex-row items-center gap-8">
        <button type="button" className="p-5" onClick={handleBack}>
          <ArrowLeft />
        </button>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl leading-14 font-medium">회차 비교</h1>
          <p className="text-2xl leading-9 text-[#71718A]">
            두 영상의 평가 결과를 비교합니다.
          </p>
        </div>
      </section>
      <CompareTotalScoreSection
        session1={DUMMY_COMPARED_SESSION1}
        session2={DUMMY_COMPARED_SESSION2}
      />
    </div>
  );
}
