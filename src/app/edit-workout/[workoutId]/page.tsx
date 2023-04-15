import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { notFound } from "next/navigation";
import WorkoutEditor from "./WorkoutEditor";
import { pageTitle } from "./pageTitle";

export const metadata = {
  title: pageTitle,
};

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
    <WorkoutEditor
      workout={workout}
      trainingSets={trainingSets}
      exercises={exercises}
    />
  );
}
