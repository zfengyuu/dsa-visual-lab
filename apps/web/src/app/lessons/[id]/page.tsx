import { notFound } from "next/navigation";
import { getLessonById } from "@dsa-visual-lab/lessons";
import { buildVisualizationSteps } from "@dsa-visual-lab/visualizer-core";
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
