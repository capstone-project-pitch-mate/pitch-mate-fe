import { MAX_CONNECTED_MENTEES } from "../../constants";
import type { Mentee } from "../../types";
import ConnectedMenteeCard from "../connected-mentee-card";

interface ConnectedSectionProps {
  connectedMentees: Mentee[];
  isPendingDelete: boolean;
  handleRemove: (connectionId: number) => void;
}

export default function ConnectedSection({
  connectedMentees,
  isPendingDelete,
  handleRemove,
}: ConnectedSectionProps) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">연결된 멘티</h2>
          <p className="mt-1 text-lg text-[#71718A]">
            최대 {MAX_CONNECTED_MENTEES}명까지 연결할 수 있습니다.
          </p>
        </div>
        <span className="rounded-2xl bg-[rgba(104,104,255,0.10)] px-4 py-2 text-lg font-bold text-[#6868FF]">
          {connectedMentees.length} / {MAX_CONNECTED_MENTEES}
        </span>
      </div>

      {connectedMentees.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-2xl bg-[#F7F7FC] text-xl text-[#71718A]">
          아직 연결된 멘티가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {connectedMentees.map((mentee) => (
            <ConnectedMenteeCard
              key={mentee.id}
              mentee={mentee}
              isPendingDelete={isPendingDelete}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
