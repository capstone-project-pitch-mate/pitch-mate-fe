export default function PageError() {
  return (
    <div
      className="flex h-full flex-1 items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="페이지 에러"
    >
      <p className="text-3xl font-semibold text-[#6868FF]">
        페이지를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </p>
    </div>
  );
}
