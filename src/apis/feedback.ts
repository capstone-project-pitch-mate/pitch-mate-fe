import apiInstance from "@shared/apis";

import { FEEDBACK_URL, RUBRICS_URL } from "./constants";
import type {
  CreateMentorEvaluationRequest,
  CreateMentorFeedbackRequest,
  MentorEvaluationResponse,
  MentorFeedbackResponse,
  RubricsResponse,
  SubmitMentorFeedbackRequest,
  SubmitMentorFeedbackResponse,
} from "./types";

export const getRubricsApi = async () => {
  const response = await apiInstance.get<RubricsResponse>(RUBRICS_URL.DEFAULT);

  return response.result;
};

export const createMentorFeedbackApi = async ({
  videoId,
  data,
}: {
  videoId: number;
  data: CreateMentorFeedbackRequest;
}) => {
  const response = await apiInstance.post<
    MentorFeedbackResponse,
    CreateMentorFeedbackRequest
  >(FEEDBACK_URL.FEEDBACKS(videoId), data);

  return response.result;
};

export const createMentorEvaluationApi = async ({
  videoId,
  data,
}: {
  videoId: number;
  data: CreateMentorEvaluationRequest;
}) => {
  const response = await apiInstance.post<
    MentorEvaluationResponse,
    CreateMentorEvaluationRequest
  >(FEEDBACK_URL.EVALUATIONS(videoId), data);

  return response.result;
};

export const submitMentorFeedbackApi = async ({
  videoId,
  feedbacks,
  evaluation,
}: SubmitMentorFeedbackRequest): Promise<SubmitMentorFeedbackResponse> => {
  const createdFeedbacks = await Promise.all(
    feedbacks.map((data) => createMentorFeedbackApi({ videoId, data })),
  );
  const createdEvaluation = await createMentorEvaluationApi({
    videoId,
    data: evaluation,
  });

  return {
    feedbacks: createdFeedbacks,
    evaluation: createdEvaluation,
  };
};
