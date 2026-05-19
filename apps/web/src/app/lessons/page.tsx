import Link from "next/link";
import { lessons } from "../../lib/dsa";

export default function LessonsPage() {
  return (
    <main className="stack" style={{ paddingBottom: 40 }}>
      <section className="panel">
        <h1 className="section-title">Lesson Library</h1>
        <p className="muted">
          Five compact lessons ship in-repo so the app works offline after
          install and stays easy to fork.
        </p>
      </section>

      <section className="lesson-grid">
        {lessons.map((lesson) => (
          <article className="card" key={lesson.id}>
            <h2>{lesson.title}</h2>
            <div className="badge-row">
              <span className="badge">{lesson.category}</span>
              <span className="badge">{lesson.difficulty}</span>
            </div>
            <p className="muted">{lesson.summary}</p>
            <Link className="button" href={`/lessons/${lesson.id}`}>
              Open workspace
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
