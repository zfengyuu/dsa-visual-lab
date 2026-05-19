"use client";

import Link from "next/link";
import { lessons } from "../../lib/dsa";
import { useEffect, useState } from "react";
import type { ProgressState } from "../../lib/dsa";

const emptyState: ProgressState = {
  completed: [],
  favorites: [],
  recentLessonId: null
};

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressState>(emptyState);

  useEffect(() => {
    const raw = window.localStorage.getItem("dsa-visual-lab.progress");
    if (!raw) return;

    try {
      setProgress(JSON.parse(raw) as ProgressState);
    } catch {
      setProgress(emptyState);
    }
  }, []);

  const recentLesson = progress.recentLessonId
    ? lessons.find((lesson) => lesson.id === progress.recentLessonId)
    : null;

  return (
    <main className="stack" style={{ paddingBottom: 40 }}>
      <section className="panel">
        <h1 className="section-title">Progress Dashboard</h1>
        <div className="stats">
          <div className="card">
            <strong>{progress.completed.length}</strong>
            <p className="muted">Completed lessons</p>
          </div>
          <div className="card">
            <strong>{progress.favorites.length}</strong>
            <p className="muted">Favorite lessons</p>
          </div>
          <div className="card">
            <strong>{recentLesson?.title ?? "None yet"}</strong>
            <p className="muted">Most recent lesson</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2 className="section-title">Completed</h2>
        {progress.completed.length === 0 ? (
          <p className="muted">No completed lessons yet.</p>
        ) : (
          <div className="lesson-grid">
            {progress.completed.map((id) => {
              const lesson = lessons.find((entry) => entry.id === id);
              if (!lesson) return null;
              return (
                <Link className="card" href={`/lessons/${lesson.id}`} key={id}>
                  <strong>{lesson.title}</strong>
                  <p className="muted">{lesson.summary}</p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
