import IcOverviewTotal from "@assets/icon/ic_overview_total.svg";
import IcOverviewCompleted from "@assets/icon/ic_overview_completed.svg";
import IcOverviewAverage from "@assets/icon/ic_overview_average.svg";

interface OverviewProps {
  totalCount: number;
  completedCount: number;
  averageScore: number;
}

export default function Overview({
  totalCount,
  completedCount,
  averageScore,
}: OverviewProps) {
  return (
    <section className="flex flex-row items-center gap-7">
      <div className="flex h-40 flex-1 flex-row items-center gap-6 rounded-3xl p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
        <img src={IcOverviewTotal} alt="총 연습 영상" />
        <div className="flex flex-col gap-4">
          <span className="text-xl text-[#71718A]">총 연습 영상</span>
          <span className="text-4xl font-bold">{totalCount}</span>
        </div>
      </div>
      <div className="flex h-40 flex-1 flex-row items-center gap-6 rounded-3xl p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
        <img src={IcOverviewCompleted} alt="완료된 분석" />
        <div className="flex flex-col gap-4">
          <span className="text-xl text-[#71718A]">완료된 분석</span>
          <span className="text-4xl font-bold">{completedCount}</span>
        </div>
      </div>
      <div className="flex h-40 flex-1 flex-row items-center gap-6 rounded-3xl p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
        <img src={IcOverviewAverage} alt="평균 점수" />
        <div className="flex flex-col gap-4">
          <span className="text-xl text-[#71718A]">평균 점수</span>
          <span className="text-4xl font-bold">{averageScore}</span>
        </div>
      </div>
    </section>
  );
}
