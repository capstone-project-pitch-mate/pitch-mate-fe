interface HistoryDetailVideoProps {
  videoUrl: string;
}

export default function HistoryDetailVideo({
  videoUrl,
}: HistoryDetailVideoProps) {
  return (
    <div className="rounded-3xl border-3 border-[rgba(0,0,0,0.08)] bg-[rgba(104,104,255,0.05)] p-9">
      <video className="w-full rounded-3xl" src={videoUrl} controls />
    </div>
  );
}
