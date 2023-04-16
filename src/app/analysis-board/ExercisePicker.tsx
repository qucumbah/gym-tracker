"use client";

import ExercisesList from "@/components/ExercisesList";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function ExercisePicker({
  exercises,
}: {
  exercises: Exercise[];
}) {
  const router = useRouter();

  return (
    <div>
      <h2>Pick an exercise to analyze:</h2>
      <ExercisesList
        exercises={exercises}
        onSelect={(exercise) => router.push(`/analysis-board/${exercise.id}`)}
      />
    </div>
  );
}
