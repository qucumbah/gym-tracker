"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import WorkoutsList from "@/components/WorkoutsList";
import { trpc } from "@/utils/trpc";
import { Workout } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkoutCreationMenu({
  existingWorkouts,
}: {
  existingWorkouts: Workout[];
}) {
  const router = useRouter();

  const workoutCreateMutation = trpc.workouts.create.useMutation();
  // const workoutCopyMutation = trpc.workouts.copy.useMutation();

  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);

  const handleCreate = async () => {
    setIsCreatingWorkout(true);
    const creationResult: Workout = await workoutCreateMutation.mutateAsync();
    router.push(`/edit-workout/${creationResult.id}`);
  };

  const handleCopy = () => {};

  return (
    <>
      <Button primary className="w-full" onClick={handleCreate}>
        <div className="flex gap-2 justify-center items-center">
          New workout
          <div className="relative shrink-0 aspect-square w-4 invert">
            <Image src="/double_arrow.svg" fill sizes="100vw" alt="" />
          </div>
        </div>
      </Button>
      <div>Or copy existing workout:</div>
      <WorkoutsList
        workouts={existingWorkouts}
        onSelect={handleCopy}
        additionalContent={
          <div className="relative shrink-0 aspect-square w-4">
            <Image src="/copy.svg" fill sizes="100vw" alt="" />
          </div>
        }
      />
      <Modal isOpen={isCreatingWorkout} onClose={() => {}} title="Loading...">
        <div className="">Creating a new workout...</div>
      </Modal>
    </>
  );
}
