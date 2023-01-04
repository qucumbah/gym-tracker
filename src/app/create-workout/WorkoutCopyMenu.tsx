"use client";

import WorkoutsList from "@/components/WorkoutsList";
import { Workout } from "@prisma/client";
import Image from "next/image";

export default function WorkoutCopyList({ workouts }: { workouts: Workout[] }) {
  // const workoutCopyMutation = trpc.workouts.copy.useMutation();
  const handleCopy = () => {};

  return (
    <WorkoutsList
      workouts={workouts}
      onSelect={handleCopy}
      additionalContent={
        <div className="relative shrink-0 aspect-square w-4">
          <Image src="/copy.svg" fill sizes="100vw" alt="" />
        </div>
      }
    />
  );
}
