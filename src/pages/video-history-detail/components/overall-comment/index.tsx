interface OverallCommentProps {
  overallComment: string;
}

export default function OverallComment({
  overallComment,
}: OverallCommentProps) {
  return (
    <section className="flex flex-col gap-9 rounded-3xl p-9 shadow-[0_1.6px_4.8px_0_rgba(0,0,0,0.10),0_1.6px_3.2px_-1.6px_rgba(0,0,0,0.10)]">
      <h3 className="text-2xl font-medium">AI 총평</h3>
      <p className="text-2xl leading-10">{overallComment}</p>
    </section>
  );
}
