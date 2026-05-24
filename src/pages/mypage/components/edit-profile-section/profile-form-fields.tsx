import { Calendar, Mail, User } from "lucide-react";

import { PROFILE_BIO_MAX_LENGTH } from "@shared/constants";
import { InputBar } from "@shared/ui";

interface ProfileFormFieldsProps {
  bio: string;
  email: string;
  joinDate: string;
  nickname: string;
  onChangeBio: (value: string) => void;
  onChangeNickname: (value: string) => void;
}

export default function ProfileFormFields({
  bio,
  email,
  joinDate,
  nickname,
  onChangeBio,
  onChangeNickname,
}: ProfileFormFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      <InputBar
        label={
          <div className="flex flex-row items-center gap-3">
            <Mail />
            <span className="text-2xl font-medium">이메일</span>
          </div>
        }
        text={email}
        placeholder={email}
        handleChangeText={() => {}}
        disabled
      />
      <InputBar
        label={
          <div className="flex flex-row items-center gap-3">
            <User />
            <span className="text-2xl font-medium">닉네임</span>
          </div>
        }
        text={nickname}
        placeholder="닉네임을 입력해주세요."
        handleChangeText={onChangeNickname}
        maxLength={10}
      />
      <InputBar
        label={
          <div className="flex flex-row items-center gap-3">
            <Calendar />
            <span className="text-2xl font-medium">가입일</span>
          </div>
        }
        text={joinDate}
        placeholder={joinDate}
        handleChangeText={() => {}}
        disabled
      />
      <div className="flex w-full flex-col gap-3">
        <InputBar
          label={
            <label className="text-xl leading-6 font-medium" htmlFor="bio">
              자기소개
            </label>
          }
          text={bio}
          placeholder="자기소개를 입력해주세요."
          handleChangeText={onChangeBio}
          maxLength={PROFILE_BIO_MAX_LENGTH}
        />
        <span className="self-end text-lg text-[#71718A]">
          {bio.length} / {PROFILE_BIO_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
