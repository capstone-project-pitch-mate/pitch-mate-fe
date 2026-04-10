import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, InputBar } from "@shared/ui";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 서버 회원가입 api 연동
    // 회원가입 성공 시 로그인 화면으로 이동
    navigate("/login");
  };

  const disabled =
    email.trim() === "" ||
    nickname.trim() === "" ||
    password.trim() === "" ||
    password !== checkPassword;

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2.5">
        <h4 className="text-2xl leading-6 font-medium text-[#1A1A2E]">
          회원가입
        </h4>
        <p className="text-2xl leading-9 text-[#71718A]">
          무료로 시작하고 실력을 키워보세요
        </p>
      </div>
      <form className="flex w-full flex-col gap-6" onSubmit={handleSignup}>
        <InputBar
          label="이메일"
          text={email}
          handleChangeText={setEmail}
          placeholder="email@example.com"
        />
        <InputBar
          label="닉네임"
          text={nickname}
          handleChangeText={setNickname}
          placeholder="닉네임 입력"
        />
        <InputBar
          label="비밀번호"
          type="password"
          text={password}
          handleChangeText={setPassword}
          placeholder="비밀번호 입력"
        />
        <InputBar
          label="비밀번호 확인"
          type="password"
          text={checkPassword}
          handleChangeText={setCheckPassword}
          placeholder="비밀번호 재입력"
          isError={password !== checkPassword && checkPassword.trim() !== ""}
          error="비밀번호와 일치하지 않습니다."
        />
        <Button size="full" color="primary" type="submit" disabled={disabled}>
          가입하기
        </Button>
      </form>
      <span className="text-xl leading-8 text-[#71718A]">
        이미 계정이 있으신가요?{" "}
        <Link className="font-medium text-[#6868FF]" to="/login">
          로그인
        </Link>
      </span>
    </div>
  );
}
