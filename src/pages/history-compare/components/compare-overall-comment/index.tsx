interface CompareOverallReviewProps {
  session1Name: string;
  session2Name: string;
  session1Comment: string;
  session2Comment: string;
}

export default function CompareOverallComment({
  session1Name,
  session2Name,
  session1Comment,
  session2Comment,
}: CompareOverallReviewProps) {
  return (
    <section className="flex w-full flex-row justify-between gap-9">
      <div className="flex flex-1 flex-col gap-8 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
        <h2 className="text-2xl font-medium"># {session1Name} 총평</h2>
        <span className="text-xl leading-8">{session1Comment}</span>
      </div>
      <div className="flex flex-1 flex-col gap-8 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
        <h2 className="text-2xl font-medium"># {session2Name} 총평</h2>
        <span className="text-xl leading-8">{session2Comment}</span>
      </div>
    </section>
  );
}
