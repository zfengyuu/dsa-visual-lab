import Link from "next/link";
import { lessons } from "../lib/dsa";

export default function HomePage() {
  const featured = lessons.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="panel">
          <p className="muted">Monorepo starter for interactive DSA learning</p>
          <h1>Read the problem. Inspect the steps. Practice the pattern.</h1>
          <p className="muted">
            This starter keeps the learning loop tight: browse lessons, open a
            focused detail page, inspect algorithm states, and track local
            progress without a backend.
          </p>
          <div className="inline-actions">
            <Link className="button primary" href="/lessons">
              Open lessons
            </Link>
            <Link className="button" href="/progress">
              View progress
            </Link>
          </div>
        </div>
        <div className="panel">
          <h2 className="section-title">Built-in tracks</h2>
          <div className="stats">
            <div className="card">
              <strong>5</strong>
              <p className="muted">Core interview lessons</p>
            </div>
            <div className="card">
              <strong>Local-first</strong>
              <p className="muted">Favorites and completion stay in browser</p>
            </div>
            <div className="card">
              <strong>Forkable</strong>
              <p className="muted">Readable monorepo for study and extension</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel" style={{ marginBottom: 32 }}>
        <h2 className="section-title">Featured lessons</h2>
        <div className="lesson-grid">
          {featured.map((lesson) => (
            <article className="card" key={lesson.id}>
              <h3>{lesson.title}</h3>
              <div className="badge-row">
                <span className="badge">{lesson.category}</span>
                <span className="badge">{lesson.difficulty}</span>
              </div>
              <p className="muted">{lesson.summary}</p>
              <Link className="button" href={`/lessons/${lesson.id}`}>
                Study lesson
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
