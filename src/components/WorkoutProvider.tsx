import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { Workout } from "@prisma/client";
import React from "react";

export default async function WorkoutProvider({
  render,
}: {
  render: (workouts: Workout[]) => React.ReactNode;
}) {
  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workouts = await caller.workouts.list();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return render(workouts);
}
