import { notFound } from "next/navigation";
import { buildVisualizationSteps, getLessonById } from "../../../lib/dsa";
import { LessonClient } from "../../../components/lesson-client";

export default async function LessonPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const steps = buildVisualizationSteps(lesson);

  return <LessonClient lesson={lesson} steps={steps} />;
}
