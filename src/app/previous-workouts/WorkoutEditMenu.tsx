"use client";

import Button from "@/components/Button";
import WorkoutsList from "@/components/WorkoutsList";
import { Workout } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function WorkoutEditMenu({ workouts }: { workouts: Workout[] }) {
  const handleEditStart = (workout: Workout) => {};

  return (
    <>
      <WorkoutsList
        workouts={workouts}
        onSelect={handleEditStart}
        additionalContent={
          <div className="relative shrink-0 aspect-square w-4">
            <Image src="/edit.svg" fill sizes="100vw" alt="" />
          </div>
        }
      />
      <div>Or create a new workout:</div>
      <Link href={"/create-workout"} className="w-full">
        <Button primary className="w-full">
          <div className="flex gap-2 justify-center items-center">
            New workout
            <div className="relative shrink-0 aspect-square w-4 invert">
              <Image src="/double_arrow.svg" fill sizes="100vw" alt="" />
            </div>
          </div>
        </Button>
      </Link>
    </>
  );
}
