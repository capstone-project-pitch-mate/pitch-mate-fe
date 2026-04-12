import { useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button, InputBar } from "@shared/ui";
import { ROUTES } from "@router/constants";
import { EMAIL_REGEX } from "@shared/constants";

import { useSignupMutation } from "./hooks";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { signup, isPendingSignup } = useSignupMutation();

  const handleSignup = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    signup(
      {
        email: email.trim(),
        nickname: nickname.trim(),
        password: password.trim(),
      },
      {
        onError: (error) => {
          setErrorMessage(error.message);
        },
      },
    );
  };

  const trimmedEmail = email.trim();
  const isEmailInvalid = trimmedEmail !== "" && !EMAIL_REGEX.test(trimmedEmail);

  const disabled =
    trimmedEmail === "" ||
    isEmailInvalid ||
    nickname.trim() === "" ||
    password.trim() === "" ||
    password !== checkPassword ||
    isPendingSignup;

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
          isError={isEmailInvalid}
          error="이메일 형식이 올바르지 않습니다."
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
        <div className="relative">
          <Button size="full" color="primary" type="submit" disabled={disabled}>
            {isPendingSignup ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" size={24} />
              </div>
            ) : (
              "가입하기"
            )}
          </Button>
          {errorMessage && (
            <span className="text-md absolute right-0 -bottom-7.5 font-medium text-[#FF9496]">
              {errorMessage}
            </span>
          )}
        </div>
      </form>
      <span className="text-xl leading-8 text-[#71718A]">
        이미 계정이 있으신가요?{" "}
        <Link className="font-medium text-[#6868FF]" to={ROUTES.LOGIN}>
          로그인
        </Link>
      </span>
    </div>
  );
}
