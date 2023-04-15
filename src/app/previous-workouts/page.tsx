import React, { Suspense } from "react";
import getServerSession from "@/utils/getServerSession";
import Button from "@/components/Button";
import FallbackButtons from "@/components/FallbackButtons";
import WorkoutProvider from "@/components/WorkoutProvider";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Previous Workouts",
};

export default async function PreviousWorkoutsPage() {
  await getServerSession({ required: true });

  return (
    <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
      <h1 className="font-accent text-2xl uppercase">Edit Workout</h1>
      <ul className="w-full flex flex-col gap-2">
        <Suspense fallback={<FallbackButtons className="w-full" count={3} />}>
          {/* @ts-expect-error Server Component streaming */}
          <WorkoutProvider
            render={(workouts) =>
              workouts.map((workout) => (
                <li key={workout.id}>
                  <Link href={"/create-workout"} className="w-full">
                    <Button className="w-full">
                      <div className="flex gap-2 justify-center items-center">
                        {workout.name}
                        <div className="relative shrink-0 aspect-square w-4">
                          <Image src="/edit.svg" fill sizes="100vw" alt="" />
                        </div>
                      </div>
                    </Button>
                  </Link>
                </li>
              ))
            }
          />
        </Suspense>
      </ul>
    </main>
  );
}
