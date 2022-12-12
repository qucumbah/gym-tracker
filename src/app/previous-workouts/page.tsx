import React from "react";
import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { Workout } from "@prisma/client";
import WorkoutEditMenu from './WorkoutEditMenu';

export default async function PreviousWorkoutsPage() {
  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workouts: Workout[] = await caller.workouts.list();

  return (
    <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
      <h1 className="font-accent text-2xl uppercase">Edit Workout</h1>
      <WorkoutEditMenu workouts={workouts} />
    </main>
  );
}
