import { useMemo } from "react";

import {
  useConnectionsQuery,
  useDeleteConnectionMutation,
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
  status: ConnectionListResponse[number]["status"],
): MenteeConnectionStatus => {
  return status === "ACCEPTED" ? "CONNECTED" : "REQUESTED";
};

const toMentee = (connection: ConnectionListResponse[number]): Mentee => {
  const status = toMenteeStatus(connection.status);

  return {
    id: connection.menteeId,
    connectionId: connection.connectionId,
    nickname: connection.menteeNickname,
    bio: connection.menteeIntro ?? "",
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

  const mentees = useMemo(
    () =>
      (connectionsData ?? [])
        .filter(
          (connection) =>
            connection.status === "PENDING" || connection.status === "ACCEPTED",
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

  const handleAcceptMentee = () => {
    if (!canAcceptMentee) {
      toast.error(`최대 ${MAX_CONNECTED_MENTEES}명까지 연결할 수 있습니다.`);
      return;
    }
    toast.info("연결 수락 API가 준비되면 처리됩니다.");
  };

  const handleRejectMentee = (connectionId: number) => {
    deleteConnection(connectionId);
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
            isPendingDelete={isPendingDeleteConnection}
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
