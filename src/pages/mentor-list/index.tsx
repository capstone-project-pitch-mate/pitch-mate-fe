import { useMemo, useState } from "react";

import { useConnectionsQuery } from "@apis/queries";
import useToast from "@hooks/use-toast";
import type { ConnectionsResponse } from "@apis/types";

import { DUMMY_MENTORS, MAX_MENTOR_CONNECTIONS } from "./constants";
import {
  MentorListHeader,
  MentorSearchSection,
  MyMentorSection,
} from "./components";
import type { Mentor, MentorStatus } from "./types";

const toMentorStatus = (
  status: ConnectionsResponse[number]["status"],
): MentorStatus => {
  if (status === "ACCEPTED") {
    return "CONNECTED";
  }

  if (status === "PENDING") {
    return "PENDING";
  }

  return "AVAILABLE";
};

const toMentor = (connection: ConnectionsResponse[number]): Mentor => ({
  id: connection.mentorId,
  nickname: connection.mentorNickname,
  bio: connection.mentorIntro ?? "",
  status: toMentorStatus(connection.status),
});

export default function MentorList() {
  const toast = useToast();
  const { connectionsData, isPendingConnections, isErrorConnections } =
    useConnectionsQuery();
  const [search, setSearch] = useState("");
  const [mentors, setMentors] = useState(DUMMY_MENTORS);

  const trimmedSearch = search.trim();
  const hasSearched = trimmedSearch.length > 0;

  const myMentors = useMemo(
    () =>
      (connectionsData ?? [])
        .filter(
          (connection) =>
            connection.status === "PENDING" || connection.status === "ACCEPTED",
        )
        .map(toMentor),
    [connectionsData],
  );
  const connectedOrPendingCount = myMentors.length;
  const canRequestMentor = connectedOrPendingCount < MAX_MENTOR_CONNECTIONS;

  const filteredMentors = useMemo(() => {
    if (!hasSearched) {
      return [];
    }

    const lowerCaseSearch = trimmedSearch.toLowerCase();

    return mentors.filter((mentor) =>
      mentor.nickname.toLowerCase().includes(lowerCaseSearch),
    );
  }, [hasSearched, mentors, trimmedSearch]);

  const handleRequestMentor = (mentorId: number) => {
    if (!canRequestMentor) {
      toast.error(
        `최대 ${MAX_MENTOR_CONNECTIONS}명까지 신청/연결할 수 있습니다.`,
      );
      return;
    }

    // ADDED_MENTOR_LIST: request is stored locally until mentor request APIs exist.
    setMentors((prev) =>
      prev.map((mentor) =>
        mentor.id === mentorId ? { ...mentor, status: "PENDING" } : mentor,
      ),
    );
  };

  const handleRemoveMentor = (mentorId: number) => {
    // ADDED_MENTOR_LIST: removing locally represents deleting both sides after API integration.
    setMentors((prev) =>
      prev.map((mentor) =>
        mentor.id === mentorId ? { ...mentor, status: "AVAILABLE" } : mentor,
      ),
    );
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <MentorListHeader />
      <MentorSearchSection
        search={search}
        hasSearched={hasSearched}
        filteredMentors={filteredMentors}
        handleChangeSearch={setSearch}
        handleRequestMentor={handleRequestMentor}
      />
      {isPendingConnections ? (
        <div className="flex min-h-36 items-center justify-center rounded-2xl bg-white text-xl text-[#71718A] shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          연결 목록을 불러오는 중입니다.
        </div>
      ) : isErrorConnections ? (
        <div className="flex min-h-36 items-center justify-center rounded-2xl bg-white text-xl text-[#71718A] shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
          연결 목록을 불러오지 못했습니다.
        </div>
      ) : (
        <MyMentorSection
          connectedOrPendingCount={connectedOrPendingCount}
          myMentors={myMentors}
          handleRemoveMentor={handleRemoveMentor}
        />
      )}
    </div>
  );
}
