"use client";

import Button from "@/components/Button";
import ExercisesList from "@/components/ExercisesList";
import Modal from "@/components/Modal";
import { trpc } from "@/utils/trpc";
import { Exercise } from "@prisma/client";
import { useState } from "react";

export default function Cms({ exercises }: { exercises: Exercise[] }) {
  const changeAdmin = trpc.users.changeAdminStatus.useMutation();
  const modifyExercise = trpc.exercises.modify.useMutation();

  const isLoading = changeAdmin.isLoading || modifyExercise.isLoading;

  const [userId, setUserId] = useState("");

  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");

  const startEditingExercise = (exercise: Exercise) => {
    setExerciseToEdit(exercise);
    setExerciseName(exercise.name);
    setExerciseDescription(exercise.description);
  };

  const stopEditingExercise = () => setExerciseToEdit(null);

  const confirmExerciseEdit = () => {
    if (!exerciseToEdit) {
      throw new Error("Invalid state");
    }

    modifyExercise.mutate({
      exerciseId: exerciseToEdit.id,
      name: exerciseName,
      description: exerciseDescription,
    });

    setExerciseToEdit(null);
  };

  return (
    <div className="">
      <div className="flex gap-4 items-center">
        <div>User id to make admin:</div>
        <input
          className="text-xl md:text-2xl border-b border-accent"
          value={userId}
          onChange={(event) => setUserId(event.currentTarget.value)}
          disabled={isLoading}
        />
        <Button
          onClick={() => changeAdmin.mutate({ userId, status: true })}
          disabled={isLoading}
        >
          Make admin
        </Button>
      </div>
      <div className="py-4">Pick an exercise to edit:</div>
      <ExercisesList
        exercises={exercises}
        onSelect={(exercise) => startEditingExercise(exercise)}
      />
      <Modal
        isOpen={exerciseToEdit !== null}
        onClose={() => setExerciseToEdit(null)}
        title="Exercise edit"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="flex flex-col gap-8">
              <div className="flex gap-4 items-center">
                <div>Exercise name:</div>
                <input
                  className="text-xl md:text-2xl border-b border-accent"
                  value={exerciseName}
                  onChange={(event) =>
                    setExerciseName(event.currentTarget.value)
                  }
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div>Exercise description:</div>
                <input
                  className="text-xl md:text-2xl border-b border-accent"
                  value={exerciseDescription}
                  onChange={(event) =>
                    setExerciseDescription(event.currentTarget.value)
                  }
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          <Button primary onClick={confirmExerciseEdit}>
            Confirm
          </Button>
          <Button onClick={stopEditingExercise}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
