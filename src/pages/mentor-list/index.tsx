import { useMemo, useState } from "react";

import useToast from "@hooks/use-toast";

import { DUMMY_MENTORS, MAX_MENTOR_CONNECTIONS } from "./constants";
import {
  MentorListHeader,
  MentorSearchSection,
  MyMentorSection,
} from "./components";

export default function MentorList() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [mentors, setMentors] = useState(DUMMY_MENTORS);

  const trimmedSearch = search.trim();
  const hasSearched = trimmedSearch.length > 0;

  const myMentors = mentors.filter(
    (mentor) => mentor.status === "CONNECTED" || mentor.status === "PENDING",
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
      <MyMentorSection
        connectedOrPendingCount={connectedOrPendingCount}
        myMentors={myMentors}
        handleRemoveMentor={handleRemoveMentor}
      />
    </div>
  );
}
