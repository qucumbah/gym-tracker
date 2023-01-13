"use client";

import React, { Suspense, useState } from "react";
import FallbackButtons from "@/components/FallbackButtons";
import CreateButton from "./CreateButton";
import CopyButtons from "./CopyButtons";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { Workout } from "@prisma/client";
import Modal from "@/components/Modal";

export default function CreateWorkoutPage() {
  const router = useRouter();

  const workoutCreateMutation = trpc.workouts.create.useMutation();
  const workoutCopyMutation = trpc.workouts.copy.useMutation();

  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);

  const handleCreate = async () => {
    setIsCreatingWorkout(true);
    const creationResult: Workout = await workoutCreateMutation.mutateAsync();
    router.push(`/edit-workout/${creationResult.id}`);
  };

  const handleCopy = async (workoutId: string) => {
    setIsCreatingWorkout(true);
    const creationResult: Workout = await workoutCopyMutation.mutateAsync({
      workoutId,
    });
    router.push(`/edit-workout/${creationResult.id}`);
  };

  return (
    <>
      <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
        <h1 className="font-accent text-2xl uppercase">Create workout</h1>
        <CreateButton onCreate={handleCreate} />
        <div>Or copy existing workout:</div>
        <ul className="w-full flex flex-col gap-2">
          <Suspense fallback={<FallbackButtons className="w-full" count={3} />}>
            <CopyButtons onCopy={handleCopy} />
          </Suspense>
        </ul>
      </main>
      <Modal isOpen={isCreatingWorkout} onClose={() => {}} title="Loading...">
        <div className="">Creating a new workout...</div>
      </Modal>
    </>
  );
}
