import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { notFound } from "next/navigation";

export default async function EditWorkoutPage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = params;

  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workout = await caller.workouts.get({ workoutId });
  const trainingSets = await caller.trainingSets.list({ workoutId });

  if (!workout) {
    notFound();
  }

  const a = workout;

  return <div></div>;
}
