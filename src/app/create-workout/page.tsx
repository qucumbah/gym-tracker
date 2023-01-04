import React, { Suspense } from "react";
import getServerSession from "@/utils/getServerSession";
import WorkoutCreationMenu from "./WorkoutCreationMenu";
import WorkoutCopyMenu from "./WorkoutCopyMenu";
import FallbackButtons from "@/components/FallbackButtons";
import WorkoutProvider from "@/components/WorkoutProvider";

export default async function CreateWorkoutPage() {
  await getServerSession({ required: true });

  const workoutCopyMenu = (
    <Suspense fallback={<FallbackButtons className="w-full" count={3} />}>
      {/* @ts-expect-error Server Component */}
      <WorkoutProvider
        render={(workouts) => <WorkoutCopyMenu workouts={workouts} />}
      />
    </Suspense>
  );

  return (
    <>
      <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
        <h1 className="font-accent text-2xl uppercase">Create workout</h1>
        <WorkoutCreationMenu workoutCopyMenu={workoutCopyMenu} />
      </main>
    </>
  );
}
