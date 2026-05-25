import { useMemo } from "react";

import {
  useAcceptConnectionMutation,
  useConnectionsQuery,
  useDeleteConnectionMutation,
  useRejectConnectionMutation,
} from "@apis/queries";
import type { ConnectionListResponse } from "@apis/types";
import useToast from "@hooks/use-toast";

import { MAX_CONNECTED_MENTEES } from "./constants";
import {
  ConnectedSection,
  MenteeListHeader,
  RequestSection,
} from "./components";
import type { Mentee, MenteeConnectionStatus } from "./types";

const toMenteeStatus = (
  status: ConnectionListResponse[number]["connectionStatus"],
): MenteeConnectionStatus => {
  return status === "ACCEPTED" ? "CONNECTED" : "REQUESTED";
};

const toMentee = (connection: ConnectionListResponse[number]): Mentee => {
  const status = toMenteeStatus(connection.connectionStatus);

  return {
    id: connection.userId,
    connectionId: connection.connectionId,
    nickname: connection.nickname,
    bio: connection.intro ?? "",
    profileImage: connection.profileImage,
    requestedAt: connection.createdAt,
    connectedAt: status === "CONNECTED" ? connection.createdAt : undefined,
    status,
  };
};

export default function MenteeList() {
  const toast = useToast();
  const { connectionsData, isPendingConnections, isErrorConnections } =
    useConnectionsQuery();
  const { deleteConnection, isPendingDeleteConnection } =
    useDeleteConnectionMutation();
  const { acceptConnection, isPendingAcceptConnection } =
    useAcceptConnectionMutation();
  const { rejectConnection, isPendingRejectConnection } =
    useRejectConnectionMutation();

  const mentees = useMemo(
    () =>
      (connectionsData ?? [])
        .filter(
          (connection) =>
            connection.connectionStatus === "PENDING" ||
            connection.connectionStatus === "ACCEPTED",
        )
        .map(toMentee),
    [connectionsData],
  );
  const requestedMentees = mentees.filter(
    (mentee) => mentee.status === "REQUESTED",
  );
  const connectedMentees = mentees.filter(
    (mentee) => mentee.status === "CONNECTED",
  );
  const canAcceptMentee = connectedMentees.length < MAX_CONNECTED_MENTEES;

  const handleAcceptMentee = (connectionId: number) => {
    if (!canAcceptMentee) {
      toast.error(`최대 ${MAX_CONNECTED_MENTEES}명까지 연결할 수 있습니다.`);
      return;
    }
    acceptConnection(connectionId);
  };

  const handleRejectMentee = (connectionId: number) => {
    rejectConnection(connectionId);
  };

  const handleRemoveMentee = (connectionId: number) => {
    deleteConnection(connectionId);
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <MenteeListHeader />
      {isPendingConnections ? (
        <div className="flex min-h-36 items-center justify-center rounded-2xl bg-white text-xl text-[#71718A] shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          연결 목록을 불러오는 중입니다.
        </div>
      ) : isErrorConnections ? (
        <div className="flex min-h-36 items-center justify-center rounded-2xl bg-white text-xl text-[#71718A] shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          연결 목록을 불러오지 못했습니다.
        </div>
      ) : (
        <>
          <RequestSection
            requestedMentees={requestedMentees}
            isPendingRequestAction={
              isPendingAcceptConnection || isPendingRejectConnection
            }
            handleAccept={handleAcceptMentee}
            handleReject={handleRejectMentee}
          />
          <ConnectedSection
            connectedMentees={connectedMentees}
            isPendingDelete={isPendingDeleteConnection}
            handleRemove={handleRemoveMentee}
          />
        </>
      )}
    </div>
  );
}
