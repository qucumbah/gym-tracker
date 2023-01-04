"use client";

import WorkoutsList from "@/components/WorkoutsList";
import { Workout } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WorkoutPickMenu({ workouts }: { workouts: Workout[] }) {
  const router = useRouter();

  const handleEditStart = (workout: Workout) => {
    router.push(`/edit-workout/${workout.id}`);
  };

  return (
    <WorkoutsList
      workouts={workouts}
      onSelect={handleEditStart}
      additionalContent={
        <div className="relative shrink-0 aspect-square w-4">
          <Image src="/edit.svg" fill sizes="100vw" alt="" />
        </div>
      }
    />
  );
}
