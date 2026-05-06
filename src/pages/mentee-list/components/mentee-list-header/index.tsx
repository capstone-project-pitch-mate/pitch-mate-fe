export default function MenteeListHeader() {
  return (
    <section className="flex flex-row items-start justify-between gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-4xl leading-14 font-medium">멘티 목록</h1>
        <p className="text-2xl leading-9 text-[#71718A]">
          연결 요청을 관리하고 현재 연결된 멘티를 확인하세요.
        </p>
      </div>
    </section>
  );
}
