import type { Rubric, VideoMetadata } from "@apis/types";

import type { MentorRequestedVideo, MentorRubricScore } from "../types";

export const toRequestedVideo = (
  video: VideoMetadata,
): MentorRequestedVideo => ({
  id: video.videoId,
  title: video.title,
  menteeNickname: video.ownerNickname,
  thumbnailUrl: video.thumbnailUrl ?? "",
  videoUrl: video.videoUrl,
  durationSeconds: video.durationSeconds ?? 0,
  requestedAt: video.createdAt,
  description: video.description,
});

export const toRubricCategory = (
  category: Rubric["category"],
): MentorRubricScore["category"] => {
  const normalizedCategory = category.toUpperCase().replaceAll("-", "_");

  if (
    normalizedCategory.includes("NON_VERBAL") ||
    normalizedCategory.includes("NONVERBAL") ||
    category.includes("비언어")
  ) {
    return "nonVerbal";
  }

  if (
    normalizedCategory.includes("DELIVERY") ||
    category.includes("전달") ||
    category.includes("표현")
  ) {
    return "delivery";
  }

  return "speech";
};

const toMentorRubricScore = (rubric: Rubric): MentorRubricScore => ({
  id: rubric.rubricId,
  title: rubric.title,
  description: rubric.description,
  category: toRubricCategory(rubric.category),
  maxScore: rubric.maxScore,
  score: Math.ceil(rubric.maxScore / 2),
});

export const toMentorRubricScores = (
  rubrics: Rubric[],
  scoreOverrides: Record<number, number>,
) =>
  [...rubrics]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((rubric) => {
      const score = toMentorRubricScore(rubric);

      return {
        ...score,
        score: scoreOverrides[score.id] ?? score.score,
      };
    });

export const calculateRubricTotalScore = (rubricScores: MentorRubricScore[]) => {
  const maxTotalScore = rubricScores.reduce(
    (sum, item) => sum + (item.maxScore ?? 10),
    0,
  );

  if (maxTotalScore === 0) {
    return "0.0";
  }

  return (
    (rubricScores.reduce((sum, item) => sum + item.score, 0) / maxTotalScore) *
    100
  ).toFixed(1);
};
