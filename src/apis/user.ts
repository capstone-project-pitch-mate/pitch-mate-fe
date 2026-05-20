import apiInstance from "@shared/apis";

import { USER_URL } from "./constants";
import type { EditUserInfoRequest, UserInfoResponse } from "./types";

export const getUserInfoApi = async () => {
  const response = await apiInstance.get<UserInfoResponse>(USER_URL.DEFAULT);

  return response.result;
};

// TODO: 추후 form data 타입으로 수정 예정
export const editUserInfoApi = async ({
  nickname,
  profileImage,
  intro,
}: EditUserInfoRequest) => {
  const response = await apiInstance.put<UserInfoResponse, EditUserInfoRequest>(
    USER_URL.EDIT,
    {
      ...(nickname !== undefined && { nickname }),
      ...(profileImage !== undefined && { profileImage }),
      ...(intro !== undefined && { intro }),
    },
  );

  return response.result;
};
