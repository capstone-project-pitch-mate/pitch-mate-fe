import { useMemo, useState } from "react";

import { useConnectionsQuery, useSearchMentorsQuery } from "@apis/queries";
import useDebounce from "@hooks/use-debounce";
import useToast from "@hooks/use-toast";
import type {
  ConnectionStatus,
  ConnectionsResponse,
  SearchMentorResponse,
} from "@apis/types";

import { MAX_MENTOR_CONNECTIONS } from "./constants";
import {
  MentorListHeader,
  MentorSearchSection,
  MyMentorSection,
} from "./components";
import type { Mentor, MentorStatus } from "./types";

const toMentorStatus = (status: ConnectionStatus): MentorStatus => {
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

const toSearchedMentor = (mentor: SearchMentorResponse[number]): Mentor => ({
  id: mentor.mentorId,
  nickname: mentor.nickname,
  bio: mentor.intro ?? "",
  status: toMentorStatus(mentor.connectionStatus),
});

export default function MentorList() {
  const toast = useToast();
  const { connectionsData, isPendingConnections, isErrorConnections } =
    useConnectionsQuery();
  const [search, setSearch] = useState("");

  const trimmedSearch = search.trim();
  const debouncedSearch = useDebounce(trimmedSearch, 300);
  const hasSearched = trimmedSearch.length > 0;
  const { searchMentorsData, isPendingSearchMentors, isErrorSearchMentors } =
    useSearchMentorsQuery(debouncedSearch);

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
    return (searchMentorsData ?? []).map(toSearchedMentor);
  }, [searchMentorsData]);

  const handleRequestMentor = (mentorId: number) => {
    if (!canRequestMentor) {
      toast.error(
        `최대 ${MAX_MENTOR_CONNECTIONS}명까지 신청/연결할 수 있습니다.`,
      );
      return;
    }

    void mentorId;
    toast.info("멘토 신청 API가 준비되면 처리됩니다.");
  };

  const handleRemoveMentor = (mentorId: number) => {
    void mentorId;
    toast.info("연결 해제 API가 준비되면 처리됩니다.");
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <MentorListHeader />
      <MentorSearchSection
        search={search}
        hasSearched={hasSearched}
        filteredMentors={filteredMentors}
        isPending={isPendingSearchMentors}
        isError={isErrorSearchMentors}
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
