import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUserInfoApi } from "@apis/user";
import { USER_INFO_QUERY_KEY } from "@apis/query-key";
import type { UserInfoResponse } from "@apis/types";
import { ROUTES } from "@router/constants";

export const useUserInfoQuery = () => {
  const navigate = useNavigate();

  const {
    data: userInfoData,
    isPending: isPendingUserInfo,
    isError: isErrorUserInfo,
    error: userInfoError,
  } = useQuery<UserInfoResponse>({
    queryKey: USER_INFO_QUERY_KEY.DEFAULT,
    queryFn: () => getUserInfoApi(),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (
      isErrorUserInfo &&
      (userInfoError.status === 403 || userInfoError.status === 401)
    ) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isErrorUserInfo, userInfoError, navigate]);

  return {
    userInfoData,
    isPendingUserInfo,
    isErrorUserInfo,
    userInfoError,
  };
};
