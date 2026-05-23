export type RubricCategory = "SPEECH" | "NON_VERBAL" | "DELIVERY" | string;

export interface Rubric {
  rubricId: number;
  title: string;
  description: string;
  category: RubricCategory;
  maxScore: number;
  displayOrder: number;
}

export type RubricsResponse = Rubric[];
