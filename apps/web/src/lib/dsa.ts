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

export const lessons: DSALesson[] = [
  {
    id: "binary-search",
    slug: "binary-search",
    title: "Binary Search",
    category: "Searching",
    difficulty: "Easy",
    summary: "Search a sorted array by cutting the search interval in half.",
    problem:
      "Given a sorted array and a target value, return the index of the target or -1 if it does not exist.",
    concept:
      "Keep left and right bounds, inspect the middle element, and discard the half that cannot contain the target.",
    starterCode: `function binarySearch(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n\n  return -1;\n}`,
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "Middle checks narrow the window until index 4 is found."
      }
    ],
    complexity: { time: "O(log n)", space: "O(1)" }
  },
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    category: "Hash Map",
    difficulty: "Easy",
    summary: "Use a map to remember complements in one pass.",
    problem:
      "Return indices of the two numbers such that they add up to a target.",
    concept:
      "Store visited values in a hash map and check whether the needed complement already exists.",
    starterCode: `function twoSum(nums, target) {\n  const seen = new Map();\n\n  for (let i = 0; i < nums.length; i += 1) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) return [seen.get(complement), i];\n    seen.set(nums[i], i);\n  }\n\n  return [];\n}`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0, 1]",
        explanation: "7 is the complement of 2 for target 9."
      }
    ],
    complexity: { time: "O(n)", space: "O(n)" }
  },
  {
    id: "bubble-sort",
    slug: "bubble-sort",
    title: "Bubble Sort",
    category: "Sorting",
    difficulty: "Easy",
    summary: "Repeatedly swap adjacent out-of-order values.",
    problem: "Sort an array in ascending order using repeated adjacent swaps.",
    concept:
      "Each pass moves the largest remaining value to the end, shrinking the unsorted boundary.",
    starterCode: `function bubbleSort(nums) {\n  const arr = [...nums];\n\n  for (let end = arr.length - 1; end > 0; end -= 1) {\n    for (let i = 0; i < end; i += 1) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n      }\n    }\n  }\n\n  return arr;\n}`,
    examples: [
      {
        input: "nums = [5,1,4,2,8]",
        output: "[1,2,4,5,8]",
        explanation: "Each pass bubbles the next largest value to the back."
      }
    ],
    complexity: { time: "O(n^2)", space: "O(1)" }
  },
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    category: "Stack",
    difficulty: "Easy",
    summary: "Use a stack to match opening and closing brackets.",
    problem:
      "Return true when every opening bracket is closed in the correct order.",
    concept:
      "Push open brackets onto a stack and pop only when the closing bracket matches the latest open bracket.",
    starterCode: `function isValid(s) {\n  const stack = [];\n  const pairs = {\n    ')': '(',\n    ']': '[',\n    '}': '{'\n  };\n\n  for (const char of s) {\n    if (char === '(' || char === '[' || char === '{') {\n      stack.push(char);\n      continue;\n    }\n\n    if (stack.pop() !== pairs[char]) return false;\n  }\n\n  return stack.length === 0;\n}`,
    examples: [
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Every closing bracket matches the latest opening bracket."
      }
    ],
    complexity: { time: "O(n)", space: "O(n)" }
  },
  {
    id: "reverse-linked-list",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    category: "Linked List",
    difficulty: "Easy",
    summary: "Flip next pointers one node at a time.",
    problem:
      "Reverse a singly linked list and return the new head node.",
    concept:
      "Track prev, current, and next so the list can be rewired in place without losing the remainder.",
    starterCode: `function reverseList(head) {\n  let prev = null;\n  let current = head;\n\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n\n  return prev;\n}`,
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "Each node points backward after the rewire step."
      }
    ],
    complexity: { time: "O(n)", space: "O(1)" }
  }
];

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

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
