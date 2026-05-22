import apiInstance from "@shared/apis";

import { USER_URL } from "./constants";
import type { EditUserInfoRequest, UserInfoResponse } from "./types";

export const getUserInfoApi = async () => {
  const response = await apiInstance.get<UserInfoResponse>(USER_URL.DEFAULT);

  return response.result;
};

export const editUserInfoApi = async ({
  nickname,
  profileImage,
  intro,
}: EditUserInfoRequest) => {
  const formData = new FormData();

  if (profileImage !== undefined) {
    formData.append("profileImage", profileImage);
  }

  const response = await apiInstance.put<UserInfoResponse, FormData>(
    USER_URL.EDIT,
    formData,
    {
      contentType: "form-data",
      params: {
        ...(nickname !== undefined && { nickname }),
        ...(intro !== undefined && { intro }),
      },
    },
  );

  return response.result;
};
