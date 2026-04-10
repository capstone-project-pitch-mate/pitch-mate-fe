import { useState } from "react";

import { Button, InputBar } from "@shared/ui";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 서버 로그인 api 연동
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2.5">
        <h4 className="text-2xl leading-6 font-medium text-[#1A1A2E]">
          로그인
        </h4>
        <p className="text-2xl leading-9 text-[#71718A]">
          계정에 로그인하여 개선해보세요
        </p>
      </div>
      <form className="flex w-full flex-col gap-6" onSubmit={handleLogin}>
        <InputBar
          label="이메일"
          text={email}
          handleChangeText={setEmail}
          placeholder="email@example.com"
        />
        <InputBar
          label="비밀번호"
          type="password"
          text={password}
          handleChangeText={setPassword}
          placeholder="비밀번호 입력"
        />
        <Button size="full" color="primary" type="submit">
          로그인
        </Button>
      </form>
      <span className="text-xl leading-8 text-[#71718A]">
        계정이 없으신가요?{" "}
        <Link className="font-medium text-[#6868FF]" to="/signup">
          회원가입
        </Link>
      </span>
    </div>
  );
}
