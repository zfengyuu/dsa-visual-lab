import type { DSALesson, VisualizationStep } from "@dsa-visual-lab/shared-types";

export function buildVisualizationSteps(lesson: DSALesson): VisualizationStep[] {
  switch (lesson.id) {
    case "binary-search":
      return [
        {
          title: "Initialize bounds",
          description: "Start with left at 0 and right at the last index.",
          snapshot: { left: 0, right: 5, mid: 2, window: [-1, 0, 3, 5, 9, 12] }
        },
        {
          title: "Discard left half",
          description: "Target is larger than mid, so shift left to mid + 1.",
          snapshot: { left: 3, right: 5, mid: 4, window: [5, 9, 12] }
        },
        {
          title: "Found target",
          description: "Middle index now points to the target value.",
          snapshot: { left: 3, right: 5, mid: 4, value: 9 }
        }
      ];
    case "two-sum":
      return [
        {
          title: "Read first value",
          description: "Store the first value in the hash map.",
          snapshot: { current: 2, complement: 7, seen: { 2: 0 } }
        },
        {
          title: "Check complement",
          description: "The complement exists, so the pair is complete.",
          snapshot: { current: 7, complement: 2, seen: { 2: 0 }, answer: [0, 1] }
        }
      ];
    case "bubble-sort":
      return [
        {
          title: "Compare neighbors",
          description: "Compare adjacent values and swap if they are out of order.",
          snapshot: { array: [5, 1, 4, 2, 8], compare: [5, 1] }
        },
        {
          title: "Bubble upward",
          description: "Largest values drift toward the end of the array.",
          snapshot: { array: [1, 4, 2, 5, 8], sortedBoundary: 4 }
        }
      ];
    case "valid-parentheses":
      return [
        {
          title: "Push open bracket",
          description: "Opening brackets go onto the stack.",
          snapshot: { char: "(", stack: ["("] }
        },
        {
          title: "Pop on match",
          description: "A matching closing bracket removes the latest open bracket.",
          snapshot: { char: ")", stack: [] }
        }
      ];
    case "reverse-linked-list":
      return [
        {
          title: "Track pointers",
          description: "Hold prev, current, and next before rewiring.",
          snapshot: { prev: null, current: 1, next: 2 }
        },
        {
          title: "Reverse link",
          description: "Point current.next back to prev and advance forward.",
          snapshot: { prev: 1, current: 2, next: 3 }
        }
      ];
    default:
      return [
        {
          title: "Read lesson",
          description: "General-purpose placeholder visualization step.",
          snapshot: { lessonId: lesson.id }
        }
      ];
  }
}
