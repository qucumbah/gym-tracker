"use client";

import Button from "@/components/Button";
import { Workout } from "@prisma/client";
import Image from "next/image";

export default function ExistingWorkouts({
  workouts,
  onCopy,
}: {
  workouts: Workout[];
  onCopy: () => void;
}) {
  return (
    <ul className="w-full">
      {workouts.map((workout: Workout) => (
        <li key={workout.id}>
          <Button onClick={onCopy} className="w-full">
            <div className="flex gap-2 justify-center items-center">
              {workout.name}
              <div className="relative shrink-0 aspect-square w-4 invert">
                <Image src="/copy.svg" fill sizes="100vw" alt="" />
              </div>
            </div>
          </Button>
        </li>
      ))}
    </ul>
  );
}
