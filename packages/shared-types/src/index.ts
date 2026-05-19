export type LessonCategory =
  | "Searching"
  | "Hash Map"
  | "Sorting"
  | "Stack"
  | "Linked List";

export type LessonDifficulty = "Easy" | "Medium";

export type LessonExample = {
  input: string;
  output: string;
  explanation: string;
};

export type LessonComplexity = {
  time: string;
  space: string;
};

export type DSALesson = {
  id: string;
  slug: string;
  title: string;
  category: LessonCategory;
  difficulty: LessonDifficulty;
  summary: string;
  problem: string;
  concept: string;
  starterCode: string;
  examples: LessonExample[];
  complexity: LessonComplexity;
};

export type VisualizationStep = {
  title: string;
  description: string;
  snapshot: Record<string, unknown>;
};

export type ProgressState = {
  completed: string[];
  favorites: string[];
  recentLessonId: string | null;
};
