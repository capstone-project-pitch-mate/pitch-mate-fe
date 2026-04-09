import Logo from "@components/logo";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-13">
      <div className="flex flex-col items-center">
        <Logo size="lg" hasShadow />
        <h1 className="mt-6 text-5xl leading-16 font-bold text-[#6868FF]">
          PitchMate
        </h1>
        <h3 className="mt-1 text-2xl leading-9 text-[#71718A]">
          AI 발표•면접 피드백 서비스
        </h3>
      </div>
      <section className="max-w-2xl min-w-xs rounded-3xl p-10 shadow-[0_-8px_16px_-12px_rgba(0,0,0,0.035),0_32px_40px_-8px_rgba(0,0,0,0.05),0_13px_16px_-10px_rgba(0,0,0,0.05)]">
        <Outlet />
      </section>
    </main>
  );
}
