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

  const [workout, trainingSets, exercises] = await Promise.all([
    caller.workouts.get({ workoutId }),
    caller.trainingSets.list({ workoutId }),
    caller.exercises.list(),
  ]);

  if (!workout) {
    notFound();
  }

  return (
    <EditMenu
      workout={workout}
      trainingSets={trainingSets}
      exercises={exercises}
    />
  );
}
