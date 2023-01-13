"use client";

import Button from "@/components/Button";
import { trpc } from "@/utils/trpc";
import { Workout } from "@prisma/client";
import Image from "next/image";
import { use } from "react";

// `cache` function is not yet implemented in next/react, use local cache instead
let cachedWorkoutsPromise: Promise<Workout[]> | null = null;

export default function CopyButtons({
  onCopy,
}: {
  onCopy: (workoutId: string) => void;
}) {
  const { client } = trpc.useContext();

  if (cachedWorkoutsPromise === null) {
    cachedWorkoutsPromise = client.workouts.list.query();
  }

  const workouts = use(cachedWorkoutsPromise);

  return (
    <>
      {workouts.map((workout) => (
        <li key={workout.id}>
          <Button onClick={() => onCopy(workout.id)} className="w-full">
            <div className="flex gap-2 justify-center items-center">
              {workout.name}
              <div className="relative shrink-0 aspect-square w-4">
                <Image src="/copy.svg" fill sizes="100vw" alt="" />
              </div>
            </div>
          </Button>
        </li>
      ))}
    </>
  );
}
