import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Camera, User, Save, Mail, Calendar } from "lucide-react";

import type { UserInfoResponse } from "@apis/types";
import { Button, InputBar } from "@shared/ui";
import {
  MAX_PROFILE_IMAGE_SIZE,
  PROFILE_BIO_MAX_LENGTH,
} from "@shared/constants";

interface EditProfileSectionProps {
  userInfoData: UserInfoResponse;
}

const formatJoinDate = (createdAt: string) => createdAt.split("T")[0];

export default function EditProfileSection({
  userInfoData,
}: EditProfileSectionProps) {
  const nickname = userInfoData.nickname;
  const email = userInfoData.email;
  const intro = userInfoData.intro ?? "";
  const joinDate = formatJoinDate(userInfoData.createdAt);

  const [newNickname, setNewNickname] = useState(nickname);
  const [bio, setBio] = useState(intro);
  const [savedBio, setSavedBio] = useState(intro);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null,
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const trimmedNickname = newNickname.trim();
  const isNicknameValid = trimmedNickname.length >= 2;
  const isNicknameChanged = trimmedNickname !== nickname;
  const isBioChanged = bio.trim() !== savedBio;
  const isProfileImageChanged = selectedProfileImage !== null;

  const disabled =
    !isNicknameValid ||
    (!isNicknameChanged && !isProfileImageChanged && !isBioChanged);

  const handleProfileImage = () => {
    fileInputRef.current?.click();
  };

  const handleChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택할 수 있습니다.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      alert("5MB 이하 이미지 파일만 선택할 수 있습니다.");
      e.target.value = "";
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    setSelectedProfileImage(file);
    setPreviewImageUrl(objectUrl);

    e.target.value = "";
  };

  const handleEditProfile = () => {
    setSavedBio(bio.trim());
    console.log("변경사항 수정");
  };

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const profileImageSrc = previewImageUrl ?? userInfoData.profileImage;

  const profileImage = profileImageSrc ? (
    <img
      className="h-30 w-30 rounded-full border border-[#6868FF] object-cover"
      src={profileImageSrc}
      alt="프로필 사진"
    />
  ) : (
    <div className="flex h-30 w-30 items-center justify-center rounded-full bg-[rgba(104,104,255,0.10)]">
      <User size={55} color="#6868FF" />
    </div>
  );

  return (
    <section className="flex flex-col gap-9 rounded-2xl p-9 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl leading-6 font-semibold">프로필 수정</h3>
        <p className="text-2xl leading-6 text-[#71718A]">
          닉네임과 프로필 이미지를 수정할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-row items-center gap-9">
        <button type="button" className="relative" onClick={handleProfileImage}>
          {profileImage}
          <div className="absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#6868FF] shadow-[0_16px_24px_-5px_rgba(0,0,0,0.10),0_6px_10px_-6px_rgba(0,0,0,0.10)]">
            <Camera color="#fff" />
          </div>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeProfileImage}
        />

        <div className="flex flex-col gap-2">
          <span className="text-3xl font-medium">
            {nickname}
          </span>
          <span className="text-xl text-[#71718A]">{email}</span>
        </div>
      </div>

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
          text={newNickname}
          placeholder="닉네임을 입력해주세요."
          handleChangeText={setNewNickname}
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
            handleChangeText={setBio}
            maxLength={PROFILE_BIO_MAX_LENGTH}
          />
          <span className="self-end text-lg text-[#71718A]">
            {bio.length} / {PROFILE_BIO_MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className="flex self-end">
        <Button
          type="button"
          disabled={disabled}
          handleClick={handleEditProfile}
        >
          <div className="flex flex-row items-center gap-3">
            <Save />
            <span className="text-xl font-medium">저장</span>
          </div>
        </Button>
      </div>
    </section>
  );
}
