import React, { Suspense } from "react";
import getServerSession from "@/utils/getServerSession";
import WorkoutToEditPickMenu from "./WorkoutToEditPickMenu";
import FallbackButtons from "@/components/FallbackButtons";
import WorkoutProvider from "@/components/WorkoutProvider";
import WorkoutPickMenu from "./WorkoutPickMenu";

export default async function PreviousWorkoutsPage() {
  await getServerSession({ required: true });

  const workoutPickMenu = (
    <Suspense fallback={<FallbackButtons className="w-full" count={3} />}>
      {/* @ts-expect-error Server Component */}
      <WorkoutProvider
        render={(workouts) => <WorkoutPickMenu workouts={workouts} />}
      />
    </Suspense>
  );

  return (
    <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
      <h1 className="font-accent text-2xl uppercase">Edit Workout</h1>
      <WorkoutToEditPickMenu workoutPickMenu={workoutPickMenu} />
    </main>
  );
}
