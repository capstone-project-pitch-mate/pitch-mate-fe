import { useQuery } from "@tanstack/react-query";

import { getUserInfoApi } from "@apis/user";
import { USER_INFO_QUERY_KEY } from "@apis/query-key";
import type { UserInfoResponse } from "@apis/types";

export const useUserInfoQuery = () => {
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

  return {
    userInfoData,
    isPendingUserInfo,
    isErrorUserInfo,
    userInfoError,
  };
};
