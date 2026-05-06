import { DUMMY_MENTORS } from "@pages/mentor-list/constants";

// ADDED_UPLOAD_MENTOR_REQUEST: only connected mentors can receive feedback requests on upload.
export const DUMMY_CONNECTED_MENTORS = DUMMY_MENTORS.filter(
  (mentor) => mentor.status === "CONNECTED",
);
