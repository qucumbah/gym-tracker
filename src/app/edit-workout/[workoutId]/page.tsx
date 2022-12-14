import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { notFound } from "next/navigation";
import EditMenu from "./EditMenu";

export default async function EditWorkoutPage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = params;

  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workout = await caller.workouts.get({ workoutId });

  if (!workout) {
    notFound();
  }

  const [trainingSets, exercises] = await Promise.all([
    caller.trainingSets.list({ workoutId }),
    caller.exercises.list(),
  ]);

  return (
    <EditMenu
      workout={workout}
      trainingSets={trainingSets}
      exercises={exercises}
    />
  );
}
