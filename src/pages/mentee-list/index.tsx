import { useMemo } from "react";

import { useConnectionsQuery } from "@apis/queries";
import type { ConnectionsResponse } from "@apis/types";
import useToast from "@hooks/use-toast";

import { MAX_CONNECTED_MENTEES } from "./constants";
import {
  ConnectedSection,
  MenteeListHeader,
  RequestSection,
} from "./components";
import type { Mentee, MenteeConnectionStatus } from "./types";

const toMenteeStatus = (
  status: ConnectionsResponse[number]["status"],
): MenteeConnectionStatus => {
  return status === "CONNECTED" || status === "ACCEPTED"
    ? "CONNECTED"
    : "REQUESTED";
};

const toMentee = (connection: ConnectionsResponse[number]): Mentee => {
  const status = toMenteeStatus(connection.status);

  return {
    id: connection.menteeId,
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

  const mentees = useMemo(
    () =>
      (connectionsData ?? [])
        .filter((connection) => connection.status !== "REJECTED")
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

  const handleRejectMentee = () => {
    toast.info("연결 거절 API가 준비되면 처리됩니다.");
  };

  const handleRemoveMentee = () => {
    toast.info("연결 해제 API가 준비되면 처리됩니다.");
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
            handleAccept={handleAcceptMentee}
            handleReject={handleRejectMentee}
          />
          <ConnectedSection
            connectedMentees={connectedMentees}
            handleRemove={handleRemoveMentee}
          />
        </>
      )}
    </div>
  );
}
