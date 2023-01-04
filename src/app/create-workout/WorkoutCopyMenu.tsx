import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import WorkoutCopyList from "./WorkoutCopyList";

export default async function WorkoutCopyMenu() {
  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workouts = await caller.workouts.list();

  return <WorkoutCopyList workouts={workouts} />;
}
