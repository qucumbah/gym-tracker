import AnalysisResult from "./AnalysisResult";
import { useContext, useMemo } from "react";
import { ExercisesContext } from "../ExercisesContext";
import { notFound } from "next/navigation";
import TrainingSetGroupsProvider from "./TrainingSetGroupsProvider";

export default function AnalysisBoardForExercisePage({
  params,
}: {
  params: { exerciseId: string };
}) {
  const exercises = useContext(ExercisesContext);
  const exercise = useMemo(
    () => exercises.find((exercise) => exercise.id === params.exerciseId),
    [exercises]
  );

  if (!exercises.length) {
    return null;
  }

  if (!exercise) {
    notFound();
  }

  return (
    // @ts-expect-error Server Component streaming
    <TrainingSetGroupsProvider
      exercise={exercise}
      render={(groups) => (
        <AnalysisResult
          trainingSetGroups={groups}
          exercise={exercise}
          data-superjson
        />
      )}
    />
  );
}
