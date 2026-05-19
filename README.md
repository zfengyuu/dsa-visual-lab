# DSA Visual Lab

DSA Visual Lab is a local-first monorepo for learning data structures and algorithms through short lessons, worked examples, and a browser workspace that tracks progress in `localStorage`.

The current repo is structured to be easy to fork, study, and extend:

- `apps/web`: Next.js web app
- `apps/desktop`: reserved for the desktop client
- `packages/shared-types`: shared lesson and progress contracts
- `packages/lessons`: built-in lesson content
- `packages/visualizer-core`: visualization step generators
- `packages/code-runner`: browser-safe execution helpers
- `packages/ui`: shared UI helpers

## What is included

- Five built-in lessons:
  - Binary Search
  - Two Sum
  - Bubble Sort
  - Valid Parentheses
  - Reverse Linked List
- Lesson catalog with difficulty and category badges
- Lesson detail view with examples, complexity, pseudo visualization steps, and starter code
- Local-first progress tracking:
  - completed lessons
  - favorite lessons
  - recently opened lesson
- Progress dashboard

## Tech stack

- `pnpm` workspace monorepo
- Next.js App Router
- React + TypeScript
- Shared TypeScript packages for lessons and domain models

## Run the whole platform locally

### 1. Install dependencies

```bash
corepack enable
corepack pnpm install
```

### 2. Start the web app

```bash
corepack pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

### 3. Typecheck

```bash
corepack pnpm typecheck
```

### 4. Run tests

```bash
corepack pnpm test
```

### 5. Build production

```bash
corepack pnpm build
```

## Workspace commands

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm typecheck
corepack pnpm test
```

## Project structure

```text
apps/
  web/
  desktop/
packages/
  shared-types/
  lessons/
  visualizer-core/
  code-runner/
  ui/
```

## Fork and extend

This repo is intentionally small and readable so you can fork it and evolve it into your own DSA learning lab. Good next steps:

- replace pseudo visualization with animated renderers
- add Monaco or sandboxes for code practice
- add custom lesson authoring and import/export
- add a desktop client with Tauri

## Notes

- Progress is stored in the browser and does not sync to a backend.
- `apps/desktop` is a placeholder for the next phase.
