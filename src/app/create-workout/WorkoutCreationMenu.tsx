"use client";

import Modal from "@/components/Modal";
import { trpc } from "@/utils/trpc";
import { Workout } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ExistingWorkouts from "./ExistingWorkouts";
import NewWorkoutButton from "./NewWorkoutButton";

export default function WorkoutCreationMenu({
  existingWorkouts,
}: {
  existingWorkouts: Workout[];
}) {
  const router = useRouter();

  const workoutCreateMutation = trpc.workouts.create.useMutation();
  // const workoutCopyMutation = trpc.workouts.copy.useMutation();

  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);

  return (
    <>
      <NewWorkoutButton
        onCreate={async () => {
          setIsCreatingWorkout(true);
          const creationResult: Workout =
            await workoutCreateMutation.mutateAsync();
          router.push(`/workout/${creationResult.id}`);
        }}
      />
      <div>Or copy existing workout:</div>
      <ExistingWorkouts workouts={existingWorkouts} onCopy={() => {}} />
      <Modal isOpen={isCreatingWorkout} onClose={() => {}} title="Loading...">
        <div className="">Creating a new workout...</div>
      </Modal>
    </>
  );
}
