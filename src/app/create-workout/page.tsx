import React from "react";
import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import WorkoutCreationMenu from "./WorkoutCreationMenu";

export default async function CreateWorkoutPage() {
  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workouts = await caller.workouts.list();

  return (
    <>
      <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
        <h1 className="font-accent text-2xl uppercase">Create workout</h1>
        <WorkoutCreationMenu existingWorkouts={workouts} />
      </main>
    </>
  );
}
