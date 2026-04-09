export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="min-w-100 flex-col rounded-2xl border-2 border-[#6868FF] bg-[#FAFAFF] p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-[#6868FF]">404</h1>
        <p className="mt-4 mb-8 text-2xl font-semibold">Page Not Found :)</p>
        <a href="/" className="text-lg text-[#6868FF]">
          홈으로 이동
        </a>
      </div>
    </div>
  );
}
