"use client";

import Button from "@/components/Button";
import { trpc } from "@/utils/trpc";
import { TrainingSet, Workout } from "@prisma/client";
import { useOptimisticData } from "./useOptimisticData";
import WorkoutNameInput from "./WorkoutNameInput";

export default function EditMenu({
  workout,
  trainingSets,
}: {
  workout: Workout;
  trainingSets: TrainingSet[];
}) {
  const modifyWorkout = trpc.workouts.modify.useMutation();
  const replaceTrainingSets = trpc.trainingSets.replace.useMutation();

  const { data, sync, update, isLoading, isOutdated } = useOptimisticData(
    { workout, trainingSets },
    async ({ workout: updatedWorkout, trainingSets: updatedTrainingSets }) => {
      await Promise.all([
        modifyWorkout.mutateAsync({
          ...updatedWorkout,
          workoutId: updatedWorkout.id,
        }),
        replaceTrainingSets.mutateAsync({
          workoutId: workout.id,
          replacements: updatedTrainingSets,
        }),
      ]);
    }
  );

  return (
    <div>
      <div className="grid grid-rows-2 md:grid-cols-2 md:gap-20">
        <WorkoutNameInput
          workoutName={data.workout.name}
          onChange={(newName) =>
            update((oldData) => ({
              ...oldData,
              workout: {
                ...oldData.workout,
                name: newName,
              },
            }))
          }
          disabled={isLoading}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button
            primary
            disabled={isLoading || !isOutdated}
            onClick={sync}
            className="px-0"
          >
            {isOutdated ? "Save" : "Saved"}
          </Button>
          <Button disabled={isLoading || !isOutdated} className="px-0">
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
}
