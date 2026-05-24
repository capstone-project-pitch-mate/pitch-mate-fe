import { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";

import useToast from "@hooks/use-toast";
import { useDeleteUserMutation, useEditUserInfoMutation } from "@apis/queries";
import type { EditUserInfoRequest, UserInfoResponse } from "@apis/types";
import { Button } from "@shared/ui";
import {
  ALLOWED_PROFILE_IMAGE_TYPES,
  MAX_PROFILE_IMAGE_SIZE,
} from "@shared/constants";

import DeleteUserConfirmModal from "./delete-user-confirm-modal";
import ProfileFormFields from "./profile-form-fields";
import ProfileImagePicker from "./profile-image-picker";
import ProfileSectionHeader from "./profile-section-header";

interface EditProfileSectionProps {
  userInfoData: UserInfoResponse;
}

const formatJoinDate = (createdAt: string) => createdAt.split("T")[0];

export default function EditProfileSection({
  userInfoData,
}: EditProfileSectionProps) {
  const toast = useToast();
  const { editUserInfo, isPendingEditUserInfo } = useEditUserInfoMutation();
  const { deleteUser, isPendingDeleteUser } = useDeleteUserMutation();

  const nickname = userInfoData.nickname;
  const email = userInfoData.email;
  const intro = userInfoData.intro ?? "";
  const initialProfileImage = userInfoData.profileImage ?? "";
  const joinDate = formatJoinDate(userInfoData.createdAt);

  const [newNickname, setNewNickname] = useState(nickname);
  const [bio, setBio] = useState(intro);
  const [savedBio, setSavedBio] = useState(intro);
  const [profileImageUrl, setProfileImageUrl] = useState(initialProfileImage);
  const [selectedProfileImageFile, setSelectedProfileImageFile] =
    useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const profileImageObjectUrlRef = useRef<string | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const trimmedNickname = newNickname.trim();
  const trimmedBio = bio.trim();

  const isNicknameValid = trimmedNickname.length >= 2;
  const isNicknameChanged = trimmedNickname !== nickname;
  const isBioChanged = trimmedBio !== savedBio;
  const isProfileImageChanged = selectedProfileImageFile !== null;

  const disabled =
    isPendingEditUserInfo ||
    isPendingDeleteUser ||
    !isNicknameValid ||
    (!isNicknameChanged && !isProfileImageChanged && !isBioChanged);

  const handleEditProfile = () => {
    const payload: EditUserInfoRequest = {};

    if (isNicknameChanged) {
      payload.nickname = trimmedNickname;
    }

    if (isProfileImageChanged) {
      payload.profileImage = selectedProfileImageFile;
    }

    if (isBioChanged) {
      payload.intro = trimmedBio;
    }

    editUserInfo(payload, {
      onSuccess: () => {
        setSavedBio(trimmedBio);
        setSelectedProfileImageFile(null);
      },
    });
  };

  const handleChangeProfileImage = (file: File | undefined) => {
    if (!file) {
      return;
    }

    if (
      !ALLOWED_PROFILE_IMAGE_TYPES.includes(file.type) ||
      file.size > MAX_PROFILE_IMAGE_SIZE
    ) {
      toast.error("이미지 파일의 용량이 너무 크거나 형식에 맞지 않습니다.");
      return;
    }

    if (profileImageObjectUrlRef.current) {
      URL.revokeObjectURL(profileImageObjectUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    profileImageObjectUrlRef.current = previewUrl;
    setSelectedProfileImageFile(file);
    setProfileImageUrl(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (profileImageObjectUrlRef.current) {
        URL.revokeObjectURL(profileImageObjectUrlRef.current);
      }
    };
  }, []);

  return (
    <section className="flex flex-col gap-9 rounded-2xl p-9 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <ProfileSectionHeader
        isDeleting={isPendingDeleteUser}
        onClickDelete={() => setIsDeleteModalOpen(true)}
      />

      <ProfileImagePicker
        disabled={isPendingEditUserInfo || isPendingDeleteUser}
        email={email}
        imageUrl={profileImageUrl}
        inputRef={profileImageInputRef}
        nickname={nickname}
        onChangeFile={handleChangeProfileImage}
      />

      <ProfileFormFields
        bio={bio}
        email={email}
        joinDate={joinDate}
        nickname={newNickname}
        onChangeBio={setBio}
        onChangeNickname={setNewNickname}
      />

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

      {isDeleteModalOpen && (
        <DeleteUserConfirmModal
          isPending={isPendingDeleteUser}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => deleteUser()}
        />
      )}
    </section>
  );
}
