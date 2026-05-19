"use client";

import { useEffect, useMemo, useState } from "react";
import type { DSALesson, ProgressState, VisualizationStep } from "../lib/dsa";

const storageKey = "dsa-visual-lab.progress";

const defaultProgress: ProgressState = {
  completed: [],
  favorites: [],
  recentLessonId: null
};

function readProgress(): ProgressState {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return defaultProgress;

  try {
    return {
      ...defaultProgress,
      ...(JSON.parse(raw) as ProgressState)
    };
  } catch {
    return defaultProgress;
  }
}

function writeProgress(progress: ProgressState) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function LessonClient({
  lesson,
  steps
}: {
  lesson: DSALesson;
  steps: VisualizationStep[];
}) {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const nextProgress = readProgress();
    nextProgress.recentLessonId = lesson.id;
    writeProgress(nextProgress);
    setProgress(nextProgress);
  }, [lesson.id]);

  const isFavorite = progress.favorites.includes(lesson.id);
  const isCompleted = progress.completed.includes(lesson.id);
  const activeStep = steps[stepIndex] ?? steps[0];

  const exampleText = useMemo(
    () =>
      lesson.examples
        .map(
          (example) =>
            `Input: ${example.input}\nOutput: ${example.output}\nWhy: ${example.explanation}`
        )
        .join("\n\n"),
    [lesson.examples]
  );

  function toggleFavorite() {
    const nextFavorites = isFavorite
      ? progress.favorites.filter((id) => id !== lesson.id)
      : [...progress.favorites, lesson.id];

    const nextProgress = {
      ...progress,
      favorites: nextFavorites
    };

    setProgress(nextProgress);
    writeProgress(nextProgress);
  }

  function toggleCompleted() {
    const nextCompleted = isCompleted
      ? progress.completed.filter((id) => id !== lesson.id)
      : [...progress.completed, lesson.id];

    const nextProgress = {
      ...progress,
      completed: nextCompleted
    };

    setProgress(nextProgress);
    writeProgress(nextProgress);
  }

  return (
    <main className="page-grid">
      <aside className="panel">
        <div className="side-list">
          {steps.map((step, index) => (
            <button
              className={`side-item ${index === stepIndex ? "active" : ""}`}
              key={step.title}
              onClick={() => setStepIndex(index)}
              type="button"
            >
              <strong>{index + 1}. {step.title}</strong>
              <p className="muted">{step.description}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="stack" style={{ paddingBottom: 40 }}>
        <div className="panel">
          <h1 className="section-title">{lesson.title}</h1>
          <div className="badge-row">
            <span className="badge">{lesson.category}</span>
            <span className="badge">{lesson.difficulty}</span>
            <span className="badge">{lesson.complexity.time}</span>
            <span className="badge">{lesson.complexity.space}</span>
          </div>
          <p className="muted">{lesson.summary}</p>
          <div className="inline-actions">
            <button className="button" onClick={toggleFavorite} type="button">
              {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
            <button className="button primary" onClick={toggleCompleted} type="button">
              {isCompleted ? "Mark incomplete" : "Mark complete"}
            </button>
          </div>
        </div>

        <div className="meta">
          <div className="panel">
            <h2 className="section-title">Problem</h2>
            <p className="muted">{lesson.problem}</p>
          </div>
          <div className="panel">
            <h2 className="section-title">Key idea</h2>
            <p className="muted">{lesson.concept}</p>
          </div>
        </div>

        <div className="panel">
          <h2 className="section-title">Visualization step</h2>
          <div className="card">
            <strong>{activeStep.title}</strong>
            <p className="muted">{activeStep.description}</p>
            <pre>{JSON.stringify(activeStep.snapshot, null, 2)}</pre>
          </div>
          <div className="inline-actions" style={{ marginTop: 12 }}>
            <button
              className="button"
              onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
              type="button"
            >
              Previous
            </button>
            <button
              className="button"
              onClick={() =>
                setStepIndex((current) => Math.min(current + 1, steps.length - 1))
              }
              type="button"
            >
              Next
            </button>
          </div>
        </div>

        <div className="panel">
          <h2 className="section-title">Examples</h2>
          <pre>{exampleText}</pre>
        </div>

        <div className="panel">
          <h2 className="section-title">Starter code</h2>
          <pre>{lesson.starterCode}</pre>
        </div>
      </section>
    </main>
  );
}
