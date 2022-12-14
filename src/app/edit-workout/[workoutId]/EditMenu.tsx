"use client";

import Button from "@/components/Button";
import ExercisesList from "@/components/ExercisesList";
import Modal from "@/components/Modal";
import { trpc } from "@/utils/trpc";
import { Exercise, TrainingSet, Workout } from "@prisma/client";
import cuid from "cuid";
import { useCallback, useMemo, useState } from "react";
import { useOptimisticData } from "./useOptimisticData";

export default function EditMenu({
  workout: serverWorkout,
  trainingSets: serverTrainingSets,
  exercises,
}: {
  workout: Workout;
  trainingSets: TrainingSet[];
  exercises: Exercise[];
}) {
  const modifyWorkout = trpc.workouts.modify.useMutation();
  const replaceTrainingSets = trpc.trainingSets.replace.useMutation();

  const pushChanges = async ({
    workout: updatedWorkout,
    trainingSets: updatedTrainingSets,
  }: {
    workout: Workout;
    trainingSets: TrainingSet[];
  }) => {
    await Promise.all([
      modifyWorkout.mutateAsync({
        ...updatedWorkout,
        workoutId: updatedWorkout.id,
      }),
      replaceTrainingSets.mutateAsync({
        workoutId: serverWorkout.id,
        replacements: updatedTrainingSets,
      }),
    ]);
  };

  const { data, sync, update, discard, isLoading, isOutdated } =
    useOptimisticData(
      { workout: serverWorkout, trainingSets: serverTrainingSets },
      pushChanges
    );

  const { workout, trainingSets } = data;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  const changeWorkoutName = useCallback(
    (newName: string) => {
      update((oldData) => ({
        ...oldData,
        workout: {
          ...oldData.workout,
          name: newName,
        },
      }));
    },
    [update]
  );

  const createSet = useCallback(
    (exercise: Exercise) => {
      const newTrainingSet: TrainingSet = {
        id: cuid(),
        workoutId: workout.id,
        exerciseId: exercise.id,
        load: 0,
        reps: 0,
        userId: workout.userId,
      };

      update((oldData) => ({
        ...oldData,
        trainingSets: [...oldData.trainingSets, newTrainingSet],
      }));
    },
    [workout, update]
  );

  const exercisesMap = useMemo(() => {
    const mapSource = exercises.map(
      (exercise) => [exercise.id, exercise] as const
    );

    return new Map(mapSource);
  }, [exercises]);

  return (
    <div>
      <section className="grid grid-rows-2 md:grid-cols-2 md:gap-20">
        <div className="grid grid-cols-[auto_1fr] gap-2 place-items-center">
          <h2 className="uppercase">Workout name:</h2>
          <input
            type="text"
            className="w-full text-xl md:text-2xl border-b border-accent"
            value={workout.name}
            onChange={(event) => changeWorkoutName(event.currentTarget.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            primary
            disabled={isLoading || !isOutdated}
            onClick={sync}
            className="px-0"
          >
            {isLoading ? "Saving..." : isOutdated ? "Save" : "Saved"}
          </Button>
          <Button
            disabled={isLoading || !isOutdated}
            onClick={discard}
            className="px-0"
          >
            Discard
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4">
        <h2>Sets:</h2>
        {trainingSets.map((trainingSet) => (
          <div>
            <span>Training set for exercise:</span>
            <span>{exercisesMap.get(trainingSet.exerciseId)?.name}</span>
          </div>
        ))}
        <Button
          primary
          disabled={isLoading}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add set
        </Button>
      </section>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Creating new set"
      >
        <div className="grid gap-4">
          <h2>Select exercise:</h2>
          <div className="max-h-[50vh] overflow-y-auto">
            <ExercisesList
              exercises={exercises}
              onSelect={(exercise) => {
                createSet(exercise);
                setIsCreateModalOpen(false);
              }}
            />
          </div>
          <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
