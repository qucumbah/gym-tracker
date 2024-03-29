"use client";

import Button from "@/components/Button";
import ExercisesList from "@/components/ExercisesList";
import Modal from "@/components/Modal";
import { trpc } from "@/utils/trpc";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Exercise, TrainingSet, Workout } from "@prisma/client";
import cuid from "@paralleldrive/cuid2";
import { useCallback, useMemo, useState } from "react";
import TrainingSetEditor from "./TrainingSetEditor";
import { useOptimisticData } from "./useOptimisticData";
import { useRouter } from "next/navigation";

export default function WorkoutEditor({
  workout: serverWorkout,
  trainingSets: serverTrainingSets,
  exercises,
}: {
  workout: Workout;
  trainingSets: TrainingSet[];
  exercises: Exercise[];
}) {
  const modifyWorkout = trpc.workouts.modify.useMutation();
  const deleteWorkout = trpc.workouts.delete.useMutation();
  const replaceTrainingSets = trpc.trainingSets.replace.useMutation();

  const router = useRouter();

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const updateWorkoutName = useCallback(
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

  const updateWorkoutTime = useCallback(
    (newTime: Date) => {
      update((oldData) => ({
        ...oldData,
        workout: {
          ...oldData.workout,
          time: newTime,
        },
      }));
    },
    [update]
  );

  const updateTrainingSet = useCallback(
    (updatedTrainingSet: TrainingSet) => {
      update((oldData) => ({
        ...oldData,
        trainingSets: trainingSets.map((trainingSet) =>
          trainingSet.id === updatedTrainingSet.id
            ? updatedTrainingSet
            : trainingSet
        ),
      }));
    },
    [update]
  );

  const deleteTrainingSet = useCallback(
    (trainingSetToDelete: TrainingSet) => {
      update((oldData) => ({
        ...oldData,
        trainingSets: trainingSets.filter(
          (trainingSet) => trainingSet.id !== trainingSetToDelete.id
        ),
      }));
    },
    [update]
  );

  const createTrainingSet = useCallback(
    (exercise: Exercise) => {
      const newTrainingSet: TrainingSet = {
        id: cuid.createId(),
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

  const moveTrainingSet = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over === null) {
        return;
      }

      if (active.id === over.id) {
        return;
      }

      update(({ trainingSets, ...oldData }) => {
        const oldIndex = trainingSets.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = trainingSets.findIndex((item) => item.id === over.id);
        return {
          ...oldData,
          trainingSets: arrayMove(trainingSets, oldIndex, newIndex),
        };
      });
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
    <div className="pb-4">
      <section className="grid md:grid-cols-2 gap-4 md:gap-20 py-4">
        <div className="grid grid-cols-[auto_1fr] gap-2 place-items-center">
          <h2 className="uppercase">Workout name:</h2>
          <input
            className={[
              "w-full text-xl md:text-2xl border-b border-accent",
              isLoading ? "opacity-30" : "",
            ].join(" ")}
            value={workout.name}
            onChange={(event) => updateWorkoutName(event.currentTarget.value)}
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
            onClick={() => setIsDiscardModalOpen(true)}
            className="px-0"
          >
            Discard
          </Button>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-4 md:gap-20 py-4">
        <div className="flex items-center gap-2">
          <h2 className="uppercase">Date and time:</h2>
          <input
            type="datetime-local"
            value={dateToInput(workout.time)}
            onChange={(event) =>
              updateWorkoutTime(inputToDate(event.currentTarget.value))
            }
            className={["bg-transparent", isLoading ? "opacity-30" : ""].join(
              " "
            )}
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-0"
        >
          Delete workout
        </Button>
      </section>
      <section className="grid grid-cols-1 gap-4 py-4">
        <h2 className="uppercase">Sets:</h2>
        <DndContext onDragEnd={moveTrainingSet}>
          <SortableContext
            items={trainingSets}
            strategy={verticalListSortingStrategy}
          >
            {trainingSets.map((trainingSet) => (
              <TrainingSetEditor
                key={trainingSet.id}
                trainingSet={trainingSet}
                exerciseName={
                  exercisesMap.get(trainingSet.exerciseId)?.name ?? ""
                }
                onChange={updateTrainingSet}
                onDelete={() => deleteTrainingSet(trainingSet)}
                disabled={isLoading}
              />
            ))}
          </SortableContext>
        </DndContext>
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
                createTrainingSet(exercise);
                setIsCreateModalOpen(false);
              }}
              showDescriptions
            />
          </div>
          <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>
      <Modal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        title="Discard changes"
      >
        <div className="grid grid-cols-2 gap-4">
          <h2 className="col-span-2">Discard all modifications?</h2>
          <Button
            primary
            onClick={() => {
              discard();
              setIsDiscardModalOpen(false);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setIsDiscardModalOpen(false)}>No</Button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete workout"
      >
        <div className="grid grid-cols-2 gap-4">
          <h2 className="col-span-2">
            Are you sure you want to delete the workout? This action is
            irreversible
          </h2>
          <Button
            primary
            onClick={() => {
              deleteWorkout.mutate({ workoutId: workout.id });
              router.push(`/previous-workouts`);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setIsDiscardModalOpen(false)}>No</Button>
        </div>
      </Modal>
    </div>
  );
}

function dateToInput(dateObj: Date) {
  const year = String(dateObj.getFullYear());
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${date}T${hours}:${minutes}`;
}

function inputToDate(input: string) {
  return new Date(input);
}
