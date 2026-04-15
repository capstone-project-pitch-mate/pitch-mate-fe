import { useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button, InputBar } from "@shared/ui";
import { ROUTES } from "@router/constants";
import { useLoginMutation } from "@apis/queries";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login, isPendingLogin } = useLoginMutation();

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    login(
      {
        email: email.trim(),
        password: password.trim(),
      },
      {
        onError: (error) => {
          setErrorMessage(error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2.5">
        <h4 className="text-2xl leading-6 font-medium">로그인</h4>
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
        <div className="relative">
          <Button
            size="full"
            color="primary"
            type="submit"
            disabled={isPendingLogin}
          >
            {isPendingLogin ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" size={24} />
              </div>
            ) : (
              "로그인"
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
        계정이 없으신가요?{" "}
        <Link className="font-medium text-[#6868FF]" to={ROUTES.SIGNUP}>
          회원가입
        </Link>
      </span>
    </div>
  );
}
