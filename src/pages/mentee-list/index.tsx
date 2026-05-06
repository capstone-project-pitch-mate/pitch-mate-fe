import { useState } from "react";

import useToast from "@hooks/use-toast";

import { DUMMY_MENTEES, MAX_CONNECTED_MENTEES } from "./constants";
import {
  ConnectedSection,
  MenteeListHeader,
  RequestSection,
} from "./components";

export default function MenteeList() {
  const toast = useToast();
  const [mentees, setMentees] = useState(DUMMY_MENTEES);

  const requestedMentees = mentees.filter(
    (mentee) => mentee.status === "REQUESTED",
  );
  const connectedMentees = mentees.filter(
    (mentee) => mentee.status === "CONNECTED",
  );
  const canAcceptMentee = connectedMentees.length < MAX_CONNECTED_MENTEES;

  const handleAcceptMentee = (menteeId: number) => {
    if (!canAcceptMentee) {
      toast.error(`최대 ${MAX_CONNECTED_MENTEES}명까지 연결할 수 있습니다.`);
      return;
    }

    // ADDED_MENTEE_LIST: accepting locally represents mentor approval until APIs exist.
    setMentees((prev) =>
      prev.map((mentee) =>
        mentee.id === menteeId
          ? {
              ...mentee,
              status: "CONNECTED",
              connectedAt: new Date().toISOString(),
            }
          : mentee,
      ),
    );
  };

  const handleRejectMentee = (menteeId: number) => {
    // ADDED_MENTEE_LIST: rejected requests are removed locally until APIs exist.
    setMentees((prev) => prev.filter((mentee) => mentee.id !== menteeId));
  };

  const handleRemoveMentee = (menteeId: number) => {
    // ADDED_MENTEE_LIST: removing locally represents deleting both mentor/mentee connection after API integration.
    setMentees((prev) => prev.filter((mentee) => mentee.id !== menteeId));
  };

  return (
    <div className="flex min-h-screen min-w-300 flex-col gap-9 p-10 pb-30">
      <MenteeListHeader />
      <RequestSection
        requestedMentees={requestedMentees}
        handleAccept={handleAcceptMentee}
        handleReject={handleRejectMentee}
      />
      <ConnectedSection
        connectedMentees={connectedMentees}
        handleRemove={handleRemoveMentee}
      />
    </div>
  );
}
